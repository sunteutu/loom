/**
 * Questionnaire (quant survey) store — same architecture as the guide
 * store in ./guides: localStorage now, Convex-shaped for phase 2.
 *
 * An item stores a snapshot of the *stem* (editable without touching the
 * catalog) plus provenance (indicatorId + item index). The structured
 * fields (scale points, options, base, type…) resolve live from the
 * catalog via provenance at render/export time — see ./survey-export.
 */

import { useSyncExternalStore } from "react";
import type { GuideVariables } from "./guides";

export interface SurveyDocItem {
  id: string;
  /** Snapshot of the question stem — editing it never touches the catalog. */
  stem: string;
  /** Provenance: source indicator (unset = custom open-text question). */
  indicatorId?: string;
  /** Index in the indicator's surveyItems at add time. */
  sourceIndex?: number;
}

export interface SurveyDoc {
  id: string;
  title: string;
  variables: GuideVariables;
  items: SurveyDocItem[];
  createdAt: number;
  updatedAt: number;
}

interface SurveyStore {
  surveys: SurveyDoc[];
  activeSurveyId: string | null;
}

const KEY = "loom:surveys:v1";
const CHANGE_EVENT = "loom:surveys-changed";
const EMPTY: SurveyStore = { surveys: [], activeSurveyId: null };

let cachedRaw: string | null = null;
let cachedStore: SurveyStore = EMPTY;

function read(): SurveyStore {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(KEY);
  if (raw === cachedRaw) return cachedStore;
  cachedRaw = raw;
  try {
    cachedStore = raw ? (JSON.parse(raw) as SurveyStore) : EMPTY;
  } catch {
    cachedStore = EMPTY;
  }
  return cachedStore;
}

function write(next: SurveyStore) {
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

export function useSurveyStore(): SurveyStore {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function getActiveSurvey(store: SurveyStore): SurveyDoc | null {
  return store.surveys.find((s) => s.id === store.activeSurveyId) ?? null;
}

function touch(survey: SurveyDoc): SurveyDoc {
  return { ...survey, updatedAt: Date.now() };
}

function updateSurvey(id: string, fn: (s: SurveyDoc) => SurveyDoc) {
  const store = read();
  write({
    ...store,
    surveys: store.surveys.map((s) => (s.id === id ? touch(fn(s)) : s)),
  });
}

// ── Mutations ──────────────────────────────────────────────────────────────

export function createSurvey(title = "Chestionar nou"): SurveyDoc {
  const store = read();
  const survey: SurveyDoc = {
    id: crypto.randomUUID(),
    title,
    variables: {},
    items: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  write({ surveys: [...store.surveys, survey], activeSurveyId: survey.id });
  return survey;
}

export function renameSurvey(id: string, title: string) {
  updateSurvey(id, (s) => ({ ...s, title }));
}

export function deleteSurvey(id: string) {
  const store = read();
  const surveys = store.surveys.filter((s) => s.id !== id);
  write({
    surveys,
    activeSurveyId:
      store.activeSurveyId === id
        ? (surveys[0]?.id ?? null)
        : store.activeSurveyId,
  });
}

export function setActiveSurvey(id: string) {
  write({ ...read(), activeSurveyId: id });
}

export function setSurveyVariables(id: string, variables: GuideVariables) {
  updateSurvey(id, (s) => ({ ...s, variables }));
}

export interface SurveyItemRef {
  stem: string;
  indicatorId: string;
  sourceIndex: number;
}

/** Add catalog items to the active questionnaire (created if none). */
export function addItemsToActiveSurvey(entries: SurveyItemRef[]) {
  const store = read();
  const active = getActiveSurvey(store) ?? createSurvey();
  const has = (e: SurveyItemRef) =>
    active.items.some(
      (it) =>
        it.indicatorId === e.indicatorId && it.sourceIndex === e.sourceIndex,
    );
  const added = entries
    .filter((e) => !has(e))
    .map((e) => ({ id: crypto.randomUUID(), ...e }));
  if (added.length === 0) return;
  updateSurvey(active.id, (s) => ({ ...s, items: [...s.items, ...added] }));
}

export function removeItemFromActiveSurvey(
  indicatorId: string,
  sourceIndex: number,
) {
  const store = read();
  const active = getActiveSurvey(store);
  if (!active) return;
  updateSurvey(active.id, (s) => ({
    ...s,
    items: s.items.filter(
      (it) =>
        !(it.indicatorId === indicatorId && it.sourceIndex === sourceIndex),
    ),
  }));
}

/** Remove every item of an indicator from the active questionnaire. */
export function removeIndicatorFromActiveSurvey(indicatorId: string) {
  const store = read();
  const active = getActiveSurvey(store);
  if (!active) return;
  updateSurvey(active.id, (s) => ({
    ...s,
    items: s.items.filter((it) => it.indicatorId !== indicatorId),
  }));
}

/** Custom question — renders and exports as an open-text item. */
export function addCustomSurveyItem(surveyId: string, stem: string) {
  updateSurvey(surveyId, (s) => ({
    ...s,
    items: [...s.items, { id: crypto.randomUUID(), stem }],
  }));
}

export function updateSurveyItemStem(
  surveyId: string,
  itemId: string,
  stem: string,
) {
  updateSurvey(surveyId, (s) => ({
    ...s,
    items: s.items.map((it) => (it.id === itemId ? { ...it, stem } : it)),
  }));
}

export function removeSurveyItem(surveyId: string, itemId: string) {
  updateSurvey(surveyId, (s) => ({
    ...s,
    items: s.items.filter((it) => it.id !== itemId),
  }));
}

export function moveSurveyItem(
  surveyId: string,
  itemId: string,
  direction: -1 | 1,
) {
  updateSurvey(surveyId, (s) => {
    const index = s.items.findIndex((it) => it.id === itemId);
    const target = index + direction;
    if (index === -1 || target < 0 || target >= s.items.length) return s;
    const items = [...s.items];
    [items[index], items[target]] = [items[target], items[index]];
    return { ...s, items };
  });
}
