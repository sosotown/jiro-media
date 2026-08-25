export type SupaMedia = {
  id: string;
  url: string;
  alt: string | null;
  filename: string;
  size: number;
  mimeType: string;
};

export type ArticleData = {
  title: string;
  slug: string;
  body: string;
  originalUrl?: string | null;
  featuredImage?: SupaMedia | null;
  authorName?: string | null;
  authorBio?: string | null;
};

export type ArticleEntry = {
  id: string;
  status: "draft" | "published";
  data: ArticleData;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

export type EntriesResponse = {
  entries: ArticleEntry[];
};
