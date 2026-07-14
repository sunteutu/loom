/**
 * v2 mapping engine — LLM via OpenRouter. Runs server-side so the API
 * key never reaches the browser. Same output contract as v1: per
 * question, candidate indicators with confidence (plus a short Romanian
 * rationale that v1 can't provide).
 */

import { INDICATORS } from "@/lib/indicators";

// Grok (the first pick) is region-blocked by xAI for this account;
// the user chose GPT-5.4 instead. Override per env without redeploying.
export const MAPPING_MODEL = process.env.OPENROUTER_MODEL ?? "openai/gpt-5.4";

const MAX_QUESTIONS = 100;
const TIMEOUT_MS = 60_000;

const VALID_IDS = new Set(INDICATORS.map((ind) => ind.id));

/** Compact catalog digest embedded in the system prompt (~2k tokens). */
const CATALOG = INDICATORS.map(
  (ind) =>
    `- ${ind.id} | ${ind.name} | ${ind.description}${ind.aliases.length ? ` | alias: ${ind.aliases.join(", ")}` : ""}`,
).join("\n");

const SYSTEM_PROMPT = `Ești un researcher senior de piață. Primești întrebări de business de la stakeholderi (oameni care NU cunosc terminologia de research, scriu colocvial în română sau engleză) și le mapezi pe indicatori standard de research dintr-un catalog fix.

CATALOGUL DE INDICATORI (id | nume | descriere | aliasuri):
${CATALOG}

REGULI:
1. Pentru fiecare întrebare, propune 1-3 indicatori candidați din catalog, ordonați descrescător după potrivire, cu confidence 0-1.
2. Folosește EXCLUSIV id-uri din catalog, exact cum sunt scrise. Nu inventa id-uri.
3. Dacă o întrebare conține DOUĂ nevoi de research distincte (întrebare compusă), reflectă ambele prin 2 candidați cu confidence apropiat și menționează asta în rationale.
4. Dacă o întrebare nu se potrivește cu niciun indicator (off-topic, administrativă), returnează candidates: [].
5. rationale: o justificare scurtă (max 15 cuvinte), în română, pe înțelesul unui om de business.
6. Răspunde STRICT cu JSON valid, fără alt text, în formatul:
{"results":[{"index":0,"candidates":[{"indicatorId":"...","confidence":0.9,"rationale":"..."}]},...]}
Un element per întrebare, în ordinea primită, cu "index" = poziția întrebării (0-based).`;

interface LlmCandidate {
  indicatorId?: unknown;
  confidence?: unknown;
  rationale?: unknown;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "OPENROUTER_API_KEY lipsește — adaugă cheia în .env.local (local) sau în Vercel → Environment Variables (live)." },
      { status: 500 },
    );
  }

  let questions: string[];
  try {
    const body = await request.json();
    questions = body.questions;
    if (
      !Array.isArray(questions) ||
      questions.length === 0 ||
      questions.length > MAX_QUESTIONS ||
      questions.some((q) => typeof q !== "string" || !q.trim())
    ) {
      throw new Error("invalid");
    }
  } catch {
    return Response.json(
      { error: `Body invalid — aștept { questions: string[] } cu 1–${MAX_QUESTIONS} întrebări.` },
      { status: 400 },
    );
  }

  const userPrompt = `Întrebările stakeholderilor:\n${questions
    .map((q, i) => `${i}. ${q}`)
    .join("\n")}`;

  let response: globalThis.Response;
  try {
    response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://loom-lac.vercel.app",
        "X-Title": "loom study builder",
      },
      body: JSON.stringify({
        model: MAPPING_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0,
        // ~200 output tokens per question (3 candidates + short rationale);
        // an explicit cap also keeps low-limit OpenRouter keys usable.
        max_tokens: Math.min(200 * questions.length + 800, 12_000),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "TimeoutError";
    return Response.json(
      { error: timedOut ? "OpenRouter nu a răspuns în 60s — încearcă din nou." : "Nu am putut contacta OpenRouter." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    const friendly =
      response.status === 401
        ? "Cheia OpenRouter e invalidă (401)."
        : response.status === 402
          ? "Credit OpenRouter insuficient (402)."
          : `OpenRouter a răspuns cu ${response.status}.`;
    return Response.json(
      { error: friendly, detail: detail.slice(0, 300) },
      { status: 502 },
    );
  }

  let parsed: { results?: { index?: unknown; candidates?: LlmCandidate[] }[] };
  try {
    const data = await response.json();
    const content: string = data.choices?.[0]?.message?.content ?? "";
    // Some models wrap JSON in code fences despite response_format.
    const jsonText = content.replace(/^```(?:json)?\s*|\s*```$/g, "");
    parsed = JSON.parse(jsonText);
    if (!Array.isArray(parsed.results)) throw new Error("no results");
  } catch {
    return Response.json(
      { error: "Modelul a returnat un răspuns neparsabil — încearcă din nou." },
      { status: 502 },
    );
  }

  // Reassemble strictly by index, validating every indicator id against
  // the real catalog (hallucination guard).
  const results = questions.map((question, i) => {
    const entry = parsed.results!.find((r) => r.index === i);
    const candidates = (entry?.candidates ?? [])
      .filter(
        (c): c is { indicatorId: string; confidence: number; rationale?: string } =>
          typeof c.indicatorId === "string" &&
          VALID_IDS.has(c.indicatorId) &&
          typeof c.confidence === "number",
      )
      .slice(0, 3)
      .map((c) => ({
        indicatorId: c.indicatorId,
        confidence: Math.max(0, Math.min(1, c.confidence)),
        rationale:
          typeof c.rationale === "string" ? c.rationale.slice(0, 200) : undefined,
      }));
    return { question, candidates };
  });

  return Response.json({ results, model: MAPPING_MODEL });
}
