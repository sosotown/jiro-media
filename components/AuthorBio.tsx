import { DEFAULT_AUTHOR_NAME, DEFAULT_AUTHOR_BIO } from "@/lib/constants";

function truncate(text: string, maxLength: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength)}…`;
}

type Props = {
  authorName?: string | null;
  authorBio?: string | null;
  variant: "byline" | "full";
};

export default function AuthorBio({ authorName, authorBio, variant }: Props) {
  const name = authorName || DEFAULT_AUTHOR_NAME;
  const bio = authorBio || DEFAULT_AUTHOR_BIO;

  if (variant === "byline") {
    return (
      <p className="text-sm text-muted">
        <span className="text-muted-strong">{name}</span>
        <span className="mx-2 text-border">/</span>
        {truncate(bio, 48)}
      </p>
    );
  }

  return (
    <section className="mt-12 rounded-sm border border-border bg-surface p-6">
      <p className="font-heading text-base font-bold text-accent-strong">
        {name}
      </p>
      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-strong">
        {bio}
      </p>
    </section>
  );
}
