import type { Metadata } from "next";

type CreateMetadataArgs = {
  title: string;
  description: string;
  /** Absolute canonical URL, e.g. https://louve.example.com/about */
  canonicalUrl?: string;
  /** Absolute OpenGraph image URL (optional) */
  ogImageUrl?: string;
};

/**
 * Minimal, consistent metadata. Keep it simple and aesthetic.
 */
export function createMetadata({
  title,
  description,
  canonicalUrl,
  ogImageUrl,
}: CreateMetadataArgs): Metadata {
  const images = ogImageUrl ? [{ url: ogImageUrl }] : undefined;

  return {
    title,
    description,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      images,
    },
    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
