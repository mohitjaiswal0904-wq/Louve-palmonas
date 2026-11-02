# src/views/

Per-route client wrappers around the pre-migration page components.
**Legacy layer** — new feature work does not go here; use
[`../features/`](../features/README.md) instead.

## Shape

For each view:

```
src/views/<name>/
├── <Name>View.tsx     # thin "use client" wrapper mounted by src/app/<name>/page.tsx
├── <Name>Page.tsx     # the actual UI (migrated from the Vite SPA)
├── <name>.css         # per-view styles
└── (other section components, e.g. GoldSpectrum.tsx)
```

The `*View.tsx` wrapper:

1. Wraps the page in [`AppShell`](../components/layout/AppShell.tsx).
2. Supplies callbacks via [`useAppNav`](../lib/nav/useAppNav.ts) so the
   legacy `<Header />` props stay unchanged.
3. Reads any dynamic segment params / search params passed from
   `src/app/.../page.tsx`.

## Current views

- `home/` — Home page.
- `collection/` — Collection / PLP.
- `pdp/` — Product detail (expert consult modal, USPs).
- `store/` — Store list, immersive 3D store scene, HUD, controls.
- `account/` — Account page.

## Rules

- Everything here is client-side (`"use client"` lives on the `*View`
  entry; the inner `*Page` components also run client-side because of
  the pre-migration code).
- No Prisma, no server-only imports.
- No new abstractions — if work needs its own hooks, schemas, or
  services, move it to [`../features/<name>/`](../features/README.md)
  instead of growing `views/`.

## Migration path

Existing views stay here until an intentional refactor moves them to
`src/features/`. Do not do a bulk migration; move view-by-view when the
feature actually needs the richer structure.
