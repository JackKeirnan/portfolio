import type { Metadata, Viewport } from "next";
import "@/os/theme.css";

export const metadata: Metadata = {
  title: "Jack Keirnan | JackOS",
  description: "Jack Keirnan, software developer: work, experience and projects, presented as an early-2000s style desktop.",
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
