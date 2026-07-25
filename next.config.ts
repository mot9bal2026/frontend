import type { NextConfig } from "next";

const immutableCache = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [65, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080],
    imageSizes: [64, 96, 128, 256, 384],
  },
  async headers() {
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
        source: "/awafi-logo-icon.webp",
        headers: immutableCache,
      },
      {
        source: "/awafi-logo-icon-44.webp",
        headers: immutableCache,
      },
      {
        source: "/awafi-oil-bottle.webp",
        headers: immutableCache,
      },
      {
        source: "/pain-relief-oil-product.webp",
        headers: immutableCache,
      },
    ];
  },
};

export default nextConfig;
