import type { Metadata } from "next";

import { buildStaticPageMetadata } from "@/lib/l10n/build-page-metadata";
import { CollectionsClient } from "./collections-client";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata("collections", "/collections");
}

export default function CollectionsPage() {
  return <CollectionsClient />;
}
