"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

type Row = {
  id: string;
  name: string;
  summary: string | null;
  provider: string | null;
};

export default function HomePage() {
  const [q, setQ] = useState("ekonomi uppsala");
  const [rows, setRows] = useState<Row[]>([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function runSearch(rawQuery: string) {
    const query = rawQuery.trim();

    if (!query) {
      setRows([]);
      setErr("");
      return;
    }

    setLoading(true);
    setErr("");

    const { data, error } = await supabase.rpc("search_scholarships", {
      q: query,
      lim: 50,
    });

    if (error) {
      setErr("Kunde inte hämta sökresultat just nu.");
      setRows([]);
      setLoading(false);
      return;
    }

    setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    runSearch(q);
  }, []);

  return (
    <main
      style={{
        maxWidth: 980,
        margin: "40px auto",
        padding: "0 16px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 6 }}>Fundbridge</h1>

      <p style={{ marginTop: 0, opacity: 0.75 }}>
        Hitta stipendier och finansiering som matchar din bakgrund och dina studier.
      </p>

      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Sök t.ex. ekonomi uppsala, juridik kvinnor, forskning…"
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 10,
            border: "1px solid #ddd",
            fontSize: 16,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              runSearch(q);
            }
          }}
        />

        <button
          onClick={() => runSearch(q)}
          disabled={loading}
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid #ddd",
            cursor: loading ? "default" : "pointer",
            background: loading ? "#f3f3f3" : "white",
          }}
        >
          {loading ? "Söker…" : "Sök"}
        </button>
      </div>

      {err && (
        <p style={{ color: "crimson", marginTop: 12 }}>
          {err}
        </p>
      )}

      {!err && !loading && rows.length === 0 && (
        <p style={{ marginTop: 18, opacity: 0.7 }}>
          Inga träffar. Testa andra sökord.
        </p>
      )}

      <div style={{ marginTop: 18 }}>
        {rows.map((r) => (
          <article
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
              <Link
                href={`/stipendium/${r.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
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
          </article>
        ))}
      </div>
    </main>
  );
}