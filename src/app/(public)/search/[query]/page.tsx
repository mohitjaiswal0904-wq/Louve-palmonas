import type { Metadata } from "next";
import { Suspense } from "react";

import { buildSearchQueryMetadata } from "@/lib/l10n/build-page-metadata";

import SearchResultsClient from "./search-results-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ query: string }>;
}): Promise<Metadata> {
  const { query } = await params;
  return buildSearchQueryMetadata(query, `/search/${encodeURIComponent(query)}`);
}

export default async function SearchQueryPage({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const { query } = await params;
  return (
    <Suspense
      fallback={
        <div className="w-full px-3 py-10 sm:px-4 md:px-5 lg:px-5 xl:px-6 2xl:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-5 w-40 rounded bg-zinc-200/70 dark:bg-zinc-800" />
            <div className="h-9 w-2/3 max-w-md rounded bg-zinc-200/70 dark:bg-zinc-800" />
            <div className="h-24 w-full rounded-lg bg-zinc-200/50 dark:bg-zinc-800/80" />
            <div className="grid grid-cols-1 gap-0 border-l border-t border-[#F6F1E9] dark:border-zinc-800 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border-r border-b border-[#F6F1E9] dark:border-zinc-800">
                  <div className="aspect-square bg-zinc-200/70 dark:bg-zinc-800" />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <SearchResultsClient query={decodeURIComponent(query)} />
    </Suspense>
  );
}
