# Louve Frontend

Louve is a sub-brand **from the house of Palmonas**.

This repo contains the Louve website frontend built with **Next.js (App Router)**, Tailwind v4, and
**shadcn/ui**.

## Brand snapshot

- Louve (she-wolf): instinct, independence, protection, quiet leadership
- Core values: **Instinct**, **Independence**, **Territory**, **Quiet power**
- Tagline: **“Mark your Presence.”**

## Quick start

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Common commands

```bash
pnpm lint
pnpm build
pnpm start
```

Makefile shortcuts (optional):

```bash
make install
make build
make start
```

## Project docs

- `docs/README.md` — onboarding + architecture + brand notes
- `docs/STRUCTURE.md` — folder map
- `docs/FLOW.md` — client → service → state → hooks → components → pages
- `docs/LOCALIZATION.md` — locales and message bundles
- `docs/NEW_FEATURE.md` — feature checklist
- `docs/DEVELOPMENT.md`
- `docs/DEPLOYMENT.md`

## Routing

Public pages live under the route group:

- `src/app/(public)/about/page.tsx` → `/about`
- `src/app/(public)/collections/page.tsx` → `/collections`

## Deployment

- **AWS Amplify**: `amplify.yaml`
- **Docker**: `deployment/Dockerfile`
- **PM2**: `deployment/ecosystem.config.cjs`

