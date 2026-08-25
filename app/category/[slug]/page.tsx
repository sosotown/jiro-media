import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPublishedArticles } from "@/lib/supacms";
import { sortByPublishedDesc, paginate } from "@/lib/pagination";
import { getAllCategories, getArticlesByCategorySlug } from "@/lib/categories";
import { SITE_URL } from "@/lib/siteUrl";
import ArticleListPage from "@/components/ArticleListPage";

export const dynamicParams = false;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const articles = await getAllPublishedArticles();
  return getAllCategories(articles).map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getAllPublishedArticles();
  const category = getAllCategories(articles).find((c) => c.slug === slug);

  if (!category) {
    return { title: "カテゴリが見つかりません" };
  }

  return {
    title: `${category.name}の記事一覧`,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      url: `${SITE_URL}/category/${slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const articles = await getAllPublishedArticles();
  const category = getAllCategories(articles).find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryArticles = sortByPublishedDesc(
    getArticlesByCategorySlug(articles, slug)
  );
  const { pageArticles, totalPages } = paginate(categoryArticles, 1);

  return (
    <ArticleListPage
      title={`${category.name}の記事一覧`}
      description={`「${category.name}」カテゴリの記事をまとめています。`}
      pageArticles={pageArticles}
      currentPage={1}
      totalPages={totalPages}
      basePath={`/category/${slug}`}
    />
  );
}
