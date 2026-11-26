import type { Metadata, Viewport } from "next";
import "@/os/theme.css";

const description = "I'm Jack, a software developer. Have a look at my work, experience and projects on an early-2000s style desktop.";

export const metadata: Metadata = {
  title: "Jack Keirnan | JackOS",
  description,
  // Shared links show a card; the image comes from app/opengraph-image.tsx.
  openGraph: { type: "website", siteName: "JackOS", title: "Jack Keirnan | JackOS", description },
  twitter: { card: "summary_large_image", title: "Jack Keirnan | JackOS", description },
};

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
