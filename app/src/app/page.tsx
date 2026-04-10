"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Row = {
  id: string;
  name: string;
  summary: string | null;
  provider: string | null;
  tags?: string | null;
};

function normalizeTags(tags: string | null | undefined) {
  if (!tags) return [];

  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function formatTotal(total: number) {
  if (total > 300) return "300+";
  return String(total);
}

function HomePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [q, setQ] = useState(initialQuery);
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [isStartingCheckout, setIsStartingCheckout] = useState(false);
  const [paymentCancelled, setPaymentCancelled] = useState(false);

  const hasLoadedInitialSearch = useRef(false);

  async function refreshAccess() {
    try {
      const res = await fetch("/api/access", {
        cache: "no-store",
      });

      const data = await res.json();
      setUnlocked(Boolean(data?.hasAccess));
    } catch (error) {
      console.error("Access check error:", error);
      setUnlocked(false);
    }
  }

  async function runSearch(rawQuery: string) {
    const query = rawQuery.trim();

    if (!query) {
      setRows([]);
      setTotal(0);
      setErr("");
      setSuggestions([]);
      setShowSuggestions(false);
      setPaymentCancelled(false);
      router.replace("/");
      return;
    }

    setLoading(true);
    setErr("");
    setShowSuggestions(false);
    setPaymentCancelled(false);

    router.replace(`/?q=${encodeURIComponent(query)}`);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

      if (!res.ok) {
        throw new Error("Search request failed");
      }

      const data = await res.json();

      setRows(Array.isArray(data?.results) ? data.results : []);
      setTotal(typeof data?.total === "number" ? data.total : 0);
    } catch (error) {
      console.error("Frontend search error:", error);
      setErr("Kunde inte hämta sökresultat just nu.");
      setRows([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSuggestions(rawQuery: string) {
    const query = rawQuery.trim();

    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const res = await fetch(`/api/suggest?q=${encodeURIComponent(query)}`);

      if (!res.ok) {
        throw new Error("Suggestion request failed");
      }

      const data = await res.json();
      const nextSuggestions = Array.isArray(data) ? data : [];

      setSuggestions(nextSuggestions);
      setShowSuggestions(nextSuggestions.length > 0);
    } catch (error) {
      console.error("Suggestion fetch error:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  async function handleCheckout() {
    try {
      setIsStartingCheckout(true);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: q ?? "",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.url) {
        throw new Error(data?.error || "Kunde inte starta betalning.");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Kunde inte starta betalningen. Försök igen.");
      setIsStartingCheckout(false);
    }
  }

  function resetHome() {
    setQ("");
    setRows([]);
    setTotal(0);
    setErr("");
    setSuggestions([]);
    setShowSuggestions(false);
    setMenuOpen(false);
    setIsStartingCheckout(false);
    setPaymentCancelled(false);
    router.replace("/");
  }

  useEffect(() => {
    refreshAccess();
  }, []);

  useEffect(() => {
    const urlQuery = searchParams.get("q") ?? "";
    const paymentStatus = searchParams.get("payment");

    setQ(urlQuery);
    setPaymentCancelled(paymentStatus === "cancelled");
    refreshAccess();

    if (!hasLoadedInitialSearch.current) {
      hasLoadedInitialSearch.current = true;

      if (urlQuery.trim()) {
        runSearch(urlQuery);
      } else {
        setRows([]);
        setTotal(0);
      }

      return;
    }

    if (urlQuery.trim()) {
      runSearch(urlQuery);
    } else {
      setRows([]);
      setTotal(0);
      setErr("");
    }
  }, [searchParams]);

  const hasSearch = q.trim().length > 0;

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
      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Stäng meny"
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(17, 24, 39, 0.18)",
              border: "none",
              zIndex: 40,
              cursor: "pointer",
            }}
          />

          <aside
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100vh",
              width: "min(360px, 88vw)",
              background: "#fff",
              borderLeft: "1px solid #e5e7eb",
              boxShadow: "-12px 0 40px rgba(17, 24, 39, 0.08)",
              zIndex: 50,
              padding: "24px 22px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 18,
              }}
            >
              <button
                type="button"
                aria-label="Stäng meny"
                onClick={() => setMenuOpen(false)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  border: "1px solid #e5e7eb",
                  background: "#fafaf9",
                  cursor: "pointer",
                  fontSize: 18,
                  color: "#374151",
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#6b7280",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Meny
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Link
                href="/om-fundbridge"
                onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  color: "#111827",
                  fontSize: 18,
                  fontWeight: 600,
                  padding: "12px 6px",
                }}
              >
                Om Fundbridge
              </Link>

              <Link
                href="/kontakt"
                onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  color: "#111827",
                  fontSize: 18,
                  fontWeight: 600,
                  padding: "12px 6px",
                }}
              >
                Kontakt
              </Link>
            </div>
          </aside>
        </>
      )}

      <div
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          padding: "10px 20px 72px",
        }}
      >
        <header
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: hasSearch ? 14 : 24,
            minHeight: 34,
          }}
        >
          <button
            onClick={resetHome}
            style={{
              border: "none",
              background: "transparent",
              padding: 0,
              margin: 0,
              cursor: "pointer",
              fontSize: 18,
              fontWeight: 750,
              letterSpacing: "-0.03em",
              color: "#2f6f73",
            }}
          >
            Fundbridge
          </button>

          <button
            type="button"
            aria-label="Öppna meny"
            onClick={() => setMenuOpen(true)}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 44,
              height: 44,
              borderRadius: 999,
              border: "1px solid #e2e8e4",
              background: "#fbfbf9",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 10px rgba(17,24,39,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 2,
                  borderRadius: 999,
                  background: "#374151",
                  display: "block",
                }}
              />
              <span
                style={{
                  width: 18,
                  height: 2,
                  borderRadius: 999,
                  background: "#374151",
                  display: "block",
                }}
              />
              <span
                style={{
                  width: 18,
                  height: 2,
                  borderRadius: 999,
                  background: "#374151",
                  display: "block",
                }}
              />
            </div>
          </button>
        </header>

        <section
          style={{
            textAlign: "center",
            maxWidth: 790,
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: hasSearch ? 42 : 56,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
              fontWeight: 750,
              color: "#111827",
            }}
          >
            Hitta stipendier som passar just dig
          </h1>

          <p
            style={{
              margin: "18px auto 0",
              maxWidth: 720,
              fontSize: 19,
              lineHeight: 1.7,
              color: "#374151",
            }}
          >
            Det finns tusentals stipendier i Sverige – men de kan vara svåra att
            hitta. Fundbridge hjälper dig hitta det som matchar din bakgrund,
            dina studier eller din situation.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              runSearch(q);
            }}
            style={{
              marginTop: 24,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 760,
                margin: "0 auto",
              }}
            >
              <input
                value={q}
                onChange={(e) => {
                  const value = e.target.value;
                  setQ(value);
                  fetchSuggestions(value);
                }}
                onFocus={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                placeholder="Sök t.ex. juridikstudent, utlandsstudier, behövande eller medicin"
                style={{
                  width: "100%",
                  height: 60,
                  padding: "0 120px 0 18px",
                  borderRadius: 16,
                  border: "1px solid #d8ddd8",
                  fontSize: 16,
                  boxSizing: "border-box",
                  outline: "none",
                  background: "#ffffff",
                  color: "#111827",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                }}
              />

              <button
                type="submit"
                disabled={loading}
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  height: 48,
                  padding: "0 20px",
                  borderRadius: 12,
                  border: "none",
                  cursor: loading ? "default" : "pointer",
                  background: loading ? "#93a8aa" : "#2f6f73",
                  color: "#ffffff",
                  whiteSpace: "nowrap",
                  zIndex: 30,
                  fontSize: 15,
                  fontWeight: 600,
                  boxShadow: "0 6px 18px rgba(47,111,115,0.16)",
                }}
              >
                {loading ? "Söker…" : "Sök"}
              </button>

              {showSuggestions && suggestions.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: 0,
                    right: 0,
                    background: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: 14,
                    boxShadow: "0 12px 30px rgba(17,24,39,0.08)",
                    zIndex: 20,
                    overflow: "hidden",
                    textAlign: "left",
                  }}
                >
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                      onClick={() => {
                        setQ(suggestion);
                        setShowSuggestions(false);
                        runSearch(suggestion);
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "13px 14px",
                        border: "none",
                        background: "#ffffff",
                        cursor: "pointer",
                        fontSize: 15,
                        color: "#111827",
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </form>

          <p
            style={{
              marginTop: 16,
              fontSize: 14,
              lineHeight: 1.6,
              color: "#6b7280",
            }}
          >
            Skriv till exempel juridikstudent, utlandsstudier, behövande eller
            medicin.
          </p>

          <p
            style={{
              marginTop: 10,
              fontSize: 14,
              lineHeight: 1.6,
              color: "#7b7f86",
            }}
          >
            Databasen innehåller tusentals stipendier, bidrag och stöd från
            stiftelser, organisationer och andra utlysare.
          </p>
        </section>

        {err && (
          <p
            style={{
              color: "crimson",
              marginTop: 22,
              textAlign: "center",
            }}
          >
            {err}
          </p>
        )}

        {!err && paymentCancelled && (
          <div
            style={{
              marginTop: 24,
              padding: "18px 20px",
              borderRadius: 14,
              background: "#fef3c7",
              border: "1px solid #fcd34d",
              color: "#92400e",
              textAlign: "center",
              maxWidth: 620,
              marginLeft: "auto",
              marginRight: "auto",
              boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 600 }}>
              ⚠️ Betalningen avbröts
            </div>

            <div
              style={{
                marginTop: 6,
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              Ingen debitering har skett. Du kan fortsätta söka och låsa upp när
              du vill.
            </div>

            <button
              onClick={handleCheckout}
              style={{
                marginTop: 12,
                padding: "8px 14px",
                borderRadius: 8,
                border: "none",
                background: "#92400e",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Försök igen
            </button>
          </div>
        )}

        {!err && !loading && rows.length === 0 && q.trim() && (
          <p
            style={{
              marginTop: 28,
              textAlign: "center",
              color: "#6b7280",
              fontSize: 15,
            }}
          >
            Inga träffar. Testa andra sökord.
          </p>
        )}

        {!err && !loading && total > 0 && (
          <div
            style={{
              marginTop: 34,
              marginBottom: 16,
              textAlign: "center",
              fontSize: 16,
              fontWeight: 600,
              color: "#374151",
            }}
          >
            {formatTotal(total)} stipendier hittades
          </div>
        )}

        {!err && !loading && total > 0 && !unlocked && (
          <div
            style={{
              marginTop: 20,
              padding: "30px 24px",
              borderRadius: 18,
              background: "#ffffff",
              border: "1px solid #e7e7e2",
              textAlign: "center",
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
              boxShadow: "0 10px 30px rgba(17,24,39,0.06)",
            }}
          >
            <div style={{ fontSize: 30, marginBottom: 12 }}>🔓</div>

            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              Lås upp alla stipendier
            </div>

            <div
              style={{
                fontSize: 15,
                color: "#4b5563",
                lineHeight: 1.6,
              }}
            >
              Du har hittat {formatTotal(total)} stipendier som matchar din
              sökning.
            </div>

            <div
              style={{
                marginTop: 10,
                fontSize: 15,
                color: "#4b5563",
                lineHeight: 1.6,
              }}
            >
              Få full tillgång till alla resultat, detaljer och
              ansökningsinformation.
            </div>

            <div
              style={{
                marginTop: 18,
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              39 kr
            </div>

            <div
              style={{
                marginTop: 4,
                fontSize: 14,
                color: "#6b7280",
              }}
            >
              Engångsbetalning • tillgång i 30 dagar
            </div>

            <button
              onClick={handleCheckout}
              disabled={isStartingCheckout}
              style={{
                marginTop: 20,
                height: 46,
                padding: "0 24px",
                borderRadius: 12,
                border: "none",
                background: "#2f6f73",
                color: "#fff",
                fontWeight: 600,
                cursor: isStartingCheckout ? "default" : "pointer",
                fontSize: 16,
                boxShadow: "0 6px 18px rgba(47,111,115,0.18)",
                opacity: isStartingCheckout ? 0.8 : 1,
              }}
            >
              {isStartingCheckout ? "Startar betalning..." : "Få tillgång direkt"}
            </button>

            <div
              style={{
                marginTop: 12,
                fontSize: 13,
                color: "#9ca3af",
                lineHeight: 1.5,
              }}
            >
              Ingen prenumeration • Ingen bindningstid
            </div>
          </div>
        )}

        {rows.length > 0 && unlocked && (
          <div
            style={{
              marginTop: 24,
            }}
          >
            {rows.map((r) => {
              const tags = normalizeTags(r.tags);

              return (
                <article
                  key={r.id}
                  style={{
                    border: "1px solid #e7e7e2",
                    borderRadius: 20,
                    padding: 22,
                    marginBottom: 16,
                    background: "#ffffff",
                    boxShadow: "0 6px 24px rgba(17,24,39,0.03)",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 22,
                      lineHeight: 1.25,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <Link
                      href={`/stipendium/${r.id}?from=${encodeURIComponent(
                        q.trim()
                      )}`}
                      style={{ textDecoration: "none", color: "#111827" }}
                    >
                      {r.name}
                    </Link>
                  </div>

                  {r.provider && (
                    <div
                      style={{
                        marginTop: 7,
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
                        marginTop: 12,
                        lineHeight: 1.65,
                        color: "#374151",
                        fontSize: 15,
                      }}
                    >
                      {r.summary}
                    </div>
                  )}

                  {tags.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginTop: 15,
                      }}
                    >
                      {tags.map((tag) => (
                        <Link
                          key={`${r.id}-${tag}`}
                          href={`/?q=${encodeURIComponent(tag)}`}
                          style={{
                            textDecoration: "none",
                            padding: "6px 11px",
                            borderRadius: 999,
                            background: "#eef4f4",
                            color: "#234f52",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  )}

                  <div
                    style={{
                      marginTop: 16,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      href={`/stipendium/${r.id}?from=${encodeURIComponent(
                        q.trim()
                      )}`}
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        textDecoration: "none",
                        color: "#2f6f73",
                      }}
                    >
                      Läs mer →
                    </Link>

                    <div
                      style={{
                        fontSize: 12,
                        color: "#9ca3af",
                      }}
                    >
                      Visa detaljer
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomePageContent />
    </Suspense>
  );
}