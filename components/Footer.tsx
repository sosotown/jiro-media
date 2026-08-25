import Link from "next/link";
import { getAllPublishedArticles } from "@/lib/supacms";
import { getAllCategories } from "@/lib/categories";

export default async function Footer() {
  const articles = await getAllPublishedArticles();
  const categories = getAllCategories(articles);

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-muted sm:px-6">
        <p className="font-heading text-lg font-bold text-muted-strong">
          二郎系マガジン
        </p>
        <p className="mt-2 max-w-2xl leading-relaxed">
          二郎系ラーメンにまつわる食べ歩き記録・お店情報をまとめる編集メディアです。
          掲載内容は個人の体験・見解に基づく情報であり、店舗の公式情報とは異なる場合があります。
        </p>

        {categories.length > 0 && (
          <nav aria-label="カテゴリ" className="mt-6">
            <p className="text-xs text-muted-strong">カテゴリ</p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-xs hover:text-accent-strong"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <p className="mt-6 text-xs text-muted">
          &copy; {new Date().getFullYear().toString()} 二郎系マガジン
        </p>
      </div>
    </footer>
  );
}
