export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function normalizeSearchQuery(input: string) {
  const synonymMap: Record<string, string> = {
    jurist: "juridik",
    juriststudent: "juridik student",
    juridikstudent: "juridik student",
    jurstud: "juridik student",

    läkare: "medicin",
    lakare: "medicin",
    läkarstudent: "medicin student",
    lakarstudent: "medicin student",
    medicinstudent: "medicin student",
    sjuksköterska: "medicin",
    sjukskoterska: "medicin",
    sjuksköterskestudent: "medicin student",
    sjukskoterskestudent: "medicin student",

    ekonom: "ekonomi",
    ekonomstudent: "ekonomi student",
    ekonomistudent: "ekonomi student",

    ingenjör: "teknik",
    ingenjor: "teknik",
    civilingenjör: "teknik",
    civilingenjor: "teknik",
    teknolog: "teknik student",
    ingenjörsstudent: "teknik student",
    ingenjorsstudent: "teknik student",

    forskare: "forskning",
    doktorand: "forskning doktorand",
    postdoc: "forskning",
    phd: "forskning doktorand",

    tjej: "kvinna",
    tjejer: "kvinna",
    kvinno: "kvinna",

    utomlands: "utlandsstudier",
    utbytesstudier: "utlandsstudier",
    exchangeprogram: "utlandsstudier",

    law: "juridik",
    lawyer: "juridik",
    legal: "juridik",

    medicine: "medicin",
    medical: "medicin",
    doctor: "medicin",
    nurse: "medicin",

    economics: "ekonomi",
    economist: "ekonomi",
    business: "ekonomi",

    engineering: "teknik",
    engineer: "teknik",
    technology: "teknik",

    research: "forskning",
    researcher: "forskning",

    woman: "kvinna",
    women: "kvinna",
    female: "kvinna",
    girl: "kvinna",

    abroad: "utlandsstudier",
    international: "utlandsstudier",
    exchange: "utlandsstudier",

    student: "student",
    studies: "student",
    study: "student",
    scholarship: "stipendium",
    scholarships: "stipendium",
    funding: "stipendium",
    grant: "stipendium",
    grants: "stipendium",
  };

  const stopWords = new Set([
    "jag", "är", "ar", "och", "som", "för", "for", "ett", "en", "den", "det", "de",
    "mig", "min", "mitt", "mina", "vi", "du", "han", "hon", "man", "på", "pa", "i",
    "till", "av", "med", "vill", "söker", "soker", "letar", "pluggar", "plugga",
    "läser", "laser", "studerar", "studera", "inom", "hos", "från", "fran", "kan",
    "ska", "skulle", "behöver", "behover", "finns", "finnes", "någon", "nagon",
    "några", "stöd", "stod",

    "am", "and", "for", "the", "a", "an", "of", "to", "in", "on", "with", "my", "me",
    "we", "you", "is", "are", "looking", "searching", "need", "want", "study",
    "studying", "student",
  ]);

  const cleaned = input
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[.,!?;:()/"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const tokens = cleaned
    .split(" ")
    .filter(Boolean)
    .filter((word) => !stopWords.has(word))
    .map((word) => synonymMap[word] ?? word)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean);

  const uniqueTokens = Array.from(new Set(tokens));
  return uniqueTokens.join(" ");
}

export async function GET(req: NextRequest) {
  try {
    const q = (req.nextUrl.searchParams.get("q") || "").trim();

    if (!q) {
      return NextResponse.json({
        total: 0,
        results: [],
      });
    }

    const normalizedQuery = normalizeSearchQuery(q);

    const [{ data: resultsData, error: resultsError }, { data: countData, error: countError }] =
      await Promise.all([
        supabase.rpc("search_scholarships", {
          search_query: normalizedQuery,
        }),
        supabase.rpc("count_search_scholarships", {
          search_query: normalizedQuery,
        }),
      ]);

    if (resultsError) {
      console.error("search_scholarships RPC error:", resultsError);
      return NextResponse.json({ error: resultsError.message }, { status: 500 });
    }

    if (countError) {
      console.error("count_search_scholarships RPC error:", countError);
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    const results = Array.isArray(resultsData) ? resultsData : [];
    const total =
      typeof countData === "number"
        ? countData
        : Number(countData) || 0;

    const { error: logError } = await supabase.from("search_logs").insert({
      query: q,
      normalized_query: normalizedQuery,
      result_count: total,
    });

    if (logError) {
      console.error("search_logs insert error:", logError);
    }

    return NextResponse.json({
      total,
      results,
    });
  } catch (error) {
    console.error("API /api/search unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}

