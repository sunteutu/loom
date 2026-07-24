"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClipboardList, Plus, Trash2 } from "lucide-react";
import {
  createSurvey,
  deleteSurvey,
  setActiveSurvey,
  useSurveyStore,
} from "@/lib/surveys";
import { useLoomTheme } from "@/components/ThemeProvider";

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ChestionarePage() {
  const store = useSurveyStore();
  const router = useRouter();

  const handleCreate = () => {
    const survey = createSurvey();
    router.push(`/chestionare/${survey.id}`);
  };

  // Pe „Tribunul 3000" empty state-ul e înlocuit de poza cu telefonul:
  // click → „MARIAN!”, iar după strigăt se deschide un chestionar nou —
  // aceeași mecanică precum pe lista de ghiduri.
  const { theme } = useLoomTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const vadim = mounted && theme === "vadim";

  const [strigat, setStrigat] = useState(false);
  const pornit = useRef(false);
  const marianCreate = () => {
    if (pornit.current) return;
    pornit.current = true;
    setStrigat(true);
    let dus = false;
    const go = () => {
      if (dus) return;
      dus = true;
      handleCreate();
    };
    const a = new Audio("/themes/vadim/marian.mp3");
    a.addEventListener("ended", go);
    // audio blocat sau mp3 lipsă → mergem direct la chestionar; plasă de
    // siguranță și pentru cazul în care "ended" nu mai vine
    a.play().catch(go);
    setTimeout(go, 1800);
  };

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 sm:px-8 pb-16 pt-8">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Chestionare</h1>
          <p className="mt-1 text-base text-muted-foreground">
            <span className="loom-not-vadim">
              Chestionarele tale cantitative — construite din itemii de survey
              ai indicatorilor, exportabile în Word / Pages și Markdown.
            </span>
            <span className="loom-vadim-only">
              Click pe imagine să-l cheme Tribunul pe Marian, să-ți pornească
              chestionarul.
            </span>
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-indigo-9 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-10"
        >
          <Plus aria-hidden className="h-4 w-4" />
          Chestionar nou
        </button>
      </header>

      {vadim && (
        /* wrapper-ul poartă legănatul, ca hoverul butonului să nu se bată
           cap în cap cu animația de transform */
        <span className="vmc-sway">
        <button
          type="button"
          className="vadim-marian-cta"
          onClick={marianCreate}
          aria-label="Cheamă-l pe Marian și deschide un chestionar nou"
        >
          {strigat && (
            <span className="vadim-replica sus striga vmc-replica">
              MARIAN!!
            </span>
          )}
          <svg
            className="lv-doodle lv-boil"
            style={{ left: -22, top: -20, width: 52, height: 52, color: "#ffd23f" }}
            viewBox="0 0 100 100"
            aria-hidden
          >
            <path d="M58 6 L34 48 L52 48 L30 94 L74 40 L54 40 L76 6 Z" />
          </svg>
          <svg
            className="lv-doodle lv-boil3"
            style={{ right: -18, bottom: 60, width: 44, height: 44, color: "#ff9d5c" }}
            viewBox="0 0 100 100"
            aria-hidden
          >
            <path d="M50 4 L58 42 L96 50 L58 58 L50 96 L42 58 L4 50 L42 42 Z" />
          </svg>
          {/* rama ține zoom-ul lent și ninsoarea în interiorul pozei */}
          <span className="vmc-foto" aria-hidden>
            <img src="/themes/vadim/tribun-iarna.jpg" alt="" />
            <i className="vmc-fulg" style={{ "--fx": "16%", "--fd": "8s", "--fs": "13px" } as React.CSSProperties}>❄</i>
            <i className="vmc-fulg" style={{ "--fx": "30%", "--fd": "12.5s", "--fdelay": "1.8s", "--fs": "9px" } as React.CSSProperties}>❄</i>
            <i className="vmc-fulg" style={{ "--fx": "52%", "--fd": "11s", "--fdelay": "3.2s", "--fs": "10px" } as React.CSSProperties}>❄</i>
            <i className="vmc-fulg" style={{ "--fx": "66%", "--fd": "9s", "--fdelay": "6.8s", "--fs": "12px" } as React.CSSProperties}>❄</i>
            <i className="vmc-fulg" style={{ "--fx": "80%", "--fd": "9.5s", "--fdelay": "5.6s", "--fs": "15px" } as React.CSSProperties}>❄</i>
            <i className="vmc-fulg" style={{ "--fx": "92%", "--fd": "13s", "--fdelay": "2.4s", "--fs": "11px" } as React.CSSProperties}>❄</i>
          </span>
          <span
            className="vadim-clipici"
            style={{ left: "14%", top: "12%", "--cc": "#ffd23f", "--cdelay": "1.6s" } as React.CSSProperties}
          >
            ✦
          </span>
          <span
            className="vadim-clipici"
            style={{ right: "12%", top: "42%", "--cc": "#ff9d5c", "--cdelay": "4.2s", "--cs": "12px" } as React.CSSProperties}
          >
            ✦
          </span>
          <span className="vadim-caption">
            <b>Corespondentul de pe teren</b>
            Un click: Tribunul îl strigă pe Marian, iar chestionarul nou se
            deschide imediat.
          </span>
        </button>
        </span>
      )}

      {store.surveys.length === 0 ? (
        <div
          className={`${vadim ? "hidden " : ""}flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center`}
        >
          <ClipboardList aria-hidden className="h-8 w-8 text-slate-8" />
          <p className="text-base text-muted-foreground">
            Niciun chestionar încă. Creează unul, apoi adaugă itemi din{" "}
            <Link
              href="/admin/indicatori"
              className="font-medium text-indigo-11 underline-offset-2 hover:underline"
            >
              catalogul de indicatori
            </Link>
            .
          </p>
          <button
            onClick={handleCreate}
            className="mt-1 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
          >
            Creează primul chestionar
          </button>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {store.surveys.map((survey) => {
            const isActive = survey.id === store.activeSurveyId;
            return (
              <li
                key={survey.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/chestionare/${survey.id}`}
                      className="truncate text-base font-semibold underline-offset-2 hover:underline"
                    >
                      {survey.title}
                    </Link>
                    {isActive && (
                      <span className="rounded-full bg-indigo-3 px-2 py-0.5 text-xs font-medium text-indigo-11">
                        activ
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {survey.items.length} întrebări · actualizat{" "}
                    {formatDate(survey.updatedAt)}
                  </p>
                </div>
                {!isActive && (
                  <button
                    onClick={() => setActiveSurvey(survey.id)}
                    className="shrink-0 rounded-md border border-border px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
                  >
                    Setează activ
                  </button>
                )}
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Ștergi chestionarul „${survey.title}” (${survey.items.length} întrebări)?`,
                      )
                    ) {
                      deleteSurvey(survey.id);
                    }
                  }}
                  aria-label={`Șterge chestionarul ${survey.title}`}
                  className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-red-3 hover:text-red-11"
                >
                  <Trash2 aria-hidden className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-6 text-sm text-muted-foreground">
        Itemii se adaugă din{" "}
        <Link
          href="/admin/indicatori"
          className="font-medium text-indigo-11 underline-offset-2 hover:underline"
        >
          Indicatori
        </Link>{" "}
        — deschide un indicator și folosește butoanele „+” din secțiunea
        Quantitative. Adăugarea merge în chestionarul <em>activ</em>.
      </p>
    </main>
  );
}
