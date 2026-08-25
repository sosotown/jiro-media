import "server-only";
import type { ArticleEntry, EntriesResponse } from "./types";

const API_BASE = "https://cms.supa.dev/api/v1";
const PROJECT_SLUG = "jiroramen";
const CONTENT_TYPE = "article";
const PAGE_SIZE = 50;

function getApiKey(): string {
  const key = process.env.SUPACMS_API_KEY;
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
    throw new Error(
      `supacms API error: ${res.status} ${res.statusText} (${path})`
    );
  }

  return res.json() as Promise<T>;
}

/**
 * 公開済み記事を全件取得する(ページネーションを内部で吸収)。
 * 記事数が少ない(約90本)前提で、静的エクスポートのビルド時に全件を取得する。
 */
export async function getAllPublishedArticles(): Promise<ArticleEntry[]> {
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

export async function getArticleEntryById(
  entryId: string
): Promise<ArticleEntry> {
  return supacmsFetch<ArticleEntry>(
    `/projects/${PROJECT_SLUG}/content-types/${CONTENT_TYPE}/entries/${entryId}`
  );
}

/**
 * スラッグから記事詳細を取得する。
 * 一覧APIにスラッグ絞り込みがないため、一覧からentryIdを特定し詳細エンドポイントを叩く。
 */
export async function getArticleBySlug(
  slug: string
): Promise<ArticleEntry | null> {
  const all = await getAllPublishedArticles();
  const match = all.find((entry) => entry.data.slug === slug);
  if (!match) return null;

  return getArticleEntryById(match.id);
}
