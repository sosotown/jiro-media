import { sanitizeArticleBody } from "@/lib/html";

export default function ArticleBody({ html }: { html: string }) {
  const safeHtml = sanitizeArticleBody(html);

  return (
    <div
      className="prose-article"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
