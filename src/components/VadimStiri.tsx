"use client";

import { useEffect, useState } from "react";
import { useLoomTheme } from "@/components/ThemeProvider";

/** Articolele ediției: poza dă tonul, citatul dă titlul (regula userului:
    emoția din poză = emoția din citat). */
const STIRI = [
  {
    foto: "/themes/vadim/tribun-furios.jpg",
    glow: "#ff5a7a",
    kicker: "De la tribună · exclusiv",
    titlu: "„Cine ești dumneata să îmi zici mie să o las mai moale?”",
    meta: "Reporterul nostru a scăpat nevătămat · pag. 2",
  },
  {
    foto: "/themes/vadim/tribun-corgi.jpg",
    glow: "#a8e063",
    kicker: "Eveniment · în premieră națională",
    titlu: "„V-o prezint pe Elodia, iubiți compatrioți — să o vadă toată țara!”",
    meta: "Cățelușa, aclamată de întreaga redacție · pag. 5",
  },
  {
    foto: "/themes/vadim/tribun-geniu.jpg",
    /** portret înalt: ancorăm crop-ul pe față, nu pe centru */
    pos: "50% 22%",
    glow: "#5cb2ff",
    kicker: "Cultură · din biblioteca personală",
    titlu: "„Genul meu de geniu apare o dată la un secol, băieți!”",
    meta: "Geniul, surprins în plină meditație · pag. 7",
  },
];

/**
 * „Știrile ediției” — secțiunea de gazetă de pe Home (tema vadim): pozele
 * cu Tribunul devin articole de ziar din anul 3000, cu tilt holografic la
 * hover. Pe celelalte teme nu se randează deloc.
 */
export function VadimStiri() {
  const { theme } = useLoomTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || theme !== "vadim") return null;

  return (
    <section className="vadim-stiri" aria-label="Știrile ediției">
      <p className="vs-cap">Știrile ediției · anul 3000</p>
      <div className="vs-grid">
        {STIRI.map((s, i) => (
          <article
            key={i}
            className="vs-card"
            style={{ "--glow": s.glow } as React.CSSProperties}
          >
            <img
              className="vs-foto"
              src={s.foto}
              alt=""
              style={s.pos ? { objectPosition: s.pos } : undefined}
            />
            {/* doodle-uri care „fierb” peste poze, ca pe manșetă */}
            {i === 0 && (
              <svg
                className="lv-doodle lv-boil"
                style={{ left: 20, top: 20, width: 46, height: 46, color: "#ffd23f", zIndex: 1 }}
                viewBox="0 0 100 100"
                aria-hidden
              >
                <path d="M58 6 L34 48 L52 48 L30 94 L74 40 L54 40 L76 6 Z" />
              </svg>
            )}
            {i === 1 && (
              <svg
                className="lv-doodle contur lv-boil2"
                style={{ right: 20, top: 18, width: 48, height: 48, color: "#ff5ad1", zIndex: 1 }}
                viewBox="0 0 100 100"
                aria-hidden
              >
                <path d="M50 88 C20 66 6 44 18 28 C28 14 46 18 50 32 C54 18 72 14 82 28 C94 44 80 66 50 88 Z" />
              </svg>
            )}
            {i === 2 && (
              <svg
                className="lv-doodle lv-boil3"
                style={{ right: 22, top: 20, width: 42, height: 42, color: "#ffd23f", zIndex: 1 }}
                viewBox="0 0 100 100"
                aria-hidden
              >
                <path d="M50 4 L58 42 L96 50 L58 58 L50 96 L42 58 L4 50 L42 42 Z" />
              </svg>
            )}
            <span
              className="vadim-clipici"
              style={{ left: "12%", top: 40, "--cc": "#f2eee2", "--cdelay": `${i * 1.7 + 0.8}s` } as React.CSSProperties}
            >
              ✦
            </span>
            <span
              className="vadim-clipici"
              style={{ right: "16%", top: 120, "--cc": s.glow, "--cdelay": `${i * 1.7 + 3.1}s`, "--cs": "12px" } as React.CSSProperties}
            >
              ✦
            </span>
            <p className="vs-kicker">{s.kicker}</p>
            <h3 className="vs-titlu">{s.titlu}</h3>
            <p className="vs-meta">{s.meta}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
