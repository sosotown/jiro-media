import { renderRichTextDoc } from "@/lib/richText";
import type { RichTextNode } from "@/lib/types";

export default function ArticleBody({ doc }: { doc: RichTextNode }) {
  return <div className="prose-article">{renderRichTextDoc(doc)}</div>;
}
