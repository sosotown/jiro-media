import type { Metadata } from "next";
import { getAllPublishedArticles } from "@/lib/supacms";
import { sortByPublishedDesc, paginate } from "@/lib/pagination";
import ArticleListPage from "@/components/ArticleListPage";

export const metadata: Metadata = {
  title: "記事一覧",
};

export default async function Home() {
  const allArticles = sortByPublishedDesc(await getAllPublishedArticles());
  const { pageArticles, totalPages } = paginate(allArticles, 1);

  return (
    <ArticleListPage
      pageArticles={pageArticles}
      currentPage={1}
      totalPages={totalPages}
    />
  );
}
