import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPublishedArticles } from "@/lib/supacms";
import { sortByPublishedDesc, paginate } from "@/lib/pagination";
import ArticleListPage from "@/components/ArticleListPage";

// Cloudflare Pagesへの静的エクスポート用にビルド時の全ページを固定生成する。
export const dynamicParams = false;

type Params = { page: string };

export async function generateStaticParams(): Promise<Params[]> {
  const allArticles = await getAllPublishedArticles();
  const { totalPages } = paginate(allArticles, 1);

  // 1ページ目は "/" が担うため、2ページ目以降のみ生成する。
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { page } = await params;
  return { title: `記事一覧 ${page}ページ目` };
}

export default async function PaginatedHome({
  params,
}: {
  params: Promise<Params>;
}) {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    notFound();
  }

  const allArticles = sortByPublishedDesc(await getAllPublishedArticles());
  const { pageArticles, totalPages } = paginate(allArticles, pageNumber);

  if (pageNumber > totalPages) {
    notFound();
  }

  return (
    <ArticleListPage
      pageArticles={pageArticles}
      currentPage={pageNumber}
      totalPages={totalPages}
    />
  );
}
