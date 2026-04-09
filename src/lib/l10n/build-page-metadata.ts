import type { Metadata } from "next";

import { createMetadata } from "@/components/seo/metadata";
import { getPublicSiteUrl } from "@/lib/config/env";
import type { PageId } from "@/types/config";
import { getLocale } from "./server";
import { getMessages } from "./get-messages";
import { interpolate } from "@/utils/interpolate";

export async function buildStaticPageMetadata(
  pageId: PageId,
  path: string,
): Promise<Metadata> {
  const locale = await getLocale();
  const m = getMessages(locale);
  const p = m.pages[pageId];
  const base = getPublicSiteUrl();

  return createMetadata({
    title: p.metaTitle,
    description: p.metaDescription,
    canonicalUrl: base ? `${base}${path}` : undefined,
  });
}

export async function buildProductPageMetadata(
  slug: string,
  path: string,
): Promise<Metadata> {
  const locale = await getLocale();
  const m = getMessages(locale);
  const p = m.pages.productDetail;
  const base = getPublicSiteUrl();
  const title = interpolate(p.metaTitleTemplate, {
    slug: decodeURIComponent(slug),
    siteName: m.seo.siteName,
  });

  return createMetadata({
    title,
    description: p.metaDescription,
    canonicalUrl: base ? `${base}${path}` : undefined,
  });
}

export async function buildSearchQueryMetadata(
  query: string,
  path: string,
): Promise<Metadata> {
  const locale = await getLocale();
  const m = getMessages(locale);
  const p = m.pages.searchResults;
  const base = getPublicSiteUrl();
  const decoded = decodeURIComponent(query);
  const title = interpolate(p.metaTitleTemplate, {
    query: decoded,
    siteName: m.seo.siteName,
  });

  return createMetadata({
    title,
    description: p.metaDescription,
    canonicalUrl: base ? `${base}${path}` : undefined,
  });
}
