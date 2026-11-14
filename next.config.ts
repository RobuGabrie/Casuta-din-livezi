import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A self-contained server in .next/standalone, for the Docker image (see Dockerfile).
  output: "standalone",
  cacheComponents: true,
  images: {
    // AVIF first (smallest), WebP for browsers without AVIF; Next.js picks per browser.
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // Optimised photos are kept on the server for a month; they never change in place.
    minimumCacheTTL: 2678400,
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
