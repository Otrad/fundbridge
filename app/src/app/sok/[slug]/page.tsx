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
  faqTitle: string;
  faqBody: string;
};

const slugDisplayMap: Record<string, string> = {
  juridikstudent: "juridikstudent",
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
};

function formatSlug(slug: string) {
  return slugDisplayMap[slug] ?? slug.replace(/-/g, " ");
}

function formatTitle(term: string) {
  return term.charAt(0).toUpperCase() + term.slice(1);
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
    { label: "Stipendier för sjuksköterskor", href: "/sok/sjukskoterska" },
    { label: "Stipendier för resa", href: "/sok/resa" },
    { label: "Stipendier för forskning", href: "/sok/forskning" },
  ];

  return allLinks.filter((link) => link.href !== `/sok/${slug}`).slice(0, 6);
}

function getPageCopy(slug: string): PageCopy {
  const displayTerm = formatSlug(slug);

  const defaults: PageCopy = {
    displayTerm,
    title: `Stipendier för ${displayTerm}`,
    description: `Hitta stipendier för ${displayTerm} i Sverige. Jämför stipendier, se exempel och hitta relevanta finansieringsmöjligheter hos Fundbridge.`,
    intro: `Här hittar du stipendier för ${displayTerm} i Sverige. Fundbridge hjälper dig att snabbt få en överblick över relevanta stipendier, finansieringsmöjligheter och stöd som kan passa din situation.`,
    intro2: `Oavsett om du söker stipendium för studier, utbildning, särskilda behov, forskning eller personliga omständigheter kan du använda Fundbridge för att hitta rätt bland många olika alternativ på ett och samma ställe.`,
    section1Title: `Vilka stipendier finns för ${displayTerm}?`,
    section1Body1: `Det finns många olika typer av stipendier för ${displayTerm}. Vissa delas ut av stiftelser, andra av organisationer, fonder, utbildningsaktörer eller lokala initiativ. Kraven varierar ofta beroende på bakgrund, studieinriktning, ort, ekonomi eller syftet med ansökan.`,
    section1Body2: `Genom att söka brett och använda rätt sökord kan du hitta stipendier som är relevanta för just ${displayTerm}. Det kan handla om både större och mindre belopp, men även mindre stipendier kan vara värdefulla som stöd under studietiden eller i samband med särskilda projekt.`,
    section2Title: `Så hittar du rätt stipendium för ${displayTerm}`,
    section2Body1: `Ett bra första steg är att börja med en bred sökning och sedan jämföra flera olika stipendier. Titta på vilka krav som ställs, vilka målgrupper stipendiet riktar sig till och vilken typ av dokumentation som behövs i ansökan.`,
    section2Body2: `För den som söker stipendier för ${displayTerm} är det ofta klokt att vara uppmärksam på formuleringar kring utbildning, ekonomi, studieort, särskilda meriter eller social situation. Ju bättre du matchar din ansökan mot stipendiets syfte, desto större chans har du att hitta rätt möjlighet.`,
    faqTitle: `Vanliga frågor om stipendier för ${displayTerm}`,
    faqBody: `Många som söker stipendier för ${displayTerm} undrar vilka krav som gäller, hur man hittar rätt stipendier och hur man ökar sina chanser i ansökan. En bra utgångspunkt är att läsa kriterier noggrant, söka flera stipendier samtidigt och anpassa ansökan efter varje enskild utlysning.`,
  };

  const custom: Record<string, Partial<PageCopy>> = {
    studenter: {
      title: "Stipendier för studenter",
      description:
        "Hitta stipendier för studenter i Sverige. Jämför stipendier, se exempel och hitta finansiering för studier hos Fundbridge.",
      intro:
        "Här hittar du stipendier för studenter i Sverige. Fundbridge hjälper dig att snabbt få en överblick över stipendier och finansieringsmöjligheter som kan passa olika typer av studenter.",
      intro2:
        "Många stipendier för studenter riktar sig till särskilda utbildningar, studieorter, ekonomiska situationer eller personliga omständigheter. Därför är det viktigt att söka brett och jämföra flera alternativ.",
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
      faqBody:
        "Vanliga frågor handlar om vem som räknas som student, om man kan söka flera stipendier samtidigt och vilka underlag som behövs. Ofta är svaret ja på flera av dessa frågor, men varje stipendium har sina egna villkor.",
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
      faqBody:
        "Vanliga frågor handlar om vilka typer av ekonomiska svårigheter som kan berättiga stöd, vilka underlag som behövs och hur många stipendier man kan söka. Det varierar mellan olika stiftelser, så läs alltid villkoren noga.",
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
      faqBody:
        "Vanliga frågor handlar om vem som kan söka stipendier i Sverige, om svenska stipendier är skattefria och hur man hittar rätt stiftelser. Eftersom reglerna skiljer sig åt bör varje stipendium läsas igenom för sig.",
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
  };

  return {
    ...defaults,
    ...custom[slug],
    displayTerm:
      custom[slug]?.displayTerm ?? defaults.displayTerm,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const copy = getPageCopy(params.slug);
  const titleTerm = formatTitle(copy.title.replace(/^Stipendier (för |i |inom )/i, ""));
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
        name: `Vad finns det för stipendier för ${copy.displayTerm}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: copy.section1Body1,
        },
      },
      {
        "@type": "Question",
        name: `Hur hittar man stipendier för ${copy.displayTerm}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: copy.section2Body1,
        },
      },
      {
        "@type": "Question",
        name: `Hur söker man stipendier för ${copy.displayTerm}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: copy.faqBody,
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
              Hitta stipendier för {copy.displayTerm} hos Fundbridge
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.8,
                color: "#374151",
              }}
            >
              Fundbridge är byggt för att göra det enklare att hitta stipendier i
              Sverige. På denna sida kan du se hur många stipendier som matchar{" "}
              {copy.displayTerm}, få inspiration och sedan gå vidare till
              sökningen för att hitta rätt alternativ för just dig.
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