"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { InlineScript } from "@/components/InlineScript";
import {
  THEME_KEY,
  MODE_KEY,
  THEME_INIT_SCRIPT,
  PINNED_SCHEME_SCRIPT,
  isLoomTheme,
  pinnedScheme,
  type LoomTheme,
} from "@/lib/themes";

type LoomThemeContextValue = {
  theme: LoomTheme;
  setTheme: (theme: LoomTheme) => void;
};

const LoomThemeContext = createContext<LoomThemeContextValue | null>(null);

export function useLoomTheme() {
  const ctx = useContext(LoomThemeContext);
  if (!ctx) {
    throw new Error("useLoomTheme must be used within ThemeProvider");
  }
  return ctx;
}

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lazy initializer reads the same key as THEME_INIT_SCRIPT, so React's
  // initial state matches the DOM the inline script produced pre-paint.
  const [theme, setThemeState] = useState<LoomTheme>(() => {
    if (typeof window === "undefined") return "classic";
    try {
      const stored = localStorage.getItem(THEME_KEY);
      return isLoomTheme(stored) ? stored : "classic";
    } catch {
      return "classic";
    }
  });

  const setTheme = useCallback((next: LoomTheme) => {
    setThemeState(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // localStorage unavailable (private mode); in-memory theme still works
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "classic") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
  }, [theme]);

  // Cross-tab sync for the theme axis (next-themes handles the mode axis).
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_KEY && isLoomTheme(e.newValue)) {
        setThemeState(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <LoomThemeContext.Provider value={{ theme, setTheme }}>
      <InlineScript html={THEME_INIT_SCRIPT} />
      <NextThemesProvider
        attribute="class"
        storageKey={MODE_KEY}
        defaultTheme="system"
        enableSystem
        themes={["light", "dark"]}
        forcedTheme={pinnedScheme(theme)}
        disableTransitionOnChange
      >
        <InlineScript html={PINNED_SCHEME_SCRIPT} />
        {children}
      </NextThemesProvider>
    </LoomThemeContext.Provider>
  );
}
