/**
 * Research linter for qualitative interview guides — methodological
 * safeguards computed live in the editor and re-checked before export.
 *
 * First wave of rules:
 *  - over-budget / fatigue (time vs. target duration)
 *  - too many themes for one IDI
 *  - awareness priming (TOM/spontaneous after brand-naming questions)
 *  - sensitive topics before rapport is built
 *  - unfilled placeholders at export
 */

import { INDICATORS } from "./indicators";
import {
  guidePace,
  guideTarget,
  guideTotalMinutes,
  type Guide,
} from "./guides";
import {
  formatMinutes,
  resolveIntent,
  resolveIntro,
  resolveItemText,
  resolveOutro,
  groupItems,
  type GuideLanguage,
} from "./guide-export";

export type LintSeverity = "error" | "warning" | "suggestion";

export interface LintIssue {
  rule: string;
  severity: LintSeverity;
  message: string;
}

const INDICATOR_BY_ID = new Map(INDICATORS.map((ind) => [ind.id, ind]));

/** Unaided-recall questions that brand mentions would contaminate. */
const AWARENESS_IDS = new Set(["tom-awareness", "spontaneous-awareness"]);

/** Emotionally sensitive topics — need rapport before being raised. */
const SENSITIVE_IDS = new Set(["debt-burden", "financial-anxiety"]);

/** A question that names the (client) brand, via placeholder or filled variable. */
const BRAND_TOKEN = /\[(client |main |preferred )?brand/i;

const STANDARD_VARS = ["category", "product", "brand"] as const;

/** Hard ceiling: respondent fatigue degrades answer quality past ~90 min. */
const FATIGUE_MINUTES = 90;
const MAX_THEMES = 8;

export function lintGuide(guide: Guide, lang: GuideLanguage): LintIssue[] {
  const issues: LintIssue[] = [];
  const items = guide.items;
  if (items.length === 0) return issues;

  const pace = guidePace(guide);
  const target = guideTarget(guide);
  const total = guideTotalMinutes(guide);
  const texts = items.map((it) => resolveItemText(it, lang));

  // ── 1. Time budget ────────────────────────────────────────────────────────
  if (total > FATIGUE_MINUTES) {
    issues.push({
      rule: "fatigue",
      severity: "error",
      message: `Interviul iese la ${formatMinutes(total)} — peste pragul de ~90 min de la care oboseala respondentului degradează calitatea răspunsurilor. Taie ~${Math.ceil((total - FATIGUE_MINUTES) / pace)} întrebări sau împarte în două ghiduri.`,
    });
  } else if (total > target) {
    issues.push({
      rule: "over-budget",
      severity: "warning",
      message: `${formatMinutes(total)} față de ținta de ${target} min — taie ~${Math.ceil((total - target) / pace)} întrebări sau mărește ținta.`,
    });
  }

  // ── 2. Too many themes ────────────────────────────────────────────────────
  const themeCount =
    new Set(items.map((it) => it.indicatorId).filter(Boolean)).size +
    (items.some((it) => !it.indicatorId) ? 1 : 0);
  if (themeCount > MAX_THEMES) {
    issues.push({
      rule: "too-many-themes",
      severity: "suggestion",
      message: `${themeCount} teme într-un singur interviu — peste ~${MAX_THEMES} acoperirea devine superficială. Ia în calcul două ghiduri sau tăierea temelor secundare.`,
    });
  }

  // ── 3. Awareness priming ──────────────────────────────────────────────────
  const firstAwareness = items.findIndex(
    (it) => it.indicatorId && AWARENESS_IDS.has(it.indicatorId),
  );
  if (firstAwareness > 0) {
    const brandValue = guide.variables.brand?.trim();
    const priming = items
      .slice(0, firstAwareness)
      .map((it, i) => ({ it, n: i + 1 }))
      .filter(
        ({ it }, i) =>
          BRAND_TOKEN.test(texts[i]) ||
          (brandValue && texts[i].includes(brandValue)) ||
          // brand-focused indicators name the brand by design
          (it.indicatorId ?? "").startsWith("brand-"),
      );
    if (priming.length > 0) {
      const awarenessName =
        INDICATOR_BY_ID.get(items[firstAwareness].indicatorId!)?.name ??
        "awareness";
      issues.push({
        rule: "awareness-priming",
        severity: "error",
        message: `Întrebarea de ${awarenessName} (poziția ${firstAwareness + 1}) vine după întrebări care numesc brandul (${priming
          .slice(0, 3)
          .map((p) => `#${p.n}`)
          .join(", ")}) — recall-ul spontan e contaminat. Mută awareness-ul la începutul ghidului.`,
      });
    }
  }

  // ── 4. Sensitive topics too early ─────────────────────────────────────────
  if (items.length >= 8) {
    const firstQuarter = Math.ceil(items.length / 4);
    for (let i = 0; i < firstQuarter; i++) {
      const id = items[i].indicatorId;
      if (id && SENSITIVE_IDS.has(id)) {
        issues.push({
          rule: "sensitive-early",
          severity: "warning",
          message: `„${INDICATOR_BY_ID.get(id)?.name}” apare la poziția ${i + 1}, înainte de construirea raportului — mută subiectele sensibile în a doua jumătate a interviului.`,
        });
        break; // one warning is enough
      }
    }
  }

  // ── 5. Placeholders ───────────────────────────────────────────────────────
  const intentTexts = groupItems(items)
    .map((g) => (g.indicator ? (resolveIntent(g.indicator, lang) ?? "") : ""))
    .join(" ");
  const allText = [
    texts.join(" "),
    intentTexts,
    resolveIntro(guide, lang),
    resolveOutro(guide, lang),
  ].join(" ");
  const tokens = new Set(allText.match(/\[[^\]]+\]/g) ?? []);

  const unfilledStandard = STANDARD_VARS.filter(
    (key) => tokens.has(`[${key}]`) && !guide.variables[key]?.trim(),
  );
  if (unfilledStandard.length > 0) {
    issues.push({
      rule: "unfilled-variables",
      severity: "error",
      message: `Ghidul folosește ${unfilledStandard.map((k) => `[${k}]`).join(", ")} dar variabilele de studiu sunt goale — completează-le, altfel exportul pleacă cu placeholder-e.`,
    });
  }

  const nonStandard = [...tokens].filter(
    (t) => !STANDARD_VARS.some((k) => t === `[${k}]`),
  );
  if (nonStandard.length > 0) {
    issues.push({
      rule: "manual-placeholders",
      severity: "suggestion",
      message: `Placeholder-e de completat manual după export: ${nonStandard.slice(0, 6).join(", ")}${nonStandard.length > 6 ? ` +${nonStandard.length - 6}` : ""}.`,
    });
  }

  return issues;
}
