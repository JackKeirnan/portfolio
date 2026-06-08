import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Local-only workaround: webpack's scope-hoisting (module concatenation) step
  // fails with "Unexpected end of JSON input" when building the large vendor
  // chunks (framer-motion / motion / MUI) from this OneDrive-synced path.
  // Disabling concatenation makes `next build` work locally; bundle-size impact
  // is negligible for this site. Cloud builds (Vercel) are unaffected, so this
  // can be removed if you only ever build there.
  webpack: (config) => {
    config.optimization.concatenateModules = false;
    return config;
  },
};

export default nextConfig;
