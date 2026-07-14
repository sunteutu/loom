/**
 * Questionnaire exports (.docx + Markdown), mirroring guide-export's
 * premium grayscale look. Structured fields (scale, options, base, type)
 * resolve live from the catalog via provenance; the stem behaves like
 * guide questions: untouched → translated when RO, edited → as typed.
 */

import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { INDICATORS, type Indicator, type SurveyItem } from "./indicators";
import { INDICATOR_SURVEY_RO, type SurveyItemRo } from "./indicators-survey-ro";
import {
  applyVariables,
  coverageToMarkdown,
  formatMinutes,
  type GuideLanguage,
} from "./guide-export";
import type { SurveyDoc, SurveyDocItem } from "./surveys";

const INDICATOR_BY_ID = new Map(INDICATORS.map((ind) => [ind.id, ind]));

export const SURVEY_TYPE_LABELS: Record<SurveyItem["type"], string> = {
  single: "Un singur răspuns",
  multi: "Răspunsuri multiple",
  scale: "Scală",
  jar: "Scală JAR",
  price_psm: "Van Westendorp (PSM)",
  ranking: "Ierarhizare",
  constant_sum: "Sumă constantă",
  grid: "Grilă",
  open_numeric: "Răspuns numeric",
  open_text: "Răspuns deschis",
};

/** Everything the editor and the exports need to render one item. */
export interface ResolvedSurveyItem {
  stem: string;
  type: SurveyItem["type"];
  scalePoints?: string[];
  options?: string[];
  attributes?: string[];
  subStems?: string[];
  base?: string;
  randomize?: boolean;
  indicator?: Indicator;
}

export function resolveSurveyItem(
  item: SurveyDocItem,
  lang: GuideLanguage,
): ResolvedSurveyItem {
  const indicator = item.indicatorId
    ? INDICATOR_BY_ID.get(item.indicatorId)
    : undefined;
  const source =
    indicator && item.sourceIndex !== undefined
      ? indicator.surveyItems?.[item.sourceIndex]
      : undefined;
  // Custom question: plain open-text.
  if (!source) {
    return { stem: item.stem, type: "open_text" };
  }
  const ro: SurveyItemRo | undefined =
    lang === "ro" && item.indicatorId
      ? INDICATOR_SURVEY_RO[item.indicatorId]?.[item.sourceIndex!]
      : undefined;
  // Untouched stems translate via provenance; edits export as typed.
  const stem = ro && item.stem === source.stem ? ro.stem : item.stem;
  return {
    stem,
    type: source.type,
    scalePoints: ro?.scalePoints ?? source.scalePoints,
    options: ro?.options ?? source.options,
    attributes: ro?.attributes ?? source.attributes,
    subStems: ro?.subStems ?? source.subStems,
    base: ro?.base ?? source.base,
    randomize: source.randomize,
    indicator,
  };
}

/**
 * LOI (length of interview) heuristic: ~0.5 min per closed question plus
 * ~0.1 min per battery row (grid/JAR attributes and sub-questions).
 */
export function surveyLoiMinutes(survey: SurveyDoc): number {
  if (survey.items.length === 0) return 0;
  let minutes = 0;
  for (const item of survey.items) {
    const r = resolveSurveyItem(item, "en");
    minutes += 0.5;
    minutes += 0.1 * ((r.attributes?.length ?? 0) + (r.subStems?.length ?? 0));
  }
  return Math.max(1, Math.round(minutes));
}

/** Group consecutive same-indicator items, mirroring the guide export. */
export interface SurveyGroup {
  indicator: Indicator | null;
  items: SurveyDocItem[];
}

export function groupSurveyItems(items: SurveyDocItem[]): SurveyGroup[] {
  const groups: SurveyGroup[] = [];
  for (const item of items) {
    const indicator = item.indicatorId
      ? (INDICATOR_BY_ID.get(item.indicatorId) ?? null)
      : null;
    const last = groups[groups.length - 1];
    if (last && last.indicator === indicator) {
      last.items.push(item);
    } else {
      groups.push({ indicator, items: [item] });
    }
  }
  return groups;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "chestionar"
  );
}

/** Programmer-facing instruction line under each question. */
function instructionLine(r: ResolvedSurveyItem): string {
  const parts = [SURVEY_TYPE_LABELS[r.type]];
  if (r.base) parts.push(`BAZĂ: ${r.base}`);
  if (r.randomize) parts.push("RANDOMIZEAZĂ ordinea");
  return parts.join("  ·  ");
}

// ── Markdown ───────────────────────────────────────────────────────────────

export function surveyToMarkdown(
  survey: SurveyDoc,
  lang: GuideLanguage = "en",
): string {
  const vars = survey.variables;
  const lines: string[] = [
    `# ${survey.title}`,
    "",
    `_Chestionar · ${formatDate(survey.updatedAt)} · ${survey.items.length} întrebări · LOI ${formatMinutes(surveyLoiMinutes(survey))}_`,
    ...(survey.coverage?.length ? coverageToMarkdown(survey.coverage) : []),
  ];
  let q = 0;
  for (const group of groupSurveyItems(survey.items)) {
    lines.push("", `## ${group.indicator?.name ?? "Întrebări proprii"}`, "");
    for (const item of group.items) {
      q += 1;
      const r = resolveSurveyItem(item, lang);
      lines.push(`**Q${q}. ${applyVariables(r.stem, vars)}**`, "");
      lines.push(`_${instructionLine(r)}_`, "");
      for (const s of r.subStems ?? []) lines.push(`- ${applyVariables(s, vars)}`);
      for (const a of r.attributes ?? [])
        lines.push(`- ${applyVariables(a, vars)}`);
      if (r.scalePoints) {
        lines.push(
          `Scală: ${r.scalePoints.map((p) => applyVariables(p, vars)).join(" / ")}`,
        );
      }
      if (r.options) {
        r.options.forEach((o, i) =>
          lines.push(
            `${String.fromCharCode(97 + (i % 26))}. ${applyVariables(o, vars)}`,
          ),
        );
      }
      lines.push("");
    }
  }
  return lines.join("\n") + "\n";
}

export function downloadSurveyMarkdown(
  survey: SurveyDoc,
  lang: GuideLanguage = "en",
) {
  download(
    new Blob([surveyToMarkdown(survey, lang)], { type: "text/markdown" }),
    `${slugify(survey.title)}.md`,
  );
}

// ── Word (.docx) ───────────────────────────────────────────────────────────

const FONT = "DM Sans";
const INK = "0F172A";
const BODY = "1E293B";
const MUTED = "64748B";
const HEADING = "334155";
const HAIRLINE = "CBD5E1";

export function buildSurveyDocument(
  survey: SurveyDoc,
  fontData?: Uint8Array,
  lang: GuideLanguage = "en",
): Document {
  const vars = survey.variables;
  const children: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.LEFT,
      spacing: { after: 120 },
      children: [new TextRun({ text: survey.title, font: FONT })],
    }),
    new Paragraph({
      spacing: { after: 480 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 6, color: HAIRLINE, space: 12 },
      },
      children: [
        new TextRun({
          text: `Chestionar  ·  ${formatDate(survey.updatedAt)}  ·  ${survey.items.length} întrebări  ·  LOI ${formatMinutes(surveyLoiMinutes(survey))}`,
          font: FONT,
          bold: true,
          allCaps: true,
          characterSpacing: 20,
          size: 18,
          color: MUTED,
        }),
      ],
    }),
  ];

  const bodyRun = (text: string, opts: { bold?: boolean; color?: string; size?: number } = {}) =>
    new TextRun({
      text,
      font: FONT,
      size: opts.size ?? 22,
      color: opts.color ?? BODY,
      bold: opts.bold,
    });

  if (survey.coverage?.length) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 160 },
        children: [
          new TextRun({
            text: "Acoperirea obiectivelor",
            font: FONT,
            color: HEADING,
          }),
        ],
      }),
    );
    for (const entry of survey.coverage) {
      const ind = INDICATOR_BY_ID.get(entry.indicatorId);
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 60 },
          children: [bodyRun(ind?.name ?? entry.indicatorId, { bold: true, color: INK })],
        }),
      );
      for (const qText of entry.questions) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            indent: { left: 360 },
            children: [bodyRun(`– ${qText}`, { size: 20, color: MUTED })],
          }),
        );
      }
    }
  }

  let q = 0;
  for (const group of groupSurveyItems(survey.items)) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 440, after: 160 },
        children: [
          new TextRun({
            text: group.indicator?.name ?? "Întrebări proprii",
            font: FONT,
            color: HEADING,
          }),
        ],
      }),
    );
    for (const item of group.items) {
      q += 1;
      const r = resolveSurveyItem(item, lang);
      // Question stem, bold, numbered Q1..Qn.
      children.push(
        new Paragraph({
          spacing: { before: 240, after: 60, line: 300 },
          children: [
            bodyRun(`Q${q}. `, { bold: true, color: MUTED }),
            bodyRun(applyVariables(r.stem, vars), { bold: true, color: INK }),
          ],
        }),
        // Programmer instruction line: small caps gray.
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: instructionLine(r),
              font: FONT,
              size: 16, // 8pt
              allCaps: true,
              color: MUTED,
            }),
          ],
        }),
      );
      for (const s of r.subStems ?? []) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            indent: { left: 360 },
            children: [bodyRun(`– ${applyVariables(s, vars)}`)],
          }),
        );
      }
      for (const a of r.attributes ?? []) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            indent: { left: 360 },
            children: [bodyRun(`– ${applyVariables(a, vars)}`)],
          }),
        );
      }
      if (r.scalePoints) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            indent: { left: 360 },
            children: [
              bodyRun("Scală: ", { bold: true, color: MUTED, size: 20 }),
              bodyRun(
                r.scalePoints.map((p) => applyVariables(p, vars)).join(" / "),
                { size: 20, color: HEADING },
              ),
            ],
          }),
        );
      }
      if (r.options) {
        r.options.forEach((o, i) => {
          children.push(
            new Paragraph({
              spacing: { after: 40 },
              indent: { left: 360 },
              children: [
                bodyRun(`${String.fromCharCode(97 + (i % 26))}. `, {
                  bold: true,
                  color: MUTED,
                  size: 20,
                }),
                bodyRun(applyVariables(o, vars), { size: 20 }),
              ],
            }),
          );
        });
      }
    }
  }

  return new Document({
    ...(fontData
      ? { fonts: [{ name: FONT, data: fontData as unknown as Buffer }] }
      : {}),
    styles: {
      default: {
        document: { run: { font: FONT, size: 22, color: BODY } },
        title: { run: { font: FONT, size: 56, bold: true, color: INK } },
        heading2: {
          run: {
            font: FONT,
            size: 20,
            bold: true,
            allCaps: true,
            characterSpacing: 20,
            color: HEADING,
          },
        },
      },
    },
    sections: [{ children }],
  });
}

async function loadFont(): Promise<Uint8Array | undefined> {
  try {
    const res = await fetch("/fonts/DMSans-Regular.ttf");
    if (!res.ok) return undefined;
    return new Uint8Array(await res.arrayBuffer());
  } catch {
    return undefined;
  }
}

export async function downloadSurveyDocx(
  survey: SurveyDoc,
  lang: GuideLanguage = "en",
) {
  const fontData = await loadFont();
  const blob = await Packer.toBlob(buildSurveyDocument(survey, fontData, lang));
  download(blob, `${slugify(survey.title)}.docx`);
}
