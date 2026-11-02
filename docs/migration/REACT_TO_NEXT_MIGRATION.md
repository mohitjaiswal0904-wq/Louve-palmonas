# React → Next.js Migration — Louve

Status: **Phases 1–4 complete.** Vite entry has been removed. Each view
has its own real App Router segment. Legacy `/?view=…` URLs are preserved
via server-side redirects. All existing UI code is reused unmodified.

---

## 1. Current architecture (pre-migration)

- Build tool: **Vite 8** (`vite.config.ts`, `index.html`, `src/main.tsx`).
- Framework: **React 19.2.7** with StrictMode.
- Language: **TypeScript 6**, strict, bundler module resolution.
- Routing: **Custom query-string router** (`src/router/useLouveRouter.ts`,
  formerly `src/app/`). Everything lives under `/` and switches via
  `?view=home|collection|pdp|stores|store|account` plus `?product=…` /
  `?store=…` / `?collection=1`.
- Styling: Hand-written CSS under `src/styles/` + per-page CSS under each
  `src/pages/<view>/*.css`. Custom fonts loaded from `/public/fonts/`
  (`Neue Haas`, `Editorial New`).
- State: Local component state + a few browser-persisted stores in
  `src/lib/{account,session,wishlist}.ts` (localStorage).
- 3D: `three` + `@react-three/fiber` + `@react-three/drei` for
  `src/pages/store/StoreScene.tsx`.
- Testing: None configured. `puppeteer` present but unused.
- Backend: None.

## 2. Dependency inventory (runtime)

| Package | Version | Role |
|---|---|---|
| react / react-dom | 19.2.7 | UI |
| three | 0.185.1 | 3D store scene |
| @react-three/fiber | 9.6.1 | React renderer for three |
| @react-three/drei | 10.7.7 | three.js helpers |
| **next** (added) | 16.4.3 | App Router runtime |
| **@prisma/client** (added) | 7.10.1 | DB client |
| **zod** (added) | 4.6.7 | Runtime validation |
| **server-only** (added) | 0.0.1 | Prevents accidental server-only imports in client bundle |

Dev additions: `prisma@7.10.1`, `eslint-config-next@16.4.3`.
Nothing was removed.

## 3. Route inventory

The legacy app is a single-URL SPA. Logical views and current URL shapes:

| View | URL (preserved) | Component |
|---|---|---|
| Home | `/` | `src/pages/home/HomePage.tsx` |
| Collection | `/?view=collection` | `src/pages/collection/CollectionPage.tsx` |
| PDP | `/?view=pdp&product=<id>` | `src/pages/pdp/PdpPage.tsx` |
| Store list | `/?view=stores` | `src/pages/store/StoreListPage.tsx` |
| Store (3D) | `/?view=store&store=<id>[&collection=1]` | `src/pages/store/StorePage.tsx` (lazy) |
| Account | `/?view=account` | `src/pages/account/AccountPage.tsx` |

**Current state (Phase 4 complete):** each view is its own App Router
segment:

| View | Segment |
|---|---|
| Home | `src/app/page.tsx` → `HomeView` |
| Collection | `src/app/collection/page.tsx` → `CollectionView` |
| PDP | `src/app/pdp/[productId]/page.tsx` + `src/app/pdp/page.tsx` → `PdpView` |
| Store list | `src/app/stores/page.tsx` → `StoreListView` |
| Store (3D) | `src/app/stores/[storeId]/page.tsx` → `StoreView` (reads `?collection=1`) |
| Account | `src/app/account/page.tsx` → `AccountView` |

The old query-string URLs are preserved by `redirects()` in
`next.config.ts` (`/?view=collection` → `/collection`, etc.). Shared
chrome (`Header` + `PopularSearches`) lives in `AppShell`. The custom
query-string router (`src/router/`) has been retired.

## 4. Component / shared UI inventory

- Layout: `components/layout/{Header,PopularSearches,NavOverlay,WishlistPanel}`.
- UI primitives: `components/ui/{Cta,EditorialTitle}`.
- Account: `components/account/{AuthPanel,AuthForm}`.
- Feature pages: `pages/{home,collection,pdp,store,account}/*`.

All preserved verbatim.

## 5. State management & data flow

- UI state: local hooks + `useLouveRouter` for navigation.
- Persistent client state: `localStorage` via `src/lib/session.ts`,
  `src/lib/account.ts`, `src/lib/wishlist.ts`.
- No server state, no fetch layer, no API client.

## 6. Integrations

None. No HTTP calls, no third-party SDKs, no analytics.

## 7. Styling & assets

- Global CSS loaded in the same order inside `src/app/layout.tsx` as in
  `src/main.tsx`. No class names, selectors, or token values changed.
- Fonts remain in `/public/fonts`; `src/styles/fonts.css` `@font-face`
  rules unchanged.
- Images and icons continue to be served from `/public/assets`. `next/image`
  is intentionally **not** adopted yet to avoid altering sizing, cropping,
  or loading behaviour.

## 8. Proposed Next.js architecture

See `docs/architecture/FOLDER_STRUCTURE.md`. In summary:

- `src/app/` — App Router (layouts, pages, route handlers under
  `api/v1/*`).
- `src/components/` — reusable UI (unchanged).
- `src/pages/` — legacy feature pages, reused during migration. Will
  gradually move into `src/features/<name>/` as each view is split into
  its own route segment.
- `src/router/` — the legacy custom router, scoped to the current
  single-route shell. Will be deleted once per-view segments exist.
- `src/server/db/prisma.ts` — Prisma singleton (server-only).
- `src/lib/{env,http,errors}` — shared infrastructure.

## 9. React → Next.js mapping

| Legacy | Next.js | Notes |
|---|---|---|
| `src/main.tsx` + `index.html` | `src/app/layout.tsx` | Loads the same CSS in the same order. |
| `src/App.tsx` | per-view segments + `src/components/layout/AppShell.tsx` | `AppShell` is the thin `"use client"` chrome (`Header` + `PopularSearches`). Each view is its own route. |
| `src/app/useLouveRouter.ts` | `src/lib/nav/useAppNav.ts` | Thin shim over `next/navigation` with the same callback shape the `Header` already expects. |
| `window.location`-based routing | `next/navigation` + segment params | Query-string URLs preserved via `redirects()`. |

## 10. Compatibility risks

- **React 19.2.7 / TypeScript 6.0.2 / Vite 8** are bleeding-edge. Next.js
  16.4.3 is compatible with React 19; dependency installs used
  `--legacy-peer-deps` to tolerate pre-release peer-dep ranges.
- **Three.js store scene** must stay inside a Client Component boundary;
  `src/components/providers/LouveApp.tsx` preserves `lazy()` loading.
- **`window.location` reads** inside `useLouveRouter` will throw during
  SSR; mitigated today by rendering `LouveApp` as a Client Component.
  Each future per-view segment should migrate to `useSearchParams()` /
  `useRouter()` from `next/navigation` and drop the custom router.
- **oxlint** config remains (`.oxlintrc.json`) alongside `next lint`.
  No rules were changed in either.

## 11. Phases & validation strategy

1. **Audit** ✅ (this document).
2. **Foundation** ✅ — Next.js installed, `src/app/` scaffolded, global
   CSS wired, `/api/v1/health` and `/api/v1/db/health` live, Prisma
   singleton + minimal schema shipped, env validation in place.
3. **Per-view route split** ✅ — Each view has its own segment; legacy
   `/?view=…` URLs redirect server-side; custom router retired.
4. **Decommission Vite** ✅ — `vite.config.ts`, `index.html`,
   `src/main.tsx`, `src/App.tsx`, `tsconfig.app.json`,
   `tsconfig.node.json`, `vite`, and `@vitejs/plugin-react` removed.
5. **Database wiring** — awaiting a reachable PostgreSQL instance. See
   `docs/architecture/DATABASE_GUIDELINES.md`.
6. **State / API** — move the localStorage stores behind real APIs once
   the schema is agreed.
7. **UI parity verification** — side-by-side screenshot pass (Puppeteer
   is already a dev dep).

## 12. Known unknowns & assumptions

- **DATABASE_URL** is not provided; `/api/v1/db/health` will return 503
  until it is set in `.env`.
- **Business domain** is not defined; Prisma ships only a `HealthProbe`
  model to avoid speculative tables.
- **No existing authentication** — the local `account.ts`/`session.ts`
  stores are client-only. A real auth integration point is left for a
  later phase; no insecure placeholder was introduced.
- Node 24 and npm 11 were used locally; CI compatibility is not
  verified.
