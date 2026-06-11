"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Ruler, Search, SlidersHorizontal, X } from "lucide-react";
import { Popover } from "radix-ui";
import {
  INDICATOR_CATEGORIES,
  INDICATORS,
  type Indicator,
  type IndicatorCategory,
} from "@/lib/indicators";

function queryTerms(query: string) {
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

function matches(indicator: Indicator, terms: string[]) {
  if (terms.length === 0) return true;
  const haystack = [
    indicator.name,
    indicator.category,
    indicator.description,
    indicator.measurement,
    ...indicator.aliases,
  ]
    .join(" ")
    .toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (terms.length === 0) return <>{text}</>;
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(pattern);
  // With a single capture group, split() places matches at odd indices.
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            className="rounded-sm bg-amber-4 px-0.5 text-amber-12"
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

const CATEGORY_SET = new Set<string>(INDICATOR_CATEGORIES);

export default function IndicatoriPage() {
  return (
    <Suspense>
      <IndicatoriContent />
    </Suspense>
  );
}

function IndicatoriContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter state lives in the URL so it survives refresh and is shareable.
  // The text input keeps local state and syncs to the URL debounced, so
  // typing stays instant.
  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQueryState] = useState(urlQuery);
  const lastSyncedQuery = useRef(urlQuery);
  const selected = useMemo(() => {
    const cats = (searchParams.get("cat") ?? "")
      .split("|")
      .filter((c) => CATEGORY_SET.has(c));
    return new Set(cats as IndicatorCategory[]);
  }, [searchParams]);

  const updateParams = useCallback(
    (next: { q?: string; cats?: Set<IndicatorCategory> }) => {
      const params = new URLSearchParams(searchParams);
      if (next.q !== undefined) {
        if (next.q) params.set("q", next.q);
        else params.delete("q");
      }
      if (next.cats !== undefined) {
        if (next.cats.size > 0) {
          params.set(
            "cat",
            INDICATOR_CATEGORIES.filter((c) => next.cats!.has(c)).join("|"),
          );
        } else {
          params.delete("cat");
        }
      }
      const qs = params.toString();
      router.replace(qs ? `?${qs}` : "?", { scroll: false });
    },
    [router, searchParams],
  );

  const setQuery = useCallback((q: string) => setQueryState(q), []);

  // Debounced local query → URL.
  useEffect(() => {
    if (query === lastSyncedQuery.current) return;
    const t = setTimeout(() => {
      lastSyncedQuery.current = query;
      updateParams({ q: query });
    }, 250);
    return () => clearTimeout(t);
  }, [query, updateParams]);

  // URL → local query (back/forward navigation, external links).
  useEffect(() => {
    if (urlQuery !== lastSyncedQuery.current) {
      lastSyncedQuery.current = urlQuery;
      setQueryState(urlQuery);
    }
  }, [urlQuery]);

  const toggleCategory = useCallback(
    (cat: IndicatorCategory) => {
      const next = new Set(selected);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      updateParams({ cats: next });
    },
    [selected, updateParams],
  );

  const clearAll = useCallback(
    () => updateParams({ q: "", cats: new Set() }),
    [updateParams],
  );

  const terms = useMemo(() => queryTerms(query), [query]);

  const queryMatched = useMemo(
    () => INDICATORS.filter((ind) => matches(ind, terms)),
    [terms],
  );

  const countByCategory = useMemo(() => {
    const counts = new Map<IndicatorCategory, number>();
    for (const ind of queryMatched) {
      counts.set(ind.category, (counts.get(ind.category) ?? 0) + 1);
    }
    return counts;
  }, [queryMatched]);

  const grouped = useMemo(
    () =>
      INDICATOR_CATEGORIES.map((cat) => ({
        category: cat,
        indicators:
          selected.size > 0 && !selected.has(cat)
            ? []
            : queryMatched.filter((ind) => ind.category === cat),
      })).filter((g) => g.indicators.length > 0),
    [queryMatched, selected],
  );

  const shownCount = grouped.reduce((n, g) => n + g.indicators.length, 0);
  const hasActiveFilters = query !== "" || selected.size > 0;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-8 pb-16">
      <div className="sticky top-0 z-10 -mx-8 border-b border-border bg-background/95 px-8 pb-4 pt-8 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <header className="mb-4">
          <h1 className="text-2xl font-semibold tracking-tight">Indicatori</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gold-standard market &amp; UX research indicators —{" "}
            {INDICATORS.length} indicators across{" "}
            {INDICATOR_CATEGORIES.length} categories.
          </p>
        </header>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setQuery("");
              }}
              placeholder="Search — e.g. awareness, purchase intention, NPS, SUS…"
              className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-9 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-input bg-background px-3.5 text-sm font-medium shadow-sm transition-colors hover:bg-slate-2 data-[state=open]:bg-slate-2">
                <SlidersHorizontal className="h-4 w-4 text-slate-10" />
                Filters
                {selected.size > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-9 px-1.5 text-[11px] font-semibold tabular-nums text-white">
                    {selected.size}
                  </span>
                )}
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                align="end"
                sideOffset={8}
                className="z-50 w-80 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
              >
                <div className="flex items-center justify-between px-2.5 pb-1.5 pt-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-10">
                    Category
                  </span>
                  {selected.size > 0 && (
                    <button
                      onClick={() => updateParams({ cats: new Set() })}
                      className="text-xs font-medium text-indigo-9 transition-colors hover:text-indigo-10"
                    >
                      Reset
                    </button>
                  )}
                </div>
                {INDICATOR_CATEGORIES.map((cat) => {
                  const count = countByCategory.get(cat) ?? 0;
                  const active = selected.has(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      disabled={count === 0 && !active}
                      aria-pressed={active}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors hover:bg-slate-2 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                          active
                            ? "border-indigo-9 bg-indigo-9 text-white"
                            : "border-slate-7 bg-background"
                        }`}
                      >
                        {active && <Check className="h-3 w-3" strokeWidth={3} />}
                      </span>
                      <span className="flex-1 text-left text-[13px]">{cat}</span>
                      <span className="text-xs tabular-nums text-slate-10">
                        {count}
                      </span>
                    </button>
                  );
                })}
                <div className="mt-1 border-t border-border px-2.5 py-2 text-xs text-slate-10">
                  Showing {shownCount} of {INDICATORS.length} indicators
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>

        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {INDICATOR_CATEGORIES.filter((cat) => selected.has(cat)).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  aria-label={`Remove filter ${cat}`}
                  className="group inline-flex items-center gap-1 rounded-full bg-indigo-3 py-1 pl-3 pr-2 text-xs font-medium text-indigo-11 transition-colors hover:bg-indigo-4"
                >
                  {cat}
                  <X className="h-3 w-3 text-indigo-9 transition-colors group-hover:text-indigo-11" />
                </button>
              ),
            )}
            <button
              onClick={clearAll}
              className="ml-1 text-xs font-medium text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {grouped.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <p className="text-sm text-muted-foreground">
            No indicators match{query ? <> “{query}”</> : " these filters"}.
          </p>
          <button
            onClick={clearAll}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-10 pt-8">
          {hasActiveFilters && (
            <p className="-mb-6 text-xs text-muted-foreground">
              Showing {shownCount} of {INDICATORS.length} indicators
            </p>
          )}
          {grouped.map((group) => (
            <section key={group.category}>
              <div className="mb-3 flex items-baseline gap-2">
                <h2 className="text-sm font-semibold tracking-tight">
                  {group.category}
                </h2>
                <span className="rounded-full bg-slate-3 px-2 py-0.5 text-[11px] font-medium text-slate-11">
                  {group.indicators.length}
                </span>
              </div>
              <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {group.indicators.map((ind) => (
                  <li
                    key={ind.id}
                    className="flex flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-ring/60"
                  >
                    <h3 className="text-[15px] font-semibold leading-snug">
                      <Highlight text={ind.name} terms={terms} />
                    </h3>
                    {ind.aliases.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {ind.aliases.slice(0, 3).map((alias) => (
                          <span
                            key={alias}
                            className="rounded-md bg-slate-3 px-1.5 py-0.5 text-[11px] font-medium text-slate-11"
                          >
                            <Highlight text={alias} terms={terms} />
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      <Highlight text={ind.description} terms={terms} />
                    </p>
                    <div className="mt-3 flex gap-2 rounded-lg bg-slate-2 px-3 py-2">
                      <Ruler className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-9" />
                      <p className="text-xs leading-relaxed text-slate-11">
                        <Highlight text={ind.measurement} terms={terms} />
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
