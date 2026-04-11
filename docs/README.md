# Louve Frontend — Documentation

Louve is a sub-brand **from the house of Palmonas**, built as a clean, aesthetic, contemporary
jewellery website.

This frontend is a **Next.js App Router** project with Tailwind v4 and **shadcn/ui** components.

## Documentation index

| Doc | Purpose |
|-----|---------|
| **[../README.md](../README.md)** | Project overview, stack, quick start, deployment summary |
| **[STRUCTURE.md](./STRUCTURE.md)** | Folder map (aligns with **FLOW**) |
| **[FLOW.md](./FLOW.md)** | Mandatory layering: client → service → state → hooks → components → pages |
| **[LOCALIZATION.md](./LOCALIZATION.md)** | Four locales, cookies, metadata |
| **[NEW_FEATURE.md](./NEW_FEATURE.md)** | Checklist for new routes and APIs |
| **[DEVELOPMENT.md](./DEVELOPMENT.md)** | shadcn, Tailwind, **utils** |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Amplify, Docker, PM2 |

**Per-folder READMEs:** Under **`src/`**, **`public/`**, and **`deployment/`**, almost every directory has a **`README.md`** explaining its role and conventions — start at **[../src/README.md](../src/README.md)**.

## UI reference

We are taking inspiration from the simplicity and spacing of
[`aamoraharchitects.com`](https://www.aamoraharchitects.com/) (clean layout, subtle grid lines, light
typography).

Font choice matched: **Montserrat**.

## Brand notes (from the Louve brand deck)

Louve comes from the French word for **she-wolf**. Across cultures, the she-wolf represents:

- Instinct
- Independence
- Protection
- Quiet leadership

Core values we reflect in UI and copy:

- **Instinct** — jewellery chosen with confidence
- **Independence** — luxury owned by the wearer
- **Territory** — pieces that mark identity
- **Quiet power** — strength expressed through elegance

Signature line: **“Mark your Presence.”**

Brand palette (CSS variables live in `src/app/globals.css`):

- Primal Rouge `#77080E`
- Aurora Forest `#063F47`
- Soft Ivory `#F4F1EA`
- Graphite Black `#1F1F1F`
- Champagne Gold `#D6B97C`

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- pnpm (preferred)

### Install

```bash
pnpm install
```

### Run locally

```bash
pnpm dev
```

### Production build

```bash
pnpm build
pnpm start
```

### Useful Makefile shortcuts

From `louve-frontend/`:

```bash
make install
make build
make start
make pm2-reload   # rebuild + pm2 reload (server/VM usage)
```

## Architecture

Data and copy flow through the stack in this order:

**`lib/client` (SSR/CSR)** → **`services`** → **`state`** → **`hooks`** → **`components`** → **`pages`**.

- Backend HTTP: `src/lib/client` (`createSsrApiClient`, `createCsrApiClient`).
- Strings and navigation: `src/lib/l10n/{English,Hindi,French,Spanish}/messages.ts`, typed by `src/types/config/messages.ts`.
- Non-translated URLs: `src/lib/config/env.ts` (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL`).
- Language cookie: `LOUVE_LOCALE`, set via `POST /api/locale` from the header language menu.

Detailed docs:

- [STRUCTURE.md](./STRUCTURE.md) — directory reference
- [FLOW.md](./FLOW.md) — layering rules
- [LOCALIZATION.md](./LOCALIZATION.md) — i18n workflow
- [NEW_FEATURE.md](./NEW_FEATURE.md) — checklist for new work

## Routing

This project uses a route group for public pages:

- `src/app/(public)/about/page.tsx` → `/about`
- `src/app/(public)/collections/page.tsx` → `/collections`

Global pages:

- `src/app/page.tsx` → `/`
- `src/app/not-found.tsx` → 404 UI
- `src/app/error.tsx` → route error boundary
- `src/app/global-error.tsx` → app-level fallback
- `src/app/loading.tsx` → fallback loading UI
- `src/app/robots.ts` → `/robots.txt`
- `src/app/sitemap.ts` → `/sitemap.xml`

## SEO

- `src/components/seo/createMetadata()` generates minimal metadata.
- Canonical URLs and sitemap depend on `NEXT_PUBLIC_SITE_URL`.

## UI components

We use **shadcn/ui** components generated into:

- `src/components/ui/*`

Do not hand-roll replacements unless needed—prefer adding via the shadcn CLI.

## Deployment

### AWS Amplify

`amplify.yaml` installs pnpm globally and runs:

- `pnpm install --frozen-lockfile`
- `pnpm build`

### Docker

`deployment/Dockerfile` builds a Next.js **standalone** output and runs `node server.js`.

### PM2

`deployment/ecosystem.config.cjs` runs `next start -p 3000`.

## Common env vars

Create `.env.local` for local overrides.

- `NEXT_PUBLIC_SITE_URL` — public website base URL (used for sitemap/canonicals)
- `NEXT_PUBLIC_API_URL` — Louve API base (local default in code: `http://localhost:8080`; Docker build defaults to `https://api-louve.palmonas.tech` via `deployment/Dockerfile` args)
