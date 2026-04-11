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

function formatSlug(slug: string) {
  return slug.replace(/-/g, " ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const term = formatSlug(params.slug);

  return {
    title: `Stipendier för ${term} | Fundbridge`,
    description: `Hitta stipendier för ${term} i Sverige. Se hur många som matchar och få tillgång till hela listan.`,
  };
}

async function getData(slug: string) {
  const query = formatSlug(slug);

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.fundbridge.se";

    const res = await fetch(
      `${baseUrl}/api/search?q=${encodeURIComponent(query)}`,
      { cache: "no-store" }
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
  const term = formatSlug(params.slug);
  const data = await getData(params.slug);

  const rows: Row[] = Array.isArray(data?.results) ? data.results : [];
  const total: number = typeof data?.total === "number" ? data.total : 0;

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
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "24px 20px 72px",
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

        <article
          style={{
            marginTop: 20,
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
            Stipendier för {term}
          </h1>

          <p
            style={{
              marginTop: 18,
              fontSize: 18,
              lineHeight: 1.75,
              color: "#374151",
            }}
          >
            Här kan du hitta stipendier relaterade till {term}. Fundbridge hjälper
            dig att söka och se hur många stipendier som matchar din situation.
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
              {total > 300 ? "300+" : total} stipendier hittades
            </div>

            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.7,
                color: "#4b5563",
              }}
            >
              Se hur många stipendier som matchar {term} och få tillgång till hela
              databasen för 39 kr i 30 dagar.
            </p>

            <div style={{ marginTop: 16 }}>
              <Link
                href={`/?q=${encodeURIComponent(term)}`}
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
                Sök stipendier
              </Link>
            </div>
          </div>

          {rows.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <h2
                style={{
                  margin: "0 0 16px 0",
                  fontSize: 28,
                  lineHeight: 1.2,
                  letterSpacing: "-0.03em",
                }}
              >
                Exempel på stipendier för {term}
              </h2>

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
                      href={`/?q=${encodeURIComponent(term)}`}
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
          )}
        </article>
      </div>
    </main>
  );
}