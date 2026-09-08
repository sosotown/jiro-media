"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function SearchBox({
  className,
  defaultValue = "",
}: {
  className?: string;
  defaultValue?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={className}>
      <label htmlFor="site-search" className="sr-only">
        記事を検索
      </label>
      <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 focus-within:border-accent">
        <svg
          viewBox="0 0 20 20"
          className="h-4 w-4 shrink-0 text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="9" cy="9" r="6" />
          <path d="m17 17-4-4" />
        </svg>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="記事を検索"
          className="w-28 bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none sm:w-44"
        />
      </div>
    </form>
  );
}
