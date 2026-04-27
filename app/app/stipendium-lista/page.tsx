import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stipendier lista | Alla stipendier i Sverige | Fundbridge",
  description:
    "Se en lista över stipendier i Sverige. Hitta stipendier för studenter, privatpersoner och olika behov snabbt med Fundbridge.",
  openGraph: {
    title: "Stipendier lista | Fundbridge",
    description:
      "Lista över stipendier i Sverige för studenter och privatpersoner.",
    url: "https://www.fundbridge.se/stipendium-lista",
    siteName: "Fundbridge",
    locale: "sv_SE",
    type: "website",
  },
};

export default function StipendiumListaPage() {
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
              fontSize: 42,
              fontWeight: 800,
              margin: 0,
            }}
          >
            Stipendier lista – hitta alla stipendier i Sverige
          </h1>

          <p style={{ marginTop: 18, fontSize: 18, lineHeight: 1.7 }}>
            Letar du efter en lista över stipendier i Sverige? Det finns tusentals
            stipendier från stiftelser, organisationer och andra aktörer, men de
            är ofta utspridda och svåra att få överblick över.
          </p>

          <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.7 }}>
            Fundbridge samlar stipendier i en databas där du kan söka och se hur
            många som matchar din situation. Du slipper leta manuellt och får en
            tydligare bild av vilka möjligheter som finns.
          </p>

          <h2 style={{ marginTop: 32 }}>Exempel på stipendier</h2>

          <ul style={{ lineHeight: 1.8, marginTop: 12 }}>
            <li>Stipendier för studenter</li>
            <li>Stipendier för utlandsstudier</li>
            <li>Stipendier för behövande</li>
            <li>Stipendier inom kultur och forskning</li>
            <li>Stipendier kopplade till specifika yrken</li>
          </ul>

          <h2 style={{ marginTop: 32 }}>Hur hittar man rätt stipendium?</h2>

          <p style={{ marginTop: 12, lineHeight: 1.7 }}>
            Det bästa sättet är att söka brett och sedan filtrera. Testa olika
            sökord som beskriver din situation, till exempel din utbildning,
            ekonomi eller vad du vill använda pengarna till.
          </p>

          <div
            style={{
              marginTop: 30,
              padding: 20,
              borderRadius: 16,
              background: "#f8faf9",
            }}
          >
            <h3 style={{ margin: 0 }}>Sök stipendier direkt</h3>

            <p style={{ marginTop: 8 }}>
              Sök bland stipendier i Sverige och se hur många du kan få tillgång
              till.
            </p>

            <Link
              href="/?q=stipendium"
              style={{
                display: "inline-block",
                marginTop: 10,
                background: "#2f6f73",
                color: "#fff",
                padding: "10px 16px",
                borderRadius: 10,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Sök stipendier
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}

