import type { Metadata, Viewport } from "next";
import "@/os/theme.css";
import { THEME_SCRIPT } from "@/os/storage";
import { pageMetadata } from "./pageMetadata";

const description = "I'm Jack, a software developer. Have a look at my work, experience and projects on an early-2000s style desktop.";

// absolute base for card image URLs - SITE_URL if set, otherwise Vercel's prod domain
const siteUrl = process.env.SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = { metadataBase: new URL(siteUrl), ...pageMetadata("Jack Keirnan | JackOS", description) };

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4b1f7a",
};

/** root html shell for JackOS and the plain view */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // THEME_SCRIPT sets data-theme before React hydrates; in <head> so every route's HTML has it, 404s included
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
