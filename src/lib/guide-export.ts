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
import {
  guidePace,
  guideTarget,
  guideTotalMinutes,
  INTRO_MINUTES,
  OUTRO_MINUTES,
  type Guide,
  type GuideItem,
  type GuideVariables,
} from "./guides";

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
 * Resolve an item's text for the given language. Romanian applies only to
 * untouched catalog questions (resolved via provenance); user-edited and
 * custom questions always resolve exactly as typed. Used by both the export
 * and the in-app preview so they can never diverge.
 */
export function resolveItemText(item: GuideItem, lang: GuideLanguage): string {
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

export function resolveIntent(
  indicator: Indicator,
  lang: GuideLanguage,
): string | undefined {
  if (lang === "ro") {
    return INDICATOR_QUAL_RO[indicator.id]?.qualIntent ?? indicator.qualIntent;
  }
  return indicator.qualIntent;
}

// ── Intro / closing scripts ────────────────────────────────────────────────

const DEFAULT_INTRO: Record<GuideLanguage, (minutes: number) => string> = {
  en: (m) =>
    `Hello, and thank you for taking the time to talk with me today. My name is [moderator] and we'll be talking about [category]. There are no right or wrong answers — I'm interested in your honest experiences and opinions. The conversation will take about ${m} minutes and, with your permission, will be recorded; the recording stays confidential and is used for analysis only. Do you have any questions before we begin?`,
  ro: (m) =>
    `Bună ziua și mulțumesc că ați acceptat să stăm de vorbă. Mă numesc [moderator] și astăzi vom discuta despre [category]. Nu există răspunsuri corecte sau greșite — mă interesează experiențele și părerile dumneavoastră sincere. Discuția durează aproximativ ${m} de minute și, cu acordul dumneavoastră, va fi înregistrată; înregistrarea rămâne confidențială și este folosită doar pentru analiză. Aveți întrebări înainte să începem?`,
};

const DEFAULT_OUTRO: Record<GuideLanguage, string> = {
  en: "We've reached the end. Before we wrap up: is there anything I haven't asked about that you'd like to share? And if you had to sum up your experience with [category] in one sentence, what would it be? Thank you so much for your time and openness — this conversation has been very valuable.",
  ro: "Am ajuns la final. Înainte să încheiem: există ceva ce nu v-am întrebat și ați fi vrut să-mi spuneți? Și dacă ar fi să rezumați într-o singură frază experiența dumneavoastră cu [category], care ar fi aceea? Vă mulțumesc mult pentru timp și pentru deschidere — discuția a fost foarte valoroasă.",
};

/** The moderator intro: the user's edited text, or the language default. */
export function resolveIntro(guide: Guide, lang: GuideLanguage): string {
  return guide.intro ?? DEFAULT_INTRO[lang](guideTarget(guide));
}

/** The closing script: the user's edited text, or the language default. */
export function resolveOutro(guide: Guide, lang: GuideLanguage): string {
  return guide.outro ?? DEFAULT_OUTRO[lang];
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

/** "~25 min" or "~1 h 30 min" — section/total interview time at the guide's pace. */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `~${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `~${h} h` : `~${h} h ${m} min`;
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
  const pace = guidePace(guide);
  const lines: string[] = [
    `# ${guide.title}`,
    "",
    `_Ghid de interviu · ${formatDate(guide.updatedAt)} · ${guide.items.length} întrebări · ${formatMinutes(guideTotalMinutes(guide))}_`,
    "",
    `## Introducere (${formatMinutes(INTRO_MINUTES)})`,
    "",
    applyVariables(resolveIntro(guide, lang), vars),
  ];
  let n = 0;
  for (const group of groupItems(guide.items)) {
    const sectionTime = formatMinutes(group.items.length * pace);
    lines.push("");
    if (group.indicator) {
      lines.push(`## ${group.indicator.name} (${sectionTime})`);
      const intent = resolveIntent(group.indicator, lang);
      if (intent) {
        lines.push("", `> **Intent:** ${applyVariables(intent, vars)}`);
      }
    } else {
      lines.push(`## Întrebări proprii (${sectionTime})`);
    }
    lines.push("");
    for (const item of group.items) {
      n += 1;
      lines.push(`${n}. ${applyVariables(resolveItemText(item, lang), vars)}`);
    }
  }
  lines.push(
    "",
    `## Închidere (${formatMinutes(OUTRO_MINUTES)})`,
    "",
    applyVariables(resolveOutro(guide, lang), vars),
  );
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

// Editorial palette — grayscale per user preference (no color accents).
const INK = "0F172A";
const BODY = "1E293B";
const MUTED = "64748B";
const HEADING = "334155"; // dark gray section labels + intent block
const HAIRLINE = "CBD5E1";

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
  const pace = guidePace(guide);
  const children: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.LEFT,
      spacing: { after: 120 },
      children: [new TextRun({ text: guide.title, font: FONT })],
    }),
    // Meta line: bold small caps instead of italics, closed by a hairline.
    new Paragraph({
      spacing: { after: 480 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 6, color: HAIRLINE, space: 12 },
      },
      children: [
        new TextRun({
          text: `Ghid de interviu  ·  ${formatDate(guide.updatedAt)}  ·  ${guide.items.length} întrebări  ·  ${formatMinutes(guideTotalMinutes(guide))}`,
          font: FONT,
          bold: true,
          allCaps: true,
          characterSpacing: 20,
          size: 18, // 9pt
          color: MUTED,
        }),
      ],
    }),
  ];

  const scriptSection = (title: string, minutes: number, text: string) => {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 440, after: 160 },
        children: [
          new TextRun({ text: title, font: FONT, color: HEADING }),
          new TextRun({
            text: `  ·  ${formatMinutes(minutes)}`,
            font: FONT,
            bold: true,
            size: 20,
            color: MUTED,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 220, line: 300 },
        children: [
          new TextRun({
            text: applyVariables(text, vars),
            font: FONT,
            size: 22,
            color: BODY,
          }),
        ],
      }),
    );
  };

  scriptSection("Introducere", INTRO_MINUTES, resolveIntro(guide, lang));

  for (const group of groupItems(guide.items)) {
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
          new TextRun({
            text: `  ·  ${formatMinutes(group.items.length * pace)}`,
            font: FONT,
            bold: true,
            size: 20,
            color: MUTED,
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
              color: HAIRLINE,
              space: 10,
            },
          },
          children: [
            new TextRun({
              text: "Intent: ",
              font: FONT,
              bold: true,
              color: HEADING,
            }),
            new TextRun({
              text: applyVariables(intent, vars),
              font: FONT,
              color: HEADING,
            }),
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
              font: FONT,
              size: 22, // 11pt — explicit: Pages doesn't reliably apply doc defaults
              color: BODY,
            }),
          ],
        }),
      );
    }
  }

  scriptSection("Închidere", OUTRO_MINUTES, resolveOutro(guide, lang));

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
            color: HEADING,
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
                run: { font: FONT, bold: true, color: MUTED },
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
