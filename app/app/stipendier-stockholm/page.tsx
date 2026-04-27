import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stipendier Stockholm | Fundbridge",
  description:
    "Sök stipendier i Stockholm och hitta möjligheter baserat på din region.",
};

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Stipendier i Stockholm</h1>
      <p>
        Det finns stipendier kopplade till specifika regioner som Stockholm.
      </p>

      <Link href="/?q=stockholm">Sök stipendier</Link>
    </main>
  );
}

