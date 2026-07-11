/**
 * Romanian translations of the qualitative interview content (qualIntent +
 * qualQuestions), keyed by indicator id. Authored once, stored statically —
 * no runtime translation. Question order matches the English source, so a
 * guide item's provenance (indicatorId + sourceIndex) resolves its
 * translation directly.
 *
 * Bracket placeholders ([category], [product], [brand], …) are kept verbatim
 * so study-variable substitution works identically in both languages.
 */

export interface IndicatorQualRo {
  qualIntent: string;
  qualQuestions: string[];
}

export const INDICATOR_QUAL_RO: Record<string, IndicatorQualRo> = {
  // ── Brand Health & Equity ────────────────────────────────────────────────
  "tom-awareness": {
    qualIntent:
      "Scoate la suprafață ce ocupă spontan primul loc pe raftul mental al categoriei și motivele resimțite pentru care apare primul, nu doar care nume vine cel mai repede.",
    qualQuestions: [
      "Când spun [category], care e prima marcă ce vă vine în minte — și ce anume a făcut-o să apară înaintea tuturor celorlalte?",
      "Povestiți-mi unde apare marca asta în viața dumneavoastră de zi cu zi, de rămâne așa prezentă în minte.",
      "Gândiți-vă la ultima dată când ați avut nevoie de ceva din categoria asta — care nume v-a venit primul în minte și unde vă aflați în momentul acela?",
      "Dacă i-ați povesti unui prieten care n-a auzit niciodată de categoria asta ce mărci există, pe care ați pomeni-o prima, a doua, a treia?",
      "Ce credeți că are prima marcă de vi se lipește de minte mai mult decât celelalte?",
    ],
  },
  "spontaneous-awareness": {
    qualIntent:
      "Cartografiază întregul set de mărci pe care o persoană le poate extrage din memorie fără sugestii și sondează cât de vie sau de palidă e fiecare urmă de memorie.",
    qualQuestions: [
      "Fără să vă arăt nimic, numiți toate mărcile din categoria asta care vă vin în minte — nu vă grăbiți, continuați până nu vă mai vine nimic.",
      "Pentru fiecare marcă pe care ați numit-o, spuneți-mi ce vă vine în minte când o rostiți — o culoare, o senzație, un loc unde ați văzut-o.",
      "Există vreuna de care ați auzit, dar n-ați reușit s-o numiți acum — ce vă stătea pe limbă?",
      "Dintre mărcile astea, pe care simțiți că le cunoașteți cu adevărat și pe care doar le-ați auzit vehiculate?",
      "De unde credeți că ați prins majoritatea acestor nume — din reclame, de la prieteni, din magazine, din altă parte?",
    ],
  },
  "aided-awareness": {
    qualIntent:
      "Testează profunzimea recunoașterii atunci când se oferă indicii și separă familiaritatea autentică de recunoașterea goală de tip „am mai văzut logoul”.",
    qualQuestions: [
      "Iată o listă de mărci din categoria asta — parcurgeți-o și spuneți-mi pe care le recunoașteți și care vă sunt complet noi.",
      "Pentru cele pe care le recunoașteți, ce știți de fapt despre ele, dincolo de nume sau de logo?",
      "Este vreuna aici care v-a surprins — vreuna de care uitaserăți că există sau despre care nu știați că face parte din categoria asta?",
      "Alegeți una pe care o recunoașteți, dar n-ați folosit-o niciodată — ce impresie aveți despre ea și de unde vine impresia asta?",
      "Uitându-vă la lista asta, care nume vi se par familiare într-un mod cald și care sunt familiare, dar cam goale pe dinăuntru?",
    ],
  },
  "brand-salience": {
    qualIntent:
      "Surprinde disponibilitatea mentală în situații reale de cumpărare și în punctele de intrare în categorie, nu ca recall abstract.",
    qualQuestions: [
      "Povestiți-mi despre diferitele momente sau ocazii în care apare categoria asta în viața dumneavoastră — ce marcă vă vine în minte în fiecare dintre ele?",
      "Când sunteți în situația de a [specific situation, e.g. grabbing something quick / planning ahead / treating yourself], care marcă vă sare prima în minte?",
      "Există momente sau locuri în care vă vine în minte o marcă la care nu v-ați gândi de obicei? Povestiți-mi unul.",
      "Dacă v-aș numi o nevoie — să zicem [need/occasion] — care marcă se potrivește instant și de ce tocmai aceea?",
      "Care mărci simțiți că sunt „peste tot” în mintea dumneavoastră, gata să apară oricând vine vorba de categorie, și pe care trebuie să le scormoniți ca să vi le amintiți?",
    ],
  },
  "brand-familiarity": {
    qualIntent:
      "Evaluează cât de profund și de sigur simte cineva că știe marca și de unde vine acest sentiment de cunoaștere.",
    qualQuestions: [
      "Cât de bine ați spune că știți [brand] — ca pe o cunoștință apropiată, ca pe o figură pe care o vedeți în treacăt, sau undeva la mijloc?",
      "Spuneți-mi tot ce simțiți că știți despre [brand] — cum a început, ce reprezintă, cine o conduce, orice vă vine în minte.",
      "De unde vine cea mai mare parte din ce știți despre [brand] — din folosire, din reclame, de la oameni, din știri?",
      "Există ceva legat de [brand] care vă stârnește curiozitatea sau pe care simțiți că nu-l înțelegeți cu adevărat?",
      "Dacă un prieten v-ar întreba „despre ce e [brand]?”, cum i-ați rezuma-o?",
    ],
  },
  "brand-consideration": {
    qualIntent:
      "Înțelege ce mărci intră pe lista scurtă a celor „la care m-aș gândi serios să le cumpăr” și ce anume câștigă sau blochează un loc pe ea.",
    qualQuestions: [
      "Data viitoare când cumpărați din categoria asta, ce mărci ar intra realmente în cursă pentru dumneavoastră — și care n-ar avea nicio șansă?",
      "Povestiți-mi despre ultima dată când ați ales ceva din categoria asta — ce mărci ați cântărit înainte să vă decideți?",
      "Pentru o marcă ce nu e pe lista dumneavoastră scurtă, ce ar trebui să facă pentru ca s-o luați în calcul?",
      "Ce aduce o marcă pe lista dumneavoastră de „m-aș gândi la ea” în primul rând — prețul, reputația, altceva?",
      "Există o marcă pe care n-ați exclude-o niciodată, orice ar fi — și ce o face o alegere sigură pentru dumneavoastră?",
    ],
  },
  "brand-preference": {
    qualIntent:
      "Descoperă marca unică aleasă mai presus de toate celelalte când totul e la fel de disponibil, plus motivele profunde, prin laddering.",
    qualQuestions: [
      "Dacă toate mărcile din categoria asta ar fi în fața dumneavoastră, la același preț, la fel de ușor de luat — spre care ați întinde mâna și de ce tocmai aceea?",
      "Ce anume la [preferred brand] contează pentru dumneavoastră — și de ce contează asta? (și ce vă aduce, până la urmă?)",
      "Povestiți-mi despre o dată când v-ați dat peste cap, sau ați plătit ceva în plus, ca să luați marca preferată în locul unei variante mai la îndemână.",
      "Dacă alegerea dumneavoastră numărul unu ar dispărea mâine, la ce ați trece — și ce v-ar lipsi cel mai mult de la prima?",
      "Ce ar trebui să facă [preferred brand] ca să-și piardă locul din vârf în ochii dumneavoastră?",
    ],
  },
  "brand-trial": {
    qualIntent:
      "Reconstituie prima întâlnire cu marca și ce a declanșat acel prim pas de la simpla cunoaștere la încercare.",
    qualQuestions: [
      "Povestiți-mi despre chiar prima dată când ați încercat [brand] — ce se întâmpla atunci, ce v-a împins să-i dați o șansă?",
      "Înainte de prima dată, la ce vă așteptați — și s-a potrivit realitatea cu așteptarea?",
      "Ce v-a făcut dispus să o încercați, în loc să rămâneți la ce știați deja?",
      "După prima încercare, ce v-a rămas în minte — de bine sau de rău?",
      "Există mărci în categoria asta pe care nu le-ați încercat niciodată — ce v-a ținut pe loc?",
    ],
  },
  "brand-usage": {
    qualIntent:
      "Înțelege recența și ritmul utilizării reale și distinge utilizatorii actuali de cei care s-au îndepărtat pe nesimțite.",
    qualQuestions: [
      "Povestiți-mi despre ultima dată când ați folosit efectiv [brand] — când a fost, cu ce ocazie?",
      "Cum se încadrează [brand] în rutina dumneavoastră în perioada asta — ceva obișnuit, din când în când, sau v-ați cam îndepărtat de ea?",
      "Față de acum un an, o folosiți mai mult, mai puțin sau cam la fel — ce s-a schimbat?",
      "Dacă ați folosit-o mai puțin în ultima vreme, ce e în spatele acestui lucru — ceva ce a făcut marca, sau pur și simplu viața a mers mai departe?",
      "Când totuși apelați la ea acum, care e situația tipică ce vă aduce înapoi?",
    ],
  },
  bumo: {
    qualIntent:
      "Identifică marca principală/implicită autentică și obiceiul, potrivirea sau loialitatea care o mențin pe locul întâi.",
    qualQuestions: [
      "Dintre toate cele pe care le folosiți în categoria asta, spre care mergeți cel mai des — care e alegerea dumneavoastră de bază?",
      "Ce anume la [main brand] o menține drept alegerea implicită, în loc să tot schimbați de la una la alta?",
      "Gândiți-vă la ultimele câteva cumpărături din categoria asta — câte dintre ele au fost marca principală?",
      "Marca dumneavoastră principală e ceva ce alegeți conștient de fiecare dată, sau mai degrabă a devenit un obicei?",
      "Ce ar trebui să se întâmple ca o altă marcă să dea [main brand] jos de pe locul întâi?",
    ],
  },
  "brand-loyalty": {
    qualIntent:
      "Sondează angajamentul autentic și rezistența la schimbare, separând atașamentul real de inerție sau de lipsa alternativelor.",
    qualQuestions: [
      "Cum v-ați simți dacă ați intra în magazin și [brand] ar fi epuizată — ați ridica din umeri și ați lua alta, sau ați merge în altă parte după ea?",
      "Povestiți-mi despre o dată când ați fost tentat să renunțați la [brand] — ce vă trăgea în altă direcție și ce ați făcut până la urmă?",
      "Ce vă tot aduce înapoi la [brand] — marca în sine, sau pur și simplu e mai comod să nu schimbați?",
      "Dacă un concurent v-ar oferi o ofertă clar mai bună, cât de ușor v-ar câștiga de partea lui?",
      "Imaginați-vă că [brand] ar schimba ceva ce contează pentru dumneavoastră — ce ar trebui să se întâmple ca să plecați de tot?",
    ],
  },
  "brand-advocacy": {
    qualIntent:
      "Surprinde disponibilitatea reală de a-ți pune propriul nume în joc pentru marcă și poveștile pe care oamenii chiar le spun altora.",
    qualQuestions: [
      "Ați recomandat vreodată [brand] cuiva — povestiți-mi momentul acela, cui și de ce?",
      "Când vine vorba de [category] în discuțiile cu prietenii, ce vă treziți spunând despre [brand]?",
      "Ce ar trebui să se întâmple ca să convingeți activ pe cineva să nu folosească [brand]?",
      "Dacă un prieten apropiat v-ar întreba dacă merită să încerce [brand], ce i-ați spune sincer?",
      "[brand] e ceva pentru care v-ați pune bucuros propriul nume în joc, sau ați păstra distanța — de ce?",
    ],
  },
  "brand-image": {
    qualIntent:
      "Scoate la suprafață atributele funcționale și emoționale asociate mărcii față de rivali, folosind tehnici proiective și laddering.",
    qualQuestions: [
      "Când vă imaginați [brand], ce cuvinte, imagini sau senzații apar — spuneți ce vă vine primul, nu analizați prea mult.",
      "Dacă [brand] și [competitor] ar fi amândouă persoane la o petrecere, cum s-ar comporta fiecare diferit?",
      "Ce face [brand] bine, și ce spune asta despre ce fel de marcă este?",
      "Completați pentru mine: „[Brand] e genul de marcă ce ______, dar n-ar face niciodată ______.”",
      "Unde ați plasa [brand] față de rivalii ei — pentru ce e cunoscută ea și ceilalți nu?",
    ],
  },
  "brand-affinity": {
    qualIntent:
      "Emoție și identitate; tehnicile proiective (personificarea) merg mult mai adânc decât întrebările directe.",
    qualQuestions: [
      "Dacă [brand] ar fi o persoană care intră acum în camera asta, cine ar fi — cum se îmbracă, cum vorbește, cum se poartă cu dumneavoastră?",
      "Povestiți-mi despre un moment în care [brand] a părut că vă „înțelege”, sau unul în care v-a dezamăgit.",
      "Ce fel de persoană vă imaginați că folosește [brand]? Prin ce vă seamănă sau prin ce e diferită de dumneavoastră?",
      "Completați propoziția asta pentru mine: „[Brand] e genul de marcă ce ______.”",
      "Dacă ar trebui să vă despărțiți de [brand], ce ar scrie în biletul de despărțire?",
    ],
  },
  "brand-trust": {
    qualIntent:
      "Explorează încrederea că marca își ține promisiunile și unde s-a construit sau s-a rupt această încredere, prin incidente critice.",
    qualQuestions: [
      "Povestiți-mi despre o dată când [brand] fie a fost la înălțime, exact cum a promis, fie v-a dezamăgit.",
      "Ce vă promite [brand], spus sau nespus — și cât de bine își ține de fapt promisiunea?",
      "Dacă [brand] ar face o greșeală, câtă îngăduință i-ați acorda și de ce?",
      "În cine sau în ce aveți încredere să vă spună adevărul despre cât de bună e [brand] cu adevărat?",
      "Completați: „Am încredere în [brand] că ______, dar nu sunt așa sigur în privința ______.”",
    ],
  },
  "brand-equity-index": {
    qualIntent:
      "Sondează holistic dacă marca e percepută ca semnificativă, diferită și prezentă în minte — cei trei piloni ai forței generale a mărcii.",
    qualQuestions: [
      "Cu cuvintele dumneavoastră, ce înseamnă [brand] pentru dumneavoastră — contează în viața dumneavoastră, sau v-ar fi indiferentă?",
      "Ce face [brand] diferită de tot restul categoriei — sau se pierde în peisaj alături de celelalte?",
      "Când vine vorba de categorie, cât de repede și de sigur vă vine [brand] în minte față de altele?",
      "Dacă [brand] ar dispărea mâine, ce anume ar lipsi — ați observa, v-ar păsa?",
      "Punând totul cap la cap — [brand] vi se pare un nume puternic, care iese în evidență, sau doar unul dintre multe altele — și ce înclină balanța?",
    ],
  },
  "brand-funnel-conversion": {
    qualIntent:
      "Urmărește parcursul personal de la cunoaștere până la loialitate și localizează exact unde se pierde sau stagnează atașamentul.",
    qualQuestions: [
      "Povestiți-mi toată istoria dumneavoastră cu [brand] — de când ați auzit prima dată de ea, la prima încercare, până unde vă aflați acum.",
      "În ce moment lucrurile fie s-au așezat într-un obicei, fie au început să se stingă — ce se întâmpla atunci?",
      "Cunoașteți [brand], dar [haven't tried it / tried it but moved on] — care e golul care a oprit lucrurile să meargă mai departe?",
      "Unde, pe parcursul ăsta, [brand] era cât pe ce să vă piardă, și ce v-a ținut aproape sau ce v-a îndepărtat?",
      "Dacă v-ați oprit într-un anumit punct, ce ar fi nevoie ca să treceți la următorul — s-o încercați, să rămâneți la ea sau s-o susțineți față de alții?",
    ],
  },
  "share-of-voice": {
    qualIntent:
      "Surprinde prezența percepută în comunicare și publicitate față de rivali, așa cum e resimțită, nu măsurată.",
    qualQuestions: [
      "În categoria asta, ce mărci simțiți că vă vorbesc întruna — reclame, postări, sponsorizări, oriunde?",
      "Când ați observat ultima dată [brand] undeva în jurul dumneavoastră — unde era, ce făcea?",
      "Față de rivalii ei, [brand] vi se pare zgomotoasă și prezentă peste tot, sau discretă și ușor de ratat?",
      "A cui publicitate sau prezență vă rămâne cel mai mult în minte în categoria asta — și ce o face să răzbată?",
      "Dacă o marcă ar tăcea un an întreg, ați observa absența [brand] — sau s-a estompat deja în fundal pentru dumneavoastră?",
    ],
  },

  // ── Usage & Attitudes (U&A) ──────────────────────────────────────────────
  "category-penetration": {
    qualIntent:
      "Înțelegem dacă categoria are vreun rol în viața respondentului și ce funcție fundamentală îndeplinește (sau de ce lipsește) — nu doar un indicator da/nu de utilizare.",
    qualQuestions: [
      "Povestiți-mi unde își găsește locul ceva de genul [category] în viața dumneavoastră acum — sau spuneți-mi sincer dacă, de fapt, nu prea are unul.",
      "Întoarceți-vă puțin în timp, la momentul în care [category] a apărut prima dată în viața dumneavoastră — cum ați ajuns să începeți să folosiți așa ceva (sau de ce nu ați folosit niciodată)?",
      "Dacă [category] ar dispărea mâine, ce s-ar schimba concret pentru dumneavoastră? Ce ați face în loc?",
      "Când apelați la [category], care este, de fapt, treaba pe care o „angajați” să o facă în acel moment?",
      "Sunt în jurul dumneavoastră oameni care folosesc asta foarte diferit — sau deloc? Ce e diferit la ei?",
    ],
  },
  "usage-frequency": {
    qualIntent:
      "Scoatem la suprafață ritmul real de utilizare și factorii declanșatori sau frânele care îl accelerează ori îl încetinesc, nu doar o medie săptămânală.",
    qualQuestions: [
      "Descrieți-mi o săptămână obișnuită — unde apare [category] în mod natural și cât de des?",
      "Când ați cumpărat sau folosit ultima dată? Și data dinainte? Ajutați-mă să înțeleg intervalul dintre ele.",
      "Ce vă face, de obicei, să apelați mai des decât în mod normal? Și ce vă încetinește serios?",
      "De unde știți că e momentul să cumpărați sau să folosiți din nou — care e semnalul?",
      "S-a schimbat ritmul în ultimul an sau doi? Ce se întâmpla în viața dumneavoastră când s-a schimbat?",
    ],
  },
  "usage-occasions": {
    qualIntent:
      "Reconstruim în detaliu o ocazie concretă și recentă, pentru a cartografia când/unde/cu cine/de ce — în locul unor „ocazii” generice.",
    qualQuestions: [
      "Povestiți-mi despre cea mai recentă dată când ați folosit [category] — luați-mă cu dumneavoastră prin acel moment, de la început.",
      "Unde eram exact, cât era ceasul și cine mai era prin preajmă?",
      "Ce se întâmpla chiar înainte, de a făcut din acela momentul potrivit?",
      "Cum ar arăta ocazia aceea diferit în weekend față de o zi de lucru, sau singur(ă) față de împreună cu alții?",
      "Există momente în care nu ați folosi niciodată — în care pur și simplu nu s-ar potrivi? Povestiți-mi despre unul.",
    ],
  },
  "weight-of-usage": {
    qualIntent:
      "Ajungem la intensitatea percepută de respondent și la mentalitatea din spatele statutului de utilizator intens vs. ocazional, nu doar la o contabilizare a volumului.",
    qualQuestions: [
      "Dacă ar trebui să vă descrieți ca utilizator ocazional, mediu sau intens de [category], unde v-ați plasa — și de ce tocmai acolo?",
      "Într-o săptămână „plină” pentru [category], cum arată asta concret pentru dumneavoastră, de la un capăt la altul?",
      "Comparativ cu oamenii din jur, credeți că folosiți mai mult sau mai puțin? Ce vă face să spuneți asta?",
      "Ce ar trebui să se întâmple ca să folosiți vizibil mai mult? Și ce vă împiedică să reduceți?",
      "Există un punct în care simțiți că v-a fost „de ajuns”? Cum vă dați seama că ați ajuns acolo?",
    ],
  },
  "brand-repertoire": {
    qualIntent:
      "Cartografiem setul de mărci între care alternează cu adevărat și logica din spatele rotației, în loc să cerem numirea unui singur favorit.",
    qualQuestions: [
      "Ce mărci sunt efectiv „în joc” pentru dumneavoastră în această categorie acum? Puneți-le pe toate pe masă.",
      "Pentru fiecare dintre ele — când e aceea marca la care apelați? Care e momentul ei?",
      "Când treceți de la una la alta, ce stă de obicei în spatele schimbării?",
      "Există o marcă la care reveniți mereu, ca o alegere sigură? Și una pe care o folosiți doar în anumite situații?",
      "Sunt mărci pe care le-ați scos în mod deliberat din rotație? Ce le-a scos?",
    ],
  },
  "share-of-wallet": {
    qualIntent:
      "Înțelegem cum își împart cheltuielile/utilizarea din categorie între mărci și raționamentul din spatele împărțirii, pornind de la comportamentul real recent.",
    qualQuestions: [
      "Din ultimele 10 dăți când ați cumpărat sau folosit ceva din această categorie, cam cum s-a împărțit între mărci? Povestiți-mi.",
      "Pentru marca pe care o folosiți cel mai des — ce anume o menține pe felia cea mai mare?",
      "În dățile în care ați ales alta, ce v-a atras în direcția aceea în ziua respectivă?",
      "Dacă ar trebui să dați unei mărci o pondere mai mare din cheltuielile dumneavoastră, care ar fi și de ce?",
      "Ce ar trebui să se întâmple ca marca dumneavoastră principală de acum să piardă teren în ochii dumneavoastră?",
    ],
  },
  "habits-practices": {
    qualIntent:
      "Observăm cum este folosit produsul în practică, în realitate — ritualul, pregătirea, combinațiile și eventualele utilizări neconvenționale sau improvizate — printr-o reconstituire pas cu pas.",
    qualQuestions: [
      "Descrieți-mi exact cum îl folosiți, pas cu pas, ca și cum mi-ați arăta peste umăr.",
      "Există o rutină sau un ritual în jurul lui? Când s-a așezat felul acesta în care faceți lucrurile acum?",
      "Cu ce îl combinați de obicei, sau ce folosiți în paralel?",
      "V-ați găsit propriul fel de a-l folosi, puțin diferit de cum „ar trebui” folosit?",
      "Dacă v-aș urmări o săptămână făcând asta, ce m-ar surprinde la felul în care procedați de fapt?",
    ],
  },
  "category-attitudes": {
    qualIntent:
      "Scoatem la suprafață convingerile, implicarea emoțională și orientarea personală față de categorie — cât de mult contează pentru respondent și ce reprezintă.",
    qualQuestions: [
      "Când auziți cuvintele „[category]”, care e primul lucru care vă vine în minte — gânduri, sentimente, orice?",
      "Cât de mult contează, de fapt, această categorie pentru dumneavoastră, comparativ cu alte lucruri pe care cheltuiți?",
      "Există lucruri pe care oamenii le cred despre [category] și cu care sunteți total de acord — sau total în dezacord?",
      "Povestiți-mi despre o dată când categoria v-a dezamăgit sau, dimpotrivă, chiar s-a ridicat la înălțime — cum ați rămas după aceea?",
      "Dacă [category] ar fi un tip de om, cine ar fi? De ce tocmai acela?",
    ],
  },
  "needs-motivations": {
    qualIntent:
      "Descoperim nevoile funcționale și emoționale de fond (jobs-to-be-done) și facem laddering de la atribut către valoarea personală mai profundă.",
    qualQuestions: [
      "Când alegeți să folosiți [category], ce încercați, de fapt, să obțineți sau să simțiți?",
      "Gândiți-vă la o dată când a nimerit perfect — ce nevoie vă împlinea chiar atunci?",
      "Ați pomenit de [benefit] — și de ce contează asta pentru dumneavoastră? (continuăm laddering-ul: …și ce vă oferă asta mai departe?)",
      "Dincolo de partea practică, evidentă, există și ceva emoțional pe care vi-l oferă?",
      "Dacă această categorie ar putea rezolva complet o singură frustrare din viața dumneavoastră, ce ați vrea să repare?",
    ],
  },
  "jobs-to-be-done": {
    qualIntent:
      "Descoperim progresul real pe care clientul încearcă să-l facă și circumstanțele care îl declanșează — „job-ul” funcțional, emoțional și social pentru care „angajează” produsul — reconstituind o schimbare reală, recentă, și cele patru forțe din jurul ei.",
    qualQuestions: [
      "Duceți-mă înapoi la momentul în care v-ați dat seama prima dată că aveți nevoie de așa ceva. Ce se întâmpla în viața sau în ziua dumneavoastră chiar atunci?",
      "Ce foloseați sau cum vă descurcați înainte ca să rezolvați asta — și ce a început să nu mai meargă?",
      "Când ați început să căutați, care era progresul pe care încercați cu adevărat să-l faceți? Cum ar fi arătat „mai bine”?",
      "Dincolo de rezolvarea treburii în sine, cum voiați să vă simțiți în legătură cu ea — și cum voiați să vă vadă ceilalți? (latura emoțională și socială a job-ului)",
      "Ce v-a făcut să ezitați înainte să treceți la el? Ce era cât pe ce să vă țină pe loc sau să vă facă să rămâneți la ce aveați deja?",
      "Când l-ați ales în final, care a fost lucrul care a înclinat balanța — și de unde știați că își va face treaba?",
      "Acum, că trăiți cu el de ceva vreme, unde mai rămâne dator față de job-ul pentru care l-ați „angajat”?",
    ],
  },
  "path-to-purchase": {
    qualIntent:
      "Reconstruim de la un capăt la altul o achiziție reală recentă, pentru a surprinde declanșatorul, sursele consultate, influențatorii/decidenții și criteriile decisive.",
    qualQuestions: [
      "Duceți-mă înapoi la ultima dată când ați cumpărat asta — ce a pus prima dată decizia în mișcare?",
      "Între acel prim gând și cumpărarea propriu-zisă, ce ați făcut — ați căutat ceva, ați întrebat pe cineva?",
      "Cine a mai avut un cuvânt de spus, chiar și discret? A cui părere a contat?",
      "Când s-a ajuns la alegerea finală, ce a înclinat balanța? Ce era cât pe ce să vă facă să alegeți altceva?",
      "Privind în urmă, a existat un moment în care aproape că nu ați mai cumpărat deloc? Despre ce a fost vorba?",
    ],
  },
  "channel-usage": {
    qualIntent:
      "Înțelegem de unde cumpără și motivele reale pentru care acele canale câștigă în această categorie, pornind de la ultimele câteva achiziții.",
    qualQuestions: [
      "De unde ați cumpărat ultimele dăți? Povestiți-mi cum ați ales locul acela.",
      "Ce vă oferă acel canal și celelalte nu reușesc să vă ofere?",
      "Există locuri de unde nu ați cumpăra niciodată această categorie? Ce nu e în regulă cu ele, din punctul dumneavoastră de vedere?",
      "Când ați trece la un alt canal — online în loc de magazin fizic, un magazin în locul altuia?",
      "Dacă locul dumneavoastră obișnuit n-ar mai fi o opțiune de mâine, unde v-ați duce în schimb — și cum v-ați simți cu asta?",
    ],
  },
  "media-consumption": {
    qualIntent:
      "Cartografiem ce media și platforme le umplu cu adevărat ziua și cu ce intensitate, reconstituind o zi reală, recentă, în loc să ne bazăm pe obiceiuri declarate.",
    qualQuestions: [
      "Descrieți-mi ziua de ieri, de când v-ați trezit — unde au apărut ecranele, audio-ul sau media pe parcurs?",
      "Pe ce platforme sau canale vă treziți fără să vă dați seama? Și pe care intrați în mod deliberat?",
      "Unde mergeți când vreți să vă deconectați cu adevărat și să vă relaxați?",
      "Când ceva despre [category] ajunge la dumneavoastră, de unde vine de obicei?",
      "Dacă ați pierde mâine accesul la o singură platformă, care v-ar lipsi cel mai mult? De ce tocmai aceea?",
    ],
  },
  "lapsing-churn-reasons": {
    qualIntent:
      "Reconstituim „despărțirea” — ce anume s-a schimbat și care a fost picătura care a umplut paharul și a pus capăt utilizării mărcii/categoriei — nu doar un motiv declarat.",
    qualQuestions: [
      "A fost o vreme când foloseați [brand/category], iar acum nu o mai faceți — duceți-mă înapoi la momentul în care a început să se destrame.",
      "A existat un moment anume, o picătură care a umplut paharul, sau pur și simplu s-a stins treptat? Povestiți-mi.",
      "Ce sperați să vă ofere și a încetat să vă mai ofere?",
      "Ce faceți acum în loc? Cum se compară cu ce era înainte?",
      "Ce ar trebui, realist vorbind, să se întâmple ca să vă recâștige — și e măcar posibil?",
    ],
  },

  // ── Purchase Behaviour & Pricing ─────────────────────────────────────────
  "purchase-intention": {
    qualIntent:
      "Intenția declarată costă puțin; scoateți la suprafață condițiile concrete, momentul și declanșatorii care ar muta efectiv o persoană de la 'probabil aș cumpăra' la a scoate banii din buzunar.",
    qualQuestions: [
      "Unde ați spune că vă aflați acum în privința [product] — sunteți doar curios, vă gândiți serios sau practic v-ați hotărât? Ce vă ține în punctul ăsta?",
      "Imaginați-vă că îl cumpărați efectiv — când se întâmplă asta și ce se petrece în jurul dumneavoastră în momentul acela?",
      "Ce ar trebui să se așeze ca să-l cumpărați mai degrabă curând decât 'cândva'?",
      "Spuneați că probabil l-ați cumpăra — ce distanță e între 'probabil' și a o face cu adevărat?",
      "Gândiți-vă la ceva ce ați spus de curând că o să cumpărați, dar încă n-ați făcut-o. Ce anume ține lucrurile pe loc?",
    ],
  },
  "purchase-triggers": {
    qualIntent:
      "Oamenii invocă criterii raționale, dar cumpără pe baza unui declanșator concret; folosiți incidentul critic al ultimei achiziții plus laddering pentru a ajunge la nevoia din spatele motivului declarat.",
    qualQuestions: [
      "Duceți-mă înapoi la ultima dată când ați cumpărat [product]. Ce a declanșat totul — ce se întâmpla în ziua aceea?",
      "Din tot ce ați cântărit atunci, care a fost lucrul care a înclinat balanța?",
      "De ce a contat pentru dumneavoastră tocmai lucrul acela? Și de ce contează asta? (laddering)",
      "Când ați comparat variantele, ce anume v-a făcut să le eliminați pe celelalte?",
      "Dacă un prieten v-ar întreba 'de ce tocmai ăsta?', ce i-ați spune — și ce ați lăsa deoparte?",
    ],
  },
  "purchase-barriers": {
    qualIntent:
      "Barierele reale sunt adesea jenante sau raționalizate; folosiți incidentul critic plus tehnici proiective pentru a ocoli răspunsurile 'corecte'.",
    qualQuestions: [
      "Povestiți-mi pas cu pas ultima dată când v-ați gândit la [brand/product], dar până la urmă n-ați mai cumpărat. Ce s-a întâmplat?",
      "În ce moment exact ați ezitat sau ați dat înapoi?",
      "Unii oameni spun că n-ar cumpăra niciodată [product] — ce motive vă imaginați că au? (proiectivă la persoana a treia)",
      "Ce ar fi trebuit să fie adevărat ca să-l cumpărați totuși în ziua aceea?",
      "E ceva la el care pur și simplu nu vă dă pace, chiar dacă e greu de pus în cuvinte?",
    ],
  },
  "trial-intent": {
    qualIntent:
      "Prima achiziție este guvernată de riscul perceput; scoateți la suprafață ce face ca încercarea să pară sigură și care ar fi, în imaginația respondentului, costul unei prime încercări 'greșite'.",
    qualQuestions: [
      "Ar fi prima dumneavoastră experiență cu [product] — ce vă trece prin minte când vă imaginați că îl încercați?",
      "Ce vi se pare nesigur sau riscant la o primă încercare, fie și puțin?",
      "Gândiți-vă la ultimul produs nou pe care l-ați încercat pentru prima dată. Ce v-a dat impulsul să o faceți până la urmă?",
      "Ce ar face ca o primă încercare să pară fără riscuri — ca și cum n-ați avea, de fapt, ce pierde?",
      "Unii oameni ezită să încerce ceva nou de genul ăsta — ce credeți că îi reține? (proiectivă)",
      "Dacă nu v-ar ieși, ce v-ar costa asta — bani, timp, faptul că ați părea naiv?",
    ],
  },
  "repeat-purchase-intent": {
    qualIntent:
      "Recumpărarea depinde de măsura în care experiența trăită a onorat promisiunea de dinaintea achiziției; scoateți la suprafață decalajul dintre așteptare și realitate și ce i-ar face să revină la produs din reflex.",
    qualQuestions: [
      "Acum, că l-ați folosit, cum s-a potrivit experiența reală cu ce vă așteptați la început?",
      "Ați apela la el din nou data viitoare? Ce vă face să spuneți asta?",
      "Povestiți-mi despre un moment din utilizare care fie v-a cucerit, fie v-a dezamăgit.",
      "Ce ar trebui să meargă prost ca data viitoare să treceți la altceva?",
      "Când vine momentul să cumpărați din nou, credeți că ați face-o automat sau v-ați opri să vă mai gândiți? De ce?",
    ],
  },
  "willingness-to-pay": {
    qualIntent:
      "Cifra contează mai puțin decât reperele și raționamentul din spatele ei; scoateți la suprafață cu ce compară respondentul și ce face ca un preț să pară justificat, nu doar 'mare' sau 'mic'.",
    qualQuestions: [
      "Când vă gândiți cât ar trebui să coste [product], care e primul lucru cu care îl comparați?",
      "Povestiți-mi ce ar face ca un preț să vi se pară absolut corect pentru așa ceva — și ce ar fi deja prea mult.",
      "Imaginați-vă că vedeți prețul și vă gândiți pe loc 'merită'. Ce ar veni la pachet cu prețul acela — ce primiți, de fapt?",
      "Unii oameni ar plăti fără să clipească mult peste prețul obișnuit pentru asta; ce credeți că plătesc ei, de fapt? (proiectivă pe premium)",
      "Unde e punctul în care v-ați opri și v-ați spune 'nu, e prea mult' — și ce vă împinge peste linia aceea?",
      "Dacă ar costa mai mult decât vă așteptați, ce v-ați spune ca să vă justificați achiziția — sau ca să renunțați?",
    ],
  },
  "van-westendorp": {
    qualIntent:
      "Explorați cele patru praguri de preț ca semnificație, nu ca cifre — mai ales pragul de jos 'prea ieftin = suspect', unde prețul mic semnalează calitate slabă.",
    qualQuestions: [
      "La ce preț ar începe [product] să vi se pară scump — nu imposibil, doar 'ar trebui să mă gândesc'? Ce e în spatele senzației ăsteia?",
      "Și la ce preț ar fi atât de scump încât l-ați exclude de tot? Ce vă spune prețul acela?",
      "Acum invers: la ce preț vi s-ar părea un chilipir adevărat — o afacere bună?",
      "Dacă ar fi foarte ieftin — mai ieftin decât tot ce e în jur — ce v-ar trece prin minte? (scoate la suprafață 'prea ieftin = suspect')",
      "Când ceva din categoria asta are un preț suspect de mic, ce presupuneți că s-a tăiat sau s-a sacrificat?",
      "Unde e punctul în care prețul pur și simplu se simte corect — nici ieftin, nici scump — și ce face ca punctul acela să pară potrivit?",
    ],
  },
  "gabor-granger": {
    qualIntent:
      "Găsiți punctele psihologice de basculare în care disponibilitatea de a cumpăra se răstoarnă, și semnificația depășirii fiecărui prag, mai degrabă decât să trasați o curbă lină a cererii.",
    qualQuestions: [
      "Să zicem că prețul ar crește puțin față de cel de acum — în ce punct ați începe să ezitați?",
      "Care e prețul la care ați trece de la 'da' la 'mai aștept' sau 'caut în altă parte'? Ce se schimbă pentru dumneavoastră exact acolo?",
      "Iar dacă ar scădea — există un preț la care ați cumpăra mai mult, ați face stoc sau l-ați lua fără să vă mai gândiți?",
      "Când un preț vă depășește limita, e vorba de banii în sine sau de ce spune scumpirea despre produs? (semnificația pragului)",
      "Gândiți-vă la o situație în care o scumpire v-a făcut să renunțați la ceva ce cumpărați de obicei. Care a fost picătura care a umplut paharul?",
      "Există prețuri care vi se par 'linii' firești — cifre rotunde sau praguri peste care nu treceți?",
    ],
  },
  "value-for-money": {
    qualIntent:
      "Scoateți la suprafață felul în care respondentul împacă prețul cu calitatea — dacă oferta 'merită banii' — și ce anume pune, concret, pe fiecare taler al acestei balanțe.",
    qualQuestions: [
      "Când vă gândiți la [product] la prețul lui, vi se pare că merită? Povestiți-mi cum ajungeți la concluzia asta.",
      "Ce cântăriți, de fapt — ce e pe talerul 'ce primesc' și ce e pe talerul 'ce plătesc'?",
      "Povestiți-mi despre ceva ce ați cumpărat și a fost o afacere excelentă, și despre ceva care vi s-a părut o țeapă. Care a fost diferența?",
      "La produsul ăsta, unde vi se pare că se duc banii — și vi se pare în regulă?",
      "Unii oameni spun că [product] e prea scump pentru ce oferă; ce credeți că le scapă — sau în ce au dreptate? (proiectivă)",
      "Dacă prețul ar rămâne același, dar un singur lucru s-ar schimba, ce l-ar muta din 'merită' în 'nu merită'?",
    ],
  },
  "promo-responsiveness": {
    qualIntent:
      "Distingeți promoțiile care schimbă cu adevărat comportamentul de cele care doar recompensează achiziții deja planificate; scoateți la suprafață apetitul pentru oferte și granița dintre 'ofertă bună' și 'pare o păcăleală'.",
    qualQuestions: [
      "Povestiți-mi despre ultima dată când o ofertă sau o reducere chiar a schimbat ce ați cumpărat sau când ați cumpărat. Despre ce era vorba?",
      "Oferta v-a făcut să cumpărați ceva ce altfel n-ați fi luat, sau doar a îndulcit ceva ce oricum cumpărați?",
      "Ce fel de promoție vă atrage cu adevărat — și la ce fel dați ochii peste cap? (apetit pentru oferte vs. păcăleală)",
      "Când vedeți o reducere mare, care e prima reacție — 'super' sau 'unde-i șmecheria'?",
      "Unii oameni își planifică toate cumpărăturile în jurul ofertelor; alții abia le observă. Dumneavoastră unde vă situați, și de ce?",
      "După ce se termină oferta, ați mai plăti prețul întreg — sau reducerea a devenit singurul motiv pentru care ați cumpăra?",
    ],
  },

  // ── Concept & Product Testing ────────────────────────────────────────────
  "overall-liking": {
    qualIntent:
      "Surprindeți verdictul instinctiv, nefiltrat, și motorul dominant din spatele lui, înainte ca respondentul să-și construiască o justificare 'rezonabilă'.",
    qualQuestions: [
      "Înainte să-mi spuneți orice altceva — care e prima dumneavoastră reacție, din instinct, la asta?",
      "Dacă ar trebui să alegeți un singur cuvânt care să rezume ce vă face să simțiți, care ar fi? De ce tocmai acel cuvânt?",
      "Care e lucrul principal care vă stârnește reacția asta?",
      "Imaginați-vă că asta apare în viața dumneavoastră săptămâna viitoare — vi se pare un lucru bun, ceva neutru, sau mai degrabă 'nu, mulțumesc'? Povestiți-mi de ce.",
      "Ce anume vă reține, dacă e ceva, să fiți mai entuziasmat de asta?",
    ],
  },
  "likes-dislikes": {
    qualIntent:
      "Treceți dincolo de 'îmi place / nu-mi place' — legați reacțiile de un atribut concret și apoi de o consecință personală (laddering).",
    qualQuestions: [
      "Spuneți-mi sincer prima dumneavoastră reacție la asta — fără să o filtrați.",
      "Care e lucrul de aici pentru care v-ați bate să rămână? Și lucrul pe care l-ați arunca?",
      "Ați spus că v-a plăcut [X] — ce face [X], de fapt, pentru dumneavoastră? (sondați în sus pe scară: …și de ce contează asta pentru dumneavoastră?)",
      "E ceva aici care vă încurcă sau vi se pare că 'nu e pentru mine'? Povestiți-mi despre asta.",
      "Dacă i-ați descrie asta unui prieten care n-a văzut-o niciodată, cu privire la ce l-ați avertiza?",
    ],
  },
  uniqueness: {
    qualIntent:
      "Aflați dacă 'noutatea' este percepută cu adevărat și are sens pentru respondent sau e doar cosmetică — și ce element anume poartă diferența.",
    qualQuestions: [
      "Vi se pare ceva nou, sau mai degrabă ceva ce ați mai văzut? Spuneți-mi ce stă în spatele impresiei ăsteia.",
      "Cu ce anume din ce există deja vă seamănă asta? Prin ce e la fel, și prin ce e diferită?",
      "Arătați-mi acel un singur lucru de aici pe care nu l-ați putea obține de la nimic altceva din ce folosiți astăzi.",
      "Dacă partea aceea diferită ar dispărea, ați observa măcar? V-ar păsa?",
      "Faptul că e diferit e chiar un lucru bun pentru dumneavoastră aici, sau nu prea contează? De ce?",
    ],
  },
  relevance: {
    qualIntent:
      "Stabiliți dacă acest concept se leagă de o nevoie reală, deja existentă în viața respondentului — nu de una ipotetică, inventată de concept.",
    qualQuestions: [
      "Gândindu-vă la viața dumneavoastră de zi cu zi, unde s-ar potrivi, concret, ceva de genul acesta?",
      "Când ați avut ultima dată problema pe care încearcă asta să o rezolve? Povestiți-mi despre momentul acela.",
      "Rezolvă asta ceva cu care vă confruntați cu adevărat, sau e mai degrabă 'drăguț, dar nu chiar problema mea'? Fiți sincer.",
      "Pentru cine vă imaginați că a fost făcut? Persoana aceea seamănă cu dumneavoastră, sau e altcineva?",
      "Dacă asta n-ar exista, cum v-ați descurca astăzi? Ce folosiți sau ce faceți în loc?",
    ],
  },
  believability: {
    qualIntent:
      "Testați care afirmații concrete sunt percepute drept credibile și care par 'prea frumoase ca să fie adevărate' — și dacă brandul are legitimitatea de a le face.",
    qualQuestions: [
      "Ce anume de aici credeți din prima, și ce vă face să ridicați din sprânceană?",
      "Ați părut nesigur în privința [claim] — ce ar trebui să se întâmple ca să credeți asta cu adevărat?",
      "Vi se pare ceva ce acest brand chiar ar putea duce la capăt? De ce da, sau de ce nu?",
      "E ceva care vi se pare o promisiune exagerată sau prea frumoasă ca să fie adevărată? Care parte?",
      "Dacă un prieten v-ar spune 'asta nu se poate', ce i-ați răspunde?",
    ],
  },
  comprehension: {
    qualIntent:
      "Confirmați că respondentul a înțeles conceptul așa cum a fost intenționat, punându-l să îl reconstruiască singur — astfel ies la iveală golurile și interpretările greșite.",
    qualQuestions: [
      "Cu cuvintele dumneavoastră, descrieți-mi ce este asta și ce face.",
      "Dacă ar trebui să-i explicați cuiva asta într-o singură propoziție, ce ați spune?",
      "A fost vreun cuvânt, vreo formulare sau vreo parte la care v-ați oprit sau care nu vi s-a părut clară? Arătați-mi unde.",
      "Ce credeți că vă promite, de fapt, că veți primi?",
      "E ceva ce v-ați trezit că vreți să întrebați sau ce v-ați fi dorit să vă explice?",
    ],
  },
  "jar-scales": {
    qualIntent:
      "Identificați ce atribute anume se abat de la nivelul ideal și în ce direcție, încadrat ca optimizare, nu ca o evaluare de tip admis/respins.",
    qualQuestions: [
      "Gândindu-vă la [attribute] — este prea mult, prea puțin, sau cam cât trebuie pentru dumneavoastră? Spuneți-mi mai multe.",
      "Dacă ați avea un buton de reglaj pentru [attribute], în ce direcție l-ați roti și cât de mult?",
      "Ce vi se pare perfect echilibrat aici, la care nu ați umbla deloc?",
      "E ceva un pic exagerat — mai mult decât aveți nevoie sau decât v-ați dori?",
      "Și ceva care pare că lipsește sau că trage în jos — unde ați vrea mai mult?",
      "Dacă ați putea schimba un singur nivel sau o singură cantitate ca să fie exact pe gustul dumneavoastră, care ar fi?",
    ],
  },
  "paired-preference": {
    qualIntent:
      "Descoperiți adevăratul factor de decizie din spatele alegerii dintre cele două variante — nu doar care a câștigat, ci ce anume a înclinat balanța.",
    qualQuestions: [
      "Dintre aceste două, spre care întindeți mâna? Nu analizați prea mult.",
      "Ce anume la aceea a făcut-o câștigătoare pentru dumneavoastră?",
      "Ce face cealaltă mai bine, dacă face ceva? Ce îi lipsește?",
      "A fost o alegere ușoară sau una strânsă? Care a fost factorul decisiv?",
      "Dacă am repara acel un singur lucru pe care cea care a pierdut l-a greșit, s-ar schimba alegerea dumneavoastră? Ce ar fi nevoie?",
    ],
  },
  "expected-frequency": {
    qualIntent:
      "Ancorați un ritm realist de utilizare în ocazii și obiceiuri concrete, dezumflând optimismul de tip 'l-aș cumpăra tot timpul'.",
    qualQuestions: [
      "Realist vorbind, cât de des vă vedeți folosind sau cumpărând asta cu adevărat? Povestiți-mi cum ar arăta.",
      "Descrieți-mi genul de moment sau de ocazie în care ați apela la asta.",
      "Ar înlocui asta ceva ce cumpărați deja, sau s-ar adăuga pe deasupra? Ce anume, și de ce?",
      "Ce ar trebui să se întâmple ca să îl folosiți mai des de atât?",
      "Fiți sincer — e un lucru de 'în fiecare săptămână', de 'din când în când', sau de 'o dată, ca să încerc'? De ce?",
    ],
  },
  "price-perception-concept": {
    qualIntent:
      "Citiți decalajul dintre valoarea percepută și preț, ancorându-vă în așteptările și reperele proprii ale respondentului, înainte de a dezvălui cifra sau de a reacționa la ea.",
    qualQuestions: [
      "Înainte să vă spun ceva despre preț — cât v-ați aștepta să coste ceva de genul acesta?",
      "Acum, că vedeți prețul, care e reacția dumneavoastră sinceră? (sondați: prea mare, corect, surprinzător de mic?)",
      "Ce anume de aici face ca prețul acesta să merite — sau nu?",
      "Cu ce comparați prețul, în mintea dumneavoastră, atunci când îl judecați?",
      "La ce nivel de preț ați renunța de tot? Și ce l-ar face să pară un chilipir?",
    ],
  },

  // ── Customer Experience & Satisfaction ───────────────────────────────────
  nps: {
    qualIntent:
      "Scorul în sine nu spune nimic — scoateți la suprafață experiențele și emoțiile concrete care l-ar face pe respondent să vă recomande cu convingere sau, dimpotrivă, să-i avertizeze discret pe alții.",
    qualQuestions: [
      "Pe o scală de la 0 la 10, cât de probabil ar fi să ne recomandați unui prieten sau unui coleg? Povestiți-mi ce se ascunde în spatele acestei note.",
      "Gândiți-vă la ultima dată când a venit vorba în mod natural despre asta — ne-ați menționat vreodată cuiva, de fapt? Ce ați spus și ce a declanșat discuția?",
      "Ce ar trebui să se întâmple ca nota aceea să scadă cu vreo două puncte? Și ce ar împinge-o mai sus?",
      "Dacă un prieten apropiat ar fi pe punctul de a deveni clientul nostru, ce ați ține neapărat să-i spuneți înainte — și părțile bune, și acel 'să știi totuși că...'?",
      "Povestiți-mi despre un moment trăit cu noi pe care v-ați surprins descriindu-l altora, fie el bun sau rău.",
    ],
  },
  csat: {
    qualIntent:
      "Urmăriți factorii concreți din spatele sentimentului — ce s-a întâmplat efectiv într-o interacțiune reală care i-a lăsat mulțumiți sau dezamăgiți, nu o evaluare generică.",
    qualQuestions: [
      "Gândindu-vă la cea mai recentă experiență cu noi, cu ce sentiment ați rămas? Luați-mă pas cu pas prin ce s-a întâmplat de fapt.",
      "Care a fost momentul din acea experiență care a contat cel mai mult pentru dumneavoastră — cel care a înclinat balanța într-o direcție sau alta?",
      "A fost ceva care nu s-a ridicat la nivelul așteptărilor, chiar și puțin? Povestiți-mi despre asta.",
      "Când totul merge exact cum trebuie cu noi, cum arată asta pentru dumneavoastră? S-a întâmplat vreodată chiar așa?",
      "Dacă ați putea relua acea ultimă interacțiune, care ar fi singurul lucru pe care l-ați schimba?",
    ],
  },
  ces: {
    qualIntent:
      "Reconstituiți fricțiunile de-a lungul parcursului — unde a trebuit să se repete, să aștepte, să caute sau să depună mai mult efort decât ar fi fost normal ca să-și rezolve treaba.",
    qualQuestions: [
      "Gândiți-vă la ultimul lucru pe care ați avut nevoie să-l rezolvați cu noi. Luați-mă pas cu pas prin tot procesul, din momentul în care ați început.",
      "Unde anume, pe parcurs, a trebuit să vă opriți să vă gândiți, să așteptați sau să reluați ceva de la capăt?",
      "A existat vreun punct în care a trebuit să vă repetați, să insistați pe lângă noi sau să explicați același lucru de două ori? Povestiți-mi despre asta.",
      "Cât efort v-a cerut totul, comparativ cu ce vă așteptați la început?",
      "Dacă i-ați fi arătat unui prieten cum să facă același lucru, unde l-ați fi avertizat 'partea asta devine enervantă'?",
      "Ce ar fi făcut ca totul să pară fără niciun efort?",
    ],
  },
  "repurchase-intention": {
    qualIntent:
      "Urmăriți condițiile reale din spatele deciziei de a rămâne sau de a pleca — declanșatorul care i-ar face să se răzgândească și ce anume îi ține de fapt aproape, dincolo de un declarativ 'probabil voi reînnoi'.",
    qualQuestions: [
      "Când vine momentul reînnoirii (sau al următoarei achiziții), cât de mare e decizia pentru dumneavoastră — merge de la sine sau chiar o cântăriți serios?",
      "A existat recent vreun moment în care v-ați surprins întrebându-vă dacă să continuați? Ce l-a declanșat?",
      "Ce vă ține, de fapt, alături de noi în acest moment — valoarea primită, bătaia de cap a schimbării, obișnuința, altceva?",
      "Dacă mâine un competitor v-ar face o ofertă tentantă, ce ar trebui să pună pe masă ca să vă gândiți serios la o mutare?",
      "Imaginați-vă ziua în care decideți să nu mai reînnoiți — ce ar fi trebuit să se întâmple în perioada dinainte ca să ajungeți acolo?",
    ],
  },
  "complaint-incidence": {
    qualIntent:
      "Urmăriți întregul arc al recuperării serviciului — ce a mers prost, dacă au semnalat sau nu problema, cum a fost gestionată și cum a remodelat acea gestionare relația.",
    qualQuestions: [
      "Povestiți-mi despre ultima dată când ceva nu a mers bine cu noi. Ce s-a întâmplat, cu cât mai multe detalii vă amintiți?",
      "Ați semnalat problema sau ați lăsat-o baltă? Explicați-mi de ce ați ales așa.",
      "Dacă ne-ați contactat, luați-mă prin tot ce a urmat — cu cine ați vorbit, cât a durat, cum v-ați simțit la fiecare pas.",
      "Privind în urmă, felul în care am gestionat situația v-a lăsat cu o părere mai bună sau mai proastă despre noi decât înainte de problemă?",
      "A existat, în tot procesul de rezolvare, un moment în care v-ați spus 'exact așa trebuie' sau, dimpotrivă, 'aici m-au pierdut'? Povestiți-mi despre el.",
      "Pentru dățile în care nu v-ați mai obosit să reclamați — ce v-a oprit?",
    ],
  },
  "key-driver-importance": {
    qualIntent:
      "Descâlciți ce atribute le determină cu adevărat satisfacția generală față de cele pe care doar le menționează — ce ar sacrifica efectiv dacă ar fi obligați să aleagă.",
    qualQuestions: [
      "Când vă gândiți la ce ne face 'buni' sau 'mai puțin buni' pentru dumneavoastră, care e primul lucru care vă vine în minte — și de ce tocmai acela?",
      "Dintre toate — produsul, oamenii, ușurința, prețul — care dintre ele, dacă ar avea de suferit, v-ar deranja cel mai tare?",
      "Povestiți-mi despre o situație în care o parte a experienței a fost excelentă, dar alta v-a dezamăgit. Cum le-ați cântărit una față de cealaltă?",
      "Dacă am putea face un singur lucru impecabil și am fi doar acceptabili la restul, care ați vrea să fie acela?",
      "Ce părți din relația cu noi abia le observați când merg bine, dar v-ar înfuria dacă ar merge prost?",
    ],
  },

  // ── Advertising & Communications ─────────────────────────────────────────
  "ad-recall": {
    qualIntent:
      "Stabilim dacă reclama s-a înregistrat spontan în memorie și cum trăiește acolo, înainte ca vreun indiciu să contamineze rememorarea.",
    qualQuestions: [
      "Gândindu-vă la [category/brand] în ultima vreme — v-a rămas în minte vreo reclamă? Povestiți-mi ce vă vine primul în minte.",
      "Nu vă faceți griji că trebuie să fie „corect” — spuneți-mi pur și simplu ce vă amintiți că ați văzut sau auzit, în orice ordine vă revine.",
      "Unde erați și ce se întâmpla în jurul dumneavoastră când ați dat peste ea? Ce anume v-a readus-o în minte chiar acum?",
      "Dacă v-aș spune că a existat de curând o reclamă pentru [brand], vă sună cunoscut? Ce începe să vă revină în minte odată ce spun asta?",
      "Care e bucățica aceea care vi s-a fixat în memorie — un moment, o replică, o imagine, un sunet?",
    ],
  },
  "ad-recognition": {
    qualIntent:
      "Confirmăm că execuția creativă efectivă este familiară atunci când este arătată și separăm recunoașterea autentică de un „poate am văzut-o” spus din politețe.",
    qualQuestions: [
      "Ați văzut sau auzit exact această reclamă înainte? Fiți sincer(ă) — un „nu” îmi este la fel de util ca un „da”.",
      "Ce anume vă spune că ați mai întâlnit-o — ce recunoașteți aici?",
      "Când credeți că ați văzut-o, unde a fost, și cam de câte ori estimați că v-ați intersectat cu ea?",
      "E ceva aici care vi se pare nou sau diferit față de ce vă amintiți? Ce s-a schimbat?",
      "Dacă vă e într-adevăr familiară, o simțiți ca pe un vechi prieten sau ca pe ceva care începe să se cam tocească? Povestiți-mi despre asta.",
    ],
  },
  "brand-linkage": {
    qualIntent:
      "Testăm dacă reclama este atribuită corect și cu încredere brandului potrivit, nu unui competitor mai mare sau rival din categorie.",
    qualQuestions: [
      "A cui e reclama asta — cine stă în spatele ei? Și înainte să vă întreb eu, erați sigur(ă), sau a fost o presupunere?",
      "Ce anume din reclamă v-a făcut să vă opriți la brandul acela? Duceți-mă exact la momentul în care ați știut.",
      "Dacă ați fi ajuns la final fără să apară logoul, tot ați fi știut că sunt ei? Când s-a făcut „click”?",
      "Ar putea fi la fel de bine reclama unuia dintre competitorii lor? Care anume, și ce o face interșanjabilă?",
      "Dacă am scoate complet numele brandului, ce rămâne care tot ar fi, fără dubiu, „ei”?",
    ],
  },
  "message-takeout": {
    qualIntent:
      "Captăm ce ajunge respondentul să creadă efectiv, cu propriile cuvinte, înainte de a verifica împotriva mesajului intenționat.",
    qualQuestions: [
      "Cu cuvintele dumneavoastră, ce încerca reclama aceea să vă spună? Spuneți-o cum ați spune-o dumneavoastră, nu cum au spus-o ei.",
      "Care e lucrul principal pe care vor ei să-l gândiți sau să vi-l amintiți după ce ați văzut-o?",
      "A fost ceva acolo care vi s-a părut confuz, sau la care nu erați sigur(ă) ce au vrut să spună? Povestiți-mi.",
      "Dacă un prieten v-ar întreba „despre ce era reclama aia?”, ce i-ați spune într-o singură propoziție?",
      "A existat și un al doilea lucru, mai mic, pe care îl spunea pe dedesubt, dincolo de ideea principală? Care era acela?",
    ],
  },
  persuasion: {
    qualIntent:
      "Scoatem la suprafață dacă reclama l-a apropiat cu adevărat pe respondent de brand — separând a fi convins de a-ți fi plăcut pur și simplu reclama.",
    qualQuestions: [
      "După ce ați văzut asta — se schimbă ceva în felul în care vă raportați la [brand]? Spuneți-mi sincer dacă nu.",
      "Înainte de reclama asta, unde se situa [brand] pentru dumneavoastră? Și acum? Ce s-a mișcat, dacă s-a mișcat ceva?",
      "Ce anume din reclamă a produs mișcarea aceea — sau ce a căzut pe lângă și v-a lăsat rece?",
      "Spuneați că v-a plăcut — dar asta chiar vă face mai înclinat(ă) să-i alegeți pe ei? Pentru mine sunt două lucruri diferite.",
      "E vreo afirmație sau vreun moment aici pe care nu prea îl credeți? Ce ar trebui să se întâmple ca să-l credeți?",
      "Data viitoare când alegeți în această categorie, reclama asta vine cu dumneavoastră în momentul acela, sau rămâne în urmă?",
    ],
  },
  "ad-likeability": {
    qualIntent:
      "Înțelegem textura și sursa aprecierii (sau absenței ei), legată de elemente creative concrete, nu de un verdict global.",
    qualQuestions: [
      "Prima reacție, din instinct — v-a atras sau nu? Nu o analizați prea mult.",
      "Care e partea care v-a plăcut cel mai mult? Și a fost ceva care v-a iritat sau v-a plictisit?",
      "Cu ce sentiment ați rămas chiar la final — rezumați-l într-un cuvânt sau două.",
      "Unele reclame vă plac dar le uitați, pe altele le-ați revedea cu plăcere — unde se încadrează asta, și de ce?",
      "Faptul că v-a plăcut v-a făcut să simțiți ceva mai cald față de brand, sau v-a plăcut așa cum v-ar plăcea un clip amuzant care nu are nicio legătură cu dumneavoastră?",
    ],
  },
  "ad-distinctiveness": {
    qualIntent:
      "Evaluăm dacă execuția creativă iese din convențiile categoriei și câștigă atenție autentică, în loc să se piardă în peisajul sectorului său.",
    qualQuestions: [
      "Vi s-a părut ca orice altă reclamă de [category], sau ceva de sine stătător? Ce a făcut diferența?",
      "În ce moment, dacă a existat unul, v-a captat — și a fost vreun moment în care atenția v-a alunecat în altă parte?",
      "Dacă dădeați scroll sau aveați telecomanda în mână, v-ar fi oprit asta? Ce anume v-ar opri?",
      "Imaginați-vă celelalte reclame din categoria asta — ce face aceasta și ele nu fac, sau invers?",
      "Peste o săptămână, care e singurul lucru de aici pe care ați mai putea să vi-l imaginați?",
    ],
  },
  "call-to-action": {
    qualIntent:
      "Identificăm pasul următor concret pe care reclama îl provoacă (sau nu reușește să-l provoace), ancorat în comportament real, nu într-un „da, s-ar putea” spus din politețe.",
    qualQuestions: [
      "Imediat după ce ați văzut asta — e ceva ce chiar v-ați duce să faceți? Descrieți-mi pas cu pas.",
      "V-a făcut suficient de curios/curioasă încât să căutați ceva, să dați click sau să aflați mai multe? Despre ce anume?",
      "E ceva ce ați menționa cuiva? Cui, și cum ați aduce vorba?",
      "A fost clar ce voiau ei să faceți mai departe? Vi s-a părut ușor și că merită, sau mai degrabă o bătaie de cap?",
      "Dacă nu ați face absolut nimic după reclama asta, care ar fi motivul — ce a lipsit?",
    ],
  },

  // ── UX Research ──────────────────────────────────────────────────────────
  "task-success": {
    qualIntent:
      "În calitativ nu numărați succesul, ci observați UNDE și DE CE se rupe modelul mental al utilizatorului; think-aloud + incident critic.",
    qualQuestions: [
      "Aș vrea să [task]. Pe măsură ce lucrați, vă rog să gândiți cu voce tare — spuneți-mi tot ce vă trece prin minte, inclusiv fundăturile.",
      "(at a pause) La ce vă așteptați să se întâmple dacă apăsați acolo?",
      "Ați ezitat puțin adineauri — de ce anume nu erați sigur(ă)?",
      "Dacă ați fi făcut asta singur(ă), acasă, și ați fi ajuns în punctul acela, ce ați fi făcut mai departe?",
      "Acum, că ați terminat, unde vi s-a părut că merge de la sine și unde ați simțit că e efort?",
    ],
  },
  "time-on-task": {
    qualIntent:
      "Cronometrul vă spune doar că a fost lent; în calitativ reconstruiți UNDE s-a împotmolit atenția și ce cântărea utilizatorul în timp ce timpul se scurgea.",
    qualQuestions: [
      "Puteți începe sarcina — și vă rog să-mi povestiți tot drumul ce gândiți, pas cu pas.",
      "(at a stall) Vă uitați de ceva vreme la partea asta a ecranului — ce cântăriți acum?",
      "Ce citeați sau ce căutați cu privirea chiar adineauri?",
      "A existat vreun moment în care ați simțit că trebuie să vă opriți și să vă lămuriți ceva înainte să puteți continua?",
      "Privind în urmă, care pas a durat cel mai mult și ce anume l-a făcut să dureze atât?",
      "Dacă ați face asta în fiecare zi, ce parte ați vrea să meargă mai repede?",
    ],
  },
  "error-rate": {
    qualIntent:
      "Numărul de erori nu spune nimic fără poveste; în calitativ scoateți la suprafață ce l-a lăsat interfața pe utilizator să creadă — ceea ce a produs greșeala — și cum s-a simțit revenirea.",
    qualQuestions: [
      "Continuați sarcina și gândiți cu voce tare pe parcurs.",
      "(right after a misstep, neutrally) Povestiți-mi ce s-a întâmplat adineauri, din punctul dumneavoastră de vedere.",
      "Ce vă așteptați să facă acțiunea aceea?",
      "Cum v-ați dat seama că lucrurile au mers altfel decât intenționați?",
      "Povestiți-mi cum ați revenit pe drumul cel bun — a fost evident ce aveați de făcut?",
      "A fost ceva pe ecran care simțiți că v-a îndrumat greșit?",
    ],
  },
  sus: {
    qualIntent:
      "Scorul 0–100 e doar însoțitorul unei conversații; în calitativ despachetați judecata viscerală din spatele lui „l-aș folosi cu plăcere” versus „a fost o corvoadă”, cu cuvintele utilizatorului.",
    qualQuestions: [
      "Înainte să vorbim de note — în una-două propoziții, cum a fost, per ansamblu, să folosiți acest produs?",
      "Dacă ar trebui să-i descrieți unui prieten cât de complicat sau de simplu vi s-a părut, ce i-ați spune?",
      "A fost ceva ce ați simțit că ar trebui să învățați sau să vi se arate înainte să vă simțiți în largul dumneavoastră pe cont propriu?",
      "Unde ați simțit că părțile funcționează bine împreună și unde vi s-au părut nepotrivite una cu cealaltă?",
      "Imaginați-vă că l-ați folosi în mod regulat — ce v-ar face să-l așteptați cu plăcere sau, dimpotrivă, cu groază?",
      "Ați ajuns la impresia asta de ansamblu — care unul sau două momente au cântărit cel mai mult?",
    ],
  },
  seq: {
    qualIntent:
      "SEQ vă dă o singură notă de ușurință per sarcină; completarea calitativă e să-l puneți pe utilizator să povestească exact ce a făcut sarcina să pară ușoară sau obositoare, cât e încă proaspătă.",
    qualQuestions: [
      "Gata, sarcina e încheiată. Cu cuvintele dumneavoastră, cât de ușor sau de greu vi s-a părut?",
      "Ce anume a făcut să pară așa?",
      "A existat un moment în care a trecut de la simplu la complicat, sau invers?",
      "Ce ați schimba, dacă ar fi ceva, ca să pară complet fără efort?",
      "Dacă un coleg ar urma să facă asta pentru prima dată, la ce l-ați avertiza să fie atent?",
    ],
  },
  "umux-lite": {
    qualIntent:
      "UMUX-Lite separă capacitatea percepută („face ce am nevoie”) de ușurință; în calitativ sondați fiecare latură separat — chiar face treaba pentru care au venit și chiar li se dă la o parte din drum.",
    qualQuestions: [
      "Gândindu-vă la ce ați venit de fapt să faceți aici — v-a permis să faceți asta? Povestiți-mi mai mult.",
      "A fost ceva de care aveați nevoie și pe care nu l-a putut face, sau pe care nu l-ați găsit?",
      "Lăsând funcțiile deoparte o clipă — cât efort v-a luat să-l faceți să facă ce voiați?",
      "Unde ați simțit că instrumentul muncește pentru dumneavoastră și unde ați simțit că munciți dumneavoastră pentru el?",
      "Dacă acesta ar fi instrumentul dumneavoastră pentru treaba asta, care e capacitatea lipsă sau frecușul pe care l-ați semnala primul?",
    ],
  },
  umux: {
    qualIntent:
      "UMUX adaugă frustrarea și timpul pierdut cu corecturi la perechea capacitate + ușurință; în calitativ urmăriți momentele trăite din spatele fiecărui item — ce n-a putut face, când a iritat și unde s-a dus timpul pe reparat în loc de făcut.",
    qualQuestions: [
      "Gândindu-vă la ce ați venit de fapt să rezolvați — a rezolvat? Unde a rămas sub ceea ce vă trebuia?",
      "Povestiți-mi cel mai frustrant moment pe care l-ați avut cu el în ultima vreme — ce s-a întâmplat și cât v-a costat?",
      "Cât din timpul petrecut în el simțiți că e muncă propriu-zisă și cât e reparat, refăcut sau dat înapoi? Dați-mi un exemplu recent.",
      "Povestiți-mi ultima dată când a făcut ceva la care nu vă așteptați — cât v-a luat să reveniți pe drumul cel bun?",
      "Lăsând neplăcerile deoparte — atunci când funcționează, cum e să-l folosiți? Fără efort, suportabil sau un chin?",
      "Dacă ați putea să-i dați echipei o singură iritare recurentă de rezolvat, care ar fi — și de la ce vă tot întrerupe?",
    ],
  },
  "first-click": {
    qualIntent:
      "Primul clic dezvăluie „mirosul” informațional; în calitativ nu doar consemnați unde au dat clic, ci scoateți la iveală raționamentul și indiciile — etichete, elemente vizuale — care i-au atras acolo, înainte să acționeze.",
    qualQuestions: [
      "Acesta e ecranul și asta încercați să faceți. Nu dați clic încă — spuneți-mi doar: unde ați merge prima dată și de ce tocmai acolo?",
      "Ce anume la locul acela vă face să credeți că e calea potrivită?",
      "Mai există un al doilea loc care vă tentează? Ce vă face să alegeți între ele?",
      "Bun, dați-i drumul. (after) V-a dus unde vă așteptați?",
      "Dacă n-ar fi mers, unde ați fi încercat în continuare?",
    ],
  },
  findability: {
    qualIntent:
      "Findability nu înseamnă doar „au găsit sau nu”, ci dacă arhitectura informației se potrivește cu modelul lor mental; în calitativ scoateți la suprafață unde se așteptau să se afle lucrurile și de ce structura se potrivește sau nu cu felul în care gândesc.",
    qualQuestions: [
      "Aș vrea să găsiți [item]. Gândiți cu voce tare, în timp ce căutați, unde v-ați aștepta să fie.",
      "Înainte să porniți undeva — dacă ar fi să ghiciți, în ce secțiune s-ar găsi ceva de genul acesta?",
      "(as they browse) Ce v-a făcut să alegeți zona aceea pentru căutare?",
      "Acum sunteți în altă parte — ce v-a spus că nu e aici și v-a tras în altă direcție?",
      "Dacă ați organiza dumneavoastră totul, unde l-ați fi pus?",
      "Acum, că l-ați găsit, era acolo unde v-ați fi așteptat sau într-un loc surprinzător?",
    ],
  },
  learnability: {
    qualIntent:
      "Learnability e distanța dintre prima întâlnire și fluență; în calitativ observați ce trebuie să descifreze activ prima dată și dacă la a doua trecere simt că „s-a legat”.",
    qualQuestions: [
      "E prima dată când lucrați cu acesta — povestiți-mi cum l-ați aborda, inclusiv tot ce vă e neclar.",
      "Ce trebuie să descifrați singur(ă) chiar acum și ce vi se pare pur și simplu evident?",
      "(after first pass) Ce ați învățat făcând asta prima dată, ce nu știați la început?",
      "Hai să facem încă una asemănătoare — povestiți-o pe măsură ce lucrați și spuneți-mi dacă ceva pare diferit a doua oară.",
      "A existat un moment în care brusc a căpătat sens? Ce anume s-a legat?",
      "Dacă ați reveni la asta peste o săptămână, ce credeți că ar trebui să reînvățați?",
    ],
  },
  "nasa-tlx": {
    qualIntent:
      "TLX descompune efortul în solicitare mentală/temporală, frustrare și așa mai departe; completarea calitativă e ca utilizatorul să povestească de unde a venit de fapt încărcarea, în loc să noteze dimensiuni în abstract.",
    qualQuestions: [
      "Gândindu-vă înapoi la sarcina aceea — unde a trebuit să vă concentrați cel mai tare, și pe ce anume?",
      "Au fost multe de ținut în minte deodată? Ce încercați să urmăriți?",
      "V-ați simțit pe undeva grăbit(ă) sau sub presiunea timpului — și de unde venea asta?",
      "Povestiți-mi cel mai frustrant moment, dacă a existat unul. Ce s-a întâmplat?",
      "Cât de mult ați simțit că trebuie să munciți ca să obțineți rezultatul dorit?",
      "La final, vă simțeați stăpân(ă) pe situație sau puțin epuizat(ă) — și care parte a cântărit cel mai mult?",
    ],
  },
  desirability: {
    qualIntent:
      "Metoda cardurilor de reacție ajunge la răspunsul emoțional și estetic; în calitativ cardurile sunt doar o trambulină — valoarea stă în întregime în motivul pentru care au ales fiecare cuvânt și în momentul de care se leagă.",
    qualQuestions: [
      "Aici aveți un set de cuvinte. Alegeți-le pe cele câteva care descriu cel mai bine cum a fost de folosit — nu vă grăbiți.",
      "Să luăm primul cuvânt pe care l-ați ales — ce v-a făcut să întindeți mâna după el?",
      "Există un moment anume sau o parte a ecranului de care se leagă de fapt cuvântul acela?",
      "Ați luat în calcul vreun cuvânt și apoi l-ați respins? Care, și de ce nu se potrivea?",
      "Dacă ar trebui să alegeți un cuvânt care e exact opusul experienței dumneavoastră, care ar fi?",
      "Per ansamblu, cum ați descrie personalitatea acestui produs cuiva care nu l-a văzut niciodată?",
    ],
  },
  "feature-adoption": {
    qualIntent:
      "Analiticele de adopție vă spun doar că o funcție a fost sau nu folosită; în calitativ reconstruiți povestea trăită: cum (sau dacă) au descoperit-o, ce i-a făcut s-o încerce și ce a făcut-o să prindă sau nu.",
    qualQuestions: [
      "Povestiți-mi ultima dată când ați folosit [feature] — ce făceați atunci și ce v-a adus la ea?",
      "Cum ați dat prima oară de ea? Ați căutat-o anume sau ați nimerit peste ea?",
      "Ce v-a făcut să decideți că merită încercată prima dată?",
      "A devenit parte din felul în care lucrați de obicei, sau a rămas o încercare singulară? Ce a făcut diferența?",
      "A existat vreun moment în care vă așteptați la ceva de genul ei și nu ați găsit?",
      "Dacă ar dispărea mâine, ați observa? Ce ați face în loc?",
    ],
  },
  engagement: {
    qualIntent:
      "Rapoartele de stickiness ascund motivul uman al revenirii; în calitativ explorați ce îi trage de fapt înapoi și cum au arătat sesiuni reale, recente — profunzime, nu frecvențe numărate.",
    qualQuestions: [
      "Duceți-mă înapoi la ultima dată când l-ați deschis — ce v-a împins să o faceți și ce ați făcut de fapt?",
      "Într-o săptămână obișnuită, când ajunge să apară în viața dumneavoastră? Ce se întâmplă în jurul dumneavoastră atunci?",
      "Când îl deschideți, aveți tendința să intrați și să ieșiți repede sau vă instalați pe îndelete? Povestiți-mi un exemplu recent.",
      "Ce anume, dacă ar dispărea, v-ar face să nu mai apelați la el?",
      "Au fost momente în care v-ați gândit să-l folosiți, dar n-ați făcut-o? Ce ați făcut în loc?",
      "Ce vă tot aduce înapoi, spus cu cuvintele dumneavoastră?",
    ],
  },
  "retention-churn": {
    qualIntent:
      "Datele de churn sunt un cadavru; în calitativ îi faceți autopsia — reconstruiți momentul în care utilizarea s-a stins, ce s-a schimbat în viața lor sau în produs și ce anume (dacă exista ceva) i-ar fi adus înapoi.",
    qualQuestions: [
      "Întoarceți-vă cu gândul la perioada în care îl foloseați cel mai mult — ce făcea pentru dumneavoastră atunci?",
      "S-a schimbat de atunci felul în care îl folosiți? Povestiți-mi cum s-a rărit sau s-a mutat în altă parte.",
      "Puteți localiza, măcar aproximativ, când ați început să apelați mai rar la el? Ce se mai întâmpla în viața dumneavoastră în perioada aceea?",
      "A existat un moment anume sau o dezamăgire care v-a împins la o parte, sau a fost mai degrabă o îndepărtare treptată?",
      "Ce ar fi trebuit să se întâmple ca să continuați să-l folosiți?",
      "Dacă v-ați întoarce, care e primul lucru pe care ați vrea să-l facă pentru dumneavoastră?",
    ],
  },
  "heart-framework": {
    qualIntent:
      "HEART e o lentilă de măsurare, nu un interviu; în calitativ mapați fiecare dimensiune — Happiness, Engagement, Adoption, Retention, Task success — pe momente concrete, trăite, nu pe scoruri.",
    qualQuestions: [
      "(Happiness) Când vă gândiți la folosirea acestui produs, ce sentiment vă vine în minte — și de ce moment e legat?",
      "(Engagement) Povestiți-mi o sesiune recentă în care ați fost cu adevărat prins(ă) — ce făceați?",
      "(Adoption) Gândiți-vă la cel mai nou lucru pe care ați început să-l folosiți aici — cum s-a întâmplat asta?",
      "(Retention) Ce l-a ținut în rutina dumneavoastră atunci când alte instrumente au ieșit din ea?",
      "(Task success) Gândiți-vă la ultimul lucru pentru care ați venit aici special ca să-l rezolvați — l-ați rezolvat, și cum a mers?",
      "Punând totul cap la cap, unde se ridică cel mai mult la înălțimea a ceea ce vă doriți de la el și unde vă dezamăgește cel mai tare?",
    ],
  },
  accessibility: {
    qualIntent:
      "Un audit vă spune unde încalcă produsul regulile; în calitativ scoateți la suprafață unde îl frânge pe om — ocolișurile, sarcinile abandonate și excluderile tăcute pe care utilizatorii de tehnologii asistive au încetat până și să le mai pomenească.",
    qualQuestions: [
      "Înainte să ne uităm la ceva anume — povestiți-mi cum vă pregătiți de obicei o aplicație sau un site nou ca să funcționeze pentru dumneavoastră. Ce ajustați sau activați înainte să-l puteți folosi confortabil?",
      "Povestiți-mi ultima dată când ați folosit [product] cu configurația dumneavoastră obișnuită — unde ați încetinit, v-ați blocat sau a trebuit să improvizați?",
      "Povestiți-mi un moment de aici în care v-ați împotmolit de-a binelea — ce se întâmpla și ce ați făcut mai departe?",
      "Ce ocolișuri v-ați construit în timp ca să vă faceți treaba în [product]? Care au devenit atât de rutină încât abia le mai observați?",
      "A fost ceva la care pur și simplu ați renunțat sau pe care l-ați dat altcuiva să-l facă în locul dumneavoastră? Povestiți-mi cum a fost.",
      "Față de alte produse pe care le folosiți, unde vi se pare acesta cel mai construit pentru dumneavoastră — și unde simțiți că n-ați fost în cameră când l-au proiectat?",
      "Dacă echipa ar putea repara mâine un singur lucru care să schimbe cât de independent puteți folosi acest produs, care ar fi acela?",
    ],
  },
  "digital-literacy": {
    qualIntent:
      "Încrederea tehnologică autoevaluată flatează; în calitativ scoateți la suprafață adevăratul repertoriu de descurcare — ce fac când tehnologia o ia razna, ce evită în tăcere sau pasează altora și cum judecă pe ce e sigur să dea clic.",
    qualQuestions: [
      "Povestiți-mi despre dispozitivele și aplicațiile care fac parte din ziua dumneavoastră obișnuită — ce faceți de fapt pe fiecare?",
      "Povestiți-mi ultima dată când a trebuit să faceți ceva nou online — să vă instalați o aplicație, să completați un formular oficial, să plătiți undeva necunoscut. Cum a mers?",
      "Când ceva merge prost — un mesaj de eroare, un ecran înghețat, o autentificare care nu funcționează — ce faceți mai întâi?",
      "Există ceva ce evitați să faceți online — plăți, acte oficiale, operațiuni bancare — deși, la drept vorbind, ați putea? Ce se află în spatele acestei alegeri?",
      "La cine apelați când vă învinge tehnologia și care a fost ultimul lucru cu care ați rugat persoana respectivă să vă ajute?",
      "Cum decideți dacă un site, o aplicație sau un mesaj e de încredere? Povestiți-mi despre unul recent în care nu ați avut încredere.",
      "Gândiți-vă la ceva digital pe care acum îl faceți cu ușurință, dar care odinioară vi se părea greu — ce v-a ajutat să treceți hopul?",
    ],
  },

  // ── Banking & Payments ───────────────────────────────────────────────────
  "main-bank-share": {
    qualIntent:
      "Descoperă ce ancorează psihologic o bancă drept 'principală' — unde trăiesc de fapt salariul, identitatea și încrederea implicită, nu doar unde stau soldurile.",
    qualQuestions: [
      "Când vă gândiți la 'banca mea', care vă vine prima în minte — și ce o face să fie tocmai aceea?",
      "Povestiți-mi ce trece de fapt prin banca aceea — salariu, facturi, economii — cum a ajuns să le ducă pe toate?",
      "Există lucruri pe care le-ați face doar cu banca aceea și cu nicio alta? Care ar fi acelea?",
      "Dacă banca aceea ar dispărea peste noapte, ce v-ar lipsi cel mai mult — și ce nu v-ar lipsi deloc?",
      "Ce știe banca aceea despre viața dumneavoastră financiară și nu știe nicio alta?",
    ],
  },
  "bank-switching-intent": {
    qualIntent:
      "Detectează dacă există un impuls real de plecare sau dacă intenția declarată e doar o descărcare de frustrare, fără o atracție reală în spate.",
    qualQuestions: [
      "Cât de așezat vă simțiți acum cu banca dumneavoastră principală — ca și cum ar fi ceva permanent, sau mai degrabă stați cu ochii deschiși?",
      "S-a întâmplat ceva în ultima vreme care v-a făcut să vă opriți și să vă întrebați dacă nu există ceva mai bun?",
      "Dacă vă imaginați peste un an, sunteți tot la aceeași bancă? Ce vă face să spuneți asta?",
      "Când auziți pe cineva lăudându-și banca în gura mare, vă tentează măcar puțin, sau trece pe lângă dumneavoastră?",
      "Care a fost momentul în care ați fost cel mai aproape să căutați efectiv în altă parte?",
    ],
  },
  "switching-triggers-barriers": {
    qualIntent:
      "Inerția e uriașă; vrei evenimentul declanșator real și 'costul plecării' perceput, nu raționalizări.",
    qualQuestions: [
      "Spuneți-mi povestea: cum ați ajuns la banca dumneavoastră principală — a fost o alegere conștientă sau pur și simplu s-a întâmplat?",
      "A existat vreodată un moment în care v-ați gândit serios să plecați? Ce l-a declanșat?",
      "Ce v-a oprit — sau ce v-ar opri — să faceți efectiv pasul?",
      "Imaginați-vă că un prieten vă spune că mâine își schimbă banca. Care e prima reacție — și de ce l-ați avertiza?",
      "Ce ar trebui să facă o bancă pentru ca plecarea să merite tot deranjul?",
    ],
  },
  "cross-sell-intent": {
    qualIntent:
      "Scoate la suprafață regula nespusă după care oamenii decid dacă următorul produs 'ține' de banca principală sau se caută în altă parte.",
    qualQuestions: [
      "Gândiți-vă la ultimul produs financiar pe care l-ați luat — cum ați decis de unde să-l luați?",
      "Când aveți nevoie de ceva nou — un card, un credit, economii — vă vine automat în minte banca principală, sau începeți să căutați în jur?",
      "Ce fel de lucruri vi se pare firesc să le luați de la banca principală, și ce preferați să țineți separat?",
      "V-a oferit banca vreodată ceva în plus? Povestiți-mi cum a picat — binevenit, enervant, nici una, nici alta?",
      "Ce v-ar face să spuneți da băncii dumneavoastră pentru ceva, în loc să mergeți la un specialist?",
    ],
  },
  "consolidation-intent": {
    qualIntent:
      "Relevă dacă 'totul într-un singur loc' e resimțit ca și confort și control, sau ca o expunere riscantă la o singură instituție.",
    qualQuestions: [
      "Cum sunt împărțiți banii dumneavoastră acum, între bănci și aplicații — și cum au ajuns să arate așa?",
      "Unii preferă totul sub un singur acoperiș, alții țin lucrurile separate în mod deliberat. Dumneavoastră unde vă situați, și de ce?",
      "Ce ar fi bun în a aduce totul la o singură bancă — și ce vă face să ezitați?",
      "Când vă gândiți că ați avea toți banii la o singură bancă, ce sentiment vă apare?",
      "Dacă ați lua-o de la zero azi, ați ține totul simplu sau ați împărți?",
    ],
  },
  "product-purchase-pipeline": {
    qualIntent:
      "Leagă produsele de evenimentele de viață și grijile care le declanșează cu adevărat, în loc să colecteze o listă de dorințe abstractă.",
    qualQuestions: [
      "Privind la anul care urmează, vedeți venind ceva legat de bani pe care va trebui să-l rezolvați?",
      "Ce se întâmplă acum în viața dumneavoastră care v-ar putea împinge spre un produs financiar nou?",
      "Când apare ceva de genul acesta, cum vă dați seama de obicei de ce aveți nevoie și de unde să luați?",
      "Există un produs la care tot vă gândiți 'ar trebui să mă interesez de asta', dar încă n-ați făcut-o? Ce îl ține pe loc?",
      "Ce ar trebui să se întâmple ca produsul acela de 'cândva' să devină o decizie de 'acum'?",
    ],
  },
  "onboarding-completion": {
    qualIntent:
      "Localizează momentele de fricțiune și de încredere în care oamenii se blochează sau abandonează, și ce anume îi poartă emoțional până la capăt.",
    qualQuestions: [
      "Povestiți-mi despre ultima dată când ați deschis un cont, oriunde — luați-mă cu dumneavoastră de la primul click sau primul pas.",
      "A fost vreun punct în care a devenit enervant, confuz, sau v-a venit să renunțați? Ce s-a întâmplat acolo?",
      "Vi s-a întâmplat vreodată să începeți să deschideți ceva și să nu terminați? Ce v-a făcut să abandonați?",
      "Când v-au cerut acte sau buletinul, cum vi s-a părut — ceva de rutină, sau o bătaie de cap?",
      "Care e diferența dintre o deschidere de cont care merge ca unsă și una care pare o luptă?",
    ],
  },
  "digital-banking-adoption": {
    qualIntent:
      "Înțelege ce parte din banking a migrat complet pe telefon și ce operațiuni țin oamenii, deliberat, în afara aplicației — și de ce.",
    qualQuestions: [
      "Povestiți-mi despre ultima dată când ați deschis aplicația băncii — ce făceați și ce v-a determinat să o deschideți?",
      "Ce lucruri faceți în aplicație fără să stați deloc pe gânduri?",
      "Există ceva ce pur și simplu nu ați face în aplicație — ceva pentru care ați prefera să sunați sau să mergeți la sucursală? Ce anume, și de ce?",
      "Când trebuie să faceți în aplicație ceva ce n-ați mai făcut niciodată, cum vă simțiți?",
      "Care e momentul din zi sau din săptămână în care aplicația vă e cea mai utilă?",
    ],
  },
  "banking-channel-mix": {
    qualIntent:
      "Surprinde logica nescrisă care trimite o anumită sarcină spre aplicație vs. web vs. sucursală vs. telefon, mai ales când e vorba de liniștire, nu de comoditate.",
    qualQuestions: [
      "Pentru diferite treburi cu banii, unde mergeți în mod natural — telefon, calculator, sucursală, apel telefonic? Dați-mi câteva exemple.",
      "Când ați intrat ultima dată într-o sucursală sau ați sunat la bancă? Ce a făcut ca acela să fie canalul potrivit atunci?",
      "Există ceva ce ați rezolva doar cu un om în carne și oase? Ce anume are lucrul acela special?",
      "Când ceva merge prost sau miza e mare, cum se schimbă locul unde apelați?",
      "Dacă sucursalele ar dispărea mâine, ce v-ar lipsi cu adevărat?",
    ],
  },
  "payment-method-usage": {
    qualIntent:
      "Descoperă reflexele situaționale și emoțiile (control, viteză, intimitate, obișnuință) din spatele alegerii între cash, card, wallet și transferuri între persoane.",
    qualQuestions: [
      "Gândiți-vă la tot ce ați plătit ieri — cu ce ați plătit fiecare lucru, și de ce tocmai așa?",
      "Există o situație în care întindeți mereu mâna după cash? Ce înseamnă asta pentru dumneavoastră?",
      "Cum a ajuns plata cu telefonul sau cu ceasul parte din viața dumneavoastră — sau nu a ajuns?",
      "Când împărțiți o notă de plată sau dați înapoi bani unui prieten, cum se întâmplă de obicei acum?",
      "Există un mod de a plăti pe care îl evitați sau în care nu aveți încredere? Povestiți-mi despre asta.",
    ],
  },
  "fintech-usage": {
    qualIntent:
      "Identifică 'treaba' concretă pentru care oamenii angajează un neobank și plafonul de încredere care îl împiedică să devină banca lor principală.",
    qualQuestions: [
      "Folosiți vreo bancă mai nouă, doar din aplicație, sau vreo aplicație de bani? Cum ați dat de ele?",
      "Pentru ce le folosiți de fapt — și e diferit de rolul băncii dumneavoastre principale?",
      "Unii oameni adoră aplicațiile astea, dar nu și-ar pune niciodată salariul într-una. De ce credeți că e așa?",
      "Ce ar trebui să demonstreze o astfel de aplicație înainte să îi încredințați totul?",
      "Dacă un coleg v-ar spune că a renunțat la banca lui veche pentru una doar din aplicație, ce ați crede?",
    ],
  },
  "bnpl-usage": {
    qualIntent:
      "Explorează cum e catalogat mental 'plătește mai târziu' — ca instrument inteligent de bugetare, comoditate inofensivă sau datorie tăcută — folosind distanța proiectivă pentru stigmat.",
    qualQuestions: [
      "Când cumpărați ceva și la finalizarea comenzii apare 'plata în rate', ce vă trece prin minte?",
      "Ați folosit vreodată o astfel de opțiune de plată împărțită? Povestiți-mi despre acea dată.",
      "Mulți oameni folosesc 'cumpără acum, plătește mai târziu', dar nu i-ar spune împrumut. De ce credeți că o văd așa?",
      "Prin ce vi se pare diferită plata în rate față de a pune totul pe cardul de credit?",
      "Când credeți că opțiunile astea chiar ajută, și când vă cam îngrijorează?",
    ],
  },
  "trust-in-banks": {
    qualIntent:
      "Ajunge la convingerea de fond: sunt băncile, în esență, de partea ta sau nu — folosind cadrarea la persoana a treia pentru a ocoli răspunsurile precaute.",
    qualQuestions: [
      "Când oamenii spun 'nu poți avea cu adevărat încredere în bănci', ce credeți că vor să spună?",
      "S-a întâmplat vreodată ceva — dumneavoastră sau cuiva cunoscut — care v-a schimbat felul în care priviți băncile în general?",
      "Credeți că banca dumneavoastră acționează în interesul dumneavoastră, în al ei, sau undeva la mijloc? Ce vă face să spuneți asta?",
      "Dacă o rudă mai tânără v-ar întreba dacă te poți baza pe bănci, ce i-ați spune sincer?",
      "Imaginați-vă doi oameni: unul ține banii cash acasă, celălalt are încredere totală în sistem. Dumneavoastră unde sunteți între ei, și de ce?",
    ],
  },
  "fee-transparency": {
    qualIntent:
      "Distinge furia față de simpla existență a comisioanelor de furia de a fi luat prin surprindere sau de a te simți păcălit — corectitudinea ține de felul în care afli, nu de sumă.",
    qualQuestions: [
      "Povestiți-mi despre o dată când banca v-a perceput un comision la care nu vă așteptați. Ce s-a întâmplat?",
      "Când vă uitați la ce vă percepe banca, cât de clar e, de fapt, pentru ce plătiți?",
      "Care comisioane vi se par corecte, și care vi se par că profită de dumneavoastră?",
      "Lumea spune adesea că băncile 'ascund' costurile. Se potrivește cu experiența dumneavoastră, sau nu?",
      "Ce v-ar face să simțiți că o bancă e cu adevărat deschisă cu dumneavoastră în privința banilor?",
    ],
  },
  "perceived-security": {
    qualIntent:
      "Scoate la suprafață sentimentul de siguranță (sau de teamă) legat de bani și de date, și pe cine cred oamenii că apasă vina dacă ceva merge prost — cu acoperire proiectivă pentru frică.",
    qualQuestions: [
      "Cât de în siguranță simțiți că sunt banii și datele dumneavoastră la bancă? De unde vine sentimentul acesta?",
      "Povestiți-mi despre un moment în care ceva nu vi s-a părut în regulă — un SMS ciudat, o plată pe care n-o recunoșteați, o sperietură.",
      "Mulți oameni se tem în ziua de azi să nu fie înșelați. De ce credeți că le e cel mai frică?",
      "Dacă unei persoane i-ar dispărea bani din cont printr-o fraudă, cine credeți că ar trebui să fie responsabil să repare situația?",
      "Ce face banca dumneavoastră ca să vă simțiți protejat — și unde vă simțiți lăsat pe cont propriu?",
    ],
  },

  // ── Financial Needs & Wellbeing ──────────────────────────────────────────
  "financial-wellbeing": {
    qualIntent:
      "Scoate la suprafață experiența trăită a siguranței și a libertății de alegere (în prezent și în viitor), nu scorul pe scala CFPB — cum se simte de fapt să ai 'controlul' și să te poți 'bucura de viață'.",
    qualQuestions: [
      "Când vă imaginați situația dumneavoastră financiară peste un an-doi, o simțiți mai degrabă deschisă sau mai degrabă închisă — și de ce?",
      "Mulți oameni spun că e o diferență între a te descurca de la o lună la alta și a te simți cu adevărat liber cu banii. Dumneavoastră unde v-ați plasa, fără să vorbim de sume?",
      "Povestiți-mi despre un moment recent în care banii v-au permis să faceți ceva ce vă doreați cu adevărat.",
      "Când apare ceva neprevăzut care vă afectează finanțele, cât de tare vă dă peste cap?",
      "Cum ar arăta 'suficient' pentru dumneavoastră — nu o sumă, ci o stare?",
    ],
  },
  "financial-literacy": {
    qualIntent:
      "Evaluează cu delicatețe încrederea și modelele mentale legate de conceptele financiare, fără a testa vreodată respondentul — cum dă sens informațiilor financiare și unde i se pare totul în ceață.",
    qualQuestions: [
      "Când dați peste informații financiare — un extras de cont, o dobândă, o știre — cum le înțelegeți de obicei?",
      "Multor oameni li se par unele subiecte despre bani clare, iar altele de-a dreptul tulburi. Pentru dumneavoastră, care intră în fiecare categorie?",
      "Povestiți-mi despre o situație în care un produs financiar sau o decizie a ieșit altfel decât vă așteptați. Ce s-a întâmplat?",
      "Dacă un prieten v-ar ruga să-i explicați cum funcționează, de exemplu, dobânda sau investițiile, unde v-ați simți pe teren sigur și unde ați pasa mai departe?",
      "Unde apelați atunci când ceva legat de bani nu prea are sens pentru dumneavoastră?",
    ],
  },
  "savings-emergency-fund": {
    qualIntent:
      "Înțelege obiceiul și relația emoțională cu economisirea, precum și reziliența percepută în cazul în care venitul s-ar opri — nu soldul sau numărul de luni acoperite.",
    qualQuestions: [
      "Povestiți-mi ce se întâmplă cu banii care rămân la sfârșitul lunii — unde ajung de obicei?",
      "Fără să vorbim de sume, cum vă simțiți când vă gândiți la economiile dumneavoastră — pe o pernă moale, la limită, undeva la mijloc?",
      "Dacă venitul dumneavoastră s-ar opri brusc, cât timp vă imaginați că v-ați descurca — și cum arată imaginea asta în mintea dumneavoastră?",
      "Povestiți-mi despre ultima dată când ați umblat la economii. Cum a fost să faceți asta?",
      "Unii oameni economisesc aproape automat, alții trebuie să se lupte pentru fiecare leu pus deoparte. Care variantă vă seamănă mai mult, și de ce credeți că e așa?",
    ],
  },
  "budgeting-style": {
    qualIntent:
      "Dezvăluie personalitatea lor financiară și sistemul (sau absența unuia) pe care îl folosesc pentru a planifica, urmări și controla banii — și cum se simte acest stil în viața de zi cu zi.",
    qualQuestions: [
      "Cum țineți evidența banilor — pe ce se duc — sau nu o țineți deloc?",
      "Dacă felul dumneavoastră de a vă gestiona banii ar fi o personalitate, cum ați descrie-o?",
      "Povestiți-mi despre ultima dată când v-ați așezat să vă puneți finanțele în ordine. Ce v-a determinat și cum a decurs?",
      "Mulți oameni au o metodă care funcționează și o zonă care le scapă mereu printre degete. La dumneavoastră cum e?",
      "Când simțiți că gestionarea banilor funcționează în favoarea dumneavoastră, și când o simțiți ca pe o corvoadă?",
    ],
  },
  "financial-goals": {
    qualIntent:
      "Scoate la iveală spre ce lucrează de fapt și ce evenimente de viață le remodelează nevoile financiare — precum și semnificația din spatele acestor obiective.",
    qualQuestions: [
      "Există ceva pentru care economisiți sau faceți planuri acum, mare sau mic?",
      "Când vă imaginați viața peste câțiva ani, ce se schimbă în ea și în ce fel vor avea banii un rol?",
      "Povestiți-mi despre un eveniment recent din viață — al dumneavoastră sau al cuiva apropiat — care v-a schimbat felul în care vă gândiți la bani.",
      "Dintre lucrurile spre care lucrați, care ar însemna cel mai mult să-l atingeți, și ce v-ar aduce asta?",
      "Există vreun obiectiv pe care l-ați pus în liniște pe un raft? Ce a stat în cale?",
    ],
  },
  "attitude-to-credit": {
    qualIntent:
      "Explorează dacă percep creditul ca pe un instrument util sau ca pe o capcană, precum și convingerile și regulile care dictează când împrumutul li se pare în regulă.",
    qualQuestions: [
      "Când auziți cuvântul 'credit', care e prima imagine sau primul sentiment care vă vine în minte?",
      "Unii oameni văd împrumutul ca pe un instrument inteligent, alții ca pe o pantă alunecoasă. Dumneavoastră spre care parte înclinați?",
      "Povestiți-mi despre o situație în care v-ați împrumutat pentru ceva și ați simțit că a fost decizia potrivită.",
      "Care sunt regulile dumneavoastră personale — spuse sau nespuse — despre când e în regulă să vă împrumutați?",
      "Fără să vorbim de sume, cum vă împăcați cu ideea de a avea o datorie neachitată?",
    ],
  },
  "debt-burden": {
    qualIntent:
      "Scoate la suprafață greutatea resimțită și stresul legat de rate, fără a expune sume sau a induce rușine — folosind pe tot parcursul tehnici proiective și un cadru care normalizează.",
    qualQuestions: [
      "Mulți oameni au un fel de rată sau datorie care merge pe fundal în viața lor. Fără niciun fel de cifre, cât de prezent e acest zumzet de fundal pentru dumneavoastră?",
      "Dacă greutatea asta ar avea o mărime sau o culoare, care ar fi ea în perioada asta?",
      "Gândiți-vă la cineva aflat într-o situație ca a dumneavoastră — ce vă imaginați că e cel mai greu pentru acea persoană, de la o lună la alta?",
      "Povestiți-mi despre un moment recent în care ratele v-au apărut în gânduri. Ce se întâmpla atunci?",
      "Când vă imaginați că ați scăpat de tot ce aveți de plătit, care e primul lucru care se schimbă pentru dumneavoastră?",
      "Ce ar face ca greutatea asta să pară mai ușor de dus, măcar puțin?",
    ],
  },
  "risk-tolerance": {
    qualIntent:
      "Înțelege reacția lor emoțională autentică la risc și la pierdere și valorile din spatele ei, nu încadrarea într-o categorie de profil de risc.",
    qualQuestions: [
      "Când scade valoarea unui lucru în care ați pus bani, ce simțiți în momentul acela?",
      "Unii oameni pot sta liniștiți cu suișurile și coborâșurile; alții își pierd somnul. Care variantă vă descrie mai bine?",
      "Povestiți-mi despre un risc pe care vi l-ați asumat cu banii — o investiție, un pariu pe ceva, un început de drum. Cum v-ați simțit pe parcurs?",
      "Imaginați-vă două drumuri: unul stabil și modest, altul cu hopuri, dar posibil mai generos. Care vă atrage, și ce se ascunde în spatele acestei atracții?",
      "Ce ar trebui să pună în pericol un deznodământ prost ca să vă îngrijoreze cu adevărat?",
    ],
  },
  "retirement-preparedness": {
    qualIntent:
      "Explorează cât de pregătiți și de încrezători se simt în privința finanțării vieții de mai târziu, precum și distanța sau apropierea emoțională față de acel eu viitor.",
    qualQuestions: [
      "Când apare cuvântul 'pensie', cât de aproape sau de departe o simțiți?",
      "Mulți oameni au mai degrabă o imagine încețoșată decât una clară despre viața de la bătrânețe. Cum arată a dumneavoastră în momentul de față?",
      "Fără să vorbim de sume, cât de încrezător vă simțiți că lucrurile sunt puse la punct pentru atunci?",
      "Povestiți-mi despre un moment în care v-ați gândit la pensie sau la banii pentru bătrânețe. Ce a declanșat gândul?",
      "Dacă ați putea să vă trimiteți un singur mesaj legat de pensie, ce ar spune?",
      "Ce vă reține, dacă e ceva, să vă gândiți mai mult la asta?",
    ],
  },
  "protection-gap": {
    qualIntent:
      "Scoate la suprafață senzația lor de a fi protejați versus expuși în fața șocurilor legate de viață, sănătate și venit — nu o listă de verificare a acoperirilor.",
    qualQuestions: [
      "Când vă gândiți la neprevăzut — o boală, pierderea venitului, ceva și mai rău — cât de acoperit sau de expus vă simțiți?",
      "Unii oameni se simt bine înfofoliți în fața loviturilor vieții, alții destul de descoperiți în bătaia vântului. Dumneavoastră unde vă aflați?",
      "Povestiți-mi despre o situație în care dumneavoastră, sau cineva apropiat, ați trecut prin ceva care a pus la încercare cât de protejați erați.",
      "Există riscuri de care ați ales să nu vă mai faceți griji? Ce stă în spatele acestei alegeri?",
      "Fără detalii concrete, ce ați vrea cel mai mult să rămână în picioare dacă viața v-ar lovi cu ceva mare?",
    ],
  },
  "financial-anxiety": {
    qualIntent:
      "Subiect sensibil; folosește un limbaj lipsit de judecată, normalizare și proiecție pentru a reduce dezirabilitatea socială.",
    qualQuestions: [
      "Când vă gândiți la situația dumneavoastră financiară de acum, care e sentimentul care apare primul?",
      "Mulți oameni au o grijă legată de bani care îi trezește la 3 dimineața — fără să vorbim de sume, ce formă are a dumneavoastră?",
      "Povestiți-mi despre ultima decizie legată de bani care v-a lăsat un sentiment bun. Ce anume a făcut-o să fie așa?",
      "Când aveți de luat o decizie financiară, la cine sau la ce apelați — și cât de încrezător vă simțiți după aceea?",
      "Dacă finanțele dumneavoastră ar putea vorbi, ce v-ar spune în perioada asta?",
    ],
  },
  "advice-seeking": {
    qualIntent:
      "Cartografiază unde apelează de fapt înaintea deciziilor legate de bani și în cine au încredere, scoțând la iveală relațiile și persoanele-cheie din spatele alegerilor lor.",
    qualQuestions: [
      "Înainte de o decizie legată de bani, indiferent de mărime, cu cine sau cu ce vă consultați de obicei mai întâi?",
      "Povestiți-mi despre ultima dată când ați cerut cuiva o părere despre bani. Cum a decurs?",
      "În părerea cui despre bani aveți cu adevărat încredere — și cu ce a câștigat acea persoană încrederea dumneavoastră?",
      "Unii oameni ar apela la un specialist, alții niciodată. Dumneavoastră de care parte sunteți, și de ce?",
      "Atunci când nu întrebați pe nimeni, ce se află de obicei în spatele acestei alegeri?",
    ],
  },

  // ── Added in final audit ─────────────────────────────────────────────────
  "kano-model": {
    qualIntent:
      "Identifică, pentru fiecare funcționalitate candidată, dacă este o cerință de bază așteptată, un factor de tip „cu cât mai mult, cu atât mai bine” sau un adevărat element de încântare — explorând cum reacționează oamenii la prezența și la absența ei.",
    qualQuestions: [
      "Imaginați-vă că [feature] există și funcționează perfect. Cum v-ați simți în raport cu produsul?",
      "Acum imaginați-vă că lipsește complet. Cum v-ați simți atunci?",
      "E ceva ce pur și simplu vă așteptați să existe, sau ceva care v-ar surprinde și v-ar încânta cu adevărat?",
      "Povestiți-mi despre un produs care avea un mic plus la care nu vă așteptați — ce era și cum v-a schimbat felul în care v-ați simțit?",
      "Care dintre aceste funcționalități nici nu v-ar atrage atenția, fie că există, fie că nu? Fiți sincer(ă).",
    ],
  },
  maxdiff: {
    qualIntent:
      "Scoate la iveală ierarhia reală dintre elemente și raționamentul din spatele celor de la vârf și de la coadă — acel „de ce” pe care o alegere forțată de tip best-worst nu îl poate oferi singură.",
    qualQuestions: [
      "Dintre toate acestea, care contează cel mai mult pentru dumneavoastră — și ce anume o ridică deasupra celorlalte?",
      "Și care contează cel mai puțin? De ce nu vă spune nimic aceea?",
      "Când două dintre ele intră în competiție directă, cum departajați?",
      "Există aici vreuna despre care toată lumea spune că e importantă, dar care, sincer, pentru dumneavoastră nu contează?",
      "Dacă ați putea păstra doar primele trei, pentru care v-ați bate?",
    ],
  },
  turf: {
    qualIntent:
      "Înțelege de ce oamenii aleg din interiorul unei game, unde contează cu adevărat varietatea și care opțiuni sunt redundante față de cele care ajung la o altă persoană.",
    qualQuestions: [
      "Uitându-vă la această gamă, pe care le-ați cumpăra sau folosi cu adevărat — și de care nu v-ați atinge niciodată?",
      "Dacă preferata dumneavoastră n-ar fi disponibilă, spre care v-ați îndrepta în schimb?",
      "Contează pentru dumneavoastră să existe mai multă varietate aici, sau două-trei opțiuni ar fi de ajuns?",
      "Care dintre acestea vi se pare că e „pentru altcineva”, nu pentru dumneavoastră?",
      "Povestiți-mi despre o situație în care dintr-o gamă lipsea exact opțiunea pe care o voiați — ce s-a întâmplat?",
    ],
  },
  "distinctive-brand-assets": {
    qualIntent:
      "Identifică ce semnale de brand codifică oamenii cu adevărat în memorie și dacă le confundă cu ale competitorilor — notorietate și unicitate, resimțite mai degrabă decât măsurate.",
    qualQuestions: [
      "O să vă arăt ceva din care am scos numele brandului — ce brand vă vine în minte, dacă vă vine vreunul?",
      "Ce v-a făcut să spuneți asta — ce anume de aici vi se pare că „e [brand]”?",
      "Ar putea fi la fel de bine un competitor? Care anume?",
      "Când vă imaginați [brand] în minte, care e prima imagine sau primul sunet care vă apare?",
      "Dacă [brand] ar renunța complet la nume și la logo, ce v-ar spune totuși că sunt ei?",
    ],
  },
  "sustainability-perception": {
    qualIntent:
      "Explorează ce înseamnă sustenabilitatea pentru ei în această categorie, cât de mult le influențează cu adevărat alegerea și dacă au încredere în afirmațiile brandului — trecând dincolo de răspunsul dezirabil social, spre decalajul dintre declarație și comportament.",
    qualQuestions: [
      "Când vă gândiți la [category], contează în vreun fel în alegerea dumneavoastră cât de sustenabil sau etic e un brand? Povestiți-mi cum vă gândiți la asta.",
      "Spuneți-mi despre un brand în care aveți încredere că face lucrurile cum trebuie — și despre unul la care sunteți sceptic(ă). Care e diferența?",
      "Când un brand face o afirmație „verde” sau „etică”, ce vă face să o credeți și ce vă face să dați ochii peste cap?",
      "Ați plăti mai mult pentru o opțiune mai sustenabilă aici? Fiți sincer(ă) — și unde e limita dumneavoastră?",
      "Unii oameni spun că le pasă de sustenabilitate, dar nu schimbă nimic din ce cumpără. Dumneavoastră, sincer, unde vă situați?",
    ],
  },
  servqual: {
    qualIntent:
      "Explorează cele cinci dimensiuni ale serviciului (RATER) prin cele mai bune și cele mai proaste momente de servire și identifică unde promisiunea — din reclame, din aplicație sau de la ghișeu — s-a îndepărtat de ceea ce s-a livrat efectiv.",
    qualQuestions: [
      "Povestiți-mi despre cea mai bună și despre cea mai proastă experiență de servire pe care ați avut-o cu [provider]. Ce s-a întâmplat în fiecare?",
      "Vă puteți baza pe ei că fac lucrurile bine din prima? Spuneți-mi despre o dată când au reușit și despre una când nu. (fiabilitate)",
      "Cum vă fac oamenii de acolo să vă simțiți — în siguranță și bine tratat(ă), sau ca un simplu număr? (siguranță și empatie)",
      "Când ați avut nevoie de ajutor, cât de repede și cu câtă bunăvoință au reacționat? (promptitudine)",
      "Ce au promis — în reclame, în aplicație, la ghișeu — s-a potrivit cu ce ați primit de fapt? Unde a apărut diferența?",
      "Dacă dumneavoastră ați conduce locul acela, care ar fi primul lucru pe care l-ați repara la serviciu?",
    ],
  },
  "conjoint-analysis": {
    qualIntent:
      "Conjoint este prin natura lui cantitativ; componenta calitativă complementară scoate la iveală ce atribute contează cu adevărat și compromisurile reale pe care le fac oamenii — input pentru alegerea atributelor și a nivelurilor de modelat.",
    qualQuestions: [
      "Când alegeți un [product], povestiți-mi ce lucruri puneți în balanță — ce cântărește contra a ce?",
      "Spuneți-mi despre o situație în care ați vrut [one attribute], dar a trebuit să renunțați la [another] ca să îl obțineți. Cum ați decis?",
      "Dacă ați putea păstra doar trei lucruri la [product] și ați renunța la restul, ce ați păstra?",
      "Unde intră prețul în toate astea — primul filtru, criteriul de departajare, sau ceva la care faceți un efort în plus pentru produsul potrivit?",
      "Există funcționalități pur și simplu nenegociabile — lucruri fără de care nici nu se pune problema?",
    ],
  },
};
