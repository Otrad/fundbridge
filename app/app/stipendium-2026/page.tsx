import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stipendium 2026 | Hitta stipendier i Sverige | Fundbridge",
  description:
    "Letar du efter stipendium 2026? Sök bland stipendier i Sverige för studenter och privatpersoner och hitta rätt möjligheter snabbt med Fundbridge.",
  openGraph: {
    title: "Stipendium 2026 | Fundbridge",
    description:
      "Hitta stipendier 2026 i Sverige för studenter och privatpersoner.",
    url: "https://www.fundbridge.se/stipendium-2026",
    siteName: "Fundbridge",
    locale: "sv_SE",
    type: "website",
  },
};

export default function Stipendium2026Page() {
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
        <div style={{ marginBottom: 18 }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#2f6f73",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "-0.02em",
            }}
          >
            Fundbridge
          </Link>
        </div>

        <article
          style={{
            background: "#ffffff",
            border: "1px solid #e7e7e2",
            borderRadius: 22,
            padding: "32px 24px",
            boxShadow: "0 10px 30px rgba(17,24,39,0.05)",
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
            Stipendium 2026 – hitta stipendier i Sverige
          </h1>

          <p
            style={{
              marginTop: 18,
              fontSize: 18,
              lineHeight: 1.75,
              color: "#374151",
            }}
          >
            Letar du efter stipendium 2026? Det finns många stipendier i Sverige
            för studenter, privatpersoner, föreningar och andra sökande, men
            de kan vara svåra att hitta på ett ställe. Fundbridge hjälper dig
            att söka bland stipendier och se hur många som matchar din situation.
          </p>

          <p
            style={{
              marginTop: 16,
              fontSize: 17,
              lineHeight: 1.75,
              color: "#374151",
            }}
          >
            Oavsett om du söker stipendium för studier, utlandsstudier,
            ekonomiskt stöd eller ett visst ämnesområde kan det vara smart att
            börja med flera olika sökord. Många stipendier har specifika krav på
            till exempel utbildning, ålder, bostadsort eller ändamål.
          </p>

          <h2
            style={{
              marginTop: 34,
              marginBottom: 10,
              fontSize: 28,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
            }}
          >
            Vem kan söka stipendium 2026?
          </h2>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.75,
              color: "#374151",
            }}
          >
            Det beror på stipendiet. Vissa är riktade till studenter, andra till
            personer med ekonomiskt behov, särskilda yrkesinriktningar eller
            boende i en viss kommun eller region. Det finns också stipendier för
            exempelvis kultur, forskning, resor och projekt.
          </p>

          <h2
            style={{
              marginTop: 34,
              marginBottom: 10,
              fontSize: 28,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
            }}
          >
            Så hittar du rätt stipendier
          </h2>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.75,
              color: "#374151",
            }}
          >
            Ett bra första steg är att söka brett och sedan förfina med ord som
            beskriver din bakgrund. Testa till exempel sökningar som
            juridikstudent, utlandsstudier, medicin, behövande eller en viss
            ort. Ju bättre sökord du använder, desto större chans att hitta
            stipendier som faktiskt passar dig.
          </p>

          <div
            style={{
              marginTop: 30,
              padding: "22px 20px",
              borderRadius: 18,
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
              Börja söka stipendier nu
            </div>

            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.7,
                color: "#4b5563",
              }}
            >
              Sök bland stipendier i Sverige och se hur många träffar du får.
              Med Fundbridge får du tillgång till hela databasen för 39 kr i 30
              dagar.
            </p>

            <div style={{ marginTop: 16 }}>
              <Link
                href="/?q=stipendium"
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

          <h2
            style={{
              marginTop: 34,
              marginBottom: 10,
              fontSize: 28,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
            }}
          >
            Vanliga sökningar
          </h2>

          <ul
            style={{
              margin: 0,
              paddingLeft: 22,
              color: "#374151",
              lineHeight: 1.9,
              fontSize: 17,
            }}
          >
            <li>stipendium 2026</li>
            <li>stipendier studenter 2026</li>
            <li>stipendium utlandsstudier 2026</li>
            <li>stipendier i Sverige</li>
            <li>sök stipendium</li>
          </ul>
        </article>
      </div>
    </main>
  );
}


