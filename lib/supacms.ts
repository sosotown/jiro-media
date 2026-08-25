import "server-only";
import type { ArticleEntry, EntriesResponse } from "./types";

const API_BASE = "https://cms.supa.dev/api/v1";
const PROJECT_SLUG = "jiroramen";
const CONTENT_TYPE = "article";
const PAGE_SIZE = 20;

function getApiKey(): string {
  const key = process.env.SUPACMS_API_KEY?.trim();
  if (!key) {
    throw new Error(
      "SUPACMS_API_KEY が設定されていません。サーバー環境変数を確認してください。"
    );
  }
  return key;
}

async function supacmsFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `supacms API error: ${res.status} ${res.statusText} (${path}) ${body}`
    );
  }

  return res.json() as Promise<T>;
}

async function fetchAllPublishedArticles(): Promise<ArticleEntry[]> {
  const all: ArticleEntry[] = [];
  let offset = 0;

  while (true) {
    const { entries } = await supacmsFetch<EntriesResponse>(
      `/projects/${PROJECT_SLUG}/content-types/${CONTENT_TYPE}/entries?status=published&limit=${PAGE_SIZE}&offset=${offset}`
    );
    all.push(...entries);

    if (entries.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }

  return all;
}

let articlesPromise: Promise<ArticleEntry[]> | null = null;

export function getAllPublishedArticles(): Promise<ArticleEntry[]> {
  if (!articlesPromise) {
    articlesPromise = fetchAllPublishedArticles().catch((error) => {
      articlesPromise = null;
      throw error;
    });
  }
  return articlesPromise;
}

export async function getArticleBySlug(
  slug: string
): Promise<ArticleEntry | null> {
  const all = await getAllPublishedArticles();
  return all.find((entry) => entry.data.slug === slug) ?? null;
}
