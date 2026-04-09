# `src/components/seo/`

**Search and metadata** helpers for the App Router.

## Files

| File | Role |
|------|------|
| **`metadata.ts`** | **`createMetadata({ title, description, canonicalUrl, ogImageUrl })`** → Next **`Metadata`**. |
| **`structured-data.tsx`** | **`WebSiteJsonLd`** — minimal JSON-LD for the site name/url/description. |

## Usage

- Root layout and pages call **`createMetadata`** with strings from **`getMessages()`** / **`generateMetadata`** builders in **`src/lib/l10n/build-page-metadata.ts`**.
- Set **`NEXT_PUBLIC_SITE_URL`** so canonicals and sitemap resolve.
