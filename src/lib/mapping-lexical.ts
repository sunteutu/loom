/**
 * v1 mapping engine — local lexical scoring, no network, no cost.
 *
 * Each indicator becomes a weighted document built from the catalog
 * (EN + RO) plus the hand-curated business keywords and the user's
 * learned corrections. A stakeholder question is tokenized and scored
 * against every indicator with a simplified TF-IDF; matching is
 * diacritics-insensitive with prefix matching (≥4 chars) to absorb
 * Romanian inflections without a stemmer.
 */

import { INDICATORS } from "./indicators";
import { INDICATOR_QUAL_RO } from "./indicators-ro";
import { INDICATOR_SURVEY_RO } from "./indicators-survey-ro";
import { INDICATOR_KEYWORDS_RO } from "./indicator-keywords-ro";

export interface MappingCandidate {
  indicatorId: string;
  /** Normalized 0–1. */
  score: number;
}

/** Below this, a question lands in the "unmapped" bucket. */
export const MAPPING_THRESHOLD = 0.25;
export const TOP_CANDIDATES = 5;

// ── Tokenization ───────────────────────────────────────────────────────────

const STOPWORDS = new Set(
  // RO + EN function words; business questions are full of them.
  `si sau dar iar de la in pe cu al a ai ale lui ei lor un o unui unei ce care cine cand cum unde daca nu mai cel cea cei cele este sunt era fi fie fost avea are am au as ar sa se s-a ne isi îsi din pentru prin dupa catre pana ca mult foarte the a an and or but of to in on with for from is are was be been do does did what which who when how where if not more most this that these those our we they you it its as by at
  vrem vreau stim stiu afla aflam intereseaza doresc dorim place`.split(/\s+/),
);

/** Lowercase, strip diacritics, split into meaningful tokens. */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 3 && !STOPWORDS.has(t));
}

/** Two tokens match if either is a ≥4-char prefix of the other. */
function tokensMatch(a: string, b: string): boolean {
  if (a === b) return true;
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  return short.length >= 4 && long.startsWith(short);
}

// ── Corpus ─────────────────────────────────────────────────────────────────

interface IndicatorDoc {
  indicatorId: string;
  /** token → accumulated field weight */
  weights: Map<string, number>;
}

const FIELD_WEIGHTS = {
  keywords: 6, // business-language triggers — the strongest signal
  aliases: 5,
  name: 4,
  description: 2,
  qualIntent: 2,
  questions: 1, // qual questions + survey stems, EN + RO
};

function addTokens(doc: IndicatorDoc, text: string, weight: number) {
  for (const token of tokenize(text)) {
    doc.weights.set(token, Math.max(doc.weights.get(token) ?? 0, weight));
  }
}

function buildCorpus(
  learned: Record<string, string[]> = {},
): IndicatorDoc[] {
  return INDICATORS.map((ind) => {
    const doc: IndicatorDoc = { indicatorId: ind.id, weights: new Map() };
    for (const kw of INDICATOR_KEYWORDS_RO[ind.id] ?? []) {
      addTokens(doc, kw, FIELD_WEIGHTS.keywords);
    }
    // Learned corrections weigh like curated keywords.
    for (const example of learned[ind.id] ?? []) {
      addTokens(doc, example, FIELD_WEIGHTS.keywords);
    }
    for (const alias of ind.aliases) addTokens(doc, alias, FIELD_WEIGHTS.aliases);
    addTokens(doc, ind.name, FIELD_WEIGHTS.name);
    addTokens(doc, ind.description, FIELD_WEIGHTS.description);
    const ro = INDICATOR_QUAL_RO[ind.id];
    if (ind.qualIntent) addTokens(doc, ind.qualIntent, FIELD_WEIGHTS.qualIntent);
    if (ro?.qualIntent) addTokens(doc, ro.qualIntent, FIELD_WEIGHTS.qualIntent);
    for (const q of ind.qualQuestions ?? []) addTokens(doc, q, FIELD_WEIGHTS.questions);
    for (const q of ro?.qualQuestions ?? []) addTokens(doc, q, FIELD_WEIGHTS.questions);
    for (const item of ind.surveyItems ?? []) addTokens(doc, item.stem, FIELD_WEIGHTS.questions);
    for (const item of INDICATOR_SURVEY_RO[ind.id] ?? []) addTokens(doc, item.stem, FIELD_WEIGHTS.questions);
    return doc;
  });
}

/** IDF over the indicator corpus: rare tokens discriminate, common ones don't. */
function buildIdf(corpus: IndicatorDoc[]): Map<string, number> {
  const df = new Map<string, number>();
  for (const doc of corpus) {
    for (const token of doc.weights.keys()) {
      df.set(token, (df.get(token) ?? 0) + 1);
    }
  }
  const n = corpus.length;
  const idf = new Map<string, number>();
  for (const [token, count] of df) {
    idf.set(token, Math.log(1 + n / count));
  }
  return idf;
}

// ── Scoring ────────────────────────────────────────────────────────────────

export interface LexicalEngine {
  scoreQuestion(text: string): MappingCandidate[];
}

/**
 * Build the engine once per mapping run (corpus + IDF are rebuilt so the
 * latest learned corrections are always included).
 */
export function createLexicalEngine(
  learned: Record<string, string[]> = {},
): LexicalEngine {
  const corpus = buildCorpus(learned);
  const idf = buildIdf(corpus);
  // For prefix matching we need the token lists, not just the maps.
  const docTokens = corpus.map((doc) => [...doc.weights.entries()]);

  return {
    scoreQuestion(text: string): MappingCandidate[] {
      const queryTokens = [...new Set(tokenize(text))];
      if (queryTokens.length === 0) return [];

      const scored = corpus.map((doc, di) => {
        let score = 0;
        for (const qt of queryTokens) {
          // Exact hit first (cheap); fall back to prefix scan.
          let weight = doc.weights.get(qt);
          let matchedToken = qt;
          if (weight === undefined) {
            for (const [dt, w] of docTokens[di]) {
              if (tokensMatch(qt, dt)) {
                // Keep the best-weighted prefix match.
                if (weight === undefined || w > weight) {
                  weight = w;
                  matchedToken = dt;
                }
              }
            }
          }
          if (weight !== undefined) {
            score += weight * (idf.get(matchedToken) ?? 1);
          }
        }
        return { indicatorId: doc.indicatorId, raw: score };
      });

      // Normalize by a query-length-aware ceiling so short and long
      // questions produce comparable confidences.
      const ceiling =
        queryTokens.length * FIELD_WEIGHTS.keywords * Math.log(1 + INDICATORS.length);
      const max = Math.max(...scored.map((s) => s.raw), 1e-9);
      return scored
        .filter((s) => s.raw > 0)
        .sort((a, b) => b.raw - a.raw)
        .slice(0, TOP_CANDIDATES)
        .map((s) => ({
          indicatorId: s.indicatorId,
          // Blend absolute strength with relative rank: a weak best match
          // should still fall under the threshold.
          score: Math.min(1, (s.raw / ceiling) * 2.2) * (s.raw / max),
        }));
    },
  };
}
