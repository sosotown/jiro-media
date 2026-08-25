import Link from "next/link";

function pageHref(basePath: string, page: number): string {
  if (page <= 1) return basePath;
  const prefix = basePath === "/" ? "" : basePath;
  return `${prefix}/page/${page}`;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = "/",
}: {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}) {
  if (totalPages <= 1) return null;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="ページネーション"
      className="mt-12 flex items-center justify-center gap-4"
    >
      {hasPrev ? (
        <Link
          href={pageHref(basePath, currentPage - 1)}
          className="rounded-sm border border-border px-4 py-2 text-sm text-muted-strong transition-colors hover:border-accent hover:text-accent-strong"
        >
          前へ
        </Link>
      ) : (
        <span className="rounded-sm border border-border px-4 py-2 text-sm text-muted/40">
          前へ
        </span>
      )}

      <span className="font-heading text-sm text-muted">
        {currentPage} / {totalPages}
      </span>

      {hasNext ? (
        <Link
          href={pageHref(basePath, currentPage + 1)}
          className="rounded-sm border border-border px-4 py-2 text-sm text-muted-strong transition-colors hover:border-accent hover:text-accent-strong"
        >
          次へ
        </Link>
      ) : (
        <span className="rounded-sm border border-border px-4 py-2 text-sm text-muted/40">
          次へ
        </span>
      )}
    </nav>
  );
}
