import type { Metadata } from "next";

import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";

import SearchClient from "./search-client";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("search", "/search");
}

export default function SearchPage() {
  return <SearchClient />;
}
