/**
 * Business-language triggers per indicator — how stakeholders (who don't
 * speak research) actually phrase these needs, mostly in Romanian.
 * Highest-weighted field in the v1 lexical mapping engine.
 *
 * Matching is diacritics-insensitive and prefix-based (≥4 chars), so
 * "recomanda" also matches "recomandă/recomandarea/recomandat".
 * Manual corrections made in the review UI accumulate separately
 * (loom:mapping-learned:v1) — this file stays the clean, hand-curated base.
 */

export const INDICATOR_KEYWORDS_RO: Record<string, string[]> = {
  // ── Brand Health & Equity ────────────────────────────────────────────────
  "tom-awareness": ["primul brand", "prima marca", "top of mind", "primul care le vine in minte", "cat de cunoscuti suntem"],
  "spontaneous-awareness": ["ce branduri stiu", "notorietate spontana", "ne stiu lumea", "cat de cunoscut", "awareness"],
  "aided-awareness": ["au auzit de noi", "recunosc brandul", "notorietate", "recunoastere"],
  "brand-salience": ["se gandesc la noi", "in ce situatii", "ocazii de consum", "mental availability", "prezenta in minte"],
  "brand-familiarity": ["cat de bine ne cunosc", "familiaritate", "ce stiu despre noi"],
  "brand-consideration": ["ne-ar lua in calcul", "lista scurta", "considerare", "ar alege intre", "shortlist"],
  "brand-preference": ["brandul preferat", "prima alegere", "preferinta", "ne prefera"],
  "brand-trial": ["au incercat", "au testat", "prima achizitie", "trial"],
  "brand-usage": ["cine ne foloseste", "utilizatori actuali", "cat de des ne folosesc", "clienti activi"],
  bumo: ["brandul principal", "folosesc cel mai des", "marca principala", "cota de piata"],
  "brand-loyalty": ["loialitate", "fideli", "raman la noi", "ne-ar parasi", "retentie clienti", "fidelizare"],
  "brand-advocacy": ["ne recomanda", "vorbesc despre noi", "vorbi de bine despre noi", "ambasadori", "word of mouth", "din gura in gura"],
  "brand-image": ["imaginea brandului", "cum suntem perceputi", "perceptia", "ce cred despre noi", "asocieri", "ne diferentiem", "diferentiere", "pozitionare", "fata de concurenta"],
  "brand-affinity": ["legatura emotionala", "iubesc brandul", "atasament", "li se potriveste", "conexiune"],
  "brand-trust": ["au incredere in noi", "incredere in brand", "credibilitate", "brand de incredere"],
  "brand-equity-index": ["puterea brandului", "cat de puternic e brandul", "brand equity", "sanatatea brandului"],
  "brand-funnel-conversion": ["funnel", "palnie", "unde pierdem clienti", "conversie", "de la cunoastere la cumparare"],
  "share-of-voice": ["se vad reclamele", "prezenta in media", "vizibilitate publicitate", "share of voice", "cat de vizibili"],

  // ── Usage & Attitudes ────────────────────────────────────────────────────
  "category-penetration": ["cati folosesc categoria", "penetrare", "cati au", "piata potentiala", "marimea pietei"],
  "usage-frequency": ["cat de des folosesc", "frecventa", "de cate ori", "cat de des cumpara"],
  "usage-occasions": ["cand folosesc", "in ce momente", "ocazii", "in ce context", "situatii de utilizare"],
  "weight-of-usage": ["utilizatori intensi", "heavy users", "cat de mult consuma", "cantitate"],
  "brand-repertoire": ["ce branduri folosesc", "intre ce aleg", "alterneaza", "mix de branduri"],
  "share-of-wallet": ["cat cheltuie la noi", "din bugetul lor", "share of wallet", "cota din cheltuieli"],
  "habits-practices": ["obiceiuri", "cum folosesc", "ritualuri", "rutina", "comportament de utilizare"],
  "category-attitudes": ["atitudini fata de categorie", "ce cred despre categorie", "cat de implicati"],
  "needs-motivations": ["ce nevoi au", "motivatii", "de ce folosesc", "ce ii motiveaza", "ce cauta"],
  "jobs-to-be-done": ["ce treaba rezolva", "jobs to be done", "jtbd", "ce problema le rezolvam", "pentru ce ne angajeaza", "progres"],
  "path-to-purchase": ["cum ajung sa cumpere", "parcursul de cumparare", "customer journey", "traseul", "cum decid", "procesul de decizie", "unde se informeaza"],
  "channel-usage": ["de unde cumpara", "canale de vanzare", "online sau magazin", "unde cumpara"],
  "media-consumption": ["ce media consuma", "unde ii gasim", "pe ce platforme", "unde sa facem reclama", "social media"],
  "lapsing-churn-reasons": ["de ce pleaca", "de ce renunta", "ne parasesc", "am pierdut clienti", "de ce nu mai folosesc", "abandon", "churn", "clienti pierduti", "au plecat la"],

  // ── Purchase Behaviour & Pricing ─────────────────────────────────────────
  "purchase-intention": ["ar cumpara", "intentie de cumparare", "cati ar cumpara", "cumparare viitoare"],
  "purchase-triggers": ["ce ii convinge", "ce declanseaza cumpararea", "de ce cumpara", "factorul decisiv", "ce ii face sa aleaga"],
  "purchase-barriers": ["de ce nu cumpara", "bariere", "ce ii opreste", "obstacole", "retineri", "de ce nu ne aleg", "ezita sa cumpere", "ezitare la cumparare"],
  "trial-intent": ["ar incerca", "ar testa", "prima incercare", "sa il probeze"],
  "repeat-purchase-intent": ["ar cumpara din nou", "recumparare", "a doua achizitie", "revin"],
  "willingness-to-pay": ["cat ar plati", "dispusi sa plateasca", "cat valoreaza pentru ei", "ar plati mai mult", "premium"],
  "van-westendorp": ["ce pret sa punem", "pret optim", "prea scump", "prea ieftin", "interval de pret", "sensibilitate la pret", "pretul corect"],
  "gabor-granger": ["daca marim pretul", "crestere de pret", "scumpire", "elasticitate", "pana la ce pret"],
  "value-for-money": ["merita banii", "raport calitate pret", "value for money", "pret corect pentru ce oferim"],
  "promo-responsiveness": ["promotii", "reduceri", "oferte", "discount", "reactioneaza la oferte", "vanatori de oferte"],

  // ── Concept & Product Testing ────────────────────────────────────────────
  "overall-liking": ["le place produsul", "cat de mult le place", "parerea despre produs", "reactia la concept"],
  "likes-dislikes": ["ce le place si ce nu", "puncte forte si slabe", "plusuri si minusuri"],
  uniqueness: ["cat de diferit e", "unic", "noutate", "seamana cu altele", "inovator"],
  relevance: ["e relevant pentru ei", "raspunde unei nevoi", "li se potriveste", "au nevoie de asta"],
  believability: ["e credibil", "cred promisiunea", "suna prea frumos", "claim credibil"],
  comprehension: ["inteleg conceptul", "e clar ce oferim", "inteleg produsul", "mesaj clar"],
  "jar-scales": ["prea dulce", "prea intens", "exact cat trebuie", "nivelul potrivit", "optimizare produs"],
  "paired-preference": ["care varianta e preferata", "a sau b", "intre doua variante", "care e mai buna"],
  "expected-frequency": ["cat de des l-ar folosi", "frecventa asteptata", "cat ar consuma"],
  "price-perception-concept": ["pretul conceptului", "cat s-ar astepta sa coste", "reactia la pret"],

  // ── CX & Satisfaction ────────────────────────────────────────────────────
  nps: ["ne-ar recomanda", "recomandare", "nps", "net promoter", "ar spune altora", "promotori", "detractori"],
  csat: ["cat de multumiti", "satisfactie", "multumiti de", "nemultumiti", "satisfactia clientilor"],
  ces: ["cat de usor le e", "efort", "birocratic", "greoi", "usurinta rezolvarii", "cat de simplu e sa"],
  "repurchase-intention": ["ar ramane clienti", "reinnoire", "ar continua", "renew", "prelungesc contractul"],
  "complaint-incidence": ["reclamatii", "probleme intampinate", "plangeri", "cum rezolvam problemele", "sesizari"],
  "key-driver-importance": ["ce conteaza cel mai mult", "factorii importanti", "ce determina satisfactia", "prioritati", "drivere"],

  // ── Advertising & Communications ─────────────────────────────────────────
  "ad-recall": ["isi amintesc reclama", "au retinut campania", "memorabilitate", "recall"],
  "ad-recognition": ["recunosc reclama", "au vazut reclama", "au vazut campania"],
  "brand-linkage": ["stiu a cui e reclama", "leaga reclama de brand", "atribuire"],
  "message-takeout": ["ce mesaj au inteles", "ce au retinut din reclama", "mesajul principal", "ce transmite campania"],
  persuasion: ["ii convinge reclama", "schimba parerea", "ii apropie de brand", "eficienta campaniei"],
  "ad-likeability": ["le place reclama", "reactia la reclama", "reclama placuta"],
  "ad-distinctiveness": ["reclama iese in evidenta", "se remarca", "diferita de alte reclame"],
  "call-to-action": ["ce fac dupa reclama", "ii impinge la actiune", "click", "trafic din campanie"],

  // ── UX Research ──────────────────────────────────────────────────────────
  "task-success": ["reusesc sa faca", "finalizeaza", "duc la capat", "rata de succes", "se descurca"],
  "time-on-task": ["cat dureaza sa", "cat timp le ia", "rapid de folosit"],
  "error-rate": ["greseli", "erori", "se incurca", "unde gresesc"],
  sus: ["usurinta de utilizare", "usor de folosit", "uzabilitate", "usability", "sus score"],
  seq: ["cat de grea e sarcina", "dificultatea", "usor sau greu"],
  "umux-lite": ["face ce au nevoie", "isi indeplineste rolul", "util si usor"],
  umux: ["frustrare in aplicatie", "pierd timp corectand", "experienta frustranta"],
  "first-click": ["unde dau click prima data", "primul click", "gasesc butonul"],
  findability: ["gasesc in meniu", "navigare", "structura meniului", "unde cauta", "gasesc functia"],
  learnability: ["invata repede", "curba de invatare", "usor de invatat"],
  "nasa-tlx": ["efort mental", "cat de solicitant", "obositor de folosit", "incarcare cognitiva"],
  desirability: ["ce impresie lasa", "cum descriu aplicatia", "atractiv vizual", "premium sau ieftin"],
  "feature-adoption": ["folosesc functia", "adoptia functionalitatii", "stiu de functie", "descopera functia"],
  engagement: ["cat de des intra in aplicatie", "activi in aplicatie", "engagement", "dau", "mau", "isi deschid aplicatia"],
  "retention-churn": ["se intorc in aplicatie", "renunta la aplicatie", "retentie utilizatori", "abandoneaza aplicatia", "nu isi mai deschid"],
  "heart-framework": ["metrici ux", "sanatatea produsului", "heart"],
  accessibility: ["accesibilitate", "dizabilitati", "cititor de ecran", "nevazatori", "wcag", "accesibil pentru toti"],
  "digital-literacy": ["se descurca cu tehnologia", "competente digitale", "nu sunt tehnici", "utilizatori incepatori", "varstnici si tehnologia", "alfabetizare digitala"],

  // ── Banking & Payments ───────────────────────────────────────────────────
  "main-bank-share": ["banca principala", "banca lor de baza", "unde au salariul", "main bank"],
  "bank-switching-intent": ["si-ar schimba banca", "pleaca la alta banca", "migrare bancara"],
  "switching-triggers-barriers": ["de ce si-ar schimba banca", "ce ii tine la banca actuala", "trec la revolut", "trec la concurenta", "ce i-ar face sa plece"],
  "cross-sell-intent": ["ar lua alt produs de la noi", "cross sell", "vanzare incrucisata", "alte produse bancare"],
  "consolidation-intent": ["totul la o singura banca", "consolidare", "isi muta produsele"],
  "product-purchase-pipeline": ["ce produse vor sa isi ia", "planuri financiare viitoare", "intentii de achizitie produse"],
  "onboarding-completion": ["deschidere de cont", "onboarding", "abandoneaza inrolarea", "finalizeaza contul"],
  "digital-banking-adoption": ["folosesc aplicatia bancii", "mobile banking", "internet banking", "banking digital"],
  "banking-channel-mix": ["aplicatie sau sucursala", "canale bancare", "merg la ghiseu", "prefera sucursala"],
  "payment-method-usage": ["cum platesc", "cash sau card", "metode de plata", "apple pay", "plata cu telefonul"],
  "fintech-usage": ["revolut", "neobanci", "fintech", "banci digitale"],
  "bnpl-usage": ["plata in rate", "buy now pay later", "bnpl", "rate fara dobanda"],
  "trust-in-banks": ["incredere in banci", "sistemul bancar", "banca e de partea lor"],
  "fee-transparency": ["comisioane", "taxe ascunse", "transparenta costurilor", "comisioane corecte"],
  "perceived-security": ["siguranta banilor", "frauda", "teapa", "phishing", "securitate", "date in siguranta"],

  // ── Financial Needs & Wellbeing ──────────────────────────────────────────
  "financial-wellbeing": ["bunastare financiara", "se descurca cu banii", "siguranta financiara", "stabilitate financiara"],
  "financial-literacy": ["educatie financiara", "inteleg produsele financiare", "cunostinte financiare"],
  "savings-emergency-fund": ["economii", "fond de urgenta", "bani pusi deoparte", "economisesc"],
  "budgeting-style": ["isi fac buget", "gestioneaza banii", "evidenta cheltuielilor", "planificare bani"],
  "financial-goals": ["obiective financiare", "pentru ce economisesc", "planuri cu banii"],
  "attitude-to-credit": ["atitudine fata de credit", "se imprumuta", "datoria e ok", "credit ipotecar atitudine"],
  "debt-burden": ["povara datoriilor", "rate mari", "supra-indatorare", "nu mai fac fata ratelor"],
  "risk-tolerance": ["apetit de risc", "toleranta la risc", "investitii riscante", "profil de risc"],
  "retirement-preparedness": ["pensie", "pregatiti de pensie", "economii pentru batranete", "pilonul"],
  "protection-gap": ["asigurari", "subasigurare", "acoperire", "protectie financiara"],
  "financial-anxiety": ["stres financiar", "anxietate legata de bani", "griji cu banii", "incredere in deciziile financiare"],
  "advice-seeking": ["de unde cer sfaturi", "cine ii sfatuieste", "consultant financiar", "surse de informare financiara"],

  // ── Added in final audit ─────────────────────────────────────────────────
  "kano-model": ["ce functii sa prioritizam", "must have", "nice to have", "ce ii incanta", "prioritizare functionalitati", "kano"],
  maxdiff: ["ce conteaza cel mai mult si cel mai putin", "ierarhizare beneficii", "maxdiff", "prioritati intre beneficii"],
  turf: ["ce combinatie de variante", "portofoliu optim", "cate variante sa lansam", "turf", "gama optima"],
  "distinctive-brand-assets": ["ne recunosc dupa logo", "culori de brand", "elemente distinctive", "identitate vizuala", "mascota"],
  "sustainability-perception": ["sustenabilitate", "eco", "mediu", "verde", "responsabilitate sociala", "etic"],
  servqual: ["calitatea serviciului", "servirea clientilor", "personalul e amabil", "calitatea la ghiseu", "servqual"],
  "conjoint-analysis": ["ce combinatie de atribute", "compromisuri", "trade-off", "conjoint", "configurarea optima a produsului"],
};
