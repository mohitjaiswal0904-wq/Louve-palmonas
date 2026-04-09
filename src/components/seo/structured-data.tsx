import type { ReactElement } from "react";

type WebSiteJsonLdProps = {
  name: string;
  url: string;
  description?: string;
};

/** Minimal JSON-LD (optional). */
export function WebSiteJsonLd({ name, url, description }: WebSiteJsonLdProps): ReactElement {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
  };

  return (
    <script
      type="application/ld+json"
      // Next.js recommends this pattern for JSON-LD.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
