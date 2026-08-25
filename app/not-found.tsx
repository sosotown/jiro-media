import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="font-heading text-6xl font-extrabold text-accent-strong">
        404
      </p>
      <h1 className="mt-4 font-heading text-2xl font-bold text-foreground">
        お探しの記事は見つかりませんでした
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        ページが移動または削除された可能性があります。URLをご確認のうえ、記事一覧からお探しください。
      </p>
      <Link
        href="/"
        className="mt-8 rounded-sm border border-accent px-5 py-2 text-sm text-accent-strong transition-colors hover:bg-accent hover:text-background"
      >
        記事一覧へ戻る
      </Link>
    </div>
  );
}
