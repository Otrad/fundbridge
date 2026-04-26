import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") || "").toLowerCase().trim();

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase
    .from("scholarships")
    .select("tags, field_of_studies, geography")
    .limit(200);

  if (error) {
    console.error("suggest error:", error);
    return NextResponse.json([]);
  }

  const suggestions = new Set<string>();

  for (const row of data ?? []) {
    const fields = [
      row.tags,
      row.field_of_studies,
      row.geography
    ];

    for (const field of fields) {
      if (!field) continue;

      const tokens = field.split(/[, ]+/);

      for (const token of tokens) {
        const word = token.trim().toLowerCase();

        if (word.startsWith(q) && word.length > 2) {
          suggestions.add(word);
        }
      }
    }
  }

  return NextResponse.json(Array.from(suggestions).slice(0, 8));
}