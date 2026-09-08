import type { Metadata } from "next";
import Link from "next/link";
import { getAllPublishedArticles } from "@/lib/supacms";
import { getAllCategories } from "@/lib/categories";
import { SITE_URL } from "@/lib/siteUrl";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "サイトマップ",
  alternates: {
    canonical: "/sitemap",
  },
  openGraph: {
    url: `${SITE_URL}/sitemap`,
  },
};

export default async function SitemapPage() {
  const articles = await getAllPublishedArticles();
  const categories = getAllCategories(articles);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ name: "二郎系マガジン", href: "/" }, { name: "サイトマップ" }]} />

      <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        サイトマップ
      </h1>

      <nav aria-label="サイトマップ" className="mt-8 space-y-8">
        <section>
          <h2 className="font-heading text-lg font-bold text-accent-strong">
            ページ
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>
              <Link href="/" className="hover:text-accent-strong">
                トップページ
              </Link>
            </li>
            <li>
              <a
                href="https://aisaac.jp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-strong"
              >
                運営者情報
              </a>
            </li>
            <li>
              <a
                href="https://aisaac.jp/privacy_policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-strong"
              >
                プライバシーポリシー
              </a>
            </li>
          </ul>
        </section>

        {categories.length > 0 && (
          <section>
            <h2 className="font-heading text-lg font-bold text-accent-strong">
              カテゴリ
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="hover:text-accent-strong"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </nav>
    </div>
  );
}
