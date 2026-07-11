"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { NotebookPen, Plus, Trash2 } from "lucide-react";
import {
  createGuide,
  deleteGuide,
  setActiveGuide,
  useGuideStore,
} from "@/lib/guides";

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function GhiduriPage() {
  const store = useGuideStore();
  const router = useRouter();

  const handleCreate = () => {
    const guide = createGuide();
    router.push(`/ghiduri/${guide.id}`);
  };

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-8 pb-16 pt-8">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Ghiduri</h1>
          <p className="mt-1 text-base text-muted-foreground">
            Ghidurile tale de interviu — construite din întrebările
            indicatorilor, exportabile în Word / Pages și Markdown.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-indigo-9 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-10"
        >
          <Plus aria-hidden className="h-4 w-4" />
          Ghid nou
        </button>
      </header>

      {store.guides.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <NotebookPen aria-hidden className="h-8 w-8 text-slate-8" />
          <p className="text-base text-muted-foreground">
            Niciun ghid încă. Creează unul, apoi adaugă întrebări din{" "}
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
            Creează primul ghid
          </button>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {store.guides.map((guide) => {
            const isActive = guide.id === store.activeGuideId;
            return (
              <li
                key={guide.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/ghiduri/${guide.id}`}
                      className="truncate text-base font-semibold underline-offset-2 hover:underline"
                    >
                      {guide.title}
                    </Link>
                    {isActive && (
                      <span className="rounded-full bg-indigo-3 px-2 py-0.5 text-xs font-medium text-indigo-11">
                        activ
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {guide.items.length} întrebări · actualizat{" "}
                    {formatDate(guide.updatedAt)}
                  </p>
                </div>
                {!isActive && (
                  <button
                    onClick={() => setActiveGuide(guide.id)}
                    className="shrink-0 rounded-md border border-border px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
                  >
                    Setează activ
                  </button>
                )}
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Ștergi ghidul „${guide.title}” (${guide.items.length} întrebări)?`,
                      )
                    ) {
                      deleteGuide(guide.id);
                    }
                  }}
                  aria-label={`Șterge ghidul ${guide.title}`}
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
        Întrebările se adaugă din{" "}
        <Link
          href="/admin/indicatori"
          className="font-medium text-indigo-11 underline-offset-2 hover:underline"
        >
          Indicatori
        </Link>{" "}
        — deschide un indicator și folosește butoanele „+” de lângă întrebări.
        Adăugarea merge în ghidul <em>activ</em>.
      </p>
    </main>
  );
}
