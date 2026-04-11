import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stipendier för behövande | Fundbridge",
  description:
    "Hitta stipendier för ekonomiskt behövande och personer i särskilda situationer.",
};

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Stipendier för behövande</h1>
      <p>
        Många stipendier riktar sig till personer med ekonomiska behov eller
        särskilda livssituationer.
      </p>

      <Link href="/?q=behövande">Sök stipendier</Link>
    </main>
  );
}