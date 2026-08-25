import type { MetadataRoute } from "next";
import { getAllPublishedArticles } from "@/lib/supacms";
import { sortByPublishedDesc, paginate } from "@/lib/pagination";
import { SITE_URL } from "@/lib/siteUrl";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = sortByPublishedDesc(await getAllPublishedArticles());
  const { totalPages } = paginate(articles, 1);

  const articleEntries: MetadataRoute.Sitemap = articles.map((entry) => ({
    url: `${SITE_URL}/articles/${entry.data.slug}`,
    lastModified: entry.updatedAt,
  }));

  const paginationEntries: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, totalPages - 1) },
    (_, i) => ({ url: `${SITE_URL}/page/${i + 2}` })
  );

  return [{ url: SITE_URL }, ...paginationEntries, ...articleEntries];
}
