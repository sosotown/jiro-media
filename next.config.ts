import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    cpus: 1,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.spcdn.dev",
      },
      {
        protocol: "https",
        hostname: "ziroramen.jp",
      },
    ],
  },
};

export default nextConfig;
