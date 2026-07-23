"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClipboardList, Plus, Trash2 } from "lucide-react";
import {
  createSurvey,
  deleteSurvey,
  setActiveSurvey,
  useSurveyStore,
} from "@/lib/surveys";

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

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 sm:px-8 pb-16 pt-8">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Chestionare</h1>
          <p className="mt-1 text-base text-muted-foreground">
            Chestionarele tale cantitative — construite din itemii de survey ai
            indicatorilor, exportabile în Word / Pages și Markdown.
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

      {store.surveys.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
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
