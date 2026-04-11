import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.fundbridge.se",
      lastModified: new Date(),
    },
    {
      url: "https://www.fundbridge.se/om-fundbridge",
    },
    {
      url: "https://www.fundbridge.se/kontakt",
    },
    {
      url: "https://www.fundbridge.se/soka-stipendium",
    },
    {
      url: "https://www.fundbridge.se/stipendier-sverige",
    },
    {
      url: "https://www.fundbridge.se/stipendier-studenter",
    },

    // SEO pages
    {
      url: "https://www.fundbridge.se/stipendium-2026",
    },
    {
      url: "https://www.fundbridge.se/stipendium-lista",
    },
    {
      url: "https://www.fundbridge.se/stipendier-utlandsstudier",
    },
    {
      url: "https://www.fundbridge.se/stipendier-juridikstudent",
    },
    {
      url: "https://www.fundbridge.se/stipendier-medicin",
    },
    {
      url: "https://www.fundbridge.se/stipendier-behovande",
    },
    {
      url: "https://www.fundbridge.se/stipendier-stockholm",
    },
    {
      url: "https://www.fundbridge.se/stipendier-uppsala",
    },
    {
      url: "https://www.fundbridge.se/stipendier-lund",
    },
  ];
}