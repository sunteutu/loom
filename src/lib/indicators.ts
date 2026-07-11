/**
 * Gold-standard market research / UX research indicators.
 *
 * The canonical KPIs and measures used across brand tracking, U&A studies,
 * concept/product testing, pricing research, CX measurement, ad testing and
 * UX research. Names follow industry-standard terminology (ESOMAR-style
 * brand funnel, Kantar/Ipsos/Nielsen tracking conventions, NN/g & MeasuringU
 * UX metrics).
 */

import { INDICATOR_DETAIL } from "./indicators-detail";
import { INDICATOR_SURVEY } from "./indicators-survey";

export interface SurveyItem {
  type:
    | "single"
    | "multi"
    | "scale"
    | "jar"
    | "price_psm"
    | "ranking"
    | "constant_sum"
    | "grid"
    | "open_numeric"
    | "open_text";
  /** The question text shown to the respondent (with [placeholders]). */
  stem: string;
  /** Ordered scale-point labels (for scale / single). */
  scalePoints?: string[];
  /** Answer options (for single / multi — e.g. a brand list). */
  options?: string[];
  /** Battery rows (JAR attributes, grid rows). */
  attributes?: string[];
  /** Sub-questions for multi-question techniques (e.g. Van Westendorp). */
  subStems?: string[];
  /** Who is asked (routing / skip logic). */
  base: string;
  /** Randomize option / row order. */
  randomize?: boolean;
  /** How it is reported / scored. */
  analysis: string;
  /** Where it sits in the questionnaire flow. */
  placement: string;
  /** Gold-standard tips / pitfalls. */
  notes?: string;
}

export interface Indicator {
  id: string;
  name: string;
  /** Alternative names / abbreviations, used for search matching. */
  aliases: string[];
  category: IndicatorCategory;
  description: string;
  /** How the indicator is classically measured (scale, question type, formula). */
  measurement: string;
  /** What you're really trying to surface in a qualitative interview. */
  qualIntent?: string;
  /** Gold-standard qualitative interview questions. */
  qualQuestions?: string[];
  /** Structured quantitative survey items. */
  surveyItems?: SurveyItem[];
}

export type IndicatorCategory =
  | "Brand Health & Equity"
  | "Usage & Attitudes (U&A)"
  | "Purchase Behaviour & Pricing"
  | "Concept & Product Testing"
  | "Customer Experience & Satisfaction"
  | "Advertising & Communications"
  | "UX Research"
  | "Banking & Payments"
  | "Financial Needs & Wellbeing";

export const INDICATOR_CATEGORIES: IndicatorCategory[] = [
  "Brand Health & Equity",
  "Usage & Attitudes (U&A)",
  "Purchase Behaviour & Pricing",
  "Concept & Product Testing",
  "Customer Experience & Satisfaction",
  "Advertising & Communications",
  "UX Research",
  "Banking & Payments",
  "Financial Needs & Wellbeing",
];

const BASE_INDICATORS: Indicator[] = [
  // ── Brand Health & Equity ────────────────────────────────────────────────
  {
    id: "tom-awareness",
    name: "Top-of-Mind Awareness (TOM)",
    aliases: ["TOM", "first mention", "top of mind"],
    category: "Brand Health & Equity",
    description:
      "The first brand spontaneously mentioned when the category is cued. The strongest single measure of brand salience.",
    measurement:
      "Open question: “Which brands of [category] come to mind first?” — first mention only, % of respondents.",
  },
  {
    id: "spontaneous-awareness",
    name: "Spontaneous (Unaided) Awareness",
    aliases: ["unaided awareness", "spontaneous recall", "unprompted awareness"],
    category: "Brand Health & Equity",
    description:
      "All brands a respondent can name without prompting. Indicates how strongly the brand is encoded in memory.",
    measurement:
      "Open question, all mentions recorded; % of respondents mentioning the brand.",
  },
  {
    id: "aided-awareness",
    name: "Aided (Prompted) Awareness",
    aliases: ["prompted awareness", "total awareness", "brand recognition"],
    category: "Brand Health & Equity",
    description:
      "Recognition of the brand when shown a list or logos. The widest measure of brand presence and the top of the brand funnel.",
    measurement:
      "Show list/logos: “Which of these brands have you heard of?” — % selecting the brand.",
  },
  {
    id: "brand-salience",
    name: "Brand Salience",
    aliases: ["mental availability", "category entry points"],
    category: "Brand Health & Equity",
    description:
      "How readily the brand comes to mind across buying situations (mental availability), beyond simple awareness.",
    measurement:
      "Brand–cue association across category entry points (CEPs); share of association vs. competitors.",
  },
  {
    id: "brand-familiarity",
    name: "Brand Familiarity",
    aliases: ["knowledge of brand"],
    category: "Brand Health & Equity",
    description:
      "How well consumers feel they know the brand — a bridge between mere awareness and consideration.",
    measurement:
      "5-point scale from “never heard of” to “know very well”; % top-2-box.",
  },
  {
    id: "brand-consideration",
    name: "Brand Consideration",
    aliases: ["consideration set", "shortlist"],
    category: "Brand Health & Equity",
    description:
      "Whether the brand makes it into the set of brands a consumer would consider buying. Key mid-funnel KPI.",
    measurement:
      "“Which of these brands would you consider?” — % including the brand; or 5-point consideration scale, T2B.",
  },
  {
    id: "brand-preference",
    name: "Brand Preference",
    aliases: ["preferred brand", "first choice"],
    category: "Brand Health & Equity",
    description:
      "The single brand a consumer would choose above others when all are available and affordable.",
    measurement:
      "Forced choice among considered brands: “Which one brand do you prefer?” — % first choice.",
  },
  {
    id: "brand-trial",
    name: "Brand Trial (Ever Used)",
    aliases: ["ever tried", "trial rate", "penetration of brand"],
    category: "Brand Health & Equity",
    description:
      "Whether the consumer has ever bought or used the brand. Converts consideration into behaviour.",
    measurement: "“Which of these brands have you ever used/bought?” — % ever used.",
  },
  {
    id: "brand-usage",
    name: "Brand Usage (P12M / P3M / P4W)",
    aliases: ["current usage", "past 12 months", "recent usage", "lapsed users"],
    category: "Brand Health & Equity",
    description:
      "Use of the brand within a recent reference period (past 12 months / 3 months / 4 weeks). Distinguishes current from lapsed users.",
    measurement:
      "Usage in reference period appropriate to category purchase cycle; % users per period.",
  },
  {
    id: "bumo",
    name: "Brand Used Most Often (BUMO)",
    aliases: ["BUMO", "main brand", "most often used"],
    category: "Brand Health & Equity",
    description:
      "The brand used most often in the category — the classic behavioural-loyalty measure in trackers.",
    measurement: "“Which brand do you use most often?” — % naming the brand.",
  },
  {
    id: "brand-loyalty",
    name: "Brand Loyalty / Retention",
    aliases: ["repeat usage", "retention", "switching intent"],
    category: "Brand Health & Equity",
    description:
      "Commitment to keep buying the brand and resistance to switching, attitudinal and behavioural.",
    measurement:
      "Intention to continue using (5-point, T2B), share of last 10 purchases, or BUMO retention over waves.",
  },
  {
    id: "brand-advocacy",
    name: "Brand Advocacy / Recommendation",
    aliases: ["word of mouth", "recommendation intent"],
    category: "Brand Health & Equity",
    description:
      "Willingness to actively recommend the brand to others — the top of the brand funnel’s loyalty end.",
    measurement:
      "Likelihood-to-recommend scale (often the NPS 0–10 question) or claimed past recommendation.",
  },
  {
    id: "brand-image",
    name: "Brand Image / Associations",
    aliases: ["image attributes", "brand perceptions", "attribute ratings"],
    category: "Brand Health & Equity",
    description:
      "The functional and emotional attributes consumers associate with the brand vs. competitors.",
    measurement:
      "Brand–attribute association grid (pick-any or 5-point agreement) profiled vs. competitors; correspondence analysis.",
  },
  {
    id: "brand-affinity",
    name: "Brand Affinity / Brand Love",
    aliases: ["emotional connection", "brand closeness", "brand love"],
    category: "Brand Health & Equity",
    description:
      "Emotional closeness to the brand — “a brand for people like me”, liking and attachment beyond function.",
    measurement:
      "Affinity/closeness scales (e.g., “is a brand I love”, “fits me”), % T2B; part of equity models.",
  },
  {
    id: "brand-trust",
    name: "Brand Trust",
    aliases: ["credibility", "reliability perception"],
    category: "Brand Health & Equity",
    description:
      "Confidence that the brand delivers on its promises. Especially critical in services, finance and health.",
    measurement: "5- or 7-point trust scale (“is a brand I trust”), % T2B.",
  },
  {
    id: "brand-equity-index",
    name: "Brand Equity Index",
    aliases: ["brand power", "equity score", "BAV", "meaningful different salient"],
    category: "Brand Health & Equity",
    description:
      "Composite measure of brand strength (e.g., Kantar’s Meaningful–Different–Salient, BAV’s pillars) predicting market share and pricing power.",
    measurement:
      "Modelled index combining salience, perceived meaning/relevance and differentiation; indexed vs. category average.",
  },
  {
    id: "brand-funnel-conversion",
    name: "Brand Funnel Conversion",
    aliases: ["funnel ratios", "awareness to consideration", "funnel analysis"],
    category: "Brand Health & Equity",
    description:
      "Conversion rates between funnel stages (awareness → familiarity → consideration → trial → usage → loyalty), revealing where the brand leaks.",
    measurement:
      "Stage-on-stage ratios (e.g., consideration ÷ awareness), benchmarked vs. competitors.",
  },
  {
    id: "share-of-voice",
    name: "Share of Voice (SOV)",
    aliases: ["SOV", "advertising presence"],
    category: "Brand Health & Equity",
    description:
      "The brand’s share of category advertising/communication presence; SOV vs. share of market predicts growth.",
    measurement:
      "Share of category media spend or claimed ad awareness share in trackers.",
  },

  {
    id: "distinctive-brand-assets",
    name: "Distinctive Brand Assets (DBA)",
    aliases: [
      "DBA",
      "distinctive assets",
      "brand codes",
      "fame and uniqueness",
      "Ehrenberg-Bass assets",
    ],
    category: "Brand Health & Equity",
    description:
      "How strongly the brand's non-name codes — logo, colour, character, jingle, slogan, pack shape — trigger the brand from memory. Scored on fame (how many link it to the brand) and uniqueness (whether they link it only to this brand); the basis of mental availability and attention.",
    measurement:
      "Show each asset with the brand name removed: 'Which brand, if any, is this?' Fame = % attributing to the brand; Uniqueness = % attributing only to this brand (vs competitors/none). Plot assets on a Fame × Uniqueness grid to find investable vs risky assets.",
  },
  {
    id: "sustainability-perception",
    name: "Sustainability & Ethical Perception",
    aliases: [
      "sustainability",
      "ESG perception",
      "green credentials",
      "ethical brand",
      "purpose",
      "green premium",
    ],
    category: "Brand Health & Equity",
    description:
      "How sustainable, ethical and responsible the brand is perceived to be (environmental, social, governance), how credible its claims are, and whether consumers would pay a premium — separating genuine equity from greenwashing risk and the say-do gap.",
    measurement:
      "Agreement battery on environmental/social/ethical attributes (5-pt, % T2B) vs competitors; claim believability; and a green-premium WTP (stated extra % willing to pay). Always caveat the say-do gap vs actual behaviour.",
  },

  // ── Usage & Attitudes (U&A) ──────────────────────────────────────────────
  {
    id: "category-penetration",
    name: "Category Penetration",
    aliases: ["category usage", "incidence", "user base"],
    category: "Usage & Attitudes (U&A)",
    description:
      "The share of the population that uses the category at all — sizes the market and defines the user base.",
    measurement:
      "Category usage screener with reference period; % users of population.",
  },
  {
    id: "usage-frequency",
    name: "Usage / Purchase Frequency",
    aliases: ["frequency of use", "how often"],
    category: "Usage & Attitudes (U&A)",
    description:
      "How often the category or brand is used or bought. Combined with penetration it sizes volume.",
    measurement:
      "Frequency scale calibrated to the category (daily … less than monthly); mean occasions per period.",
  },
  {
    id: "usage-occasions",
    name: "Usage Occasions / Moments",
    aliases: ["occasions", "moments of consumption", "need states", "when and where"],
    category: "Usage & Attitudes (U&A)",
    description:
      "When, where, with whom and why the category is consumed — the basis for occasion-based segmentation.",
    measurement:
      "Occasion grid (last occasion deep-dive or pick-any across occasions); % of occasions by type.",
  },
  {
    id: "weight-of-usage",
    name: "Weight of Consumption (Heavy/Medium/Light)",
    aliases: ["heavy users", "consumption quantity", "volume segmentation"],
    category: "Usage & Attitudes (U&A)",
    description:
      "Classification of users by consumed volume. Heavy users typically drive a disproportionate share of volume (Pareto).",
    measurement:
      "Claimed quantity × frequency; terciles or category-specific cut-offs into heavy/medium/light.",
  },
  {
    id: "brand-repertoire",
    name: "Brand Repertoire",
    aliases: ["repertoire size", "brands used", "solus users"],
    category: "Usage & Attitudes (U&A)",
    description:
      "The set of brands a consumer alternates between, and its size — most categories are repertoire, not solus.",
    measurement:
      "Brands used in reference period; mean repertoire size, % solus (single-brand) users.",
  },
  {
    id: "share-of-wallet",
    name: "Share of Wallet / Share of Requirements",
    aliases: ["SOW", "share of requirements", "SOR", "share of category spend"],
    category: "Usage & Attitudes (U&A)",
    description:
      "The brand’s share of an individual’s total category spend or volume — loyalty expressed behaviourally.",
    measurement:
      "Claimed allocation of last N purchases or constant-sum allocation across brands.",
  },
  {
    id: "habits-practices",
    name: "Habits & Practices",
    aliases: ["H&P", "rituals", "how the product is used", "preparation"],
    category: "Usage & Attitudes (U&A)",
    description:
      "How the product is actually used: rituals, combinations, preparation, storage, dosage. Reveals unmet needs and off-label usage.",
    measurement:
      "Behavioural battery on last usage occasion; ethnography/diaries for depth.",
  },
  {
    id: "category-attitudes",
    name: "Attitudes toward Category",
    aliases: ["attitudinal statements", "involvement", "category beliefs"],
    category: "Usage & Attitudes (U&A)",
    description:
      "Beliefs, involvement and orientation toward the category (e.g., health-consciousness, price-orientation) — the attitudinal half of U&A.",
    measurement:
      "Agreement battery (5-point Likert) factor-analysed; inputs to attitudinal segmentation.",
  },
  {
    id: "needs-motivations",
    name: "Needs & Motivations",
    aliases: ["drivers of choice", "need states", "motivations"],
    category: "Usage & Attitudes (U&A)",
    description:
      "The underlying functional and emotional needs the category serves — what consumers are really ‘hiring’ the product to do.",
    measurement:
      "Importance ratings or MaxDiff on need statements; qualitative laddering for depth.",
  },
  {
    id: "jobs-to-be-done",
    name: "Jobs to Be Done (JTBD)",
    aliases: [
      "JTBD",
      "jobs to be done",
      "outcome-driven innovation",
      "ODI",
      "desired outcomes",
      "switch interview",
      "four forces",
    ],
    category: "Usage & Attitudes (U&A)",
    description:
      "The progress a customer is trying to make in a given circumstance — the functional, emotional and social ‘job’ they hire a product to do. Reframes demand around outcomes and situations, not products or demographics.",
    measurement:
      "Outcome-Driven Innovation: rate desired-outcome statements on Importance × Satisfaction; Opportunity score = Importance + max(Importance − Satisfaction, 0). Underserved jobs = high importance, low satisfaction.",
  },
  {
    id: "path-to-purchase",
    name: "Path to Purchase / Decision Journey",
    aliases: ["customer journey", "decision process", "information sources", "touchpoints"],
    category: "Usage & Attitudes (U&A)",
    description:
      "The stages, touchpoints and information sources from need arousal to purchase, including who decides and who influences.",
    measurement:
      "Journey reconstruction of last purchase: trigger, sources consulted, touchpoint influence, decision criteria.",
  },
  {
    id: "channel-usage",
    name: "Channel / Place of Purchase",
    aliases: ["where bought", "retail channel", "online vs offline"],
    category: "Usage & Attitudes (U&A)",
    description:
      "Where the category is bought (channels, retailers, online/offline split) and why those channels are chosen.",
    measurement:
      "Channel pick-any + share of purchases by channel; channel choice drivers.",
  },
  {
    id: "media-consumption",
    name: "Media Consumption Habits",
    aliases: ["media habits", "touchpoint reach", "social media usage"],
    category: "Usage & Attitudes (U&A)",
    description:
      "Which media and platforms the target uses and how intensively — feeds connection planning and targeting.",
    measurement:
      "Media usage battery (reach × frequency by channel/platform/daypart).",
  },
  {
    id: "lapsing-churn-reasons",
    name: "Lapsed Usage & Churn Reasons",
    aliases: ["lapsed users", "rejection reasons", "why stopped"],
    category: "Usage & Attitudes (U&A)",
    description:
      "Why past users stopped using the brand or category — the diagnostic complement to acquisition metrics.",
    measurement:
      "Ever used but not in reference period → reason battery (open + pre-coded).",
  },

  // ── Purchase Behaviour & Pricing ─────────────────────────────────────────
  {
    id: "purchase-intention",
    name: "Purchase Intention",
    aliases: ["PI", "intent to buy", "buying intention", "top 2 box intent"],
    category: "Purchase Behaviour & Pricing",
    description:
      "Stated likelihood of buying the product/brand. The single most-used evaluative KPI in concept tests and trackers.",
    measurement:
      "Gold standard: 5-point scale “definitely will buy … definitely will not buy”; report % top-2-box and % “definitely”, vs. norms.",
  },
  {
    id: "purchase-triggers",
    name: "Purchase Triggers / Drivers",
    aliases: ["drivers", "reasons to buy", "choice drivers", "key purchase criteria"],
    category: "Purchase Behaviour & Pricing",
    description:
      "The factors that prompt and drive purchase — what tips consumers into buying, and which attributes matter most at the shelf.",
    measurement:
      "Stated importance (pick-any/MaxDiff) plus derived importance (driver analysis on choice/intent).",
  },
  {
    id: "purchase-barriers",
    name: "Purchase Barriers",
    aliases: ["barriers to purchase", "reasons not to buy", "objections", "friction"],
    category: "Purchase Behaviour & Pricing",
    description:
      "What stops aware-but-not-buying consumers: price, availability, habit, lack of relevance, trust. Mirrors the funnel leak points.",
    measurement:
      "Barrier battery asked of non-buyers/rejectors (pre-coded + open); % citing each barrier.",
  },
  {
    id: "trial-intent",
    name: "Trial Intent",
    aliases: ["willingness to try", "first purchase intent"],
    category: "Purchase Behaviour & Pricing",
    description:
      "Willingness to try the product for the first time — key for new launches, distinct from repeat intent.",
    measurement: "5-point likelihood-to-try scale, % T2B vs. launch norms.",
  },
  {
    id: "repeat-purchase-intent",
    name: "Repeat Purchase Intent",
    aliases: ["repurchase intention", "would buy again"],
    category: "Purchase Behaviour & Pricing",
    description:
      "After trial/usage: likelihood of buying again. With trial intent, the basis of volumetric forecasting.",
    measurement:
      "5-point “would buy again” scale post-trial (in-home use test), % T2B.",
  },
  {
    id: "willingness-to-pay",
    name: "Willingness to Pay (WTP)",
    aliases: ["WTP", "price acceptance", "maximum price"],
    category: "Purchase Behaviour & Pricing",
    description:
      "The maximum price a consumer would pay. Anchors pricing decisions and premium potential.",
    measurement:
      "Direct WTP question, Gabor–Granger, or choice-based conjoint (most robust).",
  },
  {
    id: "van-westendorp",
    name: "Price Sensitivity (Van Westendorp PSM)",
    aliases: ["PSM", "price sensitivity meter", "acceptable price range", "optimal price point"],
    category: "Purchase Behaviour & Pricing",
    description:
      "Classic technique mapping the acceptable price range and optimal price point from four price-perception questions.",
    measurement:
      "Four questions (too cheap / cheap / expensive / too expensive); intersection analysis → OPP and acceptable range.",
  },
  {
    id: "gabor-granger",
    name: "Price Elasticity (Gabor–Granger)",
    aliases: ["demand curve", "price laddering", "elasticity"],
    category: "Purchase Behaviour & Pricing",
    description:
      "Purchase likelihood measured at sequential price points to build a demand curve and revenue-optimal price.",
    measurement:
      "Purchase intent at randomized price ladder; demand/revenue curves, elasticity estimate.",
  },
  {
    id: "value-for-money",
    name: "Value for Money Perception",
    aliases: ["VFM", "worth the price", "price-value"],
    category: "Purchase Behaviour & Pricing",
    description:
      "Whether the offer feels worth its price — the price–quality trade-off judgement that mediates intent.",
    measurement:
      "5-point value-for-money scale (“excellent … poor value”), % T2B; or price/value JAR.",
  },
  {
    id: "promo-responsiveness",
    name: "Promotion Responsiveness",
    aliases: ["deal proneness", "promo sensitivity", "discount response"],
    category: "Purchase Behaviour & Pricing",
    description:
      "How strongly purchase behaviour shifts with promotions — separates baseline brand strength from bought volume.",
    measurement:
      "Claimed promo behaviour battery; or conjoint with promo conditions.",
  },

  {
    id: "conjoint-analysis",
    name: "Conjoint / Discrete Choice (Trade-off)",
    aliases: [
      "conjoint",
      "CBC",
      "choice-based conjoint",
      "discrete choice",
      "trade-off analysis",
      "part-worth utilities",
    ],
    category: "Purchase Behaviour & Pricing",
    description:
      "Derives the relative value (part-worth utilities) consumers place on product attributes and price by observing choices among realistic configured alternatives, rather than asking importance directly. The rigorous basis for feature prioritization, pricing, and share simulation.",
    measurement:
      "Choice-Based Conjoint (CBC): respondents choose among 3–4 product profiles (attribute bundles incl. price) across ~8–12 tasks; estimate part-worth utilities (Hierarchical Bayes), attribute importance, WTP, and run a market simulator for share/revenue under scenarios.",
  },

  // ── Concept & Product Testing ────────────────────────────────────────────
  {
    id: "overall-liking",
    name: "Overall Liking",
    aliases: ["overall opinion", "hedonic score", "9-point hedonic", "appeal"],
    category: "Concept & Product Testing",
    description:
      "Global appeal of the concept or product. In sensory testing the 9-point hedonic scale is the gold standard.",
    measurement:
      "9-point hedonic scale (sensory) or 5-point overall-opinion scale (concepts); mean + % T2B vs. norms.",
  },
  {
    id: "likes-dislikes",
    name: "Likes & Dislikes",
    aliases: ["open-ended likes", "what do you like", "diagnostics"],
    category: "Concept & Product Testing",
    description:
      "Open-ended diagnostics on what appeals and what puts off — explains the ‘why’ behind evaluative scores.",
    measurement:
      "Open questions “What do you like / dislike about it?”, coded into themes; % mentioning each theme.",
  },
  {
    id: "uniqueness",
    name: "Uniqueness / Differentiation",
    aliases: ["new and different", "distinctiveness", "differentiation"],
    category: "Concept & Product Testing",
    description:
      "How new and different the proposition feels vs. what’s available. With relevance, the core predictor of concept success.",
    measurement:
      "5-point “new and different” scale, % T2B vs. category norms.",
  },
  {
    id: "relevance",
    name: "Relevance / Meets Needs",
    aliases: ["personal relevance", "for me", "need fulfilment", "fit to needs"],
    category: "Concept & Product Testing",
    description:
      "Whether the proposition addresses a real need of the respondent — relevance without uniqueness is ‘me-too’, uniqueness without relevance is a gimmick.",
    measurement:
      "5-point relevance / “solves a problem I have” scale, % T2B.",
  },
  {
    id: "believability",
    name: "Believability / Credibility",
    aliases: ["credible claims", "convincing"],
    category: "Concept & Product Testing",
    description:
      "Whether the claims and benefits are believable coming from this brand. Weak believability caps purchase intent.",
    measurement: "5-point believability scale, % T2B.",
  },
  {
    id: "comprehension",
    name: "Comprehension / Clarity",
    aliases: ["understanding", "clear message", "ease of understanding"],
    category: "Concept & Product Testing",
    description:
      "Whether the concept is understood as intended — a hygiene factor checked before interpreting other scores.",
    measurement:
      "Ease-of-understanding scale + open playback of main message, coded vs. intended message.",
  },
  {
    id: "jar-scales",
    name: "Just-About-Right (JAR) Scales",
    aliases: ["JAR", "too much too little", "attribute optimization"],
    category: "Concept & Product Testing",
    description:
      "Whether specific attributes (sweetness, thickness, strength…) are at the right level — the standard product-optimization tool.",
    measurement:
      "5-point JAR scale per attribute; penalty analysis linking off-JAR to liking loss.",
  },
  {
    id: "paired-preference",
    name: "Paired Preference",
    aliases: ["preference test", "head to head", "A/B product test"],
    category: "Concept & Product Testing",
    description:
      "Direct choice between two products/variants (e.g., new vs. current, ours vs. competitor) — the classic action standard for reformulation.",
    measurement:
      "Blind paired comparison, % preferring each (with no-preference option); test vs. 50/50 or action standard.",
  },
  {
    id: "expected-frequency",
    name: "Expected Purchase Frequency",
    aliases: ["claimed frequency", "how often would buy"],
    category: "Concept & Product Testing",
    description:
      "How often respondents claim they would buy — combined with trial intent in volumetric forecasts.",
    measurement:
      "Claimed frequency scale, deflated by calibration factors in forecasting models.",
  },
  {
    id: "price-perception-concept",
    name: "Concept Price Perception",
    aliases: ["expected price", "price reaction"],
    category: "Concept & Product Testing",
    description:
      "Reaction to the concept’s price (or expected price when unpriced) — flags value misalignment early.",
    measurement:
      "Priced concept: value-for-money scale; unpriced: expected-price open question vs. intended price.",
  },

  {
    id: "kano-model",
    name: "Kano Model",
    aliases: [
      "Kano",
      "must-be",
      "delighters",
      "feature classification",
      "attractive quality",
    ],
    category: "Concept & Product Testing",
    description:
      "Classifies product features by how they drive satisfaction: must-be (basic, only dissatisfy if absent), performance (more is better), attractive (delighters that excite but aren't missed), indifferent, and reverse. Decides which features earn their place.",
    measurement:
      "Paired functional/dysfunctional question per feature (how you'd feel if it WERE present vs if it were NOT); cross-tab via the Kano evaluation table into Must-be/Performance/Attractive/Indifferent/Reverse; report category per feature, often with Better (CS) and Worse (DS) coefficients.",
  },
  {
    id: "maxdiff",
    name: "MaxDiff (Best-Worst Scaling)",
    aliases: ["MaxDiff", "best-worst scaling", "BWS", "priority ranking"],
    category: "Concept & Product Testing",
    description:
      "Forces respondents to pick the most and least important (or appealing) item from small subsets, yielding a discriminating, ratio-scaled priority ranking of needs, features, messages or claims — free of the scale-use bias and ceiling effects of rating batteries.",
    measurement:
      "Show subsets of 4–5 items across ~10–15 sets; respondent marks best and worst each set; estimate item scores (counting or Hierarchical Bayes) on a 0–100 scale summing to 100; rank items by preference share.",
  },
  {
    id: "turf",
    name: "TURF Analysis",
    aliases: [
      "TURF",
      "total unduplicated reach and frequency",
      "line optimization",
      "portfolio reach",
    ],
    category: "Concept & Product Testing",
    description:
      "Finds the combination of a limited number of items (flavours, variants, SKUs, messages, features) that together reach the largest number of people at least once — the range that maximizes unduplicated reach, not just average appeal.",
    measurement:
      "From interest/appeal/purchase-intent data per item, compute the unduplicated reach of every candidate combination of size N; identify the optimal line-up and the incremental reach each added item contributes (diminishing-returns curve).",
  },

  // ── Customer Experience & Satisfaction ───────────────────────────────────
  {
    id: "nps",
    name: "Net Promoter Score (NPS)",
    aliases: ["net promoter", "likelihood to recommend", "promoters detractors"],
    category: "Customer Experience & Satisfaction",
    description:
      "The standard loyalty/advocacy metric: likelihood to recommend on 0–10, promoters (9–10) minus detractors (0–6).",
    measurement:
      "“How likely are you to recommend X to a friend or colleague?” 0–10; NPS = %Promoters − %Detractors, plus open ‘why’.",
  },
  {
    id: "csat",
    name: "Customer Satisfaction (CSAT)",
    aliases: ["satisfaction score", "overall satisfaction", "OSAT"],
    category: "Customer Experience & Satisfaction",
    description:
      "Satisfaction with the product, service or a specific interaction — the workhorse CX metric, often trended by touchpoint.",
    measurement:
      "5-point satisfaction scale (“very satisfied … very dissatisfied”); % T2B or mean; relational (overall) vs. transactional (touchpoint).",
  },
  {
    id: "ces",
    name: "Customer Effort Score (CES)",
    aliases: ["effort score", "ease of resolution"],
    category: "Customer Experience & Satisfaction",
    description:
      "How easy it was to get the job done (resolve an issue, complete a task). Low effort predicts loyalty better than delight in service contexts.",
    measurement:
      "“The company made it easy to handle my issue” — 7-point agreement scale, % agree.",
  },
  {
    id: "repurchase-intention",
    name: "Repurchase / Renewal Intention",
    aliases: ["intention to return", "stay with provider", "renewal intent"],
    category: "Customer Experience & Satisfaction",
    description:
      "Stated likelihood of staying with the provider / buying again — the loyalty outcome CX programs are judged on.",
    measurement: "5-point likelihood scale, % T2B; trended with churn data.",
  },
  {
    id: "complaint-incidence",
    name: "Complaint Incidence & Resolution",
    aliases: ["problem incidence", "complaints", "issue resolution"],
    category: "Customer Experience & Satisfaction",
    description:
      "Share of customers experiencing problems, whether they complained, and how well issues were resolved — a key driver of churn.",
    measurement:
      "Problem incidence % → complained % → resolved-satisfactorily %; satisfaction with handling.",
  },
  {
    id: "key-driver-importance",
    name: "Touchpoint / Attribute Importance (Key Drivers)",
    aliases: ["key driver analysis", "derived importance", "what matters most"],
    category: "Customer Experience & Satisfaction",
    description:
      "Which experience attributes drive overall satisfaction/NPS — directs improvement investment to what moves the needle.",
    measurement:
      "Derived importance (regression/Shapley of attributes on OSAT/NPS) plotted against performance (quadrant map).",
  },

  {
    id: "servqual",
    name: "Service Quality (SERVQUAL / RATER)",
    aliases: ["SERVQUAL", "RATER", "service quality", "SERVPERF", "gap model"],
    category: "Customer Experience & Satisfaction",
    description:
      "Decomposes service quality into five dimensions — Reliability, Assurance, Tangibles, Empathy, Responsiveness (RATER) — measured as the gap between what customers expect and what they perceive they received. The diagnostic layer beneath NPS/CSAT that points to which operational lever is failing.",
    measurement:
      "22-item battery across the 5 RATER dimensions on a 7-pt scale. Classic SERVQUAL asks Expectations and Perceptions (gap = P − E); modern SERVPERF asks Perceptions only and derives importance via regression. Weight dimensions via a 100-point allocation; report per-dimension gap/score and the largest shortfall.",
  },

  // ── Advertising & Communications ─────────────────────────────────────────
  {
    id: "ad-recall",
    name: "Advertising Recall (Unaided/Aided)",
    aliases: ["ad awareness", "day-after recall", "DAR", "campaign recall"],
    category: "Advertising & Communications",
    description:
      "Whether the audience remembers seeing the advertising — the classic in-market measure of cut-through.",
    measurement:
      "Unaided: “What advertising for [category] do you recall?”; aided with brand or ad cues; % recalling.",
  },
  {
    id: "ad-recognition",
    name: "Ad Recognition",
    aliases: ["recognition", "have you seen this ad"],
    category: "Advertising & Communications",
    description:
      "Recognition of the actual creative when shown — separates reach of the asset from brand attribution.",
    measurement: "Show de-branded creative: “Have you seen this?” — % recognizing.",
  },
  {
    id: "brand-linkage",
    name: "Brand Linkage / Branding",
    aliases: ["brand attribution", "branded recall", "correct brand attribution"],
    category: "Advertising & Communications",
    description:
      "Whether those who saw the ad correctly attribute it to the brand — great creative with weak branding builds the category, not the brand.",
    measurement:
      "Among recognizers of de-branded creative: “Which brand was this for?” — % correct attribution.",
  },
  {
    id: "message-takeout",
    name: "Message Takeout / Communication",
    aliases: ["main message", "key takeaway", "communication check"],
    category: "Advertising & Communications",
    description:
      "What viewers actually take from the ad, compared with the intended message.",
    measurement:
      "Open-ended “What was the main idea?”, coded vs. intended message; % correct takeout.",
  },
  {
    id: "persuasion",
    name: "Persuasion / Intent Shift",
    aliases: ["pre-post shift", "motivation", "persuasion score"],
    category: "Advertising & Communications",
    description:
      "The ad’s effect on brand preference or purchase intent — the classic copy-testing effectiveness measure.",
    measurement:
      "Pre/post exposure shift in brand choice or intent (or exposed vs. control); percentage-point lift.",
  },
  {
    id: "ad-likeability",
    name: "Ad Likeability",
    aliases: ["liking of ad", "enjoyment"],
    category: "Advertising & Communications",
    description:
      "How much viewers like the ad — a validated predictor of in-market sales effects (ARF studies).",
    measurement: "5-point liking scale, % T2B vs. copy-test norms.",
  },
  {
    id: "ad-distinctiveness",
    name: "Ad Distinctiveness / Engagement",
    aliases: ["stand out", "attention", "memorability"],
    category: "Advertising & Communications",
    description:
      "Whether the creative stands out from category advertising and holds attention — a precondition for memory encoding.",
    measurement:
      "Distinctiveness/engagement scales, % T2B; facial coding or attention metrics in modern systems.",
  },
  {
    id: "call-to-action",
    name: "Response / Action Intent",
    aliases: ["CTA response", "search intent", "visit intent"],
    category: "Advertising & Communications",
    description:
      "Claimed likelihood of acting on the ad: find out more, search, visit, talk about it.",
    measurement: "Action battery (pick-any actions likely to take), % per action.",
  },

  // ── UX Research ──────────────────────────────────────────────────────────
  {
    id: "task-success",
    name: "Task Success Rate",
    aliases: ["completion rate", "effectiveness", "task completion"],
    category: "UX Research",
    description:
      "The share of users who complete a task successfully — the fundamental usability effectiveness metric.",
    measurement:
      "Binary (or leveled) success per task in usability testing; % success with confidence interval (small-n: adjusted Wald).",
  },
  {
    id: "time-on-task",
    name: "Time on Task",
    aliases: ["task time", "efficiency", "completion time"],
    category: "UX Research",
    description:
      "How long successful task completion takes — the standard efficiency metric, compared across designs or vs. expert baseline.",
    measurement:
      "Time per completed task; report geometric mean (task times are skewed).",
  },
  {
    id: "error-rate",
    name: "Error Rate",
    aliases: ["errors", "slips and mistakes", "error frequency"],
    category: "UX Research",
    description:
      "Frequency and severity of user errors during tasks — pinpoints interaction-level problems.",
    measurement:
      "Errors per task (counted against defined error opportunities), severity-classified.",
  },
  {
    id: "sus",
    name: "System Usability Scale (SUS)",
    aliases: ["SUS score", "usability questionnaire"],
    category: "UX Research",
    description:
      "The most widely used standardized perceived-usability questionnaire; 10 items yielding a 0–100 score with robust benchmarks (average ≈ 68).",
    measurement:
      "10-item, 5-point questionnaire; standard scoring to 0–100; grade vs. benchmark curve.",
  },
  {
    id: "seq",
    name: "Single Ease Question (SEQ)",
    aliases: ["ease question", "task difficulty rating"],
    category: "UX Research",
    description:
      "One-item post-task ease rating — the standard lightweight per-task difficulty measure.",
    measurement:
      "“Overall, how easy or difficult was this task?” 7-point scale, asked immediately after each task; mean vs. ≈5.5 benchmark.",
  },
  {
    id: "umux-lite",
    name: "UMUX-Lite",
    aliases: ["UMUX lite", "two-item usability", "lite usability metric"],
    category: "UX Research",
    description:
      "Two-item perceived usability/usefulness measure (capability + ease) that correlates strongly with SUS — ideal for in-product surveys.",
    measurement:
      "2 items, 5- or 7-point agreement; regression-adjusted to the SUS scale.",
  },
  {
    id: "umux",
    name: "UMUX (Usability Metric for User Experience)",
    aliases: ["usability metric for user experience", "UMUX score", "4-item UMUX", "Finstad"],
    category: "UX Research",
    description:
      "Four-item perceived usability measure (capability, frustration, ease, correction time) scored 0–100 — SUS-level reliability at less than half the length.",
    measurement:
      "4 items (2 positive, 2 negative), 7-point agreement; odd items score −1, even items 7 − score; sum × 100/24 → 0–100.",
  },
  {
    id: "first-click",
    name: "First Click Success",
    aliases: ["first click testing", "initial click"],
    category: "UX Research",
    description:
      "Whether the user’s first click is on the correct path — first-click success roughly doubles eventual task success odds.",
    measurement:
      "First-click tests on designs/screens; % correct first clicks, click maps.",
  },
  {
    id: "findability",
    name: "Findability / Navigation Success",
    aliases: ["tree testing", "IA testing", "information scent"],
    category: "UX Research",
    description:
      "Whether users can locate items in the information architecture, independent of visual design.",
    measurement:
      "Tree testing: % success, % directness (no backtracking), time per item.",
  },
  {
    id: "learnability",
    name: "Learnability",
    aliases: ["learning curve", "improvement over trials"],
    category: "UX Research",
    description:
      "How quickly performance improves with repeated use — critical for expert tools and frequent-use products.",
    measurement:
      "Repeated-trial testing; slope of time/errors across trials.",
  },
  {
    id: "nasa-tlx",
    name: "Perceived Workload (NASA-TLX)",
    aliases: ["TLX", "cognitive load", "workload"],
    category: "UX Research",
    description:
      "Standardized subjective workload measure (mental, physical, temporal demand, performance, effort, frustration).",
    measurement:
      "6 subscales, 0–100; raw TLX (unweighted) is the common applied variant.",
  },
  {
    id: "desirability",
    name: "Desirability (Product Reaction Cards)",
    aliases: ["Microsoft desirability toolkit", "adjective cards", "emotional response"],
    category: "UX Research",
    description:
      "The emotional/aesthetic response to a design, captured via adjective selection — the standard desirability method.",
    measurement:
      "Pick 3–5 from 118 product reaction cards (or a subset); frequency of positive vs. negative descriptors.",
  },
  {
    id: "feature-adoption",
    name: "Feature Adoption",
    aliases: ["adoption rate", "feature usage"],
    category: "UX Research",
    description:
      "Share of users who discover and use a feature, and whether they keep using it.",
    measurement:
      "Analytics: % of active users using the feature (breadth) × frequency (depth) × retention over time.",
  },
  {
    id: "engagement",
    name: "Engagement (DAU/MAU, Stickiness)",
    aliases: ["DAU", "MAU", "stickiness", "active users"],
    category: "UX Research",
    description:
      "Intensity of product usage — the engagement pillar of Google’s HEART framework.",
    measurement:
      "DAU/MAU ratio, sessions per user, depth of use; defined per product’s natural cadence.",
  },
  {
    id: "retention-churn",
    name: "Retention / Churn Rate",
    aliases: ["churn", "cohort retention", "repeat usage rate"],
    category: "UX Research",
    description:
      "Whether users come back over time — the behavioural outcome that validates product–market fit and UX quality.",
    measurement:
      "Cohort retention curves (D1/D7/D30 or weekly); churn % per period.",
  },
  {
    id: "heart-framework",
    name: "HEART Framework Metrics",
    aliases: ["happiness engagement adoption retention task success", "Google HEART"],
    category: "UX Research",
    description:
      "Google’s framework organizing UX metrics into Happiness, Engagement, Adoption, Retention and Task success — the standard for choosing product UX KPIs.",
    measurement:
      "Goals–Signals–Metrics mapping per HEART dimension; mix of survey and behavioural metrics.",
  },
  {
    id: "accessibility",
    name: "Accessibility",
    aliases: [
      "a11y",
      "WCAG conformance",
      "assistive technology usability",
      "accessible usability scale",
      "AUS",
      "inclusive design",
    ],
    category: "UX Research",
    description:
      "Whether people with disabilities can perceive, operate and understand the product — combining standards conformance with real usability for assistive-technology users.",
    measurement:
      "WCAG 2.2 AA audit (issues by severity / % criteria passed) + usability testing with assistive-technology users (task success, AT-specific errors); perceived accessibility via the Accessible Usability Scale (AUS, 10 items, 0–100).",
  },
  {
    id: "digital-literacy",
    name: "Digital Literacy",
    aliases: [
      "digital skills",
      "DigComp",
      "internet skills",
      "digital confidence",
      "tech savviness",
    ],
    category: "UX Research",
    description:
      "A person's ability to use digital devices and services effectively and safely — a key moderator of digital adoption and a segmentation staple in digital-channel research.",
    measurement:
      "Activity-based skills battery (Eurostat/DigComp areas: information, communication, content creation, safety, problem solving) → basic / above-basic classification; plus digital self-efficacy scale.",
  },

  // ── Banking & Payments ───────────────────────────────────────────────────
  // Note: behavioural classifiers (banked status, product holding, tenure,
  // multi-banking) are deliberately excluded — they are screening/profiling
  // variables, not evaluative indicators.
  {
    id: "main-bank-share",
    name: "Main Bank Share",
    aliases: ["MFI", "main financial institution", "primary bank", "salary domiciliation"],
    category: "Banking & Payments",
    description:
      "Share of the market naming the bank as their main bank — the central relational market-share KPI in banking trackers (the banking BUMO).",
    measurement:
      "“Which bank do you consider your main bank?” — % naming the brand; salary domiciliation as behavioural proxy.",
  },
  {
    id: "bank-switching-intent",
    name: "Bank Switching Intent",
    aliases: ["intention to switch bank", "churn intent", "likelihood to leave"],
    category: "Banking & Payments",
    description:
      "Stated likelihood of changing the main bank — the early-warning churn KPI in a category famous for inertia.",
    measurement:
      "5-point likelihood of switching main bank in next 12 months, % T2B; trended across waves.",
  },
  {
    id: "switching-triggers-barriers",
    name: "Switching Triggers & Barriers",
    aliases: ["reasons to switch", "switching friction", "inertia drivers"],
    category: "Banking & Payments",
    description:
      "What would prompt a main-bank switch (fees, service failure, better offer) and what blocks it (perceived hassle, direct debits, habit).",
    measurement:
      "Trigger and barrier batteries (pre-coded + open) among potential switchers and stayers; % citing each.",
  },
  {
    id: "cross-sell-intent",
    name: "Cross-Sell / Deepening Intent",
    aliases: ["next product intent", "first choice for next product", "relationship deepening"],
    category: "Banking & Payments",
    description:
      "Whether the customer would take their next financial product from their current bank or shop elsewhere — the attitudinal cross-sell KPI.",
    measurement:
      "“Where would you go first for [product]?” — % choosing current main bank vs. competitors.",
  },
  {
    id: "consolidation-intent",
    name: "Consolidation Intent",
    aliases: ["consolidate accounts", "single bank intention"],
    category: "Banking & Payments",
    description:
      "Intention to gather products from several banks into a single relationship — signals deepening potential or vulnerability.",
    measurement:
      "5-point consolidation likelihood + which bank would win the consolidated relationship.",
  },
  {
    id: "product-purchase-pipeline",
    name: "Financial Product Purchase Pipeline (Next 12M)",
    aliases: ["intent to open", "planned products", "purchase pipeline"],
    category: "Banking & Payments",
    description:
      "Which financial products the consumer plans to take out in the next 12 months — sizes near-term demand by product line.",
    measurement:
      "Pick-any across product list with intent horizon; % planning each product, by current bank vs. open market.",
  },
  {
    id: "onboarding-completion",
    name: "Account Opening / Onboarding Completion",
    aliases: ["digital onboarding", "application abandonment", "drop-out"],
    category: "Banking & Payments",
    description:
      "Completion vs. abandonment of the account-opening journey (especially digital) and the reasons for dropping out.",
    measurement:
      "Funnel completion % (analytics) + claimed abandonment reasons; ease-of-opening rating among recent openers.",
  },
  {
    id: "digital-banking-adoption",
    name: "Digital Banking Adoption & Frequency",
    aliases: ["mobile banking usage", "internet banking", "digital-only customers"],
    category: "Banking & Payments",
    description:
      "Penetration and intensity of mobile/internet banking use; share of customers who are digital-only vs. branch-reliant.",
    measurement:
      "Adoption % + frequency of use per channel; segmentation into digital-only / hybrid / branch-reliant.",
  },
  {
    id: "banking-channel-mix",
    name: "Banking Channel Mix",
    aliases: ["branch vs digital", "channel preference", "branch reliance"],
    category: "Banking & Payments",
    description:
      "Which banking operations are done through which channel (app, web, branch, call center, ATM) and why those channels are chosen.",
    measurement:
      "Operation × channel grid; channel preference and drivers per operation type.",
  },
  {
    id: "payment-method-usage",
    name: "Payment Method Usage",
    aliases: ["cash vs card", "contactless", "mobile wallet", "P2P payments"],
    category: "Banking & Payments",
    description:
      "Mix of payment methods used (cash, card, contactless, mobile wallet, P2P transfers) and their share of transactions by context.",
    measurement:
      "Method pick-any + share of last N transactions by method and occasion (in-store, online, person-to-person).",
  },
  {
    id: "fintech-usage",
    name: "Fintech / Neobank Usage & Propensity",
    aliases: ["neobank", "challenger bank", "openness to fintech"],
    category: "Banking & Payments",
    description:
      "Use of and openness to fintech/neobank alternatives, and which jobs they capture from incumbent banks.",
    measurement:
      "Usage % by player + role in wallet (main vs. secondary) + likelihood to try, 5-point T2B.",
  },
  {
    id: "bnpl-usage",
    name: "BNPL Usage & Attitudes",
    aliases: ["buy now pay later", "installments", "deferred payment"],
    category: "Banking & Payments",
    description:
      "Adoption of buy-now-pay-later and attitudes toward it vs. classic credit — a fast-moving substitution threat to card lending.",
    measurement:
      "Usage incidence + frequency + attitudinal battery vs. credit card / personal loan alternatives.",
  },
  {
    id: "trust-in-banks",
    name: "Trust in Banks / Financial System",
    aliases: ["sector trust", "trust in financial institutions"],
    category: "Banking & Payments",
    description:
      "Trust in banks as institutions — distinct from individual brand trust; the sector carries its own structural trust deficit.",
    measurement:
      "Sector-level trust scale (banks, insurers, fintechs, regulator), % T2B; trended (Edelman-style).",
  },
  {
    id: "fee-transparency",
    name: "Fee Transparency & Fairness Perception",
    aliases: ["hidden fees", "fair pricing", "commission perception"],
    category: "Banking & Payments",
    description:
      "Whether customers feel the bank is transparent and fair about fees — a major NPS driver and switching trigger in banking.",
    measurement:
      "Agreement battery (“fees are clear”, “I’m not surprised by charges”, “fair value”), % T2B.",
  },
  {
    id: "perceived-security",
    name: "Perceived Security & Fraud Concern",
    aliases: ["safety of money", "data security", "fear of fraud"],
    category: "Banking & Payments",
    description:
      "Confidence that money and data are safe, and level of fraud concern — a top barrier to digital banking and payments adoption.",
    measurement:
      "Security confidence scale per channel + fraud concern battery; % citing security as barrier.",
  },

  // ── Financial Needs & Wellbeing ──────────────────────────────────────────
  {
    id: "financial-wellbeing",
    name: "Financial Well-Being Score",
    aliases: ["CFPB scale", "financial health", "financial wellness"],
    category: "Financial Needs & Wellbeing",
    description:
      "Overall sense of financial security and freedom of choice, now and for the future — the gold standard is the CFPB Financial Well-Being Scale.",
    measurement:
      "CFPB scale (10 items, or 5-item short form), IRT-scored 0–100; benchmarked by segment.",
  },
  {
    id: "financial-literacy",
    name: "Financial Literacy",
    aliases: ["Big Three", "Lusardi-Mitchell", "OECD INFE", "financial knowledge"],
    category: "Financial Needs & Wellbeing",
    description:
      "Objective financial knowledge. Gold standard: the Lusardi–Mitchell “Big Three” (compound interest, inflation, diversification) or the OECD/INFE score.",
    measurement:
      "Big Three correct-answer count (0–3) or OECD/INFE knowledge–behaviour–attitude composite.",
  },
  {
    id: "savings-emergency-fund",
    name: "Savings Behaviour & Emergency Fund Coverage",
    aliases: ["regular saving", "rainy day fund", "financial resilience", "months of expenses"],
    category: "Financial Needs & Wellbeing",
    description:
      "Whether and how regularly people save, and how many months of expenses their reserve would cover — the classic financial-resilience indicator.",
    measurement:
      "Saving incidence & regularity + “How long could you cover expenses if income stopped?” (months bands).",
  },
  {
    id: "budgeting-style",
    name: "Budgeting / Money Management Style",
    aliases: ["money management", "tracking spending", "planning behaviour"],
    category: "Financial Needs & Wellbeing",
    description:
      "How people plan, track and control their money — from active budgeters to avoiders; feeds money-personality segmentation.",
    measurement:
      "Behavioural battery (tracking, planning horizon, tools used) factor-analysed into styles.",
  },
  {
    id: "financial-goals",
    name: "Financial Goals & Life Events",
    aliases: ["life events", "saving goals", "financial priorities"],
    category: "Financial Needs & Wellbeing",
    description:
      "The goals people are working toward (home, education, retirement) and life events triggering financial needs — anchors needs-based selling.",
    measurement:
      "Goal pick-any with priority ranking + upcoming life events (next 1–3 years).",
  },
  {
    id: "attitude-to-credit",
    name: "Attitude to Credit / Borrowing Propensity",
    aliases: ["credit aversion", "comfort with debt", "borrowing attitudes"],
    category: "Financial Needs & Wellbeing",
    description:
      "Comfort with borrowing — from “credit is a useful tool” to “debt is a trap”; predicts credit product receptivity.",
    measurement:
      "Attitudinal agreement battery (5-point Likert), segmented into credit-friendly vs. credit-averse.",
  },
  {
    id: "debt-burden",
    name: "Debt Burden / Over-Indebtedness",
    aliases: ["DTI", "debt stress", "payment difficulty"],
    category: "Financial Needs & Wellbeing",
    description:
      "Weight of debt repayments in income and signs of over-indebtedness (missed payments, borrowing to repay).",
    measurement:
      "Claimed repayments-to-income bands + difficulty indicators (% struggling, % missed payment in 12M).",
  },
  {
    id: "risk-tolerance",
    name: "Investment Risk Tolerance",
    aliases: ["risk appetite", "risk profile", "MiFID profiling"],
    category: "Financial Needs & Wellbeing",
    description:
      "Willingness to accept investment risk for return — the core input to investor profiling and product suitability.",
    measurement:
      "MiFID-style risk questionnaire (scenario trade-offs); classification conservative → aggressive.",
  },
  {
    id: "retirement-preparedness",
    name: "Retirement Preparedness",
    aliases: ["pension readiness", "retirement confidence"],
    category: "Financial Needs & Wellbeing",
    description:
      "How prepared and confident people feel about funding retirement, and what they are actually doing about it.",
    measurement:
      "Preparedness self-rating + actual provision (pillar II/III, private savings) + confidence scale.",
  },
  {
    id: "protection-gap",
    name: "Insurance / Protection Gap",
    aliases: ["underinsurance", "coverage gap", "protection needs"],
    category: "Financial Needs & Wellbeing",
    description:
      "Mismatch between protection needs (life, health, property, income) and actual coverage — sizes the underinsurance opportunity.",
    measurement:
      "Coverage pick-any vs. need/dependents profile; % with unmet protection needs per risk.",
  },
  {
    id: "financial-anxiety",
    name: "Financial Confidence & Anxiety",
    aliases: ["financial stress", "money worries", "confidence in decisions"],
    category: "Financial Needs & Wellbeing",
    description:
      "Confidence in one’s own financial decisions and the level of money-related stress — shapes openness to advice and digital tools.",
    measurement:
      "Confidence and anxiety scales (5-point), % T2B; often paired with financial well-being score.",
  },
  {
    id: "advice-seeking",
    name: "Financial Advice-Seeking Behaviour",
    aliases: ["information sources", "advisor usage", "robo-advice", "who do you ask"],
    category: "Financial Needs & Wellbeing",
    description:
      "Where people turn before financial decisions — banker, advisor, family, comparison sites, social media, robo-advice — and how much they trust each source.",
    measurement:
      "Source pick-any per decision type + trust rating per source.",
  },
];

/** Indicators with their qualitative & quantitative detail merged in. */
export const INDICATORS: Indicator[] = BASE_INDICATORS.map((indicator) => {
  const detail = INDICATOR_DETAIL[indicator.id];
  return {
    ...indicator,
    ...detail,
    // The 5 originally-validated items live in INDICATOR_DETAIL and win;
    // every other indicator's items come from INDICATOR_SURVEY.
    surveyItems: detail?.surveyItems ?? INDICATOR_SURVEY[indicator.id],
  };
});
