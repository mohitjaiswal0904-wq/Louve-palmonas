# Development guide

## Project structure (high level)

- `src/app/` — Next.js routes, layouts, `generateMetadata`, `/api/locale`
- `src/features/` — feature-focused UI blocks (e.g. home sections)
- `src/components/` — shared components
- `src/components/ui/` — shadcn/ui generated components
- `src/components/seo/` — minimal SEO helpers
- `src/lib/config/` — **non-translated** env helpers (`env.ts`, `languages.ts`)
- `src/lib/l10n/` — **all copy**: `English`, `Hindi`, `French`, `Spanish` message bundles
- `src/lib/client/` — SSR vs CSR API clients for the Louve backend
- `src/services/` — service layer (uses clients)
- `src/state/` — React context (e.g. locale)
- `src/hooks/` — `useMessages`, `useLocale`, etc.
- `src/types/config/` — `AppMessages`, locale types

See also:

- [STRUCTURE.md](./STRUCTURE.md) — detailed folder map
- [FLOW.md](./FLOW.md) — client → service → state → hooks → components → pages
- [LOCALIZATION.md](./LOCALIZATION.md) — how strings and locales work

## Adding UI components (shadcn)

Use the CLI so conventions stay consistent:

```bash
pnpm dlx shadcn@latest add <component>
```

Examples used in this repo:

- `card`, `badge`, `separator`, `sheet`, `navigation-menu`, `dropdown-menu`, `input`, `textarea`

## Lint/build

```bash
pnpm lint
pnpm build
```

## Tailwind

Tailwind v4 is loaded via `src/app/globals.css` imports.

## Common pitfalls

- If `/sitemap.xml` is empty, set `NEXT_PUBLIC_SITE_URL`.
- Route groups like `(public)` do not change the URL path.
- After adding UI strings, update **all four** locale files under `src/lib/l10n/` so `AppMessages` stays in sync.
