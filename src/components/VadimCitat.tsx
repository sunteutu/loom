"use client";

import { useEffect, useRef, useState } from "react";
import { useLoomTheme } from "@/components/ThemeProvider";

/** Doar cele două replici alese de user — restul colecției a fost scos. */
const CITATE = [
  "„Sunt cel mai blând om din lume, tot ce îmi doresc este o cană cu lapte cald dimineața, să deschid fereastra, să-mi cânte păsărelele, să văd un copac înflorit și de cea mai înaltă creangă să se spânzure dușmanii mei.”",
  "„De fapt, ea pare sănătoasă, dar ea are o jumătate de litru de sânge stricat și-n virtutea circulației sângelui, când acea porțiune ajunge la ceea ce ea, într-un moment de optimism, numește creier, o apucă pandaliile, se suie pe garduri, face ca toți dracii, face bau, sperie bătrânii după burlan.”",
];

/**
 * „Citatul zilei · din opera Tribunului” — cardul de pe Home (tema vadim):
 * citatul se schimbă singur la 8s, ca ediția de seară, cu poza gânditorului
 * ca sticker în colț. Pe celelalte teme nu se randează deloc.
 */
export function VadimCitat() {
  const { theme } = useLoomTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [index, setIndex] = useState(0);
  const [vizibil, setVizibil] = useState(true);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activ = mounted && theme === "vadim";

  useEffect(() => {
    if (!activ) return;
    const id = setInterval(() => {
      setVizibil(false);
      fadeTimeout.current = setTimeout(() => {
        setIndex((i) => (i + 1) % CITATE.length);
        setVizibil(true);
      }, 400);
    }, 20000);
    return () => {
      clearInterval(id);
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    };
  }, [activ]);

  if (!activ) return null;

  return (
    <>
      <section className="vadim-citat" aria-label="Citatul zilei">
      <figure className="vc-foto" aria-hidden>
        <svg
          className="lv-doodle contur lv-boil2"
          style={{ left: -20, bottom: -14, width: 44, height: 44, color: "#5cb2ff" }}
          viewBox="0 0 100 100"
        >
          <path d="M10 70 Q30 10 50 50 Q70 90 90 30" />
        </svg>
        <span className="vc-rama">
          <span className="vadim-lumina" />
          <span
            className="vadim-clipici"
            style={{ right: "12%", top: "14%", "--cc": "#5cb2ff", "--cdelay": "2.4s", "--cs": "12px" } as React.CSSProperties}
          >
            ✦
          </span>
        </span>
      </figure>
      <blockquote style={{ opacity: vizibil ? 1 : 0 }}>
        {CITATE[index]}
      </blockquote>
      <p className="vc-autor">— Tribunul, din arhiva de aur</p>
      </section>
      {/* banda subțire cu precizarea din redacție, sub citat */}
      <aside className="vadim-pamflet" aria-label="Precizare din redacție">
        ⚠ Precizare din redacție: această pagină e pamflet și trebuie
        tratată ca atare.
      </aside>
    </>
  );
}
