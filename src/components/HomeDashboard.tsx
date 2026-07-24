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
import { HomeHero } from "@/components/HomeHero";
import { VadimCitat } from "@/components/VadimCitat";
import { VadimStiri } from "@/components/VadimStiri";
import { createGuide, useGuideStore, type Guide } from "@/lib/guides";
import { createSurvey, useSurveyStore, type SurveyDoc } from "@/lib/surveys";

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* Home-ul are două înfățișări: pe tema Clasic rămâne dashboard-ul sobru
   alb-negru (cel din live), pe temele custom intră hero-ul + cardurile din
   mockup. Ambele stau în DOM și CSS-ul le comută pe `html[data-theme]`,
   ca să nu existe mismatch la hidratare (tema se știe abia pe client). */
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

  const greeting = user?.firstName
    ? `Bună, ${user.firstName}`
    : "Bine ai revenit";

  return (
    <>
      <div className="home-when-classic">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {greeting}
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
      </div>

      <div className="home-when-themed">
        <header className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{greeting} ☕</p>
          <UserButton />
        </header>

        <HomeHero>
          <button
            onClick={() => router.push("/mapare")}
            className="loom-btn loom-btn-primary bg-indigo-9"
          >
            ＋ Mapare nouă
            <span className="loom-vadim-only">, să tremure piața</span>
          </button>
          <Link href="/ghiduri" className="loom-btn loom-btn-secondary">
            <span className="loom-not-vadim">Vezi ghidurile</span>
            <span className="loom-vadim-only">Arhiva de ghiduri a neamului</span>
          </Link>
        </HomeHero>

        <section aria-label="Quick links" className="mb-12 mt-14">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">
            Quick links
          </h2>
          <div className="loom-cards">
            <Link href="/mapare" className="loom-card bg-card">
              <div className="loom-chip">🗺️</div>
              <h3>Mapare</h3>
              <p>
                Lipește întrebările stakeholderilor și mapează-le pe indicatori.
              </p>
              <div className="loom-card-meta">
                <span className="loom-badge loom-badge-warm">start aici</span>
              </div>
            </Link>
            <Link href="/ghiduri" className="loom-card bg-card">
              <div className="loom-chip alt">🎙️</div>
              <h3>Ghiduri</h3>
              <p>Ghiduri de interviu cu timing, verificări și export Word.</p>
              <div className="loom-card-meta">
                <span className="loom-badge loom-badge-accent">
                  {guides.length === 0
                    ? "gol"
                    : guides.length === 1
                      ? "1 ghid"
                      : `${guides.length} ghiduri`}
                </span>
              </div>
            </Link>
            <Link href="/chestionare" className="loom-card bg-card">
              <div className="loom-chip">📊</div>
              <h3>Chestionare</h3>
              <p>Sondaje cantitative cu estimare LOI și lint automat.</p>
              <div className="loom-card-meta">
                <span className="loom-badge loom-badge-neutral">
                  {surveys.length === 0
                    ? "gol"
                    : surveys.length === 1
                      ? "1 chestionar"
                      : `${surveys.length} chestionare`}
                </span>
              </div>
            </Link>
          </div>
        </section>

        <VadimStiri />
        <VadimCitat />
      </div>

      <section aria-label="Studiile mele">
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Studiile mele
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <StudyList
            title="Ghiduri de interviu"
            icon={NotebookPen}
            href="/ghiduri"
            emptyText="Niciun ghid încă — creează unul cu butonul + sau generează-l dintr-o mapare."
            onCreate={() => {
              const guide = createGuide();
              router.push(`/ghiduri/${guide.id}`);
            }}
            createLabel="Ghid nou"
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
            emptyText="Niciun chestionar încă — creează unul cu butonul + sau generează-l dintr-o mapare."
            onCreate={() => {
              const survey = createSurvey();
              router.push(`/chestionare/${survey.id}`);
            }}
            createLabel="Chestionar nou"
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
  onCreate,
  createLabel,
  items,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  emptyText: string;
  onCreate: () => void;
  createLabel: string;
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
        <button
          onClick={onCreate}
          title={createLabel}
          aria-label={createLabel}
          className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-3 text-indigo-11 transition-colors hover:bg-indigo-4"
        >
          <Plus aria-hidden className="h-3.5 w-3.5" />
        </button>
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
