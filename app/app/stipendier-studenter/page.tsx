export const metadata = {
  title: "Stipendier för studenter | Fundbridge",
  description:
    "Hitta stipendier för studenter i Sverige. Fundbridge gör det enklare att söka och hitta relevanta stipendier.",
};

export default function StipendierStudenterPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Stipendier för studenter</h1>

      <p className="mb-4">
        Letar du efter stipendier för studenter? Fundbridge hjälper dig hitta
        stipendier i Sverige på ett enklare sätt.
      </p>

      <p className="mb-6">
        Slipp leta mellan stiftelser, skolor och gamla webbsidor. Du kan söka
        gratis och låsa upp alla resultat för 39 kr i 30 dagar.
      </p>

      <a href="/" className="underline font-medium">
        Sök stipendier direkt
      </a>
    </main>
  );
}


