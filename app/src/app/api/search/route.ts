import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") || "").trim();

  // DEBUG: kontroll att vi får data alls från view:n
  // Besök: /api/search?q=__all
  if (q === "__all") {
    const { data, error } = await supabase
      .from("scholarships_ux")
      .select("id,name,provider")
      .limit(5);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data ?? []);
  }

  if (!q) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase
    .from("scholarships_ux")
    .select(`
      id,
      name,
      provider,
      summary,
      who_can_apply,
      purpose,
      application,
      amount_min,
      amount_max,
      currency,
      deadline_date,
      application_url
    `)
    .textSearch("search_tsv", q, {
      type: "websearch",
      config: "swedish",
    })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}
