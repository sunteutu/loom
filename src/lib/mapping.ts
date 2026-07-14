/**
 * Stakeholder-question mapping store — the entry point of the study
 * builder. Business stakeholders hand over up to 100 questions in their
 * own language; the mapping engines (v1 lexical / v2 LLM) propose
 * indicator assignments, the researcher reviews, and the confirmed
 * groups generate a guide and/or questionnaire.
 *
 * Same architecture as ./guides and ./surveys: localStorage now,
 * Convex-shaped for the later migration.
 */

import { useSyncExternalStore } from "react";

export type MappingEngine = "v1" | "v2";

export interface StakeholderQuestion {
  id: string;
  text: string;
}

export interface QuestionAssignment {
  questionId: string;
  /** Winning indicator; null = unmapped (below threshold / no match). */
  indicatorId: string | null;
  /** 0–1 confidence from the engine that proposed it. */
  confidence: number;
  engine: MappingEngine;
  /** Short justification (v2 only). */
  rationale?: string;
  /** Runner-up candidates, for the reassign dropdown. */
  alternatives?: { indicatorId: string; confidence: number }[];
  status: "suggested" | "confirmed";
}

export interface MappingDoc {
  id: string;
  title: string;
  questions: StakeholderQuestion[];
  assignments: QuestionAssignment[];
  createdAt: number;
  updatedAt: number;
}

interface MappingStore {
  mappings: MappingDoc[];
  activeMappingId: string | null;
}

export const MAX_QUESTIONS = 100;

const KEY = "loom:mappings:v1";
const CHANGE_EVENT = "loom:mappings-changed";
const EMPTY: MappingStore = { mappings: [], activeMappingId: null };

let cachedRaw: string | null = null;
let cachedStore: MappingStore = EMPTY;

function read(): MappingStore {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(KEY);
  if (raw === cachedRaw) return cachedStore;
  cachedRaw = raw;
  try {
    cachedStore = raw ? (JSON.parse(raw) as MappingStore) : EMPTY;
  } catch {
    cachedStore = EMPTY;
  }
  return cachedStore;
}

function write(next: MappingStore) {
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useMappingStore(): MappingStore {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

function touch(doc: MappingDoc): MappingDoc {
  return { ...doc, updatedAt: Date.now() };
}

function updateMapping(id: string, fn: (m: MappingDoc) => MappingDoc) {
  const store = read();
  write({
    ...store,
    mappings: store.mappings.map((m) => (m.id === id ? touch(fn(m)) : m)),
  });
}

// ── Parsing ────────────────────────────────────────────────────────────────

/**
 * Split pasted stakeholder text into clean questions: one per line,
 * stripping numbering ("1.", "12)"), bullets ("-", "•", "*") and "Q:"
 * prefixes. Empty and duplicate lines are dropped; capped at MAX_QUESTIONS.
 */
export function parseQuestions(text: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine
      .replace(/^\s*(?:[-–•*▪]|\d{1,3}[.)]|[Qq]\d*[:.)])\s*/, "")
      .trim();
    if (!line) continue;
    const key = line.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(line);
    if (out.length >= MAX_QUESTIONS) break;
  }
  return out;
}

// ── Mutations ──────────────────────────────────────────────────────────────

export function createMapping(title = "Mapare nouă"): MappingDoc {
  const store = read();
  const doc: MappingDoc = {
    id: crypto.randomUUID(),
    title,
    questions: [],
    assignments: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  write({ mappings: [...store.mappings, doc], activeMappingId: doc.id });
  return doc;
}

export function renameMapping(id: string, title: string) {
  updateMapping(id, (m) => ({ ...m, title }));
}

export function deleteMapping(id: string) {
  const store = read();
  const mappings = store.mappings.filter((m) => m.id !== id);
  write({
    mappings,
    activeMappingId:
      store.activeMappingId === id
        ? (mappings[0]?.id ?? null)
        : store.activeMappingId,
  });
}

export function setActiveMapping(id: string) {
  write({ ...read(), activeMappingId: id });
}

/** Replace the question list (from parsing); drops stale assignments. */
export function setQuestions(id: string, texts: string[]) {
  updateMapping(id, (m) => {
    const questions = texts.map((text) => {
      const existing = m.questions.find((q) => q.text === text);
      return existing ?? { id: crypto.randomUUID(), text };
    });
    const ids = new Set(questions.map((q) => q.id));
    return {
      ...m,
      questions,
      assignments: m.assignments.filter((a) => ids.has(a.questionId)),
    };
  });
}

export function updateQuestionText(id: string, questionId: string, text: string) {
  updateMapping(id, (m) => ({
    ...m,
    questions: m.questions.map((q) =>
      q.id === questionId ? { ...q, text } : q,
    ),
    // The text changed → the old suggestion no longer applies.
    assignments: m.assignments.filter((a) => a.questionId !== questionId),
  }));
}

export function removeQuestion(id: string, questionId: string) {
  updateMapping(id, (m) => ({
    ...m,
    questions: m.questions.filter((q) => q.id !== questionId),
    assignments: m.assignments.filter((a) => a.questionId !== questionId),
  }));
}

export function addQuestion(id: string, text: string) {
  updateMapping(id, (m) =>
    m.questions.length >= MAX_QUESTIONS
      ? m
      : {
          ...m,
          questions: [...m.questions, { id: crypto.randomUUID(), text }],
        },
  );
}

/** Overwrite all assignments (one mapping run). */
export function setAssignments(id: string, assignments: QuestionAssignment[]) {
  updateMapping(id, (m) => ({ ...m, assignments }));
}

/** Manually reassign a question to an indicator (or null = unmapped). */
export function reassignQuestion(
  id: string,
  questionId: string,
  indicatorId: string | null,
) {
  updateMapping(id, (m) => {
    const rest = m.assignments.filter((a) => a.questionId !== questionId);
    const prev = m.assignments.find((a) => a.questionId === questionId);
    return {
      ...m,
      assignments: [
        ...rest,
        {
          questionId,
          indicatorId,
          confidence: 1,
          engine: prev?.engine ?? "v1",
          alternatives: prev?.alternatives,
          status: "confirmed",
        },
      ],
    };
  });
}

// ── Learned corrections (simple active learning for v1) ────────────────────

const LEARNED_KEY = "loom:mapping-learned:v1";

export function readLearnedExamples(): Record<string, string[]> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(LEARNED_KEY) ?? "{}");
  } catch {
    return {};
  }
}

/** Remember a manual correction: this question text belongs to indicatorId. */
export function learnExample(indicatorId: string, questionText: string) {
  const learned = readLearnedExamples();
  const list = learned[indicatorId] ?? [];
  if (!list.includes(questionText)) {
    learned[indicatorId] = [...list.slice(-19), questionText]; // cap 20/indicator
    window.localStorage.setItem(LEARNED_KEY, JSON.stringify(learned));
  }
}
