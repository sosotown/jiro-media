import Image from "next/image";
import Link from "next/link";
import type { ArticleEntry } from "@/lib/types";
import { excerptFromRichText } from "@/lib/richText";
import { resolveAuthor } from "@/lib/author";
import CategoryBadge from "@/components/CategoryBadge";

function BowlPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-surface-hover">
      <svg
        viewBox="0 0 64 64"
        className="h-10 w-10 text-border"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M8 28h48a24 20 0 0 1-48 0Z" />
        <path d="M14 28c0-8 8-14 18-14s18 6 18 14" />
        <path d="M20 52h24" />
      </svg>
    </div>
  );
}

export default function ArticleCard({ entry }: { entry: ArticleEntry }) {
  const { title, slug, body, featuredImage, category } = entry.data;
  const excerpt = excerptFromRichText(body, 72);
  const author = resolveAuthor(entry.data);

  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-border bg-surface transition-colors hover:border-accent">
      <Link
        href={`/articles/${slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden sm:aspect-video"
      >
        {featuredImage ? (
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <BowlPlaceholder />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {category?.data && (
          <div>
            <CategoryBadge name={category.data.name} slug={category.data.slug} />
          </div>
        )}
        <Link href={`/articles/${slug}`} className="contents">
          <h2 className="font-heading text-lg font-bold leading-snug text-foreground group-hover:text-accent-strong transition-colors">
            {title}
          </h2>
          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
            {excerpt}
          </p>
          <p className="mt-1 text-xs text-muted">by {author.name}</p>
        </Link>
      </div>
    </div>
  );
}
