import type { Metadata } from "next";
import { getAllPublishedArticles } from "@/lib/supacms";
import { sortByPublishedDesc, paginate } from "@/lib/pagination";
import { getPopularArticleSlugs } from "@/lib/webAnalytics";
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

  const popularSlugs = await getPopularArticleSlugs(3);
  const popularArticles = popularSlugs
    .map((slug) => allArticles.find((entry) => entry.data.slug === slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <ArticleListPage
      pageArticles={pageArticles}
      currentPage={1}
      totalPages={totalPages}
      popularArticles={popularArticles}
    />
  );
}
