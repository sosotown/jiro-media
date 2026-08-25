import { DEFAULT_AUTHOR_NAME, DEFAULT_AUTHOR_BIO } from "./constants";
import type { ArticleData } from "./types";

export type ResolvedAuthor = { name: string; bio: string };

export function resolveAuthor(data: ArticleData): ResolvedAuthor {
  const related = data.author?.data;
  return {
    name: related?.name || data.authorName || DEFAULT_AUTHOR_NAME,
    bio: related?.bio || data.authorBio || DEFAULT_AUTHOR_BIO,
  };
}
