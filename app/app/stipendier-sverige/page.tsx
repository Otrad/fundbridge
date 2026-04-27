export const metadata = {
  title: "Stipendier i Sverige | Fundbridge",
  description:
    "Hitta stipendier i Sverige snabbt med Fundbridge. Sök enklare och få bättre överblick.",
};

export default function StipendierSverigePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Stipendier i Sverige</h1>

      <p className="mb-4">
        Fundbridge hjälper dig hitta stipendier i Sverige utan att du behöver
        söka manuellt på många olika webbplatser.
      </p>

      <p className="mb-6">
        Sök gratis och lås upp alla resultat för 39 kr i 30 dagar. Ingen
        prenumeration.
      </p>

      <a href="/" className="underline font-medium">
        Sök stipendier direkt
      </a>
    </main>
  );
}

