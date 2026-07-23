"use client";

import { useEffect, useRef } from "react";

/** Hero-ul de pe Home, portat din mockups/teme.html: același markup pe toate
    temele, iar CSS-ul din globals.css îl „îmbracă" per temă — fereastră retro
    loom.exe (Retro Nostalgia), placă frezată cu șuruburi (Metal),
    petic de pânză aida (Broderie), bonul propriu-zis
    cu ștampilă/rânduri de casă/cod de bare (Bon fiscal), tablou de plecări
    (Split-flap). Elementele de chrome sunt mereu în DOM, ascunse implicit. */
export function HomeHero({ children }: { children?: React.ReactNode }) {
  // nr. de bon + data se completează după mount, direct în DOM (elementul e
  // decorativ, aria-hidden) — serverul nu are ora clientului la hidratare
  const bonMetaRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const nr = String(1000 + Math.floor(Math.random() * 9000));
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, "0");
    if (bonMetaRef.current) {
      bonMetaRef.current.textContent = `BON NR. ${nr} · ${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} · ${p(d.getHours())}:${p(d.getMinutes())}`;
    }
  }, []);

  return (
    <>
      <div className="loom-slot" aria-hidden />
      <section className="loom-hero">
        <div className="loom-win" aria-hidden>
          loom.exe
          <span className="win-btns">
            <i>_</i>
            <i>□</i>
            <i>✕</i>
          </span>
        </div>
        <div className="loom-screws" aria-hidden>
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="loom-stamp" aria-hidden>
          PLĂTIT
        </div>
        <div className="loom-bon-head" aria-hidden>
          *** LOOM SRL · CUI RO123456 · STUDII &amp; CAFEA ***
          <br />
          <span ref={bonMetaRef}>BON NR. ---- · --.--.---- · --:--</span>
        </div>

        <span className="loom-eyebrow">
          ✦ ghiduri și chestionare din indicatori standard
        </span>
        <h1>
          Ghidul e gata{" "}
          <span className="loom-grad">înainte să se răcească cafeaua</span>
        </h1>
        <p>
          Alegi întrebările din catalogul standard de indicatori, iar loom le
          așează în ghid de interviu sau chestionar — cu timing, verificări de
          calitate și export direct în Word.
        </p>
        <div className="loom-row">{children}</div>

        <div className="loom-bon-rows" aria-hidden>
          <div className="br">
            <span>GHID INTERVIU</span>
            <i className="dots" />
            <span>12,00</span>
          </div>
          <div className="br">
            <span>CHESTIONAR STANDARD</span>
            <i className="dots" />
            <span>9,45</span>
          </div>
          <div className="br">
            <span>MAPARE INDICATORI</span>
            <i className="dots" />
            <span>23,55</span>
          </div>
          <div className="br sub">
            <span>SUBTOTAL</span>
            <i className="dots" />
            <span>45,00</span>
          </div>
          <div className="br sub">
            <span>TVA 19%</span>
            <i className="dots" />
            <span>8,55</span>
          </div>
          <div className="br total">
            <span>TOTAL</span>
            <i className="dots" />
            <span>53,55</span>
          </div>
        </div>
        <div className="loom-bon-code" aria-hidden>
          <div className="bc">
            <div className="bars" />
            <div className="num">5 941234 567890</div>
          </div>
          <svg
            className="qr"
            width={52}
            height={52}
            viewBox="0 0 21 21"
            shapeRendering="crispEdges"
            aria-hidden
          >
            <rect width={21} height={21} fill="#fdfcf7" />
            <g fill="#24211a">
              <path d="M0 0h7v7h-7z M2 2h3v3h-3z" fillRule="evenodd" />
              <path d="M14 0h7v7h-7z M16 2h3v3h-3z" fillRule="evenodd" />
              <path d="M0 14h7v7h-7z M2 16h3v3h-3z" fillRule="evenodd" />
              <rect x={9} y={1} width={1} height={1} />
              <rect x={11} y={2} width={1} height={1} />
              <rect x={9} y={4} width={2} height={1} />
              <rect x={12} y={5} width={1} height={1} />
              <rect x={1} y={9} width={2} height={1} />
              <rect x={4} y={10} width={1} height={2} />
              <rect x={6} y={9} width={1} height={1} />
              <rect x={8} y={8} width={2} height={2} />
              <rect x={11} y={9} width={1} height={1} />
              <rect x={13} y={10} width={2} height={1} />
              <rect x={16} y={9} width={1} height={2} />
              <rect x={18} y={10} width={2} height={1} />
              <rect x={9} y={12} width={1} height={2} />
              <rect x={11} y={13} width={2} height={1} />
              <rect x={14} y={14} width={2} height={2} />
              <rect x={17} y={15} width={1} height={1} />
              <rect x={9} y={15} width={1} height={1} />
              <rect x={10} y={17} width={2} height={1} />
              <rect x={13} y={18} width={1} height={1} />
              <rect x={15} y={17} width={1} height={2} />
              <rect x={18} y={18} width={2} height={1} />
              <rect x={9} y={19} width={1} height={1} />
            </g>
          </svg>
        </div>
      </section>
    </>
  );
}
