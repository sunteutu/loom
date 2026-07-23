"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Download,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";
import {
  addCustomSurveyItem,
  moveSurveyItem,
  removeSurveyItem,
  renameSurvey,
  setActiveSurvey,
  setSurveyVariables,
  updateSurveyItemStem,
  useSurveyStore,
  type SurveyDoc,
} from "@/lib/surveys";
import {
  downloadSurveyDocx,
  downloadSurveyMarkdown,
  groupSurveyItems,
  resolveSurveyItem,
  surveyLoiMinutes,
  SURVEY_TYPE_LABELS,
} from "@/lib/survey-export";
import { formatMinutes, type GuideLanguage } from "@/lib/guide-export";
import { lintSurvey } from "@/lib/survey-lint";
import { LintPanel } from "@/components/LintPanel";
import { useLoomTheme } from "@/components/ThemeProvider";
import {
  BonExportOverlay,
  bonCode,
  formatBonDate,
} from "@/components/BonExportOverlay";

const VARIABLE_FIELDS = [
  { key: "category", label: "[category]", hint: "ex. aplicații de banking" },
  { key: "product", label: "[product]", hint: "ex. George" },
  { key: "brand", label: "[brand]", hint: "ex. BCR" },
] as const;

export default function ChestionarPage() {
  const { id } = useParams<{ id: string }>();
  const store = useSurveyStore();
  const survey = store.surveys.find((s) => s.id === id);

  if (!survey) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 sm:px-8 pt-16 text-center">
        <p className="text-base text-muted-foreground">
          Chestionarul nu există (poate a fost șters).
        </p>
        <Link
          href="/chestionare"
          className="mt-3 inline-block text-sm font-medium text-indigo-11 underline-offset-2 hover:underline"
        >
          ← Înapoi la chestionare
        </Link>
      </main>
    );
  }

  return (
    <SurveyEditor
      survey={survey}
      isActive={survey.id === store.activeSurveyId}
    />
  );
}

function SurveyEditor({
  survey,
  isActive,
}: {
  survey: SurveyDoc;
  isActive: boolean;
}) {
  const [newQuestion, setNewQuestion] = useState("");
  const [lang, setLang] = useState<GuideLanguage>("en");
  const { theme } = useLoomTheme();
  // Pe tema „bon" exportul trece prin imprimanta fiscală (overlay).
  const [bonExport, setBonExport] = useState<"md" | "docx" | null>(null);
  const groups = groupSurveyItems(survey.items);
  const loi = surveyLoiMinutes(survey);
  const issues = lintSurvey(survey, lang);
  const bonMinutes = (m: number) => m.toFixed(2).replace(".", ",");
  /** Aceeași estimare per item ca surveyLoiMinutes, dar nerotunjită. */
  const bonItemMinutes = (r: { attributes?: string[]; subStems?: string[] }) =>
    0.5 + 0.1 * ((r.attributes?.length ?? 0) + (r.subStems?.length ?? 0));

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

  const startExport = (format: "md" | "docx") => {
    if (!confirmExport()) return;
    if (theme === "bon") {
      setBonExport(format);
      return;
    }
    if (format === "md") downloadSurveyMarkdown(survey, lang);
    else void downloadSurveyDocx(survey, lang);
  };

  let questionNumber = 0;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 sm:px-8 pb-16 pt-8">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <Link
          href="/chestionare"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          Chestionare
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {!isActive && (
            <button
              onClick={() => setActiveSurvey(survey.id)}
              className="rounded-md border border-border px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
            >
              Setează activ
            </button>
          )}
          <div
            role="radiogroup"
            aria-label="Limba chestionarului"
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
            onClick={() => startExport("md")}
            disabled={survey.items.length === 0}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-ring hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FileText aria-hidden className="h-4 w-4" />
            Markdown
          </button>
          <button
            onClick={() => startExport("docx")}
            disabled={survey.items.length === 0}
            className="inline-flex items-center gap-1.5 rounded-md bg-indigo-9 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Download aria-hidden className="h-4 w-4" />
            Word / Pages (.docx)
          </button>
        </div>
      </div>

      <input
        aria-label="Titlul chestionarului"
        value={survey.title}
        onChange={(e) => renameSurvey(survey.id, e.target.value)}
        className="mt-3 w-full rounded-md border border-transparent bg-transparent text-2xl font-semibold tracking-tight outline-none transition-colors hover:border-border focus:border-ring"
      />
      <p className="mt-1 text-sm text-muted-foreground">
        {survey.items.length} întrebări · LOI estimat{" "}
        <span className="font-medium text-foreground">
          {formatMinutes(loi)}
        </span>
        {isActive && (
          <>
            {" "}
            ·{" "}
            <span className="font-medium text-indigo-11">
              chestionar activ — aici ajung itemii adăugați din Indicatori
            </span>
          </>
        )}
      </p>

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
                value={survey.variables[field.key] ?? ""}
                onChange={(e) =>
                  setSurveyVariables(survey.id, {
                    ...survey.variables,
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

      {survey.items.length > 0 && <LintPanel issues={issues} />}

      {survey.items.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-base text-muted-foreground">
            Chestionarul e gol. Adaugă itemi din catalogul de indicatori.
          </p>
          <Link
            href="/admin/indicatori"
            className="rounded-md bg-indigo-9 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-10"
          >
            Deschide Indicatori →
          </Link>
        </div>
      ) : (
        <>
          {/* Imprimanta de deasupra bonului — vizibilă doar pe tema „bon". */}
          <div className="bon-slot" aria-hidden>
            <i />
          </div>
          <div className="bon-paper mt-8 flex flex-col gap-6">
            <div className="bon-head" aria-hidden>
              <p className="bh-firm">*** LOOM SRL · CUI RO123456 ***</p>
              <p className="bh-sub">STUDII &amp; CAFEA · CASA 1</p>
              <p className="bh-sub">
                BON FISCAL NR. {bonCode(survey.id).slice(0, 4)} ·{" "}
                {formatBonDate(survey.updatedAt)}
              </p>
              <p className="bh-title">
                {survey.title || "Chestionar fără titlu"}
              </p>
            </div>
          {groups.map((group, gi) => (
            <section key={gi}>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-11">
                {group.indicator?.name ?? "Întrebări proprii"}
              </h2>
              <ol className="flex flex-col gap-2">
                {group.items.map((item) => {
                  questionNumber += 1;
                  const n = questionNumber;
                  const index = survey.items.findIndex(
                    (it) => it.id === item.id,
                  );
                  const r = resolveSurveyItem(item, lang);
                  return (
                    <li
                      key={item.id}
                      className="bon-item flex items-start gap-2.5 rounded-lg border border-border bg-card p-3"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 w-8 shrink-0 text-right text-sm font-semibold tabular-nums text-slate-10"
                      >
                        Q{n}.
                      </span>
                      <div className="min-w-0 flex-1">
                        <textarea
                          aria-label={`Întrebarea ${n}`}
                          value={r.stem}
                          onChange={(e) =>
                            updateSurveyItemStem(
                              survey.id,
                              item.id,
                              e.target.value,
                            )
                          }
                          rows={2}
                          className="min-h-9 w-full resize-y rounded-md border border-transparent bg-transparent px-1.5 py-1 text-base font-medium leading-relaxed outline-none transition-colors hover:border-border focus:border-ring"
                        />
                        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-10">
                          {SURVEY_TYPE_LABELS[r.type]}
                          {r.base && <> · Bază: {r.base}</>}
                          {r.randomize && <> · randomizează</>}
                        </p>
                        {(r.subStems || r.attributes) && (
                          <ul className="mt-1.5 flex flex-col gap-0.5 text-sm text-muted-foreground">
                            {[...(r.subStems ?? []), ...(r.attributes ?? [])].map(
                              (row, ri) => (
                                <li key={ri} className="flex gap-1.5">
                                  <span aria-hidden className="text-slate-9">
                                    –
                                  </span>
                                  {row}
                                </li>
                              ),
                            )}
                          </ul>
                        )}
                        {r.scalePoints && (
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {r.scalePoints.map((p, pi) => (
                              <span
                                key={pi}
                                className="rounded border border-border bg-slate-2 px-1.5 py-0.5 text-xs text-slate-11"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        )}
                        {r.options && (
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {r.options.map((o, oi) => (
                              <span
                                key={oi}
                                className="rounded border border-border bg-slate-2 px-1.5 py-0.5 text-xs text-slate-11"
                              >
                                {o}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="bon-price" aria-hidden>
                        {bonMinutes(bonItemMinutes(r))}
                      </span>
                      <div className="flex shrink-0 flex-col gap-0.5">
                        <button
                          onClick={() => moveSurveyItem(survey.id, item.id, -1)}
                          disabled={index === 0}
                          aria-label={`Mută întrebarea ${n} mai sus`}
                          className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <ArrowUp aria-hidden className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveSurveyItem(survey.id, item.id, 1)}
                          disabled={index === survey.items.length - 1}
                          aria-label={`Mută întrebarea ${n} mai jos`}
                          className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <ArrowDown aria-hidden className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeSurveyItem(survey.id, item.id)}
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
            <div className="bon-total" aria-hidden>
              <div className="br">
                <span>Articole</span>
                <i />
                <span>{survey.items.length} BUC</span>
              </div>
              <div className="br grand">
                <span>Total LOI</span>
                <i />
                <span>{formatMinutes(loi)}</span>
              </div>
            </div>
            <div className="bon-barcode" aria-hidden>
              <div className="bars" />
              <p>{bonCode(survey.id)}</p>
            </div>
          </div>
        </>
      )}

      <form
        className="bon-add mt-6 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const text = newQuestion.trim();
          if (!text) return;
          addCustomSurveyItem(survey.id, text);
          setNewQuestion("");
        }}
      >
        <input
          aria-label="Întrebare proprie nouă (răspuns deschis)"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Adaugă o întrebare proprie (răspuns deschis)…"
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

      {bonExport && (
        <BonExportOverlay
          title={survey.title}
          lines={[
            { label: "Articole", value: `${survey.items.length} BUC` },
            { label: "Total LOI", value: formatMinutes(loi), grand: true },
          ]}
          code={bonCode(survey.id)}
          saveLabel={
            bonExport === "docx" ? "Salvează .docx" : "Salvează .md"
          }
          onSave={() =>
            bonExport === "docx"
              ? downloadSurveyDocx(survey, lang)
              : downloadSurveyMarkdown(survey, lang)
          }
          onClose={() => setBonExport(null)}
        />
      )}
    </main>
  );
}
