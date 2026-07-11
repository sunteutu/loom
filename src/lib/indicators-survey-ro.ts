/**
 * Romanian translations of the survey items' respondent-facing fields
 * (stem, scalePoints, options, attributes, subStems) plus the routing
 * `base`, keyed by indicator id. Arrays are parallel to the English
 * source (same item count and order), so an item resolves its translation
 * by position. `analysis` / `placement` / `notes` stay English-only —
 * they are researcher-facing documentation, not questionnaire content.
 *
 * Bracket placeholders ([category], [Client brand], …) are kept verbatim.
 */

export interface SurveyItemRo {
  stem: string;
  scalePoints?: string[];
  options?: string[];
  attributes?: string[];
  subStems?: string[];
  base: string;
}

export const INDICATOR_SURVEY_RO: Record<string, SurveyItemRo[]> = {
  // ── Brand Health & Equity ────────────────────────────────────────────────
  "tom-awareness": [
    {
      stem: "Când vă gândiți la [category], care este primul brand care vă vine în minte? Vă rugăm să scrieți primul brand care vă vine în minte.",
      base: "Toți respondenții",
    },
  ],
  "spontaneous-awareness": [
    {
      stem: "La ce alte branduri de [category] vă mai puteți gândi? Vă rugăm să enumerați toate brandurile care vă vin în minte, chiar dacă le cunoașteți doar după nume.",
      base: "Toți respondenții",
    },
  ],
  "brand-salience": [
    {
      stem: "Gândindu-vă la situațiile de mai jos, ce brand(uri) de [category] ați asocia cu fiecare dintre acestea? Selectați toate brandurile care vă vin în minte pentru fiecare situație.",
      attributes: ["Când doriți să vă răsfățați sau să vă recompensați","Pentru o ocazie obișnuită / de zi cu zi","Când sunteți cu familia sau prietenii","Când aveți nevoie de ceva rapid / din mers","Când căutați cea mai bună calitate","Când căutați cel mai bun raport calitate-preț"],
      options: ["[Client brand]","[Competitor 1]","[Competitor 2]","[Competitor 3]","Niciunul dintre acestea"],
      base: "Toți respondenții care cunosc cel puțin un brand",
    },
  ],
  "brand-familiarity": [
    {
      stem: "Cât de bine cunoașteți [brand]?",
      scalePoints: ["Îl cunosc foarte bine","Îl cunosc destul de bine","Știu doar câteva lucruri despre el","Îi știu doar numele","Nu am auzit niciodată de el"],
      base: "Toți respondenții (întrebare adresată pentru fiecare brand din setul de branduri)",
    },
  ],
  "brand-consideration": [
    {
      stem: "Pe care dintre următoarele branduri de [category], dacă este cazul, le-ați lua în considerare pentru cumpărare data viitoare când veți dori să achiziționați [category]?",
      options: ["[Client brand]","[Competitor 1]","[Competitor 2]","[Competitor 3]","[Competitor 4]","Niciunul dintre acestea"],
      base: "Toți respondenții care cunosc cel puțin un brand",
    },
  ],
  "brand-preference": [
    {
      stem: "Iar dintre brandurile pe care le-ați lua în considerare, care este SINGURUL brand care ar fi prima dumneavoastră alegere data viitoare când cumpărați [category]?",
      options: ["[Client brand]","[Competitor 1]","[Competitor 2]","[Competitor 3]","[Competitor 4]"],
      base: "Respondenții care ar lua în considerare 2+ branduri (setul este preluat automat din întrebarea de considerare); respondenții cu un singur brand în considerare sunt alocați automat.",
    },
  ],
  "brand-trial": [
    {
      stem: "Pe care dintre următoarele branduri de [category], dacă este cazul, le-ați cumpărat sau utilizat vreodată?",
      options: ["[Client brand]","[Competitor 1]","[Competitor 2]","[Competitor 3]","[Competitor 4]","Niciunul dintre acestea"],
      base: "Toți respondenții care cunosc cel puțin un brand",
    },
  ],
  "brand-usage": [
    {
      stem: "Când ați cumpărat sau utilizat ultima dată fiecare dintre următoarele branduri de [category]?",
      attributes: ["[Client brand]","[Competitor 1]","[Competitor 2]","[Competitor 3]","[Competitor 4]"],
      scalePoints: ["În ultimele 4 săptămâni","Acum 1–3 luni","Acum 4–12 luni","Acum mai mult de 12 luni","Nu am utilizat niciodată"],
      base: "Toți respondenții care cunosc cel puțin un brand.",
    },
  ],
  bumo: [
    {
      stem: "Care este SINGURUL brand de [category] pe care îl utilizați sau îl cumpărați cel mai des?",
      options: ["[Client brand]","[Competitor 1]","[Competitor 2]","[Competitor 3]","[Competitor 4]","Alt brand (vă rugăm să precizați)","Niciun brand anume / variază"],
      base: "Respondenții care au utilizat cel puțin un brand din categorie (utilizatori ai categoriei).",
    },
  ],
  "brand-loyalty": [
    {
      stem: "Cât de probabil este să continuați să utilizați sau să cumpărați [main brand] în viitor?",
      scalePoints: ["Sigur voi continua","Probabil voi continua","S-ar putea să continui sau nu","Probabil nu voi continua","Sigur nu voi continua"],
      base: "Utilizatorii brandului (utilizatorii brandului principal / BUMO = brandul); brandul principal este preluat automat.",
    },
  ],
  "brand-advocacy": [
    {
      stem: "Cât de probabil este să recomandați [brand] unui prieten sau unui coleg?",
      scalePoints: ["0 — Deloc probabil","1","2","3","4","5","6","7","8","9","10 — Extrem de probabil"],
      base: "Respondenții familiarizați cu brandul / care au utilizat brandul.",
    },
  ],
  "brand-image": [
    {
      stem: "Pe care dintre următoarele branduri le asociați cu fiecare dintre afirmațiile de mai jos? Selectați toate brandurile care se potrivesc pentru fiecare afirmație.",
      attributes: ["Este un brand pentru oameni ca mine","Oferă calitate ridicată","Are un raport bun calitate-preț","Este inovator / se îmbunătățește constant","Este un brand în care pot avea încredere","Devine tot mai popular","Are o reputație bună"],
      options: ["[Client brand]","[Competitor 1]","[Competitor 2]","[Competitor 3]","Niciunul dintre acestea"],
      base: "Respondenții care cunosc cel puțin un brand din listă.",
    },
  ],
  "brand-affinity": [
    {
      stem: "În ce măsură sunteți de acord sau în dezacord cu fiecare dintre următoarele afirmații despre [brand]?",
      attributes: ["[Brand] este un brand pe care îl iubesc","[Brand] este un brand care mi se potrivește / reflectă cine sunt","Simt o legătură personală cu [brand]","Aș fi dezamăgit(ă) dacă [brand] nu ar mai fi disponibil","[Brand] este un brand pe care sunt mândru(ă) să îl utilizez"],
      scalePoints: ["Total de acord","De acord","Nici acord, nici dezacord","Dezacord","Total dezacord"],
      base: "Respondenții care cunosc / sunt familiarizați cu [brand].",
    },
  ],
  "brand-trust": [
    {
      stem: "Gândindu-vă la [brand], în ce măsură sunteți de acord sau în dezacord cu afirmația că este „un brand în care puteți avea încredere”?",
      scalePoints: ["Total de acord","De acord","Oarecum de acord","Nici acord, nici dezacord","Oarecum în dezacord","Dezacord","Total dezacord"],
      base: "Respondenții care cunosc / sunt familiarizați cu [brand].",
    },
  ],
  "brand-equity-index": [
    {
      stem: "În ce măsură sunteți de acord sau în dezacord cu fiecare dintre următoarele afirmații despre [brand]?",
      attributes: ["[Brand] îmi satisface nevoile mai bine decât alte branduri (Semnificativ)","[Brand] oferă ceva ce alte branduri nu oferă / se diferențiază (Diferit)","[Brand] câștigă în popularitate (Diferit — dinamism)","[Brand] îmi vine repede în minte când mă gândesc la [category] (Proeminent)","[Brand] este un brand pe care l-aș avea imediat în vedere pentru cumpărare (Proeminent)"],
      scalePoints: ["Total de acord","De acord","Nici acord, nici dezacord","Dezacord","Total dezacord"],
      base: "Respondenții care cunosc [brand] (întrebare adresată pentru brandul clientului și pentru principalii competitori).",
    },
  ],
  "brand-funnel-conversion": [
    {
      stem: "Pentru fiecare brand de [category], vă rugăm să indicați fiecare afirmație care vi se aplică. (Această grilă unică de funnel trece aceeași listă de branduri prin fiecare etapă; conversia este derivată, nu întrebată direct.)",
      subStems: ["Am auzit de acest brand (Notorietate)","Cunosc bine acest brand (Familiaritate)","Aș lua în considerare acest brand (Considerare)","Am utilizat vreodată acest brand (Încercare)","L-am utilizat în [reference period] (Utilizare curentă)","Este brandul pe care îl utilizez cel mai des (Brand principal)"],
      options: ["[Client brand]","[Competitor 1]","[Competitor 2]","[Competitor 3]","[Competitor 4]"],
      base: "Toți respondenții (fiecare etapă are ca bază etapa anterioară, prin rutare).",
    },
  ],
  "share-of-voice": [
    {
      stem: "Pentru care dintre următoarele branduri de [category], dacă este cazul, ați văzut sau auzit recent reclame (în ultimele [reference period])?",
      options: ["[Client brand]","[Competitor 1]","[Competitor 2]","[Competitor 3]","[Competitor 4]","Niciunul dintre acestea"],
      base: "Toți respondenții care cunosc cel puțin un brand.",
    },
  ],
  "aided-awareness": [
    {
      stem: "Despre care dintre aceste mărci de [category] ați auzit, chiar și numai după nume?",
      options: ["[Client brand]","[Competitor 1]","[Competitor 2]","[Competitor 3]","…","Niciuna dintre acestea"],
      base: "Toți respondenții",
    },
  ],

  // ── Usage & Attitudes (U&A) ──────────────────────────────────────────────
  "category-penetration": [
    {
      stem: "Care dintre următoarele variante descrie cel mai bine cât de des ați utilizat sau consumat [category] în ultimele 3 luni?",
      scalePoints: ["Am utilizat în ultimele 3 luni","Am utilizat, dar nu în ultimele 3 luni","Nu am utilizat niciodată"],
      base: "Toți respondenții",
    },
  ],
  "usage-frequency": [
    {
      stem: "Într-o lună obișnuită, cât de des utilizați [category]?",
      scalePoints: ["De mai multe ori pe zi sau mai des","Aproximativ o dată pe zi","De câteva ori pe săptămână","Aproximativ o dată pe săptămână","De 2-3 ori pe lună","Aproximativ o dată pe lună","Mai rar de o dată pe lună"],
      base: "Utilizatori ai categoriei (au utilizat în perioada de referință)",
    },
  ],
  "usage-occasions": [
    {
      stem: "Gândindu-vă la toate momentele în care utilizați [category], cu care dintre următoarele ocazii îl utilizați de obicei? Selectați toate variantele care se aplică.",
      options: ["Dimineața, la prima oră","La mese","Ca gustare sau răsfăț între mese","Pentru un plus de energie / revigorare","Pentru a mă relaxa","Când socializez cu alte persoane","În timp ce lucrez sau învăț","Seara sau înainte de culcare","Altă ocazie"],
      base: "Utilizatori ai categoriei",
    },
  ],
  "weight-of-usage": [
    {
      stem: "Într-o zi obișnuită în care utilizați [category], aproximativ câte porții consumați? Vă rugăm să introduceți un număr.",
      base: "Utilizatori ai categoriei",
    },
  ],
  "brand-repertoire": [
    {
      stem: "Care dintre următoarele mărci de [category] ați utilizat în ultimele 3 luni? Selectați toate variantele care se aplică.",
      options: ["[Client brand]","[Competitor 1]","[Competitor 2]","[Competitor 3]","[Competitor 4]","[Competitor 5]","Altă marcă","Niciuna dintre acestea"],
      base: "Utilizatori ai categoriei",
    },
  ],
  "share-of-wallet": [
    {
      stem: "Gândindu-vă la ultimele 10 achiziții de [category], vă rugăm să împărțiți aceste 10 achiziții între mărcile pe care le-ați cumpărat. Răspunsurile dumneavoastră trebuie să însumeze 10.",
      options: ["[Client brand]","[Competitor 1]","[Competitor 2]","[Competitor 3]","[Competitor 4]","[Competitor 5]","Altă marcă"],
      base: "Utilizatori ai categoriei cu un repertoriu de cel puțin 1 marcă",
    },
  ],
  "habits-practices": [
    {
      stem: "Gândindu-vă la cea mai recentă ocazie în care ați utilizat [category], care dintre următoarele lucruri le-ați făcut? Selectați toate variantele care se aplică.",
      options: ["L-am preparat acasă de la zero","L-am cumpărat gata preparat","L-am adăugat sau combinat cu altceva","L-am consumat ca atare","L-am consumat în mișcare / în afara casei","L-am consumat acasă","L-am împărțit cu alte persoane","L-am consumat singur(ă)","Am urmat o rutină sau un ritual legat de acesta","Altceva"],
      base: "Utilizatori ai categoriei",
    },
  ],
  "category-attitudes": [
    {
      stem: "În ce măsură sunteți de acord sau în dezacord cu fiecare dintre următoarele afirmații despre [category]?",
      scalePoints: ["Total de acord","De acord","Nici acord, nici dezacord","Dezacord","Total dezacord"],
      subStems: ["[Category] este o parte importantă a rutinei mele zilnice","Îmi place să încerc tipuri sau varietăți noi de [category]","Sunt dispus(ă) să plătesc mai mult pentru [category] de calitate superioară","Mă îngrijorează impactul [category] asupra sănătății","Tind să rămân la mărcile pe care le cunosc și în care am încredere","Alegerea [category] spune ceva despre cine sunt","Mi se pare copleșitoare varietatea de [category] din care pot alege","Sustenabilitatea contează pentru mine atunci când aleg [category]"],
      base: "Utilizatori ai categoriei",
    },
  ],
  "needs-motivations": [
    {
      stem: "Cât de important este pentru dumneavoastră fiecare dintre următoarele aspecte atunci când alegeți sau utilizați [category]?",
      scalePoints: ["Extrem de important","Foarte important","Moderat de important","Puțin important","Deloc important"],
      subStems: ["Are gust bun / îmi place","Se încadrează în bugetul meu","Este convenabil și ușor de utilizat","Este bun pentru sănătatea mea","Îmi dă energie","Mă ajută să mă relaxez","Se potrivește cu valorile mele (etic / sustenabil)","Este o marcă în care pot avea încredere","Se potrivește ocaziei","Este ceva ce pot împărți cu alții"],
      base: "Utilizatori ai categoriei",
    },
  ],
  "jobs-to-be-done": [
    {
      stem: "Atunci când [getting the job done — e.g. 'preparing a quick weekday meal'], cât de IMPORTANT este pentru dumneavoastră fiecare dintre următoarele aspecte?",
      scalePoints: ["Deloc important","Oarecum important","Important","Foarte important","Extrem de important"],
      attributes: ["Să reduc la minimum timpul necesar pentru a [job step 1]","Să reduc la minimum probabilitatea ca [undesirable outcome happens]","Să cresc certitudinea că [desired result is achieved]","Să reduc la minimum efortul necesar pentru a [job step 2]","Să cresc încrederea pe care o simt că [emotional / social outcome]"],
      base: "Populația țintă care realizează sarcina respectivă",
    },
    {
      stem: "Și gândindu-vă la modul în care realizați acest lucru ÎN PREZENT, cât de MULȚUMIT(Ă) sunteți de fiecare dintre următoarele aspecte?",
      scalePoints: ["Deloc mulțumit(ă)","Oarecum mulțumit(ă)","Mulțumit(ă)","Foarte mulțumit(ă)","Complet mulțumit(ă)"],
      attributes: ["Să reduc la minimum timpul necesar pentru a [job step 1]","Să reduc la minimum probabilitatea ca [undesirable outcome happens]","Să cresc certitudinea că [desired result is achieved]","Să reduc la minimum efortul necesar pentru a [job step 2]","Să cresc încrederea pe care o simt că [emotional / social outcome]"],
      base: "Aceiași respondenți ca la bateria de Importanță",
    },
  ],
  "path-to-purchase": [
    {
      stem: "Gândindu-vă la ultima dată când ați cumpărat [category], care dintre următoarele lucruri le-ați făcut sau utilizat înainte de a decide ce să cumpărați? Selectați toate variantele care se aplică.",
      options: ["Am căutat online / am folosit un motor de căutare","Am vizitat site-ul mărcii sau al retailerului","Am citit recenzii sau evaluări online","Am folosit rețelele sociale sau am văzut conținut pe rețelele sociale","Am cerut recomandări prietenilor sau familiei","Am văzut o reclamă (TV, online, exterior, presă)","Am răsfoit sau am comparat produse în magazin","Am folosit un site sau o aplicație de comparare a prețurilor","M-am bazat pe experiența anterioară cu marca","Am decis pe moment, la raft / la punctul de vânzare","Niciuna dintre acestea"],
      base: "Cumpărători ai categoriei (au cumpărat în perioada de referință)",
    },
  ],
  "channel-usage": [
    {
      stem: "Gândindu-vă la ultimele 10 achiziții de [category], câte au fost făcute prin fiecare dintre următoarele canale? Răspunsurile dumneavoastră trebuie să însumeze 10.",
      options: ["Supermarket mare / hipermarket","Magazin mic / de proximitate","Magazin tip discount","Online — site-ul sau aplicația retailerului","Online — marketplace (de ex. Amazon)","Site-ul propriu al mărcii / direct","Magazin specializat sau independent","Alt canal"],
      base: "Cumpărători ai categoriei",
    },
  ],
  "media-consumption": [
    {
      stem: "Cât de des utilizați personal fiecare dintre următoarele tipuri de media sau platforme?",
      scalePoints: ["De mai multe ori pe zi","Aproximativ o dată pe zi","De câteva ori pe săptămână","Aproximativ o dată pe săptămână","Mai rar","Niciodată"],
      subStems: ["TV în direct / clasic","Streaming video (de ex. Netflix, YouTube)","Radio sau streaming de muzică (de ex. Spotify)","Știri sau site-uri online","Ziare sau reviste tipărite","Facebook","Instagram","TikTok","X (Twitter)","Podcasturi","Newslettere pe email","Publicitate exterioară (panouri, transport public, afișe)"],
      base: "Toți respondenții",
    },
  ],
  "lapsing-churn-reasons": [
    {
      stem: "Ați menționat că ați utilizat [category] în trecut, dar nu recent. Care dintre următoarele sunt motive pentru care ați renunțat sau ați redus consumul? Selectați toate variantele care se aplică.",
      options: ["A devenit prea scump","Am găsit o alternativă mai bună","Mi s-au schimbat gusturile sau preferințele","Motive de sănătate sau dietă","Nu mai era convenabil de cumpărat","Calitatea s-a înrăutățit","Pur și simplu mi-am pierdut interesul / m-am plictisit","Schimbări în stilul meu de viață sau în circumstanțe","Am avut o experiență neplăcută","Fără un motiv anume","Alt motiv (vă rugăm să specificați)"],
      base: "Utilizatori lapsați (au utilizat anterior, dar nu în perioada de referință).",
    },
  ],

  // ── Purchase Behaviour & Pricing ─────────────────────────────────────────
  "purchase-intention": [
    {
      stem: "Cât de probabil ar fi să cumpărați [product] data viitoare când faceți cumpărături pentru [category]?",
      scalePoints: ["Cu siguranță aș cumpăra","Probabil aș cumpăra","Poate aș cumpăra, poate nu","Probabil nu aș cumpăra","Cu siguranță nu aș cumpăra"],
      base: "Toți respondenții (sau: toți cei expuși la concept)",
    },
  ],
  "van-westendorp": [
    {
      stem: "Imaginându-vă că urmează să cumpărați [product], la ce preț ați spune că este…",
      subStems: ["…atât de scump încât nu ați lua în calcul să îl cumpărați? (Prea scump)","…începe să devină scump, dar l-ați lua totuși în calcul? (Scump / partea superioară)","…un chilipir, o achiziție excelentă pentru banii dați? (Ieftin / raport bun calitate-preț)","…atât de ieftin încât v-ați îndoi de calitatea lui? (Prea ieftin)"],
      base: "Toți respondenții (sau cumpărătorii din categorie)",
    },
  ],
  "purchase-triggers": [
    {
      stem: "Care dintre următoarele, dacă există, v-ar face să alegeți mai degrabă [product] în locul alternativelor pe care le luați în considerare în prezent? Selectați toate variantele care se aplică.",
      options: ["Se integrează ușor în rutina mea zilnică","Gustul/aroma îmi este pe plac","Oferă un raport calitate-preț mai bun decât alternativele","Provine de la un brand în care am încredere","Este făcut cu ingrediente care îmi inspiră încredere","Este recomandat de persoane pe care le cunosc","Este recomandat de un expert sau de un profesionist","Este ușor de cumpărat din locurile unde fac deja cumpărături","Are dimensiunea/formatul de ambalaj potrivit pentru mine","Ambalajul este atrăgător sau practic","Este mai bun pentru mediul înconjurător","Niciuna dintre acestea"],
      base: "Toți respondenții",
    },
  ],
  "purchase-barriers": [
    {
      stem: "Ați spus că probabil sau sigur nu ați cumpăra [product]. Care dintre următoarele, dacă există, sunt motivele? Selectați toate variantele care se aplică.",
      options: ["Este prea scump pentru ceea ce oferă","Sunt mulțumit(ă) de ceea ce folosesc în prezent","Nu văd prin ce este diferit sau mai bun","Nu am încredere în brand","Am rezerve legate de ingrediente/conținut","Nu sunt sigur(ă) cum sau când l-aș folosi","Gustul/aroma nu îmi este pe plac","Nu este disponibil în locurile unde fac de obicei cumpărături","Dimensiunea/formatul ambalajului nu mi se potrivește","Am avut o experiență neplăcută cu un produs asemănător","Alt motiv (vă rugăm să precizați)","Niciun motiv anume"],
      base: "Respingători: respondenții care au răspuns „Probabil/Sigur nu aș cumpăra” la intenția de cumpărare.",
    },
  ],
  "trial-intent": [
    {
      stem: "Dacă [product] ar fi disponibil în locurile unde faceți de obicei cumpărături, cât de probabil ar fi să îl încercați?",
      scalePoints: ["Sigur l-aș încerca","Probabil l-aș încerca","Poate da, poate nu","Probabil nu l-aș încerca","Sigur nu l-aș încerca"],
      base: "Toți respondenții",
    },
  ],
  "repeat-purchase-intent": [
    {
      stem: "Acum, după ce ați folosit [product], cât de probabil ar fi să îl cumpărați din nou?",
      scalePoints: ["Sigur l-aș cumpăra din nou","Probabil l-aș cumpăra din nou","Poate da, poate nu","Probabil nu l-aș cumpăra din nou","Sigur nu l-aș cumpăra din nou"],
      base: "Respondenții care au încercat/folosit produsul (post-testare sau cumpărători existenți de pe piață).",
    },
  ],
  "willingness-to-pay": [
    {
      stem: "Gândindu-vă la tot ceea ce oferă [product], care este suma maximă pe care ați fi dispus(ă) să o plătiți pentru el înainte de a decide că nu merită?",
      base: "Toți respondenții (sau cumpărătorii din categorie)",
    },
  ],
  "gabor-granger": [
    {
      stem: "La un preț de [PRICE], cât de probabil ar fi să cumpărați [product]?",
      scalePoints: ["Sigur aș cumpăra","Probabil aș cumpăra","Poate da, poate nu","Probabil nu aș cumpăra","Sigur nu aș cumpăra"],
      base: "Toți respondenții (sau cumpărătorii din categorie)",
    },
  ],
  "value-for-money": [
    {
      stem: "Gândindu-vă la prețul său și la ceea ce oferă, cum ați evalua [product] din punct de vedere al raportului calitate-preț?",
      scalePoints: ["Raport excelent","Raport bun","Raport acceptabil","Raport slab","Raport foarte slab"],
      base: "Toți respondenții (sau cei care au evaluat/folosit produsul).",
    },
  ],
  "promo-responsiveness": [
    {
      stem: "Cât de bine vă descrie fiecare dintre următoarele afirmații atunci când faceți cumpărături de [category]?",
      scalePoints: ["Mă descrie complet","Mă descrie bine","Mă descrie într-o oarecare măsură","Mă descrie foarte puțin","Nu mă descrie deloc"],
      subStems: ["Schimb adesea brandurile pentru a profita de o ofertă specială sau de un cupon","Am tendința să îmi fac stocuri dintr-un produs atunci când este la promoție","Verific dacă există reduceri sau oferte înainte de a cumpăra din această categorie","Sunt dispus(ă) să încerc un brand nou dacă este la o ofertă specială de lansare","Aș cumpăra un ambalaj mai mare dacă ar reduce prețul pe unitate","Prețul obișnuit (fără promoție) este cel care contează cel mai mult pentru mine, nu ofertele"],
      base: "Toți respondenții (sau cumpărătorii din categorie)",
    },
  ],

  // ── Concept & Product Testing ────────────────────────────────────────────
  "overall-liking": [
    {
      stem: "În ansamblu, cât de mult vă place sau nu vă place [product]?",
      scalePoints: ["Îmi place extrem de mult","Îmi place foarte mult","Îmi place moderat","Îmi place puțin","Nici nu îmi place, nici nu îmi displace","Îmi displace puțin","Îmi displace moderat","Îmi displace foarte mult","Îmi displace extrem de mult"],
      base: "Toți respondenții expuși la concept/produs",
    },
  ],
  "likes-dislikes": [
    {
      stem: "Ce anume, dacă este cazul, VĂ PLACE la [product]? Vă rugăm să ne spuneți tot ce vă vine în minte.",
      base: "Toți respondenții expuși la concept/produs",
    },
  ],
  uniqueness: [
    {
      stem: "Cât de nou și diferit este [product] în comparație cu alte produse disponibile pentru dumneavoastră?",
      scalePoints: ["Extrem de nou și diferit","Foarte nou și diferit","Oarecum nou și diferit","Puțin nou și diferit","Deloc nou și diferit"],
      base: "Toți respondenții expuși la concept",
    },
  ],
  relevance: [
    {
      stem: "[Product] rezolvă o problemă sau răspunde unei nevoi importante pentru mine.",
      scalePoints: ["Sunt total de acord","Sunt parțial de acord","Nici de acord, nici în dezacord","Sunt parțial în dezacord","Sunt total în dezacord"],
      base: "Toți respondenții expuși la concept",
    },
  ],
  believability: [
    {
      stem: "Cât de credibile sunt afirmațiile făcute despre [product]?",
      scalePoints: ["Extrem de credibile","Foarte credibile","Oarecum credibile","Puțin credibile","Deloc credibile"],
      base: "Toți respondenții expuși la concept",
    },
  ],
  comprehension: [
    {
      stem: "Cât de ușor sau dificil este să înțelegeți ce este [product] și ce oferă?",
      scalePoints: ["Foarte ușor de înțeles","Destul de ușor de înțeles","Nici ușor, nici dificil","Destul de dificil de înțeles","Foarte dificil de înțeles"],
      base: "Toți respondenții expuși la concept",
    },
  ],
  "paired-preference": [
    {
      stem: "După ce ați încercat ambele produse, pe care îl preferați în ansamblu?",
      options: ["Prefer Produsul A","Prefer Produsul B","Nicio preferință"],
      base: "Respondenții care au testat orb ambele produse (test perechi/secvențial monadic cu rotație).",
    },
  ],
  "expected-frequency": [
    {
      stem: "Dacă [product] ar fi disponibil, cât de des l-ați cumpăra?",
      scalePoints: ["Mai des de o dată pe săptămână","Aproximativ o dată pe săptămână","De 2–3 ori pe lună","Aproximativ o dată pe lună","O dată la 2–3 luni","Mai rar de o dată la 2–3 luni","Niciodată"],
      base: "Toți respondenții expuși la concept (adesea adresată celor cu intenție de cumpărare pozitivă).",
    },
  ],
  "price-perception-concept": [
    {
      stem: "La prețul afișat, [product] este…",
      scalePoints: ["Un raport calitate-preț excelent","Un raport calitate-preț bun","Un raport calitate-preț acceptabil","Un raport calitate-preț slab","Un raport calitate-preț foarte slab"],
      base: "Concept cu preț: toți respondenții expuși la concept CU prețul afișat.",
    },
  ],

  // ── Customer Experience & Satisfaction ───────────────────────────────────
  csat: [
    {
      stem: "În general, cât de mulțumit(ă) sau nemulțumit(ă) sunteți de [product/service/interaction]?",
      scalePoints: ["Foarte nemulțumit(ă)","Nemulțumit(ă)","Nici mulțumit(ă), nici nemulțumit(ă)","Mulțumit(ă)","Foarte mulțumit(ă)"],
      base: "Toți clienții / utilizatorii cu experiență relevantă",
    },
  ],
  ces: [
    {
      stem: "În ce măsură sunteți de acord sau în dezacord cu următoarea afirmație: „[Company] mi-a făcut ușoară rezolvarea problemei mele.”",
      scalePoints: ["1 — Total dezacord","2","3","4","5","6","7 — Total de acord"],
      base: "Clienți care au finalizat recent o interacțiune de servicii sau au rezolvat o problemă",
    },
  ],
  "repurchase-intention": [
    {
      stem: "Cât de probabil este să continuați să utilizați [brand] / să cumpărați din nou de la [brand] [next renewal / in the future]?",
      scalePoints: ["Foarte puțin probabil","Puțin probabil","Nici probabil, nici improbabil","Probabil","Foarte probabil"],
      base: "Toți clienții actuali / abonații activi",
    },
  ],
  "complaint-incidence": [
    {
      stem: "În ultimele [6 months], ați întâmpinat vreo problemă sau dificultate cu produsele sau serviciile [brand]?",
      options: ["Da","Nu"],
      base: "Toți clienții / utilizatorii",
    },
    {
      stem: "Gândindu-vă la acea problemă, vă rugăm să răspundeți la următoarele:",
      subStems: ["Ați raportat sau ați făcut o reclamație cu privire la problemă către [brand]?","A fost problema rezolvată într-un mod satisfăcător pentru dumneavoastră?"],
      scalePoints: ["Da","Nu"],
      base: "Clienți care au întâmpinat o problemă (rutare din răspunsul „Da”).",
    },
    {
      stem: "Cât de mulțumit(ă) sau nemulțumit(ă) ați fost de modul în care [brand] a gestionat problema dumneavoastră?",
      scalePoints: ["Foarte nemulțumit(ă)","Nemulțumit(ă)","Nici mulțumit(ă), nici nemulțumit(ă)","Mulțumit(ă)","Foarte mulțumit(ă)"],
      base: "Clienți care au făcut o reclamație / au raportat problema",
    },
  ],
  "key-driver-importance": [
    {
      stem: "Vă rugăm să evaluați performanța [brand] pentru fiecare dintre următoarele aspecte:",
      scalePoints: ["1 — Slabă","2","3","4","5","6","7","8","9","10 — Excelentă"],
      attributes: ["Calitatea produsului/serviciului","Ușurința colaborării","Raportul calitate-preț","Promptitudine / viteză de reacție","Cunoștințele și amabilitatea personalului","Fiabilitate / consecvență","Rezolvarea problemelor","Comunicare și transparență"],
      base: "Toți clienții / utilizatorii cu experiență relevantă",
    },
  ],

  // ── Advertising & Communications ─────────────────────────────────────────
  "ad-recall": [
    {
      stem: "Gândindu-vă la publicitatea pe care este posibil să o fi văzut, auzit sau citit recent, ce reclame pentru [category] vă amintiți? Vă rugăm să descrieți tot ce vă vine în minte — marca, ce se întâmpla, despre ce era vorba.",
      base: "Toți respondenții",
    },
  ],
  "ad-recognition": [
    {
      stem: "Ați văzut, auzit sau citit această reclamă înainte — sub orice formă, oriunde?",
      scalePoints: ["Da, cu siguranță","Da, cred că da","Nu, nu cred","Nu, cu siguranță nu"],
      base: "Toți respondenții (cărora li se arată materialul publicitar fără elemente de marcă).",
    },
  ],
  "brand-linkage": [
    {
      stem: "Pentru ce marcă credeți că era această reclamă?",
      base: "Doar respondenții care au recunoscut reclama (Top-2-Box la ad-recognition).",
    },
  ],
  "message-takeout": [
    {
      stem: "Cu propriile dumneavoastră cuvinte, care credeți că a fost ideea sau mesajul principal pe care această reclamă a încercat să îl transmită?",
      base: "Toți respondenții expuși la materialul publicitar",
    },
  ],
  persuasion: [
    {
      stem: "Pe care dintre aceste mărci de [category] ați alege-o data viitoare când cumpărați?",
      scalePoints: ["Cu siguranță [Client brand]","Probabil [Client brand]","Poate aș alege [Client brand], poate nu","Probabil altă marcă","Cu siguranță altă marcă"],
      options: ["[Client brand]","[Competitor 1]","[Competitor 2]","[Competitor 3]","Nicio preferință"],
      base: "Toți respondenții (întrebare adresată identic înainte și după expunere, sau celulă expusă vs. grup de control echivalent).",
    },
  ],
  "ad-likeability": [
    {
      stem: "În ansamblu, cât de mult v-a plăcut sau nu v-a plăcut această reclamă?",
      scalePoints: ["Mi-a plăcut foarte mult","Mi-a plăcut într-o oarecare măsură","Nici nu mi-a plăcut, nici nu mi-a displăcut","Mi-a displăcut într-o oarecare măsură","Mi-a displăcut foarte mult"],
      base: "Toți respondenții expuși la materialul publicitar",
    },
  ],
  "ad-distinctiveness": [
    {
      stem: "În ce măsură sunteți de acord sau nu sunteți de acord că fiecare dintre următoarele afirmații descrie această reclamă?",
      scalePoints: ["Total de acord","Parțial de acord","Nici de acord, nici împotrivă","Parțial împotrivă","Total împotrivă"],
      subStems: ["Este diferită de alte reclame pentru [category]","A ieșit în evidență și mi-a atras atenția","Este unică / nu seamănă cu alte reclame pe care le-am văzut","Mi-a menținut interesul de la început până la sfârșit","Este genul de reclamă despre care oamenii ar vorbi"],
      base: "Toți respondenții expuși la materialul publicitar",
    },
  ],
  "call-to-action": [
    {
      stem: "După ce ați văzut această reclamă, care dintre următoarele acțiuni, dacă există vreuna, ar fi probabil să le faceți? Selectați toate variantele care se aplică.",
      options: ["Să caut mai multe informații despre [Client brand]","Să vizitez site-ul sau aplicația [Client brand]","Să caut [Client brand] online","Să vizitez un magazin pentru a vedea produsul","Să cumpăr sau să comand produsul","Să îl recomand sau să vorbesc despre el cu altcineva","Să urmăresc sau să interacționez cu marca pe rețelele sociale","Niciuna dintre acestea"],
      base: "Toți respondenții expuși la materialul publicitar",
    },
  ],

  // ── Validated items (from indicators-detail) ─────────────────────────────
  "jar-scales": [
    {
      stem: "Gândindu-vă la [product], vă rugăm să ne spuneți părerea dumneavoastră despre fiecare dintre următoarele aspecte:",
      scalePoints: ["Mult prea puțin","Puțin prea puțin","Exact cât trebuie","Puțin prea mult","Mult prea mult"],
      attributes: ["Dulceața","Consistența","Intensitatea aromei","Mărimea porției"],
      base: "Cei care au încercat produsul (test de utilizare)",
    },
  ],
  nps: [
    {
      stem: "Cât de probabil este să recomandați [brand] unui prieten sau unui coleg?",
      scalePoints: ["0 — Deloc probabil","1","2","3","4","5","6","7","8","9","10 — Extrem de probabil"],
      base: "Toți clienții / utilizatorii",
    },
    {
      stem: "Care este motivul principal pentru scorul pe care l-ați acordat?",
      base: "Toți (ideal: text adaptat în funcție de scor — versiuni personalizate pentru promotori vs detractori)",
    },
  ],

  // ── UX Research ──────────────────────────────────────────────────────────
  "task-success": [
    {
      stem: "Ați reușit să finalizați cu succes această sarcină?",
      options: ["Da, complet","Parțial","Nu"],
      base: "Participanții care încearcă sarcina.",
    },
  ],
  "time-on-task": [
    {
      stem: "Aproximativ cât timp considerați că v-a luat finalizarea acestei sarcini?",
      base: "Participanții care au finalizat sarcina.",
    },
  ],
  "error-rate": [
    {
      stem: "În timpul realizării acestei sarcini, ați făcut greșeli sau erori (de exemplu, un clic greșit, o introducere greșită sau un pas pe care a trebuit să îl refaceți)?",
      options: ["Nicio greșeală","O greșeală","Câteva greșeli","Multe greșeli"],
      base: "Participanții care încearcă sarcina.",
    },
  ],
  sus: [
    {
      stem: "Vă rugăm să răspundeți la fiecare afirmație indicând în ce măsură sunteți de acord sau în dezacord, pe baza experienței dumneavoastră de utilizare a [product].",
      scalePoints: ["Total dezacord","Dezacord","Nici acord, nici dezacord","De acord","Total de acord"],
      attributes: ["Cred că mi-ar plăcea să folosesc frecvent acest sistem.","Am găsit sistemul inutil de complicat.","Am considerat că sistemul a fost ușor de folosit.","Cred că aș avea nevoie de sprijinul unei persoane cu cunoștințe tehnice pentru a putea folosi acest sistem.","Am constatat că diversele funcții ale acestui sistem au fost bine integrate.","Am considerat că există prea multe inconsecvențe în acest sistem.","Îmi imaginez că majoritatea oamenilor ar învăța să folosească acest sistem foarte repede.","Am găsit sistemul foarte greoi de folosit.","M-am simțit foarte sigur(ă) pe mine folosind sistemul.","A trebuit să învăț multe lucruri înainte de a mă putea descurca cu acest sistem."],
      base: "Toți participanții, după finalizarea sarcinilor principale.",
    },
  ],
  seq: [
    {
      stem: "În ansamblu, cât de dificilă sau de ușoară a fost această sarcină de finalizat?",
      scalePoints: ["Foarte dificilă","2","3","4","5","6","Foarte ușoară"],
      base: "Participanții care au încercat sarcina.",
    },
  ],
  "umux-lite": [
    {
      stem: "Vă rugăm să indicați în ce măsură sunteți de acord sau în dezacord cu fiecare afirmație, pe baza experienței dumneavoastră de utilizare a [product].",
      scalePoints: ["Total dezacord","Dezacord","Nici acord, nici dezacord","De acord","Total de acord"],
      attributes: ["Funcționalitățile [Product] corespund cerințelor mele.","[Product] este ușor de folosit."],
      base: "Toți participanții, după test.",
    },
  ],
  umux: [
    {
      stem: "Vă rugăm să indicați în ce măsură sunteți de acord sau în dezacord cu fiecare afirmație, pe baza experienței dumneavoastră de utilizare a [product].",
      scalePoints: ["Total dezacord","2","3","4","5","6","Total de acord"],
      attributes: ["Funcționalitățile [Product] corespund cerințelor mele.","Utilizarea [product] este o experiență frustrantă.","[Product] este ușor de folosit.","Trebuie să petrec prea mult timp corectând lucruri în [product]."],
      base: "Toți participanții, după test.",
    },
  ],
  "first-click": [
    {
      stem: "Pe ecranul pe care tocmai l-ați văzut, unde ați da clic mai întâi pentru a începe [task goal]? Descrieți pe scurt locul ales și motivul alegerii.",
      base: "Participanții cărora li s-a arătat ecranul-stimul.",
    },
  ],
  findability: [
    {
      stem: "În structura de meniu prin care tocmai ați navigat, unde v-ați aștepta să găsiți [item]? Selectați locația pe care ați alege-o.",
      options: ["[Category A]","[Category B]","[Category C]","[Category D]","Nu sunt sigur(ă)"],
      base: "Participanții care finalizează sarcina de tree testing.",
    },
  ],
  learnability: [
    {
      stem: "Gândindu-vă la această cea mai recentă încercare în comparație cu încercările dumneavoastră anterioare, cât de ușor a fost să finalizați sarcina de această dată?",
      scalePoints: ["Mult mai greu","2","3","4","5","6","Mult mai ușor"],
      base: "Participanții la fiecare încercare repetată (încercările 2+).",
    },
  ],
  "nasa-tlx": [
    {
      stem: "Evaluați experiența dumneavoastră cu sarcina pe fiecare dintre următoarele dimensiuni.",
      scalePoints: ["0 (Foarte scăzut)","10","20","30","40","50","60","70","80","90","100 (Foarte ridicat)"],
      attributes: ["Solicitare mentală — Cât de solicitantă mental a fost sarcina?","Solicitare fizică — Cât de solicitantă fizic a fost sarcina?","Presiunea timpului — Cât de grăbit sau alert a fost ritmul sarcinii?","Performanță — Cât de mult ați reușit să îndepliniți ceea ce vi s-a cerut? (Perfect → Eșec)","Efort — Cât de mult a trebuit să vă străduiți pentru a atinge nivelul dumneavoastră de performanță?","Frustrare — Cât de nesigur(ă), descurajat(ă), iritat(ă), stresat(ă) și deranjat(ă) v-ați simțit?"],
      base: "Participanții care au încercat sarcina.",
    },
  ],
  desirability: [
    {
      stem: "Care dintre aceste cuvinte descriu cel mai bine experiența dumneavoastră de utilizare a [product]? Vă rugăm să selectați cele 5 cuvinte care se potrivesc cel mai bine.",
      options: ["Accesibil","Avansat","Enervant","Atrăgător","Abordabil","Plictisitor","Încărcat","Curat","Aglomerat","Complex","Derutant","Consecvent","De ultimă generație","Demodat","Dificil","Ușor de folosit","Eficient","Familiar","Rapid","Frustrant","Distractiv","Greu de folosit","De ajutor","De înaltă calitate","Inconsecvent","Inovator","Intimidant","Primitor","Vechi","Organizat","Copleșitor","Banal","Puternic","Previzibil","Profesionist","Fiabil","Rigid","Simplist","Lent","Stresant","Cronofag","Demn de încredere","Neconvențional","Ușor de înțeles","Nefinisat","Utilizabil","Util"],
      base: "Toți participanții, după test.",
    },
  ],
  "feature-adoption": [
    {
      stem: "Înainte de astăzi, cât de des ați folosit [feature] în [product]?",
      options: ["Nu știam că această funcționalitate există","Știam despre ea, dar nu am folosit-o niciodată","Am folosit-o o dată sau de două ori","O folosesc ocazional","O folosesc în mod regulat"],
      base: "Toți utilizatorii / cei care au încercat produsul.",
    },
  ],
  engagement: [
    {
      stem: "În ultimele 30 de zile, cât de des ați folosit [product]?",
      options: ["În fiecare zi sau aproape în fiecare zi","De mai multe ori pe săptămână","Aproximativ o dată pe săptămână","De câteva ori în această lună","O dată în această lună","Deloc"],
      base: "Utilizatorii activi în ultimele 30 de zile.",
    },
  ],
  "retention-churn": [
    {
      stem: "Cât de probabil este să folosiți în continuare [product] peste trei luni?",
      scalePoints: ["Cu siguranță nu îl voi folosi","2","3","4","5","6","Cu siguranță îl voi folosi"],
      base: "Utilizatorii actuali ai produsului.",
    },
  ],
  "heart-framework": [
    {
      stem: "În ansamblu, cât de mulțumit(ă) sunteți de experiența dumneavoastră de utilizare a [product]?",
      scalePoints: ["Foarte nemulțumit(ă)","Nemulțumit(ă)","Oarecum nemulțumit(ă)","Nici mulțumit(ă), nici nemulțumit(ă)","Oarecum mulțumit(ă)","Mulțumit(ă)","Foarte mulțumit(ă)"],
      base: "Toți utilizatorii / participanții.",
    },
  ],
  accessibility: [
    {
      stem: "Folosind tehnologia asistivă sau setările de accesibilitate pe care le utilizați de obicei, cât de ușor sau de dificil a fost să faceți ceea ce v-ați propus în [product]?",
      scalePoints: ["Foarte dificil","2","3","4","5","6","Foarte ușor"],
      base: "Participanții care folosesc tehnologie asistivă sau setări de accesibilitate (cititor de ecran, mărire, control vocal, acces prin comutator, subtitrări etc.).",
    },
    {
      stem: "Care dintre următoarele aspecte, dacă este cazul, au făcut ca [product] să fie dificil de folosit pentru dumneavoastră? Selectați toate variantele care se aplică.",
      options: ["Text prea mic sau greu de citit","Contrast redus între text și fundal","Nu am putut să îl operez doar de la tastatură","Cititorul de ecran nu a anunțat corect conținutul sau elementele de control","Videoclipurile sau materialele audio nu aveau subtitrări/transcrieri","Mișcările sau animațiile au fost distractoare sau dezorientante","Limitele de timp au fost prea scurte","Formularele au fost greu de completat sau erorile neclare","Aspectul paginii s-a stricat când am mărit imaginea sau textul","Niciuna dintre acestea"],
      base: "Toți participanții; se analizează separat pentru cei care folosesc tehnologie asistivă sau setări de accesibilitate.",
    },
  ],
  "digital-literacy": [
    {
      stem: "Pe care dintre următoarele le-ați făcut personal în ultimele 3 luni? Selectați toate variantele care se aplică.",
      options: ["Am instalat o aplicație și i-am ajustat setările","Am copiat sau mutat fișiere între dispozitive sau în cloud","Am căutat online informații de care aveam nevoie și am verificat dacă sunt de încredere","Am trimis un e-mail cu un atașament","Am efectuat un apel video","Am completat online un formular oficial (de ex. instituții publice, utilități)","Am cumpărat ceva sau am făcut o plată online","Am folosit servicii bancare online sau mobile","Am creat sau editat un document, un tabel de calcul sau o prezentare","Am modificat setările de confidențialitate sau securitate ale unui dispozitiv sau cont","Am rezolvat singur(ă) o problemă cu un dispozitiv sau o aplicație (de ex. căutând o soluție)","Niciuna dintre acestea"],
      base: "Toți respondenții.",
    },
    {
      stem: "Cât de încrezător (încrezătoare) vă simțiți când faceți fiecare dintre următoarele?",
      scalePoints: ["Deloc încrezător (încrezătoare)","Nu prea încrezător (încrezătoare)","Oarecum încrezător (încrezătoare)","Încrezător (încrezătoare)","Foarte încrezător (încrezătoare)"],
      attributes: ["Să învăț să folosesc o aplicație sau un site web nou fără ajutor","Să rezolv singur(ă) o problemă cu o aplicație sau un dispozitiv","Să apreciez dacă un site web, o aplicație sau un mesaj este sigur și de încredere","Să finalizez online, de la început până la sfârșit, demersuri oficiale sau financiare"],
      base: "Toți respondenții.",
    },
  ],

  // ── Banking & Payments ───────────────────────────────────────────────────
  "main-bank-share": [
    {
      stem: "Care este banca pe care o considerați banca dumneavoastră principală — adică cea pe care o folosiți cel mai des și în care vă este virat venitul sau salariul principal?",
      options: ["[Client]","[Competitor A]","[Competitor B]","[Competitor C]","Altă bancă (vă rugăm să precizați)","Nu am o bancă principală"],
      base: "Toți respondenții.",
    },
  ],
  "bank-switching-intent": [
    {
      stem: "Cât de probabil este să vă schimbați banca principală cu o altă bancă în următoarele 12 luni?",
      scalePoints: ["Sigur o voi schimba","Probabil o voi schimba","S-ar putea să o schimb sau nu","Probabil nu o voi schimba","Sigur nu o voi schimba"],
      base: "Toți respondenții care au o bancă principală.",
    },
  ],
  "switching-triggers-barriers": [
    {
      stem: "Ați spus că s-ar putea să vă schimbați banca principală. Care dintre următoarele ar fi motive pentru care ați face această schimbare?",
      options: ["Comisioane și taxe mari sau neașteptate","Servicii slabe pentru clienți","Dobânzi sau beneficii mai bune în altă parte","Aplicație de mobile banking sau internet banking de slabă calitate","Probleme în rezolvarea unei situații sau a unei reclamații","Sucursala s-a închis sau este greu accesibilă","O schimbare în viață (mutare, loc de muncă nou, căsătorie)","O ofertă sau un bonus atractiv pentru schimbarea băncii","Îngrijorări legate de securitate sau fraudă","Alt motiv (vă rugăm să precizați)"],
      base: "Potențiali migratori (intenție de schimbare T3B: sigur/probabil/s-ar putea să schimbe).",
    },
    {
      stem: "Ce vă împiedică să vă schimbați banca principală, chiar dacă v-ați gândit la acest lucru?",
      options: ["Prea multă bătaie de cap să mut plățile și debitările directe","Loialitatea sau relația de lungă durată cu banca mea","Am toate produsele într-un singur loc","Nicio bancă nu este în mod clar mai bună","Mă tem că ceva nu va merge bine la mutare","Sunt legat(ă) printr-un credit ipotecar, un împrumut sau un produs","Pur și simplu nu am apucat să o fac","Nimic nu mă împiedică — sunt mulțumit(ă) de banca mea","Alt motiv (vă rugăm să precizați)"],
      base: "Cei care rămân (intenție de schimbare bottom-2-box) și cei care „s-ar putea să schimbe sau nu”.",
    },
  ],
  "cross-sell-intent": [
    {
      stem: "Dacă ar fi să contractați [PRODUCT] în viitor, la ce bancă v-ați adresa mai întâi?",
      options: ["Banca mea principală actuală","[Competitor A]","[Competitor B]","Un fintech sau o bancă digitală (neobank)","Un site de comparare a prețurilor sau un broker","Nu știu"],
      base: "Toți respondenții (opțional, cei deschiși către [PRODUCT]).",
    },
  ],
  "consolidation-intent": [
    {
      stem: "Cât de probabil este să vă concentrați mai multe dintre produsele financiare la o singură bancă în următoarele 12 luni?",
      scalePoints: ["Sigur le voi concentra","Probabil le voi concentra","S-ar putea sau nu","Probabil nu","Sigur nu"],
      base: "Respondenți care dețin produse la mai mult de un furnizor.",
    },
    {
      stem: "Dacă v-ați concentra produsele financiare la o singură bancă, ce bancă ar câștiga cea mai mare parte a afacerilor dumneavoastră?",
      options: ["[Client]","[Competitor A]","[Competitor B]","[Competitor C]","Un fintech sau o bancă digitală (neobank)","Altă bancă (vă rugăm să precizați)","Nu sunt sigur(ă)"],
      base: "Intenție de consolidare T3B (sigur/probabil/s-ar putea să consolideze).",
    },
  ],
  "product-purchase-pipeline": [
    {
      stem: "Care dintre următoarele produse financiare intenționați să le contractați sau să le solicitați în următoarele 12 luni? Selectați toate variantele care se aplică.",
      options: ["Cont curent","Cont de economii sau depozit la termen","Card de credit","Credit de nevoi personale","Credit ipotecar sau pentru locuință","Finanțare auto","Cont de investiții sau de brokeraj","Produs de pensie sau pentru pensionare","Asigurare (de viață, de locuință sau auto)","Buy Now Pay Later (cumpără acum, plătește mai târziu)","Niciunul dintre acestea"],
      base: "Toți respondenții.",
    },
  ],
  "onboarding-completion": [
    {
      stem: "Gândindu-vă la ultima dată când ați încercat să deschideți un cont bancar online sau într-o aplicație, ați finalizat deschiderea contului?",
      options: ["Da, am finalizat-o","Nu, am început, dar nu am terminat","Nu, am renunțat înainte de a începe cererea"],
      base: "Respondenți care au încercat să deschidă un cont în ultimele [12] luni.",
    },
    {
      stem: "Cât de ușor sau de dificil a fost să vă deschideți contul?",
      scalePoints: ["Foarte ușor","Destul de ușor","Nici ușor, nici dificil","Destul de dificil","Foarte dificil"],
      base: "Respondenți care au deschis recent un cont și au finalizat deschiderea acestuia.",
    },
  ],
  "digital-banking-adoption": [
    {
      stem: "Cât de des folosiți fiecare dintre următoarele pentru a vă gestiona operațiunile bancare?",
      scalePoints: ["De mai multe ori pe zi","Aproximativ o dată pe zi","De câteva ori pe săptămână","Aproximativ o dată pe săptămână","De câteva ori pe lună","Mai rar","Niciodată"],
      subStems: ["Aplicația de mobile banking","Internet banking prin browser web","Sucursala, personal","Telefonic (telephone banking)","Bancomat / ATM"],
      base: "Toți respondenții care au un cont bancar.",
    },
  ],
  "banking-channel-mix": [
    {
      stem: "Pentru fiecare dintre operațiunile bancare de mai jos, ce canal preferați cel mai mult să folosiți?",
      scalePoints: ["Aplicația de mobil","Online (browser web)","Sucursala, personal","Call center / telefon","Bancomat / ATM"],
      subStems: ["Verificarea soldului sau a tranzacțiilor","Efectuarea unei plăți sau a unui transfer","Depunerea sau retragerea de numerar","Solicitarea unui produs (credit, card, cont)","Obținerea de ajutor sau rezolvarea unei probleme","Consiliere sau planificare financiară"],
      base: "Toți respondenții care au un cont bancar.",
    },
  ],
  "payment-method-usage": [
    {
      stem: "Care dintre următoarele metode de plată le-ați folosit în ultima lună? Selectați toate variantele care se aplică.",
      options: ["Card fizic de debit sau de credit","Portofel mobil (Apple Pay, Google Pay etc.)","Numerar","Transfer bancar / plată instant","Debitare directă","Plată cu cardul online","Buy Now Pay Later (cumpără acum, plătește mai târziu)","Aplicație de plăți între persoane (de ex. PayPal, Venmo, Wise)","Cec","Niciuna dintre acestea"],
      base: "Toți respondenții.",
    },
  ],
  "fintech-usage": [
    {
      stem: "Care dintre următoarele servicii fintech sau bănci digitale (neobank) le folosiți în prezent?",
      options: ["[Neobank A, e.g. Revolut]","[Neobank B, e.g. Monzo / N26]","[Wallet, e.g. PayPal]","[Local fintech C]","[Local fintech D]","Alt fintech (vă rugăm să precizați)","Niciunul dintre acestea"],
      base: "Toți respondenții.",
    },
    {
      stem: "Cât de probabil este să încercați un fintech sau o bancă digitală (neobank) în următoarele 12 luni?",
      scalePoints: ["Sigur voi încerca","Probabil voi încerca","S-ar putea sau nu","Probabil nu","Sigur nu"],
      base: "Respondenți care nu folosesc în prezent niciun fintech / neobank.",
    },
  ],
  "bnpl-usage": [
    {
      stem: "Cât de des ați folosit Buy Now Pay Later (de ex. Klarna, Clearpay, Afterpay) pentru a eșalona costul unei achiziții în ultimele 12 luni?",
      options: ["Niciodată","O dată","De 2-3 ori","De 4-6 ori","De 7 sau mai multe ori"],
      base: "Toți respondenții.",
    },
    {
      stem: "În ce măsură sunteți de acord sau în dezacord cu fiecare afirmație despre Buy Now Pay Later?",
      scalePoints: ["Total de acord","De acord","Nici de acord, nici în dezacord","În dezacord","Total în dezacord"],
      subStems: ["BNPL mă ajută să îmi gestionez fluxul de bani","BNPL este mai ieftin decât folosirea unui card de credit","Aș folosi BNPL în locul unui credit de nevoi personale","BNPL face mult prea ușoare cheltuielile excesive","Înțeleg pe deplin comisioanele și penalitățile BNPL","Am încredere în furnizorii BNPL la fel de mult ca în banca mea"],
      base: "Respondenți care cunosc BNPL (utilizatori și non-utilizatori care cunosc serviciul).",
    },
  ],
  "trust-in-banks": [
    {
      stem: "Câtă încredere aveți că fiecare dintre următoarele instituții acționează în interesul dumneavoastră?",
      scalePoints: ["Încredere deplină","Multă încredere","Încredere moderată","Puțină încredere","Nicio încredere"],
      subStems: ["Băncile tradiționale / clasice","Companiile de asigurări","Fintech-urile și băncile digitale (neobank)","Autoritatea de reglementare financiară","Sistemul financiar în ansamblu"],
      base: "Toți respondenții.",
    },
  ],
  "fee-transparency": [
    {
      stem: "Gândindu-vă la banca dumneavoastră principală, în ce măsură sunteți de acord sau în dezacord cu fiecare afirmație?",
      scalePoints: ["Total de acord","De acord","Nici de acord, nici în dezacord","În dezacord","Total în dezacord"],
      subStems: ["Comisioanele și taxele sunt clare și ușor de înțeles","Nu sunt niciodată surprins(ă) de comisioane neașteptate sau ascunse","Comisioanele pe care le plătesc reprezintă o valoare corectă pentru ceea ce primesc","Este ușor să aflu ce mi se va percepe înainte de a acționa","Banca mea este deschisă și onestă în privința comisioanelor sale"],
      base: "Toți respondenții care au o bancă principală.",
    },
  ],
  "perceived-security": [
    {
      stem: "Cât de multă încredere aveți că banii și datele dumneavoastră personale sunt în siguranță atunci când faceți operațiuni bancare prin fiecare dintre următoarele canale?",
      scalePoints: ["Foarte multă încredere","Destul de multă încredere","Nici încredere, nici neîncredere","Destul de puțină încredere","Deloc încredere"],
      subStems: ["Aplicația de mobile banking","Internet banking prin browser web","În sucursală","Prin telefon","La bancomat / ATM"],
      base: "Toți respondenții care folosesc canalele relevante.",
    },
    {
      stem: "În ce măsură sunteți de acord sau în dezacord cu fiecare afirmație?",
      scalePoints: ["Total de acord","De acord","Nici de acord, nici în dezacord","În dezacord","Total în dezacord"],
      subStems: ["Mă îngrijorează posibilitatea de a deveni victima unei fraude sau a unei înșelătorii","Sunt îngrijorat(ă) că banca mea ar putea fi atacată cibernetic","Teama de fraudă mă face precaut(ă) în privința operațiunilor bancare online sau în aplicație","Îngrijorările legate de securitate mă descurajează să folosesc fintech-uri sau bănci digitale (neobank)","Banca mea mi-ar rambursa integral banii dacă aș fi victima unei fraude"],
      base: "Toți respondenții.",
    },
  ],

  // ── Financial Needs & Wellbeing ──────────────────────────────────────────
  "financial-wellbeing": [
    {
      stem: "Iată câteva afirmații pe care unele persoane le-au făcut despre situația lor financiară. Pentru fiecare, vă rugăm să ne spuneți cât de bine vă descrie pe dumneavoastră sau situația dumneavoastră.",
      scalePoints: ["Mă descrie complet","Mă descrie foarte bine","Mă descrie într-o oarecare măsură","Mă descrie foarte puțin","Nu mă descrie deloc"],
      attributes: ["Aș putea face față unei cheltuieli majore neprevăzute","Îmi asigur viitorul financiar","Din cauza situației mele financiare, simt că nu voi avea niciodată lucrurile pe care mi le doresc în viață","Mă pot bucura de viață datorită modului în care îmi gestionez banii","Abia mă descurc financiar","Sunt îngrijorat(ă) că banii pe care îi am sau pe care îi voi economisi nu vor fi de ajuns"],
      base: "Toți respondenții",
    },
  ],
  "financial-literacy": [
    {
      stem: "Următoarele câteva întrebări verifică înțelegerea unor noțiuni financiare de zi cu zi. Nu sunt întrebări-capcană — vă rugăm să răspundeți fără să căutați informații.",
      subStems: ["Să presupunem că ați avea 100 € într-un cont de economii, iar rata dobânzii ar fi de 2% pe an. După 5 ani, câți bani ați avea dacă ați lăsa banii să se acumuleze?","Imaginați-vă că dobânda la economiile dumneavoastră ar fi de 1% pe an, iar inflația de 2% pe an. După 1 an, cât ați putea cumpăra cu banii din acest cont?","Adevărat sau fals? „Cumpărarea de acțiuni la o singură companie oferă, de obicei, un randament mai sigur decât un fond mutual de acțiuni.”"],
      options: ["Dobândă compusă: Mai mult de 102 € / Exact 102 € / Mai puțin de 102 € / Nu știu / Refuz","Inflație: Mai mult decât astăzi / Exact la fel / Mai puțin decât astăzi / Nu știu / Refuz","Diversificare: Adevărat / Fals / Nu știu / Refuz"],
      base: "Toți respondenții",
    },
  ],
  "savings-emergency-fund": [
    {
      stem: "Dacă v-ați pierde astăzi principala sursă de venit a gospodăriei, aproximativ cât timp ar putea gospodăria dumneavoastră să acopere cheltuielile esențiale (locuință, mâncare, facturi) folosind economii sau bani la care ați putea avea acces rapid — fără să vă împrumutați sau să vindeți active pe termen lung?",
      options: ["Mai puțin de 1 săptămână","Între 1 săptămână și mai puțin de 1 lună","Între 1 lună și mai puțin de 3 luni","Între 3 luni și mai puțin de 6 luni","Între 6 luni și mai puțin de 12 luni","12 luni sau mai mult","Nu știu","Prefer să nu răspund"],
      base: "Toți respondenții",
    },
  ],
  "budgeting-style": [
    {
      stem: "Cât de bine descrie fiecare dintre următoarele afirmații modul în care vă gestionați banii de obicei?",
      scalePoints: ["Întotdeauna","Deseori","Uneori","Rareori","Niciodată"],
      attributes: ["Țin evidența banilor pe care îi cheltuiesc","Îmi stabilesc un buget și încerc să îl respect","Plănuiesc cum voi folosi banii pe care urmează să îi primesc înainte ca aceștia să ajungă la mine","Folosesc o aplicație, un tabel sau un instrument pentru a-mi gestiona banii","Îmi verific soldul contului înainte de a face o achiziție","Mă gândesc cum se potrivește o achiziție cu planurile mele pe termen mai lung","Pun bani deoparte pentru facturile viitoare cunoscute, înainte de scadența lor"],
      base: "Toți respondenții",
    },
  ],
  "financial-goals": [
    {
      stem: "Care dintre următoarele sunt obiective financiare pentru care lucrați în mod activ sau pentru care vă așteptați să lucrați în următorii 1–3 ani? Selectați toate variantele care se aplică.",
      options: ["Constituirea sau completarea unui fond de urgență","Achitarea datoriilor (credite, carduri, descoperit de cont)","Economisirea pentru un avans la locuință sau cumpărarea unei proprietăți","Economisirea pentru pensie / pentru anii de mai târziu","Economisirea pentru educația copiilor","Economisirea pentru o achiziție majoră (mașină, călătorii, nuntă)","Începerea sau dezvoltarea unei afaceri","Realizarea de investiții / creșterea averii","Lăsarea unei moșteniri sau sprijinirea familiei","Doar să țin pasul cu finanțele de zi cu zi","Niciunul dintre acestea"],
      base: "Toți respondenții",
    },
  ],
  "attitude-to-credit": [
    {
      stem: "În ce măsură sunteți de acord sau în dezacord cu fiecare dintre următoarele afirmații despre împrumuturi și credite?",
      scalePoints: ["Total de acord","De acord","Nici de acord, nici în dezacord","În dezacord","Total în dezacord"],
      attributes: ["Este în regulă să te împrumuți pentru a cumpăra acum lucrurile pe care ți le dorești și a plăti mai târziu","Aș prefera să mă lipsesc decât să cumpăr ceva pe credit","Folosirea cardurilor de credit sau a împrumuturilor este o parte normală a gestionării banilor","Faptul de a avea datorii mă îngrijorează foarte mult","Eșalonarea în timp a costului unei achiziții are sens din punct de vedere financiar","Evit să mă împrumut ori de câte ori este posibil","Mă simt confortabil să folosesc „cumperi acum, plătești mai târziu” pentru a-mi gestiona cheltuielile"],
      base: "Toți respondenții",
    },
  ],
  "debt-burden": [
    {
      stem: "Gândindu-vă la toate ratele și plățile regulate ale datoriilor gospodăriei dumneavoastră (credite, carduri de credit, descoperit de cont, „cumperi acum, plătești mai târziu” — dar fără chirie sau credit ipotecar, decât dacă doriți să le includeți), aproximativ ce parte din venitul lunar net al gospodăriei se duce către acestea?",
      options: ["Nu avem rate sau plăți de datorii","Mai puțin de 10%","Între 10% și sub 25%","Între 25% și sub 40%","Între 40% și sub 50%","50% sau mai mult","Nu știu","Prefer să nu răspund"],
      base: "Toți respondenții",
    },
  ],
  "risk-tolerance": [
    {
      stem: "Investițiile presupun un compromis între câștigurile posibile și riscul de pierderi. Care dintre următoarele descrie cel mai bine modul în care ați prefera să investiți o sumă importantă din banii dumneavoastră?",
      options: ["Vreau să îmi protejez banii și accept randamente foarte mici pentru a evita orice pierdere","Prefer investiții în mare parte sigure și pot accepta fluctuații mici pentru randamente ușor mai mari","Vreau un echilibru între siguranță și creștere și pot accepta fluctuații moderate","Urmăresc o creștere mai mare și pot accepta fluctuații semnificative ale valorii","Vreau o creștere maximă pe termen lung și pot accepta pierderi mari pentru șansa unor câștiguri ridicate"],
      base: "Toți respondenții (sau cei care au investiții ori iau în considerare investițiile)",
    },
  ],
  "retirement-preparedness": [
    {
      stem: "Gândindu-vă la pensie sau la anii de mai târziu, vă rugăm să răspundeți la următoarele.",
      subStems: ["Cât de pregătit(ă) vă simțiți din punct de vedere financiar pentru pensie?","Cât de încrezător(oare) sunteți că veți avea destui bani pentru a trăi confortabil pe toată durata pensiei?"],
      scalePoints: ["Deloc","Puțin","Moderat","Foarte","Complet"],
      base: "Toți respondenții care nu sunt pensionați (respondenții pensionați se direcționează către un set redus de întrebări).",
    },
  ],
  "protection-gap": [
    {
      stem: "Care dintre următoarele tipuri de asigurări sau protecție financiară aveți în prezent (dumneavoastră sau gospodăria dumneavoastră)? Selectați toate variantele care se aplică.",
      options: ["Asigurare de viață","Asigurare pentru boli grave","Asigurare de venit / pentru invaliditate","Asigurare de sănătate / medicală","Asigurare de locuință / bunuri","Asigurare atașată creditului ipotecar","Asigurare de deces / pentru cheltuieli funerare","Niciuna dintre acestea","Nu știu"],
      base: "Toți respondenții",
    },
  ],
  "financial-anxiety": [
    {
      stem: "Gândindu-vă la finanțele dumneavoastră personale, în ce măsură sunteți de acord cu fiecare dintre următoarele afirmații?",
      scalePoints: ["Total de acord","De acord","Nici de acord, nici în dezacord","În dezacord","Total în dezacord"],
      attributes: ["Mă simt încrezător(oare) în privința gestionării finanțelor de zi cu zi","Mă simt încrezător(oare) atunci când iau decizii financiare mai importante","Gândul la finanțele mele îmi provoacă anxietate","Îmi fac griji din cauza banilor în majoritatea zilelor","Simt că dețin controlul asupra situației mele financiare","Mă simt adesea stresat(ă) când mă ocup de chestiuni legate de bani"],
      base: "Toți respondenții",
    },
  ],
  "advice-seeking": [
    {
      stem: "La cine apelați pentru ajutor atunci când luați decizii financiare și câtă încredere aveți în fiecare sursă?",
      subStems: ["Gestionarea banilor de zi cu zi","Împrumuturi sau contractarea de datorii","Economisire și investiții","Pensie sau planificare pe termen lung","Asigurări și protecție"],
      scalePoints: ["Nu folosesc","Folosesc – încredere scăzută","Folosesc – încredere moderată","Folosesc – încredere ridicată"],
      attributes: ["Un consilier financiar profesionist","Banca mea sau casa mea de economii","Familia sau prietenii","Angajatorul meu sau o schemă oferită la locul de muncă","Instrumente online, site-uri de comparare sau consilieri automatizați (robo-advisers)","Rețele sociale, forumuri sau comunități online","Știri, site-uri financiare sau presă","Iau aceste decizii pe cont propriu"],
      base: "Toți respondenții",
    },
  ],

  // ── Added in final audit ─────────────────────────────────────────────────
  "kano-model": [
    {
      stem: "Dacă [feature] AR FI prezentă în produs, cum v-ați simți?",
      scalePoints: ["Mi-ar plăcea să fie așa","Mă aștept să fie așa","Mi-e indiferent","Pot accepta să fie așa","M-ar deranja să fie așa"],
      attributes: ["[Feature 1]","[Feature 2]","[Feature 3]","[Feature 4]"],
      base: "Utilizatori țintă ai produsului",
    },
    {
      stem: "Și dacă [feature] NU ar fi prezentă (ar lipsi), cum v-ați simți?",
      scalePoints: ["Mi-ar plăcea să fie așa","Mă aștept să fie așa","Mi-e indiferent","Pot accepta să fie așa","M-ar deranja să fie așa"],
      attributes: ["[Feature 1]","[Feature 2]","[Feature 3]","[Feature 4]"],
      base: "Aceiași respondenți ca la itemul funcțional",
    },
  ],
  maxdiff: [
    {
      stem: "Din acest set, care este CEL MAI și care este CEL MAI PUȚIN [important / appealing] pentru dumneavoastră?",
      options: ["[Item 1]","[Item 2]","[Item 3]","[Item 4]","[Item 5]"],
      base: "Populația țintă",
    },
  ],
  turf: [
    {
      stem: "Care dintre următoarele [variants / flavours / options] v-ar interesa să le cumpărați? Selectați toate variantele care vă atrag.",
      options: ["[Option 1]","[Option 2]","[Option 3]","[Option 4]","[Option 5]","[Option 6]","Niciuna dintre acestea"],
      base: "Cumpărători din categorie",
    },
  ],
  "distinctive-brand-assets": [
    {
      stem: "Pentru fiecare dintre următoarele elemente — cu numele mărcii eliminat — cărei mărci credeți că îi aparține?",
      attributes: ["Logo / simbol (fără nume)","Culoarea (culorile) mărcii","Personajul / mascota mărcii","Jingle / sunet","Slogan / tagline","Forma ambalajului"],
      options: ["[Client brand]","[Competitor 1]","[Competitor 2]","Nu știu / nicio marcă anume"],
      base: "Respondenți care cunosc categoria",
    },
  ],
  "sustainability-perception": [
    {
      stem: "În ce măsură sunteți de acord că [brand] este fiecare dintre următoarele?",
      scalePoints: ["Total de acord","De acord","Nici de acord, nici în dezacord","În dezacord","Total în dezacord"],
      attributes: ["Îi pasă cu adevărat de mediu","Tratează corect oamenii și comunitățile","Își procură materialele/ingredientele în mod responsabil","Este onestă și transparentă în privința impactului său","Este o marcă ale cărei valori se potrivesc cu ale mele"],
      base: "Respondenți care cunosc [brand]",
    },
    {
      stem: "Cu cât mai mult, dacă este cazul, ați fi dispus(ă) să plătiți pentru o versiune clar mai sustenabilă a [product]?",
      options: ["Nimic în plus","Cu până la 5% mai mult","Cu 6–10% mai mult","Cu 11–20% mai mult","Cu peste 20% mai mult"],
      base: "Cumpărători din categorie",
    },
  ],
  servqual: [
    {
      stem: "Gândindu-vă la experiența dumneavoastră recentă cu [provider], în ce măsură sunteți de acord cu fiecare afirmație?",
      scalePoints: ["1 — Total în dezacord","2","3","4","5","6","7 — Total de acord"],
      attributes: ["Își respectă promisiunile, în mod fiabil și exact (Fiabilitate)","Sunt prompți și dornici să ajute atunci când am nevoie (Receptivitate)","Personalul lor este competent și îmi inspiră încredere (Siguranță)","Îmi acordă o atenție grijulie, individualizată (Empatie)","Facilitățile, materialele și aplicația lor arată profesionist și modern (Elemente tangibile)"],
      base: "Clienți cu experiență recentă cu furnizorul",
    },
    {
      stem: "Vă rugăm să împărțiți 100 de puncte între aceste cinci aspecte ale serviciului, pentru a arăta cât de important este fiecare pentru dumneavoastră.",
      options: ["Fiabilitate — lucrurile făcute corect, în mod constant","Receptivitate — ajutor prompt și binevoitor","Siguranță — personal competent și de încredere","Empatie — atenție grijulie, individualizată","Elemente tangibile — facilități și instrumente profesioniste"],
      base: "Aceiași respondenți ca la bateria RATER",
    },
  ],
  "conjoint-analysis": [
    {
      stem: "Pe care dintre acestea l-ați alege? (Una dintre mai multe sarcini de alegere; fiecare prezintă combinații diferite.)",
      options: ["Produsul A — [attr 1 = level], [attr 2 = level], preț [P1]","Produsul B — [attr 1 = level], [attr 2 = level], preț [P2]","Produsul C — [attr 1 = level], [attr 2 = level], preț [P3]","Niciunul — nu aș alege niciunul dintre acestea"],
      base: "Cumpărători țintă / decidenți din categorie",
    },
  ],
};
