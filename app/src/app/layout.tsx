import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fundbridge",
  description: "Hitta stipendier och finansiering",
  verification: {
    google: "WpYlViWtZogXAzFlNn6WJtqbthlucIvIedr7pjVnmE0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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