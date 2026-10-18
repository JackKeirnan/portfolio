import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jack Keirnan's Portfolio",
  description: "Showcase of my work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={"font-mono"}
      >
        {children}
      </body>
    </html>
  );
}
