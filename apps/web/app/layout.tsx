import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scribly - Hand-drawn Whiteboarding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
         href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"
        />
      </head>
      <body className="bg-paper text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
