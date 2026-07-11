/**
 * Guide exports: .docx (opens identically in Word, Pages, Google Docs — only
 * standard OOXML features: heading styles, numbering, plain paragraphs) and
 * Markdown. Both run fully in the browser, no server.
 */

import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { INDICATORS, type Indicator } from "./indicators";
import { INDICATOR_QUAL_RO } from "./indicators-ro";
import type { Guide, GuideItem, GuideVariables } from "./guides";

export type GuideLanguage = "en" | "ro";

/** Replace [category] / [product] / [brand] with the study variables. */
export function applyVariables(text: string, vars: GuideVariables): string {
  let out = text;
  for (const key of ["category", "product", "brand"] as const) {
    const value = vars[key]?.trim();
    if (value) {
      out = out.replaceAll(`[${key}]`, value);
    }
  }
  return out;
}

const INDICATOR_BY_ID = new Map(INDICATORS.map((ind) => [ind.id, ind]));

/**
 * Resolve an item's text for the export language. Romanian applies only to
 * untouched catalog questions (resolved via provenance); user-edited and
 * custom questions always export exactly as typed.
 */
function resolveItemText(item: GuideItem, lang: GuideLanguage): string {
  if (lang === "ro" && item.indicatorId && item.sourceIndex !== undefined) {
    const original = INDICATOR_BY_ID.get(item.indicatorId)?.qualQuestions?.[
      item.sourceIndex
    ];
    const translated =
      INDICATOR_QUAL_RO[item.indicatorId]?.qualQuestions[item.sourceIndex];
    if (translated && item.text === original) return translated;
  }
  return item.text;
}

function resolveIntent(
  indicator: Indicator,
  lang: GuideLanguage,
): string | undefined {
  if (lang === "ro") {
    return INDICATOR_QUAL_RO[indicator.id]?.qualIntent ?? indicator.qualIntent;
  }
  return indicator.qualIntent;
}

export interface GuideGroup {
  indicator: Indicator | null;
  items: GuideItem[];
}

/**
 * Group consecutive items that share a source indicator, so a guide built
 * indicator-by-indicator exports as titled sections while a hand-reordered
 * one follows the user's order.
 */
export function groupItems(items: GuideItem[]): GuideGroup[] {
  const groups: GuideGroup[] = [];
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
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "ghid-interviu"
  );
}

// ── Markdown ───────────────────────────────────────────────────────────────

export function guideToMarkdown(guide: Guide, lang: GuideLanguage = "en"): string {
  const vars = guide.variables;
  const lines: string[] = [
    `# ${guide.title}`,
    "",
    `_Ghid de interviu · ${formatDate(guide.updatedAt)} · ${guide.items.length} întrebări_`,
  ];
  let n = 0;
  for (const group of groupItems(guide.items)) {
    lines.push("");
    if (group.indicator) {
      lines.push(`## ${group.indicator.name}`);
      const intent = resolveIntent(group.indicator, lang);
      if (intent) {
        lines.push("", `> **Intent:** ${applyVariables(intent, vars)}`);
      }
    } else {
      lines.push("## Întrebări proprii");
    }
    lines.push("");
    for (const item of group.items) {
      n += 1;
      lines.push(`${n}. ${applyVariables(resolveItemText(item, lang), vars)}`);
    }
  }
  return lines.join("\n") + "\n";
}

export function downloadMarkdown(guide: Guide, lang: GuideLanguage = "en") {
  download(
    new Blob([guideToMarkdown(guide, lang)], { type: "text/markdown" }),
    `${slugify(guide.title)}.md`,
  );
}

// ── Word (.docx) ───────────────────────────────────────────────────────────

const FONT = "DM Sans";

// Editorial palette — near-black body, muted meta, one indigo accent.
const INK = "0F172A";
const BODY = "1E293B";
const MUTED = "64748B";
const ACCENT = "3E63DD";
const HAIRLINE = "CBD5E1";
const ACCENT_SOFT = "C7D2FE";

/**
 * Build the Word document. No italics anywhere (per user preference) —
 * hierarchy comes from weight, caps, spacing and one accent colour.
 * Standard OOXML only, so it renders identically in Word and Pages.
 */
export function buildGuideDocument(
  guide: Guide,
  fontData?: Uint8Array,
  lang: GuideLanguage = "en",
): Document {
  const vars = guide.variables;
  const children: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.LEFT,
      spacing: { after: 120 },
      children: [new TextRun({ text: guide.title })],
    }),
    // Meta line: bold small caps instead of italics, closed by a hairline.
    new Paragraph({
      spacing: { after: 480 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 6, color: HAIRLINE, space: 12 },
      },
      children: [
        new TextRun({
          text: `Ghid de interviu  ·  ${formatDate(guide.updatedAt)}  ·  ${guide.items.length} întrebări`,
          bold: true,
          allCaps: true,
          characterSpacing: 20,
          size: 18, // 9pt
          color: MUTED,
        }),
      ],
    }),
  ];

  for (const group of groupItems(guide.items)) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 440, after: 160 },
        children: [
          new TextRun({
            text: group.indicator?.name ?? "Întrebări proprii",
          }),
        ],
      }),
    );
    const intent = group.indicator
      ? resolveIntent(group.indicator, lang)
      : undefined;
    if (intent) {
      children.push(
        new Paragraph({
          spacing: { after: 240 },
          indent: { left: 240 },
          border: {
            left: {
              style: BorderStyle.SINGLE,
              size: 18,
              color: ACCENT_SOFT,
              space: 10,
            },
          },
          children: [
            new TextRun({ text: "Intent: ", bold: true, color: MUTED }),
            new TextRun({ text: applyVariables(intent, vars), color: MUTED }),
          ],
        }),
      );
    }
    for (const item of group.items) {
      children.push(
        new Paragraph({
          numbering: { reference: "questions", level: 0 },
          spacing: { after: 220, line: 300 },
          children: [
            new TextRun({
              text: applyVariables(resolveItemText(item, lang), vars),
            }),
          ],
        }),
      );
    }
  }

  return new Document({
    // Embed DM Sans so the document renders identically on machines
    // without the font installed (bold is synthesized by Word/Pages).
    ...(fontData
      ? { fonts: [{ name: FONT, data: fontData as unknown as Buffer }] }
      : {}),
    styles: {
      default: {
        document: { run: { font: FONT, size: 22, color: BODY } }, // 11pt body
        title: {
          run: { font: FONT, size: 56, bold: true, color: INK },
        },
        // Section label: bold caps + letter-spacing in the accent colour.
        heading2: {
          run: {
            font: FONT,
            size: 20, // 10pt
            bold: true,
            allCaps: true,
            characterSpacing: 20,
            color: ACCENT,
          },
        },
      },
    },
    numbering: {
      config: [
        {
          reference: "questions",
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: "%1.",
              alignment: AlignmentType.START,
              style: {
                run: { bold: true, color: MUTED },
                paragraph: {
                  indent: { left: 480, hanging: 480 },
                },
              },
            },
          ],
        },
      ],
    },
    sections: [{ children }],
  });
}

/** Fetch the bundled DM Sans TTF for embedding; export still works without. */
async function loadFont(): Promise<Uint8Array | undefined> {
  try {
    const res = await fetch("/fonts/DMSans-Regular.ttf");
    if (!res.ok) return undefined;
    return new Uint8Array(await res.arrayBuffer());
  } catch {
    return undefined;
  }
}

export async function downloadDocx(guide: Guide, lang: GuideLanguage = "en") {
  const fontData = await loadFont();
  const blob = await Packer.toBlob(buildGuideDocument(guide, fontData, lang));
  download(blob, `${slugify(guide.title)}.docx`);
}
