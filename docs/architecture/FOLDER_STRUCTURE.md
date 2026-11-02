# Folder Structure

Authoritative reference. Must agree with the actual repository. If a
folder is added/removed/repurposed, update this document in the same
change.

Legend:
- **S** = server-only (must not be imported from client code).
- **C** = client-safe (fine to use in both).
- **M** = mixed (contains both; each file is tagged).
- **☐** = reserved; no files yet, documented for future use.

## Top-level

| Path | Role | Side |
|---|---|---|
| `src/app/` | Next.js App Router (routes, layouts, API handlers). | M |
| `src/components/` | Shared presentation. | C |
| `src/features/` ☐ | Feature modules (own UI + logic). | M (per-file) |
| `src/views/` | Per-route client wrappers that reuse legacy page components. | C |
| `src/services/` ☐ | Browser-safe service abstractions / API clients. | C |
| `src/actions/` ☐ | Shared Server Actions. | S |
| `src/hooks/` ☐ | Reusable React hooks. | C |
| `src/types/` ☐ | Shared TypeScript contracts. | C |
| `src/schemas/` ☐ | Shared Zod schemas. | C |
| `src/xml/` ☐ | XML parse/serialize/transform. | C (file-dependent) |
| `src/lib/` | Framework-agnostic infra utilities. | M |
| `src/server/` | Server-only infrastructure. | S |
| `src/config/` ☐ | Validated config composition. | M |
| `src/constants/` ☐ | True shared constants. | C |
| `src/styles/` | Global CSS + tokens + fonts. | C |
| `src/test-utils/` ☐ | Reusable test helpers / fixtures. | — |
| `src/data/` | Static authored content (products, nav, stores). | C |
| `public/` | Static assets served under `/`. | — |
| `prisma/` | Prisma schema, migrations, seed. | — |
| `tests/` ☐ | Standalone test suites. | — |
| `docs/` | Engineering docs. | — |
| `.cursor/` | Cursor rules + skills. | — |
| `.agents/` | Reserved for future agent tooling. | — |

## `src/app/`

| Path | What |
|---|---|
| `layout.tsx` | Root HTML + global CSS + metadata. **Server Component.** |
| `page.tsx` | Home. Server Component → `HomeView`. |
| `loading.tsx` / `error.tsx` / `not-found.tsx` | Route-level fallbacks. |
| `collection/page.tsx` | `/collection` → `CollectionView`. |
| `pdp/page.tsx` | `/pdp` fallback (no product id). |
| `pdp/[productId]/page.tsx` | `/pdp/<id>` → `PdpView`. |
| `stores/page.tsx` | `/stores` → `StoreListView`. |
| `stores/[storeId]/page.tsx` | `/stores/<id>` → `StoreView` (reads `?collection=1`). |
| `account/page.tsx` | `/account` → `AccountView`. |
| `api/v1/health/route.ts` | Liveness. Node runtime, dynamic. |
| `api/v1/db/health/route.ts` | DB readiness (`SELECT 1` via Prisma). |

**Allowed imports:** anything client-safe or server-side (route handlers
only). **Prohibited:** large chunks of business logic — those belong in
`src/features/` or `src/server/services/`.

## `src/components/`

| Path | What |
|---|---|
| `ui/` | Primitives (`Cta`, `EditorialTitle`). Pure presentation. |
| `layout/` | `Header`, `AppShell`, `NavOverlay`, `PopularSearches`, `WishlistPanel`. |
| `account/` | `AuthPanel`, `AuthForm`. (Will move to `features/account/` once a server backend exists.) |
| `common/` ☐ | Generic reusable widgets. |
| `navigation/` ☐ | Navigation-specific UI (menus, breadcrumbs). |
| `providers/` ☐ | React providers (Theme, Session). |

**Allowed imports:** `components/*`, `hooks/*`, `lib/*` (client-safe
only), `types/*`, `schemas/*`, `data/*`. **Prohibited:** `server/*`,
`@prisma/client`, `src/lib/env/server`.

## `src/views/`

Thin `"use client"` wrappers (one `*View.tsx` per route segment) and the
original per-page implementations (`HomePage.tsx`, `PdpPage.tsx`, …).

New feature work should **not** add to `views/`; use `src/features/`.
Existing views will migrate opportunistically.

## `src/features/`

Target home for new feature modules. Template:

```
src/features/<feature>/
├── README.md
├── components/
├── hooks/
├── actions/
├── services/        # server-only unless proven otherwise
├── schemas/
├── types/
├── utils/
└── index.ts
```

Only create the subfolders a feature actually uses.

## `src/lib/`

| Path | What | Side |
|---|---|---|
| `env/server.ts` | Zod-validated server env. | **S** |
| `errors/app-error.ts` | `AppError`, codes, status map. | C |
| `http/response.ts` | `ok()` / `fail()` / `toErrorResponse()`. | C (uses `NextResponse`) |
| `nav/useAppNav.ts` | `next/navigation` shim. | C |
| `account.ts`, `session.ts`, `wishlist.ts` | `localStorage` stores. | C |
| `slugify.ts` | String util. | C |

`lib/` is **not** a dumping ground. New files must belong to a focused
subfolder (`<topic>/`).

## `src/server/`

| Path | What |
|---|---|
| `db/prisma.ts` | Prisma singleton + `checkDatabaseConnection()`. |
| `repositories/` ☐ | Data-access boundary (one repo per aggregate). |
| `services/` ☐ | Application / domain services. |
| `auth/` ☐ | Server-side auth integration. |
| `security/` ☐ | CSRF, rate limit, header helpers. |

Every file here **must** import `server-only`.

## `src/xml/` (reserved)

No XML workload today. Documented in [`../../src/xml/README.md`](../../src/xml/README.md).
When added, use `parsers/`, `serializers/`, `schemas/`, `transformers/`,
`types/`, `utils/` only as needed.

Not to be confused with Next.js metadata-based sitemap/robots, which
live in `src/app/`.

## `public/`

Feature-grouped (`collection/`, `menu/`, `pdp/`, `slides/`,
`slides/feature/`) + root-level icons/logo. Documented at
[`../../public/README.md`](../../public/README.md) and
[`../../public/assets/README.md`](../../public/assets/README.md).

Imports from `src/` reference files by their public URL
(`/assets/pdp/hero.png`), never via a TS import of `public/`.

## `docs/`, `.cursor/`, `.agents/`

See each tree's own README.
