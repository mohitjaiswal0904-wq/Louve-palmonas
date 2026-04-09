# `src/app/`

Next.js **App Router** tree: layouts, pages, loading/error boundaries, metadata, and **Route Handlers**.

## Files at root

| File | Role |
|------|------|
| **`layout.tsx`** | Root HTML shell, Montserrat, **`AppProviders`** + initial locale/messages, root **`generateMetadata`**, JSON-LD when `NEXT_PUBLIC_SITE_URL` set. |
| **`globals.css`** | Tailwind + Louve CSS variables. |
| **`loading.tsx`** | Global loading UI (uses l10n for a11y label). |
| **`error.tsx`** | Route error boundary (client; **`useMessages`**). |
| **`global-error.tsx`** | App-level error fallback (English default bundle). |
| **`not-found.tsx`** + **`not-found-content.tsx`** | 404 with site chrome. |
| **`robots.ts`**, **`sitemap.ts`** | SEO endpoints. |

## Route groups (folders do **not** appear in URL)

| Group | Role |
|-------|------|
| **`(public)/`** | Public marketing and commerce *placeholders*; includes **`page.tsx`** (home), **`about/`**, **`collections/`**, **`products/`**, **`search/`**, **`auth/login`**, etc. |
| **`(auth)/`** | Account-area placeholders: **`account/`**, **`cart/`**, **`wishlist/`** — same URL as `/account`, `/cart`, `/wishlist`. |

## `api/`

- **`api/locale/route.ts`** — `POST` JSON `{ locale }` → sets **`LOUVE_LOCALE`** cookie.

## Metadata

Use **`buildStaticPageMetadata`**, **`buildProductPageMetadata`**, **`buildSearchQueryMetadata`** from **`src/lib/l10n/build-page-metadata.ts`** so titles respect the locale cookie.

## Adding a page

1. Add **`page.tsx`** (and **`layout.tsx`** if the segment needs its own shell).
2. Extend **`AppMessages.pages`** and **all four** locale files under **`src/lib/l10n/`**.
3. Export **`generateMetadata`** as in existing pages.

See **`(public)/README.md`** and **`(auth)/README.md`** for route intent.
