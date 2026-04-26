import Link from "next/link";

export default function AboutPage() {
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
          padding: "28px 20px 72px",
        }}
      >
        <div style={{ marginBottom: 28 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              textDecoration: "none",
              color: "#4b5563",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            ← Tillbaka till sök
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 38,
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              fontSize: 20,
              fontWeight: 750,
              letterSpacing: "-0.03em",
              color: "#2f6f73",
            }}
          >
            Fundbridge
          </Link>
        </div>

        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 48,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              fontWeight: 750,
            }}
          >
            Om Fundbridge
          </h1>

          <p
            style={{
              marginTop: 24,
              fontSize: 19,
              lineHeight: 1.9,
              color: "#374151",
            }}
          >
            Fundbridge är byggt för att göra det enklare att hitta stipendier,
            bidrag och stöd som annars kan vara svåra att upptäcka.
          </p>

          <p
            style={{
              marginTop: 20,
              fontSize: 18,
              lineHeight: 1.9,
              color: "#4b5563",
            }}
          >
            Fundbridge är en matchnings- och söktjänst som hjälper dig hitta det
            som passar din bakgrund, dina studier eller din situation. Tjänsten
            samlar information från stiftelser, organisationer, universitet och
            andra utlysare för att göra sökandet enklare och mer överskådligt.
          </p>

          <p
            style={{
              marginTop: 20,
              fontSize: 18,
              lineHeight: 1.9,
              color: "#4b5563",
            }}
          >
            Själva ansökan sker vanligtvis hos stiftelsen, organisationen,
            universitetet eller den ursprungliga utlysaren – inte direkt via
            Fundbridge.
          </p>

          <p
            style={{
              marginTop: 36, // 👈 extra luft här
              fontSize: 18,
              lineHeight: 1.9,
              color: "#4b5563",
            }}
          >
            När du låser upp Fundbridge får du full tillgång till alla resultat,
            detaljer och ansökningsinformation i 30 dagar. Tillgången gäller på
            den enhet och i den webbläsare du använder vid betalning.
          </p>

          <p
            style={{
              marginTop: 20,
              fontSize: 18,
              lineHeight: 1.9,
              color: "#4b5563",
            }}
          >
            Det finns ingen prenumeration eller bindningstid – du betalar en gång
            och får tillgång direkt.
          </p>
        </div>
      </div>
    </main>
  );
}