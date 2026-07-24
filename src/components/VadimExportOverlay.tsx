"use client";

import { useEffect, useRef } from "react";
import {
  fanfaraAprobare,
  goarnaFanfara,
  tunetCearta,
} from "@/lib/themeAudio";

/** Forma comună a problemelor de lint (guide-lint și survey-lint au
    aceeași structură — aici ne trebuie doar regula și mesajul). */
export type VadimIssue = { rule: string; message: string };

/** Capul de acuzare, pe românește vadimistă — regulile de lint cu
    severitate de eroare din guide-lint + survey-lint. Regulile noi cad
    pe fallback-ul cu id-ul brut, ca să nu rămână cearta fără titlu. */
const CAP_DE_ACUZARE: Record<string, string> = {
  fatigue: "Interviu-maraton · oboseală",
  "loi-fatigue": "Chestionar-maraton · oboseală",
  "loi-over-budget": "Timing depășit",
  "over-budget": "Timing depășit",
  "awareness-priming": "Notorietate suflată · priming",
  "unaided-primed": "Notorietate suflată · priming",
  "tom-not-first": "Top-of-mind pitit în coada listei",
  "funnel-order": "Funnel cu susul în jos",
  "price-anchoring": "Ancoră de preț",
  "recall-after-recognition": "Recall după recognition",
  "sensitive-early": "Subiect sensibil fără încălzire",
  "unfilled-variables": "Variabile de studiu goale",
};

/**
 * Ceremonia de export pe tema „Tribunul 3000": documentul trece pe la
 * Biroul de Export. Fără boacăne, Tribunul aprobă și semnează (fanfară +
 * scântei festive); cu erori de lint, convoacă comisia de disciplină și
 * citește sentința punct cu punct (cutremur + tunet). Se randează doar
 * când tema activă e „vadim" — părintele face verificarea.
 */
export function VadimExportOverlay({
  errors,
  saveLabel,
  onSave,
  onClose,
}: {
  errors: VadimIssue[];
  saveLabel: string;
  onSave: () => void | Promise<void>;
  onClose: () => void;
}) {
  const ok = errors.length === 0;
  const saveRef = useRef<HTMLButtonElement>(null);
  const saving = useRef(false);

  useEffect(() => {
    try {
      if (ok) fanfaraAprobare();
      else tunetCearta();
    } catch {
      // fără audio — ceremonia rămâne vizuală
    }
  }, [ok]);

  // ploaia de scântei festive din jurul dialogului de aprobare
  useEffect(() => {
    if (!ok) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const culori = ["#a8e063", "#ffd23f", "#5cb2ff", "#ff5ad1"];
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < 26; i++) {
      timeouts.push(
        setTimeout(() => {
          const s = document.createElement("span");
          s.className = "vadim-scanteie";
          s.textContent = "✦";
          s.style.left = `${innerWidth * (0.2 + Math.random() * 0.6)}px`;
          s.style.top = `${innerHeight * (0.15 + Math.random() * 0.7)}px`;
          s.style.fontSize = `${12 + Math.random() * 16}px`;
          s.style.color = culori[(Math.random() * culori.length) | 0];
          s.style.textShadow = "0 0 12px currentColor";
          document.body.appendChild(s);
          timeouts.push(setTimeout(() => s.remove(), 720));
        }, i * 45),
      );
    }
    return () => timeouts.forEach(clearTimeout);
  }, [ok]);

  useEffect(() => {
    if (ok) saveRef.current?.focus();
  }, [ok]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSave = async () => {
    if (saving.current) return;
    saving.current = true;
    try {
      goarnaFanfara();
    } catch {
      // fără audio
    }
    try {
      await onSave();
    } finally {
      setTimeout(onClose, 600);
    }
  };

  return (
    <div
      className="vadim-voal"
      role="dialog"
      aria-modal="true"
      aria-label={ok ? "Export aprobat de Tribun" : "Export cu probleme"}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`vadim-dialog ${ok ? "succes" : "eroare"}`}>
        <button
          type="button"
          className="vd-inchide"
          aria-label="Închide"
          onClick={onClose}
        >
          ✕
        </button>

        <figure className="vd-foto" aria-hidden>
          <svg className="lv-doodle lv-boil vd-fulger" viewBox="0 0 100 100">
            <path d="M58 6 L34 48 L52 48 L30 94 L74 40 L54 40 L76 6 Z" />
          </svg>
          <svg className="lv-doodle lv-boil2 vd-stea" viewBox="0 0 100 100">
            <path d="M50 4 L58 42 L96 50 L58 58 L50 96 L42 58 L4 50 L42 42 Z" />
          </svg>
          <span className={`vd-rama ${ok ? "succes" : "eroare"}`} />
          <span className="vd-caption">
            {ok ? (
              <>
                <b>Se semnează personal</b>
                Stiloul de aur iese doar la documentele fără cusur.
              </>
            ) : (
              <>
                <b>Comisia de disciplină</b>
                Ședință extraordinară, convocată de erorile tale.
              </>
            )}
          </span>
        </figure>

        {ok ? (
          <div className="vd-text">
            <h5>SE APROBĂ! LUCRARE DE GENIU!</h5>
            <p>
              „Niciun avertisment, nicio boacănă —{" "}
              <strong>un document cum apare unul la un secol, dragii mei!</strong>{" "}
              Nici Elodia n-a găsit ceva de mușcat, și ea găsește și-n vis.
              Semnez și parafez cu mâna mea: du-l în lume,{" "}
              <strong>să tremure concurența!</strong>”
            </p>
            <div className="vd-rand">
              <button
                type="button"
                ref={saveRef}
                className="vd-btn aur"
                onClick={() => void handleSave()}
              >
                ⬇ {saveLabel}, cu mândrie patriotică
              </button>
              <button type="button" className="vd-btn gol" onClick={onClose}>
                Mai șlefuiesc puțin
              </button>
            </div>
          </div>
        ) : (
          <div className="vd-text">
            <h5>CE MI-AI FĂCUT AICI?!</h5>
            <p>
              Documentul <strong>NU pleacă nicăieri</strong> până nu repari
              ce-ai stricat. Citește sentința, punct cu punct:
            </p>
            <ul className="vd-erori">
              {errors.map((e, i) => (
                <li key={i}>
                  <b>
                    ⚠{" "}
                    {(
                      CAP_DE_ACUZARE[e.rule] ?? e.rule.replace(/-/g, " ")
                    ).toUpperCase()}
                  </b>
                  {e.message}
                </li>
              ))}
            </ul>
            <p>
              „Repară tot și vino înapoi ca un patriot —{" "}
              <strong>altfel te mănânc cu fulgi cu tot, la rubrica de
              erate!</strong>”
            </p>
            <div className="vd-rand">
              <button type="button" className="vd-btn rosu" onClick={onClose}>
                Mă duc să repar, să trăiți!
              </button>
              <button
                type="button"
                className="vd-btn gol"
                onClick={() => void handleSave()}
              >
                Exportă oricum, pe răspunderea mea
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
