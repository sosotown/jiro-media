import "server-only";
import { getAllPublishedArticles } from "./supacms";
import { sortByPublishedDesc } from "./pagination";
import { excerptFromRichText } from "./richText";
import { resolveAuthor } from "./author";

export type SearchIndexItem = {
  slug: string;
  title: string;
  excerpt: string;
  categoryName: string | null;
  categorySlug: string | null;
  authorName: string;
  publishedAt: string;
  featuredImageUrl: string | null;
  featuredImageAlt: string | null;
};

export async function buildSearchIndex(): Promise<SearchIndexItem[]> {
  const articles = sortByPublishedDesc(await getAllPublishedArticles());

  return articles.map((entry) => {
    const author = resolveAuthor(entry.data);
    return {
      slug: entry.data.slug,
      title: entry.data.title,
      excerpt: excerptFromRichText(entry.data.body, 80),
      categoryName: entry.data.category?.data.name ?? null,
      categorySlug: entry.data.category?.data.slug ?? null,
      authorName: author.name,
      publishedAt: entry.publishedAt ?? entry.createdAt,
      featuredImageUrl: entry.data.featuredImage?.url ?? null,
      featuredImageAlt: entry.data.featuredImage?.alt ?? null,
    };
  });
}
