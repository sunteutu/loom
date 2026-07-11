/**
 * Research linter for quant questionnaires — ordering rules derived from
 * the catalog's placement methodology (priming, anchoring, funnel order)
 * plus LOI and placeholder hygiene. Mirrors guide-lint for qual.
 */

import { INDICATORS } from "./indicators";
import { formatMinutes, type GuideLanguage } from "./guide-export";
import type { LintIssue } from "./guide-lint";
import { resolveSurveyItem, surveyLoiMinutes } from "./survey-export";
import type { SurveyDoc } from "./surveys";

const INDICATOR_BY_ID = new Map(INDICATORS.map((ind) => [ind.id, ind]));

/** Unaided recall — contaminated by any prior brand exposure. */
const UNAIDED_IDS = new Set(["tom-awareness", "spontaneous-awareness"]);

/** Must be answered without a price anchor in the respondent's head. */
const ANCHOR_SENSITIVE_IDS = new Set(["van-westendorp", "willingness-to-pay"]);
/** Items that reveal a concrete price. */
const PRICE_REVEALING_IDS = new Set(["gabor-granger", "price-perception-concept"]);

/** Emotionally sensitive topics — keep out of the questionnaire opening. */
const SENSITIVE_IDS = new Set(["debt-burden", "financial-anxiety"]);

/** Canonical brand-funnel stage order (subsequence must be non-decreasing). */
const FUNNEL_STAGE: Record<string, number> = {
  "tom-awareness": 0,
  "spontaneous-awareness": 1,
  "aided-awareness": 2,
  "brand-familiarity": 3,
  "brand-consideration": 4,
  "brand-preference": 5,
  "brand-trial": 6,
  "brand-usage": 7,
  bumo: 8,
  "brand-loyalty": 9,
};

/** Online LOI thresholds: completion quality drops sharply past these. */
const LOI_WARN_MINUTES = 15;
const LOI_ERROR_MINUTES = 25;

const BRAND_TOKEN = /\[(client |main |preferred )?brand|\[competitor/i;
const STANDARD_VARS = ["category", "product", "brand"] as const;

function name(id: string): string {
  return INDICATOR_BY_ID.get(id)?.name ?? id;
}

export function lintSurvey(
  survey: SurveyDoc,
  lang: GuideLanguage,
): LintIssue[] {
  const issues: LintIssue[] = [];
  const items = survey.items;
  if (items.length === 0) return issues;

  const resolved = items.map((it) => resolveSurveyItem(it, lang));
  /** All text a respondent sees for item i (stem + options + rows). */
  const exposedText = resolved.map((r) =>
    [r.stem, ...(r.options ?? []), ...(r.attributes ?? []), ...(r.subStems ?? [])].join(" "),
  );
  const brandValue = survey.variables.brand?.trim();
  const exposesBrands = (i: number) =>
    BRAND_TOKEN.test(exposedText[i]) ||
    (!!brandValue && exposedText[i].includes(brandValue));

  // ── 1. LOI budget ─────────────────────────────────────────────────────────
  const loi = surveyLoiMinutes(survey);
  if (loi > LOI_ERROR_MINUTES) {
    issues.push({
      rule: "loi-fatigue",
      severity: "error",
      message: `LOI estimat ${formatMinutes(loi)} — peste ~${LOI_ERROR_MINUTES} min ratele de abandon și răspunsurile în linie dreaptă (straight-lining) cresc puternic. Taie itemi sau împarte în două valuri.`,
    });
  } else if (loi > LOI_WARN_MINUTES) {
    issues.push({
      rule: "loi-over-budget",
      severity: "warning",
      message: `LOI estimat ${formatMinutes(loi)} — peste ținta uzuală de ~${LOI_WARN_MINUTES} min pentru chestionare online. Verifică ce itemi poți tăia.`,
    });
  }

  // ── 2. TOM must open the questionnaire ────────────────────────────────────
  const tomIdx = items.findIndex((it) => it.indicatorId === "tom-awareness");
  if (tomIdx > 0) {
    const primedBefore = items
      .slice(0, tomIdx)
      .some((_, i) => exposesBrands(i));
    issues.push({
      rule: "tom-not-first",
      severity: primedBefore ? "error" : "warning",
      message: primedBefore
        ? `Top-of-Mind e pe poziția Q${tomIdx + 1}, după întrebări care expun branduri — prima mențiune e contaminată. TOM trebuie să fie prima întrebare substanțială.`
        : `Top-of-Mind e pe poziția Q${tomIdx + 1} — standardul e prima întrebare substanțială din chestionar, înainte de orice alt conținut.`,
    });
  }

  // ── 3. Unaided after brand exposure (priming) ─────────────────────────────
  for (let i = 0; i < items.length; i++) {
    const id = items[i].indicatorId;
    if (!id || !UNAIDED_IDS.has(id) || i === tomIdx) continue;
    const primer = items.slice(0, i).findIndex((_, j) => exposesBrands(j));
    if (primer !== -1) {
      issues.push({
        rule: "unaided-primed",
        severity: "error",
        message: `„${name(id)}” (Q${i + 1}) vine după Q${primer + 1}, care expune liste de branduri — recall-ul spontan e contaminat. Mută întrebările unaided înaintea oricărei liste de branduri.`,
      });
      break; // one is enough
    }
  }

  // ── 4. Spontaneous immediately after TOM ──────────────────────────────────
  const spontIdx = items.findIndex(
    (it) => it.indicatorId === "spontaneous-awareness",
  );
  if (tomIdx !== -1 && spontIdx !== -1 && spontIdx !== tomIdx + 1) {
    issues.push({
      rule: "spontaneous-not-adjacent",
      severity: "suggestion",
      message: `Spontaneous awareness (Q${spontIdx + 1}) nu urmează imediat după Top-of-Mind (Q${tomIdx + 1}) — standardul e să fie consecutive, înainte de lista aided.`,
    });
  }

  // ── 5. Brand-funnel order ─────────────────────────────────────────────────
  let prevStage = -1;
  let prevStageIdx = -1;
  for (let i = 0; i < items.length; i++) {
    const id = items[i].indicatorId;
    if (!id || !(id in FUNNEL_STAGE)) continue;
    const stage = FUNNEL_STAGE[id];
    if (stage < prevStage) {
      issues.push({
        rule: "funnel-order",
        severity: "warning",
        message: `Ordinea funnel-ului e inversată: „${name(id)}” (Q${i + 1}) vine după „${name(items[prevStageIdx].indicatorId!)}” (Q${prevStageIdx + 1}). Ordinea canonică: awareness → familiarity → consideration → preference → trial → usage → BUMO → loyalty.`,
      });
      break;
    }
    prevStage = stage;
    prevStageIdx = i;
  }

  // ── 6. Price anchoring ────────────────────────────────────────────────────
  const firstReveal = items.findIndex(
    (it) => it.indicatorId && PRICE_REVEALING_IDS.has(it.indicatorId),
  );
  if (firstReveal !== -1) {
    for (let i = firstReveal + 1; i < items.length; i++) {
      const id = items[i].indicatorId;
      if (id && ANCHOR_SENSITIVE_IDS.has(id)) {
        issues.push({
          rule: "price-anchoring",
          severity: "error",
          message: `„${name(id)}” (Q${i + 1}) vine după „${name(items[firstReveal].indicatorId!)}” (Q${firstReveal + 1}), care arată un preț concret — răspunsurile vor fi ancorate. Mută întrebările de preț deschis înaintea oricărui preț afișat.`,
        });
        break;
      }
    }
  }

  // ── 7. Ad recall before recognition ───────────────────────────────────────
  const recallIdx = items.findIndex((it) => it.indicatorId === "ad-recall");
  const recognitionIdx = items.findIndex(
    (it) =>
      it.indicatorId === "ad-recognition" || it.indicatorId === "brand-linkage",
  );
  if (recallIdx !== -1 && recognitionIdx !== -1 && recallIdx > recognitionIdx) {
    issues.push({
      rule: "recall-after-recognition",
      severity: "error",
      message: `Ad recall (Q${recallIdx + 1}) vine după expunerea materialului publicitar (Q${recognitionIdx + 1}) — recall-ul spontan trebuie măsurat înainte de a arăta reclama.`,
    });
  }

  // ── 8. Sensitive topics too early ─────────────────────────────────────────
  if (items.length >= 8) {
    const firstQuarter = Math.ceil(items.length / 4);
    for (let i = 0; i < firstQuarter; i++) {
      const id = items[i].indicatorId;
      if (id && SENSITIVE_IDS.has(id)) {
        issues.push({
          rule: "sensitive-early",
          severity: "warning",
          message: `„${name(id)}” apare la Q${i + 1}, în deschiderea chestionarului — subiectele sensibile se plasează spre final, înaintea demograficelor.`,
        });
        break;
      }
    }
  }

  // ── 9. Placeholders ───────────────────────────────────────────────────────
  const allText = exposedText.join(" ");
  const tokens = new Set(allText.match(/\[[^\]]+\]/g) ?? []);
  const unfilledStandard = STANDARD_VARS.filter(
    (key) => tokens.has(`[${key}]`) && !survey.variables[key]?.trim(),
  );
  if (unfilledStandard.length > 0) {
    issues.push({
      rule: "unfilled-variables",
      severity: "error",
      message: `Chestionarul folosește ${unfilledStandard.map((k) => `[${k}]`).join(", ")} dar variabilele de studiu sunt goale — completează-le, altfel exportul pleacă cu placeholder-e.`,
    });
  }
  const nonStandard = [...tokens].filter(
    (t) => !STANDARD_VARS.some((k) => t.toLowerCase() === `[${k}]`),
  );
  if (nonStandard.length > 0) {
    issues.push({
      rule: "manual-placeholders",
      severity: "suggestion",
      message: `Placeholder-e de completat manual după export (liste de branduri, prețuri, atribute): ${nonStandard.slice(0, 6).join(", ")}${nonStandard.length > 6 ? ` +${nonStandard.length - 6}` : ""}.`,
    });
  }

  return issues;
}
