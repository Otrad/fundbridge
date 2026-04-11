import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.fundbridge.se";
  const now = new Date();

  return [
    // Huvudsidor
    { url: base, lastModified: now },
    { url: `${base}/om-fundbridge`, lastModified: now },
    { url: `${base}/kontakt`, lastModified: now },
    { url: `${base}/soka-stipendium`, lastModified: now },

    // Kategorisidor
    { url: `${base}/stipendier-sverige`, lastModified: now },
    { url: `${base}/stipendier-studenter`, lastModified: now },

    // SEO-artiklar
    { url: `${base}/stipendium-2026`, lastModified: now },
    { url: `${base}/stipendium-lista`, lastModified: now },

    // 🔥 Nya SEO-slugs
    { url: `${base}/sok/juridikstudent`, lastModified: now },
    { url: `${base}/sok/medicin`, lastModified: now },
    { url: `${base}/sok/utlandsstudier`, lastModified: now },
    { url: `${base}/sok/behovande`, lastModified: now },

    // 🔥 Städer (bra SEO)
    { url: `${base}/sok/stockholm`, lastModified: now },
    { url: `${base}/sok/uppsala`, lastModified: now },
    { url: `${base}/sok/lund`, lastModified: now },
  ];
}