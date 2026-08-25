import type { ArticleEntry } from "./types";

export type Category = { slug: string; name: string };

export function getAllCategories(articles: ArticleEntry[]): Category[] {
  const seen = new Map<string, Category>();

  for (const entry of articles) {
    const category = entry.data.category?.data;
    if (category && !seen.has(category.slug)) {
      seen.set(category.slug, { slug: category.slug, name: category.name });
    }
  }

  return Array.from(seen.values());
}

export function getArticlesByCategorySlug(
  articles: ArticleEntry[],
  slug: string
): ArticleEntry[] {
  return articles.filter((entry) => entry.data.category?.data.slug === slug);
}
