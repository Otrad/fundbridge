import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: { slug: string };
};

type Row = {
  id: string;
  name: string;
  summary: string | null;
  provider: string | null;
};

type PageCopy = {
  displayTerm: string;
  title: string;
  description: string;
  intro: string;
  intro2: string;
  section1Title: string;
  section1Body1: string;
  section1Body2: string;
  section2Title: string;
  section2Body1: string;
  section2Body2: string;
  section3Title: string;
  section3Body1: string;
  section3Body2: string;
  faqTitle: string;
  faqBody: string;
  ctaTitle: string;
  ctaBody: string;
};

export const revalidate = 3600;

const PRIORITY_SLUGS = [
  "studenter",
  "behovande",
  "sverige",
  "juridikstudent",
  "medicin",
  "utlandsstudier",
  "stockholm",
  "uppsala",
  "lund",
  "goteborg",
  "malmo",
  "ekonomi",
  "ingenjor",
  "sjukskoterska",
  "resa",
  "forskning",

  // nya prioriterade SEO-sluggar
  "master",
  "kandidat",
  "gymnasieelev",
  "kvinnor",
  "utbyte",
  "examensarbete",
  "doktorand",
  "entreprenor",
  "konst",
  "musik",
  "idrott",
  "universitet",
  "student",
  "unga",
];

const slugDisplayMap: Record<string, string> = {
  juridikstudent: "juridikstudenter",
  medicin: "medicin",
  utlandsstudier: "utlandsstudier",
  behovande: "behövande",
  studenter: "studenter",
  stockholm: "Stockholm",
  uppsala: "Uppsala",
  lund: "Lund",
  sverige: "Sverige",
  goteborg: "Göteborg",
  malmo: "Malmö",
  ekonomi: "ekonomi",
  ingenjor: "ingenjör",
  sjukskoterska: "sjuksköterska",
  resa: "resa",
  forskning: "forskning",

  master: "masterstudier",
  kandidat: "kandidatstudier",
  gymnasieelev: "gymnasieelever",
  kvinnor: "kvinnor",
  utbyte: "utbytesstudier",
  examensarbete: "examensarbete",
  doktorand: "doktorander",
  entreprenor: "entreprenörer",
  konst: "konst",
  musik: "musik",
  idrott: "idrott",
  universitet: "universitet",
  student: "student",
  unga: "unga",
};

export function generateStaticParams() {
  return PRIORITY_SLUGS.map((slug) => ({ slug }));
}

function formatSlug(slug: string) {
  return slugDisplayMap[slug] ?? slug.replace(/-/g, " ");
}

function getRelatedLinks(slug: string) {
  const allLinks = [
    { label: "Stipendier för studenter", href: "/sok/studenter" },
    { label: "Stipendier för behövande", href: "/sok/behovande" },
    { label: "Stipendier i Sverige", href: "/sok/sverige" },
    { label: "Stipendier för juridikstudenter", href: "/sok/juridikstudent" },
    { label: "Stipendier inom medicin", href: "/sok/medicin" },
    { label: "Stipendier för utlandsstudier", href: "/sok/utlandsstudier" },
    { label: "Stipendier i Stockholm", href: "/sok/stockholm" },
    { label: "Stipendier i Göteborg", href: "/sok/goteborg" },
    { label: "Stipendier i Malmö", href: "/sok/malmo" },
    { label: "Stipendier i Uppsala", href: "/sok/uppsala" },
    { label: "Stipendier i Lund", href: "/sok/lund" },
    { label: "Stipendier inom ekonomi", href: "/sok/ekonomi" },
    { label: "Stipendier för ingenjörsstudier", href: "/sok/ingenjor" },
    {
      label: "Stipendier för sjuksköterskor",
      href: "/sok/sjukskoterska",
    },
    { label: "Stipendier för resa", href: "/sok/resa" },
    { label: "Stipendier för forskning", href: "/sok/forskning" },

    { label: "Stipendier för masterstudier", href: "/sok/master" },
    { label: "Stipendier för kandidatstudier", href: "/sok/kandidat" },
    { label: "Stipendier för gymnasieelever", href: "/sok/gymnasieelev" },
    { label: "Stipendier för kvinnor", href: "/sok/kvinnor" },
    { label: "Stipendier för utbytesstudier", href: "/sok/utbyte" },
    { label: "Stipendier för examensarbete", href: "/sok/examensarbete" },
    { label: "Stipendier för doktorander", href: "/sok/doktorand" },
    { label: "Stipendier för entreprenörer", href: "/sok/entreprenor" },
    { label: "Stipendier inom konst", href: "/sok/konst" },
    { label: "Stipendier inom musik", href: "/sok/musik" },
    { label: "Stipendier inom idrott", href: "/sok/idrott" },
    { label: "Stipendier för universitet", href: "/sok/universitet" },
    { label: "Stipendier för student", href: "/sok/student" },
    { label: "Stipendier för unga", href: "/sok/unga" },
  ];

  const clusters: Record<string, string[]> = {
    studenter: [
      "/sok/behovande",
      "/sok/sverige",
      "/sok/utlandsstudier",
      "/sok/juridikstudent",
      "/sok/medicin",
      "/sok/ekonomi",
      "/sok/master",
      "/sok/kandidat",
      "/sok/student",
    ],
    behovande: [
      "/sok/studenter",
      "/sok/sverige",
      "/sok/stockholm",
      "/sok/goteborg",
      "/sok/malmo",
      "/sok/uppsala",
    ],
    sverige: [
      "/sok/studenter",
      "/sok/behovande",
      "/sok/stockholm",
      "/sok/goteborg",
      "/sok/malmo",
      "/sok/utlandsstudier",
      "/sok/universitet",
      "/sok/unga",
    ],
    juridikstudent: [
      "/sok/studenter",
      "/sok/utlandsstudier",
      "/sok/stockholm",
      "/sok/uppsala",
      "/sok/lund",
      "/sok/behovande",
      "/sok/master",
    ],
    medicin: [
      "/sok/studenter",
      "/sok/sjukskoterska",
      "/sok/forskning",
      "/sok/utlandsstudier",
      "/sok/stockholm",
      "/sok/lund",
      "/sok/doktorand",
    ],
    utlandsstudier: [
      "/sok/studenter",
      "/sok/resa",
      "/sok/juridikstudent",
      "/sok/medicin",
      "/sok/ekonomi",
      "/sok/ingenjor",
      "/sok/utbyte",
      "/sok/master",
    ],
    master: [
      "/sok/studenter",
      "/sok/kandidat",
      "/sok/utlandsstudier",
      "/sok/utbyte",
      "/sok/ekonomi",
      "/sok/ingenjor",
    ],
    kandidat: [
      "/sok/studenter",
      "/sok/master",
      "/sok/universitet",
      "/sok/stockholm",
      "/sok/uppsala",
      "/sok/lund",
    ],
    gymnasieelev: [
      "/sok/unga",
      "/sok/studenter",
      "/sok/stockholm",
      "/sok/goteborg",
      "/sok/malmo",
      "/sok/sverige",
    ],
    kvinnor: [
      "/sok/studenter",
      "/sok/behovande",
      "/sok/sverige",
      "/sok/stockholm",
      "/sok/utlandsstudier",
      "/sok/unga",
    ],
    utbyte: [
      "/sok/utlandsstudier",
      "/sok/resa",
      "/sok/studenter",
      "/sok/master",
      "/sok/kandidat",
      "/sok/universitet",
    ],
    examensarbete: [
      "/sok/studenter",
      "/sok/master",
      "/sok/kandidat",
      "/sok/ekonomi",
      "/sok/ingenjor",
      "/sok/forskning",
    ],
    doktorand: [
      "/sok/forskning",
      "/sok/medicin",
      "/sok/studenter",
      "/sok/utlandsstudier",
      "/sok/universitet",
      "/sok/ekonomi",
    ],
    entreprenor: [
      "/sok/ekonomi",
      "/sok/studenter",
      "/sok/stockholm",
      "/sok/sverige",
      "/sok/unga",
      "/sok/master",
    ],
    konst: [
      "/sok/musik",
      "/sok/idrott",
      "/sok/resa",
      "/sok/stockholm",
      "/sok/goteborg",
      "/sok/malmo",
    ],
    musik: [
      "/sok/konst",
      "/sok/idrott",
      "/sok/stockholm",
      "/sok/goteborg",
      "/sok/malmo",
      "/sok/resa",
    ],
    idrott: [
      "/sok/unga",
      "/sok/konst",
      "/sok/musik",
      "/sok/stockholm",
      "/sok/goteborg",
      "/sok/malmo",
    ],
    universitet: [
      "/sok/studenter",
      "/sok/student",
      "/sok/master",
      "/sok/kandidat",
      "/sok/utlandsstudier",
      "/sok/examensarbete",
    ],
    student: [
      "/sok/studenter",
      "/sok/universitet",
      "/sok/master",
      "/sok/kandidat",
      "/sok/stockholm",
      "/sok/utlandsstudier",
    ],
    unga: [
      "/sok/gymnasieelev",
      "/sok/studenter",
      "/sok/kvinnor",
      "/sok/stockholm",
      "/sok/sverige",
      "/sok/idrott",
    ],
  };

  const preferred = clusters[slug];
  if (!preferred) {
    return allLinks.filter((link) => link.href !== `/sok/${slug}`).slice(0, 6);
  }

  return preferred
    .map((href) => allLinks.find((link) => link.href === href))
    .filter((link): link is { label: string; href: string } => Boolean(link));
}

function getPageCopy(slug: string): PageCopy {
  const displayTerm = formatSlug(slug);

  const defaults: PageCopy = {
    displayTerm,
    title: `Stipendier för ${displayTerm}`,
    description: `Hitta stipendier för ${displayTerm} i Sverige. Jämför stipendier, se exempel och hitta relevanta finansieringsmöjligheter hos Fundbridge.`,
    intro: `Här hittar du stipendier för ${displayTerm} i Sverige. Fundbridge hjälper dig att snabbt få en överblick över relevanta stipendier, finansieringsmöjligheter och stöd som kan passa din situation.`,
    intro2: `Många stipendier har särskilda kriterier kopplade till utbildning, bakgrund, ekonomi, ort eller syftet med ansökan. Därför är det viktigt att jämföra flera alternativ och läsa villkoren noggrant.`,
    section1Title: `Vilka stipendier finns för ${displayTerm}?`,
    section1Body1: `Det finns många olika typer av stipendier för ${displayTerm}. Vissa delas ut av stiftelser, andra av organisationer, fonder, utbildningsaktörer eller lokala initiativ. Kraven varierar ofta beroende på bakgrund, studieinriktning, ort, ekonomi eller syftet med ansökan.`,
    section1Body2: `Genom att söka brett och använda rätt sökord kan du hitta stipendier som är relevanta för just ${displayTerm}. Det kan handla om både större och mindre belopp, men även mindre stipendier kan vara värdefulla som stöd under studietiden eller i samband med särskilda projekt.`,
    section2Title: `Så hittar du rätt stipendium för ${displayTerm}`,
    section2Body1: `Ett bra första steg är att börja med en bred sökning och sedan jämföra flera olika stipendier. Titta på vilka krav som ställs, vilka målgrupper stipendiet riktar sig till och vilken typ av dokumentation som behövs i ansökan.`,
    section2Body2: `För den som söker stipendier för ${displayTerm} är det ofta klokt att vara uppmärksam på formuleringar kring utbildning, ekonomi, studieort, särskilda meriter eller social situation. Ju bättre du matchar din ansökan mot stipendiets syfte, desto större chans har du att hitta rätt möjlighet.`,
    section3Title: `Så ökar du chansen att få stipendium för ${displayTerm}`,
    section3Body1: `För att öka chansen att få stipendium är det bra att söka flera stipendier samtidigt, anpassa ansökan efter varje utlysning och vara tydlig med varför du uppfyller kriterierna. Många missar möjligheter genom att skriva alltför generellt.`,
    section3Body2: `Det hjälper också att vara ute i god tid. Flera stipendier har fasta ansökningsperioder, och de sökande som skickar in väl förberedda ansökningar har ofta bättre förutsättningar än de som söker i sista stund.`,
    faqTitle: `Vanliga frågor om stipendier för ${displayTerm}`,
    faqBody: `Många som söker stipendier för ${displayTerm} undrar vilka krav som gäller, hur man hittar rätt stipendier och hur man ökar sina chanser i ansökan. En bra utgångspunkt är att läsa kriterier noggrant, söka flera stipendier samtidigt och anpassa ansökan efter varje enskild utlysning.`,
    ctaTitle: `Hitta stipendier för ${displayTerm} hos Fundbridge`,
    ctaBody: `Fundbridge är byggt för att göra det enklare att hitta stipendier i Sverige. På denna sida kan du se hur många stipendier som matchar ${displayTerm}, få inspiration och sedan gå vidare till sökningen för att hitta rätt alternativ för just dig.`,
  };

  const custom: Record<string, Partial<PageCopy>> = {
    studenter: {
      title: "Stipendier för studenter",
      description:
        "Hitta stipendier för studenter i Sverige. Jämför stipendier, se exempel och hitta finansiering för studier hos Fundbridge.",
      intro:
        "Här hittar du stipendier för studenter i Sverige. Fundbridge hjälper dig att snabbt få en överblick över stipendier och finansieringsmöjligheter som kan passa olika typer av studenter.",
      intro2:
        "Många stipendier för studenter riktar sig till särskilda utbildningar, studieorter, ekonomiska situationer eller personliga omständigheter. Därför är det viktigt att söka brett och jämföra flera alternativ om du vill hitta rätt stipendium.",
      section1Title: "Vilka stipendier kan studenter söka?",
      section1Body1:
        "Studenter kan söka stipendier från stiftelser, fonder, föreningar, utbildningsaktörer och privata donationer. Vissa stipendier gäller alla studenter, medan andra är avgränsade till exempelvis studieinriktning, ort, ekonomiskt behov eller akademiska meriter.",
      section1Body2:
        "Den som söker stipendier för studenter i Sverige tjänar ofta på att kombinera breda sökningar med mer specifika termer. Det ökar chansen att hitta både generella stipendier och nischade möjligheter som annars kan vara svåra att upptäcka.",
      section2Title: "Så hittar du stipendier som passar studenter",
      section2Body1:
        "Börja med att titta på stipendiernas målgrupp, ansökningstid och vilka dokument som krävs. För många studenter är det smart att söka flera stipendier parallellt eftersom kraven skiljer sig åt mellan olika stiftelser och fonder.",
      section2Body2:
        "En genomarbetad ansökan kan göra stor skillnad. För studenter är det ofta viktigt att beskriva utbildning, mål, ekonomisk situation och varför stödet behövs just nu.",
      section3Title: "Så ökar studenter chansen att få stipendium",
      section3Body1:
        "Studenter som lyckas bra med stipendieansökningar brukar vara konkreta. Beskriv vad du studerar, vad du vill uppnå, hur stipendiet ska användas och varför du passar stipendiets målgrupp.",
      section3Body2:
        "Det är också smart att inte låsa sig vid bara ett stipendium. Den som söker flera relevanta stipendier för studenter ökar ofta chansen att få finansiering betydligt.",
      faqBody:
        "Vanliga frågor handlar om vem som räknas som student, om man kan söka flera stipendier samtidigt och vilka underlag som behövs. Ofta är svaret ja på flera av dessa frågor, men varje stipendium har sina egna villkor.",
      ctaTitle: "Hitta stipendier för studenter hos Fundbridge",
      ctaBody:
        "På Fundbridge kan du snabbt se hur många stipendier som matchar studenter och gå vidare till rätt resultat. Det gör det enklare att hitta stipendier för studier i Sverige utan att leta på många olika ställen.",
    },
    behovande: {
      displayTerm: "behövande",
      title: "Stipendier för behövande",
      description:
        "Hitta stipendier för behövande i Sverige. Jämför stipendier och ekonomiskt stöd som kan passa din situation hos Fundbridge.",
      intro:
        "Här hittar du stipendier för behövande i Sverige. Fundbridge hjälper dig att hitta stipendier och ekonomiskt stöd för personer med begränsade resurser eller särskilda behov.",
      intro2:
        "Många stiftelser och fonder delar ut medel till behövande utifrån ekonomi, livssituation, studier, ålder eller sociala omständigheter. Därför är det viktigt att hitta stipendier som matchar just din situation.",
      section1Title: "Vilka stipendier finns för behövande?",
      section1Body1:
        "Det finns stipendier och stödformer som riktar sig till behövande genom stiftelser, hjälporganisationer, lokala fonder och privata donationer. Kraven kan handla om låg inkomst, sjukdom, familjesituation eller andra ekonomiska utmaningar.",
      section1Body2:
        "Många som söker stipendier för behövande upptäcker att det finns fler alternativ än man först tror. Genom att jämföra olika stipendier och läsa kriterierna noggrant kan du hitta stöd som är relevant för dina behov.",
      section2Title: "Så söker du stipendier för behövande",
      section2Body1:
        "Börja med att identifiera vilka kriterier som gäller för varje fond eller stiftelse. Vissa kräver ekonomiska underlag, intyg eller personligt brev där du beskriver din situation och varför du söker stöd.",
      section2Body2:
        "När du söker stipendier för behövande är det viktigt att vara tydlig, konkret och ärlig i ansökan. En välskriven ansökan som tydligt visar behovet kan öka möjligheten att få stöd.",
      section3Title: "Så ökar du chansen att få stöd som behövande",
      section3Body1:
        "När du söker stipendier som behövande är dokumentation ofta avgörande. Det kan handla om ekonomiska underlag, intyg från skola, vård eller annan relevant part beroende på stipendiets krav.",
      section3Body2:
        "Det är också viktigt att förklara hur stödet skulle göra konkret skillnad. Stiftelser vill ofta förstå både behovet och hur pengarna ska användas i praktiken.",
      faqBody:
        "Vanliga frågor handlar om vilka typer av ekonomiska svårigheter som kan berättiga stöd, vilka underlag som behövs och hur många stipendier man kan söka. Det varierar mellan olika stiftelser, så läs alltid villkoren noga.",
      ctaTitle: "Hitta stipendier för behövande hos Fundbridge",
      ctaBody:
        "Fundbridge gör det enklare att hitta stipendier för behövande genom att samla relevanta möjligheter på ett ställe. Det hjälper dig att snabbare se vilka stipendier som faktiskt passar din situation.",
    },
    sverige: {
      displayTerm: "Sverige",
      title: "Stipendier i Sverige",
      description:
        "Hitta stipendier i Sverige för studenter, privatpersoner och olika behov. Jämför svenska stipendier och finansieringsmöjligheter hos Fundbridge.",
      intro:
        "Här hittar du stipendier i Sverige. Fundbridge samlar stipendier och finansieringsmöjligheter för studenter, privatpersoner och andra målgrupper på ett och samma ställe.",
      intro2:
        "Svenska stipendier kan komma från stiftelser, kommuner, universitet, föreningar, fonder och privata givare. Kraven varierar beroende på målgrupp, utbildning, ort och behov.",
      section1Title: "Vilka stipendier finns i Sverige?",
      section1Body1:
        "Det finns ett stort antal stipendier i Sverige för studier, forskning, resa, sociala behov, kultur och andra ändamål. Vissa stipendier är nationella medan andra är knutna till en viss stad, skola eller målgrupp.",
      section1Body2:
        "Genom att söka bland stipendier i Sverige kan du hitta både breda stipendier och mer nischade möjligheter. Det är ofta kombinationen av rätt sökord och noggrann filtrering som ger bäst resultat.",
      section2Title: "Så hittar du rätt stipendium i Sverige",
      section2Body1:
        "Ett bra sätt att börja är att först identifiera om du söker stipendier för studier, personliga behov, yrkesområde eller geografisk plats. Därefter kan du jämföra villkor, målgrupper och ansökningstider.",
      section2Body2:
        "För den som söker stipendier i Sverige är det ofta värdefullt att söka regelbundet. Nya möjligheter tillkommer löpande och flera stipendier har fasta perioder under året.",
      section3Title: "Så ökar du chansen att hitta rätt stipendium i Sverige",
      section3Body1:
        "Eftersom utbudet av stipendier i Sverige är brett är det smart att kombinera breda sökningar med mer specifika termer som stad, utbildning eller behov. Då hittar du lättare rätt bland både generella och nischade stipendier.",
      section3Body2:
        "Många söker för smalt eller för sent. Den som söker i god tid och jämför flera svenska stipendier samtidigt får ofta betydligt bättre träffsäkerhet.",
      faqBody:
        "Vanliga frågor handlar om vem som kan söka stipendier i Sverige, om svenska stipendier är skattefria och hur man hittar rätt stiftelser. Eftersom reglerna skiljer sig åt bör varje stipendium läsas igenom för sig.",
      ctaTitle: "Hitta stipendier i Sverige hos Fundbridge",
      ctaBody:
        "Fundbridge är byggt för att göra det enklare att hitta stipendier i Sverige. På denna sida kan du se hur många stipendier som matchar Sverige-relaterade sökningar och gå vidare till rätt resultat direkt.",
    },
    goteborg: {
      displayTerm: "Göteborg",
      title: "Stipendier i Göteborg",
      description:
        "Hitta stipendier i Göteborg för studenter och privatpersoner. Se stipendier och finansieringsmöjligheter med koppling till Göteborg hos Fundbridge.",
      intro:
        "Här hittar du stipendier i Göteborg. Fundbridge hjälper dig att hitta stipendier med koppling till Göteborg, både för studier, personliga behov och andra ändamål.",
      intro2:
        "Många stipendier i Göteborg är kopplade till lokala stiftelser, skolor, föreningar eller personer med anknytning till staden. Därför kan geografisk koppling vara viktig i ansökan.",
      section1Title: "Vilka stipendier finns i Göteborg?",
      section1Body1:
        "Det finns stipendier i Göteborg för studenter, unga vuxna, behövande och andra grupper. Vissa stipendier riktar sig till personer som bor i Göteborg, medan andra gäller den som studerar eller har bakgrund i staden.",
      section1Body2:
        "När du söker stipendier i Göteborg är det klokt att kombinera geografiska sökningar med mer specifika termer, till exempel utbildning eller behov. Det ökar chansen att hitta relevanta stipendier.",
      section2Title: "Så hittar du stipendier i Göteborg",
      section2Body1:
        "Börja med att jämföra lokala stipendier och kontrollera om bostadsort, studieort eller annan lokal anknytning krävs. Flera stipendier har särskilda kriterier som är vanliga just i lokala stiftelser.",
      section2Body2:
        "Den som söker stipendier i Göteborg bör också hålla koll på återkommande ansökningsperioder. Många fonder återkommer varje år men med begränsade tidsfönster.",
      section3Title: "Så ökar du chansen att hitta rätt stipendium i Göteborg",
      section3Body1:
        "Lokala stipendier kan ibland vara lättare att missa än nationella, men de kan också ha lägre konkurrens. Därför är det smart att leta efter stipendier där anknytningen till Göteborg faktiskt är en fördel.",
      section3Body2:
        "Om du bor, studerar eller har annan tydlig koppling till Göteborg bör du lyfta det tidigt i ansökan. Det kan vara avgörande i flera lokala fonder och stiftelser.",
    },
    malmo: {
      displayTerm: "Malmö",
      title: "Stipendier i Malmö",
      description:
        "Hitta stipendier i Malmö för studenter och privatpersoner. Jämför stipendier och möjligheter med koppling till Malmö hos Fundbridge.",
      intro:
        "Här hittar du stipendier i Malmö. Fundbridge hjälper dig att hitta stipendier för studier, personliga behov och andra ändamål med koppling till Malmö.",
      intro2:
        "Stipendier i Malmö kan vara kopplade till lokala stiftelser, utbildningsmiljöer, föreningar eller personer som bor, studerar eller verkar i staden.",
      section1Title: "Vilka stipendier finns i Malmö?",
      section1Body1:
        "Det finns stipendier i Malmö som riktar sig till studenter, unga, behövande och andra målgrupper. Vissa är lokala och andra har regional eller nationell spridning men kan ändå vara relevanta för den som bor i Malmö.",
      section1Body2:
        "Genom att kombinera sökord som Malmö, utbildning, studier och behov kan du hitta fler relevanta stipendier än genom breda sökningar enbart.",
      section2Title: "Så hittar du stipendier i Malmö",
      section2Body1:
        "Jämför kriterier som bostadsort, studieort och målgrupp. Många lokala stipendier prioriterar sökande som har tydlig anknytning till Malmö eller Skåne.",
      section2Body2:
        "För att lyckas bättre med stipendier i Malmö är det smart att söka regelbundet och hålla koll på om specifika lokala stiftelser öppnar ansökan under vissa delar av året.",
      section3Title: "Så ökar du chansen att hitta stipendium i Malmö",
      section3Body1:
        "När du söker stipendier i Malmö är det bra att vara tydlig med din lokala anknytning, till exempel om du bor i staden, studerar där eller har annan relevant koppling.",
      section3Body2:
        "Det är också klokt att kombinera lokala sökningar med bredare sökningar för studenter, behövande eller specifika utbildningar. Då missar du inte stipendier som är relevanta men inte uttryckligen marknadsförs som lokala.",
    },
    ekonomi: {
      title: "Stipendier inom ekonomi",
      description:
        "Hitta stipendier inom ekonomi i Sverige. Se stipendier för ekonomistudenter och andra med koppling till ekonomi hos Fundbridge.",
      intro:
        "Här hittar du stipendier inom ekonomi i Sverige. Fundbridge hjälper dig att hitta stipendier som kan passa ekonomistudenter och andra med intresse för ekonomi, företagande och närliggande utbildningar.",
      intro2:
        "Många stipendier inom ekonomi riktar sig till studenter på ekonomprogram, civilekonomer, entreprenörer eller personer med särskilda akademiska mål och projekt.",
      section1Title: "Vilka stipendier finns inom ekonomi?",
      section1Body1:
        "Det finns stipendier inom ekonomi från stiftelser, universitet, näringslivsanknutna fonder och olika typer av organisationer. Vissa är avsedda för studier, andra för uppsatser, internationella projekt eller särskilda meriter.",
      section1Body2:
        "För den som söker stipendier inom ekonomi är det ofta viktigt att titta på inriktning, till exempel redovisning, finans, företagsekonomi eller entreprenörskap.",
      section2Title: "Så hittar du stipendier inom ekonomi",
      section2Body1:
        "Börja med att identifiera vilka stipendier som riktar sig till ekonomistudenter eller sökande med närliggande utbildning. Kontrollera sedan kriterier som studieprestation, projektbeskrivning och eventuell internationell inriktning.",
      section2Body2:
        "Genom att anpassa ansökan till stipendiets syfte och tydligt beskriva din koppling till ekonomi ökar chansen att hitta rätt finansieringsmöjlighet.",
    },
    ingenjor: {
      displayTerm: "ingenjör",
      title: "Stipendier för ingenjörsstudier",
      description:
        "Hitta stipendier för ingenjörsstudier i Sverige. Jämför stipendier för ingenjörsstudenter och tekniska utbildningar hos Fundbridge.",
      intro:
        "Här hittar du stipendier för ingenjörsstudier i Sverige. Fundbridge hjälper dig att hitta stipendier för tekniska utbildningar, ingenjörsprogram och närliggande studier.",
      intro2:
        "Många stipendier för ingenjörsstudier riktar sig till specifika program, tekniska projekt, forskning eller internationella utbyten. Därför kan detaljer i utbildningen spela stor roll.",
      section1Title: "Vilka stipendier finns för ingenjörsstudier?",
      section1Body1:
        "Det finns stipendier för ingenjörsstudenter från stiftelser, universitet, tekniska organisationer och privata donationer. Vissa fokuserar på studieresultat, andra på innovation, forskning eller särskilda inriktningar.",
      section1Body2:
        "För den som söker stipendier för ingenjörsstudier är det ofta smart att kombinera breda sökningar med mer specialiserade tekniska termer.",
      section2Title: "Så hittar du stipendier för ingenjörsstudier",
      section2Body1:
        "Jämför stipendiernas krav på utbildningsnivå, inriktning och eventuella projekt. Tekniska stipendier kan ibland vara mer specifika än generella studentstipendier.",
      section2Body2:
        "En tydlig ansökan som visar vad du studerar, vilka mål du har och varför stödet behövs kan förbättra dina möjligheter att hitta rätt stipendium.",
    },
    sjukskoterska: {
      displayTerm: "sjuksköterska",
      title: "Stipendier för sjuksköterskor och sjuksköterskestudenter",
      description:
        "Hitta stipendier för sjuksköterskor och sjuksköterskestudenter i Sverige. Jämför relevanta stipendier hos Fundbridge.",
      intro:
        "Här hittar du stipendier för sjuksköterskor och sjuksköterskestudenter i Sverige. Fundbridge hjälper dig att hitta stipendier med koppling till vård, omvårdnad och hälsoinriktade utbildningar.",
      intro2:
        "Många stipendier inom vård riktar sig till studenter, yrkesverksamma, vidareutbildning eller specifika projekt inom omvårdnad och hälsa.",
      section1Title: "Vilka stipendier finns för sjuksköterskor?",
      section1Body1:
        "Det finns stipendier för sjuksköterskor och vårdstudenter från stiftelser, professionella organisationer och fonder med fokus på vård, utbildning och utveckling.",
      section1Body2:
        "För den som söker stipendier som sjuksköterska kan det vara relevant att titta både på vårdinriktade stipendier och bredare stipendier för studenter eller yrkesutveckling.",
      section2Title: "Så hittar du stipendier för sjuksköterskor",
      section2Body1:
        "Börja med att undersöka om stipendiet riktar sig till grundutbildning, vidareutbildning eller särskilda projekt inom vård och omvårdnad.",
      section2Body2:
        "En tydlig ansökan som beskriver utbildning, verksamhetsområde eller framtida mål inom vård kan göra det lättare att hitta rätt stipendium.",
    },
    resa: {
      displayTerm: "resa",
      title: "Stipendier för resa",
      description:
        "Hitta stipendier för resa, resestipendier och bidrag för studier, projekt och internationella aktiviteter hos Fundbridge.",
      intro:
        "Här hittar du stipendier för resa i Sverige. Fundbridge hjälper dig att hitta resestipendier och bidrag för studier, projekt, utbyten och andra ändamål.",
      intro2:
        "Många resestipendier är kopplade till utbildning, forskning, praktik, kultur eller internationella aktiviteter. Därför är syftet med resan ofta avgörande.",
      section1Title: "Vilka resestipendier finns?",
      section1Body1:
        "Det finns resestipendier från stiftelser, fonder, skolor och organisationer. Vissa gäller utlandsstudier och akademiska resor, medan andra är kopplade till kultur, projekt eller utvecklingsarbete.",
      section1Body2:
        "För den som söker stipendier för resa är det viktigt att visa hur resan bidrar till studier, arbete, forskning eller personlig utveckling.",
      section2Title: "Så hittar du stipendier för resa",
      section2Body1:
        "Börja med att titta på om stipendiet är kopplat till studier, praktik, forskning eller ett särskilt projekt. Flera resestipendier är nischade och kräver att syftet med resan är tydligt beskrivet.",
      section2Body2:
        "En stark ansökan för resestipendium brukar tydligt förklara destination, syfte, kostnader och vad resan ska leda till.",
    },
    forskning: {
      displayTerm: "forskning",
      title: "Stipendier för forskning",
      description:
        "Hitta stipendier för forskning i Sverige. Jämför forskningsstipendier och finansieringsmöjligheter hos Fundbridge.",
      intro:
        "Här hittar du stipendier för forskning i Sverige. Fundbridge hjälper dig att hitta forskningsstipendier och stöd för akademiska projekt, utvecklingsarbete och fördjupade studier.",
      intro2:
        "Forskningsstipendier kan rikta sig till olika nivåer, ämnesområden och projekt. Därför är det viktigt att jämföra kriterier, ändamål och målgrupper noggrant.",
      section1Title: "Vilka forskningsstipendier finns?",
      section1Body1:
        "Det finns forskningsstipendier från stiftelser, universitet, fonder och professionella organisationer. Vissa fokuserar på ett specifikt forskningsområde medan andra är bredare och stödjer utveckling och akademisk fördjupning.",
      section1Body2:
        "För den som söker stipendier för forskning är det ofta viktigt att visa projektets syfte, metod, nytta och hur finansieringen ska användas.",
      section2Title: "Så hittar du stipendier för forskning",
      section2Body1:
        "Börja med att identifiera stipendier som matchar ämnesområde, nivå och typ av projekt. Kontrollera om stipendiet gäller doktorandnivå, postdoktoral forskning eller annan akademisk verksamhet.",
      section2Body2:
        "En stark ansökan för forskning brukar beskriva projektets mål, betydelse och genomförande på ett tydligt och trovärdigt sätt.",
    },
    juridikstudent: {
      title: "Stipendier för juridikstudenter",
      description:
        "Hitta stipendier för juridikstudenter i Sverige. Jämför stipendier för juristprogrammet och relaterade studier hos Fundbridge.",
      intro:
        "Här hittar du stipendier för juridikstudenter i Sverige. Fundbridge hjälper dig att hitta stipendier som kan passa dig som läser juridik, juristprogrammet eller närliggande utbildningar.",
      intro2:
        "Många stipendier för juridikstudenter är kopplade till studieresultat, särskilda projekt, internationella studier eller personliga förutsättningar. Därför är det klokt att söka brett.",
      section1Title: "Vilka stipendier finns för juridikstudenter?",
      section1Body1:
        "Det finns stipendier för juridikstudenter från stiftelser, universitet, privata donationer och andra organisationer. Vissa fokuserar på akademiska meriter, medan andra riktar sig till studenter med särskilda behov eller internationella ambitioner.",
      section1Body2:
        "För den som söker stipendier inom juridik kan det vara värdefullt att kombinera allmänna studentstipendier med mer nischade stipendier kopplade till juridiska studier.",
      section2Title: "Så hittar du rätt stipendium som juridikstudent",
      section2Body1:
        "Titta på stipendiernas målgrupp, eventuella krav på studieprestation och om det finns koppling till praktik, utbytesstudier eller särskilda juridiska områden.",
      section2Body2:
        "En tydlig ansökan som förklarar dina mål med juridikstudierna och varför du söker stöd kan öka chansen att hitta rätt stipendium.",
    },
    medicin: {
      title: "Stipendier inom medicin",
      description:
        "Hitta stipendier inom medicin i Sverige. Jämför stipendier för medicinstudenter, vårdutbildningar och forskning hos Fundbridge.",
      intro:
        "Här hittar du stipendier inom medicin i Sverige. Fundbridge hjälper dig att hitta stipendier för medicinstudier, vårdutbildningar och närliggande områden.",
      intro2:
        "Många stipendier inom medicin riktar sig till medicinstudenter, forskning, vidareutbildning eller särskilda projekt inom hälsa och vård.",
      section1Title: "Vilka stipendier finns inom medicin?",
      section1Body1:
        "Det finns stipendier inom medicin från stiftelser, universitet, forskningsfonder och professionella organisationer. Vissa stipendier gäller utbildning och andra fokuserar på forskning eller internationella möjligheter.",
      section1Body2:
        "Den som söker stipendier inom medicin bör ofta kombinera breda sökningar med mer specifika termer, till exempel forskning, vård eller särskilda utbildningsnivåer.",
      section2Title: "Så hittar du stipendier inom medicin",
      section2Body1:
        "Jämför stipendiernas syfte, målgrupp och krav. Inom medicin kan ansökningar ibland behöva vara extra tydliga kring utbildning, forskningsinriktning eller planerat användningsområde.",
      section2Body2:
        "En stark ansökan beskriver varför just ditt projekt, din utbildning eller din utveckling inom medicin förtjänar stöd.",
    },
    utlandsstudier: {
      title: "Stipendier för utlandsstudier",
      description:
        "Hitta stipendier för utlandsstudier i Sverige. Jämför stipendier och finansiering för att studera utomlands hos Fundbridge.",
      intro:
        "Här hittar du stipendier för utlandsstudier. Fundbridge hjälper dig att hitta stipendier och finansieringsmöjligheter för att studera utomlands.",
      intro2:
        "Många stipendier för utlandsstudier är kopplade till studieprogram, destination, akademiska meriter eller personliga förutsättningar. Därför lönar det sig att söka både brett och specifikt.",
      section1Title: "Vilka stipendier finns för utlandsstudier?",
      section1Body1:
        "Det finns stipendier för utlandsstudier från stiftelser, universitet, organisationer och internationella program. Vissa gäller specifika länder eller skolor, medan andra är mer öppna.",
      section1Body2:
        "Den som söker stipendier för utlandsstudier bör också titta på resestipendier, studentstipendier och stipendier med särskilt fokus på internationella erfarenheter.",
      section2Title: "Så hittar du stipendier för utlandsstudier",
      section2Body1:
        "Börja med att identifiera vilka studier du planerar, vilka kostnader du behöver täcka och vilka länder eller lärosäten som är aktuella.",
      section2Body2:
        "En bra ansökan för utlandsstudier beskriver varför studierna utomlands är viktiga, hur de passar dina mål och hur stipendiet skulle användas.",
    },
    stockholm: {
      displayTerm: "Stockholm",
      title: "Stipendier i Stockholm",
      description:
        "Hitta stipendier i Stockholm för studenter och privatpersoner. Jämför lokala och relevanta stipendier hos Fundbridge.",
      intro:
        "Här hittar du stipendier i Stockholm. Fundbridge hjälper dig att hitta stipendier för studenter, privatpersoner och andra målgrupper med koppling till Stockholm.",
      intro2:
        "Många stipendier i Stockholm är lokalt förankrade och riktar sig till personer som bor, studerar eller verkar i huvudstaden. Därför är geografisk anknytning ofta viktig.",
      section1Title: "Vilka stipendier finns i Stockholm?",
      section1Body1:
        "Det finns stipendier i Stockholm för studier, sociala behov, kultur, forskning och andra ändamål. Vissa stipendier gäller hela länet medan andra är knutna till specifika institutioner eller stiftelser.",
      section1Body2:
        "Den som söker stipendier i Stockholm kan ofta hitta både lokala alternativ och bredare nationella stipendier som ändå är relevanta för boende eller studerande i staden.",
      section2Title: "Så hittar du stipendier i Stockholm",
      section2Body1:
        "Jämför stipendiernas krav på bostadsort, studieort och målgrupp. Många lokala stipendier har tydliga krav på anknytning till Stockholm.",
      section2Body2:
        "Det är ofta klokt att söka flera stipendier parallellt och hålla koll på återkommande ansökningsperioder under året.",
    },
    uppsala: {
      displayTerm: "Uppsala",
      title: "Stipendier i Uppsala",
      description:
        "Hitta stipendier i Uppsala för studenter och privatpersoner. Jämför relevanta stipendier med koppling till Uppsala hos Fundbridge.",
      intro:
        "Här hittar du stipendier i Uppsala. Fundbridge hjälper dig att hitta stipendier med koppling till Uppsala för studier, behov och andra ändamål.",
      intro2:
        "Många stipendier i Uppsala är relevanta för personer som studerar, bor eller har annan anknytning till staden eller regionen.",
      section1Title: "Vilka stipendier finns i Uppsala?",
      section1Body1:
        "Det finns stipendier i Uppsala från lokala stiftelser, universitet och andra organisationer. Vissa stipendier riktar sig till studenter, medan andra gäller sociala behov eller särskilda projekt.",
      section1Body2:
        "Genom att kombinera Uppsala med mer specifika sökord kan du hitta fler relevanta stipendier än genom breda sökningar enbart.",
      section2Title: "Så hittar du stipendier i Uppsala",
      section2Body1:
        "Kontrollera om stipendiet kräver bostadsort, studieort eller annan lokal anknytning. Det är vanligt för lokala stipendier att detta spelar stor roll.",
      section2Body2:
        "Sök gärna löpande och jämför flera alternativ samtidigt för att öka chansen att hitta rätt stipendium i Uppsala.",
    },
    lund: {
      displayTerm: "Lund",
      title: "Stipendier i Lund",
      description:
        "Hitta stipendier i Lund för studenter och privatpersoner. Se relevanta stipendier med koppling till Lund hos Fundbridge.",
      intro:
        "Här hittar du stipendier i Lund. Fundbridge hjälper dig att hitta stipendier för studier, behov och andra ändamål med koppling till Lund.",
      intro2:
        "Många stipendier i Lund är lokalt förankrade och kan vara relevanta för personer som studerar, bor eller verkar i staden.",
      section1Title: "Vilka stipendier finns i Lund?",
      section1Body1:
        "Det finns stipendier i Lund från stiftelser, utbildningsaktörer och andra lokala eller regionala initiativ. Vissa stipendier är särskilt relevanta för studenter, medan andra riktar sig bredare.",
      section1Body2:
        "När du söker stipendier i Lund är det ofta klokt att kombinera geografisk sökning med mer specifika termer som utbildning, behov eller forskningsområde.",
      section2Title: "Så hittar du stipendier i Lund",
      section2Body1:
        "Börja med att kontrollera vilka stipendier som kräver lokal anknytning. Många lokala fonder prioriterar sökande som har en tydlig koppling till Lund.",
      section2Body2:
        "Genom att söka regelbundet och jämföra flera stipendier samtidigt blir det lättare att hitta rätt möjlighet.",
    },

    master: {
      displayTerm: "masterstudier",
      title: "Stipendier för masterstudier",
      description:
        "Hitta stipendier för masterstudier i Sverige och utomlands. Jämför relevanta stipendier för masterprogram hos Fundbridge.",
      intro:
        "Här hittar du stipendier för masterstudier. Fundbridge hjälper dig att hitta stipendier som kan passa dig som planerar eller redan läser ett masterprogram i Sverige eller utomlands.",
      intro2:
        "Många stipendier för masterstudier är kopplade till utbildningsnivå, ämnesområde, lärosäte eller internationella studier. Därför är det viktigt att jämföra flera olika möjligheter.",
      section1Title: "Vilka stipendier finns för masterstudier?",
      section1Body1:
        "Det finns stipendier för masterstudier från stiftelser, universitet, internationella program och privata fonder. Vissa riktar sig till särskilda ämnen medan andra är öppna för flera typer av masterutbildningar.",
      section1Body2:
        "Den som söker stipendier för masterstudier bör titta både på generella studentstipendier och stipendier som är särskilt inriktade på avancerad nivå eller internationella studier.",
      section2Title: "Så hittar du stipendier för masterstudier",
      section2Body1:
        "Börja med att kontrollera om stipendiet gäller ett visst universitet, en viss utbildningsnivå eller särskilda akademiska meriter. Många stipendier för masterstudier har tydliga krav på studieplan och mål.",
      section2Body2:
        "En stark ansökan för masterstipendium beskriver ofta varför utbildningen är viktig, hur den passar din framtida plan och hur stipendiet skulle användas i praktiken.",
      section3Title: "Så ökar du chansen att få stipendium för masterstudier",
      section3Body1:
        "För masterstudier är det ofta viktigt att vara tydlig med ditt ämnesval, din akademiska bakgrund och varför du söker just det aktuella stipendiet. Anpassning gör stor skillnad.",
      section3Body2:
        "Det hjälper också att söka flera stipendier samtidigt och vara ute i god tid, särskilt om utbildningen ligger utomlands eller har höga kostnader kopplade till resa och boende.",
      faqBody:
        "Vanliga frågor handlar om vem som kan söka stipendier för masterstudier, om stipendier gäller både Sverige och utlandet samt vilka dokument som krävs. Det varierar mellan olika stipendier, så läs alltid villkoren noggrant.",
      ctaTitle: "Hitta stipendier för masterstudier hos Fundbridge",
      ctaBody:
        "På Fundbridge kan du snabbt se hur många stipendier som matchar masterstudier och hitta relevanta alternativ utan att leta på många olika platser.",
    },
    kandidat: {
      displayTerm: "kandidatstudier",
      title: "Stipendier för kandidatstudier",
      description:
        "Hitta stipendier för kandidatstudier i Sverige. Jämför stipendier för kandidatprogram och andra grundutbildningar hos Fundbridge.",
      intro:
        "Här hittar du stipendier för kandidatstudier. Fundbridge hjälper dig att hitta stipendier för kandidatprogram, grundutbildningar och andra studier på universitetsnivå.",
      intro2:
        "Många stipendier för kandidatstudier är kopplade till ämnesområde, studieort, ekonomisk situation eller personliga förutsättningar. Därför lönar det sig att söka både brett och specifikt.",
      section1Title: "Vilka stipendier finns för kandidatstudier?",
      section1Body1:
        "Det finns stipendier för kandidatstudier från stiftelser, universitet, fonder och privata donationer. Vissa stipendier gäller alla studenter medan andra är mer avgränsade till specifika utbildningar eller grupper.",
      section1Body2:
        "För den som söker stipendier för kandidatstudier är det ofta smart att kombinera breda studentstipendier med mer nischade stipendier kopplade till ämne, ort eller behov.",
      section2Title: "Så hittar du stipendier för kandidatstudier",
      section2Body1:
        "Börja med att jämföra stipendiernas målgrupp, ansökningskrav och om de gäller en viss utbildning eller ett visst lärosäte. Det gör det lättare att hitta rätt stipendier snabbare.",
      section2Body2:
        "En bra ansökan för kandidatstudier förklarar vad du ska läsa, varför utbildningen är viktig och hur stipendiet skulle hjälpa dig under studietiden.",
      section3Title: "Så ökar du chansen att få stipendium för kandidatstudier",
      section3Body1:
        "Var konkret med din studieplan, din bakgrund och varför du passar stipendiets målgrupp. Många stipendier bedömer tydlighet och relevans högt.",
      section3Body2:
        "Den som söker flera stipendier parallellt och anpassar varje ansökan har ofta betydligt bättre chans att hitta finansiering än den som skickar samma text överallt.",
      faqBody:
        "Vanliga frågor handlar om när man kan söka stipendier för kandidatstudier, om stipendier gäller hela program eller en termin och vilka dokument som behövs. Villkoren varierar mellan olika stiftelser och fonder.",
      ctaTitle: "Hitta stipendier för kandidatstudier hos Fundbridge",
      ctaBody:
        "Fundbridge gör det enklare att hitta stipendier för kandidatstudier genom att samla relevanta möjligheter på ett ställe och visa hur många som matchar din sökning.",
    },
    gymnasieelev: {
      displayTerm: "gymnasieelever",
      title: "Stipendier för gymnasieelever",
      description:
        "Hitta stipendier för gymnasieelever i Sverige. Jämför stipendier och ekonomiskt stöd för gymnasiestudier hos Fundbridge.",
      intro:
        "Här hittar du stipendier för gymnasieelever i Sverige. Fundbridge hjälper dig att hitta stipendier och stöd som kan vara relevanta under gymnasietiden eller i samband med vidare studier.",
      intro2:
        "Många stipendier för gymnasieelever riktar sig till särskilda behov, prestationer, projekt eller framtida studier. Därför är det viktigt att jämföra flera möjligheter.",
      section1Title: "Vilka stipendier finns för gymnasieelever?",
      section1Body1:
        "Det finns stipendier för gymnasieelever från stiftelser, lokala fonder, kommunala initiativ och privata donationer. Vissa gäller studiemotivation eller prestation, andra riktar sig till unga med särskilda behov eller mål.",
      section1Body2:
        "För gymnasieelever kan både små och stora stipendier vara värdefulla, särskilt om de hjälper till med studier, utrustning, resa eller framtida utbildningsplaner.",
      section2Title: "Så hittar du stipendier för gymnasieelever",
      section2Body1:
        "Börja med att titta på om stipendiet riktar sig till unga, gymnasieelever, studiemotiverade elever eller personer med särskild lokal anknytning. Det gör sökningen mer träffsäker.",
      section2Body2:
        "Det är också klokt att hålla koll på stipendier som kan sökas inför högskolestudier, eftersom vissa möjligheter blir relevanta redan under gymnasiet.",
      section3Title: "Så ökar du chansen att få stipendium som gymnasieelev",
      section3Body1:
        "En tydlig ansökan där du beskriver dina mål, din situation och varför stödet skulle göra skillnad kan vara avgörande. Många stipendier vill förstå både behov och ambition.",
      section3Body2:
        "Sök gärna flera stipendier samtidigt och var ute i god tid. För unga sökande kan konkurrensen ibland vara lägre i mindre kända stipendier.",
      faqBody:
        "Vanliga frågor handlar om vilka gymnasieelever som kan söka stipendier, om vårdnadshavare behöver vara involverade och vilka underlag som krävs. Det varierar mellan olika stipendier.",
      ctaTitle: "Hitta stipendier för gymnasieelever hos Fundbridge",
      ctaBody:
        "Fundbridge hjälper dig att snabbt hitta stipendier för gymnasieelever och jämföra relevanta alternativ utan att behöva leta på många olika webbplatser.",
    },
    kvinnor: {
      displayTerm: "kvinnor",
      title: "Stipendier för kvinnor",
      description:
        "Hitta stipendier för kvinnor i Sverige. Jämför stipendier för studier, projekt och andra möjligheter hos Fundbridge.",
      intro:
        "Här hittar du stipendier för kvinnor i Sverige. Fundbridge hjälper dig att hitta stipendier som riktar sig till kvinnor inom studier, utveckling, projekt och andra områden.",
      intro2:
        "Många stipendier för kvinnor är kopplade till utbildning, entreprenörskap, sociala behov, ledarskap eller särskilda satsningar inom vissa ämnesområden.",
      section1Title: "Vilka stipendier finns för kvinnor?",
      section1Body1:
        "Det finns stipendier för kvinnor från stiftelser, organisationer, nätverk och privata donationer. Vissa är breda och öppna för många typer av ansökningar, medan andra riktar sig till specifika mål eller situationer.",
      section1Body2:
        "Den som söker stipendier för kvinnor kan ofta hitta möjligheter både inom studier, karriärutveckling, internationella projekt och personligt stöd beroende på stipendiets syfte.",
      section2Title: "Så hittar du stipendier för kvinnor",
      section2Body1:
        "Börja med att identifiera om du söker stipendier för utbildning, projekt, företagande eller andra ändamål. Då blir det lättare att välja rätt stipendier att fokusera på.",
      section2Body2:
        "Läs villkoren noggrant och kontrollera om stipendiet också har ytterligare krav, till exempel koppling till ort, utbildning eller särskild bakgrund.",
      section3Title: "Så ökar du chansen att få stipendium för kvinnor",
      section3Body1:
        "En bra ansökan visar tydligt varför du passar stipendiets målgrupp, hur stödet skulle användas och vilken effekt det skulle få för dig eller ditt projekt.",
      section3Body2:
        "Det är också klokt att söka flera olika stipendier samtidigt, eftersom många stipendier för kvinnor skiljer sig mycket åt i både syfte och krav.",
      faqBody:
        "Vanliga frågor handlar om vilka stipendier som specifikt riktar sig till kvinnor, om man kan söka flera samtidigt och hur man hittar rätt målgrupp. Det varierar mellan olika stiftelser och organisationer.",
      ctaTitle: "Hitta stipendier för kvinnor hos Fundbridge",
      ctaBody:
        "På Fundbridge kan du se hur många stipendier som matchar kvinnor och snabbt gå vidare till relevanta resultat i databasen.",
    },
    utbyte: {
      displayTerm: "utbytesstudier",
      title: "Stipendier för utbytesstudier",
      description:
        "Hitta stipendier för utbytesstudier och studier utomlands. Jämför relevanta möjligheter hos Fundbridge.",
      intro:
        "Här hittar du stipendier för utbytesstudier. Fundbridge hjälper dig att hitta stipendier och finansiering för studier utomlands under en termin, ett år eller ett särskilt program.",
      intro2:
        "Många stipendier för utbytesstudier är kopplade till universitet, destination, ämnesområde eller särskilda internationella program. Därför är det viktigt att söka både brett och specifikt.",
      section1Title: "Vilka stipendier finns för utbytesstudier?",
      section1Body1:
        "Det finns stipendier för utbytesstudier från universitet, stiftelser, internationella program och andra organisationer. Vissa gäller specifika länder eller samarbeten, medan andra är mer generella.",
      section1Body2:
        "För den som planerar utbytesstudier är det ofta smart att kombinera stipendier för utlandsstudier med resestipendier och studentstipendier för att hitta fler alternativ.",
      section2Title: "Så hittar du stipendier för utbytesstudier",
      section2Body1:
        "Börja med att kontrollera om stipendiet gäller ditt lärosäte, destination eller utbildningsområde. Många stipendier för utbytesstudier har tydliga krav kopplade till studieplan och syfte.",
      section2Body2:
        "En stark ansökan beskriver varför utbytet är viktigt för din utbildning, vilka kostnader som finns och hur stipendiet skulle göra skillnad.",
      section3Title: "Så ökar du chansen att få stipendium för utbytesstudier",
      section3Body1:
        "Var tydlig med vart du ska åka, varför du valt just den platsen och hur utbytet passar dina akademiska eller personliga mål.",
      section3Body2:
        "Sök flera olika typer av stipendier i god tid. Internationella stipendier har ofta fasta ansökningsperioder och tydliga dokumentkrav.",
      faqBody:
        "Vanliga frågor handlar om vilka länder och universitet som omfattas, om man kan kombinera flera stödformer och vilka dokument som behövs. Det skiljer sig mellan olika stipendier.",
      ctaTitle: "Hitta stipendier för utbytesstudier hos Fundbridge",
      ctaBody:
        "Fundbridge gör det enklare att hitta stipendier för utbytesstudier genom att samla relevanta möjligheter och visa hur många som matchar din sökning.",
    },
    examensarbete: {
      displayTerm: "examensarbete",
      title: "Stipendier för examensarbete",
      description:
        "Hitta stipendier för examensarbete i Sverige. Jämför stipendier för uppsatser, projekt och slutarbeten hos Fundbridge.",
      intro:
        "Här hittar du stipendier för examensarbete. Fundbridge hjälper dig att hitta stipendier som kan passa examensarbeten, uppsatser och andra avslutande projekt inom högre utbildning.",
      intro2:
        "Många stipendier för examensarbete är kopplade till ämnesområde, projektets syfte, forskning eller praktisk tillämpning. Därför är det viktigt att matcha ansökan mot rätt typ av stöd.",
      section1Title: "Vilka stipendier finns för examensarbete?",
      section1Body1:
        "Det finns stipendier för examensarbete från stiftelser, universitet, näringslivsanknutna fonder och andra organisationer. Vissa riktar sig till särskilda ämnen medan andra är öppna för flera områden.",
      section1Body2:
        "För den som söker stipendier för examensarbete kan det vara smart att också titta på stipendier för forskning, resa eller specifika utbildningar beroende på projektets upplägg.",
      section2Title: "Så hittar du stipendier för examensarbete",
      section2Body1:
        "Börja med att identifiera projektets ämne, syfte och om det finns kostnader för exempelvis resa, material eller datainsamling. Det hjälper dig att hitta mer relevanta stipendier.",
      section2Body2:
        "En bra ansökan för examensarbete beskriver tydligt vad projektet handlar om, varför det är viktigt och hur stipendiet skulle användas.",
      section3Title: "Så ökar du chansen att få stipendium för examensarbete",
      section3Body1:
        "Var konkret med projektets mål, metod och förväntat resultat. Många stipendier prioriterar ansökningar som tydligt visar värde och genomförbarhet.",
      section3Body2:
        "Sök gärna flera stipendier samtidigt, särskilt om examensarbetet har koppling till ett ämnesområde där det finns fler riktade möjligheter.",
      faqBody:
        "Vanliga frågor handlar om vilka typer av examensarbeten som kan få stöd, om stipendiet kan användas för resa eller material och hur detaljerad ansökan behöver vara. Det varierar mellan olika stipendier.",
      ctaTitle: "Hitta stipendier för examensarbete hos Fundbridge",
      ctaBody:
        "På Fundbridge kan du snabbt se hur många stipendier som matchar examensarbete och hitta relevanta möjligheter utan att behöva söka på flera olika håll.",
    },
    doktorand: {
      displayTerm: "doktorander",
      title: "Stipendier för doktorander",
      description:
        "Hitta stipendier för doktorander och forskarutbildning i Sverige. Jämför relevanta stipendier hos Fundbridge.",
      intro:
        "Här hittar du stipendier för doktorander i Sverige. Fundbridge hjälper dig att hitta stipendier för forskarutbildning, akademiska projekt och vidare forskning.",
      intro2:
        "Många stipendier för doktorander är kopplade till forskningsområde, konferenser, internationella samarbeten eller särskilda akademiska projekt.",
      section1Title: "Vilka stipendier finns för doktorander?",
      section1Body1:
        "Det finns stipendier för doktorander från stiftelser, forskningsfonder, universitet och professionella organisationer. Vissa riktar sig till särskilda ämnen, medan andra är bredare.",
      section1Body2:
        "För doktorander kan stipendier vara relevanta för forskning, resor, konferenser, fältarbete eller internationella samarbeten beroende på projektets behov.",
      section2Title: "Så hittar du stipendier för doktorander",
      section2Body1:
        "Börja med att kontrollera om stipendiet gäller ett visst forskningsområde, en viss nivå eller en särskild typ av aktivitet. Det gör sökningen betydligt mer träffsäker.",
      section2Body2:
        "En stark ansökan för doktorandstipendium beskriver projektets mål, akademiska betydelse och hur stödet skulle bidra till forskningen.",
      section3Title: "Så ökar du chansen att få stipendium som doktorand",
      section3Body1:
        "Var tydlig med ditt forskningsområde, projektets nytta och varför du söker just den aktuella finansieringen. Relevans väger ofta tungt.",
      section3Body2:
        "Sök gärna flera stipendier och håll koll på återkommande ansökningsperioder. Många forskningsrelaterade stipendier har begränsade fönster varje år.",
      faqBody:
        "Vanliga frågor handlar om vilka doktorander som kan söka stipendier, om stödet gäller forskning eller resor och vilka underlag som krävs. Reglerna varierar mellan olika stiftelser och fonder.",
      ctaTitle: "Hitta stipendier för doktorander hos Fundbridge",
      ctaBody:
        "Fundbridge gör det enklare att hitta stipendier för doktorander genom att samla relevanta möjligheter och visa hur många som matchar din sökning.",
    },
    entreprenor: {
      displayTerm: "entreprenörer",
      title: "Stipendier för entreprenörer",
      description:
        "Hitta stipendier för entreprenörer i Sverige. Jämför stöd och finansieringsmöjligheter för entreprenörskap hos Fundbridge.",
      intro:
        "Här hittar du stipendier för entreprenörer i Sverige. Fundbridge hjälper dig att hitta stipendier och stöd som kan vara relevanta för företagande, idéutveckling och entreprenöriella projekt.",
      intro2:
        "Många stipendier för entreprenörer är kopplade till innovation, samhällsnytta, utbildning eller särskilda målgrupper. Därför är det viktigt att söka brett men smart.",
      section1Title: "Vilka stipendier finns för entreprenörer?",
      section1Body1:
        "Det finns stipendier och stödformer för entreprenörer från stiftelser, organisationer, nätverk och olika initiativ inom näringsliv och innovation. Vissa gäller tidiga idéer, andra tillväxt eller särskilda grupper.",
      section1Body2:
        "För den som söker stipendier för entreprenörer är det ofta klokt att även titta på stipendier inom ekonomi, kvinnor, unga eller utbildning beroende på projektets inriktning.",
      section2Title: "Så hittar du stipendier för entreprenörer",
      section2Body1:
        "Börja med att definiera vilken typ av stöd du söker, till exempel utveckling, utbildning, projektmedel eller möjlighet att testa en idé. Då blir urvalet mer relevant.",
      section2Body2:
        "En bra ansökan visar tydligt vad idén går ut på, vilket problem den löser och hur stödet skulle användas för att skapa verklig effekt.",
      section3Title: "Så ökar du chansen att få stipendium som entreprenör",
      section3Body1:
        "Var konkret med projektets mål, målgrupp och nästa steg. Många stipendier för entreprenörer bedömer tydlighet, potential och genomförbarhet.",
      section3Body2:
        "Det är också smart att söka flera olika typer av stöd, eftersom entreprenörsstipendier kan ligga nära både utbildning, innovation och social utveckling.",
      faqBody:
        "Vanliga frågor handlar om vilka entreprenörer som kan söka stipendier, om företag måste vara registrerat och hur man beskriver sin idé på bästa sätt. Det varierar mellan olika initiativ.",
      ctaTitle: "Hitta stipendier för entreprenörer hos Fundbridge",
      ctaBody:
        "På Fundbridge kan du snabbt hitta stipendier för entreprenörer och se hur många möjligheter som matchar din sökning innan du går vidare.",
    },
    konst: {
      displayTerm: "konst",
      title: "Stipendier inom konst",
      description:
        "Hitta stipendier inom konst i Sverige. Jämför relevanta stipendier för konstnärer, studier och projekt hos Fundbridge.",
      intro:
        "Här hittar du stipendier inom konst i Sverige. Fundbridge hjälper dig att hitta stipendier för konstnärliga projekt, utbildningar och utveckling inom olika konstområden.",
      intro2:
        "Många stipendier inom konst är kopplade till skapande, utbildning, utställningar, projekt eller särskilda konstnärliga mål. Därför är det viktigt att söka både brett och nischat.",
      section1Title: "Vilka stipendier finns inom konst?",
      section1Body1:
        "Det finns stipendier inom konst från stiftelser, kulturfonder, privata donationer och olika organisationer. Vissa riktar sig till studenter, andra till yrkesverksamma eller särskilda projekt.",
      section1Body2:
        "För den som söker stipendier inom konst kan både lokala, nationella och ämnesspecifika stipendier vara relevanta beroende på bakgrund och syfte.",
      section2Title: "Så hittar du stipendier inom konst",
      section2Body1:
        "Börja med att titta på om stipendiet gäller utbildning, skapande arbete, projekt eller resa. Många konststipendier har tydliga krav på inriktning och användningsområde.",
      section2Body2:
        "En stark ansökan beskriver ditt konstnärliga arbete, vad du vill genomföra och hur stipendiet skulle bidra till utvecklingen av projektet.",
      section3Title: "Så ökar du chansen att få stipendium inom konst",
      section3Body1:
        "Var tydlig med ditt uttryck, ditt syfte och varför du söker just det aktuella stipendiet. Relevans och tydlighet kan göra stor skillnad i bedömningen.",
      section3Body2:
        "Det är också klokt att söka flera stipendier samtidigt, särskilt om du arbetar i ett område där det finns både kulturstöd och bredare projektstöd.",
      faqBody:
        "Vanliga frågor handlar om vilka konstområden som omfattas, om stipendier gäller studier eller yrkesverksamhet och hur arbetsprover används. Kraven varierar mellan olika stipendier.",
      ctaTitle: "Hitta stipendier inom konst hos Fundbridge",
      ctaBody:
        "Fundbridge gör det enklare att hitta stipendier inom konst genom att samla relevanta möjligheter på ett ställe och visa hur många som matchar din sökning.",
    },
    musik: {
      displayTerm: "musik",
      title: "Stipendier inom musik",
      description:
        "Hitta stipendier inom musik i Sverige. Jämför relevanta stipendier för musiker, musikstudier och projekt hos Fundbridge.",
      intro:
        "Här hittar du stipendier inom musik i Sverige. Fundbridge hjälper dig att hitta stipendier för musikstudier, musikprojekt och andra möjligheter inom musikområdet.",
      intro2:
        "Många stipendier inom musik riktar sig till utbildning, utveckling, resor, konserter eller särskilda konstnärliga projekt. Därför kan rätt sökord göra stor skillnad.",
      section1Title: "Vilka stipendier finns inom musik?",
      section1Body1:
        "Det finns stipendier inom musik från stiftelser, kulturfonder, skolor och privata donationer. Vissa riktar sig till unga musiker eller studenter, andra till yrkesverksamma och projekt.",
      section1Body2:
        "Den som söker stipendier inom musik kan ofta hitta både generella kulturstipendier och mer nischade möjligheter för instrument, genrer eller särskilda målgrupper.",
      section2Title: "Så hittar du stipendier inom musik",
      section2Body1:
        "Börja med att identifiera om du söker stipendium för studier, instrument, projekt, resa eller utveckling. Det hjälper dig att välja rätt stipendier snabbare.",
      section2Body2:
        "En bra ansökan för musikstipendium visar tydligt vad du gör, vad du vill uppnå och hur stödet skulle hjälpa dig vidare.",
      section3Title: "Så ökar du chansen att få stipendium inom musik",
      section3Body1:
        "Var tydlig med inriktning, mål och hur stipendiet passar ditt musikaliska arbete eller din utbildning. Anpassning väger ofta tungt i urvalet.",
      section3Body2:
        "Sök gärna flera stipendier samtidigt, särskilt om du också kan vara relevant för bredare kultur- eller studentstipendier.",
      faqBody:
        "Vanliga frågor handlar om vilka musiker som kan söka stipendier, om stipendier gäller utbildning eller projekt och om arbetsprover krävs. Det varierar mellan olika stipendier.",
      ctaTitle: "Hitta stipendier inom musik hos Fundbridge",
      ctaBody:
        "På Fundbridge kan du snabbt se hur många stipendier som matchar musik och hitta relevanta möjligheter utan att behöva leta på flera olika ställen.",
    },
    idrott: {
      displayTerm: "idrott",
      title: "Stipendier inom idrott",
      description:
        "Hitta stipendier inom idrott i Sverige. Jämför relevanta stipendier för idrottare, studier och utveckling hos Fundbridge.",
      intro:
        "Här hittar du stipendier inom idrott i Sverige. Fundbridge hjälper dig att hitta stipendier för idrottare, träningssatsningar, studier och andra möjligheter inom idrott.",
      intro2:
        "Många stipendier inom idrott riktar sig till unga, talanger, föreningsaktiva eller personer som kombinerar idrott med studier. Därför är det viktigt att jämföra olika typer av stöd.",
      section1Title: "Vilka stipendier finns inom idrott?",
      section1Body1:
        "Det finns stipendier inom idrott från stiftelser, föreningar, organisationer och privata donationer. Vissa är kopplade till prestation, andra till utveckling, utbildning eller sociala insatser.",
      section1Body2:
        "För den som söker stipendier inom idrott kan både lokala och nationella stipendier vara relevanta, särskilt om det finns koppling till unga, studier eller särskilda satsningar.",
      section2Title: "Så hittar du stipendier inom idrott",
      section2Body1:
        "Börja med att kontrollera om stipendiet gäller en viss sport, en viss ålder, studieinriktning eller geografisk anknytning. Det gör sökningen mer träffsäker.",
      section2Body2:
        "En stark ansökan för idrottsstipendium beskriver tydligt vad du satsar på, hur stödet skulle användas och varför det skulle göra skillnad.",
      section3Title: "Så ökar du chansen att få stipendium inom idrott",
      section3Body1:
        "Var konkret med mål, nivå och plan. Många stipendier bedömer både potential och hur genomtänkt satsningen är.",
      section3Body2:
        "Det är också klokt att söka flera stipendier och inte bara fokusera på rena idrottsstipendier. Ibland kan även stipendier för unga eller studenter vara relevanta.",
      faqBody:
        "Vanliga frågor handlar om vilka idrottare som kan söka stipendier, om stöd gäller individer eller lag och vilka underlag som behövs. Kraven varierar mellan olika stipendier.",
      ctaTitle: "Hitta stipendier inom idrott hos Fundbridge",
      ctaBody:
        "Fundbridge hjälper dig att hitta stipendier inom idrott snabbare genom att samla relevanta möjligheter på ett ställe.",
    },
    universitet: {
      displayTerm: "universitet",
      title: "Stipendier för universitet",
      description:
        "Hitta stipendier för universitet och universitetsstudier i Sverige. Jämför relevanta stipendier hos Fundbridge.",
      intro:
        "Här hittar du stipendier för universitet och universitetsstudier i Sverige. Fundbridge hjälper dig att hitta stipendier som är relevanta för olika utbildningar, nivåer och studieorter.",
      intro2:
        "Många stipendier för universitetsstudier är kopplade till ämnesområde, studienivå, ort eller särskilda förutsättningar. Därför är det viktigt att söka både brett och precist.",
      section1Title: "Vilka stipendier finns för universitet?",
      section1Body1:
        "Det finns stipendier för universitetsstudier från stiftelser, universitet, fonder och privata givare. Vissa gäller alla studenter på universitet, medan andra riktar sig till särskilda utbildningar eller grupper.",
      section1Body2:
        "För den som söker stipendier för universitet är det ofta smart att kombinera breda sökningar med mer nischade sidor för till exempel master, kandidat, ort eller ämnesområde.",
      section2Title: "Så hittar du stipendier för universitet",
      section2Body1:
        "Börja med att identifiera vilken typ av universitetsstudier du söker stöd för. Därefter kan du jämföra stipendiernas målgrupp, villkor och ansökningstider.",
      section2Body2:
        "En stark ansökan visar varför du söker stöd, hur det passar dina studier och hur stipendiet skulle användas på ett konkret sätt.",
      section3Title: "Så ökar du chansen att få stipendium för universitet",
      section3Body1:
        "Det hjälper att vara tydlig med utbildningsnivå, ämne och studieort. Många stipendier för universitetsstudier blir mer relevanta när ansökan är väl anpassad.",
      section3Body2:
        "Sök gärna flera stipendier samtidigt och kombinera breda stipendier med mer nischade alternativ för att öka chansen till finansiering.",
      faqBody:
        "Vanliga frågor handlar om vem som kan söka stipendier för universitet, om stipendier gäller alla lärosäten och hur man hittar rätt nivå. Det varierar mellan olika stipendier och stiftelser.",
      ctaTitle: "Hitta stipendier för universitet hos Fundbridge",
      ctaBody:
        "Fundbridge gör det enklare att hitta stipendier för universitet genom att samla relevanta möjligheter på ett ställe och visa hur många som matchar din sökning.",
    },
    student: {
      displayTerm: "student",
      title: "Stipendier för student",
      description:
        "Hitta stipendier för student i Sverige. Jämför stipendier och finansieringsmöjligheter för studier hos Fundbridge.",
      intro:
        "Här hittar du stipendier för student i Sverige. Fundbridge hjälper dig att hitta stipendier och finansieringsmöjligheter som kan passa din utbildning, studieort eller situation.",
      intro2:
        "Många som söker stipendier som student börjar brett och går sedan vidare till mer specifika kategorier som ämne, ort eller studienivå. Därför är det viktigt att jämföra flera alternativ.",
      section1Title: "Vilka stipendier finns för student?",
      section1Body1:
        "Det finns många typer av stipendier för studenter från stiftelser, fonder, universitet och organisationer. Vissa är öppna för många sökande, medan andra är avgränsade till specifika utbildningar eller behov.",
      section1Body2:
        "Den som söker stipendier för student bör ofta kombinera generella studentstipendier med mer nischade stipendier för till exempel ort, ämnesområde eller internationella studier.",
      section2Title: "Så hittar du stipendier som student",
      section2Body1:
        "Börja med att kontrollera vilka krav som gäller och om stipendiet riktar sig till din utbildning, ort eller situation. Därefter kan du jämföra flera möjligheter samtidigt.",
      section2Body2:
        "En tydlig ansökan som beskriver dina studier, dina mål och varför du söker stöd gör det lättare att matcha rätt stipendier.",
      section3Title: "Så ökar du chansen att få stipendium som student",
      section3Body1:
        "Sök flera stipendier parallellt och anpassa varje ansökan. Den som är konkret och tydlig med behov och mål har ofta bättre chans än den som skriver allmänt.",
      section3Body2:
        "Det hjälper också att söka i god tid och hålla koll på när olika stipendier öppnar eller stänger för ansökningar.",
      faqBody:
        "Vanliga frågor handlar om vem som räknas som student, om man kan söka flera stipendier samtidigt och hur man hittar rätt stipendier snabbast. Det varierar mellan olika stipendier, men ofta är det klokt att söka brett.",
      ctaTitle: "Hitta stipendier för student hos Fundbridge",
      ctaBody:
        "På Fundbridge kan du se hur många stipendier som matchar student och snabbt gå vidare till relevanta resultat i databasen.",
    },
    unga: {
      displayTerm: "unga",
      title: "Stipendier för unga",
      description:
        "Hitta stipendier för unga i Sverige. Jämför stipendier för studier, projekt och utveckling hos Fundbridge.",
      intro:
        "Här hittar du stipendier för unga i Sverige. Fundbridge hjälper dig att hitta stipendier och stöd som kan passa unga personer i olika situationer, till exempel studier, projekt eller särskilda satsningar.",
      intro2:
        "Många stipendier för unga är kopplade till utbildning, idéer, prestationer, sociala behov eller lokala initiativ. Därför är det viktigt att söka brett och jämföra olika typer av möjligheter.",
      section1Title: "Vilka stipendier finns för unga?",
      section1Body1:
        "Det finns stipendier för unga från stiftelser, föreningar, kommuner och privata donationer. Vissa riktar sig till gymnasieelever eller studenter, andra till unga med särskilda mål, projekt eller behov.",
      section1Body2:
        "För den som söker stipendier för unga kan både små och stora stipendier vara värdefulla, särskilt om de hjälper till med studier, utrustning, resor eller personlig utveckling.",
      section2Title: "Så hittar du stipendier för unga",
      section2Body1:
        "Börja med att identifiera vad du söker stöd för, till exempel studier, idrott, kultur eller ett projekt. Då blir det lättare att välja relevanta stipendier.",
      section2Body2:
        "Det är också klokt att titta på stipendier med geografisk anknytning eller särskilda målgrupper, eftersom dessa ibland har lägre konkurrens.",
      section3Title: "Så ökar du chansen att få stipendium som ung",
      section3Body1:
        "En tydlig ansökan som förklarar din situation, dina mål och varför stödet skulle göra skillnad kan vara avgörande. Många stipendier vill förstå både behov och potential.",
      section3Body2:
        "Sök gärna flera stipendier samtidigt och kombinera breda sökningar med mer nischade alternativ inom det område som passar dig bäst.",
      faqBody:
        "Vanliga frågor handlar om vilka unga som kan söka stipendier, om det finns åldersgränser och hur man hittar rätt stöd. Det varierar mellan olika stipendier och stiftelser.",
      ctaTitle: "Hitta stipendier för unga hos Fundbridge",
      ctaBody:
        "Fundbridge hjälper dig att snabbare hitta stipendier för unga genom att samla relevanta möjligheter och visa hur många som matchar din sökning.",
    },
  };

  return {
    ...defaults,
    ...custom[slug],
    displayTerm: custom[slug]?.displayTerm ?? defaults.displayTerm,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const copy = getPageCopy(params.slug);
  const canonicalUrl = `https://www.fundbridge.se/sok/${params.slug}`;

  return {
    title: `${copy.title} | Fundbridge`,
    description: copy.description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${copy.title} | Fundbridge`,
      description: copy.description,
      url: canonicalUrl,
      siteName: "Fundbridge",
      type: "website",
      locale: "sv_SE",
    },
    twitter: {
      card: "summary_large_image",
      title: `${copy.title} | Fundbridge`,
      description: copy.description,
    },
  };
}

async function getData(slug: string) {
  const query = formatSlug(slug);

  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://www.fundbridge.se";

    const res = await fetch(
      `${baseUrl}/api/search?q=${encodeURIComponent(query)}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch search data");
    }

    return res.json();
  } catch {
    return { results: [], total: 0 };
  }
}

export default async function Page({ params }: Props) {
  const copy = getPageCopy(params.slug);
  const data = await getData(params.slug);
  const relatedLinks = getRelatedLinks(params.slug);
  const canonicalUrl = `https://www.fundbridge.se/sok/${params.slug}`;

  const rows: Row[] = Array.isArray(data?.results) ? data.results : [];
  const total: number = typeof data?.total === "number" ? data.total : 0;
  const displayTotal = total > 300 ? "300+" : total;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name:
          copy.displayTerm === "Sverige"
            ? "Vilka stipendier finns i Sverige?"
            : `Vad finns det för stipendier för ${copy.displayTerm}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${copy.section1Body1} ${copy.section1Body2}`,
        },
      },
      {
        "@type": "Question",
        name:
          copy.displayTerm === "Sverige"
            ? "Hur hittar man rätt stipendium i Sverige?"
            : `Hur hittar man stipendier för ${copy.displayTerm}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${copy.section2Body1} ${copy.section2Body2}`,
        },
      },
      {
        "@type": "Question",
        name:
          copy.displayTerm === "Sverige"
            ? "Hur ökar man chansen att få stipendium i Sverige?"
            : `Hur ökar man chansen att få stipendium för ${copy.displayTerm}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${copy.section3Body1} ${copy.section3Body2}`,
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Fundbridge",
        item: "https://www.fundbridge.se",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sök",
        item: "https://www.fundbridge.se/sok",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: copy.title,
        item: canonicalUrl,
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.title,
    description: copy.description,
    url: canonicalUrl,
    inLanguage: "sv-SE",
    isPartOf: {
      "@type": "WebSite",
      name: "Fundbridge",
      url: "https://www.fundbridge.se",
    },
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f6f6f4",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: "#111827",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "24px 20px 72px",
        }}
      >
        <nav
          aria-label="Brödsmulor"
          style={{
            marginBottom: 18,
            fontSize: 14,
            color: "#6b7280",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#2f6f73",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            Fundbridge
          </Link>
          <span style={{ margin: "0 8px", color: "#9ca3af" }}>›</span>
          <Link
            href="/sok"
            style={{
              textDecoration: "none",
              color: "#2f6f73",
            }}
          >
            Sök
          </Link>
          <span style={{ margin: "0 8px", color: "#9ca3af" }}>›</span>
          <span>{copy.title}</span>
        </nav>

        <article
          style={{
            background: "#fff",
            border: "1px solid #e7e7e2",
            borderRadius: 22,
            padding: "32px 24px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 42,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              fontWeight: 800,
            }}
          >
            {copy.title}
          </h1>

          <p
            style={{
              marginTop: 18,
              fontSize: 18,
              lineHeight: 1.75,
              color: "#374151",
            }}
          >
            {copy.intro}
          </p>

          <p
            style={{
              marginTop: 14,
              fontSize: 16,
              lineHeight: 1.75,
              color: "#4b5563",
            }}
          >
            {copy.intro2}
          </p>

          <div
            style={{
              marginTop: 24,
              padding: "18px 20px",
              borderRadius: 16,
              background: "#f8faf9",
              border: "1px solid #e5ebe8",
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              {displayTotal} stipendier hittades
            </div>

            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.7,
                color: "#4b5563",
              }}
            >
              Se hur många stipendier som matchar {copy.displayTerm} och få
              tillgång till hela databasen för 39 kr i 30 dagar.
            </p>

            <div style={{ marginTop: 16 }}>
              <Link
                href={`/?q=${encodeURIComponent(copy.displayTerm)}`}
                style={{
                  display: "inline-block",
                  textDecoration: "none",
                  background: "#2f6f73",
                  color: "#fff",
                  padding: "12px 18px",
                  borderRadius: 12,
                  fontWeight: 700,
                  boxShadow: "0 6px 18px rgba(47,111,115,0.16)",
                }}
              >
                Sök stipendier för {copy.displayTerm}
              </Link>
            </div>
          </div>

          <section style={{ marginTop: 36 }}>
            <h2
              style={{
                margin: "0 0 14px 0",
                fontSize: 28,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
              }}
            >
              {copy.section1Title}
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.8,
                color: "#374151",
              }}
            >
              {copy.section1Body1}
            </p>

            <p
              style={{
                marginTop: 14,
                fontSize: 16,
                lineHeight: 1.8,
                color: "#374151",
              }}
            >
              {copy.section1Body2}
            </p>
          </section>

          <section style={{ marginTop: 36 }}>
            <h2
              style={{
                margin: "0 0 14px 0",
                fontSize: 28,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
              }}
            >
              {copy.section2Title}
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.8,
                color: "#374151",
              }}
            >
              {copy.section2Body1}
            </p>

            <p
              style={{
                marginTop: 14,
                fontSize: 16,
                lineHeight: 1.8,
                color: "#374151",
              }}
            >
              {copy.section2Body2}
            </p>
          </section>

          <section style={{ marginTop: 36 }}>
            <h2
              style={{
                margin: "0 0 14px 0",
                fontSize: 28,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
              }}
            >
              {copy.section3Title}
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.8,
                color: "#374151",
              }}
            >
              {copy.section3Body1}
            </p>

            <p
              style={{
                marginTop: 14,
                fontSize: 16,
                lineHeight: 1.8,
                color: "#374151",
              }}
            >
              {copy.section3Body2}
            </p>
          </section>

          <section style={{ marginTop: 36 }}>
            <h2
              style={{
                margin: "0 0 14px 0",
                fontSize: 28,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
              }}
            >
              Exempel på stipendier för {copy.displayTerm}
            </h2>

            {rows.length > 0 ? (
              <div style={{ marginTop: 16 }}>
                {rows.slice(0, 5).map((r) => (
                  <div
                    key={r.id}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: 14,
                      padding: 16,
                      marginBottom: 12,
                      background: "#ffffff",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 18,
                        lineHeight: 1.35,
                      }}
                    >
                      <Link
                        href={`/stipendium/${r.id}?from=${encodeURIComponent(
                          copy.displayTerm
                        )}`}
                        style={{
                          textDecoration: "none",
                          color: "#111827",
                        }}
                      >
                        {r.name}
                      </Link>
                    </div>

                    {r.provider && (
                      <div
                        style={{
                          marginTop: 6,
                          fontSize: 13,
                          color: "#6b7280",
                        }}
                      >
                        {r.provider}
                      </div>
                    )}

                    {r.summary && (
                      <div
                        style={{
                          marginTop: 10,
                          fontSize: 15,
                          lineHeight: 1.65,
                          color: "#374151",
                        }}
                      >
                        {r.summary}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p
                style={{
                  margin: 0,
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "#374151",
                }}
              >
                Just nu visas inga exempel här, men du kan fortfarande göra en
                sökning på Fundbridge för att se aktuella stipendier som matchar{" "}
                {copy.displayTerm}.
              </p>
            )}
          </section>

          <section style={{ marginTop: 36 }}>
            <h2
              style={{
                margin: "0 0 14px 0",
                fontSize: 28,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
              }}
            >
              {copy.faqTitle}
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.8,
                color: "#374151",
              }}
            >
              {copy.faqBody}
            </p>
          </section>

          <section style={{ marginTop: 36 }}>
            <h2
              style={{
                margin: "0 0 14px 0",
                fontSize: 28,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
              }}
            >
              Relaterade stipendier och sökningar
            </h2>

            <p
              style={{
                margin: "0 0 18px 0",
                fontSize: 16,
                lineHeight: 1.8,
                color: "#374151",
              }}
            >
              Utforska fler sökningar för att hitta stipendier i Sverige som kan
              vara relevanta för din situation.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 12,
              }}
            >
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    textDecoration: "none",
                    padding: "14px 16px",
                    borderRadius: 14,
                    border: "1px solid #e5e7eb",
                    background: "#f9fafb",
                    color: "#111827",
                    fontSize: 15,
                    fontWeight: 600,
                    lineHeight: 1.5,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          <section style={{ marginTop: 36 }}>
            <h2
              style={{
                margin: "0 0 14px 0",
                fontSize: 28,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
              }}
            >
              {copy.ctaTitle}
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.8,
                color: "#374151",
              }}
            >
              {copy.ctaBody}
            </p>

            <div style={{ marginTop: 18 }}>
              <Link
                href={`/?q=${encodeURIComponent(copy.displayTerm)}`}
                style={{
                  display: "inline-block",
                  textDecoration: "none",
                  background: "#2f6f73",
                  color: "#fff",
                  padding: "12px 18px",
                  borderRadius: 12,
                  fontWeight: 700,
                  boxShadow: "0 6px 18px rgba(47,111,115,0.16)",
                }}
              >
                Visa stipendier för {copy.displayTerm}
              </Link>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
