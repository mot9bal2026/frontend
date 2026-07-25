import type { NextConfig } from "next";

const immutableCache = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [65, 75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1600],
    imageSizes: [64, 96, 128, 256, 384],
  },
  async headers() {
    // Long-lived cache only for static public assets (avoid /_next/* in dev).
    return [
      {
        source: "/results-carousel/:path*",
        headers: immutableCache,
      },
      {
        source: "/images/:path*",
        headers: immutableCache,
      },
      {
        source: "/awafi-oil-bottle.webp",
        headers: immutableCache,
      },
    ];
  },
};

export default nextConfig;
