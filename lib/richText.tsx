import type { ReactNode } from "react";
import type { RichTextMark, RichTextNode } from "./types";

function isSafeHttpUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function applyMarks(text: string, marks: RichTextMark[] | undefined, key: string): ReactNode {
  if (!marks || marks.length === 0) return text;

  return marks.reduce<ReactNode>((acc, mark, i) => {
    switch (mark.type) {
      case "bold":
        return <strong key={`${key}-bold-${i}`}>{acc}</strong>;
      case "italic":
        return <em key={`${key}-italic-${i}`}>{acc}</em>;
      case "link": {
        const href = mark.attrs?.href;
        if (!isSafeHttpUrl(href)) return acc;
        return (
          <a
            key={`${key}-link-${i}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {acc}
          </a>
        );
      }
      default:
        return acc;
    }
  }, text);
}

function renderChildren(node: RichTextNode, key: string): ReactNode {
  return node.content?.map((child, i) => renderNode(child, `${key}-${i}`));
}

function renderNode(node: RichTextNode, key: string): ReactNode {
  switch (node.type) {
    case "doc":
      return renderChildren(node, key);
    case "paragraph":
      return <p key={key}>{renderChildren(node, key)}</p>;
    case "heading": {
      const level = Math.min(4, Math.max(2, Number(node.attrs?.level) || 2));
      const Tag = `h${level}` as "h2" | "h3" | "h4";
      return <Tag key={key}>{renderChildren(node, key)}</Tag>;
    }
    case "bulletList":
      return <ul key={key}>{renderChildren(node, key)}</ul>;
    case "orderedList":
      return <ol key={key}>{renderChildren(node, key)}</ol>;
    case "listItem":
      return <li key={key}>{renderChildren(node, key)}</li>;
    case "blockquote":
      return <blockquote key={key}>{renderChildren(node, key)}</blockquote>;
    case "hardBreak":
      return <br key={key} />;
    case "image": {
      const src = node.attrs?.src;
      if (!isSafeHttpUrl(src)) return null;
      const alt = typeof node.attrs?.alt === "string" ? node.attrs.alt : "";
      const title = typeof node.attrs?.title === "string" ? node.attrs.title : undefined;
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={key} src={src} alt={alt} title={title} loading="lazy" decoding="async" />
      );
    }
    case "text":
      return applyMarks(node.text ?? "", node.marks, key);
    default:
      return renderChildren(node, key);
  }
}

export function renderRichTextDoc(doc: RichTextNode): ReactNode {
  return renderNode(doc, "doc");
}

export function extractPlainText(node: RichTextNode): string {
  if (node.type === "text") return node.text ?? "";
  if (!node.content) return "";
  return node.content.map(extractPlainText).join("");
}

export function excerptFromRichText(doc: RichTextNode, maxLength = 120): string {
  const text = extractPlainText(doc).replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}
