import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPublishedArticles } from "@/lib/supacms";
import { sortByPublishedDesc, paginate } from "@/lib/pagination";
import { SITE_URL } from "@/lib/siteUrl";
import ArticleListPage from "@/components/ArticleListPage";

export const dynamicParams = false;

type Params = { page: string };

export async function generateStaticParams(): Promise<Params[]> {
  const allArticles = await getAllPublishedArticles();
  const { totalPages } = paginate(allArticles, 1);

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
  return {
    title: `記事一覧 ${page}ページ目`,
    alternates: {
      canonical: `/page/${page}`,
    },
    openGraph: {
      url: `${SITE_URL}/page/${page}`,
    },
  };
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
