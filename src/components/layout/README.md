# `src/components/layout/`

Global **chrome** for Louve: header, footer, sidebar, and **`SiteLayout`** composition.

## Files

| Export | Role |
|--------|------|
| **`SiteLayout`** | Wraps **Header**, **Sidebar**, **main**, **Footer**. |
| **`Header`** | Menu toggle, wordmark, **LanguageSwitcher**, nav actions from **`messages.navigation.header`**. |
| **`Footer`** | Brand line, link columns from **`messages.navigation.footer`**. |
| **`Sidebar`** | Multi-panel nav from **`messages.navigation.sidebar`** (desktop hover flyouts, mobile drill-down). |
| **`LanguageSwitcher`** | Dropdown → **`POST /api/locale`**. |
| **`header-actions.ts`** | Maps action **keys** to Lucide icons (labels stay in l10n). |

## State

- **Sidebar open/close** — **`LayoutProvider`** in **`src/providers/layout-context.tsx`**.

## Copy

All strings come from **`useMessages()`** — no literals for customer-visible text.
