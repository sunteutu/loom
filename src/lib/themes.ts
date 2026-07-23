// Two-axis theming: the *theme* axis (this file) lives on
// <html data-theme="...">, while the *mode* axis (light/dark/system) is
// handled by next-themes as a class on <html>. Classic and Metal respond to
// the mode; the other themes have a single fixed appearance and pin their
// scheme regardless of the stored mode.

export const THEME_KEY = "loom-theme";
export const MODE_KEY = "loom-mode";

export type LoomMode = "light" | "dark" | "system";

export type ThemePreview = {
  /** Page background */
  bg: string;
  /** Card / surface */
  card: string;
  /** Accent (primary action) */
  accent: string;
  /** Text */
  fg: string;
};

export const THEMES = [
  {
    id: "classic",
    label: "Clasic",
    pinned: undefined,
    preview: { bg: "#fcfcfd", card: "#ffffff", accent: "#3e63dd", fg: "#1c2024" },
    previewDark: { bg: "#111113", card: "#18191b", accent: "#3e63dd", fg: "#edeef0" },
  },
  {
    id: "metal",
    label: "Metal",
    pinned: undefined,
    preview: { bg: "#c9cdd4", card: "#dfe2e7", accent: "#33639e", fg: "#14171b" },
    previewDark: { bg: "#1b1e23", card: "#2b2f36", accent: "#4e83c6", fg: "#e9ebef" },
  },
  {
    id: "cyberdeck",
    label: "Retro Nostalgia",
    pinned: "light",
    preview: { bg: "#a8d4f7", card: "#ffffff", accent: "#1273e6", fg: "#12365c" },
    previewDark: undefined,
  },
  {
    id: "vhs",
    label: "VHS",
    pinned: "dark",
    preview: { bg: "#0b0b10", card: "#15151d", accent: "#ff2d95", fg: "#e8e6df" },
    previewDark: undefined,
  },
  {
    id: "broderie",
    label: "Broderie",
    pinned: "light",
    preview: { bg: "#7d9cd4", card: "#fbf5e8", accent: "#c04a32", fg: "#53402f" },
    previewDark: undefined,
  },
  {
    id: "bon",
    label: "Bon fiscal",
    pinned: "light",
    preview: { bg: "#f7f5ee", card: "#fdfcf7", accent: "#24211a", fg: "#24211a" },
    previewDark: undefined,
  },
  {
    id: "splitflap",
    label: "Split-flap",
    pinned: "dark",
    preview: { bg: "#1b1c21", card: "#0f1013", accent: "#ffb400", fg: "#f3efe4" },
    previewDark: undefined,
  },
] as const;

export type LoomTheme = (typeof THEMES)[number]["id"];

const FIXED_THEME_IDS = THEMES.filter((t) => t.pinned).map((t) => t.id);

const PINNED: Record<string, "light" | "dark"> = Object.fromEntries(
  THEMES.filter((t) => t.pinned).map((t) => [t.id, t.pinned as "light" | "dark"])
);

export function isLoomTheme(value: unknown): value is LoomTheme {
  return typeof value === "string" && THEMES.some((t) => t.id === value);
}

export function pinnedScheme(theme: LoomTheme): "light" | "dark" | undefined {
  return PINNED[theme];
}

export function themeSupportsModes(theme: LoomTheme): boolean {
  return !PINNED[theme];
}

/* Pre-paint inline scripts (see the "Preventing Flash" guide in the Next.js
   docs). Both run during HTML parsing on hard navigations only; on soft
   navigations React state drives the DOM instead. */

/** Runs BEFORE next-themes' own script: migrates the legacy single `theme`
    localStorage key (which used to hold either a mode or a custom theme
    name) into the two new keys, then applies data-theme to <html>. */
export const THEME_INIT_SCRIPT = `(function(){try{
var d=document.documentElement,F=${JSON.stringify(FIXED_THEME_IDS)};
var t=localStorage.getItem("${THEME_KEY}");
if(!t){var L=localStorage.getItem("theme");
if(L&&F.indexOf(L)>-1){t=L;localStorage.setItem("${THEME_KEY}",L);localStorage.setItem("${MODE_KEY}","system");localStorage.removeItem("theme");}
else if(L==="light"||L==="dark"||L==="system"){localStorage.setItem("${MODE_KEY}",L);localStorage.removeItem("theme");}}
if(t&&t!=="classic"&&(F.indexOf(t)>-1||t==="metal"))d.setAttribute("data-theme",t);
}catch(e){}})();`;

/** Runs AFTER next-themes' script, still pre-paint: fixed themes pin their
    scheme no matter what mode is stored. Mirrors what next-themes'
    forcedTheme effect will do post-hydration, closing the gap. */
export const PINNED_SCHEME_SCRIPT = `(function(){try{
var p=${JSON.stringify(PINNED)}[localStorage.getItem("${THEME_KEY}")];
if(p){var d=document.documentElement;d.classList.remove("light","dark");d.classList.add(p);d.style.colorScheme=p;}
}catch(e){}})();`;
