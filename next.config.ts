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
        hostname: "media.cms.supa.dev",
      },
      {
        protocol: "https",
        hostname: "ziroramen.jp",
      },
    ],
  },
};

export default nextConfig;
