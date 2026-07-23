"use client";

import { useEffect, useRef } from "react";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { useTheme } from "next-themes";
import { api } from "../../convex/_generated/api";
import { useLoomTheme } from "@/components/ThemeProvider";
import { isLoomTheme, type LoomMode } from "@/lib/themes";

function isMode(value: unknown): value is LoomMode {
  return value === "light" || value === "dark" || value === "system";
}

/** Keeps the signed-in user's theme + mode in sync with their Convex
    profile. Renders nothing; signed-out users stay on localStorage. */
export function ThemeSync() {
  const { isAuthenticated } = useConvexAuth();
  const settings = useQuery(api.userSettings.get, isAuthenticated ? {} : "skip");
  const save = useMutation(api.userSettings.save);
  const { theme, setTheme } = useLoomTheme();
  const { theme: mode, setTheme: setMode } = useTheme();

  // True while the last local change came from applying a server value, so
  // the local→server effect doesn't echo it straight back.
  const applyingServer = useRef(false);
  // Only push local changes up after the first server round-trip, otherwise
  // defaults would clobber the saved settings before they load.
  const hydratedFromServer = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) {
      hydratedFromServer.current = false;
      return;
    }
    if (settings === undefined) return; // query still loading
    if (settings === null) {
      // Signed in but nothing saved yet: seed the profile from local state.
      if (!hydratedFromServer.current && isMode(mode)) {
        hydratedFromServer.current = true;
        void save({ theme, mode });
      }
      return;
    }
    hydratedFromServer.current = true;
    if (settings.theme !== theme || settings.mode !== mode) {
      applyingServer.current = true;
      if (isLoomTheme(settings.theme)) setTheme(settings.theme);
      if (isMode(settings.mode)) setMode(settings.mode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || !hydratedFromServer.current) return;
    if (applyingServer.current) {
      applyingServer.current = false;
      return;
    }
    if (!isMode(mode)) return; // next-themes not mounted yet
    const id = setTimeout(() => void save({ theme, mode }), 400);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, mode]);

  return null;
}
