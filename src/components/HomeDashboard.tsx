"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  ArrowRight,
  ClipboardList,
  NotebookPen,
  Plus,
  Waypoints,
} from "lucide-react";
import { createGuide, useGuideStore, type Guide } from "@/lib/guides";
import { createSurvey, useSurveyStore, type SurveyDoc } from "@/lib/surveys";

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function HomeDashboard() {
  const { user } = useUser();
  const guideStore = useGuideStore();
  const surveyStore = useSurveyStore();
  const router = useRouter();

  const guides = [...guideStore.guides].sort(
    (a, b) => b.updatedAt - a.updatedAt,
  );
  const surveys = [...surveyStore.surveys].sort(
    (a, b) => b.updatedAt - a.updatedAt,
  );

  return (
    <>
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {user?.firstName ? `Bună, ${user.firstName}` : "Bine ai revenit"}
          </h1>
          <p className="mt-1 text-base text-muted-foreground">
            Continuă de unde ai rămas sau începe un studiu nou.
          </p>
        </div>
        <UserButton />
      </header>

      <section aria-label="Începe ceva nou" className="mb-10">
        <div className="grid gap-3 sm:grid-cols-3">
          <QuickAction
            icon={Waypoints}
            title="Mapare nouă"
            description="Pornește de la întrebările stakeholderilor"
            onClick={() => router.push("/mapare")}
          />
          <QuickAction
            icon={NotebookPen}
            title="Ghid nou"
            description="Ghid de interviu gol, construit manual"
            onClick={() => {
              const guide = createGuide();
              router.push(`/ghiduri/${guide.id}`);
            }}
          />
          <QuickAction
            icon={ClipboardList}
            title="Chestionar nou"
            description="Chestionar gol, construit manual"
            onClick={() => {
              const survey = createSurvey();
              router.push(`/chestionare/${survey.id}`);
            }}
          />
        </div>
      </section>

      <section aria-label="Studiile mele">
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Studiile mele
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <StudyList
            title="Ghiduri de interviu"
            icon={NotebookPen}
            href="/ghiduri"
            emptyText="Niciun ghid încă — creează unul de mai sus sau generează-l dintr-o mapare."
            items={guides.map((g: Guide) => ({
              id: g.id,
              href: `/ghiduri/${g.id}`,
              title: g.title,
              meta: `${g.items.length} întrebări · ${formatDate(g.updatedAt)}`,
              active: g.id === guideStore.activeGuideId,
            }))}
          />
          <StudyList
            title="Chestionare"
            icon={ClipboardList}
            href="/chestionare"
            emptyText="Niciun chestionar încă — creează unul de mai sus sau generează-l dintr-o mapare."
            items={surveys.map((s: SurveyDoc) => ({
              id: s.id,
              href: `/chestionare/${s.id}`,
              title: s.title,
              meta: `${s.items.length} itemi · ${formatDate(s.updatedAt)}`,
              active: s.id === surveyStore.activeSurveyId,
            }))}
          />
        </div>
      </section>
    </>
  );
}

function QuickAction({
  icon: Icon,
  title,
  description,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-start gap-2 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-ring"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-3 text-indigo-11">
        <Icon aria-hidden className="h-4 w-4" />
      </span>
      <span className="flex items-center gap-1.5 text-sm font-semibold">
        <Plus aria-hidden className="h-3.5 w-3.5 text-muted-foreground" />
        {title}
      </span>
      <span className="text-sm text-muted-foreground">{description}</span>
    </button>
  );
}

const MAX_LISTED = 5;

function StudyList({
  title,
  icon: Icon,
  href,
  emptyText,
  items,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  emptyText: string;
  items: {
    id: string;
    href: string;
    title: string;
    meta: string;
    active: boolean;
  }[];
}) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Icon aria-hidden className="h-4 w-4 text-indigo-11" />
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="ml-auto rounded-full bg-sidebar-accent px-2 py-0.5 text-xs font-medium tabular-nums text-muted-foreground">
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="px-4 py-6 text-sm text-muted-foreground">{emptyText}</p>
      ) : (
        <ul className="flex flex-col divide-y divide-border">
          {items.slice(0, MAX_LISTED).map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-sidebar-accent"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">
                      {item.title}
                    </span>
                    {item.active && (
                      <span className="shrink-0 rounded-full bg-indigo-3 px-2 py-0.5 text-xs font-medium text-indigo-11">
                        activ
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {item.meta}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto border-t border-border px-4 py-2.5">
        <Link
          href={href}
          className="text-sm font-medium text-indigo-11 underline-offset-2 hover:underline"
        >
          Vezi toate →
        </Link>
      </div>
    </div>
  );
}
