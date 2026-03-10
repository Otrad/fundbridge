"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

type Row = {
  id: string;
  name: string;
  summary: string;
  provider: string;
};

export default function HomePage() {
  const [q, setQ] = useState("ekonomi uppsala");
  const [rows, setRows] = useState<Row[]>([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function runSearch(query: string) {
    setLoading(true);
    setErr("");

    const { data, error } = await supabase.rpc("search_scholarships", {
      q: query,
      lim: 50,
    });

    if (error) {
      setErr(error.message);
      setRows([]);
      setLoading(false);
      return;
    }

    setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    runSearch(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ maxWidth: 980, margin: "40px auto", fontFamily: "system-ui", padding: "0 16px" }}>
      <h1 style={{ marginBottom: 6 }}>Stipendiekompassen</h1>
      <p style={{ marginTop: 0, opacity: 0.75 }}>
        Sök bland stipendier och klicka för full information.
      </p>

      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Sök t.ex. ekonomi uppsala, juridik kvinnor, forskning…"
          style={{ flex: 1, padding: 12, borderRadius: 10, border: "1px solid #ddd" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") runSearch(q);
          }}
        />
        <button
          onClick={() => runSearch(q)}
          style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid #ddd", cursor: "pointer" }}
        >
          {loading ? "Söker…" : "Sök"}
        </button>
      </div>

      {err && <p style={{ color: "crimson", marginTop: 12 }}>{err}</p>}

      {!err && !loading && rows.length === 0 && (
        <p style={{ marginTop: 18, opacity: 0.7 }}>Inga träffar.</p>
      )}

      <div style={{ marginTop: 18 }}>
        {rows.map((r) => (
          <div
            key={r.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 14,
              padding: 14,
              marginBottom: 10,
              background: "white",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 16 }}>
              <Link href={`/stipendium/${r.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                {r.name}
              </Link>
            </div>

            {r.provider && (
              <div style={{ opacity: 0.7, marginTop: 4, fontSize: 13 }}>
                {r.provider}
              </div>
            )}

            {r.summary && (
              <div style={{ marginTop: 10, opacity: 0.9 }}>
                {r.summary}
              </div>
            )}

            <div style={{ marginTop: 10 }}>
              <Link href={`/stipendium/${r.id}`} style={{ fontSize: 13 }}>
                Läs mer →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
