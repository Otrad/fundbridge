import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stipendier Uppsala | Fundbridge",
  description:
    "Sök stipendier i Uppsala för studenter och privatpersoner. Hitta stipendier kopplade till Uppsala universitet och regionen.",
};

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Stipendier i Uppsala</h1>

      <p>
        Uppsala är en av Sveriges största studentstäder och det finns många
        stipendier kopplade till både universitetet och olika stiftelser i
        regionen.
      </p>

      <p>
        Många stipendier riktar sig till studenter vid Uppsala universitet,
        men det finns även möjligheter baserat på bakgrund, ekonomi och
        studieinriktning.
      </p>

      <Link href="/?q=uppsala">Sök stipendier</Link>
    </main>
  );
}


