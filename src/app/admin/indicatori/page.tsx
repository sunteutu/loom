"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Ruler, Search, SlidersHorizontal, X } from "lucide-react";
import { Dialog, Popover } from "radix-ui";
import {
  INDICATOR_CATEGORIES,
  INDICATORS,
  type Indicator,
  type IndicatorCategory,
  type SurveyItem,
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
    ...(indicator.qualQuestions ?? []),
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
          <mark key={i} className="rounded-sm bg-amber-4 px-0.5 text-amber-12">
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
  const [selected, setSelected] = useState<Indicator | null>(null);
  const selectedCats = useMemo(() => {
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
      const next = new Set(selectedCats);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      updateParams({ cats: next });
    },
    [selectedCats, updateParams],
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
          selectedCats.size > 0 && !selectedCats.has(cat)
            ? []
            : queryMatched.filter((ind) => ind.category === cat),
      })).filter((g) => g.indicators.length > 0),
    [queryMatched, selectedCats],
  );

  const shownCount = grouped.reduce((n, g) => n + g.indicators.length, 0);
  const hasActiveFilters = query !== "" || selectedCats.size > 0;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-8 pb-16">
      <div className="sticky top-0 z-10 -mx-8 border-b border-border bg-background/95 px-8 pb-4 pt-8 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <header className="mb-4">
          <h1 className="text-2xl font-semibold tracking-tight">Indicatori</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gold-standard market &amp; UX research indicators —{" "}
            {INDICATORS.length} indicators across{" "}
            {INDICATOR_CATEGORIES.length} categories. Click an indicator for its
            qual interview guide and survey items.
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
                {selectedCats.size > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-9 px-1.5 text-[11px] font-semibold tabular-nums text-white">
                    {selectedCats.size}
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
                  {selectedCats.size > 0 && (
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
                  const active = selectedCats.has(cat);
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
            {INDICATOR_CATEGORIES.filter((cat) => selectedCats.has(cat)).map(
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
                {group.indicators.map((ind) => {
                  const qualCount = ind.qualQuestions?.length ?? 0;
                  const quantCount = ind.surveyItems?.length ?? 0;
                  return (
                    <li key={ind.id}>
                      <button
                        onClick={() => setSelected(ind)}
                        className="flex h-full w-full flex-col rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-ring/60 hover:bg-slate-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
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
                        <div className="mt-3 flex items-center gap-2 border-t border-border pt-2.5 text-[11px] font-medium text-slate-10">
                          <span>{qualCount} qual questions</span>
                          <span className="text-slate-7">·</span>
                          <span>
                            {quantCount > 0
                              ? `${quantCount} survey item${quantCount > 1 ? "s" : ""}`
                              : "survey spec"}
                          </span>
                          <span className="ml-auto font-semibold text-indigo-9">
                            View →
                          </span>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}

      <IndicatorDrawer
        indicator={selected}
        onClose={() => setSelected(null)}
      />
    </main>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate-10">
      {children}
    </h3>
  );
}

function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex gap-2">
      <dt className="w-20 shrink-0 font-medium text-slate-10">{label}</dt>
      <dd className="flex-1 text-slate-11">{children}</dd>
    </div>
  );
}

function SurveyItemView({ item }: { item: SurveyItem }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3.5">
      <span className="inline-block rounded bg-indigo-3 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-11">
        {item.type}
      </span>
      <p className="mt-2 text-sm font-medium leading-snug">{item.stem}</p>

      {item.subStems && (
        <ul className="ml-1 mt-1.5 flex flex-col gap-1 text-[13px] text-muted-foreground">
          {item.subStems.map((s, i) => (
            <li key={i} className="flex gap-1.5">
              <span className="text-slate-9">•</span>
              {s}
            </li>
          ))}
        </ul>
      )}

      {item.scalePoints && (
        <div className="mt-2 flex flex-wrap gap-1">
          {item.scalePoints.map((p, i) => (
            <span
              key={i}
              className="rounded border border-border bg-slate-2 px-1.5 py-0.5 text-[11px] text-slate-11"
            >
              {p}
            </span>
          ))}
        </div>
      )}

      {item.options && (
        <div className="mt-2 flex flex-wrap gap-1">
          {item.options.map((p, i) => (
            <span
              key={i}
              className="rounded border border-border bg-slate-2 px-1.5 py-0.5 text-[11px] text-slate-11"
            >
              {p}
            </span>
          ))}
        </div>
      )}

      {item.attributes && (
        <div className="mt-2">
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-10">
            Battery items
          </p>
          <ul className="ml-1 mt-1 flex flex-col gap-1 text-[13px] text-muted-foreground">
            {item.attributes.map((a, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-slate-9">•</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      )}

      <dl className="mt-3 grid grid-cols-1 gap-1.5 text-xs">
        <DetailRow label="Base">{item.base}</DetailRow>
        {item.randomize && <DetailRow label="Randomize">Yes</DetailRow>}
        <DetailRow label="Analysis">{item.analysis}</DetailRow>
        <DetailRow label="Placement">{item.placement}</DetailRow>
        {item.notes && <DetailRow label="Notes">{item.notes}</DetailRow>}
      </dl>
    </div>
  );
}

function IndicatorDrawer({
  indicator,
  onClose,
}: {
  indicator: Indicator | null;
  onClose: () => void;
}) {
  return (
    <Dialog.Root open={!!indicator} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col border-l border-border bg-background shadow-2xl outline-none data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right">
          {indicator && (
            <>
              <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-10">
                    {indicator.category}
                  </p>
                  <Dialog.Title className="mt-1 text-lg font-semibold leading-snug">
                    {indicator.name}
                  </Dialog.Title>
                  {indicator.aliases.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {indicator.aliases.map((a) => (
                        <span
                          key={a}
                          className="rounded-md bg-slate-3 px-1.5 py-0.5 text-[11px] font-medium text-slate-11"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <Dialog.Close
                  aria-label="Close"
                  className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Dialog.Close>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5">
                <Dialog.Description className="text-sm leading-relaxed text-muted-foreground">
                  {indicator.description}
                </Dialog.Description>

                {indicator.qualQuestions &&
                  indicator.qualQuestions.length > 0 && (
                    <section className="mt-7">
                      <SectionLabel>Qualitative — interview guide</SectionLabel>
                      {indicator.qualIntent && (
                        <p className="mt-2 rounded-lg bg-indigo-2 px-3 py-2 text-[13px] leading-relaxed text-indigo-11">
                          <span className="font-semibold">Intent: </span>
                          {indicator.qualIntent}
                        </p>
                      )}
                      <ol className="mt-3 flex flex-col gap-2.5">
                        {indicator.qualQuestions.map((q, i) => (
                          <li
                            key={i}
                            className="flex gap-2.5 text-sm leading-relaxed"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-3 text-[11px] font-semibold tabular-nums text-slate-11">
                              {i + 1}
                            </span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ol>
                    </section>
                  )}

                <section className="mt-7">
                  <SectionLabel>Quantitative — survey</SectionLabel>
                  <div className="mt-2 flex gap-2 rounded-lg bg-slate-2 px-3 py-2">
                    <Ruler className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-9" />
                    <p className="text-xs leading-relaxed text-slate-11">
                      <span className="font-medium text-foreground/70">
                        Measurement:{" "}
                      </span>
                      {indicator.measurement}
                    </p>
                  </div>
                  {indicator.surveyItems && indicator.surveyItems.length > 0 ? (
                    <div className="mt-3 flex flex-col gap-3">
                      {indicator.surveyItems.map((item, i) => (
                        <SurveyItemView key={i} item={item} />
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-xs italic text-slate-10">
                      Structured survey item not authored yet — the measurement
                      note above is the spec.
                    </p>
                  )}
                </section>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
