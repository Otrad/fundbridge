import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { getAccessState } from "@/app/lib/access";

type Scholarship = {
  id: string;
  name: string | null;
  provider: string | null;
  summary: string | null;
  purpose: string | null;
  field_of_studies: string | null;
  target_group: string | null;
  geography: string | null;
  tags: string[] | string | null;
  who_can_apply: string | null;
  application: string | null;
  application_url: string | null;
  application_procedure: string | null;
  application_instructions: string | null;
  documents_required: string | null;
  amount_min: number | null;
  amount_max: number | null;
  currency: string | null;
  number_of_awards: number | null;
  frequency: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  provider_website: string | null;
  source_url: string | null;
  specific_requirements: string | null;
  selection_criteria: string | null;
  study_level: string | null;
  type_of_studies: string | null;
  country_of_study: string | null;
  gender_requirement: string | null;
  age_group: string | null;
  nationality_required: string | null;
  residence_required: string | null;
  university_required: string | null;
  raw_text: string | null;
  structured_json: unknown;
};

function cleanText(value: string | null | undefined) {
  if (!value) return "";

  return value
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function normalizeDisplayValue(value: string | null | undefined) {
  const cleaned = cleanText(value);
  if (!cleaned) return "";

  const normalized = cleaned.toLowerCase();

  const invalidValues = [
    "okänd",
    "unknown",
    "n/a",
    "na",
    "ej angivet",
    "ej specificerat",
    "saknas",
    "annat/okänd",
    "annan/okänd",
    "-",
    "allmän/okänd",
  ];

  if (invalidValues.includes(normalized)) {
    return "";
  }

  return cleaned;
}

function toParagraphs(value: string | null | undefined) {
  const text = cleanText(value);
  if (!text) return [];

  return text
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean);
}

function formatAmount(value: number | null | undefined) {
  if (value == null) return null;
  return new Intl.NumberFormat("sv-SE").format(value);
}

function formatAmountRange(
  min: number | null | undefined,
  max: number | null | undefined,
  currency: string | null | undefined
) {
  const formattedMin = formatAmount(min);
  const formattedMax = formatAmount(max);
  const currencyLabel = cleanText(currency) || "SEK";

  if (formattedMin && formattedMax) {
    return `${formattedMin} – ${formattedMax} ${currencyLabel}`;
  }

  if (formattedMin) {
    return `Från ${formattedMin} ${currencyLabel}`;
  }

  if (formattedMax) {
    return `Upp till ${formattedMax} ${currencyLabel}`;
  }

  return null;
}

function normalizeTags(tags: Scholarship["tags"]) {
  if (!tags) return [];

  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

async function getScholarship(id: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are missing.");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from("scholarships")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Scholarship;
}

function FactItem({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  if (value == null) return null;
  if (typeof value === "string" && !value.trim()) return null;

  return (
    <div style={{ marginBottom: 22 }}>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#6b7280",
          letterSpacing: "0.01em",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 17,
          lineHeight: 1.5,
          color: "#111827",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Section({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  if (paragraphs.length === 0) return null;

  return (
    <section style={{ marginTop: 40 }}>
      <h2
        style={{
          fontSize: 28,
          lineHeight: 1.15,
          margin: "0 0 18px 0",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#111827",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          fontSize: 19,
          lineHeight: 1.8,
          color: "#1f2937",
        }}
      >
        {paragraphs.map((paragraph, index) => (
          <p key={index} style={{ margin: index === 0 ? 0 : "18px 0 0 0" }}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export default async function ScholarshipPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { from?: string };
}) {
  const access = await getAccessState();

  if (!access.hasAccess) {
    const fromQuery = cleanText(searchParams?.from);
    const redirectQuery = fromQuery
      ? `/?q=${encodeURIComponent(fromQuery)}`
      : "/";

    redirect(redirectQuery);
  }

  const scholarship = await getScholarship(params.id);

  if (!scholarship) {
    notFound();
  }

  const fromQuery = cleanText(searchParams?.from);
  const backHref = fromQuery ? `/?q=${encodeURIComponent(fromQuery)}` : "/";

  const tags = normalizeTags(scholarship.tags);

  const amountText = formatAmountRange(
    scholarship.amount_min,
    scholarship.amount_max,
    scholarship.currency
  );

  const summary =
    normalizeDisplayValue(scholarship.summary) ||
    normalizeDisplayValue(scholarship.purpose) ||
    normalizeDisplayValue(scholarship.who_can_apply);

  const descriptionParagraphs = toParagraphs(
    scholarship.raw_text ||
      scholarship.purpose ||
      scholarship.summary ||
      scholarship.application ||
      scholarship.application_instructions
  );

  const whoCanApplyParagraphs = toParagraphs(scholarship.who_can_apply);
  const requirementsParagraphs = toParagraphs(scholarship.specific_requirements);
  const selectionParagraphs = toParagraphs(scholarship.selection_criteria);
  const documentsParagraphs = toParagraphs(scholarship.documents_required);

  const applicationParagraphs = toParagraphs(
    scholarship.application_procedure || scholarship.application_instructions
  );

  return (
    <main
      style={{
        maxWidth: 1180,
        margin: "0 auto",
        padding: "32px 24px 80px",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: "#111827",
        background: "#ffffff",
      }}
    >
      <div style={{ marginBottom: 28 }}>
        <Link
          href={backHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            textDecoration: "none",
            color: "#4b5563",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          ← Tillbaka till resultat
        </Link>
      </div>

      <header style={{ marginBottom: 36, maxWidth: 820 }}>
        <h1
          style={{
            margin: 0,
            fontSize: 56,
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            fontWeight: 750,
            color: "#111827",
          }}
        >
          {scholarship.name || "Stipendium"}
        </h1>

        {normalizeDisplayValue(scholarship.provider) && (
          <div
            style={{
              marginTop: 14,
              fontSize: 17,
              color: "#6b7280",
              lineHeight: 1.5,
            }}
          >
            {normalizeDisplayValue(scholarship.provider)}
          </div>
        )}

        {summary && (
          <p
            style={{
              marginTop: 24,
              marginBottom: 0,
              fontSize: 30,
              lineHeight: 1.35,
              letterSpacing: "-0.02em",
              color: "#111827",
              maxWidth: 920,
            }}
          >
            {summary}
          </p>
        )}

        {tags.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 28,
            }}
          >
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/?q=${encodeURIComponent(tag)}`}
                style={{
                  textDecoration: "none",
                  padding: "9px 14px",
                  borderRadius: 999,
                  background: "#f3f4f6",
                  color: "#111827",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 320px",
          gap: 40,
          alignItems: "start",
        }}
      >
        <div>
          <Section title="Beskrivning" paragraphs={descriptionParagraphs} />
          <Section title="Vem kan söka?" paragraphs={whoCanApplyParagraphs} />
          <Section title="Krav" paragraphs={requirementsParagraphs} />
          <Section title="Urvalskriterier" paragraphs={selectionParagraphs} />
          <Section
            title="Dokument som kan krävas"
            paragraphs={documentsParagraphs}
          />

          <section
            style={{
              marginTop: 44,
              border: "1px solid #e5e7eb",
              borderRadius: 24,
              padding: "28px 28px 26px",
              background: "#fafafa",
            }}
          >
            <h2
              style={{
                margin: "0 0 14px 0",
                fontSize: 28,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                fontWeight: 700,
                color: "#111827",
              }}
            >
              Hur ansöker man?
            </h2>

            {applicationParagraphs.length > 0 ? (
              <div
                style={{
                  fontSize: 18,
                  lineHeight: 1.8,
                  color: "#1f2937",
                }}
              >
                {applicationParagraphs.map((paragraph, index) => (
                  <p key={index} style={{ margin: index === 0 ? 0 : "16px 0 0 0" }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  lineHeight: 1.8,
                  color: "#1f2937",
                }}
              >
                Fundbridge hjälper dig att hitta relevanta stipendier och förstå
                kriterierna. Själva ansökan sker vanligtvis via stiftelsen,
                universitetet eller organisationen som delar ut stipendiet.
              </p>
            )}
          </section>
        </div>

        <aside
          style={{
            position: "sticky",
            top: 24,
          }}
        >
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 24,
              padding: 24,
              background: "#fafafa",
            }}
          >
            <h2
              style={{
                margin: "0 0 22px 0",
                fontSize: 24,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                fontWeight: 700,
                color: "#111827",
              }}
            >
              Fakta
            </h2>

            <FactItem label="Målgrupp" value={normalizeDisplayValue(scholarship.target_group)} />
            <FactItem
              label="Studieområde"
              value={normalizeDisplayValue(scholarship.field_of_studies)}
            />
            <FactItem
              label="Studienivå"
              value={normalizeDisplayValue(scholarship.study_level)}
            />
            <FactItem
              label="Typ av studier"
              value={normalizeDisplayValue(scholarship.type_of_studies)}
            />
            <FactItem label="Geografi" value={normalizeDisplayValue(scholarship.geography)} />
            <FactItem label="Belopp" value={amountText} />
            <FactItem
              label="Antal stipendier"
              value={scholarship.number_of_awards ?? null}
            />
            <FactItem
              label="Land för studier"
              value={normalizeDisplayValue(scholarship.country_of_study)}
            />
            <FactItem
              label="Könskrav"
              value={normalizeDisplayValue(scholarship.gender_requirement)}
            />
            <FactItem
              label="Åldersgrupp"
              value={normalizeDisplayValue(scholarship.age_group)}
            />
            <FactItem
              label="Nationalitet"
              value={normalizeDisplayValue(scholarship.nationality_required)}
            />
            <FactItem
              label="Bosättningskrav"
              value={normalizeDisplayValue(scholarship.residence_required)}
            />
            <FactItem
              label="Universitetskrav"
              value={normalizeDisplayValue(scholarship.university_required)}
            />
            <FactItem
              label="Telefon"
              value={normalizeDisplayValue(scholarship.contact_phone)}
            />
            <FactItem
              label="E-post"
              value={normalizeDisplayValue(scholarship.contact_email)}
            />
          </div>
        </aside>
      </div>
    </main>
  );
}