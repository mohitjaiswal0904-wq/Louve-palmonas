# src/app/

Next.js App Router. **Routes, layouts, loading/error boundaries, and
HTTP route handlers only.**

## Purpose

Define URLs and compose pages. Delegate real work to features and
services.

## Responsibilities

- Route segments (`page.tsx`), layouts (`layout.tsx`), fallbacks
  (`loading.tsx`, `error.tsx`, `not-found.tsx`).
- HTTP endpoints under [`api/`](api/README.md).
- Page-level `metadata` / `generateMetadata`.
- Choosing rendering mode per route (static / dynamic / revalidate).

## What belongs here

- `page.tsx` as a **Server Component** that renders a per-view wrapper
  from [`src/views/<view>/`](../views/) or a feature from
  [`src/features/<feature>/`](../features/).
- Route-level metadata exports.
- Route handlers under [`api/v1/<module>/route.ts`](api/).

## What does not belong here

- Large chunks of business logic.
- Direct Prisma access (except in a route handler calling a
  repository / service).
- Reusable UI components — those live in `src/components/` or inside
  a feature.
- Hooks and state primitives.

## Dependency rules

- May import from: `src/components`, `src/features`, `src/views`,
  `src/lib`, `src/hooks`, `src/types`, `src/schemas`. Route handlers may
  also import `src/server/**`, `src/actions/**`.
- Must not import: feature internals that bypass the feature's `index.ts`.

## Naming

- Segment folders: lowercase (`collection`, `stores`).
- Dynamic segment folders: `[paramName]`.
- Route handler files: always `route.ts`.
- Metadata-driven files follow Next.js names: `layout.tsx`,
  `loading.tsx`, `error.tsx`, `not-found.tsx`, `page.tsx`.

## Current routes

```
/                 -> src/views/home/HomeView
/collection       -> src/views/collection/CollectionView
/pdp              -> src/views/pdp/PdpView (fallback)
/pdp/[productId]  -> src/views/pdp/PdpView
/stores           -> src/views/store/StoreListView
/stores/[storeId] -> src/views/store/StoreView
/account          -> src/views/account/AccountView
/api/v1/health         -> JSON health
/api/v1/db/health      -> JSON DB readiness
```

## Rendering strategy

See [`../../docs/architecture/RENDERING_STRATEGY.md`](../../docs/architecture/RENDERING_STRATEGY.md).

## Testing

- UI pages: covered by component tests of the per-view wrapper + visual
  regression on the segment URL.
- Route handlers: integration tests hitting the handler directly.

## Adding a new route

1. Create `src/app/<segment>/page.tsx` (Server Component).
2. If the view is interactive, create
   `src/views/<name>/<Name>View.tsx` (`"use client"`) and import it from
   `page.tsx`. For new feature work, put the wrapper inside
   `src/features/<feature>/` instead.
3. Export `metadata` (or `generateMetadata` for dynamic segments).
4. If a legacy URL maps to this new route, add a redirect in
   `next.config.ts`.
5. Add a happy-path smoke test.
6. Update [`../../docs/architecture/FOLDER_STRUCTURE.md`](../../docs/architecture/FOLDER_STRUCTURE.md)
   if a new route pattern is introduced.
