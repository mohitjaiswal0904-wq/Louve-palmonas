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
    <Suspense fallback={<div className="flex min-h-[40vh] items-center justify-center"><p className="text-sm text-muted-foreground">Searching…</p></div>}>
      <SearchResultsClient query={decodeURIComponent(query)} />
    </Suspense>
  );
}
