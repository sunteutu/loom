"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Loader2,
  NotebookPen,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  INDICATOR_CATEGORIES,
  INDICATORS,
  type Indicator,
} from "@/lib/indicators";
import { INDICATOR_QUAL_RO } from "@/lib/indicators-ro";
import {
  deriveSelections,
  learnExample,
  MAX_QUESTIONS,
  parseQuestions,
  reassignQuestion,
  removeQuestion,
  renameMapping,
  selectionKey,
  setAssignments,
  setQuestions,
  setSelectionOverride,
  readLearnedExamples,
  useMappingStore,
  type MappingDoc,
  type MappingEngine,
  type QuestionAssignment,
  type Selection,
} from "@/lib/mapping";
import {
  createLexicalEngine,
  WEAK_MATCH_THRESHOLD,
  type LexicalEngine,
} from "@/lib/mapping-lexical";
import { createGuideFromMapping, type CoverageEntry } from "@/lib/guides";
import { createSurveyFromMapping } from "@/lib/surveys";

const INDICATOR_BY_ID = new Map(INDICATORS.map((ind) => [ind.id, ind]));

/** Minimum stem match for a survey item to be selected at generation. */
const SURVEY_SELECT_FLOOR = 0.18;

// ── Method suggestion heuristic ────────────────────────────────────────────

const QUAL_HINT =
  /\bde ce\b|cum se simt|ce parere|ce părere|ce cred|cum percep|ce ii motiveaza|ce îi motivează|\bwhy\b|how do .* feel|in profunzime|motivele/i;
const QUANT_HINT =
  /\bcati\b|\bcâți\b|cat de des|cât de des|ce procent|cat ar plati|cât ar plăti|cat de mult|cât de mult|how many|how often|ce pondere|cuantifica|masuram|măsurăm|\bnps\b|scor/i;

function suggestMethod(texts: string[]): "qual" | "quant" | "mixt" {
  let qual = 0;
  let quant = 0;
  for (const t of texts) {
    if (QUAL_HINT.test(t)) qual++;
    if (QUANT_HINT.test(t)) quant++;
  }
  if (qual > 0 && quant === 0) return "qual";
  if (quant > 0 && qual === 0) return "quant";
  return "mixt";
}

const METHOD_UI = {
  qual: { label: "Qual", className: "bg-indigo-3 text-indigo-11" },
  quant: { label: "Quant", className: "bg-amber-3 text-amber-11" },
  mixt: { label: "Mixt", className: "bg-slate-3 text-slate-11" },
} as const;

/** Shared reassign flow: rescore inside the chosen indicator + teach v1. */
function applyReassign(
  docId: string,
  question: { id: string; text: string },
  indicatorId: string | null,
  lexical: LexicalEngine,
) {
  let matches: { indicatorId: string; sourceIndex: number; score: number }[] = [];
  if (indicatorId) {
    matches = lexical
      .scoreQuestionDetailed(question.text, new Set([indicatorId]))
      .slice(0, 2);
    if (matches.length === 0) {
      matches = [{ indicatorId, sourceIndex: 0, score: 0 }];
    }
    learnExample(indicatorId, question.text);
  }
  reassignQuestion(docId, question.id, indicatorId, matches);
}

/** AI suggestion for one weak question (from the targeted v2 check). */
interface AiSuggestion {
  indicatorId: string;
  confidence: number;
  rationale?: string;
}

function catalogQuestionText(
  indicatorId: string,
  sourceIndex: number,
  lang: "ro" | "en",
): string {
  if (lang === "ro") {
    const ro = INDICATOR_QUAL_RO[indicatorId]?.qualQuestions[sourceIndex];
    if (ro) return ro;
  }
  return (
    INDICATOR_BY_ID.get(indicatorId)?.qualQuestions?.[sourceIndex] ??
    `${indicatorId}[${sourceIndex}]`
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function MapareWorkspacePage() {
  const { id } = useParams<{ id: string }>();
  const store = useMappingStore();
  const doc = store.mappings.find((m) => m.id === id);

  if (!doc) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-8 pt-16 text-center">
        <p className="text-base text-muted-foreground">
          Maparea nu există (poate a fost ștearsă).
        </p>
        <Link
          href="/mapare"
          className="mt-3 inline-block text-sm font-medium text-indigo-11 underline-offset-2 hover:underline"
        >
          ← Înapoi la mapări
        </Link>
      </main>
    );
  }

  return <MappingWorkspace doc={doc} />;
}

function MappingWorkspace({ doc }: { doc: MappingDoc }) {
  const router = useRouter();
  const [pasteText, setPasteText] = useState("");
  const [showPaste, setShowPaste] = useState(doc.questions.length === 0);
  const [engine, setEngine] = useState<MappingEngine>("v1");
  const [displayLang, setDisplayLang] = useState<"ro" | "en">("ro");
  const [running, setRunning] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [aiChecking, setAiChecking] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<
    Record<string, AiSuggestion[]>
  >({});

  // One lexical engine per workspace visit; also used for reassign rescoring.
  const lexical = useMemo<LexicalEngine>(
    () => createLexicalEngine(readLearnedExamples()),
    [],
  );

  const assignmentByQuestion = useMemo(() => {
    const map = new Map<string, QuestionAssignment>();
    for (const a of doc.assignments) map.set(a.questionId, a);
    return map;
  }, [doc.assignments]);

  const selections = useMemo(() => deriveSelections(doc), [doc]);

  /** Groups: indicator → its selections + the stakeholder questions covered. */
  const groups = useMemo(() => {
    const byIndicator = new Map<string, Selection[]>();
    for (const sel of selections) {
      byIndicator.set(sel.indicatorId, [
        ...(byIndicator.get(sel.indicatorId) ?? []),
        sel,
      ]);
    }
    const ordered = [...byIndicator.entries()]
      .map(([indicatorId, sels]) => {
        const covered = new Set<string>();
        for (const s of sels) for (const q of s.coveredQuestionIds) covered.add(q);
        return {
          indicatorId,
          selections: sels.sort((a, b) => a.sourceIndex - b.sourceIndex),
          coveredQuestionIds: covered,
        };
      })
      .sort((a, b) => b.coveredQuestionIds.size - a.coveredQuestionIds.size);
    const unmapped = doc.questions
      .filter((q) => {
        const a = assignmentByQuestion.get(q.id);
        return a && (!a.indicatorId || (a.matches ?? []).length === 0);
      })
      .map((q) => q.id);
    return { ordered, unmapped };
  }, [selections, doc.questions, assignmentByQuestion]);

  const hasRun = doc.assignments.length > 0;
  const questionById = new Map(doc.questions.map((q) => [q.id, q]));

  // ── Engines ──────────────────────────────────────────────────────────────

  const runV1 = () => {
    const perQuestion = lexical.mapQuestionsDetailed(
      doc.questions.map((q) => q.text),
    );
    const assignments: QuestionAssignment[] = doc.questions.map((q, i) => {
      const matches = perQuestion[i];
      return {
        questionId: q.id,
        indicatorId: matches[0]?.indicatorId ?? null,
        confidence: matches[0]?.score ?? 0,
        engine: "v1",
        matches,
        status: "suggested",
      };
    });
    setAssignments(doc.id, assignments);
  };

  const runV2 = async () => {
    setRunning(true);
    setApiError(null);
    try {
      const res = await fetch("/api/map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions: doc.questions.map((q) => q.text) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.error ?? `Eroare ${res.status}`);
        return;
      }
      // Hybrid: the LLM picks the indicators; the local scorer selects the
      // specific catalog questions inside them.
      const assignments: QuestionAssignment[] = doc.questions.map((q, i) => {
        const candidates: {
          indicatorId: string;
          confidence: number;
          rationale?: string;
        }[] = data.results?.[i]?.candidates ?? [];
        const restrict = new Set(candidates.map((c) => c.indicatorId));
        const matches =
          restrict.size > 0
            ? lexical.scoreQuestionDetailed(q.text, restrict).slice(0, 3)
            : [];
        // Guarantee at least the LLM winner's best question survives even
        // when the local scorer is unsure.
        if (matches.length === 0 && candidates[0]) {
          matches.push({
            indicatorId: candidates[0].indicatorId,
            sourceIndex: 0,
            score: candidates[0].confidence,
          });
        }
        return {
          questionId: q.id,
          indicatorId: candidates[0]?.indicatorId ?? null,
          confidence: candidates[0]?.confidence ?? 0,
          engine: "v2",
          rationale: candidates[0]?.rationale,
          matches,
          status: "suggested",
        };
      });
      setAssignments(doc.id, assignments);
    } catch {
      setApiError("Nu am putut contacta serverul — verifică conexiunea.");
    } finally {
      setRunning(false);
    }
  };

  const runMapping = () => {
    setAiSuggestions({});
    if (engine === "v1") runV1();
    else void runV2();
  };

  /** Questions the engine is unsure about — the second-opinion targets. */
  const weakQuestions = useMemo(
    () =>
      doc.questions.filter((q) => {
        const a = assignmentByQuestion.get(q.id);
        if (!a) return false;
        return (
          !a.indicatorId ||
          (a.matches ?? []).length === 0 ||
          a.confidence < WEAK_MATCH_THRESHOLD
        );
      }),
    [doc.questions, assignmentByQuestion],
  );

  /** Targeted v2: send ONLY the weak questions to the LLM, as suggestions. */
  const checkWeakWithAi = async () => {
    setAiChecking(true);
    setApiError(null);
    try {
      const res = await fetch("/api/map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions: weakQuestions.map((q) => q.text) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.error ?? `Eroare ${res.status}`);
        return;
      }
      const next: Record<string, AiSuggestion[]> = {};
      weakQuestions.forEach((q, i) => {
        const candidates: AiSuggestion[] = (
          data.results?.[i]?.candidates ?? []
        ).slice(0, 2);
        if (candidates.length > 0) next[q.id] = candidates;
      });
      setAiSuggestions(next);
    } catch {
      setApiError("Nu am putut contacta serverul — verifică conexiunea.");
    } finally {
      setAiChecking(false);
    }
  };

  // ── Generation ───────────────────────────────────────────────────────────

  const buildCoverage = (): CoverageEntry[] =>
    groups.ordered.map((g) => ({
      indicatorId: g.indicatorId,
      questions: [...g.coveredQuestionIds]
        .map((qid) => questionById.get(qid)?.text)
        .filter((t): t is string => !!t),
    }));

  const generateGuide = () => {
    // Only the SELECTED catalog questions — not the indicator's full battery.
    const entries = groups.ordered.flatMap((g) =>
      g.selections.map((sel) => ({
        text: catalogQuestionText(sel.indicatorId, sel.sourceIndex, "en"),
        indicatorId: sel.indicatorId,
        sourceIndex: sel.sourceIndex,
      })),
    );
    const guide = createGuideFromMapping(
      `Ghid — ${doc.title}`,
      entries,
      buildCoverage(),
    );
    router.push(`/ghiduri/${guide.id}`);
  };

  const generateSurvey = () => {
    // Per theme: keep the survey items whose stems match any covered
    // stakeholder question; if none clears the floor, take the whole
    // indicator (a theme must not arrive empty in the questionnaire).
    const entries = groups.ordered.flatMap((g) => {
      const ind = INDICATOR_BY_ID.get(g.indicatorId);
      const all = ind?.surveyItems ?? [];
      if (all.length === 0) return [];
      const restrict = new Set([g.indicatorId]);
      const picked = new Set<number>();
      for (const qid of g.coveredQuestionIds) {
        const text = questionById.get(qid)?.text;
        if (!text) continue;
        for (const m of lexical.scoreSurveyWithinIndicators(text, restrict)) {
          if (m.score >= SURVEY_SELECT_FLOOR) picked.add(m.sourceIndex);
        }
      }
      const indices =
        picked.size > 0 ? [...picked].sort((a, b) => a - b) : all.map((_, i) => i);
      return indices.map((sourceIndex) => ({
        stem: all[sourceIndex].stem,
        indicatorId: g.indicatorId,
        sourceIndex,
      }));
    });
    const survey = createSurveyFromMapping(
      `Chestionar — ${doc.title}`,
      entries,
      buildCoverage(),
    );
    router.push(`/chestionare/${survey.id}`);
  };

  const selectedCount = groups.ordered.reduce(
    (n, g) => n + g.selections.length,
    0,
  );

  // ── UI ───────────────────────────────────────────────────────────────────

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-8 pb-28 pt-8">
      <div className="mb-1 flex items-center justify-between gap-4">
        <Link
          href="/mapare"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          Mapare
        </Link>
        {hasRun && (
          <div
            role="radiogroup"
            aria-label="Limba întrebărilor de ghid afișate"
            className="flex items-center gap-0.5 rounded-md border border-border p-0.5"
          >
            {(["ro", "en"] as const).map((l) => (
              <button
                key={l}
                role="radio"
                aria-checked={displayLang === l}
                onClick={() => setDisplayLang(l)}
                className={`rounded px-2 py-1 text-xs font-semibold uppercase transition-colors ${
                  displayLang === l
                    ? "bg-indigo-9 text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </div>

      <input
        aria-label="Titlul mapării"
        value={doc.title}
        onChange={(e) => renameMapping(doc.id, e.target.value)}
        className="mt-3 w-full rounded-md border border-transparent bg-transparent text-2xl font-semibold tracking-tight outline-none transition-colors hover:border-border focus:border-ring"
      />
      <p className="mt-1 text-sm text-muted-foreground">
        {doc.questions.length}/{MAX_QUESTIONS} întrebări stakeholderi
        {hasRun && (
          <>
            {" "}
            · {groups.ordered.length} teme ·{" "}
            <span className="font-medium text-foreground">
              {selectedCount} întrebări de ghid selectate
            </span>
            {groups.unmapped.length > 0 && (
              <>
                {" "}
                ·{" "}
                <span className="font-medium text-amber-11">
                  {groups.unmapped.length} nemapate
                </span>
              </>
            )}
          </>
        )}
      </p>

      {/* ── 1. Input ─────────────────────────────────────────────────── */}
      <section className="mt-5 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-10">
            Întrebările stakeholderilor
          </h2>
          {doc.questions.length > 0 && (
            <button
              onClick={() => setShowPaste((s) => !s)}
              className="text-xs font-medium text-indigo-11 underline-offset-2 hover:underline"
            >
              {showPaste ? "Ascunde zona de paste" : "Lipește alt text"}
            </button>
          )}
        </div>

        {showPaste && (
          <div className="mt-3">
            <textarea
              aria-label="Lipește întrebările stakeholderilor"
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              rows={8}
              placeholder={
                "Lipește aici întrebările, câte una pe linie — numerotarea și bullet-urile se curăță automat.\nex.:\n1. De ce ne aleg clienții pe noi și nu concurența?\n2. Cât ar plăti pentru varianta premium?\n3. De ce renunță utilizatorii după prima lună?"
              }
              className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-base leading-relaxed shadow-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
            <div className="mt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  const parsed = parseQuestions(pasteText);
                  if (parsed.length === 0) return;
                  setQuestions(doc.id, parsed);
                  setPasteText("");
                  setShowPaste(false);
                }}
                disabled={!pasteText.trim()}
                className="rounded-md bg-indigo-9 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Preia întrebările
              </button>
              <span className="text-xs text-muted-foreground">
                {parseQuestions(pasteText).length} întrebări detectate
                {doc.questions.length > 0 && " — înlocuiesc lista actuală"}
              </span>
            </div>
          </div>
        )}

        {doc.questions.length > 0 && !hasRun && (
          <ul className="mt-3 flex flex-col gap-1.5">
            {doc.questions.map((q, i) => (
              <li key={q.id} className="group flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-1 w-6 shrink-0 text-right text-xs font-semibold tabular-nums text-slate-10"
                >
                  {i + 1}.
                </span>
                <input
                  aria-label={`Întrebarea ${i + 1}`}
                  value={q.text}
                  onChange={(e) =>
                    setQuestions(
                      doc.id,
                      doc.questions.map((x) =>
                        x.id === q.id ? e.target.value : x.text,
                      ),
                    )
                  }
                  className="min-w-0 flex-1 rounded-md border border-transparent bg-transparent px-1.5 py-0.5 text-sm leading-relaxed outline-none transition-colors hover:border-border focus:border-ring"
                />
                <button
                  onClick={() => removeQuestion(doc.id, q.id)}
                  aria-label={`Șterge întrebarea ${i + 1}`}
                  className="rounded p-1 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-red-3 hover:text-red-11"
                >
                  <Trash2 aria-hidden className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ── 2. Engine + run ──────────────────────────────────────────── */}
      {doc.questions.length > 0 && (
        <section className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
          <div
            role="radiogroup"
            aria-label="Motorul de mapare"
            className="flex items-center gap-0.5 rounded-md border border-border p-0.5"
          >
            {(
              [
                {
                  value: "v1",
                  label: "v1 — Local",
                  title: "Lexical, instant, gratuit, datele rămân în browser",
                },
                {
                  value: "v2",
                  label: "v2 — AI (OpenRouter)",
                  title:
                    "LLM prin OpenRouter — mai fin, dar trimite întrebările prin server",
                },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                role="radio"
                aria-checked={engine === opt.value}
                title={opt.title}
                onClick={() => setEngine(opt.value)}
                className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
                  engine === opt.value
                    ? "bg-indigo-9 text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            onClick={runMapping}
            disabled={running}
            className="inline-flex items-center gap-1.5 rounded-md bg-indigo-9 px-3.5 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {running ? (
              <>
                <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
                Mapez…
              </>
            ) : (
              <>
                <Sparkles aria-hidden className="h-4 w-4" />
                {hasRun ? "Remapează" : "Mapează"}
              </>
            )}
          </button>
          {engine === "v1" && (
            <span className="text-xs text-muted-foreground">
              instant · gratuit · local
            </span>
          )}
          {apiError && (
            <p role="alert" className="w-full text-sm font-medium text-red-11">
              {apiError}
            </p>
          )}
        </section>
      )}

      {/* ── 3. Review board ──────────────────────────────────────────── */}
      {hasRun && (
        <div className="mt-6 flex flex-col gap-4">
          {weakQuestions.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-amber-9/40 bg-amber-2 px-4 py-2.5 dark:bg-card">
              <p className="text-sm text-amber-11">
                {weakQuestions.length}{" "}
                {weakQuestions.length === 1
                  ? "întrebare are potrivire slabă"
                  : "întrebări au potrivire slabă"}{" "}
                (&lt;{Math.round(WEAK_MATCH_THRESHOLD * 100)}%) — vezi
                alternativele propuse sub fiecare.
              </p>
              <button
                onClick={() => void checkWeakWithAi()}
                disabled={aiChecking}
                className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-amber-9/40 px-2.5 py-1 text-xs font-medium text-amber-11 transition-colors hover:bg-amber-3 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {aiChecking ? (
                  <>
                    <Loader2 aria-hidden className="h-3.5 w-3.5 animate-spin" />
                    Verific…
                  </>
                ) : (
                  <>
                    <Sparkles aria-hidden className="h-3.5 w-3.5" />
                    Verifică cu AI ({weakQuestions.length})
                  </>
                )}
              </button>
            </div>
          )}
          {groups.ordered.map((group) => (
            <IndicatorGroupCard
              key={group.indicatorId}
              doc={doc}
              group={group}
              displayLang={displayLang}
              questionById={questionById}
              assignmentByQuestion={assignmentByQuestion}
              lexical={lexical}
              aiSuggestions={aiSuggestions}
            />
          ))}

          {groups.unmapped.length > 0 && (
            <section className="rounded-xl border border-dashed border-amber-9/40 bg-card p-4">
              <h2 className="text-base font-semibold text-amber-11">
                Nemapate
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Sub pragul de încredere — atribuie-le manual unui indicator sau
                lasă-le pe dinafară.
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {groups.unmapped.map((qid) => (
                  <StakeholderQuestionRow
                    key={qid}
                    docId={doc.id}
                    question={questionById.get(qid)!}
                    assignment={assignmentByQuestion.get(qid)!}
                    lexical={lexical}
                    aiSuggestions={aiSuggestions[qid]}
                  />
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* ── 4. Generate ──────────────────────────────────────────────── */}
      {hasRun && selectedCount > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center gap-3 px-8 py-3">
            <span className="text-sm text-muted-foreground">
              {selectedCount} întrebări din {groups.ordered.length} teme →
            </span>
            <button
              onClick={generateGuide}
              className="inline-flex items-center gap-1.5 rounded-md bg-indigo-9 px-3.5 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-10"
            >
              <NotebookPen aria-hidden className="h-4 w-4" />
              Generează ghid (qual)
            </button>
            <button
              onClick={generateSurvey}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
            >
              <ClipboardList aria-hidden className="h-4 w-4" />
              Generează chestionar (quant)
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

// ── Indicator group card ───────────────────────────────────────────────────

function IndicatorGroupCard({
  doc,
  group,
  displayLang,
  questionById,
  assignmentByQuestion,
  lexical,
  aiSuggestions,
}: {
  doc: MappingDoc;
  group: {
    indicatorId: string;
    selections: Selection[];
    coveredQuestionIds: Set<string>;
  };
  displayLang: "ro" | "en";
  questionById: Map<string, { id: string; text: string }>;
  assignmentByQuestion: Map<string, QuestionAssignment>;
  lexical: LexicalEngine;
  aiSuggestions: Record<string, AiSuggestion[]>;
}) {
  const [showRest, setShowRest] = useState(false);
  const ind = INDICATOR_BY_ID.get(group.indicatorId);
  if (!ind) return null;

  const coveredTexts = [...group.coveredQuestionIds]
    .map((qid) => questionById.get(qid)?.text ?? "")
    .filter(Boolean);
  const method = METHOD_UI[suggestMethod(coveredTexts)];

  const selectedIndices = new Set(group.selections.map((s) => s.sourceIndex));
  const rest = (ind.qualQuestions ?? [])
    .map((_, i) => i)
    .filter((i) => !selectedIndices.has(i));

  /** Short labels "Q3, Q7" for the stakeholder questions a selection covers. */
  const shortLabel = (qid: string) => {
    const idx = [...questionById.keys()].indexOf(qid);
    return idx === -1 ? "?" : `Q${idx + 1}`;
  };

  return (
    <section className="rounded-xl border border-border bg-card p-4">
      <div className="flex flex-wrap items-baseline gap-2">
        <h2 className="text-base font-semibold">{ind.name}</h2>
        <span className="text-xs text-muted-foreground">{ind.category}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${method.className}`}
          title="Metoda sugerată pe baza formulării întrebărilor"
        >
          {method.label}
        </span>
        <span className="ml-auto text-xs tabular-nums text-slate-10">
          {group.selections.length} selectate ·{" "}
          {group.coveredQuestionIds.size} întrebări acoperite
        </span>
      </div>

      {/* Selected catalog questions, with match % and coverage chips. */}
      <ul className="mt-3 flex flex-col gap-2">
        {group.selections.map((sel) => {
          const key = selectionKey(sel.indicatorId, sel.sourceIndex);
          const pct = Math.round(sel.matchScore * 100);
          return (
            <li
              key={key}
              className="flex items-start gap-2.5 rounded-lg border border-border bg-background p-2.5"
            >
              <input
                type="checkbox"
                checked
                onChange={() => setSelectionOverride(doc.id, key, false)}
                aria-label="Scoate întrebarea din selecție"
                className="mt-1 h-4 w-4 shrink-0 accent-indigo-9"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed">
                  {catalogQuestionText(
                    sel.indicatorId,
                    sel.sourceIndex,
                    displayLang,
                  )}
                </p>
                {sel.coveredQuestionIds.length > 0 && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    acoperă:{" "}
                    {sel.coveredQuestionIds.map((qid, i) => (
                      <span
                        key={qid}
                        title={questionById.get(qid)?.text}
                        className="font-medium text-slate-11"
                      >
                        {i > 0 && ", "}
                        {shortLabel(qid)}
                      </span>
                    ))}
                  </p>
                )}
              </div>
              <span
                className={`mt-0.5 shrink-0 rounded-full px-1.5 py-0.5 text-xs font-semibold tabular-nums ${
                  pct >= 50
                    ? "bg-indigo-3 text-indigo-11"
                    : pct > 0
                      ? "bg-amber-3 text-amber-11"
                      : "bg-slate-3 text-slate-11"
                }`}
                title={pct > 0 ? `Potrivire ${pct}%` : "Adăugată manual"}
              >
                {pct > 0 ? `${pct}%` : "manual"}
              </span>
            </li>
          );
        })}
      </ul>

      {/* The indicator's remaining questions — addable manually. */}
      {rest.length > 0 && (
        <div className="mt-2">
          <button
            onClick={() => setShowRest((s) => !s)}
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {showRest ? (
              <ChevronDown aria-hidden className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight aria-hidden className="h-3.5 w-3.5" />
            )}
            alte {rest.length} întrebări din acest indicator
          </button>
          {showRest && (
            <ul className="mt-2 flex flex-col gap-1.5">
              {rest.map((sourceIndex) => {
                const key = selectionKey(group.indicatorId, sourceIndex);
                return (
                  <li key={key} className="flex items-start gap-2.5 px-2.5">
                    <input
                      type="checkbox"
                      checked={false}
                      onChange={() => setSelectionOverride(doc.id, key, true)}
                      aria-label="Adaugă întrebarea în selecție"
                      className="mt-1 h-4 w-4 shrink-0 accent-indigo-9"
                    />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {catalogQuestionText(
                        group.indicatorId,
                        sourceIndex,
                        displayLang,
                      )}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {/* The stakeholder questions under this theme, with reassign. */}
      <div className="mt-3 border-t border-border pt-3">
        <ul className="flex flex-col gap-2">
          {[...group.coveredQuestionIds].map((qid) => (
            <StakeholderQuestionRow
              key={qid}
              docId={doc.id}
              question={questionById.get(qid)!}
              assignment={assignmentByQuestion.get(qid)!}
              lexical={lexical}
              aiSuggestions={aiSuggestions[qid]}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Stakeholder question row ───────────────────────────────────────────────

function StakeholderQuestionRow({
  docId,
  question,
  assignment,
  lexical,
  aiSuggestions,
}: {
  docId: string;
  question: { id: string; text: string };
  assignment: QuestionAssignment;
  lexical: LexicalEngine;
  aiSuggestions?: AiSuggestion[];
}) {
  const confidence = Math.round(assignment.confidence * 100);
  const isWeak =
    !assignment.indicatorId ||
    (assignment.matches ?? []).length === 0 ||
    assignment.confidence < WEAK_MATCH_THRESHOLD;

  // Second opinion: only computed for weak rows, and only alternatives to
  // the current theme (cross-searches qual questions + survey stems + context).
  const alternatives = useMemo(
    () =>
      isWeak
        ? lexical
            .suggestAlternatives(
              question.text,
              assignment.indicatorId ?? undefined,
            )
            .filter((s) => s.indicatorId !== assignment.indicatorId)
        : [],
    [isWeak, lexical, question.text, assignment.indicatorId],
  );

  const aiChips = (aiSuggestions ?? []).filter(
    (s) => s.indicatorId !== assignment.indicatorId,
  );

  return (
    <li className="flex items-start gap-2.5">
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-relaxed text-slate-11">{question.text}</p>
        {assignment.rationale && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {assignment.rationale}
          </p>
        )}
        {isWeak && (alternatives.length > 0 || aiChips.length > 0) && (
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-muted-foreground">
              Poate se potrivește mai bine:
            </span>
            {aiChips.map((s) => (
              <button
                key={`ai-${s.indicatorId}`}
                onClick={() =>
                  applyReassign(docId, question, s.indicatorId, lexical)
                }
                title={s.rationale ?? "Sugestie AI"}
                className="inline-flex items-center gap-1 rounded-full bg-indigo-3 px-2 py-0.5 text-xs font-medium text-indigo-11 transition-colors hover:bg-indigo-4"
              >
                <Sparkles aria-hidden className="h-3 w-3" />
                {INDICATOR_BY_ID.get(s.indicatorId)?.name ?? s.indicatorId} ·{" "}
                {Math.round(s.confidence * 100)}%
              </button>
            ))}
            {alternatives.map((s) => (
              <button
                key={s.indicatorId}
                onClick={() =>
                  applyReassign(docId, question, s.indicatorId, lexical)
                }
                title={
                  s.via === "survey"
                    ? "Seamănă cu itemul de chestionar al acestui indicator (temă mai degrabă quant)"
                    : s.via === "context"
                      ? "Potrivire pe tema indicatorului"
                      : "Potrivire pe întrebările de interviu"
                }
                className="rounded-full border border-border bg-slate-2 px-2 py-0.5 text-xs font-medium text-slate-11 transition-colors hover:border-ring hover:text-foreground"
              >
                {INDICATOR_BY_ID.get(s.indicatorId)?.name ?? s.indicatorId} ·{" "}
                {Math.round(s.score * 100)}%
                {s.via === "survey" && " ⧉"}
              </button>
            ))}
          </div>
        )}
      </div>
      {assignment.indicatorId && (
        <span
          className={`mt-0.5 shrink-0 rounded-full px-1.5 py-0.5 text-xs font-semibold tabular-nums ${
            confidence >= 60
              ? "bg-slate-3 text-slate-11"
              : "bg-amber-3 text-amber-11"
          }`}
          title={`Încredere ${confidence}% (${assignment.engine})`}
        >
          {confidence}%
        </span>
      )}
      <ReassignSelect
        docId={docId}
        question={question}
        assignment={assignment}
        lexical={lexical}
      />
    </li>
  );
}

/** Native select with category optgroups — reassign or unmap a question. */
function ReassignSelect({
  docId,
  question,
  assignment,
  lexical,
}: {
  docId: string;
  question: { id: string; text: string };
  assignment: QuestionAssignment;
  lexical: LexicalEngine;
}) {
  const byCategory = useMemo(() => {
    const map = new Map<string, Indicator[]>();
    for (const cat of INDICATOR_CATEGORIES) map.set(cat, []);
    for (const ind of INDICATORS) map.get(ind.category)!.push(ind);
    return map;
  }, []);

  return (
    <select
      aria-label="Mută întrebarea la alt indicator"
      value={assignment.indicatorId ?? ""}
      onChange={(e) =>
        applyReassign(docId, question, e.target.value || null, lexical)
      }
      className="mt-0.5 h-7 w-32 shrink-0 rounded-md border border-input bg-background px-1 text-xs outline-none transition-colors focus:border-ring"
    >
      <option value="">— nemapată —</option>
      {[...byCategory.entries()].map(([cat, inds]) => (
        <optgroup key={cat} label={cat}>
          {inds.map((ind) => (
            <option key={ind.id} value={ind.id}>
              {ind.name}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
