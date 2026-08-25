import type { ArticleEntry } from "@/lib/types";
import ArticleCard from "@/components/ArticleCard";

export default function PopularArticles({
  entries,
}: {
  entries: ArticleEntry[];
}) {
  if (entries.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="font-heading text-xl font-bold text-accent-strong">
        人気記事
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <ArticleCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
