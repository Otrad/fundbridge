import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { getAccessState } from "../../lib/access";

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

  if (invalidValues.includes(normalized)) return "";

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

  if (formattedMin && formattedMax) return `${formattedMin} – ${formattedMax} ${currencyLabel}`;
  if (formattedMin) return `Från ${formattedMin} ${currencyLabel}`;
  if (formattedMax) return `Upp till ${formattedMax} ${currencyLabel}`;

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

  if (error || !data) return null;

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
    <div className="factItem">
      <div className="factLabel">{label}</div>
      <div className="factValue">{value}</div>
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
    <section className="contentSection">
      <h2>{title}</h2>

      <div className="paragraphs">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
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
    const redirectQuery = fromQuery ? `/?q=${encodeURIComponent(fromQuery)}` : "/";
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
    <main className="page">
      <style>{`
        .page {
          min-height: 100vh;
          background: #f6f6f4;
          color: #111827;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          overflow-x: hidden;
        }

        .wrap {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 28px 20px 80px;
          box-sizing: border-box;
        }

        .back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          color: #2f6f73;
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 22px;
        }

        .card {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e7e7e2;
          border-radius: 24px;
          padding: 34px;
          box-sizing: border-box;
          overflow: hidden;
        }

        .header {
          max-width: 880px;
          margin-bottom: 34px;
        }

        .eyebrow {
          font-size: 15px;
          color: #6b7280;
          line-height: 1.5;
          margin-top: 14px;
          overflow-wrap: anywhere;
        }

        h1 {
          margin: 0;
          font-size: clamp(30px, 5vw, 56px);
          line-height: 1.08;
          letter-spacing: -0.04em;
          font-weight: 800;
          color: #111827;
          overflow-wrap: anywhere;
        }

        .summary {
          margin: 22px 0 0;
          font-size: clamp(19px, 3vw, 28px);
          line-height: 1.45;
          letter-spacing: -0.025em;
          color: #111827;
          overflow-wrap: anywhere;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }

        .tag {
          text-decoration: none;
          padding: 9px 13px;
          border-radius: 999px;
          background: #f3f4f6;
          color: #111827;
          font-size: 14px;
          font-weight: 600;
          max-width: 100%;
          overflow-wrap: anywhere;
        }

        .layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 340px;
          gap: 34px;
          align-items: start;
        }

        .content {
          min-width: 0;
        }

        .contentSection {
          margin-top: 38px;
        }

        .contentSection:first-child {
          margin-top: 0;
        }

        .contentSection h2,
        .applyBox h2,
        .facts h2 {
          margin: 0 0 14px;
          font-size: clamp(23px, 3vw, 30px);
          line-height: 1.18;
          letter-spacing: -0.03em;
          font-weight: 800;
          color: #111827;
        }

        .paragraphs {
          font-size: 18px;
          line-height: 1.8;
          color: #1f2937;
          overflow-wrap: anywhere;
        }

        .paragraphs p {
          margin: 0 0 16px;
        }

        .paragraphs p:last-child {
          margin-bottom: 0;
        }

        .applyBox {
          margin-top: 42px;
          border: 1px solid #e5e7eb;
          border-radius: 22px;
          padding: 26px;
          background: #fafafa;
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }

        .factsWrap {
          min-width: 0;
        }

        .facts {
          position: sticky;
          top: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 22px;
          padding: 24px;
          background: #fafafa;
          max-width: 100%;
          box-sizing: border-box;
        }

        .factItem {
          padding: 16px 0;
          border-top: 1px solid #e5e7eb;
          min-width: 0;
        }

        .factItem:first-of-type {
          border-top: 0;
          padding-top: 0;
        }

        .factItem:last-child {
          padding-bottom: 0;
        }

        .factLabel {
          font-size: 13px;
          font-weight: 700;
          color: #6b7280;
          letter-spacing: 0.01em;
          margin-bottom: 6px;
        }

        .factValue {
          font-size: 16px;
          line-height: 1.55;
          color: #111827;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .ctaRow {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 26px;
        }

        .buttonPrimary,
        .buttonSecondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          border-radius: 14px;
          padding: 12px 16px;
          font-size: 15px;
          font-weight: 800;
          line-height: 1.3;
          box-sizing: border-box;
        }

        .buttonPrimary {
          background: #2f6f73;
          color: white;
          box-shadow: 0 6px 18px rgba(47,111,115,0.16);
        }

        .buttonSecondary {
          background: #f3f4f6;
          color: #111827;
          border: 1px solid #e5e7eb;
        }

        @media (max-width: 860px) {
          .wrap {
            padding: 18px 12px 56px;
          }

          .card {
            border-radius: 18px;
            padding: 22px 16px;
            overflow: hidden;
          }

          .header {
            max-width: 100%;
            margin-bottom: 30px;
          }

          .layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .content {
            width: 100%;
            min-width: 0;
            order: 1;
          }

          .factsWrap {
            width: 100%;
            min-width: 0;
            order: 2;
          }

          .facts {
            position: static;
            top: auto;
            padding: 18px;
            border-radius: 18px;
            width: 100%;
          }

          .paragraphs {
            font-size: 16px;
            line-height: 1.75;
          }

          .applyBox {
            padding: 20px 16px;
            border-radius: 18px;
            width: 100%;
          }

          .ctaRow {
            flex-direction: column;
          }

          .buttonPrimary,
          .buttonSecondary {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .wrap {
            padding: 16px 10px 48px;
          }

          .card {
            padding: 18px 14px;
            border-radius: 16px;
          }

          .back {
            font-size: 14px;
            margin-bottom: 16px;
          }

          h1 {
            font-size: 30px;
            line-height: 1.12;
            letter-spacing: -0.035em;
          }

          .summary {
            font-size: 18px;
            line-height: 1.55;
          }

          .contentSection {
            margin-top: 30px;
          }

          .contentSection h2,
          .applyBox h2,
          .facts h2 {
            font-size: 23px;
          }

          .tags {
            gap: 8px;
          }

          .tag {
            font-size: 13px;
            padding: 8px 11px;
          }

          .facts {
            padding: 16px;
          }
        }
      `}</style>

      <div className="wrap">
        <Link href={backHref} className="back">
          ← Tillbaka till resultat
        </Link>

        <article className="card">
          <header className="header">
            <h1>{scholarship.name || "Stipendium"}</h1>

            {normalizeDisplayValue(scholarship.provider) && (
              <div className="eyebrow">
                {normalizeDisplayValue(scholarship.provider)}
              </div>
            )}

            {summary && <p className="summary">{summary}</p>}

            {tags.length > 0 && (
              <div className="tags">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/?q=${encodeURIComponent(tag)}`}
                    className="tag"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          <div className="layout">
            <div className="content">
              <Section title="Beskrivning" paragraphs={descriptionParagraphs} />
              <Section title="Vem kan söka?" paragraphs={whoCanApplyParagraphs} />
              <Section title="Krav" paragraphs={requirementsParagraphs} />
              <Section title="Urvalskriterier" paragraphs={selectionParagraphs} />
              <Section title="Dokument som kan krävas" paragraphs={documentsParagraphs} />

              <section className="applyBox">
                <h2>Hur ansöker man?</h2>

                {applicationParagraphs.length > 0 ? (
                  <div className="paragraphs">
                    {applicationParagraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <div className="paragraphs">
                    <p>
                      Fundbridge hjälper dig att hitta relevanta stipendier och förstå
                      kriterierna. Själva ansökan sker vanligtvis via stiftelsen,
                      universitetet eller organisationen som delar ut stipendiet.
                    </p>
                  </div>
                )}

                <div className="ctaRow">
                  <Link href={backHref} className="buttonPrimary">
                    Tillbaka till resultat
                  </Link>
                  <Link href="/" className="buttonSecondary">
                    Gör ny sökning
                  </Link>
                </div>
              </section>
            </div>

            <aside className="factsWrap">
              <div className="facts">
                <h2>Fakta</h2>

                <FactItem label="Målgrupp" value={normalizeDisplayValue(scholarship.target_group)} />
                <FactItem label="Studieområde" value={normalizeDisplayValue(scholarship.field_of_studies)} />
                <FactItem label="Studienivå" value={normalizeDisplayValue(scholarship.study_level)} />
                <FactItem label="Typ av studier" value={normalizeDisplayValue(scholarship.type_of_studies)} />
                <FactItem label="Geografi" value={normalizeDisplayValue(scholarship.geography)} />
                <FactItem label="Belopp" value={amountText} />
                <FactItem label="Antal stipendier" value={scholarship.number_of_awards ?? null} />
                <FactItem label="Land för studier" value={normalizeDisplayValue(scholarship.country_of_study)} />
                <FactItem label="Könskrav" value={normalizeDisplayValue(scholarship.gender_requirement)} />
                <FactItem label="Åldersgrupp" value={normalizeDisplayValue(scholarship.age_group)} />
                <FactItem label="Nationalitet" value={normalizeDisplayValue(scholarship.nationality_required)} />
                <FactItem label="Bosättningskrav" value={normalizeDisplayValue(scholarship.residence_required)} />
                <FactItem label="Universitetskrav" value={normalizeDisplayValue(scholarship.university_required)} />
                <FactItem label="Telefon" value={normalizeDisplayValue(scholarship.contact_phone)} />
                <FactItem label="E-post" value={normalizeDisplayValue(scholarship.contact_email)} />
              </div>
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}

