import Link from "next/link";

export default function CategoryBadge({
  name,
  slug,
}: {
  name: string;
  slug: string;
}) {
  return (
    <Link
      href={`/category/${slug}`}
      className="inline-block rounded-full border border-accent/40 px-2.5 py-0.5 text-xs text-accent-strong transition-colors hover:border-accent hover:bg-accent hover:text-background"
    >
      {name}
    </Link>
  );
}
