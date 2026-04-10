import Link from "next/link";

export default function ContactPage() {
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
            marginBottom: 44,
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              fontSize: 22,
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
            Kontakt
          </h1>

          <p
            style={{
              marginTop: 24,
              fontSize: 18,
              lineHeight: 1.8,
              color: "#4b5563",
            }}
          >
            Har du frågor eller vill komma i kontakt med oss?
          </p>

          <a
            href="mailto:info@fundbridge.se"
            style={{
              display: "inline-block",
              marginTop: 18,
              fontSize: 20,
              fontWeight: 600,
              color: "#2f6f73",
              textDecoration: "none",
            }}
          >
            info@fundbridge.se
          </a>
        </div>
      </div>
    </main>
  );
}