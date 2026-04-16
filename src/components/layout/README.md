# `src/components/layout/`

Global **chrome** for Louve: header, footer, sidebar, and **`SiteLayout`** composition.

## Files

| Export | Role |
|--------|------|
| **`SiteLayout`** | Wraps **Header**, **main**, **`SiteLayoutFooter`** (`PopularSearchesSection` + **Footer**, with PDP deduping). |
| **`Header`** | Menu toggle, wordmark, **LanguageSwitcher**, nav actions from **`messages.navigation.header`**. |
| **`Footer`** | Brand line, link columns from **`messages.navigation.footer`**. |
| **`PopularSearchesSection`** | Centered **`/logo.png`**, **`common.popularSearchesHeading`**, pipe-separated links from **`GET /api/v1/catalog/popular-searches`** (hidden if empty / error). Inlined at the bottom of **`product-detail-client`** and **`products-client`**; **`SiteLayoutFooter`** skips the layout copy on **`/products`** and **`/products/[slug]`** to avoid duplicates. |
| **`SiteLayoutFooter`** | Client: **`PopularSearchesSection`** (except on product detail) + **`Footer`**. |
| **`Sidebar`** | Multi-panel nav from **`messages.navigation.sidebar`** (desktop hover flyouts, mobile drill-down). |
| **`LanguageSwitcher`** | Dropdown → **`POST /api/locale`**. |
| **`header-actions.ts`** | Maps action **keys** to Lucide icons (labels stay in l10n). |

## State

- **Sidebar open/close** — **`LayoutProvider`** in **`src/providers/layout-context.tsx`**.

## Copy

All strings come from **`useMessages()`** — no literals for customer-visible text.
