"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { SearchIndexItem } from "@/lib/searchIndex";
import Breadcrumb from "@/components/Breadcrumb";
import SearchBox from "@/components/SearchBox";
import SearchResultCard from "@/components/SearchResultCard";

function matchesQuery(item: SearchIndexItem, terms: string[]): boolean {
  const haystack = `${item.title} ${item.excerpt} ${item.categoryName ?? ""}`.toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  const [index, setIndex] = useState<SearchIndexItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data: SearchIndexItem[]) => {
        if (!cancelled) setIndex(data);
      })
      .catch(() => {
        if (!cancelled) setIndex([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const results =
    index && terms.length > 0 ? index.filter((item) => matchesQuery(item, terms)) : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumb items={[{ name: "二郎系マガジン", href: "/" }, { name: "検索" }]} />

      <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        記事を検索
      </h1>

      <SearchBox className="mt-6 max-w-sm" defaultValue={query} />

      <p className="mt-4 text-sm text-muted">
        {query ? `「${query}」の検索結果` : "キーワードを入力して記事を検索できます。"}
      </p>

      {terms.length === 0 ? null : index === null ? (
        <p className="py-20 text-center text-sm text-muted">読み込み中です…</p>
      ) : results.length === 0 ? (
        <p className="py-20 text-center text-sm text-muted">
          該当する記事が見つかりませんでした。
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <SearchResultCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
