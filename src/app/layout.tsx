import type { Metadata, Viewport } from "next";
import "@/os/theme.css";
import { pageMetadata } from "./pageMetadata";

const description = "I'm Jack, a software developer. Have a look at my work, experience and projects on an early-2000s style desktop.";

// Absolute base for card image URLs: SITE_URL when set, else Vercel's production domain.
const siteUrl = process.env.SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = { metadataBase: new URL(siteUrl), ...pageMetadata("Jack Keirnan | JackOS", description) };

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f4596",
};

/** Root HTML shell shared by JackOS and the plain view. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
