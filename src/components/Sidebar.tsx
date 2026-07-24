"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ClipboardList,
  Cog,
  FlaskConical,
  Gamepad2,
  Gauge,
  Home,
  Megaphone,
  Menu,
  Monitor,
  Moon,
  NotebookPen,
  Palette,
  Plane,
  Receipt,
  Scissors,
  Sun,
  Tv,
  UserRound,
  Waypoints,
  X,
} from "lucide-react";
import { MAPARE_ENABLED } from "@/lib/flags";
import { getActiveGuide, useGuideStore } from "@/lib/guides";
import { getActiveSurvey, useSurveyStore } from "@/lib/surveys";
import { useLoomTheme } from "@/components/ThemeProvider";
import { THEMES, themeSupportsModes, type LoomTheme } from "@/lib/themes";

const sections: {
  label: string | null;
  items: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
}[] = [
  {
    label: null,
    items: [{ href: "/", label: "Home", icon: Home }],
  },
  {
    label: "Research",
    items: [
      ...(MAPARE_ENABLED
        ? [{ href: "/mapare", label: "Mapare", icon: Waypoints }]
        : []),
      { href: "/ghiduri", label: "Ghiduri", icon: NotebookPen },
      { href: "/chestionare", label: "Chestionare", icon: ClipboardList },
    ],
  },
  {
    label: "Admin",
    items: [{ href: "/admin/indicatori", label: "Indicatori", icon: Gauge }],
  },
];

const HIDDEN_PREFIXES = ["/sign-in", "/sign-up"];

const MODE_OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Monitor },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

const THEME_ICONS: Record<LoomTheme, React.ComponentType<{ className?: string }>> = {
  classic: Palette,
  metal: Cog,
  cyberdeck: Gamepad2,
  vhs: Tv,
  broderie: Scissors,
  bon: Receipt,
  splitflap: Plane,
  vadim: Megaphone,
};

function ThemeToggle() {
  const { theme, setTheme } = useLoomTheme();
  const { theme: mode, setTheme: setMode } = useTheme();
  // Both hooks read localStorage, so the values only exist after mount;
  // render the controls without an active state until then to avoid a
  // hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Fixed-appearance themes ignore the mode; keep the row visible (layout
  // stability) but inert.
  const modesLocked = mounted && !themeSupportsModes(theme);

  return (
    <div className="flex w-fit flex-col gap-1">
      <div
        role="radiogroup"
        aria-label="Mod"
        className="grid grid-cols-3 gap-0.5 rounded-2xl border border-sidebar-border bg-sidebar p-0.5"
      >
        {MODE_OPTIONS.map((opt) => {
          const active = mounted && !modesLocked && mode === opt.value;
          return (
            <button
              key={opt.value}
              role="radio"
              aria-checked={active}
              aria-label={opt.label}
              title={
                modesLocked ? "Tema curentă are un singur mod" : opt.label
              }
              disabled={modesLocked}
              onClick={() => setMode(opt.value)}
              className={`rounded-full p-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-sidebar-accent-foreground"
              }`}
            >
              <opt.icon className="h-4 w-4" aria-hidden />
            </button>
          );
        })}
      </div>
      <div
        role="radiogroup"
        aria-label="Temă"
        className="grid grid-cols-4 gap-0.5 rounded-2xl border border-sidebar-border bg-sidebar p-0.5"
      >
        {THEMES.map((t) => {
          const Icon = THEME_ICONS[t.id];
          const active = mounted && theme === t.id;
          return (
            <button
              key={t.id}
              role="radio"
              aria-checked={active}
              aria-label={t.label}
              title={t.label}
              onClick={() => setTheme(t.id)}
              className={`rounded-full p-1.5 transition-colors ${
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SidebarInner({
  pathname,
  badgeCounts,
  onNavigate,
}: {
  pathname: string;
  badgeCounts: Record<string, number>;
  onNavigate?: () => void;
}) {
  return (
    <>
      <nav
        aria-label="Main"
        className="flex flex-1 flex-col gap-5 overflow-y-auto px-2 pb-4"
      >
        {sections.map((section, i) => (
          <div key={section.label ?? i} className="flex flex-col gap-0.5">
            {section.label && (
              <div className="px-2 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {section.label}
              </div>
            )}
            {section.items.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-base transition-colors ${
                    active
                      ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" aria-hidden />
                  {item.label}
                  {(badgeCounts[item.href] ?? 0) > 0 && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-9 px-1.5 text-xs font-semibold tabular-nums text-white">
                      {badgeCounts[item.href]}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-2 border-t border-sidebar-border px-3 py-3">
        <Link
          href="/profil"
          onClick={onNavigate}
          aria-current={pathname.startsWith("/profil") ? "page" : undefined}
          className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-base transition-colors ${
            pathname.startsWith("/profil")
              ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
              : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          }`}
        >
          <UserRound className="h-4 w-4" aria-hidden />
          Profil
        </Link>
        <ThemeToggle />
      </div>
    </>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const guideStore = useGuideStore();
  const surveyStore = useSurveyStore();
  // localStorage only exists client-side; render the counts after mount to
  // avoid a hydration mismatch (same pattern as ThemeToggle).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const badgeCounts: Record<string, number> = mounted
    ? {
        "/ghiduri": getActiveGuide(guideStore)?.items.length ?? 0,
        "/chestionare": getActiveSurvey(surveyStore)?.items.length ?? 0,
      }
    : {};

  // Drawer-ul mobil: se închide la navigare (onNavigate pe linkuri), pe
  // Escape, și blochează scroll-ul paginii cât e deschis.
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) {
    return null;
  }

  return (
    <>
      {/* bara de sus, doar pe mobil */}
      <header className="loom-topbar sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-sidebar-border bg-sidebar px-4 text-sidebar-foreground md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-sidebar-primary" aria-hidden />
          <span className="text-base font-semibold tracking-tight">Loom</span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Deschide meniul"
          aria-expanded={open}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
      </header>

      {/* drawer-ul mobil + backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] transition-opacity duration-200 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Meniu"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-4 py-4">
          <FlaskConical className="h-5 w-5 text-sidebar-primary" aria-hidden />
          <span className="text-base font-semibold tracking-tight">Loom</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Închide meniul"
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <SidebarInner
          pathname={pathname}
          badgeCounts={badgeCounts}
          onNavigate={() => setOpen(false)}
        />
      </aside>

      {/* sidebar-ul de desktop */}
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex items-center gap-2 px-4 py-4">
          <FlaskConical className="h-5 w-5 text-sidebar-primary" aria-hidden />
          <span className="text-base font-semibold tracking-tight">Loom</span>
        </div>
        <SidebarInner pathname={pathname} badgeCounts={badgeCounts} />
      </aside>
    </>
  );
}
