# `src/app/(public)/`

**Public** routes — no `(public)` segment in the URL. Shares **`layout.tsx`** that wraps children with **`SiteLayout`** (header, sidebar, footer, main).

## What lives here today

- **Home** — `page.tsx` (localized “coming soon” style hero copy).
- **Content / commerce shells** — `about`, `collections`, `products`, `products/[slug]`, `search`, `search/[query]`, `contact`, `stores`, `help`, `shipping`.
- **Auth entry pages (public URLs)** — `auth/login`, `auth/signup`, `auth/forgot-password` (placeholders until real forms).

## Layout

- **`layout.tsx`** — only composes **`SiteLayout`**; no extra providers (root layout already provides locale).

## SEO

Each **`page.tsx`** should export **`generateMetadata`** using helpers in **`src/lib/l10n/build-page-metadata.ts`**.

## Contrast with `(auth)/`

**`(auth)/`** is for routes you intend to guard when login exists; URLs are still “flat” (`/cart`, not `/auth/cart`). The split is organizational.
