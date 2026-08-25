export type SupaMedia = {
  id: string;
  url: string;
  alt: string | null;
  filename: string;
  size: number;
  mimeType: string;
};

export type RichTextMark = {
  type: string;
  attrs?: Record<string, unknown>;
};

export type RichTextNode = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: RichTextNode[];
  text?: string;
  marks?: RichTextMark[];
};

export type RelatedAuthor = {
  id: string;
  data: {
    name: string;
    bio: string;
  };
};

export type ArticleData = {
  title: string;
  slug: string;
  body: RichTextNode;
  originalUrl?: string | null;
  featuredImage?: SupaMedia | null;
  authorName?: string | null;
  authorBio?: string | null;
  author?: RelatedAuthor | null;
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
