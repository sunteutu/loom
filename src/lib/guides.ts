/**
 * Interview-guide store — phase 1 lives in localStorage, but the data shape
 * is the future Convex schema (studies + guideItems with provenance), so the
 * later migration only changes *where* it saves, not *what*.
 *
 * Every item is a snapshot copy of the question text (editable without
 * touching the catalog) plus provenance back to its source indicator.
 */

import { useSyncExternalStore } from "react";

/** Fill-in values for the [category] / [product] / [brand] placeholders. */
export interface GuideVariables {
  category?: string;
  product?: string;
  brand?: string;
}

export interface GuideItem {
  id: string;
  /** Snapshot of the question text — editing it never touches the catalog. */
  text: string;
  /** Provenance: which indicator this question came from (unset = custom). */
  indicatorId?: string;
  /** Index of the question in the indicator's qualQuestions at add time. */
  sourceIndex?: number;
}

export interface Guide {
  id: string;
  title: string;
  variables: GuideVariables;
  items: GuideItem[];
  createdAt: number;
  updatedAt: number;
}

interface GuideStore {
  guides: Guide[];
  activeGuideId: string | null;
}

const KEY = "loom:guides:v1";
const CHANGE_EVENT = "loom:guides-changed";
const EMPTY: GuideStore = { guides: [], activeGuideId: null };

// getSnapshot must return a referentially stable value between writes,
// so cache the parsed store keyed by the raw string.
let cachedRaw: string | null = null;
let cachedStore: GuideStore = EMPTY;

function read(): GuideStore {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(KEY);
  if (raw === cachedRaw) return cachedStore;
  cachedRaw = raw;
  try {
    cachedStore = raw ? (JSON.parse(raw) as GuideStore) : EMPTY;
  } catch {
    cachedStore = EMPTY;
  }
  return cachedStore;
}

function write(next: GuideStore) {
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  // Cross-tab sync.
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Reactive access to all guides + the active guide id. */
export function useGuideStore(): GuideStore {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function getActiveGuide(store: GuideStore): Guide | null {
  return store.guides.find((g) => g.id === store.activeGuideId) ?? null;
}

function touch(guide: Guide): Guide {
  return { ...guide, updatedAt: Date.now() };
}

function updateGuide(id: string, fn: (g: Guide) => Guide) {
  const store = read();
  write({
    ...store,
    guides: store.guides.map((g) => (g.id === id ? touch(fn(g)) : g)),
  });
}

// ── Mutations ──────────────────────────────────────────────────────────────

export function createGuide(title = "Ghid nou"): Guide {
  const store = read();
  const guide: Guide = {
    id: crypto.randomUUID(),
    title,
    variables: {},
    items: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  write({ guides: [...store.guides, guide], activeGuideId: guide.id });
  return guide;
}

export function renameGuide(id: string, title: string) {
  updateGuide(id, (g) => ({ ...g, title }));
}

export function deleteGuide(id: string) {
  const store = read();
  const guides = store.guides.filter((g) => g.id !== id);
  write({
    guides,
    activeGuideId:
      store.activeGuideId === id
        ? (guides[0]?.id ?? null)
        : store.activeGuideId,
  });
}

export function setActiveGuide(id: string) {
  write({ ...read(), activeGuideId: id });
}

export function setVariables(id: string, variables: GuideVariables) {
  updateGuide(id, (g) => ({ ...g, variables }));
}

export interface QuestionRef {
  text: string;
  indicatorId: string;
  sourceIndex: number;
}

/**
 * Add catalog questions to the active guide (created on the fly if none),
 * skipping ones already present (same indicator + source index).
 */
export function addQuestionsToActiveGuide(entries: QuestionRef[]) {
  const store = read();
  const active = getActiveGuide(store) ?? createGuide();
  const has = (e: QuestionRef) =>
    active.items.some(
      (it) =>
        it.indicatorId === e.indicatorId && it.sourceIndex === e.sourceIndex,
    );
  const added = entries
    .filter((e) => !has(e))
    .map((e) => ({ id: crypto.randomUUID(), ...e }));
  if (added.length === 0) return;
  updateGuide(active.id, (g) => ({ ...g, items: [...g.items, ...added] }));
}

/** Remove a catalog question from the active guide by provenance. */
export function removeQuestionFromActiveGuide(
  indicatorId: string,
  sourceIndex: number,
) {
  const store = read();
  const active = getActiveGuide(store);
  if (!active) return;
  updateGuide(active.id, (g) => ({
    ...g,
    items: g.items.filter(
      (it) =>
        !(it.indicatorId === indicatorId && it.sourceIndex === sourceIndex),
    ),
  }));
}

export function addCustomItem(guideId: string, text: string) {
  updateGuide(guideId, (g) => ({
    ...g,
    items: [...g.items, { id: crypto.randomUUID(), text }],
  }));
}

export function updateItemText(guideId: string, itemId: string, text: string) {
  updateGuide(guideId, (g) => ({
    ...g,
    items: g.items.map((it) => (it.id === itemId ? { ...it, text } : it)),
  }));
}

export function removeItem(guideId: string, itemId: string) {
  updateGuide(guideId, (g) => ({
    ...g,
    items: g.items.filter((it) => it.id !== itemId),
  }));
}

export function moveItem(guideId: string, itemId: string, direction: -1 | 1) {
  updateGuide(guideId, (g) => {
    const index = g.items.findIndex((it) => it.id === itemId);
    const target = index + direction;
    if (index === -1 || target < 0 || target >= g.items.length) return g;
    const items = [...g.items];
    [items[index], items[target]] = [items[target], items[index]];
    return { ...g, items };
  });
}
