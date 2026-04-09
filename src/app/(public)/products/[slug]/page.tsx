import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";
import { buildProductPageMetadata } from "@/lib/l10n/build-page-metadata";
import { getMessages } from "@/lib/l10n/get-messages";
import { getLocale } from "@/lib/l10n/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildProductPageMetadata(slug, `/products/${encodeURIComponent(slug)}`);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = getMessages(await getLocale());
  return (
    <ComingSoon
      title={m.pages.productDetail.comingSoonTitle}
      body={m.pages.productDetail.comingSoonBody}
    >
      <div className="text-sm text-muted-foreground">
        {m.pages.productDetail.productIdLabel}:{" "}
        <span className="text-foreground">{decodeURIComponent(slug)}</span>
      </div>
    </ComingSoon>
  );
}
