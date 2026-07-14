"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ClipboardList,
  FlaskConical,
  Gauge,
  Home,
  Monitor,
  Moon,
  NotebookPen,
  Sun,
  Waypoints,
} from "lucide-react";
import { getActiveGuide, useGuideStore } from "@/lib/guides";
import { getActiveSurvey, useSurveyStore } from "@/lib/surveys";

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
      { href: "/mapare", label: "Mapare", icon: Waypoints },
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

const THEME_OPTIONS = [
  { value: "light", label: "Light theme", icon: Sun },
  { value: "system", label: "System theme", icon: Monitor },
  { value: "dark", label: "Dark theme", icon: Moon },
] as const;

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // useTheme reads localStorage, so the value only exists after mount;
  // render the controls without an active state until then to avoid a
  // hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex w-fit items-center gap-0.5 rounded-full border border-sidebar-border bg-sidebar p-0.5"
    >
      {THEME_OPTIONS.map((opt) => {
        const active = mounted && theme === opt.value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={active}
            aria-label={opt.label}
            title={opt.label}
            onClick={() => setTheme(opt.value)}
            className={`rounded-full p-1.5 transition-colors ${
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

  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) {
    return null;
  }

  return (
    <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2 px-4 py-4">
        <FlaskConical className="h-5 w-5 text-sidebar-primary" aria-hidden />
        <span className="text-base font-semibold tracking-tight">Loom</span>
      </div>

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

      <div className="border-t border-sidebar-border px-3 py-3">
        <ThemeToggle />
      </div>
    </aside>
  );
}
