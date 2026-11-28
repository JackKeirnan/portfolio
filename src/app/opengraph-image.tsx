import { ImageResponse } from "next/og";

// social preview size Open Graph and X/Twitter recommend
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "JackOS – Jack Keirnan's portfolio as an early-2000s desktop";

/** social preview for every page - a JackOS window on the aurora wallpaper, made at build time */
export default function OpenGraphImage() {
  // window chrome reuses the theme colours so the preview looks like the site
  const bevel = { borderStyle: "solid", borderWidth: 4, borderColor: "#ffffff #3a2a4f #3a2a4f #ffffff" } as const;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #24103a 0%, #4b2a6b 60%, #7a4f9e 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 860, background: "#e6dff0", padding: 6, ...bevel }}>
          <div
            style={{
              display: "flex",
              padding: "12px 18px",
              background: "linear-gradient(90deg, #4b1f7a, #8a4fc0)",
              color: "#ffffff",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            JackOS – Welcome
          </div>
          <div style={{ display: "flex", flexDirection: "column", margin: 12, padding: "36px 40px", background: "#ffffff" }}>
            <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#4b1f7a" }}>Hi! I&apos;m Jack.</div>
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
