"use client";

import { useEffect } from "react";

/** Dev-only: badge-ul Next.js DevTools („N") stă implicit în dreapta-sus,
    unde acoperă decorul temelor (ceasul split-flap, butonul de export).
    Îl andocăm jos-stânga, la dreapta switcher-ului de teme din sidebar.
    Badge-ul trăiește într-un shadow root cu poziția în stil inline, deci
    singura cale e să-i rescriem stilul din JS; în producție portalul nu
    există și componenta nu face nimic. */
const DOCK = { left: "172px", bottom: "18px" };

export function DevIndicatorDock() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const dock = (root: ShadowRoot) => {
      for (const el of root.querySelectorAll<HTMLElement>(".nextjs-toast")) {
        if (el.style.left !== DOCK.left) el.style.left = DOCK.left;
        if (el.style.bottom !== DOCK.bottom) el.style.bottom = DOCK.bottom;
        if (el.style.top !== "auto") el.style.top = "auto";
        if (el.style.right !== "auto") el.style.right = "auto";
      }
    };

    let observer: MutationObserver | null = null;
    let poll: ReturnType<typeof setInterval> | null = null;

    const attach = () => {
      const root = document.querySelector("nextjs-portal")?.shadowRoot;
      if (!root) return false;
      dock(root);
      observer = new MutationObserver(() => dock(root));
      observer.observe(root, { childList: true, subtree: true });
      return true;
    };

    // portalul apare abia după hidratare; îl așteptăm cu un poll scurt
    if (!attach()) {
      poll = setInterval(() => {
        if (attach() && poll) {
          clearInterval(poll);
          poll = null;
        }
      }, 500);
    }
    return () => {
      observer?.disconnect();
      if (poll) clearInterval(poll);
    };
  }, []);

  return null;
}
