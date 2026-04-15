import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fundbridge.se"),
  title: "Hitta stipendier i Sverige | Fundbridge",
  description:
    "Sök bland stipendier i Sverige för studenter och privatpersoner. Hitta rätt stipendium snabbt och få tillgång till hela databasen.",
  verification: {
    google: "WpYlViWtZogXAzFlNn6WJtqbthlucIvIedr7pjVnmE0",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "Hitta stipendier i Sverige | Fundbridge",
    description:
      "Sök stipendier i Sverige och hitta rätt finansiering för dina studier eller behov.",
    url: "https://www.fundbridge.se",
    siteName: "Fundbridge",
    locale: "sv_SE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hitta stipendier i Sverige | Fundbridge",
    description:
      "Sök stipendier i Sverige och hitta rätt finansiering för dina studier eller behov.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#f6f6f4",
        }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}