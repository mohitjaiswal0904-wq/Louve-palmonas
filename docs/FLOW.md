# Application flow (client → service → state → hooks → components → pages)

This is the **canonical layering** for Louve frontend. New work should follow it so behaviour stays predictable
and testable.

## 1. Client layer (`src/lib/client`)

Backend HTTP access is isolated here:

| Export | When to use |
|--------|-------------|
| `createSsrApiClient()` | **Server** only — Server Components, Route Handlers, Server Actions. Uses `server-only`. |
| `createCsrApiClient()` | **Browser** — interactions from client components (e.g. after a click). Sends `credentials: "include"`. |

Both return an `ApiClient` with a small surface (e.g. `.get(path)`). Add helpers here if several services share
the same auth or header logic.

**Rule:** Pages and components must not call `fetch(apiBaseUrl)` directly for Louve APIs; go through the client
factory so SSR/CSR behaviour stays consistent.

## 2. Service layer (`src/services`)

Services **call the client** and map responses to typed data. They may implement retries, error mapping, or
query key helpers later (e.g. for a data library).

Example: `fetchHealthLiveJson(client)` uses `client.get("/health/live")`.

**Rule:** Services do not import React. They accept an `ApiClient` (or a narrow port) as a parameter so tests can
inject mocks.

## 3. State (`src/state`)

Client-side state that multiple components need (e.g. locale + resolved `AppMessages`) lives in context:

- `LocaleProvider` / `useLocaleContext` — current locale, messages, `setLocale`.

Server-rendered pages pass **initial** `locale` and `messages` from `getLocale()` + `getMessages()` in the root
layout. The provider uses a `key={initialLocale}` so a full navigation refresh reconciles cleanly with the
cookie.

## 4. Hooks (`src/hooks`)

Hooks **consume state and services** and expose ergonomic APIs:

- `useMessages()` — UI copy for the active locale.
- `useLocale()` — `{ locale, setLocale }`.
- `useMediaQuery()` — layout breakpoints.

**Rule:** Prefer `useMessages()` in components instead of prop-drilling thousands of strings. Server Components
should call `getMessages(await getLocale())` when they render static copy without a client boundary.

## 5. Components (`src/components`, `src/features`)

Components **use hooks** (if client) or receive props from parent Server Components. They should not talk to the
backend unless through a hook that uses a service (future pattern).

Layout pieces (`Header`, `Footer`, `Sidebar`) are client components where they need `useMessages()` or layout
context.

## 6. Pages (`src/app/**/page.tsx`)

Pages **compose components** and define route-level `generateMetadata` using helpers in
`src/lib/l10n/build-page-metadata.ts` so titles and descriptions respect the locale cookie.

Typical server page:

1. `export async function generateMetadata()` → `buildStaticPageMetadata("about", "/about")`.
2. `export default async function Page()` → `const m = getMessages(await getLocale());` → pass strings into
   presentational components.

## End-to-end example (future catalog)

1. `page.tsx` (server) creates `createSsrApiClient()` and calls `getProductBySlug(slug, client)` from a service.
2. Service uses `client.get(\`/v1/products/${slug}\`)` and returns a `Product`.
3. Server passes `product` into a server component tree, or a client subtree receives serialisable props.
4. A client wishlist hook might call `createCsrApiClient()` inside an action and a service method to mutate state.

Today, many routes are “coming soon” placeholders; the **plumbing** (client, services, l10n) is in place for
this pattern.
