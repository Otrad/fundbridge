export const metadata = {
  title: "Söka stipendium i Sverige | Fundbridge",
  description:
    "Sök stipendium i Sverige snabbare med Fundbridge. Hitta relevanta stipendier utan att leta manuellt.",
};

export default function SokaStipendiumPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Söka stipendium i Sverige</h1>

      <p className="mb-4">
        Vill du söka stipendium i Sverige? Fundbridge hjälper dig hitta
        relevanta stipendier snabbare utan att du behöver leta manuellt på många
        olika sidor.
      </p>

      <p className="mb-6">
        Du kan söka gratis och låsa upp alla resultat för 39 kr i 30 dagar.
        Ingen prenumeration.
      </p>

      <a href="/" className="underline font-medium">
        Sök stipendier direkt
      </a>
    </main>
  );
}