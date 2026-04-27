import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stipendier för utlandsstudier | Fundbridge",
  description:
    "Letar du efter stipendier för utlandsstudier? Hitta stipendier i Sverige för studier utomlands och se vilka möjligheter som passar dig.",
  openGraph: {
    title: "Stipendier för utlandsstudier | Fundbridge",
    description:
      "Hitta stipendier för utlandsstudier och studier utomlands.",
    url: "https://www.fundbridge.se/stipendier-utlandsstudier",
    siteName: "Fundbridge",
    locale: "sv_SE",
    type: "website",
  },
};

export default function StipendierUtlandsstudierPage() {
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
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
            }}
          >
            Stipendier för utlandsstudier
          </h1>

          <p style={{ marginTop: 18, fontSize: 18, lineHeight: 1.7 }}>
            Letar du efter stipendier för utlandsstudier? Det finns många
            stipendier för studenter och andra sökande som vill studera
            utomlands, men det kan vara svårt att veta var man ska börja.
            Fundbridge hjälper dig att hitta stipendier som kan passa din
            utbildning, din destination eller din situation.
          </p>

          <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.7 }}>
            Vissa stipendier riktar sig till studier i specifika länder, medan
            andra gäller utbytesstudier, språkresor, masterutbildningar eller
            längre akademiska program. Kraven varierar ofta beroende på ämne,
            ålder, studieinriktning och ibland ekonomi.
          </p>

          <h2 style={{ marginTop: 32, fontSize: 28 }}>
            Vem kan söka stipendier för studier utomlands?
          </h2>

          <p style={{ marginTop: 12, fontSize: 17, lineHeight: 1.7 }}>
            Det beror på stipendiet. Många stipendier för utlandsstudier är
            öppna för studenter vid universitet och högskolor, men det finns
            även möjligheter för exempelvis doktorander, yngre forskare och
            personer inom vissa yrkesområden.
          </p>

          <h2 style={{ marginTop: 32, fontSize: 28 }}>
            Så ökar du chansen att hitta rätt stipendium
          </h2>

          <p style={{ marginTop: 12, fontSize: 17, lineHeight: 1.7 }}>
            Testa att kombinera sökord som utlandsstudier, ditt ämne, landet du
            vill studera i och ord som student eller master. Ju mer specifik din
            sökning är, desto lättare blir det att hitta stipendier som faktiskt
            matchar dig.
          </p>

          <div
            style={{
              marginTop: 30,
              padding: 20,
              borderRadius: 16,
              background: "#f8faf9",
            }}
          >
            <h3 style={{ margin: 0 }}>Sök stipendier för utlandsstudier</h3>

            <p style={{ marginTop: 8, lineHeight: 1.7 }}>
              Se hur många stipendier som matchar din sökning och få tillgång
              till hela databasen via Fundbridge.
            </p>

            <Link
              href="/?q=utlandsstudier"
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

