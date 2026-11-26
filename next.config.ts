import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Local workaround: builds from a OneDrive path fail with "Unexpected end of JSON input"
  // during module concatenation. Vercel is unaffected; remove once off OneDrive.
  webpack: (config) => {
    config.optimization.concatenateModules = false;
    return config;
  },
};

export default nextConfig;
