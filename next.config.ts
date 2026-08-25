import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pagesへの完全静的サイトとしてデプロイするため、
  // Next.jsのImage Optimizationサーバーに依存しない構成にする。
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.cms.supa.dev",
      },
      {
        // 移行元(ziroramen.jp)を参照する本文中の画像URL互換用
        protocol: "https",
        hostname: "ziroramen.jp",
      },
    ],
  },
};

export default nextConfig;
