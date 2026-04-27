import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stipendier juridikstudent | Fundbridge",
  description:
    "Hitta stipendier för juridikstudenter i Sverige. Sök stipendier som passar din utbildning och bakgrund.",
};

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Stipendier för juridikstudenter</h1>
      <p>
        Det finns stipendier riktade till juridikstudenter baserat på studier,
        ekonomi och bakgrund.
      </p>

      <Link href="/?q=juridikstudent">Sök stipendier</Link>
    </main>
  );
}

