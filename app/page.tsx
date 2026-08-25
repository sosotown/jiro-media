import type { Metadata } from "next";
import { getAllPublishedArticles } from "@/lib/supacms";
import { sortByPublishedDesc, paginate } from "@/lib/pagination";
import { SITE_URL } from "@/lib/siteUrl";
import ArticleListPage from "@/components/ArticleListPage";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: SITE_URL,
  },
};

export default async function Home() {
  const allArticles = sortByPublishedDesc(await getAllPublishedArticles());
  const { pageArticles, totalPages } = paginate(allArticles, 1);

  return (
    <ArticleListPage
      pageArticles={pageArticles}
      currentPage={1}
      totalPages={totalPages}
    />
  );
}
