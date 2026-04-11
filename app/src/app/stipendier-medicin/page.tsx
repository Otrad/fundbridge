import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stipendier medicin | Fundbridge",
  description:
    "Sök stipendier för medicinstudenter och personer inom vård och forskning.",
};

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Stipendier inom medicin</h1>
      <p>
        Det finns många stipendier för medicinstudenter och forskning inom
        vård.
      </p>

      <Link href="/?q=medicin">Sök stipendier</Link>
    </main>
  );
}