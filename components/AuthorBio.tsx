import type { ResolvedAuthor } from "@/lib/author";

function truncate(text: string, maxLength: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength)}…`;
}

type Props = {
  author: ResolvedAuthor;
  variant: "byline" | "full";
};

export default function AuthorBio({ author, variant }: Props) {
  if (variant === "byline") {
    return (
      <p className="text-sm text-muted">
        <span className="text-muted-strong">{author.name}</span>
        <span className="mx-2 text-border">/</span>
        {truncate(author.bio, 48)}
      </p>
    );
  }

  return (
    <section className="mt-12 rounded-sm border border-border bg-surface p-6">
      <p className="font-heading text-base font-bold text-accent-strong">
        {author.name}
      </p>
      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-strong">
        {author.bio}
      </p>
    </section>
  );
}
