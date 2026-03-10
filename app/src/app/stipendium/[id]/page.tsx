"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

type AnyRecord = Record<string, any>;

type FetchState =
  | { status: "idle" | "loading"; data: null; error: null }
  | { status: "success"; data: AnyRecord; error: null }
  | { status: "error"; data: null; error: string };

function isProbablyUrl(v: unknown): v is string {
  return typeof v === "string" && /^https?:\/\//i.test(v.trim());
}
function isEmail(v: unknown): v is string {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isIsoDateString(v: unknown): v is string {
  if (typeof v !== "string") return false;
  return /^\d{4}-\d{2}-\d{2}(T.*)?$/.test(v.trim());
}
function formatDate(v: string): string {
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return d.toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
function prettifyLabel(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
function valueToDisplay(value: any): { kind: "text" | "json"; text: string } {
  if (value == null) return { kind: "text", text: "—" };
  if (typeof value === "string") return { kind: "text", text: value.trim() ? value : "—" };
  if (typeof value === "number" || typeof value === "boolean")
    return { kind: "text", text: String(value) };
  try {
    return { kind: "json", text: JSON.stringify(value, null, 2) };
  } catch {
    return { kind: "text", text: String(value) };
  }
}

export default function StipendiumDetailPage() {
  const params = useParams<{ id?: string | string[] }>();
  const rawId = params?.id;

  const id = useMemo(() => {
    if (Array.isArray(rawId)) return rawId[0];
    return rawId;
  }, [rawId]);

  const [state, setState] = useState<FetchState>({
    status: "idle",
    data: null,
    error: null,
  });

  useEffect(() => {
    if (!id) {
      setState({
        status: "error",
        data: null,
        error: "Saknar stipendie-id i URL:en. Kontrollera att du är på /stipendium/<id>.",
      });
      return;
    }

    let alive = true;
    setState({ status: "loading", data: null, error: null });

    (async () => {
      const { data, error } = await supabase
        .from("scholarships")
        .select("*")
        .eq("id", id)
        .limit(1)
        .maybeSingle();

      if (!alive) return;

      if (error) {
        setState({ status: "error", data: null, error: error.message });
        return;
      }
      if (!data) {
        setState({ status: "error", data: null, error: `Hittade inget stipendium med id=${id}` });
        return;
      }

      setState({ status: "success", data, error: null });
    })();

    return () => {
      alive = false;
    };
  }, [id]);

  const scholarship = state.status === "success" ? state.data : null;

  const top = useMemo(() => {
    if (!scholarship) return null;

    // Dessa finns i din tabell enligt CSV:n
    const name = scholarship.name ?? `Stipendium #${id}`;
    const provider = scholarship.provider ?? "";
    const providerWebsite = scholarship.provider_website ?? "";
    const sourceUrl = scholarship.source_url ?? "";
    const summary = scholarship.summary ?? "";
    const purpose = scholarship.purpose ?? "";
    const geography = scholarship.geography ?? "";
    const applicantType = scholarship.applicant_type ?? "";
    const economyType = scholarship.economy_type ?? "";
    const targetGroup = scholarship.target_group ?? "";
    const updatedAt = scholarship.updated_at ?? scholarship.created_at ?? "";

    return {
      name: String(name),
      provider: provider ? String(provider) : "",
      providerWebsite: providerWebsite ? String(providerWebsite) : "",
      sourceUrl: sourceUrl ? String(sourceUrl) : "",
      summary: summary ? String(summary) : "",
      purpose: purpose ? String(purpose) : "",
      geography: geography ? String(geography) : "",
      applicantType: applicantType ? String(applicantType) : "",
      economyType: economyType ? String(economyType) : "",
      targetGroup: targetGroup ? String(targetGroup) : "",
      updatedAt: updatedAt ? String(updatedAt) : "",
    };
  }, [scholarship, id]);

  const allFields = useMemo(() => {
    if (!scholarship) return [];

    // Lägg de viktigaste först, resten alfabetiskt
    const preferred = [
      "id",
      "name",
      "provider",
      "provider_website",
      "source_url",
      "summary",
      "purpose",
      "raw_text",
      "keywords",
      "organization_type",
      "organization_number",
      "contact_email",
      "contact_phone",
      "funding_source_type",
      "target_group",
      "applicant_type",
      "geography",
      "economy_type",
      "created_at",
      "updated_at",
    ];

    const keys = Object.keys(scholarship);
    const preferredPresent = preferred.filter((k) => keys.includes(k));
    const rest = keys.filter((k) => !preferredPresent.includes(k)).sort((a, b) => a.localeCompare(b, "sv"));

    return [...preferredPresent, ...rest].map((k) => ({ key: k, value: scholarship[k] }));
  }, [scholarship]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline">
          ← Tillbaka till sök
        </Link>
        <div className="text-xs text-gray-500">ID: {id ?? "—"}</div>
      </div>

      {state.status === "loading" && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="h-6 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-gray-200" />
          <div className="mt-6 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-10/12 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      )}

      {state.status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <div className="text-sm font-semibold text-red-700">Kunde inte ladda stipendiet</div>
          <div className="mt-2 whitespace-pre-wrap text-sm text-red-700">{state.error}</div>
        </div>
      )}

      {state.status === "success" && scholarship && (
        <>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold leading-tight">{top?.name ?? "Stipendium"}</h1>

            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
              {top?.provider && (
                <div>
                  <span className="text-gray-500">Utdelare:</span>{" "}
                  <span className="font-medium">{top.provider}</span>
                </div>
              )}

              {top?.targetGroup && (
                <div>
                  <span className="text-gray-500">Målgrupp:</span>{" "}
                  <span className="font-medium">{top.targetGroup}</span>
                </div>
              )}

              {top?.applicantType && (
                <div>
                  <span className="text-gray-500">Sökande:</span>{" "}
                  <span className="font-medium">{top.applicantType}</span>
                </div>
              )}

              {top?.economyType && (
                <div>
                  <span className="text-gray-500">Typ:</span>{" "}
                  <span className="font-medium">{top.economyType}</span>
                </div>
              )}

              {top?.geography && (
                <div>
                  <span className="text-gray-500">Geografi:</span>{" "}
                  <span className="font-medium">{top.geography}</span>
                </div>
              )}

              {top?.updatedAt && (
                <div>
                  <span className="text-gray-500">Uppdaterad:</span>{" "}
                  <span className="font-medium">
                    {isIsoDateString(top.updatedAt) ? formatDate(top.updatedAt) : top.updatedAt}
                  </span>
                </div>
              )}

              {top?.providerWebsite && isProbablyUrl(top.providerWebsite) && (
                <div>
                  <span className="text-gray-500">Utdelare:</span>{" "}
                  <a href={top.providerWebsite} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline">
                    Webbplats
                  </a>
                </div>
              )}

              {top?.sourceUrl && isProbablyUrl(top.sourceUrl) && (
                <div>
                  <span className="text-gray-500">Källa:</span>{" "}
                  <a href={top.sourceUrl} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline">
                    Öppna
                  </a>
                </div>
              )}
            </div>

            {top?.summary && <p className="mt-4 whitespace-pre-wrap text-base text-gray-800">{top.summary}</p>}
            {!top?.summary && top?.purpose && (
              <p className="mt-4 whitespace-pre-wrap text-base text-gray-800">{top.purpose}</p>
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2 className="text-lg font-semibold">All data vi har</h2>
              <div className="text-xs text-gray-500">{allFields.length} fält</div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {allFields.map(({ key, value }) => {
                  const v = valueToDisplay(value);

                  const renderValue = () => {
                    if (isProbablyUrl(value)) {
                      return (
                        <a href={value} target="_blank" rel="noreferrer" className="break-all text-blue-600 hover:underline">
                          {value}
                        </a>
                      );
                    }
                    if (isEmail(value)) {
                      return (
                        <a href={`mailto:${value}`} className="break-all text-blue-600 hover:underline">
                          {value}
                        </a>
                      );
                    }
                    if (isIsoDateString(value)) return <span>{formatDate(value)}</span>;

                    if (v.kind === "json") {
                      return (
                        <pre className="max-h-64 overflow-auto rounded-lg bg-gray-50 p-3 text-xs leading-relaxed text-gray-800">
                          {v.text}
                        </pre>
                      );
                    }

                    return <div className="whitespace-pre-wrap break-words">{v.text}</div>;
                  };

                  return (
                    <div key={key} className="border-t border-gray-100 p-4 md:border-t-0 md:border-l md:border-gray-100">
                      <div className="mb-1 text-xs font-semibold tracking-wide text-gray-500">{prettifyLabel(key)}</div>
                      <div className="text-sm text-gray-900">{renderValue()}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Visar alla fält från <span className="font-mono">public.scholarships</span>.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
