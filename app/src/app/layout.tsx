import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FundBridge",
  description: "Hitta stipendier och finansiering",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>
        {children}

        <footer className="mt-16 border-t pt-6 text-sm">
          <p className="mb-2 font-medium">Populära sidor</p>
          <div className="flex flex-col gap-1">
            <a href="/soka-stipendium">Söka stipendium</a>
            <a href="/stipendier-studenter">Stipendier för studenter</a>
            <a href="/stipendier-sverige">Stipendier i Sverige</a>
          </div>
        </footer>

      </body>
    </html>
  );
}