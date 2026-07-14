"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
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
import {
  learnExample,
  MAX_QUESTIONS,
  parseQuestions,
  reassignQuestion,
  removeQuestion,
  renameMapping,
  setAssignments,
  setQuestions,
  readLearnedExamples,
  useMappingStore,
  type MappingDoc,
  type MappingEngine,
  type QuestionAssignment,
} from "@/lib/mapping";
import {
  createLexicalEngine,
  MAPPING_THRESHOLD,
} from "@/lib/mapping-lexical";
import { createGuideFromMapping, type CoverageEntry } from "@/lib/guides";
import { createSurveyFromMapping } from "@/lib/surveys";

const INDICATOR_BY_ID = new Map(INDICATORS.map((ind) => [ind.id, ind]));

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
  const [running, setRunning] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const assignmentByQuestion = useMemo(() => {
    const map = new Map<string, QuestionAssignment>();
    for (const a of doc.assignments) map.set(a.questionId, a);
    return map;
  }, [doc.assignments]);

  /** Groups: indicatorId → questionIds, plus the unmapped bucket. */
  const groups = useMemo(() => {
    const byIndicator = new Map<string, string[]>();
    const unmapped: string[] = [];
    for (const q of doc.questions) {
      const a = assignmentByQuestion.get(q.id);
      if (!a) continue; // not yet mapped at all — handled separately
      if (a.indicatorId) {
        byIndicator.set(a.indicatorId, [
          ...(byIndicator.get(a.indicatorId) ?? []),
          q.id,
        ]);
      } else {
        unmapped.push(q.id);
      }
    }
    const ordered = [...byIndicator.entries()].sort(
      (a, b) => b[1].length - a[1].length,
    );
    return { ordered, unmapped };
  }, [doc.questions, assignmentByQuestion]);

  const hasRun = doc.assignments.length > 0;
  const questionById = new Map(doc.questions.map((q) => [q.id, q]));

  // ── Engines ──────────────────────────────────────────────────────────────

  const runV1 = () => {
    const lexical = createLexicalEngine(readLearnedExamples());
    const assignments: QuestionAssignment[] = doc.questions.map((q) => {
      const candidates = lexical.scoreQuestion(q.text);
      const winner =
        candidates[0] && candidates[0].score >= MAPPING_THRESHOLD
          ? candidates[0]
          : null;
      return {
        questionId: q.id,
        indicatorId: winner?.indicatorId ?? null,
        confidence: winner?.score ?? candidates[0]?.score ?? 0,
        engine: "v1",
        alternatives: candidates.map((c) => ({
          indicatorId: c.indicatorId,
          confidence: c.score,
        })),
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
      const assignments: QuestionAssignment[] = doc.questions.map((q, i) => {
        const candidates: {
          indicatorId: string;
          confidence: number;
          rationale?: string;
        }[] = data.results?.[i]?.candidates ?? [];
        const winner = candidates[0] ?? null;
        return {
          questionId: q.id,
          indicatorId: winner?.indicatorId ?? null,
          confidence: winner?.confidence ?? 0,
          engine: "v2",
          rationale: winner?.rationale,
          alternatives: candidates.map((c) => ({
            indicatorId: c.indicatorId,
            confidence: c.confidence,
          })),
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
    if (engine === "v1") runV1();
    else void runV2();
  };

  // ── Generation ───────────────────────────────────────────────────────────

  const buildCoverage = (): CoverageEntry[] =>
    groups.ordered.map(([indicatorId, qids]) => ({
      indicatorId,
      questions: qids
        .map((qid) => questionById.get(qid)?.text)
        .filter((t): t is string => !!t),
    }));

  const generateGuide = () => {
    const entries = groups.ordered.flatMap(([indicatorId]) => {
      const ind = INDICATOR_BY_ID.get(indicatorId);
      return (ind?.qualQuestions ?? []).map((text, sourceIndex) => ({
        text,
        indicatorId,
        sourceIndex,
      }));
    });
    const guide = createGuideFromMapping(
      `Ghid — ${doc.title}`,
      entries,
      buildCoverage(),
    );
    router.push(`/ghiduri/${guide.id}`);
  };

  const generateSurvey = () => {
    const entries = groups.ordered.flatMap(([indicatorId]) => {
      const ind = INDICATOR_BY_ID.get(indicatorId);
      return (ind?.surveyItems ?? []).map((item, sourceIndex) => ({
        stem: item.stem,
        indicatorId,
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
      </div>

      <input
        aria-label="Titlul mapării"
        value={doc.title}
        onChange={(e) => renameMapping(doc.id, e.target.value)}
        className="mt-3 w-full rounded-md border border-transparent bg-transparent text-2xl font-semibold tracking-tight outline-none transition-colors hover:border-border focus:border-ring"
      />
      <p className="mt-1 text-sm text-muted-foreground">
        {doc.questions.length}/{MAX_QUESTIONS} întrebări
        {hasRun && (
          <>
            {" "}
            · {groups.ordered.length} teme ·{" "}
            {groups.unmapped.length > 0 ? (
              <span className="font-medium text-amber-11">
                {groups.unmapped.length} nemapate
              </span>
            ) : (
              <span className="font-medium text-foreground">
                toate mapate
              </span>
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
                    // Editing re-parses assignments away; fine pre-run.
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
                  title: "LLM prin OpenRouter — mai fin, dar trimite întrebările prin server",
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
          {groups.ordered.map(([indicatorId, qids]) => {
            const ind = INDICATOR_BY_ID.get(indicatorId);
            if (!ind) return null;
            const texts = qids
              .map((qid) => questionById.get(qid)?.text ?? "")
              .filter(Boolean);
            const method = METHOD_UI[suggestMethod(texts)];
            return (
              <section
                key={indicatorId}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex flex-wrap items-baseline gap-2">
                  <h2 className="text-base font-semibold">{ind.name}</h2>
                  <span className="text-xs text-muted-foreground">
                    {ind.category}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${method.className}`}
                    title="Metoda sugerată pe baza formulării întrebărilor"
                  >
                    {method.label}
                  </span>
                  <span className="ml-auto text-xs tabular-nums text-slate-10">
                    {qids.length}{" "}
                    {qids.length === 1 ? "întrebare" : "întrebări"}
                  </span>
                </div>
                <ul className="mt-3 flex flex-col gap-2">
                  {qids.map((qid) => (
                    <QuestionRow
                      key={qid}
                      docId={doc.id}
                      question={questionById.get(qid)!}
                      assignment={assignmentByQuestion.get(qid)!}
                    />
                  ))}
                </ul>
              </section>
            );
          })}

          {groups.unmapped.length > 0 && (
            <section className="rounded-xl border border-dashed border-amber-9/40 bg-card p-4">
              <h2 className="text-base font-semibold text-amber-11">
                Nemapate
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Sub pragul de încredere — atribuie-le manual sau lasă-le pe
                dinafară.
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {groups.unmapped.map((qid) => (
                  <QuestionRow
                    key={qid}
                    docId={doc.id}
                    question={questionById.get(qid)!}
                    assignment={assignmentByQuestion.get(qid)!}
                  />
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* ── 4. Generate ──────────────────────────────────────────────── */}
      {hasRun && groups.ordered.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center gap-3 px-8 py-3">
            <span className="text-sm text-muted-foreground">
              {groups.ordered.length} teme confirmate →
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

// ── Question row (inside a group card) ─────────────────────────────────────

function QuestionRow({
  docId,
  question,
  assignment,
}: {
  docId: string;
  question: { id: string; text: string };
  assignment: QuestionAssignment;
}) {
  const confidence = Math.round(assignment.confidence * 100);
  return (
    <li className="flex items-start gap-2.5 rounded-lg border border-border bg-background p-2.5">
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-relaxed">{question.text}</p>
        {assignment.rationale && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {assignment.rationale}
          </p>
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
      <ReassignSelect docId={docId} question={question} assignment={assignment} />
    </li>
  );
}

/** Native select with category optgroups — reassign or unmap a question. */
function ReassignSelect({
  docId,
  question,
  assignment,
}: {
  docId: string;
  question: { id: string; text: string };
  assignment: QuestionAssignment;
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
      onChange={(e) => {
        const indicatorId = e.target.value || null;
        reassignQuestion(docId, question.id, indicatorId);
        // Manual correction → teach v1 for next time.
        if (indicatorId) learnExample(indicatorId, question.text);
      }}
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
