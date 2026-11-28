import { ImageResponse } from "next/og";

// social preview size Open Graph and X/Twitter recommend
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "JackOS – Jack Keirnan's portfolio as an early-2000s desktop";

/** social preview for every page - a JackOS window on the aurora wallpaper, made at build time */
export default function OpenGraphImage() {
  // window chrome reuses the theme colours so the preview looks like the site
  const bevel = { borderStyle: "solid", borderWidth: 4, borderColor: "#ffffff #3b3326 #3b3326 #ffffff" } as const;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #0b1f4a 0%, #1a5f9e 55%, #2fa8b8 85%, #3fd0c9 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 860, background: "#e8e2d4", padding: 6, ...bevel }}>
          <div
            style={{
              display: "flex",
              padding: "12px 18px",
              background: "linear-gradient(90deg, #0f4596, #1d7f8c)",
              color: "#ffffff",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            JackOS – Welcome
          </div>
          <div style={{ display: "flex", flexDirection: "column", margin: 12, padding: "36px 40px", background: "#ffffff" }}>
            <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#0f4596" }}>Hi! I&apos;m Jack.</div>
            <div style={{ display: "flex", marginTop: 16, fontSize: 34, color: "#1a2633" }}>
              Software developer – web, freelance and games
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
