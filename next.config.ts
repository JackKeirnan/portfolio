import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Local-only workaround: `next build` fails with "Unexpected end of JSON input"
  // during module concatenation when built from a OneDrive-synced path.
  // It does not affect Vercel builds; remove it if the repo leaves OneDrive.
  webpack: (config) => {
    config.optimization.concatenateModules = false;
    return config;
  },
};

export default nextConfig;
