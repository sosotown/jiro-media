import type { ArticleEntry } from "@/lib/types";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";

export default function ArticleListPage({
  pageArticles,
  currentPage,
  totalPages,
}: {
  pageArticles: ArticleEntry[];
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="mb-10 border-b border-border pb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          二郎系ラーメン食べ歩き記録
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          全国の二郎系・二郎インスパイア系ラーメンを食べ歩いた記録をお届けします。
        </p>
      </section>

      {pageArticles.length === 0 ? (
        <p className="py-20 text-center text-sm text-muted">
          記事はまだ公開されていません。
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageArticles.map((entry) => (
            <ArticleCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
