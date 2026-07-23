"use client";

import { useEffect, useRef, useState } from "react";
import { bonPrint } from "@/lib/themeAudio";

export type BonLine = {
  label: string;
  value: string;
  /** Rândul de TOTAL: mai mare, bold, cu linie deasupra. */
  grand?: boolean;
};

/** Număr de bon stabil derivat din id-ul documentului (fără Date/random,
    ca să fie identic la fiecare randare). */
export function bonCode(id: string): string {
  let h = 7;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) % 100000000;
  }
  return String(h).padStart(8, "0");
}

export function formatBonDate(timestamp: number): string {
  const d = new Date(timestamp);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

/**
 * Ceremonia de export pe tema „Bon fiscal": o imprimantă fiscală scoate
 * bonul cu rezumatul documentului, apoi utilizatorul îl poate salva
 * (declanșează descărcarea reală) sau renunța. Se randează doar când
 * tema activă e „bon" — părintele face verificarea.
 */
export function BonExportOverlay({
  title,
  lines,
  code,
  saveLabel,
  onSave,
  onClose,
}: {
  title: string;
  lines: BonLine[];
  code: string;
  saveLabel: string;
  onSave: () => void | Promise<void>;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<"printing" | "ready" | "cut">("printing");
  const saveRef = useRef<HTMLButtonElement>(null);
  // Data/ora emiterii — fixată la deschiderea overlay-ului (doar client).
  const [issuedAt] = useState(() => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  });

  useEffect(() => {
    try {
      bonPrint();
    } catch {
      // fără audio (permisiuni/AudioContext indisponibil) — doar vizual
    }
    const t = setTimeout(() => setPhase("ready"), 2300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === "ready") saveRef.current?.focus();
  }, [phase]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSave = async () => {
    if (phase === "cut") return;
    setPhase("cut");
    try {
      await onSave();
    } finally {
      setTimeout(onClose, 700);
    }
  };

  return (
    <div
      className="bon-ovl"
      role="dialog"
      aria-modal="true"
      aria-label="Export ca bon fiscal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bon-ovl-inner">
        <div className="bon-machine" aria-hidden>
          <div className="bm-top">
            <span className="bm-brand">Loom FP-2000 · Fiscal</span>
            <span className={`bm-led${phase !== "printing" ? " ok" : ""}`} />
          </div>
          <div className="bm-slot" />
        </div>

        <div className={`bon-out${phase === "cut" ? " cut" : ""}`}>
          <div className="bon-ticket">
            <p className="bt-head">
              *** LOOM SRL · CUI RO123456 ***
              <br />
              STUDII &amp; CAFEA
            </p>
            <p className="bt-meta">
              BON FISCAL NR. {code.slice(0, 4)} · {issuedAt}
            </p>
            <div className="bt-sep" />
            <p className="bt-title">{title || "Document fără titlu"}</p>
            <div className="bt-sep" />
            {lines.map((line, i) => (
              <div key={i} className={`br${line.grand ? " grand" : ""}`}>
                <span>{line.label}</span>
                <i />
                <span>{line.value}</span>
              </div>
            ))}
            <div className="bt-sep" />
            <div className="bars" />
            <p className="bt-num">{code}</p>
            <p className="bt-thanks">*** VĂ MULȚUMIM! NU SE ACORDĂ REST ***</p>
          </div>
        </div>

        <div className={`bon-ovl-actions${phase === "ready" ? " show" : ""}`}>
          <button type="button" className="bo-cancel" onClick={onClose}>
            Renunță
          </button>
          <button
            type="button"
            ref={saveRef}
            className="bo-save"
            onClick={() => void handleSave()}
          >
            {saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
