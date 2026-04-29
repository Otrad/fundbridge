"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function PaymentSuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      window.location.href = `/api/checkout/confirm?session_id=${encodeURIComponent(
        sessionId
      )}`;
      return;
    }

    window.location.href = "/?payment=missing_session";
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
          maxWidth: 520,
          background: "#ffffff",
          border: "1px solid #e7e7e2",
          borderRadius: 20,
          padding: "32px 28px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(17,24,39,0.06)",
        }}
      >
        <div style={{ fontSize: 30, marginBottom: 12 }}>⏳</div>

        <h1
          style={{
            margin: 0,
            fontSize: 28,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          Aktiverar din tillgång
        </h1>

        <p
          style={{
            marginTop: 14,
            fontSize: 15,
            lineHeight: 1.7,
            color: "#4b5563",
          }}
        >
          Vänta en liten stund medan vi bekräftar betalningen.
        </p>
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