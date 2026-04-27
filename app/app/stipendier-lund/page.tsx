import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stipendier Lund | Fundbridge",
  description:
    "Hitta stipendier i Lund för studenter och privatpersoner. Sök stipendier kopplade till Lunds universitet och regionen.",
};

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Stipendier i Lund</h1>

      <p>
        Lund är en av Sveriges mest välkända studentstäder och erbjuder många
        stipendier via universitet, nationer och stiftelser.
      </p>

      <p>
        Det finns stipendier för både studenter, forskare och personer med
        särskilda behov eller inriktningar.
      </p>

      <Link href="/?q=lund">Sök stipendier</Link>
    </main>
  );
}

