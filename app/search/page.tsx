import type { Metadata } from "next";
import { Suspense } from "react";
import SearchPageClient from "@/components/SearchPageClient";
import { SITE_URL } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "検索",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/search",
  },
  openGraph: {
    url: `${SITE_URL}/search`,
  },
};

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageClient />
    </Suspense>
  );
}
