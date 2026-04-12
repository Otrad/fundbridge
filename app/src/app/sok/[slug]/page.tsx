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

function formatTitle(term: string) {
  return term.charAt(0).toUpperCase() + term.slice(1);
}

function getRelatedLinks(slug: string) {
  const allLinks = [
    { label: "Stipendier för studenter", href: "/sok/studenter" },
    { label: "Stipendier för juridikstudenter", href: "/sok/juridikstudent" },
    { label: "Stipendier inom medicin", href: "/sok/medicin" },
    { label: "Stipendier i Stockholm", href: "/sok/stockholm" },
    { label: "Stipendier i Uppsala", href: "/sok/uppsala" },
    { label: "Stipendier i Lund", href: "/sok/lund" },
    { label: "Stipendier för utlandsstudier", href: "/sok/utlandsstudier" },
    { label: "Stipendier för behövande", href: "/sok/behovande" },
  ];

  return allLinks.filter((link) => link.href !== `/sok/${slug}`).slice(0, 4);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const term = formatSlug(params.slug);
  const titleTerm = formatTitle(term);
  const canonicalUrl = `https://www.fundbridge.se/sok/${params.slug}`;

  return {
    title: `Stipendier för ${titleTerm} | Fundbridge`,
    description: `Hitta stipendier för ${term} i Sverige. Jämför stipendier, se exempel och hitta relevanta finansieringsmöjligheter hos Fundbridge.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Stipendier för ${titleTerm} | Fundbridge`,
      description: `Hitta stipendier för ${term} i Sverige och se relevanta möjligheter hos Fundbridge.`,
      url: canonicalUrl,
      siteName: "Fundbridge",
      type: "website",
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
  const titleTerm = formatTitle(term);
  const data = await getData(params.slug);
  const relatedLinks = getRelatedLinks(params.slug);

  const rows: Row[] = Array.isArray(data?.results) ? data.results : [];
  const total: number = typeof data?.total === "number" ? data.total : 0;
  const displayTotal = total > 300 ? "300+" : total;

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
            Här hittar du stipendier för {term} i Sverige. Fundbridge hjälper dig
            att snabbt få en överblick över relevanta stipendier,
            finansieringsmöjligheter och stöd som kan passa din situation.
          </p>

          <p
            style={{
              marginTop: 14,
              fontSize: 16,
              lineHeight: 1.75,
              color: "#4b5563",
            }}
          >
            Oavsett om du söker stipendium för studier, utbildning, särskilda
            behov, forskning eller personliga omständigheter kan du använda
            Fundbridge för att hitta rätt bland många olika alternativ på ett och
            samma ställe.
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
                Sök stipendier för {term}
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
              Vilka stipendier finns för {term}?
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.8,
                color: "#374151",
              }}
            >
              Det finns många olika typer av stipendier för {term}. Vissa delas ut
              av stiftelser, andra av organisationer, fonder, utbildningsaktörer
              eller lokala initiativ. Kraven varierar ofta beroende på bakgrund,
              studieinriktning, ort, ekonomi eller syftet med ansökan.
            </p>

            <p
              style={{
                marginTop: 14,
                fontSize: 16,
                lineHeight: 1.8,
                color: "#374151",
              }}
            >
              Genom att söka brett och använda rätt sökord kan du hitta stipendier
              som är relevanta för just {term}. Det kan handla om både större och
              mindre belopp, men även mindre stipendier kan vara värdefulla som
              stöd under studietiden eller i samband med särskilda projekt.
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
              Så hittar du rätt stipendium för {term}
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.8,
                color: "#374151",
              }}
            >
              Ett bra första steg är att börja med en bred sökning och sedan
              jämföra flera olika stipendier. Titta på vilka krav som ställs,
              vilka målgrupper stipendiet riktar sig till och vilken typ av
              dokumentation som behövs i ansökan.
            </p>

            <p
              style={{
                marginTop: 14,
                fontSize: 16,
                lineHeight: 1.8,
                color: "#374151",
              }}
            >
              För den som söker stipendier för {term} är det ofta klokt att vara
              uppmärksam på formuleringar kring utbildning, ekonomi, studieort,
              särskilda meriter eller social situation. Ju bättre du matchar din
              ansökan mot stipendiets syfte, desto större chans har du att hitta
              rätt möjlighet.
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
              Exempel på stipendier för {term}
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
                sökning på Fundbridge för att se aktuella stipendier som matchar
                {` ${term}`}.
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
              Du kan också utforska andra vanliga sökningar för att hitta fler
              stipendier i Sverige som kan vara relevanta för din situation.
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
              Hitta stipendier för {titleTerm} hos Fundbridge
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
              Sverige. På denna sida kan du se hur många stipendier som matchar
              {` ${term}`}, få inspiration och sedan gå vidare till sökningen för
              att hitta rätt alternativ för just dig.
            </p>

            <div style={{ marginTop: 18 }}>
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
                Visa stipendier för {term}
              </Link>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}