"use client";

import { useEffect, useRef, useState } from "react";
import { useLoomTheme } from "@/components/ThemeProvider";
import {
  polishSound,
  scratchSoundEnd,
  scratchSoundMove,
  scratchSoundStart,
} from "@/lib/themeAudio";

/** Metal-theme easter egg: press and drag on empty background to scratch
    the metal, with a synthesized screech that follows the cursor speed.
    A plain click (under 6px of movement) leaves no mark, and drags that
    start on interactive or text elements are ignored. Scratching an X
    (two crossing diagonal strokes) polishes the whole plate clean. */
export function ScratchCanvas() {
  const { theme } = useLoomTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // depinde și de `mounted`: la load direct pe tema metal, prima rulare se
    // întâmplă înainte ca <canvas> să existe și altfel nu s-ar mai re-executa
    if (theme !== "metal" || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();

    type Point = { x: number; y: number };
    type Stroke = { a: Point; b: Point; t: number; slope: number };
    let scratching = false;
    let scratchStarted = false;
    let start: Point = { x: 0, y: 0 };
    let last: Point = { x: 0, y: 0 };
    let strokeLen = 0;
    let lastStroke: Stroke | null = null;
    let polishTimer: ReturnType<typeof setTimeout> | null = null;

    const onBackground = (el: Element) =>
      !el.closest(
        "button, a, input, textarea, select, label, aside, nav, p, h1, h2, h3, h4, span, strong, svg, [role]"
      );

    const drawScratch = (a: Point, b: Point) => {
      const dark = document.documentElement.classList.contains("dark");
      ctx.lineCap = "round";
      // groove shadow underneath, slightly offset — gives depth
      ctx.strokeStyle = dark ? "rgba(0,0,0,.6)" : "rgba(15,20,28,.4)";
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(a.x + 1, a.y + 1.3);
      ctx.lineTo(b.x + 1, b.y + 1.3);
      ctx.stroke();
      // bright cut (freshly exposed metal) with a varying glint
      ctx.strokeStyle = dark
        ? `rgba(220,235,255,${0.5 + Math.random() * 0.4})`
        : `rgba(255,255,255,${0.55 + Math.random() * 0.35})`;
      ctx.lineWidth = 1.1 + Math.random() * 0.5;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    };

    /* „Tabula rasa": două trăsături drepte, diagonale, pe pante opuse,
       care se intersectează, trase una după alta => placa se lustruiește. */
    const segIntersect = (p1: Point, p2: Point, p3: Point, p4: Point) => {
      const d = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
      if (!d) return false;
      const t =
        ((p3.x - p1.x) * (p4.y - p3.y) - (p3.y - p1.y) * (p4.x - p3.x)) / d;
      const u =
        ((p3.x - p1.x) * (p2.y - p1.y) - (p3.y - p1.y) * (p2.x - p1.x)) / d;
      return t > 0.05 && t < 0.95 && u > 0.05 && u < 0.95;
    };

    const polishSlate = () => {
      try {
        polishSound();
      } catch {
        // fără audio — lustruirea rămâne doar vizuală
      }
      // zgârieturile pălesc, ca șterse cu o cârpă moale
      canvas.style.transition = "opacity .45s ease";
      canvas.style.opacity = "0";
      polishTimer = setTimeout(() => {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        canvas.style.transition = "none";
        canvas.style.opacity = "1";
        polishTimer = null;
      }, 470);
    };

    const maybeCleanSlate = (a: Point, b: Point) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy);
      const ang = (Math.atan2(Math.abs(dy), Math.abs(dx)) * 180) / Math.PI;
      // trăsătură validă = destul de lungă, aproape dreaptă, clar diagonală
      const stroke: Stroke & { ok: boolean } = {
        a,
        b,
        t: performance.now(),
        ok: dist > 40 && strokeLen / dist < 1.3 && ang > 15 && ang < 75,
        slope: Math.sign(dx * dy), // 1 = coboară spre dreapta, -1 = urcă
      };
      if (!stroke.ok) {
        lastStroke = null;
        return;
      }
      if (
        lastStroke &&
        stroke.t - lastStroke.t < 2500 &&
        lastStroke.slope !== stroke.slope &&
        segIntersect(lastStroke.a, lastStroke.b, stroke.a, stroke.b)
      ) {
        lastStroke = null;
        polishSlate();
      } else {
        lastStroke = stroke;
      }
    };

    const onDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (!(e.target instanceof Element) || !onBackground(e.target)) return;
      scratching = true;
      scratchStarted = false;
      strokeLen = 0;
      start = last = { x: e.clientX, y: e.clientY };
    };
    const onMove = (e: MouseEvent) => {
      if (!scratching) return;
      const pt = { x: e.clientX, y: e.clientY };
      if (!scratchStarted) {
        if (Math.hypot(pt.x - start.x, pt.y - start.y) < 6) return;
        scratchStarted = true;
        document.body.style.userSelect = "none";
        try {
          scratchSoundStart();
        } catch {
          // fără audio — zgâriatul rămâne doar vizual
        }
      }
      drawScratch(last, pt);
      const step = Math.hypot(pt.x - last.x, pt.y - last.y);
      strokeLen += step;
      scratchSoundMove(step);
      last = pt;
    };
    const onUp = () => {
      if (scratching && scratchStarted) maybeCleanSlate(start, last);
      scratching = false;
      scratchStarted = false;
      document.body.style.userSelect = "";
      scratchSoundEnd();
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onUp);
    window.addEventListener("resize", size);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onUp);
      window.removeEventListener("resize", size);
      document.body.style.userSelect = "";
      scratchSoundEnd();
      if (polishTimer) clearTimeout(polishTimer);
      canvas.style.transition = "none";
      canvas.style.opacity = "1";
    };
  }, [theme, mounted]);

  if (!mounted || theme !== "metal") return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
