import sanitizeHtml from "sanitize-html";

const ALLOWED_IFRAME_HOSTS = [
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "player.vimeo.com",
];

function isAllowedIframeSrc(src: string | undefined): boolean {
  if (!src) return false;
  try {
    const url = new URL(src, "https://example.invalid");
    return url.protocol === "https:" && ALLOWED_IFRAME_HOSTS.includes(url.host);
  } catch {
    return false;
  }
}

/**
 * 記事本文HTMLをサニタイズする。CMS側は自社管理データだが、
 * 想定外のスクリプト混入・タグ崩れに備え許可リスト方式で処理する。
 */
export function sanitizeArticleBody(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "h2",
      "h3",
      "h4",
      "p",
      "br",
      "strong",
      "em",
      "b",
      "i",
      "u",
      "s",
      "a",
      "ul",
      "ol",
      "li",
      "blockquote",
      "img",
      "figure",
      "figcaption",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "iframe",
      "span",
      "hr",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
      iframe: [
        "src",
        "width",
        "height",
        "allow",
        "allowfullscreen",
        "frameborder",
        "title",
      ],
      "*": ["class"],
    },
    allowedSchemes: ["https"],
    exclusiveFilter: (frame) =>
      frame.tag === "iframe" && !isAllowedIframeSrc(frame.attribs.src),
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer nofollow",
        target: "_blank",
      }),
    },
  });
}

/**
 * HTML本文からタグを除去したプレーンテキスト抜粋を生成する(SEO description等に使用)。
 */
export function excerptFromHtml(html: string, maxLength = 120): string {
  const text = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}
