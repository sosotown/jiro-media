import type { ArticleEntry } from "./types";

export const ARTICLES_PAGE_SIZE = 12;

export function sortByPublishedDesc(entries: ArticleEntry[]): ArticleEntry[] {
  return [...entries].sort((a, b) => {
    const dateA = a.publishedAt ?? a.createdAt;
    const dateB = b.publishedAt ?? b.createdAt;
    return dateB.localeCompare(dateA);
  });
}

export function paginate(
  sortedArticles: ArticleEntry[],
  page: number
): { pageArticles: ArticleEntry[]; totalPages: number } {
  const totalPages = Math.max(
    1,
    Math.ceil(sortedArticles.length / ARTICLES_PAGE_SIZE)
  );
  const start = (page - 1) * ARTICLES_PAGE_SIZE;
  const pageArticles = sortedArticles.slice(start, start + ARTICLES_PAGE_SIZE);

  return { pageArticles, totalPages };
}
