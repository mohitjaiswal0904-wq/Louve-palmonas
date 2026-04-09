import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";
import { buildSearchQueryMetadata } from "@/lib/l10n/build-page-metadata";
import { getMessages } from "@/lib/l10n/get-messages";
import { getLocale } from "@/lib/l10n/server";

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
  const m = getMessages(await getLocale());
  return (
    <ComingSoon
      title={m.pages.searchResults.comingSoonTitle}
      body={m.pages.searchResults.comingSoonBody}
    >
      <div className="text-sm text-muted-foreground">
        {m.pages.searchResults.queryLabel}:{" "}
        <span className="text-foreground">{decodeURIComponent(query)}</span>
      </div>
    </ComingSoon>
  );
}
