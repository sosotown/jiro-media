const DEFAULT_SITE_URL = "https://ziroramen-media.example.com";

function normalize(url: string): string {
  const withScheme = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  return withScheme.replace(/\/+$/, "");
}

export const SITE_URL = normalize(
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
);
