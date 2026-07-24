"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLoomTheme } from "@/components/ThemeProvider";
import type { LoomTheme } from "@/lib/themes";
import {
  bonPrint,
  bubblePop,
  clackOnce,
  flapCascade,
  goarnaFanfara,
  hamElodia,
  installAudioUnlock,
  stitchPull,
  vcrClunk,
  vhsTracking,
} from "@/lib/themeAudio";

/** Per-theme ambient decorations ported from mockups/teme.html:
    Split-flap gets the blue-hour terminal window (moon, planes, runway,
    ticker, bag tag, live clock, tumbling letter plaques + clack sounds);
    Broderie gets satin-stitch bouquets and the full sewing kit; Retro
    Nostalgia gets poppable soap bubbles and the sticky note; Bon fiscal
    gets old receipts. Theme switches also play their signature sound. */
export function ThemeDecorations() {
  const { theme } = useLoomTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Pe mobil (iOS) contextul audio trebuie pornit sincron într-un gest;
  // primul tap de oriunde îl deblochează pentru sunetele din efecte.
  useEffect(() => installAudioUnlock(), []);

  // Signature sound on user-initiated theme switches only. Tema se poate
  // schimba și fără gest — ThemeSync aplică profilul din Convex la load —
  // așa că cerem activare tranzientă (un click/tap în urmă cu câteva
  // secunde), altfel refresh-ul cu profil desincronizat pornea imprimanta.
  // Bonul e zgomotos și lung — sună doar pe Home; la export are overlay-ul.
  const prevTheme = useRef<LoomTheme | null>(null);
  useEffect(() => {
    const userInitiated = navigator.userActivation?.isActive ?? false;
    if (
      prevTheme.current !== null &&
      prevTheme.current !== theme &&
      userInitiated
    ) {
      try {
        if (theme === "splitflap") flapCascade();
        else if (theme === "bon" && pathname === "/") bonPrint();
        else if (theme === "vadim") goarnaFanfara();
      } catch {
        // audio blocked or unavailable — decor rămâne vizual
      }
    }
    prevTheme.current = theme;
  }, [theme, pathname]);

  if (!mounted) return null;
  if (theme === "splitflap") return <SplitflapDecor />;
  if (theme === "broderie") return <BroderieDecor />;
  if (theme === "cyberdeck") return <CyberdeckDecor />;
  if (theme === "bon") return <BonDecor />;
  if (theme === "vhs") return <VhsDecor />;
  if (theme === "vadim") return <VadimDecor pathname={pathname} />;
  return null;
}

/* ————— Tribunul 3000: laser tricolor, scântei de cursor și colajul de
   fundal — poze-sticker duoton cu bule de replici, per pagină. Elodia
   (Chestionare) e clicabilă, cu sunet. ————— */

type CutoutStyle = React.CSSProperties & Record<string, string>;

function VadimDecor({ pathname }: { pathname: string }) {
  // scânteile ✦/⚡/★ sar din mișcarea cursorului — versiunea „turbată”:
  // mai dese (40ms), mai mari (16–34px) și aruncate în direcții aleatorii,
  // cu rotații sălbatice, prin variabilele --dx/--dy/--rot/--sc
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // culori la saturație maximă, scânteile rămân opace aproape tot zborul
    const culori = ["#00a3ff", "#ff2ec4", "#8ae32c", "#ffc800", "#ff8a2a", "#8c5bff"];
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let ultim = 0;
    const onMove = (e: PointerEvent) => {
      const acum = performance.now();
      if (acum - ultim < 35) return;
      ultim = acum;
      const s = document.createElement("span");
      s.className = "vadim-scanteie";
      const zar = Math.random();
      s.textContent = zar < 0.3 ? "⚡" : zar < 0.45 ? "★" : "✦";
      s.style.left = `${e.clientX + (Math.random() - 0.5) * 14}px`;
      s.style.top = `${e.clientY + (Math.random() - 0.5) * 14}px`;
      s.style.fontSize = `${16 + Math.random() * 14}px`;
      s.style.color = culori[(Math.random() * culori.length) | 0];
      s.style.textShadow = "0 0 12px currentColor";
      s.style.setProperty("--dx", `${(Math.random() - 0.5) * 44}px`);
      s.style.setProperty("--dy", `${-45 - Math.random() * 50}px`);
      s.style.setProperty("--rot", `${20 + (Math.random() - 0.5) * 90}deg`);
      s.style.setProperty("--sc", `${1.1 + Math.random() * 0.4}`);
      document.body.appendChild(s);
      timeouts.push(setTimeout(() => s.remove(), 1030));
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      removeEventListener("pointermove", onMove);
      timeouts.forEach(clearTimeout);
      document.querySelectorAll(".vadim-scanteie").forEach((el) => el.remove());
    };
  }, []);

  // Elodia se ține de coada săgeții: medalionul urmează cursorul, decalat
  // spre baza săgeții (dreapta-jos față de vârf), doar pe pointer fin
  const elodiaRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const el = elodiaRef.current;
      if (!el) return;
      el.style.transform = `translate(${e.clientX + 12}px, ${e.clientY + 18}px)`;
      el.style.opacity = "1";
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => removeEventListener("pointermove", onMove);
  }, []);

  const onHome = pathname === "/";
  const onChestionare = pathname.startsWith("/chestionare");

  return (
    <>
      <div className="vadim-tricolor" aria-hidden />
      <span ref={elodiaRef} className="vadim-elodia-cursor" aria-hidden />

      {/* filigranul tipografiei: meme-ul doar-contur, în derivă lentă prin
          cerul de date — pe TOATE paginile temei */}
      <div className="vadim-filigran" aria-hidden>
        <span
          style={{ top: "28%", "--fd": "90s", "--fs": "24vw", animationDelay: "-30s" } as CutoutStyle}
        >
          PITICĂ NENOROCITĂ!
        </span>
      </div>

      {onChestionare && (
        <button
          type="button"
          className="vadim-cutout interactiv ton-magenta"
          title="Cabinetul Elodia — click: Ham!"
          aria-label="Elodia latră"
          onClick={() => {
            try {
              hamElodia();
            } catch {
              // fără audio
            }
          }}
          style={{ "--rot": "3deg", "--dur": "16s", right: "18px", bottom: "24px", width: "min(15vw, 210px)" } as CutoutStyle}
        >
          <svg
            className="lv-doodle contur lv-boil"
            style={{ left: -20, bottom: -16, width: 46, height: 46, color: "#ff5ad1" }}
            viewBox="0 0 100 100"
            aria-hidden
          >
            <path d="M50 88 C20 66 6 44 18 28 C28 14 46 18 50 32 C54 18 72 14 82 28 C94 44 80 66 50 88 Z" />
          </svg>
          <img src="/themes/vadim/tribun-elodia.jpg" alt="" />
          <span
            className="vadim-clipici"
            style={{ right: "12%", top: "14%", "--cc": "#ff5ad1", "--cdelay": "1.4s", "--cs": "13px" } as CutoutStyle}
          >
            ✦
          </span>
          <span className="vadim-replica sus" style={{ "--rc": "#ff5ad1", left: "-24px", top: "-64px" } as CutoutStyle}>
            Elodia respinge chestionarele mai lungi de 20 de minute.
          </span>
        </button>
      )}
    </>
  );
}

/* ————— Fundal fun comun: blobs de culoare + cafeluțe aburinde ————— */

function Blobs() {
  return (
    <>
      <div className="loom-blob loom-blob-a" />
      <div className="loom-blob loom-blob-b" />
      <div className="loom-blob loom-blob-c" />
    </>
  );
}

/* ————— VHS: caseta înregistrează live, tracking la click, pauză ————— */

function formatTape(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}:${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function VhsDecor() {
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);

  // caseta „înregistrează" cât timp e tema activă; pauza oprește banda,
  // deci și contorul
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [paused]);

  // starea de pauză stă pe <html>, ca CSS-ul să poată tremura <main>-ul
  // fără prop drilling prin layout
  useEffect(() => {
    document.documentElement.classList.toggle("vhs-paused", paused);
    return () => document.documentElement.classList.remove("vhs-paused");
  }, [paused]);

  // click pe fundal liber = lovitura de tracking: o bandă de zgomot
  // rulează pe ecran, cu burst-ul de semnal rupt pe fundal sonor
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const onClick = (e: MouseEvent) => {
      if (
        e.target instanceof Element &&
        e.target.closest("button, a, input, textarea, select, label")
      ) {
        return;
      }
      const band = document.createElement("div");
      band.className = "vhs-track";
      document.body.appendChild(band);
      timeouts.push(setTimeout(() => band.remove(), 750));
      try {
        vhsTracking();
      } catch {
        // fără audio
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      timeouts.forEach(clearTimeout);
      document.querySelectorAll(".vhs-track").forEach((el) => el.remove());
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <Blobs />
      </div>
      <button
        type="button"
        className="vhs-rec"
        aria-label={paused ? "Reia caseta" : "Pune caseta pe pauză"}
        onClick={() => {
          setPaused((p) => !p);
          try {
            vcrClunk();
          } catch {
            // fără audio
          }
        }}
      >
        {paused ? "⏸ PAUSE" : `● REC  SP ${formatTape(elapsed)}`}
      </button>
      {paused && <div className="vhs-pausebar" aria-hidden />}
    </>
  );
}

/* ————— Split-flap: aeroportul la ora albastră ————— */

const FLAP_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZĂÎȘȚÂ";

/** Împachetează literele primului h1 din pagină în plăcuțe care se
    rostogolesc de câteva ori (ciclând litere aleatorii) până se așază.
    La schimbarea rutei se reia; la demontare textul original revine. */
function useFlapTitle() {
  const pathname = usePathname();
  useEffect(() => {
    // Home ține în DOM ambele variante (clasic + tematic) și h1-ul clasic,
    // ascuns cu CSS, e primul — plăcuțele trebuie să se atașeze pe h1-ul
    // efectiv vizibil, altfel flip-ul rulează pe titlul invizibil.
    const h1 = Array.from(
      document.querySelectorAll<HTMLElement>("main h1")
    ).find((el) => el.getClientRects().length > 0);
    if (!h1) return;
    const original = h1.textContent ?? "";
    if (!original.trim()) return;
    // titlul poate conține markup (span-ul .loom-grad din hero) — se
    // restaurează la demontare, altfel schimbarea temei l-ar lăsa text simplu
    const originalHTML = h1.innerHTML;

    h1.textContent = "";
    const chars: HTMLSpanElement[] = [];
    for (const token of original.split(/(\s+)/)) {
      if (!token) continue;
      if (token.trim() === "") {
        h1.appendChild(document.createTextNode(token));
        continue;
      }
      // literele unui cuvânt stau împreună, ca rândul să se rupă doar
      // între cuvinte
      const word = document.createElement("span");
      word.style.whiteSpace = "nowrap";
      for (const ch of token) {
        const s = document.createElement("span");
        s.className = "flap-char";
        s.textContent = ch;
        word.appendChild(s);
        chars.push(s);
      }
      h1.appendChild(word);
    }

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => {
      timeouts.push(
        setTimeout(() => {
          if (!cancelled) fn();
        }, ms)
      );
    };
    chars.forEach((s, i) => {
      const final = s.textContent ?? "";
      const flips = 3 + Math.floor(Math.random() * 3);
      let n = 0;
      const doFlip = () => {
        n++;
        s.classList.remove("flip");
        void s.offsetWidth; // repornește animația
        s.classList.add("flip");
        // caracterul se schimbă exact când plăcuța e pe muchie
        later(() => {
          s.textContent =
            n >= flips
              ? final
              : FLAP_ALPHABET[(Math.random() * FLAP_ALPHABET.length) | 0];
        }, 115);
        if (n < flips) later(doFlip, 210 + Math.random() * 90);
        else later(() => s.classList.remove("flip"), 340);
      };
      later(doFlip, i * 38); // cascadă stânga → dreapta
    });

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
      h1.innerHTML = originalHTML;
    };
  }, [pathname]);
}

function useAirportClock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
      );
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function PlaneSvg({ className, width, height }: { className: string; width: number; height: number }) {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 120 36" aria-hidden>
      <g fill="#0a0d18">
        <path d="M2 18 L84 14 C98 14 108 16 116 18 C108 20 98 22 84 22 L2 18 Z" />
        <path d="M40 17 L20 4 L30 4 L56 15 Z" />
        <path d="M40 19 L20 32 L30 32 L56 21 Z" />
        <path d="M92 16 L84 6 L90 6 L100 15 Z" />
      </g>
      <circle className="sf-poslight" cx={116} cy={18} r={2} fill="#ff6b57" />
      <circle className="sf-poslight" cx={24} cy={5} r={1.6} fill="#ffffff" />
    </svg>
  );
}

function SplitflapDecor() {
  const time = useAirportClock();
  useFlapTitle();

  // cât timp ești pe split-flap, orice buton/link răspunde cu un clack
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest("button, a")) {
        try {
          clackOnce();
        } catch {
          // fără audio
        }
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="sf-moon" />
        <PlaneSvg className="sf-plane" width={190} height={57} />
        <PlaneSvg className="sf-plane sf-p2" width={112} height={34} />
        <PlaneSvg className="sf-plane sf-p3" width={150} height={45} />
        <PlaneSvg className="sf-plane sf-p4" width={76} height={23} />
        <div className="sf-runway">
          <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" aria-hidden>
            <ellipse cx={600} cy={42} rx={440} ry={28} fill="#3a4a7a" opacity=".22" />
            <g fill="#9db4e8" opacity=".35">
              <rect x={596} y={278} width={8} height={26} rx={1} />
              <rect x={597} y={233} width={6} height={20} rx={1} />
              <rect x={597.5} y={194} width={5} height={16} rx={1} />
              <rect x={598} y={161} width={4} height={12} rx={1} />
              <rect x={598.5} y={134} width={3} height={9} rx={1} />
              <rect x={598.75} y={112} width={2.5} height={7} rx={1} />
              <rect x={599} y={94} width={2} height={5} rx={1} />
            </g>
            <g fill="#cfe0ff" opacity=".8">
              <circle cx={150} cy={290} r={5.5} />
              <circle className="sf-blink" cx={223} cy={248} r={4.8} />
              <circle cx={288} cy={210} r={4.2} />
              <circle cx={344} cy={177} r={3.6} />
              <circle className="sf-blink sf-b2" cx={393} cy={149} r={3.1} />
              <circle cx={434} cy={126} r={2.7} />
              <circle cx={466} cy={107} r={2.3} />
              <circle className="sf-blink sf-b3" cx={494} cy={90} r={2} />
              <circle cx={519} cy={76} r={1.8} />
              <circle cx={539} cy={64} r={1.6} />
              <circle cx={1050} cy={290} r={5.5} />
              <circle className="sf-blink sf-b3" cx={977} cy={248} r={4.8} />
              <circle cx={912} cy={210} r={4.2} />
              <circle className="sf-blink" cx={856} cy={177} r={3.6} />
              <circle cx={807} cy={149} r={3.1} />
              <circle cx={766} cy={126} r={2.7} />
              <circle className="sf-blink sf-b2" cx={734} cy={107} r={2.3} />
              <circle cx={706} cy={90} r={2} />
              <circle cx={681} cy={76} r={1.8} />
              <circle cx={661} cy={64} r={1.6} />
            </g>
          </svg>
        </div>
      </div>
      <div className="sf-topright" aria-hidden>
        <span className="sf-gate">
          GATE <i>07</i>
        </span>
        <span className="sf-clock">
          {time.slice(0, 2)}
          <b>:</b>
          {time.slice(3)}
        </span>
      </div>
      <div className="bag-tag" aria-hidden>
        <i className="hole" />
        <b>LOOM ✈ RSR</b>
        <span>SEAT 1A · PRIORITY</span>
        <i className="bars" />
      </div>
      <div className="sf-ticker" aria-hidden>
        <div className="sf-tape">
          LOOM AIR VĂ UREAZĂ ZBOR PLĂCUT&nbsp;&nbsp;·&nbsp;&nbsp;ULTIMUL APEL PENTRU
          STUDIUL 07&nbsp;&nbsp;·&nbsp;&nbsp;NU LĂSAȚI INDICATORII
          NESUPRAVEGHEAȚI&nbsp;&nbsp;·&nbsp;&nbsp;ÎMBARCAREA SE FACE PE BAZĂ DE GHID
          DE INTERVIU&nbsp;&nbsp;·&nbsp;&nbsp;LOOM AIR VĂ UREAZĂ ZBOR
          PLĂCUT&nbsp;&nbsp;·&nbsp;&nbsp;ULTIMUL APEL PENTRU STUDIUL
          07&nbsp;&nbsp;·&nbsp;&nbsp;NU LĂSAȚI INDICATORII
          NESUPRAVEGHEAȚI&nbsp;&nbsp;·&nbsp;&nbsp;ÎMBARCAREA SE FACE PE BAZĂ DE GHID
          DE INTERVIU&nbsp;&nbsp;·&nbsp;&nbsp;
        </div>
      </div>
    </>
  );
}

/* ————— Retro Nostalgia: bule de săpun poppabile + post-it ————— */

const BUBBLE_COUNT = 8;

function CyberdeckDecor() {
  const layerRef = useRef<HTMLDivElement>(null);
  // Post-it-ul plutește peste conținut (z 2); pe Indicatori bara sticky de
  // căutare + filtre stă chiar sub el, așa că acolo nu-l afișăm deloc.
  const pathname = usePathname();
  const showNote = !pathname.startsWith("/admin");

  useEffect(() => {
    const respawnTimeouts: ReturnType<typeof setTimeout>[] = [];

    const pop = (bubble: HTMLElement) => {
      bubble.dataset.popped = "1";
      const r = bubble.getBoundingClientRect();
      try {
        bubblePop(r.width);
      } catch {
        // fără audio
      }
      const burst = document.createElement("div");
      burst.className = "burst";
      burst.style.left = `${r.left + r.width / 2}px`;
      burst.style.top = `${r.top + r.height / 2}px`;
      burst.style.setProperty("--size", `${r.width}px`);
      const film = document.createElement("i");
      film.className = "film";
      const ring = document.createElement("i");
      ring.className = "ring";
      burst.append(film, ring);
      const nDrops = Math.max(8, Math.round(r.width / 12));
      for (let i = 0; i < nDrops; i++) {
        const d = document.createElement("i");
        d.className = "drop";
        const ang = (i / nDrops) * Math.PI * 2 + Math.random() * 0.6;
        const dist = r.width * 0.7 + Math.random() * r.width * 0.6;
        d.style.setProperty("--dx", `${Math.cos(ang) * dist}px`);
        d.style.setProperty("--dy", `${Math.sin(ang) * dist}px`);
        d.style.setProperty("--dur", `${420 + Math.random() * 320}ms`);
        const s = 3 + Math.random() * 7;
        d.style.width = d.style.height = `${s}px`;
        burst.appendChild(d);
      }
      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 900);

      // bula dispare, apoi respawnează de jos după o pauză
      bubble.style.visibility = "hidden";
      respawnTimeouts.push(
        setTimeout(() => {
          bubble.style.animation = "none";
          void bubble.offsetWidth; // forțează reflow ca animația să repornească
          bubble.style.animation = "";
          bubble.style.animationDelay = "0s";
          bubble.style.visibility = "";
          delete bubble.dataset.popped;
        }, 1800 + Math.random() * 2200)
      );
    };

    // bulele stau vizual sub conținut, așa că nu ne bazăm pe click direct:
    // la orice click liber verificăm dacă punctul cade în cercul unei bule
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest("button, a, input, textarea, select, label")) {
        return;
      }
      const layer = layerRef.current;
      if (!layer) return;
      for (const bubble of layer.querySelectorAll<HTMLElement>(".loom-bubble")) {
        if (bubble.dataset.popped) continue;
        const rc = bubble.getBoundingClientRect();
        const dx = e.clientX - (rc.left + rc.width / 2);
        const dy = e.clientY - (rc.top + rc.height / 2);
        if (Math.hypot(dx, dy) <= rc.width / 2 + 6) {
          pop(bubble);
          break;
        }
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      respawnTimeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <div
        ref={layerRef}
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <Blobs />
        {Array.from({ length: BUBBLE_COUNT }, (_, i) => (
          <div key={i} className={`loom-bubble bubble-${i + 1}`} />
        ))}
      </div>
      {showNote && (
        <div className="sticky-note" aria-hidden>
          pretty girls love research ☕
        </div>
      )}
    </>
  );
}

/* ————— Broderie: buchete satin-stitch + trusa de cusut ————— */

const NS = "http://www.w3.org/2000/svg";
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

function shade(hex: string, f: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, Math.round(((n >> 16) & 255) * f)));
  const g = Math.min(255, Math.max(0, Math.round(((n >> 8) & 255) * f)));
  const b = Math.min(255, Math.max(0, Math.round((n & 255) * f)));
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
}

function strand(
  g: SVGGElement,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  w: number,
  withShadow = true
) {
  const mx = (x1 + x2) / 2 + rnd(-1, 1);
  const my = (y1 + y2) / 2 + rnd(-1, 1);
  if (withShadow) {
    const s = document.createElementNS(NS, "path");
    s.setAttribute("d", `M${x1 + 0.7} ${y1 + 1} Q${mx + 0.7} ${my + 1} ${x2 + 0.7} ${y2 + 1}`);
    s.setAttribute("stroke", "rgba(30,25,20,.28)");
    s.setAttribute("stroke-width", String(w));
    s.setAttribute("fill", "none");
    s.setAttribute("stroke-linecap", "round");
    g.appendChild(s);
  }
  const p = document.createElementNS(NS, "path");
  p.setAttribute("d", `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`);
  p.setAttribute("stroke", color);
  p.setAttribute("stroke-width", String(w));
  p.setAttribute("fill", "none");
  p.setAttribute("stroke-linecap", "round");
  g.appendChild(p);
}

function petal(
  g: SVGGElement,
  cx: number,
  cy: number,
  ang: number,
  len: number,
  wid: number,
  color: string
) {
  const n = Math.max(4, Math.round(wid / 1.6));
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0 : i / (n - 1) - 0.5;
    const a = ang + t * (wid / len) * 1.1;
    const r0 = len * 0.22;
    const r1 = len * (0.94 + rnd(-0.06, 0.06)) * (1 - Math.abs(t) * 0.25);
    const c = shade(color, 0.9 + rnd(0, 0.25) - Math.abs(t) * 0.12);
    strand(
      g,
      cx + Math.cos(a) * r0,
      cy + Math.sin(a) * r0,
      cx + Math.cos(a) * r1,
      cy + Math.sin(a) * r1,
      c,
      rnd(1.9, 2.5)
    );
  }
}

function knots(g: SVGGElement, cx: number, cy: number, R: number, n: number, color: string) {
  for (let i = 0; i < n; i++) {
    const a = rnd(0, Math.PI * 2);
    const r = Math.sqrt(Math.random()) * R;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    const kr = rnd(1.7, 2.7);
    const sh = document.createElementNS(NS, "circle");
    sh.setAttribute("cx", String(x + 0.6));
    sh.setAttribute("cy", String(y + 0.9));
    sh.setAttribute("r", String(kr));
    sh.setAttribute("fill", "rgba(30,25,20,.3)");
    g.appendChild(sh);
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", String(x));
    c.setAttribute("cy", String(y));
    c.setAttribute("r", String(kr));
    c.setAttribute("fill", shade(color, 0.85 + rnd(0, 0.35)));
    g.appendChild(c);
    const hi = document.createElementNS(NS, "circle");
    hi.setAttribute("cx", String(x - kr * 0.3));
    hi.setAttribute("cy", String(y - kr * 0.35));
    hi.setAttribute("r", String(kr * 0.35));
    hi.setAttribute("fill", "rgba(255,255,255,.35)");
    g.appendChild(hi);
  }
}

function daisy(
  g: SVGGElement,
  cx: number,
  cy: number,
  nP: number,
  len: number,
  color: string,
  centerColor: string,
  centerR: number
) {
  for (let i = 0; i < nP; i++) {
    petal(g, cx, cy, (i / nP) * Math.PI * 2 + rnd(-0.06, 0.06), len * rnd(0.9, 1.08), len * 0.42, color);
  }
  knots(g, cx, cy, centerR, Math.round((centerR * centerR) / 2.2), centerColor);
}

function sunflower(g: SVGGElement, cx: number, cy: number, len: number) {
  for (let i = 0; i < 18; i++) {
    petal(g, cx, cy, (i / 18) * Math.PI * 2 + rnd(-0.04, 0.04), len * rnd(0.92, 1.1), len * 0.34, "#e9a800");
  }
  for (let i = 0; i < 14; i++) {
    petal(g, cx, cy, (i / 14) * Math.PI * 2 + 0.22 + rnd(-0.04, 0.04), len * rnd(0.62, 0.72), len * 0.3, "#f7c52d");
  }
  knots(g, cx, cy, len * 0.34, Math.round((len * len * 0.115) / 2), "#5a3a1f");
}

function leaf(g: SVGGElement, x: number, y: number, ang: number, len: number, color: string) {
  strand(g, x, y, x + Math.cos(ang) * len, y + Math.sin(ang) * len, shade(color, 0.7), 2.2);
  const n = Math.round(len / 4.2);
  for (let i = 1; i < n; i++) {
    const t = i / n;
    const bx = x + Math.cos(ang) * len * t;
    const by = y + Math.sin(ang) * len * t;
    const ll = (1 - Math.abs(t - 0.45) * 1.6) * len * 0.3;
    for (const s of [-1, 1]) {
      const a2 = ang + s * 1.05;
      strand(g, bx, by, bx + Math.cos(a2) * ll, by + Math.sin(a2) * ll, shade(color, 0.85 + rnd(0, 0.3)), rnd(1.8, 2.3), false);
    }
  }
}

function bouquet(w: number, h: number, scale: number, rot: number): SVGSVGElement {
  const svg = document.createElementNS(NS, "svg") as SVGSVGElement;
  svg.setAttribute("width", String(w));
  svg.setAttribute("height", String(h));
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.classList.add("loom-bq");
  const g = document.createElementNS(NS, "g") as SVGGElement;
  g.setAttribute("transform", `rotate(${rot} ${w / 2} ${h / 2}) scale(${scale})`);
  svg.appendChild(g);
  const cx = w / (2 * scale);
  const cy = h / (2 * scale);
  leaf(g, cx - 30, cy + 20, -2.4, 52, "#4c7a43");
  leaf(g, cx + 38, cy + 26, -0.7, 48, "#5a8b4c");
  leaf(g, cx - 52, cy - 8, 2.8, 40, "#3f6d38");
  sunflower(g, cx + 26, cy - 18, 34);
  daisy(g, cx - 32, cy - 30, 12, 24, "#f4f1e8", "#e9a800", 6);
  daisy(g, cx - 48, cy + 18, 11, 19, "#aebfe4", "#e9a800", 5);
  daisy(g, cx + 8, cy + 34, 12, 20, "#f4f1e8", "#e9a800", 5);
  daisy(g, cx + 58, cy + 12, 10, 15, "#e8798a", "#f2b705", 4);
  knots(g, cx - 8, cy + 6, 9, 26, "#f2b705");
  knots(g, cx + 52, cy - 42, 8, 18, "#e8798a");
  return svg;
}

/* trusa de cusut: ață șerpuită cu ac, nasturi, foarfeci, mosorele,
   inimioare cross-stitch — totul cusut fir cu fir */

type Pt = { x: number; y: number };

function svgCircle(g: SVGGElement, x: number, y: number, r: number, fill: string) {
  const c = document.createElementNS(NS, "circle");
  c.setAttribute("cx", String(x));
  c.setAttribute("cy", String(y));
  c.setAttribute("r", String(r));
  c.setAttribute("fill", fill);
  g.appendChild(c);
  return c;
}

function svgRing(g: SVGGElement, x: number, y: number, r: number, color: string, w: number) {
  const c = svgCircle(g, x, y, r, "none");
  c.setAttribute("stroke", color);
  c.setAttribute("stroke-width", String(w));
  return c;
}

function svgRect(g: SVGGElement, x: number, y: number, w: number, h: number, fill: string) {
  const r = document.createElementNS(NS, "rect");
  r.setAttribute("x", String(x));
  r.setAttribute("y", String(y));
  r.setAttribute("width", String(w));
  r.setAttribute("height", String(h));
  r.setAttribute("rx", "2");
  r.setAttribute("fill", fill);
  g.appendChild(r);
  return r;
}

function bezier(p0: Pt, p1: Pt, p2: Pt, p3: Pt, n: number): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    pts.push({
      x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
      y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
    });
  }
  return pts;
}

// împunsături cu spații (punctul dinaintea acului)
function runningStitch(g: SVGGElement, pts: Pt[], color: string, w: number) {
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    strand(g, a.x, a.y, a.x + (b.x - a.x) * 0.55, a.y + (b.y - a.y) * 0.55, color, w);
  }
}

function stitchPath(g: SVGGElement, pts: Pt[], color: string, w: number) {
  for (let i = 0; i < pts.length - 1; i++) {
    strand(g, pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y, color, w);
  }
}

function needle(g: SVGGElement, p: Pt, ang: number) {
  const ex = p.x + Math.cos(ang) * 52;
  const ey = p.y + Math.sin(ang) * 52;
  strand(g, p.x, p.y, ex, ey, "#b9bec8", 3.2);
  strand(g, p.x, p.y, ex, ey, "#eef0f4", 1.3, false);
  svgRing(g, p.x - Math.cos(ang) * 4, p.y - Math.sin(ang) * 4, 2.6, "#8a8f99", 1.6);
}

function sewButton(g: SVGGElement, cx: number, cy: number, r: number, color: string, thread: string) {
  svgCircle(g, cx + 1.2, cy + 1.8, r, "rgba(30,25,20,.28)");
  svgCircle(g, cx, cy, r, shade(color, 0.78));
  svgCircle(g, cx, cy, r * 0.9, color);
  svgCircle(g, cx, cy, r * 0.6, shade(color, 0.93));
  const hp = r * 0.22;
  for (const [dx, dy] of [[-hp, -hp], [hp, -hp], [-hp, hp], [hp, hp]]) {
    svgCircle(g, cx + dx, cy + dy, r * 0.09, "rgba(30,25,20,.5)");
  }
  strand(g, cx - hp, cy - hp, cx + hp, cy + hp, thread, r * 0.18);
  strand(g, cx + hp, cy - hp, cx - hp, cy + hp, thread, r * 0.18);
}

function scissors(g: SVGGElement, x: number, y: number, ang: number, sc = 1) {
  for (const s of [-1, 1]) {
    const a = ang + s * 0.22;
    const tx = x + Math.cos(a) * 42 * sc;
    const ty = y + Math.sin(a) * 42 * sc;
    strand(g, x, y, tx, ty, "#b9bec8", 3.4 * sc);
    strand(g, x, y, tx, ty, "#eef0f4", 1.3 * sc, false);
    svgRing(g, x - Math.cos(a) * 15 * sc, y - Math.sin(a) * 15 * sc, 7 * sc, "#b8452f", 3 * sc);
  }
  knots(g, x, y, 2 * sc, 3, "#8a8f99");
}

function spool(g: SVGGElement, x: number, y: number, color: string) {
  svgRect(g, x - 15, y - 21, 30, 6, "#c9a06a");
  svgRect(g, x - 15, y + 15, 30, 6, "#c9a06a");
  for (let i = 0; i < 9; i++) {
    const yy = y - 12 + i * 3.1;
    strand(g, x - 12, yy, x + 12, yy + rnd(-0.7, 0.7), shade(color, 0.85 + rnd(0, 0.3)), 2.8, false);
  }
  stitchPath(
    g,
    bezier({ x: x + 12, y: y + 8 }, { x: x + 34, y: y + 16 }, { x: x + 22, y: y + 34 }, { x: x + 46, y: y + 40 }, 8),
    color,
    2
  );
}

function heart(g: SVGGElement, cx: number, cy: number, s: number, color: string) {
  const map = [
    [0, 0], [1, 0], [3, 0], [4, 0],
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1],
    [1, 2], [2, 2], [3, 2],
    [2, 3],
  ];
  for (const [gx, gy] of map) {
    const x = cx + (gx - 2) * s;
    const y = cy + (gy - 1.5) * s;
    strand(g, x - s * 0.32, y - s * 0.32, x + s * 0.32, y + s * 0.32, color, s * 0.2, false);
    strand(g, x + s * 0.32, y - s * 0.32, x - s * 0.32, y + s * 0.32, color, s * 0.2, false);
  }
}

function buildSewingKit(layer: HTMLElement) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  // Pe desktop sidebar-ul (w-56 = 224px) acoperă marginea stângă a
  // decorului fix — remapăm axa X pe zona de conținut, ca florile și
  // trusa să nu moară sub meniu. Pe mobil sidebar-ul nu e fix, L = 0.
  const L = window.matchMedia("(min-width: 768px)").matches ? 224 : 0;
  const X = (f: number) => L + f * (W - L);
  const decorSvg = document.createElementNS(NS, "svg") as SVGSVGElement;
  decorSvg.setAttribute("width", String(W));
  decorSvg.setAttribute("height", String(H));
  decorSvg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  decorSvg.classList.add("loom-bq");
  decorSvg.style.left = "0";
  decorSvg.style.top = "0";
  layer.appendChild(decorSvg);
  const dg = document.createElementNS(NS, "g") as SVGGElement;
  decorSvg.appendChild(dg);

  // ața care șerpuiește prin pagină, cu acul la capăt
  const threadPts = [
    ...bezier({ x: L + 34, y: 96 }, { x: L + 150, y: H * 0.28 }, { x: L + 40, y: H * 0.44 }, { x: L + 120, y: H * 0.6 }, 24),
    ...bezier({ x: L + 120, y: H * 0.6 }, { x: L + 190, y: H * 0.78 }, { x: X(0.42), y: H * 0.96 }, { x: X(0.78), y: H * 0.87 }, 30),
  ];
  const tg = document.createElementNS(NS, "g") as SVGGElement;
  tg.setAttribute("opacity", ".5");
  dg.appendChild(tg);
  runningStitch(tg, threadPts, "#b8452f", 2.1);
  const tip = threadPts[threadPts.length - 1];
  const prev = threadPts[threadPts.length - 4];
  needle(tg, tip, Math.atan2(tip.y - prev.y, tip.x - prev.x));
  // nasturii cusuți
  sewButton(dg, X(0.05), H * 0.53, 13, "#8fb3e8", "#f2b705");
  sewButton(dg, X(0.955), H * 0.27, 10, "#b8452f", "#f4f1e8");
  sewButton(dg, X(0.9), H * 0.75, 15, "#f2b705", "#b8452f");
  sewButton(dg, X(0.035), H * 0.3, 9, "#5a8b4c", "#f4f1e8");
  // foarfecile și mosorelul
  scissors(dg, X(0.925), H * 0.115, 2.45);
  scissors(dg, X(0.045), H * 0.42, 0.8, 0.85);
  scissors(dg, X(0.95), H * 0.47, 3.9, 0.9);
  scissors(dg, X(0.68), H * 0.955, 5.5, 0.75);
  spool(dg, X(0.07), H * 0.66, "#b8452f");
  // al doilea fir, verde, coboară șerpuit pe marginea dreaptă
  const rightPts = [
    ...bezier({ x: W - 34, y: 110 }, { x: W - 150, y: H * 0.3 }, { x: W - 38, y: H * 0.52 }, { x: W - 120, y: H * 0.72 }, 26),
    ...bezier({ x: W - 120, y: H * 0.72 }, { x: W - 170, y: H * 0.84 }, { x: W - 60, y: H * 0.9 }, { x: W - 96, y: H * 0.97 }, 14),
  ];
  const rg = document.createElementNS(NS, "g") as SVGGElement;
  rg.setAttribute("opacity", ".5");
  dg.appendChild(rg);
  runningStitch(rg, rightPts, "#4c7a43", 2);
  // mosorel albastru + nasture + noduri franțuzești pe dreapta
  spool(dg, X(0.952), H * 0.845, "#8fb3e8");
  sewButton(dg, X(0.97), H * 0.6, 11, "#4c7a43", "#f4f1e8");
  knots(dg, X(0.935), H * 0.55, 9, 22, "#f2b705");
  heart(dg, X(0.915), H * 0.35, 6, "#d9a5b5");
  // inimioare cross-stitch pale
  heart(dg, X(0.24), H * 0.045, 7, "#dba393");
  heart(dg, X(0.76), H * 0.05, 6, "#dba393");
  heart(dg, X(0.975), H * 0.5, 6, "#d9a5b5");
  heart(dg, X(0.55), H * 0.955, 7, "#dba393");
  heart(dg, X(0.015), H * 0.72, 5, "#d9a5b5");
  // flori răzlețe, scăpate din buchete — umplu golurile dintre petice
  daisy(dg, X(0.18), H * 0.87, 11, 18, "#f4f1e8", "#e9a800", 5);
  daisy(dg, X(0.86), H * 0.13, 10, 16, "#aebfe4", "#f2b705", 5);
  daisy(dg, X(0.5), H * 0.06, 9, 14, "#e8798a", "#f2b705", 4);
  daisy(dg, X(0.03), H * 0.185, 10, 15, "#f4f1e8", "#e9a800", 5);
  daisy(dg, X(0.965), H * 0.925, 9, 14, "#aebfe4", "#e9a800", 4);
  sunflower(dg, X(0.33), H * 0.945, 26);
  leaf(dg, X(0.31), H * 0.975, -2.1, 34, "#4c7a43");
  leaf(dg, X(0.2), H * 0.9, 0.6, 28, "#5a8b4c");
  leaf(dg, X(0.875), H * 0.165, 2.4, 26, "#3f6d38");
  // mărunțișuri de trusă în plus
  sewButton(dg, X(0.42), H * 0.035, 8, "#e8798a", "#f4f1e8");
  sewButton(dg, X(0.6), H * 0.965, 9, "#8fb3e8", "#b8452f");
  spool(dg, X(0.545), H * 0.05, "#5a8b4c");
  knots(dg, X(0.115), H * 0.115, 8, 16, "#c04a32");
  knots(dg, X(0.885), H * 0.885, 8, 18, "#5a8b4c");
  heart(dg, X(0.35), H * 0.05, 5, "#d9a5b5");
  heart(dg, X(0.655), H * 0.04, 6, "#dba393");
  heart(dg, X(0.08), H * 0.955, 6, "#d9a5b5");
}

const BOUQUET_SPECS = [
  { css: { top: "110px", left: "2.5%" }, w: 300, h: 300, s: 1.25, r: -8 },
  { css: { top: "46%", right: "2%" }, w: 240, h: 240, s: 1.0, r: 14 },
  { css: { bottom: "6%", left: "6%" }, w: 210, h: 210, s: 0.85, r: 5 },
  { css: { top: "12%", right: "16%" }, w: 150, h: 150, s: 0.6, r: -16 },
  { css: { top: "30%", left: "36%" }, w: 190, h: 190, s: 0.75, r: 10 },
  { css: { bottom: "16%", right: "23%" }, w: 200, h: 200, s: 0.8, r: -12 },
  { css: { top: "66%", left: "24%" }, w: 160, h: 160, s: 0.6, r: 20 },
  { css: { bottom: "2%", right: "42%" }, w: 170, h: 170, s: 0.65, r: -5 },
  { css: { top: "5%", left: "47%" }, w: 140, h: 140, s: 0.5, r: 8 },
] as const;

/* motivele care se pot coase la click — vocabularul vizual al buchetelor */
const SEW_DAISIES = [
  { petal: "#f4f1e8", center: "#e9a800" },
  { petal: "#aebfe4", center: "#f2b705" },
  { petal: "#e8798a", center: "#f2b705" },
] as const;
const SEW_KNOT_COLORS = ["#f2b705", "#b8452f", "#5a8b4c", "#8fb3e8"] as const;

/** Coase în punctul dat, fir cu fir, un mic motiv aleator: elementele SVG
    apar în ordinea împunsăturilor, ca și cum acul chiar ar lucra. */
function sewAt(
  layer: HTMLElement,
  x: number,
  y: number,
  later: (fn: () => void, ms: number) => void
) {
  const S = 150;
  const svg = document.createElementNS(NS, "svg") as SVGSVGElement;
  svg.setAttribute("width", String(S));
  svg.setAttribute("height", String(S));
  svg.setAttribute("viewBox", `0 0 ${S} ${S}`);
  svg.classList.add("loom-bq", "loom-sew");
  svg.style.left = `${Math.round(x - S / 2)}px`;
  svg.style.top = `${Math.round(y - S / 2)}px`;
  const g = document.createElementNS(NS, "g") as SVGGElement;
  g.setAttribute("transform", `rotate(${rnd(-14, 14).toFixed(1)} ${S / 2} ${S / 2})`);
  svg.appendChild(g);

  const c = S / 2;
  const kind = Math.random();
  if (kind < 0.34) {
    const d = SEW_DAISIES[(Math.random() * SEW_DAISIES.length) | 0];
    daisy(g, c, c, 9 + ((Math.random() * 4) | 0), rnd(15, 22), d.petal, d.center, rnd(4, 6));
  } else if (kind < 0.52) {
    sunflower(g, c, c, rnd(20, 27));
  } else if (kind < 0.76) {
    heart(g, c, c, rnd(5, 7), Math.random() < 0.5 ? "#d9a5b5" : "#dba393");
  } else {
    const col = SEW_KNOT_COLORS[(Math.random() * SEW_KNOT_COLORS.length) | 0];
    knots(g, c, c, rnd(7, 10), 18 + ((Math.random() * 10) | 0), col);
    leaf(g, c + rnd(8, 14), c + rnd(6, 12), rnd(0.3, 1.2), rnd(20, 28), "#4c7a43");
  }

  const parts = Array.from(g.children) as SVGElement[];
  for (const el of parts) el.style.visibility = "hidden";
  layer.appendChild(svg);
  const step = Math.max(8, Math.min(22, 900 / parts.length));
  parts.forEach((el, i) => later(() => (el.style.visibility = ""), i * step));
  try {
    stitchPull();
    later(() => {
      try {
        stitchPull();
      } catch {
        // fără audio
      }
    }, (parts.length * step) / 2);
  } catch {
    // fără audio
  }

  // pânza nu se aglomerează: peste 14 motive cusute, cel mai vechi se
  // destramă (fade prin .loom-sew, apoi iese din DOM)
  const sewn = layer.querySelectorAll<SVGElement>(".loom-sew");
  if (sewn.length > 14) {
    const old = sewn[0];
    old.style.opacity = "0";
    later(() => old.remove(), 950);
  }
}

function BroderieDecor() {
  const layerRef = useRef<HTMLDivElement>(null);

  // acul se scoate din trusă cu dublu-click; cât e afară, cusutul la un
  // click e suspendat (ref-ul ține starea la zi pentru listenerul stabil)
  const [needleOn, setNeedleOn] = useState(false);
  const needleOnRef = useRef(false);
  useEffect(() => {
    needleOnRef.current = needleOn;
  }, [needleOn]);

  // acul urmărește leneș cursorul, trăgând după el un fir și lăsând un
  // running stitch care se destramă după câteva secunde — pagina devine
  // pânza pe care coși în timp ce navighezi. Doar cu pointer fin: pe
  // touch nu există cursor de urmărit.
  useEffect(() => {
    if (!needleOn) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const layer = layerRef.current;
    if (!layer) return;
    try {
      stitchPull(); // acul iese din trusă cu un mic fâșâit de fir
    } catch {
      // fără audio
    }

    // stratul urmei: fără viewBox, ca unitățile SVG să fie px de viewport
    const trail = document.createElementNS(NS, "svg") as SVGSVGElement;
    trail.classList.add("loom-bq");
    Object.assign(trail.style, { left: "0", top: "0", width: "100%", height: "100%" });
    layer.appendChild(trail);
    const dashes = document.createElementNS(NS, "g") as SVGGElement;
    trail.appendChild(dashes);
    const threadEl = document.createElementNS(NS, "path");
    threadEl.setAttribute("stroke", "#b8452f");
    threadEl.setAttribute("stroke-width", "1.8");
    threadEl.setAttribute("fill", "none");
    threadEl.setAttribute("stroke-linecap", "round");
    threadEl.setAttribute("opacity", "0.55");
    trail.appendChild(threadEl);

    // acul: desenat o dată culcat (vârful la 70,18), apoi doar transformat
    const needleSvg = document.createElementNS(NS, "svg") as SVGSVGElement;
    needleSvg.setAttribute("width", "90");
    needleSvg.setAttribute("height", "36");
    needleSvg.setAttribute("viewBox", "0 0 90 36");
    needleSvg.classList.add("loom-bq");
    Object.assign(needleSvg.style, {
      left: "0",
      top: "0",
      transformOrigin: "70px 18px",
      willChange: "transform",
      visibility: "hidden",
    });
    const ng = document.createElementNS(NS, "g") as SVGGElement;
    needleSvg.appendChild(ng);
    needle(ng, { x: 18, y: 18 }, 0);
    layer.appendChild(needleSvg);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let last = { ...pos }; // ultima împunsătură
    let ang = 0;
    let seen = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!seen) {
        // acul apare direct sub cursor, nu vine în fugă din centru
        seen = true;
        pos.x = target.x;
        pos.y = target.y;
        last = { x: target.x, y: target.y };
        needleSvg.style.visibility = "";
      }
    };

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!seen) return;
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      pos.x += dx * 0.11;
      pos.y += dy * 0.11;
      if (Math.hypot(dx, dy) > 2) {
        // unghiul se rotește pe drumul scurt, fără salturi la ±π
        let diff = Math.atan2(dy, dx) - ang;
        while (diff > Math.PI) diff -= 2 * Math.PI;
        while (diff < -Math.PI) diff += 2 * Math.PI;
        ang += diff * 0.18;
      }
      needleSvg.style.transform = `translate(${pos.x - 70}px, ${pos.y - 18}px) rotate(${ang}rad)`;
      // împunsătura: la fiecare ~30px o liniuță de 55% din pas, cu golul
      // dinaintea acului — același ritm ca runningStitch()
      if (Math.hypot(pos.x - last.x, pos.y - last.y) > 30) {
        const g = document.createElementNS(NS, "g") as SVGGElement;
        g.setAttribute("class", "sew-dash");
        strand(
          g,
          last.x,
          last.y,
          last.x + (pos.x - last.x) * 0.55,
          last.y + (pos.y - last.y) * 0.55,
          "#b8452f",
          2
        );
        dashes.appendChild(g);
        last = { x: pos.x, y: pos.y };
        timeouts.push(setTimeout(() => (g.style.opacity = "0"), 3200));
        timeouts.push(setTimeout(() => g.remove(), 4500));
        while (dashes.childElementCount > 90) dashes.firstElementChild?.remove();
      }
      // firul moale dintre urechea acului (vârf − 56·dir) și ultima împunsătură
      const ex = pos.x - Math.cos(ang) * 56;
      const ey = pos.y - Math.sin(ang) * 56;
      const mx = (ex + last.x) / 2;
      const my = (ey + last.y) / 2 + 14;
      threadEl.setAttribute("d", `M${last.x} ${last.y} Q${mx} ${my} ${ex} ${ey}`);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      timeouts.forEach(clearTimeout);
      trail.remove();
      needleSvg.remove();
    };
  }, [needleOn]);

  // pânza liberă ascultă pe număr de clickuri: UN click coase un motiv —
  // amânat o idee, ca să nu „fure" primul click al unui dublu-click —,
  // DUBLU-click scoate/pune la loc acul (cât e acul afară nu se coase la
  // un click), iar TRIPLU-click destramă tot ce ai cusut tu, cu ac cu
  // tot; rămâne doar broderia default a temei.
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const cancelled = { current: false };
    const later = (fn: () => void, ms: number) => {
      timeouts.push(
        setTimeout(() => {
          if (!cancelled.current) fn();
        }, ms)
      );
    };
    let pending: ReturnType<typeof setTimeout> | null = null;
    const onClick = (e: MouseEvent) => {
      if (
        e.target instanceof Element &&
        e.target.closest("button, a, input, textarea, select, label, nav, aside")
      ) {
        return;
      }
      // fiecare click în plus anulează acțiunea programată de precedentul
      if (pending) {
        clearTimeout(pending);
        pending = null;
      }
      if (e.detail === 1) {
        if (needleOnRef.current) return;
        const { clientX, clientY } = e;
        pending = setTimeout(() => {
          if (!cancelled.current) sewAt(layer, clientX, clientY, later);
        }, 280);
        timeouts.push(pending);
      } else if (e.detail === 2) {
        pending = setTimeout(() => {
          if (!cancelled.current) setNeedleOn((v) => !v);
        }, 280);
        timeouts.push(pending);
      } else {
        setNeedleOn(false);
        for (const el of layer.querySelectorAll<SVGElement>(".loom-sew")) {
          el.style.opacity = "0";
          later(() => el.remove(), 950);
        }
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelled.current = true;
      document.removeEventListener("click", onClick);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Buchetele și trusa sunt cusute imperativ (sute de fire cu jitter),
  // așa că se generează după mount într-un container fără copii React.
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    // procentele `left` se remapează pe zona de conținut (după sidebar-ul
    // fix de pe desktop), altfel buchetele din stânga mor sub meniu
    const W = window.innerWidth;
    const L = window.matchMedia("(min-width: 768px)").matches ? 224 : 0;
    for (const sp of BOUQUET_SPECS) {
      const b = bouquet(sp.w, sp.h, sp.s, sp.r);
      const css: Record<string, string> = { ...sp.css };
      if (css.left) {
        css.left = `${Math.round(L + (parseFloat(css.left) / 100) * (W - L))}px`;
      }
      Object.assign(b.style, css);
      layer.appendChild(b);
    }
    buildSewingKit(layer);
    return () => {
      layer.querySelectorAll(".loom-bq").forEach((el) => el.remove());
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div ref={layerRef} className="absolute inset-0" />
      <div className="bq-alpha">
        ABCDEFGHIJ
        <br />
        KLMNOPQRST
        <br />
        UVWXYZ 0123
        <br />
        ĂÂÎȘȚ ✕✕✕
      </div>
    </div>
  );
}

/* ————— Bon fiscal: bonuri vechi pe tejghea ————— */

function BonDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="old-bon ob1" />
      <div className="old-bon ob2" />
      <div className="old-bon ob3" />
    </div>
  );
}

