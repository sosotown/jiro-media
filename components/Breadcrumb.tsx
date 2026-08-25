import Link from "next/link";
import { SITE_URL } from "@/lib/siteUrl";
import JsonLd from "./JsonLd";

type Crumb = { name: string; href?: string };

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="breadcrumb" className="text-xs text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-border">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-accent-strong">
                  {item.name}
                </Link>
              ) : (
                <span className="text-muted-strong">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
