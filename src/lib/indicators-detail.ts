/**
 * Qualitative interview questions and quantitative survey items for each
 * indicator, keyed by indicator id. Merged into INDICATORS in `./indicators`.
 *
 * - `qualIntent` + `qualQuestions`: gold-standard qualitative interview battery
 *   (critical incident, laddering, projective, think-aloud).
 * - `surveyItems`: structured quantitative items (authored for a sample of
 *   indicators so far; the rest carry the prose `measurement` only).
 */

import type { SurveyItem } from "./indicators";

export interface IndicatorDetail {
  qualIntent: string;
  qualQuestions: string[];
  surveyItems?: SurveyItem[];
}

export const INDICATOR_DETAIL: Record<string, IndicatorDetail> = {
  // ── Brand Health & Equity ────────────────────────────────────────────────
  "tom-awareness": {
    qualIntent:
      "Surface what spontaneously owns the top mental shelf in the category and the felt reasons it surfaces first, not just which name is fastest.",
    qualQuestions: [
      "When I say [category], what's the very first brand that pops into your head — and what made that one jump out before any others?",
      "Walk me through where that brand shows up in your everyday life so it stays front of mind.",
      "Think back to the last time you needed something in this category — which name came to you first, and where were you when it did?",
      "If you were telling a friend who'd never heard of this category which brands exist, who would you mention first, second, third?",
      "What do you think it is about that first brand that makes it stick in your head over the others?",
    ],
  },
  "spontaneous-awareness": {
    qualIntent:
      "Map the full set of brands a person can pull from memory unprompted, and probe how vivid or thin each memory trace feels.",
    qualQuestions: [
      "Without me showing you anything, name every brand in this category you can think of — take your time, keep going until you run dry.",
      "For each one you named, tell me what comes to mind when you say it — a colour, a feeling, a place you've seen it.",
      "Are there any you've heard of but couldn't quite name just now — what was on the tip of your tongue?",
      "Which of those brands feel like ones you actually know versus ones you've just heard floating around?",
      "Where do you reckon you first picked up most of these names — ads, friends, shops, somewhere else?",
    ],
  },
  "aided-awareness": {
    qualIntent:
      "Test recognition depth when cued, and separate genuine familiarity from empty 'I've-seen-the-logo' recognition.",
    qualQuestions: [
      "Here's a list of brands in this category — go down it and tell me which ones you recognise, and which are totally new to you.",
      "For the ones you recognise, what do you actually know about them beyond the name or logo?",
      "Are there any here that surprised you — ones you'd forgotten existed or didn't realise were in this category?",
      "Pick one you recognise but have never used — what's your impression of it, and where did that impression come from?",
      "Looking at this list, which names feel familiar in a warm way versus familiar but a bit of a blank?",
    ],
    surveyItems: [
      {
        type: "multi",
        stem: "Which of these brands of [category] have you heard of, even if only by name?",
        options: [
          "[Client brand]",
          "[Competitor 1]",
          "[Competitor 2]",
          "[Competitor 3]",
          "…",
          "None of these",
        ],
        base: "All respondents",
        randomize: true,
        analysis:
          "% selecting each brand = aided awareness; base for downstream consideration/usage funnel.",
        placement:
          "Awareness block, early — but AFTER spontaneous/unaided awareness (never show the list before unaided, or you contaminate recall).",
        notes:
          "'None of these' exclusive; randomize order to kill order bias; keep the same brand list across waves for tracking.",
      },
    ],
  },
  "brand-salience": {
    qualIntent:
      "Capture mental availability across real buying situations and category entry points, not abstract recall.",
    qualQuestions: [
      "Tell me about the different moments or occasions when this category comes up for you — which brand comes to mind in each?",
      "When you're [specific situation, e.g. grabbing something quick / planning ahead / treating yourself], which brand springs up first?",
      "Are there times or places where a brand pops into your head that wouldn't usually? Walk me through one.",
      "If I named a need — say [need/occasion] — which brand instantly fits, and why that one?",
      "Which brands feel like they're 'everywhere' in your head, ready whenever the category comes up, versus ones you have to dig for?",
    ],
  },
  "brand-familiarity": {
    qualIntent:
      "Gauge how deeply and confidently someone feels they know the brand, and where that sense of knowing comes from.",
    qualQuestions: [
      "How well would you say you know [brand] — like a close acquaintance, a passing face, or somewhere in between?",
      "Tell me everything you feel you know about [brand] — how it started, what it stands for, who runs it, whatever comes to mind.",
      "Where has most of what you know about [brand] come from — using it, ads, people, news?",
      "Is there anything about [brand] you're curious about or feel you don't really understand?",
      "If a friend asked you 'what's [brand] all about?', how would you sum it up for them?",
    ],
  },
  "brand-consideration": {
    qualIntent:
      "Understand which brands make the shortlist of 'ones I'd genuinely think about buying' and what earns or blocks a spot on it.",
    qualQuestions: [
      "Next time you're buying in this category, which brands would actually be in the running for you — and which wouldn't make the cut?",
      "Tell me about the last time you were choosing in this category — which brands did you weigh up before deciding?",
      "For a brand that's not on your shortlist, what would it have to do to get you to consider it?",
      "What gets a brand onto your 'would think about it' list in the first place — price, reputation, something else?",
      "Is there a brand you'd never rule out, no matter what — and what makes it a safe bet for you?",
    ],
  },
  "brand-preference": {
    qualIntent:
      "Uncover the single brand chosen above all others when everything's equally available, and the deeper reasons via laddering.",
    qualQuestions: [
      "If every brand in this category were sitting in front of you, same price, same availability — which would you reach for, and why that one?",
      "What is it about [preferred brand] that matters to you — and why does that matter? (and what does that get you in the end?)",
      "Tell me about a time you went out of your way, or paid a bit more, to get your preferred brand over an easier option.",
      "If your top choice vanished tomorrow, which would you switch to — and what would you miss most about the first?",
      "What would [preferred brand] have to do to lose its spot at the top for you?",
    ],
  },
  "brand-trial": {
    qualIntent:
      "Reconstruct the first-ever encounter with the brand and what prompted that initial leap from awareness to trying.",
    qualQuestions: [
      "Tell me about the very first time you ever tried [brand] — what was going on, what nudged you to give it a go?",
      "Before that first time, what were you expecting — and did the reality match it?",
      "What made you willing to try it rather than stick with whatever you knew already?",
      "After that first go, what stayed with you — good or bad?",
      "Are there brands in this category you've never tried — what's held you back?",
    ],
  },
  "brand-usage": {
    qualIntent:
      "Understand recency and rhythm of actual use, and distinguish current users from those who've quietly drifted away.",
    qualQuestions: [
      "Walk me through the last time you actually used [brand] — when was it, what was the occasion?",
      "How does [brand] fit into your routine these days — regular thing, now and then, or have you drifted off it?",
      "Compared to a year ago, are you using it more, less, or about the same — what changed?",
      "If you've used it less lately, what's behind that — something it did, or just life moving on?",
      "When you do reach for it now, what's the typical situation that brings you back?",
    ],
  },
  bumo: {
    qualIntent:
      "Identify the genuine main/default brand and the habit, fit, or loyalty that keeps it in the number-one slot.",
    qualQuestions: [
      "Across everything you use in this category, which one do you reach for most — your go-to?",
      "What is it about [main brand] that keeps it as your default rather than something you switch around?",
      "Think about your last handful of purchases in this category — how many were that main brand?",
      "Is your main brand something you actively choose each time, or more just habit at this point?",
      "What would it take for a different brand to bump [main brand] out of that top spot?",
    ],
  },
  "brand-loyalty": {
    qualIntent:
      "Probe genuine commitment and resistance to switching, separating true attachment from inertia or lack of alternatives.",
    qualQuestions: [
      "How would you feel if you walked in and [brand] was sold out — shrug and grab another, or go somewhere else for it?",
      "Tell me about a time you were tempted to switch away from [brand] — what pulled at you, and what did you do?",
      "What keeps you coming back to [brand] — is it the brand itself, or just easier not to change?",
      "If a competitor offered you a clearly better deal, how easily would they win you over?",
      "Imagine [brand] changed something you cared about — what would it take to actually make you leave for good?",
    ],
  },
  "brand-advocacy": {
    qualIntent:
      "Capture genuine willingness to put one's own name behind the brand, and the stories people actually tell others.",
    qualQuestions: [
      "Have you ever recommended [brand] to someone — tell me about that moment, who and why?",
      "When [category] comes up in conversation with friends, what do you find yourself saying about [brand]?",
      "What would it take for you to actively talk someone out of using [brand]?",
      "If a close friend asked whether they should try [brand], what would you honestly tell them?",
      "Is [brand] something you'd happily put your own name behind, or would you keep your distance — why?",
    ],
  },
  "brand-image": {
    qualIntent:
      "Surface the functional and emotional attributes tied to the brand versus rivals, using projective and laddering techniques.",
    qualQuestions: [
      "When you picture [brand], what words, images, or feelings come up — say whatever lands first, don't overthink it.",
      "If [brand] and [competitor] were both people at a party, how would each one act differently?",
      "What does [brand] do well, and what does that say about the kind of brand it is?",
      "Finish this for me: '[Brand] is the sort of brand that ______, but would never ______.'",
      "Where would you place [brand] against its rivals — what's it known for that the others aren't?",
    ],
  },
  "brand-affinity": {
    qualIntent:
      "Emotion and identity; projective techniques (personification) go far deeper than direct questions.",
    qualQuestions: [
      "If [brand] were a person walking into this room, who would they be — how do they dress, talk, treat you?",
      "Tell me about a moment when [brand] felt like it 'got' you, or one when it let you down.",
      "What kind of person do you picture using [brand]? How are they similar to or different from you?",
      "Finish this sentence for me: '[Brand] is the kind of brand that ______.'",
      "If you had to break up with [brand], what would the breakup note say?",
    ],
  },
  "brand-trust": {
    qualIntent:
      "Explore confidence that the brand keeps its promises, where that confidence was built or broken, via critical incidents.",
    qualQuestions: [
      "Tell me about a time [brand] either came through for you exactly as promised, or let you down.",
      "What does [brand] promise you, spoken or unspoken — and how well does it actually keep that promise?",
      "If [brand] made a mistake, how much benefit of the doubt would you give it, and why?",
      "Who or what do you trust to tell you the truth about whether [brand] is any good?",
      "Finish this: 'I trust [brand] to ______, but I'm not so sure about ______.'",
    ],
  },
  "brand-equity-index": {
    qualIntent:
      "Holistically probe whether the brand feels meaningful, different, and salient — the three pillars of overall brand strength.",
    qualQuestions: [
      "In your own words, what does [brand] mean to you — does it matter to your life, or could you take it or leave it?",
      "What makes [brand] different from everything else in the category — or does it blur in with the rest?",
      "When the category comes up, how quickly and surely does [brand] come to mind compared to others?",
      "If [brand] disappeared tomorrow, what exactly would be missing — would you notice, would you care?",
      "Put together — does [brand] feel like a strong, standout name, or just one of many — and what tips it that way?",
    ],
  },
  "brand-funnel-conversion": {
    qualIntent:
      "Trace the personal journey from awareness through to loyalty and pinpoint where attachment leaks or stalls.",
    qualQuestions: [
      "Walk me through your whole history with [brand] — from first hearing of it, to trying it, to where you stand now.",
      "At what point did things either click into a habit or start to fade — what happened around then?",
      "You know [brand] but [haven't tried it / tried it but moved on] — what's the gap that's stopped it going further?",
      "Where in that journey did [brand] nearly lose you, and what kept you or pushed you away?",
      "If you've stalled at one stage, what would it take to move you to the next — to try it, stick with it, or champion it?",
    ],
  },
  "share-of-voice": {
    qualIntent:
      "Capture perceived communication and advertising presence relative to rivals, as felt rather than measured.",
    qualQuestions: [
      "In this category, which brands feel like they're constantly talking to you — ads, posts, sponsorships, wherever?",
      "When did you last notice [brand] out in the world — where was it, what was it doing?",
      "Compared to its rivals, does [brand] feel loud and everywhere, or quiet and easy to miss?",
      "Whose advertising or presence sticks with you most in this category — and what makes it cut through?",
      "If a brand went silent for a year, would you notice [brand]'s absence — or has it already faded into the background for you?",
    ],
  },

  // ── Usage & Attitudes (U&A) ──────────────────────────────────────────────
  "category-penetration": {
    qualIntent:
      "Understand whether the category has any role in their life at all, and what fundamental job it does (or why it's absent) — not just a yes/no usage flag.",
    qualQuestions: [
      "Walk me through where something like [category] fits into your life right now — or tell me if it really doesn't.",
      "Think back to how [category] first showed up for you — how did you come to start using it (or why never)?",
      "If [category] disappeared tomorrow, what would actually change for you? What would you do instead?",
      "When you reach for [category], what's the real job you're hiring it to do in that moment?",
      "Are there people around you who use it very differently than you — or not at all? What's different about them?",
    ],
  },
  "usage-frequency": {
    qualIntent:
      "Surface the real rhythm of use and the triggers/brakes that speed it up or slow it down, rather than an average-per-week number.",
    qualQuestions: [
      "Take me through a typical week — where does [category] naturally come up, and how often?",
      "When was the last time you bought/used it? And before that? Help me see the gap between them.",
      "What tends to make you reach for it more than usual? And what slows you right down?",
      "How do you know it's time to buy or use it again — what's the cue?",
      "Has the pace changed over the last year or two? What was going on when it shifted?",
    ],
  },
  "usage-occasions": {
    qualIntent:
      "Reconstruct one concrete, recent occasion in vivid detail to map the when/where/with-whom/why, instead of generic 'occasions'.",
    qualQuestions: [
      "Tell me about the most recent time you used [category] — walk me through that moment from the start.",
      "Where exactly were you, what time was it, and who else was around?",
      "What was going on just before that made this the right moment for it?",
      "How would that occasion be different on a weekend versus a weekday, or alone versus with others?",
      "Are there moments where you'd never use it — where it just wouldn't fit? Tell me about one.",
    ],
  },
  "weight-of-usage": {
    qualIntent:
      "Get at the self-perceived intensity and the mindset behind being a heavy vs. light user, not just a volume tally.",
    qualQuestions: [
      "If you had to describe yourself as a light, medium, or heavy user of [category], where would you put yourself — and why there?",
      "On a big week for [category], what does that actually look like for you start to finish?",
      "Compared to the people around you, do you think you use more or less? What makes you say that?",
      "What would it take for you to use noticeably more? And what keeps you from cutting back?",
      "Is there a point where you feel you've had 'enough' of it? How do you know you've hit it?",
    ],
  },
  "brand-repertoire": {
    qualIntent:
      "Map the working set of brands they genuinely alternate between and the logic behind rotating, versus naming a single favorite.",
    qualQuestions: [
      "Which brands are actually in play for you in this category right now? Lay them all out for me.",
      "For each of those, when is that the one you reach for? What's its moment?",
      "When you swap from one to another, what's usually behind the switch?",
      "Is there a brand you keep coming back to as a safe default? And one you only use in certain situations?",
      "Are there brands you've deliberately ruled out of the rotation? What put them out?",
    ],
  },
  "share-of-wallet": {
    qualIntent:
      "Understand how they divide their category spend/usage across brands and the reasoning behind the split, told through real recent behavior.",
    qualQuestions: [
      "Out of the last 10 times you bought/used this category, roughly how did it split across brands? Talk me through it.",
      "For the brand you use most — what's keeping it the biggest slice for you?",
      "The times you went with a different one, what pulled you that way that day?",
      "If you had to give one brand a bigger share of your spend, which would it be and why?",
      "What would it take for your current main brand to lose ground with you?",
    ],
  },
  "habits-practices": {
    qualIntent:
      "Observe how the product is really used in practice — the ritual, prep, pairings, and any off-label or workaround uses — through a step-by-step replay.",
    qualQuestions: [
      "Walk me through exactly how you use it, step by step, like you're showing me over your shoulder.",
      "Is there a routine or ritual around it? When did that settle into the way you do it now?",
      "What do you tend to pair it with, or use alongside it?",
      "Have you found your own way of using it that's a bit different from how it's 'meant' to be used?",
      "If I watched you do this for a week, what would surprise me about how you actually do it?",
    ],
  },
  "category-attitudes": {
    qualIntent:
      "Surface beliefs, emotional involvement, and personal orientation toward the category — how much it matters to them and what it stands for.",
    qualQuestions: [
      "When you hear the words '[category]', what's the first thing that comes to mind — thoughts, feelings, anything?",
      "How much does this category actually matter to you compared with other things you spend on?",
      "Are there things people believe about [category] that you strongly agree or disagree with?",
      "Tell me about a time the category let you down or really delivered — how did that sit with you?",
      "If [category] were a type of person, who would they be? Why that?",
    ],
  },
  "needs-motivations": {
    qualIntent:
      "Uncover the underlying functional and emotional jobs-to-be-done and ladder from attribute to deeper personal value.",
    qualQuestions: [
      "When you choose to use [category], what are you really trying to get done or feel?",
      "Think of a time it hit the spot perfectly — what need was it meeting right then?",
      "You mentioned [benefit] — and why does that matter to you? (keep laddering: …and what does that give you?)",
      "Beyond the obvious practical stuff, is there anything emotional you get from it?",
      "If this category could solve one frustration in your life completely, what would you want it to fix?",
    ],
  },
  "jobs-to-be-done": {
    qualIntent:
      "Uncover the real progress the customer is trying to make and the circumstances that trigger it — the functional, emotional and social job they hire the product to do — by reconstructing a real recent switch and the four forces around it.",
    qualQuestions: [
      "Take me back to the moment you first realised you needed something like this. What was happening in your life or your day right then?",
      "What were you using or doing to get this done before — and what started to feel broken about it?",
      "When you started looking, what was the progress you were really trying to make? What would 'better' have looked like?",
      "Beyond getting the task done, how did you want to feel about it — and how did you want others to see you? (the emotional and social side of the job)",
      "What made you hesitate about switching to it? What nearly held you back, or pulled you to stick with what you already had?",
      "When you finally chose it, what was the one thing that tipped you over — and how did you know it would do the job?",
      "Now that you've lived with it a while, where does it still fall short of the job you hired it for?",
    ],
  },
  "path-to-purchase": {
    qualIntent:
      "Reconstruct one recent real purchase end-to-end to capture the trigger, sources consulted, influencers/deciders, and decisive criteria.",
    qualQuestions: [
      "Take me back to the last time you bought this — what first set the decision in motion?",
      "Between that first thought and actually buying, what did you do — look anything up, ask anyone?",
      "Who else had a say, even quietly? Whose opinion mattered?",
      "When it came down to the final choice, what tipped it? What nearly made you pick differently?",
      "Looking back, was there a moment you almost didn't buy at all? What was that about?",
    ],
  },
  "channel-usage": {
    qualIntent:
      "Understand where they buy and the real reasons those channels win for this category, grounded in their last few purchases.",
    qualQuestions: [
      "Where did you buy it the last couple of times? Walk me through choosing that place.",
      "What does that channel get right for you that others don't?",
      "Are there places you'd never buy this category? What's off about them for you?",
      "When would you switch to a different channel — online vs. in-store, one shop vs. another?",
      "If your usual place wasn't an option tomorrow, where would you go instead, and how would that feel?",
    ],
  },
  "media-consumption": {
    qualIntent:
      "Map which media and platforms genuinely fill their day and how intensively, reconstructed from a real recent day rather than claimed habits.",
    qualQuestions: [
      "Walk me through yesterday from waking up — where did screens, audio, or media come into it?",
      "Which platforms or channels do you find yourself on without even thinking? Which are deliberate?",
      "Where do you go when you want to properly switch off and be entertained?",
      "When something about [category] reaches you, where does it usually come from?",
      "If you lost access to one platform tomorrow, which would you miss most? Why that one?",
    ],
  },
  "lapsing-churn-reasons": {
    qualIntent:
      "Reconstruct the falling-out — what specifically changed and the final straw that ended use of the brand/category — not just a stated reason.",
    qualQuestions: [
      "There was a time you used [brand/category] and now you don't — take me back to when it started to slip.",
      "Was there a specific moment or last straw, or did it just quietly fade? Tell me about it.",
      "What were you hoping for that it stopped giving you?",
      "What are you doing instead now? How does that compare to before?",
      "What, realistically, would it take to win you back — and is that even possible?",
    ],
  },

  // ── Purchase Behaviour & Pricing ─────────────────────────────────────────
  "purchase-intention": {
    qualIntent:
      "Stated intent is cheap; surface the concrete conditions, timing, and triggers that would actually move someone from 'I'd probably buy' to handing over money.",
    qualQuestions: [
      "Where would you say you are right now with [product] — just curious, seriously considering, or pretty much decided? What's keeping you there?",
      "Picture yourself actually buying it — when does that happen, and what's going on around you at that moment?",
      "What would need to fall into place for you to buy it sooner rather than 'someday'?",
      "You said you'd likely buy — what's the gap between 'likely' and actually doing it?",
      "Think of something you recently said you'd buy but haven't yet. What's holding it up?",
    ],
    surveyItems: [
      {
        type: "scale",
        stem: "How likely would you be to buy [product] the next time you are shopping for [category]?",
        scalePoints: [
          "Definitely would buy",
          "Probably would buy",
          "Might or might not buy",
          "Probably would not buy",
          "Definitely would not buy",
        ],
        base: "All respondents (or: all exposed to the concept)",
        randomize: false,
        analysis:
          "% Top-2-Box (Definitely + Probably); report % 'Definitely' separately; benchmark vs. category/concept norms. In volumetric models, deflate (e.g. 80% of Definitely + 30% of Probably).",
        placement:
          "After concept exposure / brand-evaluation block; before pricing.",
        notes:
          "These anchors are the BASES/Nielsen standard. Don't collapse to yes/no. Keep scale direction consistent with other scales in the survey.",
      },
    ],
  },
  "purchase-triggers": {
    qualIntent:
      "People name rational criteria but buy on a specific trigger; use last-purchase critical incident plus laddering to reach the underlying need behind the stated reason.",
    qualQuestions: [
      "Take me back to the last time you bought [product]. What set it off — what was happening that day?",
      "Of everything you weighed up, what was the one thing that tipped it?",
      "Why did that particular thing matter to you? And why does that matter? (laddering)",
      "When you compared options, what made you rule the others out?",
      "If a friend asked 'why that one?', what would you tell them — and what would you leave out?",
    ],
  },
  "purchase-barriers": {
    qualIntent:
      "Real barriers are often embarrassing or rationalized; use critical incident + projective to bypass 'correct' answers.",
    qualQuestions: [
      "Walk me through the last time you considered [brand/product] but didn't go through with it. What happened?",
      "At what exact moment did you hesitate or back off?",
      "Some people say they'd never buy [product] — what do you imagine their reasons are? (third-person projective)",
      "What would have had to be true for you to actually buy it that day?",
      "Is there anything about it that just doesn't sit right with you, even if it's hard to put into words?",
    ],
  },
  "trial-intent": {
    qualIntent:
      "First purchase is governed by perceived risk; surface what makes trying feel safe and what the imagined downside of a 'wrong' first try would be.",
    qualQuestions: [
      "This would be your first time with [product] — what goes through your mind when you imagine trying it?",
      "What feels uncertain or risky about a first try, even slightly?",
      "Think of the last new product you tried for the first time. What gave you the nudge to finally do it?",
      "What would make a first try feel low-risk — like you couldn't really lose?",
      "Some people hesitate to try something new like this — what do you think holds them back? (projective)",
      "If it didn't work out for you, what would that cost you — money, time, looking foolish?",
    ],
  },
  "repeat-purchase-intent": {
    qualIntent:
      "Repeat is driven by whether lived experience met the pre-purchase promise; surface the gap between expectation and reality and what would make them default to it again.",
    qualQuestions: [
      "Now that you've used it, how did the actual experience line up with what you expected going in?",
      "Would you reach for it again next time? What makes you say that?",
      "Tell me about a moment using it that either won you over or let you down.",
      "What would have to slip for you to switch to something else next time?",
      "When the moment to rebuy comes, do you think you'd just do it automatically, or stop and reconsider? Why?",
    ],
  },
  "willingness-to-pay": {
    qualIntent:
      "The number matters less than the reference points and reasoning behind it; surface what they're comparing against and what makes a price feel justified rather than just 'high' or 'low'.",
    qualQuestions: [
      "When you think about what [product] should cost, what's the first thing you compare it to?",
      "Talk me through what would make a price feel completely fair to you for this — and what would feel like a stretch.",
      "Imagine you saw the price and instantly thought 'worth it'. What would that price be wrapped up with — what are you getting?",
      "Some people would happily pay well over the odds for this; what do you think they're really paying for? (projective on premium)",
      "Where's the point where you'd stop and think 'no, that's too much' — and what tips you over that line?",
      "If it cost more than you expected, what story would you tell yourself to justify it — or to walk away?",
    ],
  },
  "van-westendorp": {
    qualIntent:
      "Explore the four price thresholds as meaning rather than numbers — especially the 'too cheap = suspicious' floor where low price signals poor quality.",
    qualQuestions: [
      "At what price would [product] start to feel expensive to you — not impossible, just 'I'd have to think about it'? What's behind that feeling?",
      "And at what price would it feel so expensive you'd rule it out completely? What does that price say to you?",
      "Now the other way: at what price would it feel like a genuine bargain — a good deal?",
      "If it were really cheap — cheaper than everything around it — what would go through your mind? (surfacing 'too cheap = suspicious')",
      "When something in this category is priced suspiciously low, what do you assume has been cut or compromised?",
      "Where's the sweet spot where the price just feels right — not cheap, not dear — and what makes that spot feel right?",
    ],
    surveyItems: [
      {
        type: "price_psm",
        stem: "Imagining you were going to buy [product], at what price would you say it is…",
        subStems: [
          "…so expensive you would not consider buying it? (Too expensive)",
          "…starting to get expensive, but you'd still consider it? (Expensive / high side)",
          "…a bargain, a great buy for the money? (Cheap / good value)",
          "…so cheap you would question its quality? (Too cheap)",
        ],
        base: "All respondents (or category buyers)",
        analysis:
          "Cumulative curves → intersections give Point of Marginal Cheapness (PMC), Point of Marginal Expensiveness (PME), Optimal Price Point (OPP), Indifference Price Point (IPP); acceptable range between PMC–PME.",
        placement:
          "Pricing block, late in the survey, after the concept/product is fully understood.",
        notes:
          "All four questions required; open numeric with currency mask; sanity-check logical ordering (too cheap < cheap < expensive < too expensive).",
      },
    ],
  },
  "gabor-granger": {
    qualIntent:
      "Find the psychological tipping points where willingness flips, and the meaning of crossing each threshold, rather than mapping a smooth demand curve.",
    qualQuestions: [
      "Say the price went up a bit from where it is now — at what point would you start to hesitate?",
      "What's the price where you'd flip from 'yes' to 'I'll wait' or 'I'll look elsewhere'? What changes for you right there?",
      "Now if it dropped — is there a price where you'd buy more, stock up, or buy it without thinking?",
      "When a price crosses your line, is it the money itself or what the increase says about the product? (meaning of the threshold)",
      "Think of a time a price rise made you abandon something you usually buy. What was the final straw?",
      "Are there prices that just feel like natural 'lines' to you — round numbers or thresholds you won't cross?",
    ],
  },
  "value-for-money": {
    qualIntent:
      "Surface how they reconcile price against quality — whether the offer feels 'worth it' — and what specifically they weigh on each side of that trade-off.",
    qualQuestions: [
      "When you think about [product] at its price, does it feel worth it? Talk me through how you land on that.",
      "What are you actually weighing up — what's on the 'I'm getting' side versus the 'I'm paying' side?",
      "Tell me about something you bought that felt like great value, and something that felt like a rip-off. What was the difference?",
      "For this product, where does the money seem to go — and does that sit right with you?",
      "Some people say [product] is overpriced for what it is; what do you think they're missing, or what have they got right? (projective)",
      "If the price stayed the same but one thing changed, what would tip it from 'worth it' to 'not worth it'?",
    ],
  },
  "promo-responsiveness": {
    qualIntent:
      "Distinguish promotions that genuinely shift behaviour from those that just reward planned purchases; surface deal-proneness and the line between 'good deal' and 'feels like a gimmick'.",
    qualQuestions: [
      "Tell me about the last time a deal or discount actually changed what you bought or when you bought it. What was it?",
      "Did the offer make you buy something you wouldn't have otherwise, or just sweeten something you were getting anyway?",
      "What kind of promotion actually grabs you — and what kind makes you roll your eyes? (deal proneness vs gimmick)",
      "When you see a big discount, what's your gut reaction — 'great' or 'what's the catch'?",
      "Some people plan their whole shop around offers; others barely notice them. Where do you sit, and why?",
      "After a deal ends, would you still pay full price for it — or did the discount become the only reason you'd buy?",
    ],
  },

  // ── Concept & Product Testing ────────────────────────────────────────────
  "overall-liking": {
    qualIntent:
      "Capture the unfiltered gut verdict and the single dominant driver behind it, before the respondent builds a 'reasonable' justification.",
    qualQuestions: [
      "Before you say anything else — what's your very first, gut reaction to this?",
      "If you had to land on one word to sum up how this makes you feel, what would it be? Why that word?",
      "What's the main thing driving that reaction for you?",
      "Picture this showing up in your life next week — does that feel like a good thing, a neutral thing, or a 'no thanks'? Walk me through why.",
      "What, if anything, is holding you back from being more enthusiastic about it?",
    ],
  },
  "likes-dislikes": {
    qualIntent:
      "Move past 'I like it / I don't' — tie reactions to a concrete attribute and then to a personal consequence (laddering).",
    qualQuestions: [
      "Tell me your honest first reaction to this — don't filter it.",
      "What's the one thing here you'd fight to keep? And the one thing you'd throw out?",
      "You said you liked [X] — what does [X] actually do for you? (probe up the ladder: …and why does that matter to you?)",
      "Is there anything here that confuses you or feels 'not for me'? Tell me about that.",
      "If you were describing this to a friend who'd never seen it, what would you warn them about?",
    ],
  },
  uniqueness: {
    qualIntent:
      "Surface whether the 'newness' is genuinely perceived and meaningful, or just cosmetic — and what specific element carries the difference.",
    qualQuestions: [
      "Does this feel new to you, or like something you've seen before? Tell me what's behind that.",
      "What's already out there that this reminds you of? How is this the same, and how is it different?",
      "Point to the one thing here that you couldn't get from anything else you use today.",
      "If that different part disappeared, would you even notice? Would you care?",
      "Is being different here actually a good thing for you, or does it not really matter? Why?",
    ],
  },
  relevance: {
    qualIntent:
      "Establish whether this connects to a real, existing need in the respondent's life — not a hypothetical one the concept invents.",
    qualQuestions: [
      "Thinking about your own life, where would something like this actually fit?",
      "When was the last time you had the problem this is trying to solve? Tell me about that moment.",
      "Is this solving something you genuinely deal with, or is it more 'nice but not really my issue'? Be honest.",
      "Who do you picture this being made for? Does that person feel like you, or someone else?",
      "If this didn't exist, how would you handle this today? What do you use or do instead?",
    ],
  },
  believability: {
    qualIntent:
      "Test which specific claims land as credible versus 'too good to be true', and whether the brand has the permission to make them.",
    qualQuestions: [
      "What here do you believe straight away, and what makes you raise an eyebrow?",
      "You seemed unsure about [claim] — what would it take for you to actually believe that?",
      "Does this feel like something this brand could genuinely pull off? Why or why not?",
      "Is there anything that sounds overpromised or too good to be true to you? Which part?",
      "If a friend said 'that can't be real', what would you say back?",
    ],
  },
  comprehension: {
    qualIntent:
      "Confirm the concept is understood as intended by having the respondent reconstruct it themselves, exposing gaps and misreads.",
    qualQuestions: [
      "In your own words, describe back to me what this is and what it does.",
      "If you had to explain this to someone in one sentence, what would you say?",
      "Was there any word, phrase, or part that made you pause or wasn't clear? Show me where.",
      "What do you think this is promising you'll actually get?",
      "Is there anything you found yourself wanting to ask or wishing it explained?",
    ],
  },
  "jar-scales": {
    qualIntent:
      "Locate which specific attributes sit off the ideal level and in which direction, framed as optimization rather than a pass/fail rating.",
    qualQuestions: [
      "Thinking about [attribute] — is there too much, too little, or about right for you? Tell me more.",
      "If you had a dial for [attribute], which way would you turn it, and how far?",
      "What feels perfectly balanced here that you wouldn't touch at all?",
      "Is there anything that's a bit overdone — more than you need or want?",
      "And anything that feels like it's missing or holding back — where you'd want more?",
      "If you could change just one level or amount to make this right for you, what would it be?",
    ],
    surveyItems: [
      {
        type: "jar",
        stem: "Thinking about [product], please tell us about each of the following:",
        scalePoints: [
          "Much too little",
          "Slightly too little",
          "Just about right",
          "Slightly too much",
          "Much too much",
        ],
        attributes: ["Sweetness", "Thickness", "Aroma intensity", "Portion size"],
        base: "Those who tried the product (in-use test)",
        randomize: true,
        analysis:
          "% JAR (middle box) per attribute; PENALTY ANALYSIS — mean drop in overall liking for off-JAR (too much / too little); flag if >20–25% are off-JAR in one direction.",
        placement:
          "After overall liking & likes/dislikes, before purchase intent (diagnostics block).",
        notes:
          "Always include the JAR (middle) anchor; 5-point only; one attribute per row; never combine two attributes in one row.",
      },
    ],
  },
  "paired-preference": {
    qualIntent:
      "Uncover the real decision driver behind the choice between two variants — not just which won, but what tipped it.",
    qualQuestions: [
      "Between these two, which one do you reach for? Don't overthink it.",
      "What was it about that one that made it the winner for you?",
      "What does the other one do better, if anything? What's it missing?",
      "Was this an easy call or a close one? What was the deciding factor?",
      "If we fixed the one thing the loser got wrong, would your choice change? What would it take?",
    ],
  },
  "expected-frequency": {
    qualIntent:
      "Ground a realistic usage rhythm in actual occasions and habits, deflating the optimism bias of 'I'd buy it all the time'.",
    qualQuestions: [
      "Realistically, how often do you see yourself actually using or buying this? Walk me through it.",
      "Tell me about the kind of moment or occasion where you'd reach for this.",
      "Would this replace something you already buy, or be on top of it? Which, and why?",
      "What would have to be true for you to use it more often than that?",
      "Be honest — is this an 'every week' thing, an 'every so often' thing, or a 'once to try it' thing? Why?",
    ],
  },
  "price-perception-concept": {
    qualIntent:
      "Read the gap between perceived value and price by anchoring to the respondent's own expectations and reference points before revealing or reacting to the number.",
    qualQuestions: [
      "Before I tell you anything about price — what would you expect something like this to cost?",
      "Now that you see the price, what's your honest reaction? (probe: too high, fair, surprisingly low?)",
      "What is it about this that makes that price feel worth it — or not?",
      "What are you mentally comparing the price against when you judge it?",
      "At what point would the price make you walk away? And what would make it feel like a steal?",
    ],
  },

  // ── Customer Experience & Satisfaction ───────────────────────────────────
  nps: {
    qualIntent:
      "The score is meaningless on its own — you're surfacing the specific experiences and emotions that would make someone actively champion you or quietly warn others away.",
    qualQuestions: [
      "On a scale of 0 to 10, how likely would you be to recommend us to a friend or colleague? Walk me through what's behind that number.",
      "Think back to the last time the topic came up naturally — did you ever actually mention us to someone? What did you say, and what prompted it?",
      "What would have to happen for that number to drop by a couple of points? And what would push it higher?",
      "If a close friend were about to sign up with us, what would you make sure to tell them first — the good and the 'just so you know'?",
      "Tell me about a moment with us that you've found yourself describing to other people, good or bad.",
    ],
    surveyItems: [
      {
        type: "scale",
        stem: "How likely are you to recommend [brand] to a friend or colleague?",
        scalePoints: [
          "0 — Not at all likely",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10 — Extremely likely",
        ],
        base: "All customers / users",
        analysis:
          "NPS = %Promoters (9–10) − %Detractors (0–6); 7–8 = Passives, excluded from the score.",
        placement:
          "Relational NPS near the top (overall); transactional NPS right after the touchpoint.",
        notes:
          "Use the exact 0–10 anchor wording; 11-point only. Never relabel as 1–5.",
      },
      {
        type: "open_text",
        stem: "What is the main reason for the score you gave?",
        base: "All (ideal: text piped by score — tailored versions for promoters vs detractors)",
        analysis:
          "Code verbatims into drivers; segment by Promoter / Passive / Detractor.",
        placement: "Immediately after the 0–10 likelihood-to-recommend question.",
      },
    ],
  },
  csat: {
    qualIntent:
      "You want the specific drivers behind the feeling — what concretely happened in a real interaction that left them satisfied or let down, not a generic rating.",
    qualQuestions: [
      "Thinking about your most recent experience with us, how did it leave you feeling? Take me through what actually happened.",
      "What was the single moment in that experience that mattered most to you — the one that tipped how you felt one way or the other?",
      "Was there anything that fell short of what you expected, even slightly? Tell me about it.",
      "When everything goes exactly right with us, what does that look like for you? Has it ever actually happened that way?",
      "If you could redo that last interaction, what one thing would you change?",
    ],
  },
  ces: {
    qualIntent:
      "You're reconstructing the friction along the journey — where they had to repeat themselves, wait, hunt, or work harder than they should have to get the job done.",
    qualQuestions: [
      "Think about the last thing you needed to get done with us. Walk me through it step by step, from the moment you started.",
      "Where in that process did you have to stop and think, wait, or do something over again?",
      "Was there any point where you had to repeat yourself, chase us, or explain the same thing twice? Tell me about it.",
      "How much effort did that take compared to what you expected going in?",
      "If you'd been showing a friend how to do the same thing, where would you have warned them 'this part gets annoying'?",
      "What would have made the whole thing feel effortless?",
    ],
  },
  "repurchase-intention": {
    qualIntent:
      "You want the real conditions behind staying or leaving — the trigger that would make them reconsider and what's quietly keeping them in, beyond a stated 'likely to renew'.",
    qualQuestions: [
      "When your renewal (or next purchase) comes up, how much of a decision is it for you — automatic, or something you genuinely weigh up?",
      "Has there been a moment recently where you found yourself questioning whether to continue? What set it off?",
      "What's actually keeping you with us right now — is it the value, the hassle of switching, habit, something else?",
      "If a competitor offered you something tempting tomorrow, what would they have to put on the table to make you seriously consider moving?",
      "Picture the day you decide not to renew — what would have had to happen in the lead-up to that?",
    ],
  },
  "complaint-incidence": {
    qualIntent:
      "You're after the full service-recovery arc — what went wrong, whether they bothered to raise it, how it was handled, and how that handling reshaped the relationship.",
    qualQuestions: [
      "Tell me about the last time something went wrong with us. What happened, in as much detail as you can remember?",
      "Did you raise it with us, or let it go? Walk me through why.",
      "If you did reach out, take me through how it unfolded — who you dealt with, how long it took, how it felt at each step.",
      "Looking back, did how we handled it leave you feeling better or worse about us than before the problem happened?",
      "Was there a moment in sorting it out where you thought 'this is exactly right' or 'this is where they've lost me'? Tell me about it.",
      "For the times you didn't bother to complain — what stopped you?",
    ],
  },
  "key-driver-importance": {
    qualIntent:
      "You're teasing apart which attributes genuinely drive their overall satisfaction versus the ones they merely mention — what they'd actually trade off when forced to choose.",
    qualQuestions: [
      "When you think about what makes us 'good' or 'not good' for you, what's the first thing that comes to mind — and why that?",
      "Across everything — the product, the people, the ease, the price — which one, if it slipped, would bother you the most?",
      "Tell me about a time one part of the experience was great but another let you down. How did you weigh those against each other?",
      "If we could only get one thing absolutely right and were merely okay at the rest, which would you want it to be?",
      "Which parts of dealing with us do you barely notice when they go well, but would be furious about if they went wrong?",
    ],
  },

  // ── Advertising & Communications ─────────────────────────────────────────
  "ad-recall": {
    qualIntent:
      "Establish whether the advertising registered unprompted and how it lives in memory, before any cue contaminates the recall.",
    qualQuestions: [
      "Thinking about [category/brand] lately — has any advertising stuck with you? Walk me through whatever comes to mind first.",
      "Don't worry about getting it 'right' — just tell me what you remember seeing or hearing, in any order it comes back to you.",
      "Where were you and what was going on when you came across it? What pulled it back into your head just now?",
      "If I told you there was a recent ad for [brand], does that ring a bell? What starts to come back once I say that?",
      "What's the bit that lodged itself in your memory — a moment, a line, an image, a sound?",
    ],
  },
  "ad-recognition": {
    qualIntent:
      "Confirm the actual creative is familiar when shown, and separate genuine recognition from polite 'maybe I've seen it'.",
    qualQuestions: [
      "Have you seen or heard this exact one before? Be honest — a 'no' is just as useful to me as a 'yes'.",
      "What specifically tells you you've come across it — what do you recognise here?",
      "When you think you saw it, where was that, and roughly how many times do you reckon you've run into it?",
      "Is there anything here that feels new or different from what you remember? What's changed?",
      "If it does feel familiar, does it feel like an old friend or like it's wearing a bit thin? Tell me about that.",
    ],
  },
  "brand-linkage": {
    qualIntent:
      "Test whether the ad is correctly and confidently pinned to the right brand, not a bigger or rival competitor in the category.",
    qualQuestions: [
      "Whose ad is this — who's behind it? And before I asked, were you sure, or was it a guess?",
      "What in the ad made you land on that brand? Take me to the exact moment you knew.",
      "If you got down to the end without the logo, would you still know it was them? When did it click?",
      "Could this just as easily be one of their competitors? Which one, and what makes it swap-able?",
      "If we stripped the brand name off entirely, what's left that still feels unmistakably 'them'?",
    ],
  },
  "message-takeout": {
    qualIntent:
      "Capture what the respondent actually walks away believing, in their own words, before checking it against the intended message.",
    qualQuestions: [
      "In your own words, what was that ad trying to tell you? Say it how you'd say it, not how they said it.",
      "What's the one main thing they want you to think or remember after seeing it?",
      "Was there anything in there that was confusing, or that you weren't sure they meant? Tell me about that.",
      "If a friend asked 'what was that ad about?', what would you tell them in a sentence?",
      "Was there a second, smaller thing it was saying underneath the main point? What was that?",
    ],
  },
  persuasion: {
    qualIntent:
      "Surface whether the ad genuinely moved the respondent toward the brand — separating being persuaded from merely enjoying the ad.",
    qualQuestions: [
      "Having seen that — does it change anything about how you feel toward [brand]? Be honest if it doesn't.",
      "Before this ad, where did [brand] sit for you? And now? What, if anything, nudged?",
      "What exactly in the ad did that nudging — or what fell flat and left you unmoved?",
      "You said you enjoyed it — but does that actually make you any more likely to choose them? Those are two different things for me.",
      "Is there a claim or moment here you don't quite buy? What would it take for you to believe it?",
      "Next time you're choosing in this category, does this ad come with you into that moment, or stay behind?",
    ],
  },
  "ad-likeability": {
    qualIntent:
      "Understand the texture and source of liking (or its absence), tied to specific creative elements rather than a blanket verdict.",
    qualQuestions: [
      "First gut feeling — did you warm to it or not? Don't overthink it.",
      "What's the bit you enjoyed most? And was there anything that annoyed or bored you?",
      "What was the feeling it left you with right at the end — sum it up in a word or two.",
      "Some ads you like but forget, others you'd happily watch again — where does this one sit, and why?",
      "Did liking it make you feel any warmer toward the brand, or did you like it the way you'd like a funny clip that has nothing to do with you?",
    ],
  },
  "ad-distinctiveness": {
    qualIntent:
      "Gauge whether the creative breaks from category conventions and earns genuine attention rather than blending into the wallpaper of its sector.",
    qualQuestions: [
      "Did this feel like every other [category] ad, or like its own thing? What made the difference?",
      "At what point, if any, did it grab you — and was there a moment your attention drifted?",
      "If you were scrolling or had the remote in your hand, would this stop you? What would stop you?",
      "Picture the other ads in this category — what's this one doing that they're not, or vice versa?",
      "A week from now, what's the single thing from this you'd still be able to picture?",
    ],
  },
  "call-to-action": {
    qualIntent:
      "Surface the concrete next step the ad provokes (or fails to), grounded in real behaviour rather than a polite 'yes I might'.",
    qualQuestions: [
      "Right after seeing that — is there anything you'd actually go and do? Walk me through it.",
      "Did it make you curious enough to look something up, click, or find out more? About what specifically?",
      "Is this something you'd mention to anyone? Who, and how would you bring it up?",
      "Was it clear what they wanted you to do next? Did that feel easy and worth it, or like a hassle?",
      "If you did nothing at all after this ad, what would be the reason — what was missing?",
    ],
  },

  // ── UX Research ──────────────────────────────────────────────────────────
  "task-success": {
    qualIntent:
      "In qual you don't count success, you observe WHERE and WHY the user's mental model breaks; think-aloud + critical incident.",
    qualQuestions: [
      "I'd like you to [task]. As you go, please think out loud — tell me everything going through your head, even the dead ends.",
      "(at a pause) What are you expecting to happen if you click that?",
      "You hesitated just now — what were you unsure about?",
      "If you were doing this alone at home and hit that point, what would you do next?",
      "Now that you've finished, where did it feel smooth, and where did it feel like work?",
    ],
  },
  "time-on-task": {
    qualIntent:
      "The clock only tells you it was slow; in qual you reconstruct WHERE attention stalled and what the user was deliberating over while time drained away.",
    qualQuestions: [
      "Go ahead and start the task, and keep talking me through your thinking the whole way.",
      "(at a stall) You've been looking at this part of the screen for a moment — what are you weighing up right now?",
      "What were you reading or scanning for just then?",
      "Was there a point where you felt you had to stop and figure something out before you could continue?",
      "Looking back, which step took the longest, and what made it take that long?",
      "If you did this every day, what part would you want to be faster?",
    ],
  },
  "error-rate": {
    qualIntent:
      "The number of errors is meaningless without the story; in qual you surface what the interface led the user to believe that produced the slip, and how recovery felt.",
    qualQuestions: [
      "Carry on with the task and think out loud as you go.",
      "(right after a misstep, neutrally) Tell me what just happened there from your point of view.",
      "What did you expect that action to do?",
      "How did you realise something had gone differently than you intended?",
      "Walk me through how you got back on track — was it obvious what to do?",
      "Was there anything on screen that you feel pointed you the wrong way?",
    ],
  },
  sus: {
    qualIntent:
      "The 0–100 score is the companion to a conversation; in qual you unpack the gut judgement behind 'I'd happily use this' vs 'this was a hassle' in the user's own words.",
    qualQuestions: [
      "Before we talk numbers — in a sentence or two, how did using this feel overall?",
      "If you had to describe how complex or simple it felt to a friend, what would you say?",
      "Was there anything you felt you'd need to learn or be shown before you were comfortable on your own?",
      "Where did the different parts feel like they worked together, and where did they feel disjointed?",
      "Imagine you'll be using this regularly — what would make you look forward to it or dread it?",
      "You landed on that overall impression — what one or two moments shaped it most?",
    ],
  },
  seq: {
    qualIntent:
      "SEQ gives you a single ease rating per task; the qual companion is getting the user to narrate exactly what made that task feel easy or like effort, in the moment it's fresh.",
    qualQuestions: [
      "That's the task done. In your own words, how easy or difficult did that feel?",
      "What specifically made it feel that way?",
      "Was there a moment in there where it tipped from straightforward to fiddly, or the other way?",
      "What, if anything, would you change to make that feel effortless?",
      "If a colleague were about to do this for the first time, what would you warn them about?",
    ],
  },
  "umux-lite": {
    qualIntent:
      "UMUX-Lite splits perceived capability ('does what I need') from ease; in qual you probe each leg separately — does it actually do the job they came to do, and does it get out of their way.",
    qualQuestions: [
      "Thinking about what you actually came here to do — did this let you do that? Tell me more.",
      "Was there anything you needed it to do that it couldn't, or that you couldn't find?",
      "Setting aside features for a second — how much effort did it take to get it to do what you wanted?",
      "Where did it feel like the tool was doing the work for you versus you doing the work for it?",
      "If this were your tool for this job, what's the one capability or the one bit of friction you'd flag first?",
    ],
  },
  umux: {
    qualIntent:
      "UMUX adds frustration and wasted correction time to the capability + ease pair; in qual you chase the lived moments behind each item — what it couldn't do, when it grated, and where time went to fixing rather than doing.",
    qualQuestions: [
      "Thinking about what you actually came here to get done — did it do it? Where did it fall short of what you needed?",
      "Tell me about the most frustrating moment you've had with it recently — what happened, and what did it cost you?",
      "How much of your time in it feels like doing the thing versus fixing, redoing or undoing things? Give me a recent example.",
      "Walk me through the last time it did something you didn't expect — how long did it take you to get back on track?",
      "Setting the annoyances aside — when it works, how does using it feel? Effortless, tolerable, or a slog?",
      "If you could hand the team one recurring irritation to fix, which would it be — and what does it keep interrupting for you?",
    ],
  },
  "first-click": {
    qualIntent:
      "First click reveals information scent; in qual you don't just log where they clicked, you draw out the reasoning and the label/visual cues that pulled them there before they act.",
    qualQuestions: [
      "Here's the screen and here's what you're trying to do. Don't click yet — just tell me, where's the first place you'd go, and why there?",
      "What is it about that spot that makes you think it's the right way in?",
      "Is there a second place that's also tempting? What's making you choose between them?",
      "Okay, go ahead. (after) Did that take you where you expected?",
      "If that hadn't worked, where would you have tried next?",
    ],
  },
  findability: {
    qualIntent:
      "Findability isn't just 'did they find it' but whether the IA matches their mental model; in qual you surface where they expected things to live and why the structure does or doesn't fit how they think.",
    qualQuestions: [
      "I'd like you to find [item]. Think out loud about where you'd expect to find it as you look.",
      "Before you go anywhere — if you had to guess, what section would something like this live under?",
      "(as they browse) What made you choose that area to look in?",
      "You're somewhere different now — what told you it wasn't here and pulled you elsewhere?",
      "If you were organising this yourself, where would you have put it?",
      "Now that you've found it, did it end up where you'd have expected, or somewhere surprising?",
    ],
  },
  learnability: {
    qualIntent:
      "Learnability is the gap between first encounter and fluency; in qual you watch what they have to actively figure out the first time, and whether the second pass feels like it 'clicked'.",
    qualQuestions: [
      "This is your first time with this — talk me through how you'd approach it, including anything you're unsure of.",
      "What are you having to work out for yourself right now versus what's just obvious?",
      "(after first pass) What did you learn doing that the first time that you didn't know going in?",
      "Let's do a similar one again — narrate it, and tell me if anything feels different the second time.",
      "Was there a moment where it suddenly made sense? What clicked?",
      "If you came back to this in a week, what do you think you'd have to relearn?",
    ],
  },
  "nasa-tlx": {
    qualIntent:
      "TLX decomposes effort into mental/temporal demand, frustration and so on; the qual companion has the user narrate where the load actually came from rather than rating dimensions in the abstract.",
    qualQuestions: [
      "Thinking back over that task — where did you have to concentrate hardest, and on what?",
      "Was there much to hold in your head at once? What were you trying to keep track of?",
      "Did you ever feel rushed or under time pressure — and where did that come from?",
      "Tell me about the most frustrating moment, if there was one. What happened?",
      "How hard did you feel you had to work to get the result you wanted?",
      "At the end, did you feel on top of it or a bit worn out — and which part drove that?",
    ],
  },
  desirability: {
    qualIntent:
      "The reaction-card method gets at emotional and aesthetic response; in qual the cards are a springboard — the value is entirely in why they chose each word and what moment it attaches to.",
    qualQuestions: [
      "Here's a set of words. Pick the few that best describe how this felt to use — take your time.",
      "Take the first one you chose — what made you reach for that word?",
      "Was there a specific moment or part of the screen that word is really about?",
      "Did you consider any words and then reject them? Which, and why didn't they fit?",
      "If you had to pick one word that's the opposite of your experience, what would it be?",
      "Overall, how would you describe the personality of this thing to someone who's never seen it?",
    ],
  },
  "feature-adoption": {
    qualIntent:
      "Adoption analytics tell you a feature was or wasn't used; in qual you reconstruct the lived story of how (or whether) they discovered it, what made them try it, and what made it stick or not.",
    qualQuestions: [
      "Tell me about the last time you used [feature] — walk me through what you were doing and what led you to it.",
      "How did you first come across it? Did you go looking, or did you stumble onto it?",
      "What made you decide it was worth trying that first time?",
      "Has it become part of how you normally work, or was it a one-off? What made the difference?",
      "Was there ever a point where you expected something like it and couldn't find it?",
      "If it disappeared tomorrow, would you notice? What would you do instead?",
    ],
  },
  engagement: {
    qualIntent:
      "Stickiness ratios hide the human reason for return; in qual you explore what actually pulls them back and what real, recent sessions looked like — depth, not frequency counts.",
    qualQuestions: [
      "Take me back to the last time you opened this — what prompted you to, and what did you actually do?",
      "In a typical week, when does it tend to come up for you? What's happening around you when it does?",
      "When you do open it, do you tend to dip in and out or settle in? Tell me about a recent example.",
      "What's the thing that, if it were gone, would make you stop reaching for this?",
      "Are there times you thought about using it but didn't? What did you do instead?",
      "What keeps bringing you back, in your own words?",
    ],
  },
  "retention-churn": {
    qualIntent:
      "Churn data is a corpse; in qual you autopsy it — reconstruct the moment usage tailed off, what changed in their life or the product, and what (if anything) would have brought them back.",
    qualQuestions: [
      "Cast your mind back to when you were using this most — what was it doing for you then?",
      "Has your usage changed since? Walk me through how it tailed off or shifted.",
      "Can you pinpoint roughly when you started reaching for it less? What else was going on at that time?",
      "Was there a specific moment or letdown that nudged you away, or was it more of a gradual drift?",
      "What would have had to be true for you to keep using it?",
      "If you came back, what's the first thing you'd want it to do for you?",
    ],
  },
  "heart-framework": {
    qualIntent:
      "HEART is a measurement lens, not an interview; in qual you map each dimension — Happiness, Engagement, Adoption, Retention, Task success — onto concrete lived moments rather than scores.",
    qualQuestions: [
      "(Happiness) When you think about using this, what's the feeling that comes up — and what moment is that attached to?",
      "(Engagement) Tell me about a recent session where you were really into it — what were you doing?",
      "(Adoption) Think of the newest thing you started using here — how did that come about?",
      "(Retention) What's kept this in your routine when other tools have dropped out of it?",
      "(Task success) Think of the last thing you came here specifically to get done — did you get it done, and how did that go?",
      "Across all of that, where does this most live up to what you want from it, and where does it most let you down?",
    ],
  },
  accessibility: {
    qualIntent:
      "An audit tells you where the product breaks the rules; in qual you surface where it breaks the person — the workarounds, abandoned tasks and quiet exclusions that assistive-technology users have stopped even mentioning.",
    qualQuestions: [
      "Before we look at anything — walk me through how you normally set up a new app or site to work for you. What do you adjust or switch on before you can use it comfortably?",
      "Talk me through the last time you used [product] with your usual setup — where did you slow down, stall, or have to improvise?",
      "Tell me about a moment here where you got properly stuck — what was happening, and what did you do next?",
      "What workarounds have you built up over time to get things done in [product]? Which ones have become so routine you barely notice them anymore?",
      "Has there been anything you simply gave up on, or handed over to someone else to do for you? Walk me through that.",
      "Compared with other products you use, where does this one feel most built for you — and where does it feel like you weren't in the room when they designed it?",
      "If the team could fix one thing tomorrow that would change how independently you can use this, what would it be?",
    ],
  },
  "digital-literacy": {
    qualIntent:
      "Self-rated tech confidence flatters; in qual you surface the real coping repertoire — what they do when technology misbehaves, what they quietly avoid or hand off, and how they judge what's safe to click.",
    qualQuestions: [
      "Walk me through the devices and apps that are part of your normal day — what do you actually do on each?",
      "Tell me about the last time you had to do something new online — set up an app, fill in an official form, pay somewhere unfamiliar. How did that go?",
      "When something goes wrong — an error message, a frozen screen, a login that won't work — what do you do first?",
      "Is there anything you avoid doing online — payments, official paperwork, banking — even though you technically could? What's behind that?",
      "Who do you turn to when technology defeats you, and what was the last thing you asked them to help with?",
      "How do you decide whether a website, app or message is safe to trust? Tell me about one recently that you didn't.",
      "Think of something digital you now do easily but once found hard — what got you over the hump?",
    ],
  },

  // ── Banking & Payments ───────────────────────────────────────────────────
  "main-bank-share": {
    qualIntent:
      "Uncover what psychologically anchors one bank as 'main' — where salary, identity, and default trust actually live, not just where balances sit.",
    qualQuestions: [
      "When you think of 'my bank', which one comes to mind first — and what makes that the one?",
      "Walk me through what actually flows through that bank — salary, bills, savings — how did it end up carrying all of that?",
      "Are there things you'd only ever do with that bank and not the others? What are they?",
      "If that bank disappeared overnight, what would you miss most — and what wouldn't you miss at all?",
      "What does that bank know about your money life that no other one does?",
    ],
  },
  "bank-switching-intent": {
    qualIntent:
      "Detect whether any genuine momentum toward leaving exists, or whether stated intent is just venting with no real pull behind it.",
    qualQuestions: [
      "How settled do you feel with your main bank right now — like it's permanent, or like you're keeping an eye out?",
      "Has anything recently made you pause and wonder if there's something better out there?",
      "If you picture yourself a year from now, is it with the same bank? What makes you say that?",
      "When you hear someone rave about their bank, does it tempt you at all, or does it just wash over you?",
      "What's the closest you've come to actually looking elsewhere?",
    ],
  },
  "switching-triggers-barriers": {
    qualIntent:
      "Inertia is huge; you want the real trigger event and the perceived 'cost of leaving', not rationalizations.",
    qualQuestions: [
      "Tell me the story of how you ended up with your main bank — was it a real choice or did it just happen?",
      "Has there ever been a moment you seriously thought about leaving? What set it off?",
      "What stopped you — or what would stop you — from actually moving?",
      "Imagine a friend says they're switching banks tomorrow. What's your gut reaction — and what do you warn them about?",
      "What would a bank have to do to make leaving feel worth the hassle?",
    ],
  },
  "cross-sell-intent": {
    qualIntent:
      "Surface the unspoken rule people use for whether the next product 'belongs' with their main bank or gets shopped elsewhere.",
    qualQuestions: [
      "Think of the last financial product you took out — how did you decide where to get it?",
      "When you need something new — a card, a loan, savings — does your main bank automatically come to mind, or do you start looking around?",
      "What kinds of things feel natural to get from your main bank, and what feels better to keep separate?",
      "Has your bank ever offered you something extra? Walk me through how that landed — welcome, annoying, neither?",
      "What would make you say yes to your bank for something rather than going to a specialist?",
    ],
  },
  "consolidation-intent": {
    qualIntent:
      "Reveal whether 'everything in one place' feels like convenience and control, or like risky over-exposure to a single institution.",
    qualQuestions: [
      "How is your money spread out right now across banks and apps — and how did it end up looking that way?",
      "Some people like everything under one roof, others deliberately keep things apart. Where do you land, and why?",
      "What would be good about pulling it all into one bank — and what makes you hesitate?",
      "When you think about having all your money with a single bank, what's the feeling that comes up?",
      "If you were starting fresh today, would you keep it simple or spread it out?",
    ],
  },
  "product-purchase-pipeline": {
    qualIntent:
      "Map products to the life events and worries that actually trigger them, rather than collecting an abstract wishlist.",
    qualQuestions: [
      "Looking at the year ahead, is there anything money-related you can see coming that you'll need to sort out?",
      "What's going on in your life right now that might push you toward a new financial product?",
      "When something like that comes up, how do you usually figure out what you need and where to get it?",
      "Is there a product you keep thinking 'I should probably look into that' but haven't yet? What's holding it up?",
      "What would have to happen for that 'someday' product to become a 'now' decision?",
    ],
  },
  "onboarding-completion": {
    qualIntent:
      "Locate the friction and trust moments where people stall or abandon, and what emotionally carries them over the line.",
    qualQuestions: [
      "Tell me about the last time you opened an account anywhere — walk me through it from the first click or step.",
      "Was there a point where it got annoying, confusing, or made you want to stop? What happened there?",
      "Have you ever started opening something and not finished? What made you drop off?",
      "When they asked for documents or ID, how did that feel — routine, or like a hassle?",
      "What's the difference between an opening process that feels smooth and one that feels like a fight?",
    ],
  },
  "digital-banking-adoption": {
    qualIntent:
      "Understand what banking has fully migrated to the phone, and which acts people deliberately keep off-app — and why.",
    qualQuestions: [
      "Walk me through the last time you opened your banking app — what were you doing and what prompted it?",
      "Which things do you happily do on the app without a second thought?",
      "Is there anything you just won't do in the app — something where you'd rather call or go in? What and why?",
      "When you have to do something on the app you've never done before, how does that feel?",
      "What's the moment in your day or week when the app is most useful to you?",
    ],
  },
  "banking-channel-mix": {
    qualIntent:
      "Capture the unwritten logic that sends a given task to app vs web vs branch vs phone, especially when it's about reassurance not convenience.",
    qualQuestions: [
      "For different money tasks, where do you naturally go — phone, computer, branch, calling? Give me a few examples.",
      "When was the last time you went into a branch or picked up the phone? What made that the right channel for it?",
      "Is there something you'd only ever sort out with an actual person? What is it about that?",
      "When something goes wrong or feels high-stakes, how does that change where you go?",
      "If branches disappeared tomorrow, what would you genuinely miss?",
    ],
  },
  "payment-method-usage": {
    qualIntent:
      "Uncover the situational reflexes and feelings (control, speed, privacy, habit) behind reaching for cash vs card vs wallet vs P2P.",
    qualQuestions: [
      "Think about everything you paid for yesterday — what did you use for each, and why that one?",
      "Is there a situation where you'll always reach for cash? What's that about for you?",
      "How did tapping your phone or watch to pay become part of your life — or has it not?",
      "When you split a bill or pay back a friend, how does that usually happen now?",
      "Is there a way of paying you avoid or distrust? Tell me about that.",
    ],
  },
  "fintech-usage": {
    qualIntent:
      "Identify the specific 'job' people hire a neobank for and the trust ceiling that keeps it from becoming their main bank.",
    qualQuestions: [
      "Are there any newer, app-only banks or money apps you use? How did you come across them?",
      "What do you actually use them for — and is that different from what your main bank is for?",
      "Some people love these apps but would never put their salary in one. Why do you think that is?",
      "What would one of these apps have to prove before you'd trust it with everything?",
      "If a colleague said they'd ditched their old bank for an app-only one, what would you think?",
    ],
  },
  "bnpl-usage": {
    qualIntent:
      "Explore how 'pay later' is mentally filed — as a smart budgeting tool, harmless convenience, or quiet debt — using projective distance for the stigma.",
    qualQuestions: [
      "When you're buying something and 'pay in instalments' pops up at checkout, what goes through your mind?",
      "Have you ever used one of those split-payment options? Tell me about that time.",
      "A lot of people use buy-now-pay-later but wouldn't call it borrowing. Why do you think they see it that way?",
      "How does paying in instalments feel different to you compared with putting it on a credit card?",
      "When do you think these options are genuinely helpful, and when do they worry you a bit?",
    ],
  },
  "trust-in-banks": {
    qualIntent:
      "Reach the underlying belief about whether banks are fundamentally on your side or not — using third-person framing to bypass guarded answers.",
    qualQuestions: [
      "When people say 'you can't really trust the banks', what do you think they mean by that?",
      "Has anything ever happened — to you or someone you know — that changed how you feel about banks in general?",
      "Do you think your bank acts in your interest, its own, or somewhere in between? What makes you say that?",
      "If a younger relative asked whether banks are safe to rely on, what would you honestly tell them?",
      "Picture two people: one keeps cash at home, one trusts the system completely. Where are you between them, and why?",
    ],
  },
  "fee-transparency": {
    qualIntent:
      "Distinguish anger at the existence of fees from anger at being surprised or feeling tricked — fairness is about the reveal, not the amount.",
    qualQuestions: [
      "Tell me about a time you got charged something by your bank that you didn't expect. What happened?",
      "When you look at what your bank charges you, how clear is it really what you're paying for?",
      "Which fees feel fair enough to you, and which ones feel like they're taking advantage?",
      "People often say banks 'hide' charges. Does that match your experience, or not?",
      "What would make you feel a bank was being genuinely upfront with you about money?",
    ],
  },
  "perceived-security": {
    qualIntent:
      "Surface the felt sense of safety (or dread) around money and data, and who people believe carries the blame if something goes wrong — with projective cover for the fear.",
    qualQuestions: [
      "How safe do you feel that your money and your details are with your bank? Where does that feeling come from?",
      "Tell me about a moment something felt off — a strange text, a payment you didn't recognise, a scare.",
      "A lot of people worry about being scammed these days. What do you think they're most afraid of?",
      "If money disappeared from someone's account through fraud, who do you think should be responsible for fixing it?",
      "What does your bank do that makes you feel protected — and where do you feel left on your own?",
    ],
  },

  // ── Financial Needs & Wellbeing ──────────────────────────────────────────
  "financial-wellbeing": {
    qualIntent:
      "Surface the lived experience of security and freedom of choice (present and future) rather than the CFPB scale score — how 'in control' and 'able to enjoy life' actually feels to them.",
    qualQuestions: [
      "When you picture your money situation a year or two from now, does it feel more open or more closed off — and why?",
      "Lots of people say there's a gap between just getting by and actually feeling free with money. Where would you put yourself, without naming numbers?",
      "Tell me about a recent moment when money let you do something you genuinely wanted to do.",
      "When something unexpected hits your finances, how much does it knock you off course?",
      "What would 'enough' look like for you — not a figure, but a feeling?",
    ],
  },
  "financial-literacy": {
    qualIntent:
      "Gently gauge confidence and mental models around money concepts without ever testing them — how they make sense of financial information and where it feels foggy.",
    qualQuestions: [
      "When you come across financial information — a statement, a rate, the news — how do you usually make sense of it?",
      "A lot of people find some money topics clear and others genuinely murky. Which ones sit on each side for you?",
      "Tell me about a time a financial product or decision turned out differently than you expected. What happened?",
      "If a friend asked you to explain how something like interest or investing works, where would you feel sure-footed and where would you hand it off?",
      "Where do you go when something money-related doesn't quite make sense?",
    ],
  },
  "savings-emergency-fund": {
    qualIntent:
      "Understand the habit and emotional relationship around saving, and felt resilience if income stopped — not the balance or months-of-coverage figure.",
    qualQuestions: [
      "Walk me through what happens to money that's left over at the end of a month — where does it tend to go?",
      "Without naming amounts, how does it feel when you think about your savings — cushioned, stretched, somewhere in between?",
      "If your income suddenly stopped, how long do you imagine things would hold together — and what's that picture like in your head?",
      "Tell me about the last time you dipped into savings. What was that like to do?",
      "Some people save almost automatically and others have to fight for it. Which is closer to you, and why do you think that is?",
    ],
  },
  "budgeting-style": {
    qualIntent:
      "Reveal their money personality and the system (or absence of one) they use to plan, track and control money — and how that style feels day to day.",
    qualQuestions: [
      "How do you keep track of where your money goes — or do you keep track at all?",
      "If your approach to managing money were a personality, how would you describe it?",
      "Tell me about the last time you sat down with your finances. What prompted it and how did it go?",
      "Lots of people have a method that works and a part that always slips. What's yours?",
      "When does money management feel like it's working for you, and when does it feel like a chore?",
    ],
  },
  "financial-goals": {
    qualIntent:
      "Draw out what they are actually working toward and which life events are reshaping their financial needs — and the meaning beneath those goals.",
    qualQuestions: [
      "What's something you're saving or planning toward right now, big or small?",
      "When you imagine your life a few years out, what's changing that money will have a hand in?",
      "Tell me about a recent life event — yours or close to you — that shifted how you think about money.",
      "Of the things you're working toward, which one would mean the most to reach, and what would reaching it give you?",
      "Is there a goal you've quietly put on a shelf? What got in the way?",
    ],
  },
  "attitude-to-credit": {
    qualIntent:
      "Explore whether they experience credit as a useful tool or a trap, and the beliefs and rules that govern when borrowing feels okay.",
    qualQuestions: [
      "When you hear the word 'credit', what's the first picture or feeling that comes to mind?",
      "Some people see borrowing as a smart tool, others as a slippery slope. Where do you tend to sit?",
      "Tell me about a time you borrowed for something and it felt like the right call.",
      "What are your personal rules — spoken or unspoken — about when it's okay to borrow?",
      "Without naming numbers, how does carrying a balance sit with you?",
    ],
  },
  "debt-burden": {
    qualIntent:
      "Surface the felt weight and stress of repayments without exposing figures or inviting shame — using projective, normalizing framing throughout.",
    qualQuestions: [
      "Lots of people carry some kind of repayment in the background of their lives. Without any numbers, how present is that background hum for you?",
      "If that weight had a size or a colour, what would it be these days?",
      "Think of someone in a situation like yours — what do you imagine is the hardest part for them month to month?",
      "Tell me about a moment recently when repayments came up in your thinking. What was going on?",
      "When you picture being clear of what you owe, what's the first thing that changes for you?",
      "What would make that weight feel more manageable, even a little?",
    ],
  },
  "risk-tolerance": {
    qualIntent:
      "Understand their genuine emotional response to risk and loss and the values behind it, rather than a risk-profile bucket.",
    qualQuestions: [
      "When the value of something you'd put money into drops, what goes through you in that moment?",
      "Some people can sit comfortably with ups and downs; others lose sleep. Which is closer to you?",
      "Tell me about a chance you took with money — invested, bet on something, started something. How did it feel along the way?",
      "Imagine two paths: one steady and modest, one bumpier but possibly bigger. Which pulls at you, and what's behind that pull?",
      "What would a bad outcome have to threaten before it really worried you?",
    ],
  },
  "retirement-preparedness": {
    qualIntent:
      "Explore how prepared and confident they feel about funding later life, and the emotional distance or proximity of that future self.",
    qualQuestions: [
      "When the word 'retirement' comes up, how near or far does it feel to you?",
      "Lots of people have a fuzzy rather than a clear picture of later life. What does yours look like right now?",
      "Without naming figures, how confident do you feel that the pieces are in place for then?",
      "Tell me about a time retirement or later-life money crossed your mind. What set it off?",
      "If you could send one message to yourself about retirement, what would it say?",
      "What, if anything, holds you back from thinking about it more?",
    ],
  },
  "protection-gap": {
    qualIntent:
      "Surface their felt sense of being protected versus exposed against life, health and income shocks — not a coverage checklist.",
    qualQuestions: [
      "When you think about the unexpected — illness, losing income, worse — how covered or exposed do you feel?",
      "Some people feel well wrapped up against life's shocks, others quite open to the weather. Where do you sit?",
      "Tell me about a time you, or someone close to you, faced something that tested whether they were protected.",
      "Are there risks you've chosen not to worry about? What's behind that?",
      "Without specifics, what would you most want to keep standing if life threw something big at you?",
    ],
  },
  "financial-anxiety": {
    qualIntent:
      "Sensitive topic; use non-judgmental language, normalization and projection to reduce social desirability.",
    qualQuestions: [
      "When you think about your money situation right now, what's the feeling that shows up first?",
      "Lots of people have a money worry that pops up at 3am — without naming numbers, what's the shape of yours?",
      "Tell me about the last money decision that felt good. What made it feel that way?",
      "When you have to make a financial choice, who or what do you turn to — and how confident do you feel afterward?",
      "If your finances could talk, what would they be telling you these days?",
    ],
  },
  "advice-seeking": {
    qualIntent:
      "Map where they actually turn before money decisions and who they trust, surfacing the relationships and gatekeepers behind their choices.",
    qualQuestions: [
      "Before a money decision of any size, who or what do you usually check in with first?",
      "Tell me about the last time you asked someone for input on money. How did that go?",
      "Whose money opinion do you genuinely trust — and what earned that trust?",
      "Some people would talk to a professional, others would never. Where do you land, and why?",
      "When you don't ask anyone, what's usually behind that?",
    ],
  },

  // ── Added in final audit (Kano, Conjoint, MaxDiff, TURF, DBA, Sustainability, SERVQUAL) ──
  "kano-model": {
    qualIntent:
      "Surface, for each candidate feature, whether it's an expected baseline, a 'more-is-better' lever, or a genuine delighter — by exploring how people react to its presence and its absence.",
    qualQuestions: [
      "Imagine [feature] is there and working perfectly. How would that make you feel about the product?",
      "Now imagine it's completely absent. How would you feel then?",
      "Is this something you'd simply expect to be there, or something that would genuinely surprise and delight you?",
      "Tell me about a product that had a little extra you didn't expect — what was it, and how did it change how you felt?",
      "Which of these features would you barely notice either way? Be honest.",
    ],
  },
  "maxdiff": {
    qualIntent:
      "Surface the real hierarchy among the items and the reasoning behind the top and bottom — the why a forced best-worst choice can't give you on its own.",
    qualQuestions: [
      "Of all these, which one matters most to you — and what makes it rise above the rest?",
      "And which matters least? Why does that one not move you at all?",
      "When two of these compete head to head, how do you break the tie?",
      "Is there one here that everyone says matters but honestly doesn't to you?",
      "If you could only keep the top three, which would you fight for?",
    ],
  },
  "turf": {
    qualIntent:
      "Understand why people pick into a range, where variety genuinely matters, and which options are redundant versus reach a different person.",
    qualQuestions: [
      "Looking at this range, which ones would you actually buy or use — and which would you never touch?",
      "If your favourite weren't available, which would you reach for instead?",
      "Does having more variety here matter to you, or would two or three be enough?",
      "Which of these feels like it's 'for someone else', not for you?",
      "Tell me about a time a range was missing the one option you wanted — what happened?",
    ],
  },
  "distinctive-brand-assets": {
    qualIntent:
      "Surface which brand cues people genuinely encode in memory and whether they confuse them with competitors — fame and uniqueness, felt rather than measured.",
    qualQuestions: [
      "I'm going to show you something with the brand name removed — what brand comes to mind, if any?",
      "What made you say that — what about it feels like [brand]?",
      "Could this just as easily be a competitor? Which one?",
      "When you picture [brand] in your head, what's the first visual or sound that comes up?",
      "If [brand] dropped its name and logo entirely, what would still tell you it was them?",
    ],
  },
  "sustainability-perception": {
    qualIntent:
      "Explore what sustainability means to them in this category, how much it really drives choice, and whether they believe the brand's claims — getting past the socially-desirable answer to the say-do gap.",
    qualQuestions: [
      "When you think about [category], does how sustainable or ethical a brand is come into your choice at all? Walk me through that.",
      "Tell me about a brand you trust to do the right thing — and one you're sceptical about. What's the difference?",
      "When a brand makes a 'green' or 'ethical' claim, what makes you believe it versus roll your eyes?",
      "Would you pay more for a more sustainable option here? Be honest — and where's your limit?",
      "Some people say they care about sustainability but don't change what they buy. Where do you sit, really?",
    ],
  },
  "servqual": {
    qualIntent:
      "Explore the five service dimensions (RATER) through best and worst service moments, and surface where the promise — in ads, app, or at the desk — diverged from what was delivered.",
    qualQuestions: [
      "Tell me about the best and the worst service experience you've had with [provider]. What happened in each?",
      "Can you count on them to get it right first time? Tell me about a time they did, and one they didn't. (reliability)",
      "How do the people make you feel — confident and looked after, or like a number? (assurance & empathy)",
      "When you needed help, how quickly and willingly did they respond? (responsiveness)",
      "Did what they promised — in ads, in the app, at the desk — match what you actually got? Where did it diverge?",
      "If you ran the place, which one thing about the service would you fix first?",
    ],
  },
  "conjoint-analysis": {
    qualIntent:
      "Conjoint is quant by design; the qual companion surfaces which attributes genuinely matter and the real trade-offs people make — input for choosing the attributes and levels to model.",
    qualQuestions: [
      "When you choose a [product], walk me through the things you weigh against each other — what trades off against what?",
      "Tell me about a time you wanted [one attribute] but had to give up [another] to get it. How did you decide?",
      "If you could only keep three things about [product] and drop the rest, what would you keep?",
      "Where does price sit in that — first filter, tiebreaker, or something you'll stretch for the right product?",
      "Are there features that are simply non-negotiable — deal-breakers if they're missing?",
    ],
  },
};
