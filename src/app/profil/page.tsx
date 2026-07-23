"use client";

import { useEffect, useState } from "react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useLoomTheme } from "@/components/ThemeProvider";
import {
  THEMES,
  themeSupportsModes,
  type ThemePreview as ThemePreviewColors,
} from "@/lib/themes";

const MODE_OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Monitor },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

/** Mini "card on background" thumbnail. The theme CSS is scoped to <html>,
    so previews are drawn from hardcoded swatches instead of inheriting it. */
function ThemeSwatch({ colors }: { colors: ThemePreviewColors }) {
  return (
    <div
      className="flex h-full w-full flex-col justify-between p-2"
      style={{ backgroundColor: colors.bg }}
    >
      <div
        className="flex flex-col gap-1 rounded-md border p-1.5"
        style={{
          backgroundColor: colors.card,
          borderColor: `color-mix(in oklab, ${colors.fg} 20%, ${colors.bg})`,
        }}
      >
        <div
          className="h-1.5 w-3/4 rounded-full"
          style={{ backgroundColor: colors.fg, opacity: 0.8 }}
        />
        <div
          className="h-1.5 w-1/2 rounded-full"
          style={{ backgroundColor: colors.fg, opacity: 0.35 }}
        />
      </div>
      <div
        className="h-2.5 w-9 self-end rounded-full"
        style={{ backgroundColor: colors.accent }}
      />
    </div>
  );
}

export default function ProfilePage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { theme, setTheme } = useLoomTheme();
  const { theme: mode, setTheme: setMode } = useTheme();
  // Theme + mode come from localStorage, so the active state only exists
  // after mount (same pattern as the sidebar toggle).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const modesLocked = mounted && !themeSupportsModes(theme);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-8 pb-16 pt-8">
      <header className="flex items-center gap-4">
        {isSignedIn ? (
          <>
            <UserButton />
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Profil"}
              </h1>
              {user.fullName && user.primaryEmailAddress && (
                <p className="text-sm text-muted-foreground">
                  {user.primaryEmailAddress.emailAddress}
                </p>
              )}
            </div>
          </>
        ) : (
          <h1 className="text-2xl font-semibold tracking-tight">Profil</h1>
        )}
      </header>

      <section className="mt-8" aria-labelledby="theme-heading">
        <h2 id="theme-heading" className="text-lg font-semibold tracking-tight">
          Temă
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {!isLoaded
            ? " "
            : isSignedIn
              ? "Selecția se salvează automat în contul tău și se aplică pe toate dispozitivele."
              : "Nu ești conectat — tema se salvează doar în acest browser."}
          {isLoaded && !isSignedIn && (
            <>
              {" "}
              <SignInButton>
                <button className="font-medium text-indigo-11 underline-offset-2 hover:underline">
                  Intră în cont
                </button>
              </SignInButton>{" "}
              ca să o păstrezi peste tot.
            </>
          )}
        </p>

        <div
          role="radiogroup"
          aria-label="Temă"
          className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        >
          {THEMES.map((t) => {
            const active = mounted && theme === t.id;
            return (
              <button
                key={t.id}
                role="radio"
                aria-checked={active}
                onClick={() => setTheme(t.id)}
                className={`group flex flex-col overflow-hidden rounded-xl border text-left transition-colors ${
                  active
                    ? "border-indigo-9 ring-2 ring-indigo-9/40"
                    : "border-border hover:border-ring"
                }`}
              >
                <div className="h-24 w-full overflow-hidden border-b border-border/60">
                  {t.previewDark ? (
                    <div className="grid h-full grid-cols-2">
                      <ThemeSwatch colors={t.preview} />
                      <ThemeSwatch colors={t.previewDark} />
                    </div>
                  ) : (
                    <ThemeSwatch colors={t.preview} />
                  )}
                </div>
                <div className="flex items-center gap-2 bg-card px-3 py-2">
                  <span className="text-sm font-medium">{t.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {t.previewDark
                      ? "light & dark"
                      : t.pinned === "dark"
                        ? "doar dark"
                        : "doar light"}
                  </span>
                  {active && (
                    <Check
                      className="ml-auto h-4 w-4 shrink-0 text-indigo-11"
                      aria-hidden
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="mode-heading">
        <h2 id="mode-heading" className="text-lg font-semibold tracking-tight">
          Mod
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {modesLocked
            ? "Tema selectată are un singur mod — alege Clasic sau Metal ca să comuți între light și dark."
            : "Alege light, dark sau modul sistemului."}
        </p>
        <div
          role="radiogroup"
          aria-label="Mod"
          className="mt-3 inline-flex gap-0.5 rounded-xl border border-border bg-card p-0.5"
        >
          {MODE_OPTIONS.map((opt) => {
            const active = mounted && !modesLocked && mode === opt.value;
            return (
              <button
                key={opt.value}
                role="radio"
                aria-checked={active}
                disabled={modesLocked}
                onClick={() => setMode(opt.value)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  active
                    ? "bg-indigo-9 font-medium text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <opt.icon className="h-4 w-4" aria-hidden />
                {opt.label}
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
