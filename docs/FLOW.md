# Application flow (pages → components → hooks → state → services → client)

This is the **canonical layering** for Louve frontend. Dependency direction is **downward** only (UI never
imports **`src/services`** directly; it uses **`@/hooks`**).

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

**`*.state.tsx`** providers hold React Context and call **`src/services`** with a memoized **`createCsrApiClient()`**
(except **`LocaleProvider`**, which only manages locale + **`AppMessages`** + cookie/`router.refresh()`).

- **`AuthProvider`** — session, login/signup/logout, forgot/reset password.
- **`CatalogProvider`** — `listProducts`, `getProductByHandle`, `getFilters`, …
- **`SearchProvider`** — `searchProducts`, `getSuggestions`, …
- **`HealthProvider`** — `checkLive`.
- **`LocaleProvider`** — `locale`, `messages`, `setLocale`.

Root layout passes **`initialLocale`** / **`initialMessages`** into **`AppProviders`**. See **`src/state/README.md`**.

## 4. Hooks (`src/hooks`)

Hooks **consume state only** (not services directly):

- `useAuth()`, `useCatalog()`, `useSearch()`, `useHealth()` — typed facades over matching providers.
- `useMessages()` / `useLocale()` — from **`LocaleProvider`**.
- `useMediaQuery()` — layout breakpoints.

**Rule:** UI imports `@/hooks`. Prefer `useMessages()` in client components; Server Components use
`getMessages(await getLocale())` for static copy.

## 5. Components (`src/components`)

Components **use hooks** (if client) or receive props from parent Server Components. They should not import
**`services`** or **`createCsrApiClient`** for Louve APIs — use **`useCatalog`**, **`useSearch`**, **`useAuth`**, etc.
Group route-specific blocks under subfolders
such as **`home/`** or **`catalog/`**.

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
