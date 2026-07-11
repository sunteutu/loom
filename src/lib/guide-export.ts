/**
 * Guide exports: .docx (opens identically in Word, Pages, Google Docs — only
 * standard OOXML features: heading styles, numbering, plain paragraphs) and
 * Markdown. Both run fully in the browser, no server.
 */

import {
  AlignmentType,
  Document,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { INDICATORS, type Indicator } from "./indicators";
import type { Guide, GuideItem, GuideVariables } from "./guides";

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

export function guideToMarkdown(guide: Guide): string {
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
      if (group.indicator.qualIntent) {
        lines.push(
          "",
          `> **Intent:** ${applyVariables(group.indicator.qualIntent, vars)}`,
        );
      }
    } else {
      lines.push("## Întrebări proprii");
    }
    lines.push("");
    for (const item of group.items) {
      n += 1;
      lines.push(`${n}. ${applyVariables(item.text, vars)}`);
    }
  }
  return lines.join("\n") + "\n";
}

export function downloadMarkdown(guide: Guide) {
  download(
    new Blob([guideToMarkdown(guide)], { type: "text/markdown" }),
    `${slugify(guide.title)}.md`,
  );
}

// ── Word (.docx) ───────────────────────────────────────────────────────────

const FONT = "Arial"; // present on both platforms → renders identically in Word & Pages

export function buildGuideDocument(guide: Guide): Document {
  const vars = guide.variables;
  const children: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.LEFT,
      children: [new TextRun({ text: guide.title })],
    }),
    new Paragraph({
      spacing: { after: 360 },
      children: [
        new TextRun({
          text: `Ghid de interviu · ${formatDate(guide.updatedAt)} · ${guide.items.length} întrebări`,
          italics: true,
          color: "666666",
        }),
      ],
    }),
  ];

  for (const group of groupItems(guide.items)) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 320, after: 120 },
        children: [
          new TextRun({
            text: group.indicator?.name ?? "Întrebări proprii",
          }),
        ],
      }),
    );
    if (group.indicator?.qualIntent) {
      children.push(
        new Paragraph({
          spacing: { after: 160 },
          children: [
            new TextRun({ text: "Intent: ", bold: true, color: "666666" }),
            new TextRun({
              text: applyVariables(group.indicator.qualIntent, vars),
              italics: true,
              color: "666666",
            }),
          ],
        }),
      );
    }
    for (const item of group.items) {
      children.push(
        new Paragraph({
          numbering: { reference: "questions", level: 0 },
          spacing: { after: 160 },
          children: [
            new TextRun({ text: applyVariables(item.text, vars) }),
          ],
        }),
      );
    }
  }

  return new Document({
    styles: {
      default: {
        document: { run: { font: FONT, size: 22 } }, // 11pt body
        title: {
          run: { font: FONT, size: 52, bold: true, color: "1A1A1A" },
        },
        heading2: {
          run: { font: FONT, size: 28, bold: true, color: "333333" },
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

export async function downloadDocx(guide: Guide) {
  const blob = await Packer.toBlob(buildGuideDocument(guide));
  download(blob, `${slugify(guide.title)}.docx`);
}
