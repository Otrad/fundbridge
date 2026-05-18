export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

type SearchResult = {
  id: string;
  name: string;
  summary: string | null;
  provider: string | null;
  tags?: string | null;
};

function cleanInput(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[.,!?;:()/"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeSearchQuery(input: string) {
  const cleaned = cleanInput(input);

  const phraseRules: Array<[RegExp, string]> = [
    [/juridikstudent(er)?|juriststudent(er)?|jurstud/, "juridik"],
    [/läkarstudent(er)?|lakarstudent(er)?|medicinstudent(er)?/, "medicin"],
    [/sjuksköterskestudent(er)?|sjukskoterskestudent(er)?/, "medicin"],
    [/ekonomstudent(er)?|ekonomistudent(er)?/, "ekonomi"],
    [/ingenjörsstudent(er)?|ingenjorsstudent(er)?|teknolog(er)?/, "teknik"],
    [/kandidatstudier|kandidatstudent(er)?|kandidat/, "student"],
    [/masterstudier|masterstudent(er)?|master/, "student"],
    [/utbytesstudier|utomlands|utlandsstudier|exchange|abroad|international/, "utlandsstudier"],
    [/gymnasieelev(er)?|gymnasiet|gymnasium/, "gymnasieelev"],
    [/doktorand(er)?|phd|postdoc/, "doktorand"],
    [/examensarbete(n)?/, "examensarbete"],
  ];

  for (const [pattern, replacement] of phraseRules) {
    if (pattern.test(cleaned)) return replacement;
  }

  const synonymMap: Record<string, string> = {
    jurist: "juridik",
    juridik: "juridik",
    juridikstudent: "juridik",
    juridikstudenter: "juridik",
    juriststudent: "juridik",
    juriststudenter: "juridik",

    läkare: "medicin",
    lakare: "medicin",
    medicin: "medicin",
    medicinstudent: "medicin",
    medicinstudenter: "medicin",
    sjuksköterska: "medicin",
    sjukskoterska: "medicin",

    ekonom: "ekonomi",
    ekonomi: "ekonomi",
    ekonomstudent: "ekonomi",
    ekonomstudenter: "ekonomi",
    ekonomistudent: "ekonomi",
    ekonomistudenter: "ekonomi",

    ingenjör: "teknik",
    ingenjor: "teknik",
    teknik: "teknik",
    teknolog: "teknik",
    civilingenjör: "teknik",
    civilingenjor: "teknik",

    forskning: "forskning",
    forskare: "forskning",
    doktorand: "doktorand",
    doktorander: "doktorand",

    student: "student",
    studenter: "student",
    studentstipendium: "student",
    universitet: "student",
    högskola: "student",
    hogskola: "student",
    utbildning: "student",
    studier: "student",

    kandidat: "student",
    kandidatstudier: "student",
    master: "student",
    masterstudier: "student",

    behövande: "behövande",
    behovande: "behövande",
    bidrag: "behövande",
    ekonomiskt: "behövande",
    stöd: "behövande",
    stod: "behövande",

    kvinna: "kvinna",
    kvinnor: "kvinna",
    tjej: "kvinna",
    tjejer: "kvinna",

    utlandsstudier: "utlandsstudier",
    utomlands: "utlandsstudier",
    utbytesstudier: "utlandsstudier",

    stockholm: "stockholm",
    göteborg: "göteborg",
    goteborg: "göteborg",
    malmö: "malmö",
    malmo: "malmö",
    lund: "lund",
    uppsala: "uppsala",

    idrott: "idrott",
    musik: "musik",
    konst: "konst",
    entreprenör: "entreprenör",
    entreprenor: "entreprenör",
    unga: "unga",
    gymnasieelev: "gymnasieelev",
    gymnasieelever: "gymnasieelev",

    law: "juridik",
    legal: "juridik",
    lawyer: "juridik",
    medicine: "medicin",
    medical: "medicin",
    nurse: "medicin",
    doctor: "medicin",
    economics: "ekonomi",
    business: "ekonomi",
    engineering: "teknik",
    technology: "teknik",
    research: "forskning",
    woman: "kvinna",
    women: "kvinna",
    female: "kvinna",
    abroad: "utlandsstudier",
    exchange: "utlandsstudier",
  };

  const stopWords = new Set([
    "jag", "är", "ar", "och", "som", "för", "for", "ett", "en", "den", "det", "de",
    "mig", "min", "mitt", "mina", "vi", "du", "han", "hon", "man", "på", "pa", "i",
    "till", "av", "med", "vill", "söker", "soker", "letar", "pluggar", "plugga",
    "läser", "laser", "studerar", "studera", "inom", "hos", "från", "fran", "kan",
    "ska", "skulle", "behöver", "behover", "finns", "finnes", "någon", "nagon",
    "några", "am", "and", "the", "a", "an", "of", "to", "in", "on", "with", "my",
    "me", "we", "you", "is", "are", "looking", "searching", "need", "want",
  ]);

  const tokens = cleaned
    .split(" ")
    .filter(Boolean)
    .filter((word) => !stopWords.has(word))
    .map((word) => synonymMap[word] ?? word)
    .filter(Boolean);

  const uniqueTokens = Array.from(new Set(tokens));

  if (uniqueTokens.length === 0) {
    if (cleaned.includes("student")) return "student";
    if (cleaned.includes("stipendium")) return "stipendium";
    return cleaned;
  }

  return uniqueTokens.join(" ");
}

function fallbackQueryFor(originalQuery: string, normalizedQuery: string) {
  const q = cleanInput(`${originalQuery} ${normalizedQuery}`);

  if (
    q.includes("student") ||
    q.includes("kandidat") ||
    q.includes("master") ||
    q.includes("universitet") ||
    q.includes("högskola") ||
    q.includes("hogskola")
  ) {
    return "student";
  }

  if (q.includes("juridik") || q.includes("jurist")) return "juridik";
  if (q.includes("ekonomi") || q.includes("ekonom")) return "ekonomi";
  if (q.includes("medicin") || q.includes("läkare") || q.includes("lakare")) return "medicin";
  if (q.includes("teknik") || q.includes("ingenjör") || q.includes("ingenjor")) return "teknik";
  if (q.includes("utland") || q.includes("utomlands") || q.includes("utbyte")) return "utlandsstudier";
  if (q.includes("behövande") || q.includes("behovande") || q.includes("bidrag")) return "behövande";

  return "student";
}

async function runSearch(searchQuery: string) {
  const [
    { data: resultsData, error: resultsError },
    { data: countData, error: countError },
  ] = await Promise.all([
    supabase.rpc("search_scholarships", {
      search_query: searchQuery,
    }),
    supabase.rpc("count_search_scholarships", {
      search_query: searchQuery,
    }),
  ]);

  if (resultsError) throw resultsError;
  if (countError) throw countError;

  const results = Array.isArray(resultsData) ? (resultsData as SearchResult[]) : [];
  const total =
    typeof countData === "number" ? countData : Number(countData) || 0;

  return { results, total };
}

export async function GET(req: NextRequest) {
  try {
    const q = (req.nextUrl.searchParams.get("q") || "").trim();

    if (!q) {
      return NextResponse.json({
        total: 0,
        results: [],
        previewResults: [],
        normalizedQuery: "",
        fallbackUsed: false,
      });
    }

    const normalizedQuery = normalizeSearchQuery(q);
    let usedQuery = normalizedQuery;
    let fallbackUsed = false;

    let { results, total } = await runSearch(usedQuery);

    if (total === 0 || results.length === 0) {
      const fallbackQuery = fallbackQueryFor(q, normalizedQuery);

      if (fallbackQuery && fallbackQuery !== usedQuery) {
        const fallbackSearch = await runSearch(fallbackQuery);

        if (fallbackSearch.total > 0 || fallbackSearch.results.length > 0) {
          usedQuery = fallbackQuery;
          fallbackUsed = true;
          results = fallbackSearch.results;
          total = fallbackSearch.total;
        }
      }
    }

    const previewResults = results.slice(0, 3);

    console.log("SEARCH:", {
      query: q,
      normalized: normalizedQuery,
      usedQuery,
      fallbackUsed,
      results: total,
      timestamp: new Date().toISOString(),
    });

    const { error: logError } = await supabase.from("search_logs").insert({
      query: q,
      normalized_query: usedQuery,
      result_count: total,
    });

    if (logError) {
      console.error("search_logs insert error:", logError);
    }

    return NextResponse.json({
      total,
      results,
      previewResults,
      normalizedQuery,
      usedQuery,
      fallbackUsed,
    });
  } catch (error) {
    console.error("API /api/search unexpected error:", error);

    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}