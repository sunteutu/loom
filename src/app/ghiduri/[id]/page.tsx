"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  CircleCheck,
  Download,
  FileText,
  Lightbulb,
  OctagonAlert,
  Plus,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import {
  addCustomItem,
  guidePace,
  guideTarget,
  moveItem,
  removeItem,
  renameGuide,
  setActiveGuide,
  setMinutesPerQuestion,
  setTargetMinutes,
  setVariables,
  updateItemText,
  useGuideStore,
  type Guide,
} from "@/lib/guides";
import { lintGuide, type LintIssue } from "@/lib/guide-lint";
import {
  downloadDocx,
  downloadMarkdown,
  formatMinutes,
  groupItems,
  resolveIntent,
  resolveItemText,
  type GuideLanguage,
} from "@/lib/guide-export";

const VARIABLE_FIELDS = [
  { key: "category", label: "[category]", hint: "ex. aplicații de banking" },
  { key: "product", label: "[product]", hint: "ex. George" },
  { key: "brand", label: "[brand]", hint: "ex. BCR" },
] as const;

const SEVERITY_UI = {
  error: { icon: OctagonAlert, className: "text-red-11" },
  warning: { icon: TriangleAlert, className: "text-amber-11" },
  suggestion: { icon: Lightbulb, className: "text-slate-11" },
} as const;

/** The research-linter panel: methodological checks on the current guide. */
function LintPanel({ issues }: { issues: LintIssue[] }) {
  return (
    <section className="mt-4 rounded-xl border border-border bg-card p-4">
      <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-10">
        Verificări
        {issues.length > 0 && (
          <span className="rounded-full bg-slate-3 px-2 py-0.5 text-xs font-medium normal-case tracking-normal text-slate-11">
            {issues.length}
          </span>
        )}
      </h2>
      {issues.length === 0 ? (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <CircleCheck aria-hidden className="h-4 w-4 text-slate-9" />
          Nicio problemă metodologică detectată.
        </p>
      ) : (
        <ul className="mt-2 flex flex-col gap-2">
          {issues.map((issue) => {
            const ui = SEVERITY_UI[issue.severity];
            return (
              <li
                key={issue.rule}
                className="flex items-start gap-2 text-sm leading-relaxed"
              >
                <ui.icon
                  aria-hidden
                  className={`mt-0.5 h-4 w-4 shrink-0 ${ui.className}`}
                />
                <span className="sr-only">{issue.severity}: </span>
                <span className="text-slate-11">{issue.message}</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default function GhidPage() {
  const { id } = useParams<{ id: string }>();
  const store = useGuideStore();
  const guide = store.guides.find((g) => g.id === id);

  if (!guide) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-8 pt-16 text-center">
        <p className="text-base text-muted-foreground">
          Ghidul nu există (poate a fost șters).
        </p>
        <Link
          href="/ghiduri"
          className="mt-3 inline-block text-sm font-medium text-indigo-11 underline-offset-2 hover:underline"
        >
          ← Înapoi la ghiduri
        </Link>
      </main>
    );
  }

  return <GuideEditor guide={guide} isActive={guide.id === store.activeGuideId} />;
}

function GuideEditor({ guide, isActive }: { guide: Guide; isActive: boolean }) {
  const [newQuestion, setNewQuestion] = useState("");
  const [lang, setLang] = useState<GuideLanguage>("en");
  const groups = groupItems(guide.items);
  const pace = guidePace(guide);
  const target = guideTarget(guide);
  const totalMinutes = guide.items.length * pace;
  const issues = lintGuide(guide, lang);

  /** Re-check before export; errors require an explicit override. */
  const confirmExport = () => {
    const errors = issues.filter((i) => i.severity === "error");
    if (errors.length === 0) return true;
    return window.confirm(
      `Verificările au găsit probleme:\n\n${errors
        .map((e) => `• ${e.message}`)
        .join("\n\n")}\n\nExporți oricum?`,
    );
  };

  // Continuous numbering across groups, same as the export.
  let questionNumber = 0;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-8 pb-16 pt-8">
      <div className="mb-1 flex items-center justify-between gap-4">
        <Link
          href="/ghiduri"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          Ghiduri
        </Link>
        <div className="flex items-center gap-2">
          {!isActive && (
            <button
              onClick={() => setActiveGuide(guide.id)}
              className="rounded-md border border-border px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
            >
              Setează activ
            </button>
          )}
          <div
            role="radiogroup"
            aria-label="Limba ghidului"
            className="flex items-center gap-0.5 rounded-md border border-border p-0.5"
          >
            {(
              [
                { value: "en", label: "EN", title: "Afișează și exportă în engleză" },
                { value: "ro", label: "RO", title: "Afișează și exportă în română" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                role="radio"
                aria-checked={lang === opt.value}
                title={opt.title}
                onClick={() => setLang(opt.value)}
                className={`rounded px-2 py-1 text-xs font-semibold transition-colors ${
                  lang === opt.value
                    ? "bg-indigo-9 text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => confirmExport() && downloadMarkdown(guide, lang)}
            disabled={guide.items.length === 0}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-ring hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FileText aria-hidden className="h-4 w-4" />
            Markdown
          </button>
          <button
            onClick={() => confirmExport() && void downloadDocx(guide, lang)}
            disabled={guide.items.length === 0}
            className="inline-flex items-center gap-1.5 rounded-md bg-indigo-9 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Download aria-hidden className="h-4 w-4" />
            Word / Pages (.docx)
          </button>
        </div>
      </div>

      <input
        aria-label="Titlul ghidului"
        value={guide.title}
        onChange={(e) => renameGuide(guide.id, e.target.value)}
        className="mt-3 w-full rounded-md border border-transparent bg-transparent text-2xl font-semibold tracking-tight outline-none transition-colors hover:border-border focus:border-ring"
      />
      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
        <span>
          {guide.items.length} întrebări ·{" "}
          <span
            className={`font-medium ${
              totalMinutes > 90
                ? "text-red-11"
                : totalMinutes > target
                  ? "text-amber-11"
                  : "text-foreground"
            }`}
          >
            {formatMinutes(totalMinutes)}
          </span>{" "}
          din ținta de {target} min
        </span>
        <label className="inline-flex items-center gap-1.5">
          <span className="text-xs">Ritm:</span>
          <select
            value={pace}
            onChange={(e) =>
              setMinutesPerQuestion(guide.id, Number(e.target.value))
            }
            aria-label="Minute pe întrebare"
            className="h-7 rounded-md border border-input bg-background px-1.5 text-xs outline-none transition-colors focus:border-ring"
          >
            <option value={3}>3 min/întrebare — alert</option>
            <option value={4}>4 min/întrebare — standard</option>
            <option value={5}>5 min/întrebare — în profunzime</option>
          </select>
        </label>
        <label className="inline-flex items-center gap-1.5">
          <span className="text-xs">Țintă:</span>
          <select
            value={target}
            onChange={(e) => setTargetMinutes(guide.id, Number(e.target.value))}
            aria-label="Durata țintă a interviului"
            className="h-7 rounded-md border border-input bg-background px-1.5 text-xs outline-none transition-colors focus:border-ring"
          >
            <option value={30}>30 min</option>
            <option value={45}>45 min</option>
            <option value={60}>60 min</option>
            <option value={90}>90 min</option>
          </select>
        </label>
        {isActive && (
          <span className="font-medium text-indigo-11">
            ghid activ — aici ajung întrebările adăugate din Indicatori
          </span>
        )}
      </div>

      <section className="mt-5 rounded-xl border border-border bg-card p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-10">
          Variabile de studiu
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Completează o dată — placeholder-ele rămân vizibile în editor și se
          înlocuiesc automat la export.
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {VARIABLE_FIELDS.map((field) => (
            <label key={field.key} className="flex flex-col gap-1">
              <span className="font-mono text-xs font-medium text-slate-11">
                {field.label}
              </span>
              <input
                value={guide.variables[field.key] ?? ""}
                onChange={(e) =>
                  setVariables(guide.id, {
                    ...guide.variables,
                    [field.key]: e.target.value,
                  })
                }
                placeholder={field.hint}
                className="h-9 rounded-md border border-input bg-background px-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </label>
          ))}
        </div>
      </section>

      {guide.items.length > 0 && <LintPanel issues={issues} />}

      {guide.items.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-base text-muted-foreground">
            Ghidul e gol. Adaugă întrebări din catalogul de indicatori.
          </p>
          <Link
            href="/admin/indicatori"
            className="rounded-md bg-indigo-9 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-10"
          >
            Deschide Indicatori →
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-6">
          {groups.map((group, gi) => (
            <section key={gi}>
              {/* Mirrors the exported document: dark-gray section label,
                  gray intent block with a left rule, bold gray numbering. */}
              <h2 className="mb-1.5 flex items-baseline gap-2 text-xs font-bold uppercase tracking-wide text-slate-11">
                {group.indicator?.name ?? "Întrebări proprii"}
                <span className="font-semibold normal-case tracking-normal text-slate-10">
                  · {formatMinutes(group.items.length * pace)}
                </span>
              </h2>
              {group.indicator &&
                (() => {
                  const intent = resolveIntent(group.indicator, lang);
                  return intent ? (
                    <p className="mb-2.5 border-l-2 border-slate-6 pl-3 text-sm leading-relaxed text-slate-11">
                      <span className="font-semibold">Intent: </span>
                      {intent}
                    </p>
                  ) : null;
                })()}
              <ol className="flex flex-col gap-2">
                {group.items.map((item) => {
                  questionNumber += 1;
                  const n = questionNumber;
                  const index = guide.items.findIndex(
                    (it) => it.id === item.id,
                  );
                  return (
                    <li
                      key={item.id}
                      className="group flex items-start gap-2.5 rounded-lg border border-border bg-card p-3"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 w-6 shrink-0 text-right text-sm font-semibold tabular-nums text-slate-10"
                      >
                        {n}.
                      </span>
                      <textarea
                        aria-label={`Întrebarea ${n}`}
                        value={resolveItemText(item, lang)}
                        onChange={(e) =>
                          updateItemText(guide.id, item.id, e.target.value)
                        }
                        rows={2}
                        className="min-h-9 flex-1 resize-y rounded-md border border-transparent bg-transparent px-1.5 py-1 text-base leading-relaxed outline-none transition-colors hover:border-border focus:border-ring"
                      />
                      <div className="flex shrink-0 flex-col gap-0.5">
                        <button
                          onClick={() => moveItem(guide.id, item.id, -1)}
                          disabled={index === 0}
                          aria-label={`Mută întrebarea ${n} mai sus`}
                          className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <ArrowUp aria-hidden className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveItem(guide.id, item.id, 1)}
                          disabled={index === guide.items.length - 1}
                          aria-label={`Mută întrebarea ${n} mai jos`}
                          className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <ArrowDown aria-hidden className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeItem(guide.id, item.id)}
                          aria-label={`Șterge întrebarea ${n}`}
                          className="rounded p-1 text-muted-foreground transition-colors hover:bg-red-3 hover:text-red-11"
                        >
                          <Trash2 aria-hidden className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      )}

      <form
        className="mt-6 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const text = newQuestion.trim();
          if (!text) return;
          addCustomItem(guide.id, text);
          setNewQuestion("");
        }}
      >
        <input
          aria-label="Întrebare proprie nouă"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Adaugă o întrebare proprie…"
          className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-base shadow-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
        <button
          type="submit"
          disabled={!newQuestion.trim()}
          className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:border-ring hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus aria-hidden className="h-4 w-4" />
          Adaugă
        </button>
      </form>
    </main>
  );
}
