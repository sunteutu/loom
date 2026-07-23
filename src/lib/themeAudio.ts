// Sunete de temă sintetizate cu Web Audio (fără fișiere), portate din
// mockups/teme.html. AudioContext-ul se creează leneș, la primul gest al
// utilizatorului (cerința browserelor pentru autoplay) — schimbarea temei
// și clickurile sunt gesturi, deci apelurile de aici sunt sigure.

let ctx: AudioContext | null = null;

function audio(): AudioContext {
  if (!ctx) {
    // iOS tratează Web Audio ca „ambient" și îl amuțește cu switch-ul pe
    // silent; sesiunea „playback" îl scoate de sub switch (Safari 16.4+).
    type AudioSessionNavigator = Navigator & { audioSession?: { type: string } };
    const nav = navigator as AudioSessionNavigator;
    if (nav.audioSession) nav.audioSession.type = "playback";
    type LegacyWindow = Window & { webkitAudioContext?: typeof AudioContext };
    const Ctor = window.AudioContext ?? (window as LegacyWindow).webkitAudioContext;
    ctx = new Ctor!();
  }
  if (ctx.state === "suspended") void ctx.resume();
  // Un context suspendat pune sunetele în coadă și le varsă pe toate la
  // primul gest — posibil pe cu totul altă pagină. Mai bine deloc: aruncăm,
  // iar call site-urile (toate în try/catch) renunță la sunetul respectiv.
  if (ctx.state !== "running") throw new Error("AudioContext locked");
  return ctx;
}

/** iOS pornește AudioContext-ul doar sincron, în interiorul unui gest.
    Sunetele de schimbare de temă pleacă însă din efecte (post-gest), așa
    că deblocăm contextul la primul tap/click de oriunde din pagină — după
    aceea apelurile din efecte găsesc contextul deja „running". */
export function installAudioUnlock(): () => void {
  const unlock = () => {
    try {
      audio();
    } catch {
      // browser fără Web Audio — rămânem fără sunet
    }
    if (ctx?.state === "running") remove();
  };
  const remove = () => {
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("touchend", unlock);
  };
  window.addEventListener("pointerdown", unlock, { passive: true });
  window.addEventListener("touchend", unlock, { passive: true });
  return remove;
}

/** Un clack de plăcuță split-flap: plesnet de zgomot prin bandpass +
    tranzientul jos al balamalei. */
export function clackAt(time: number, vol: number) {
  const c = audio();
  const dur = 0.028;
  const buf = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) {
    d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2.2);
  }
  const noise = c.createBufferSource();
  noise.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 2300 + Math.random() * 1800;
  bp.Q.value = 1.1;
  const ng = c.createGain();
  ng.gain.value = vol;
  noise.connect(bp);
  bp.connect(ng);
  ng.connect(c.destination);
  noise.start(time);
  const osc = c.createOscillator();
  osc.type = "triangle";
  osc.frequency.value = 150 + Math.random() * 60;
  const og = c.createGain();
  og.gain.setValueAtTime(vol * 0.9, time);
  og.gain.exponentialRampToValueAtTime(0.0001, time + 0.03);
  osc.connect(og);
  og.connect(c.destination);
  osc.start(time);
  osc.stop(time + 0.035);
}

export function clackOnce() {
  clackAt(audio().currentTime, 0.22);
}

/** Cascada de la intrarea pe split-flap: plăcuțele se rotesc dese la
    început, apoi se răresc și se așază. */
export function flapCascade() {
  const c = audio();
  let t = c.currentTime + 0.03;
  let gap = 0.028;
  for (let i = 0; i < 26; i++) {
    clackAt(t + Math.random() * 0.012, 0.1 + Math.random() * 0.1);
    t += gap;
    gap *= 1.09;
  }
  clackAt(t + 0.05, 0.26);
}

/** „Plop" ASMR pentru bulele de săpun, în spiritul tastaturii de iPhone:
    moale, rotund, fără nimic strident — dar fiecare mărime are vocea ei.
    s ∈ 0..1 din diametrul bulei conduce tot: bula mică face un „pip"
    scurt, luminos și discret; bula mare un „bloop" adânc, mai lung, cu
    sub-octava plină. Micro-detune aleator ±4% ca două spargeri identice
    să nu sune niciodată la fel. Totul rămâne sub ~1.8kHz și ~230ms. */
export function bubblePop(size: number) {
  const c = audio();
  const t = c.currentTime;
  const s = (Math.min(Math.max(size, 30), 170) - 30) / 140; // 0 = mică, 1 = mare
  const jitter = 1 + (Math.random() * 2 - 1) * 0.04;
  // tuc-ul de atac: puf minuscul de zgomot — mai luminos la bulele mici
  const nDur = 0.005 + s * 0.004;
  const buf = c.createBuffer(1, Math.ceil(c.sampleRate * nDur), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) {
    d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  }
  const noise = c.createBufferSource();
  noise.buffer = buf;
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1800 - s * 900;
  const ng = c.createGain();
  ng.gain.value = 0.09 + s * 0.06;
  noise.connect(lp);
  lp.connect(ng);
  ng.connect(c.destination);
  noise.start(t);
  // corpul plopului: glisando sinus descendent; pitch, durată și volum
  // scalează toate cu mărimea
  const f0 = (950 - s * 720) * jitter;
  const bodyDur = 0.08 + s * 0.12;
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(f0, t);
  osc.frequency.exponentialRampToValueAtTime(Math.max(65, f0 * 0.3), t + bodyDur * 0.55);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.16 + s * 0.1, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + bodyDur);
  osc.connect(g);
  g.connect(c.destination);
  osc.start(t);
  osc.stop(t + bodyDur + 0.02);
  // sub-octava: aproape absentă la bulele mici, plină la cele mari
  const subGain = 0.02 + s * 0.13;
  const sub = c.createOscillator();
  sub.type = "sine";
  sub.frequency.setValueAtTime(f0 / 2, t);
  sub.frequency.exponentialRampToValueAtTime(Math.max(48, f0 * 0.15), t + bodyDur * 0.7);
  const sg = c.createGain();
  sg.gain.setValueAtTime(0.0001, t);
  sg.gain.exponentialRampToValueAtTime(subGain, t + 0.01);
  sg.gain.exponentialRampToValueAtTime(0.0001, t + bodyDur + 0.03);
  sub.connect(sg);
  sg.connect(c.destination);
  sub.start(t);
  sub.stop(t + bodyDur + 0.05);
}

/** Imprimanta termică (bon fiscal): zgomot alb cu poartă de ~28Hz (avans
    sacadat), un „motor" sinus slab și ghilotina la final. */
export function bonPrint() {
  const c = audio();
  const t0 = c.currentTime;
  const dur = 1.9;
  const buf = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) {
    const t = i / c.sampleRate;
    const gate = Math.sin(2 * Math.PI * 28 * t) > -0.2 ? 1 : 0.15;
    d[i] = (Math.random() * 2 - 1) * gate;
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1250;
  bp.Q.value = 0.8;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.16, t0 + 0.05);
  g.gain.setValueAtTime(0.16, t0 + dur - 0.15);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(bp);
  bp.connect(g);
  g.connect(c.destination);
  src.start(t0);
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 3800;
  const og = c.createGain();
  og.gain.value = 0.014;
  osc.connect(og);
  og.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur);
  clackAt(t0 + dur + 0.08, 0.3); // ghilotina care taie bonul
}

/** Scrâșnetul metalului zgâriat (tema Metal): zgomot alb în buclă prin
    două filtre — un bandpass lat (frecarea) și o rezonanță subțire cu Q
    mare (țiuitul). Gain-ul și frecvențele urmăresc viteza mișcării:
    șuieră când tragi repede, se stinge când te oprești. */
let scrNodes: {
  noise: AudioBufferSourceNode;
  bp: BiquadFilterNode;
  hi: BiquadFilterNode;
  g: GainNode;
  gh: GainNode;
} | null = null;

export function scratchSoundStart() {
  const c = audio();
  const buf = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const noise = c.createBufferSource();
  noise.buffer = buf;
  noise.loop = true;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 2400;
  bp.Q.value = 2.2;
  const g = c.createGain();
  g.gain.value = 0.0001;
  const hi = c.createBiquadFilter();
  hi.type = "bandpass";
  hi.frequency.value = 5600;
  hi.Q.value = 16;
  const gh = c.createGain();
  gh.gain.value = 0.0001;
  noise.connect(bp);
  bp.connect(g);
  g.connect(c.destination);
  noise.connect(hi);
  hi.connect(gh);
  gh.connect(c.destination);
  noise.start();
  scrNodes = { noise, bp, hi, g, gh };
}

export function scratchSoundMove(speed: number) {
  if (!scrNodes) return;
  const c = audio();
  const t = c.currentTime;
  const v = Math.min(1, speed / 42); // 0..1 din viteza cursorului
  // frecarea: crește cu viteza, apoi decade singură dacă nu mai vin mișcări
  scrNodes.g.gain.cancelScheduledValues(t);
  scrNodes.g.gain.setTargetAtTime(0.015 + v * 0.1, t, 0.012);
  scrNodes.g.gain.setTargetAtTime(0.0001, t + 0.07, 0.06);
  // țiuitul: doar la mișcări iuți, pătratic ca să nu țiuie mereu
  scrNodes.gh.gain.cancelScheduledValues(t);
  scrNodes.gh.gain.setTargetAtTime(v * v * 0.035, t, 0.02);
  scrNodes.gh.gain.setTargetAtTime(0.0001, t + 0.06, 0.05);
  scrNodes.bp.frequency.setTargetAtTime(1700 + v * 2600 + Math.random() * 500, t, 0.03);
  scrNodes.hi.frequency.setTargetAtTime(4800 + v * 2600, t, 0.05);
}

export function scratchSoundEnd() {
  if (!scrNodes) return;
  const c = audio();
  const t = c.currentTime;
  scrNodes.g.gain.setTargetAtTime(0.0001, t, 0.04);
  scrNodes.gh.gain.setTargetAtTime(0.0001, t, 0.03);
  const n = scrNodes;
  scrNodes = null;
  setTimeout(() => {
    try {
      n.noise.stop();
    } catch {
      // sursa s-a oprit deja
    }
  }, 300);
}

/** Lustruirea plăcii (X-ul „tabula rasa"): un buff moale de cârpă —
    zgomot cu bandpass care urcă — și un ping subțire la final. */
export function polishSound() {
  const c = audio();
  const t = c.currentTime;
  const dur = 0.5;
  const buf = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 1.4;
  bp.frequency.setValueAtTime(800, t);
  bp.frequency.exponentialRampToValueAtTime(3600, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.07, t + 0.12);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(bp);
  bp.connect(g);
  g.connect(c.destination);
  src.start(t);
  const o = c.createOscillator();
  o.type = "sine";
  o.frequency.value = 2800;
  const og = c.createGain();
  og.gain.setValueAtTime(0.0001, t + 0.38);
  og.gain.exponentialRampToValueAtTime(0.035, t + 0.4);
  og.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
  o.connect(og);
  og.connect(c.destination);
  o.start(t + 0.38);
  o.stop(t + 0.6);
}

/** Avans scurt de hârtie termică (un articol nou pe bon): aceeași
    imprimantă ca bonPrint, dar ~0.3s și fără ghilotină. */
export function bonFeed() {
  const c = audio();
  const t0 = c.currentTime;
  const dur = 0.32;
  const buf = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) {
    const t = i / c.sampleRate;
    const gate = Math.sin(2 * Math.PI * 28 * t) > -0.2 ? 1 : 0.15;
    d[i] = (Math.random() * 2 - 1) * gate * (1 - i / d.length);
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1250;
  bp.Q.value = 0.8;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.14, t0 + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(bp);
  bp.connect(g);
  g.connect(c.destination);
  src.start(t0);
}

