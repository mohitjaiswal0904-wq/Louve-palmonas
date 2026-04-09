# Development guide

## Project structure (high level)

- `src/app/` — Next.js routes and layouts
- `src/features/` — feature-focused UI blocks (e.g. home sections)
- `src/components/` — shared components
- `src/components/ui/` — shadcn/ui generated components
- `src/components/seo/` — minimal SEO helpers
- `src/lib/config/` — brand + site + SEO constants

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

