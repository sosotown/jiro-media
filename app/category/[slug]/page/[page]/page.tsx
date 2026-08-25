import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPublishedArticles } from "@/lib/supacms";
import { sortByPublishedDesc, paginate } from "@/lib/pagination";
import { getAllCategories, getArticlesByCategorySlug } from "@/lib/categories";
import { SITE_URL } from "@/lib/siteUrl";
import ArticleListPage from "@/components/ArticleListPage";

export const dynamicParams = false;

type Params = { slug: string; page: string };

export async function generateStaticParams(): Promise<Params[]> {
  const articles = await getAllPublishedArticles();
  const categories = getAllCategories(articles);

  return categories.flatMap((category) => {
    const categoryArticles = getArticlesByCategorySlug(articles, category.slug);
    const { totalPages } = paginate(categoryArticles, 1);

    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
      slug: category.slug,
      page: String(i + 2),
    }));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, page } = await params;
  const articles = await getAllPublishedArticles();
  const category = getAllCategories(articles).find((c) => c.slug === slug);

  if (!category) {
    return { title: "カテゴリが見つかりません" };
  }

  return {
    title: `${category.name}の記事一覧 ${page}ページ目`,
    alternates: {
      canonical: `/category/${slug}/page/${page}`,
    },
    openGraph: {
      url: `${SITE_URL}/category/${slug}/page/${page}`,
    },
  };
}

export default async function CategoryPaginatedPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, page } = await params;
  const pageNumber = Number.parseInt(page, 10);

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    notFound();
  }

  const articles = await getAllPublishedArticles();
  const category = getAllCategories(articles).find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryArticles = sortByPublishedDesc(
    getArticlesByCategorySlug(articles, slug)
  );
  const { pageArticles, totalPages } = paginate(categoryArticles, pageNumber);

  if (pageNumber > totalPages) {
    notFound();
  }

  return (
    <ArticleListPage
      title={`${category.name}の記事一覧`}
      description={`「${category.name}」カテゴリの記事をまとめています。`}
      pageArticles={pageArticles}
      currentPage={pageNumber}
      totalPages={totalPages}
      basePath={`/category/${slug}`}
    />
  );
}
