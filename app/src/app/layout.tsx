import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hitta stipendier i Sverige | Fundbridge",
  description:
    "Sök bland stipendier i Sverige för studenter och privatpersoner. Hitta rätt stipendium snabbt och få tillgång till hela databasen.",
  verification: {
    google: "WpYlViWtZogXAzFlNn6WJtqbthlucIvIedr7pjVnmE0",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
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
      </body>
    </html>
  );
}