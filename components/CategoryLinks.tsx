import type { Category } from "@/lib/categories";
import CategoryBadge from "@/components/CategoryBadge";

export default function CategoryLinks({
  categories,
}: {
  categories: Category[];
}) {
  if (categories.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="font-heading text-xl font-bold text-accent-strong">
        カテゴリ
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <CategoryBadge
            key={category.slug}
            name={category.name}
            slug={category.slug}
          />
        ))}
      </div>
    </section>
  );
}
