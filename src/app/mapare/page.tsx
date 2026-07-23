"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Waypoints } from "lucide-react";
import {
  createMapping,
  deleteMapping,
  useMappingStore,
} from "@/lib/mapping";

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function MaparePage() {
  const store = useMappingStore();
  const router = useRouter();

  const handleCreate = () => {
    const doc = createMapping();
    router.push(`/mapare/${doc.id}`);
  };

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 sm:px-8 pb-16 pt-8">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Mapare</h1>
          <p className="mt-1 text-base text-muted-foreground">
            Lipește întrebările stakeholderilor, mapează-le automat pe
            indicatorii de research, apoi generează ghidul sau chestionarul.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-indigo-9 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-10"
        >
          <Plus aria-hidden className="h-4 w-4" />
          Mapare nouă
        </button>
      </header>

      {store.mappings.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <Waypoints aria-hidden className="h-8 w-8 text-slate-8" />
          <p className="text-base text-muted-foreground">
            Nicio mapare încă. Creează una și lipește întrebările primite de la
            stakeholderi.
          </p>
          <button
            onClick={handleCreate}
            className="mt-1 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
          >
            Creează prima mapare
          </button>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {store.mappings.map((doc) => {
            const mapped = doc.assignments.filter((a) => a.indicatorId).length;
            return (
              <li
                key={doc.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
              >
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/mapare/${doc.id}`}
                    className="truncate text-base font-semibold underline-offset-2 hover:underline"
                  >
                    {doc.title}
                  </Link>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {doc.questions.length} întrebări
                    {doc.questions.length > 0 && (
                      <> · {mapped} mapate</>
                    )}{" "}
                    · actualizat {formatDate(doc.updatedAt)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Ștergi maparea „${doc.title}” (${doc.questions.length} întrebări)?`,
                      )
                    ) {
                      deleteMapping(doc.id);
                    }
                  }}
                  aria-label={`Șterge maparea ${doc.title}`}
                  className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-red-3 hover:text-red-11"
                >
                  <Trash2 aria-hidden className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
