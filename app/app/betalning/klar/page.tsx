"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function PaymentSuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function confirmPayment() {
      try {
        if (!sessionId) {
          setStatus("error");
          return;
        }

        const res = await fetch(
          `/api/checkout/confirm?session_id=${encodeURIComponent(sessionId)}`
        );

        const data = await res.json();

        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || "Could not confirm payment");
        }

        setQuery(typeof data?.query === "string" ? data.query : "");
        setStatus("success");
      } catch (error) {
        console.error("Payment confirm error:", error);
        setStatus("error");
      }
    }

    confirmPayment();
  }, [sessionId]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f6f6f4",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: "#111827",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          background: "#ffffff",
          border: "1px solid #e7e7e2",
          borderRadius: 20,
          padding: "32px 28px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(17,24,39,0.06)",
        }}
      >
        {status === "loading" && (
          <>
            <div style={{ fontSize: 30, marginBottom: 12 }}>⏳</div>
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Bekräftar din betalning
            </h1>
            <p
              style={{
                marginTop: 14,
                fontSize: 15,
                lineHeight: 1.7,
                color: "#4b5563",
              }}
            >
              Vänta en liten stund medan vi aktiverar din tillgång.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div style={{ fontSize: 30, marginBottom: 12 }}>✨</div>
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Betalningen är klar
            </h1>
            <p
              style={{
                marginTop: 14,
                fontSize: 15,
                lineHeight: 1.7,
                color: "#4b5563",
              }}
            >
              Din tillgång är nu aktiv i 30 dagar på denna enhet.
            </p>

            <Link
              href={query ? `/?q=${encodeURIComponent(query)}` : "/"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                height: 46,
                padding: "0 22px",
                borderRadius: 10,
                background: "#2f6f73",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 15,
                boxShadow: "0 6px 18px rgba(47,111,115,0.18)",
              }}
            >
              Se dina resultat
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div style={{ fontSize: 30, marginBottom: 12 }}>⚠️</div>
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Något gick fel
            </h1>
            <p
              style={{
                marginTop: 14,
                fontSize: 15,
                lineHeight: 1.7,
                color: "#4b5563",
              }}
            >
              Vi kunde inte bekräfta betalningen just nu.
            </p>

            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                height: 46,
                padding: "0 22px",
                borderRadius: 10,
                background: "#2f6f73",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 15,
                boxShadow: "0 6px 18px rgba(47,111,115,0.18)",
              }}
            >
              Till startsidan
            </Link>
          </>
        )}
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessPageContent />
    </Suspense>
  );
}


