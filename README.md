# Louve Frontend

Customer-facing website for **Louve** — a contemporary fine-jewellery house **from the house of Palmonas**. This app is the public storefront and account experience; it talks to **Louve backend** via `NEXT_PUBLIC_API_URL` (see `.env.example` and `src/lib/config/env.ts`).

## Stack

| Layer | Technology |
|-------|------------|
| Framework | **Next.js 16** (App Router), **React 19** |
| Styling | **Tailwind CSS v4**, CSS variables for Louve palette |
| UI primitives | **shadcn/ui** (Base UI) — add components with CLI, do not hand-roll duplicates |
| Language | **TypeScript** |
| Package manager | **pnpm** |
| Font | **Montserrat** (see `src/app/layout.tsx`) |

## Architecture (required flow)

Data and side effects flow **down** this stack (see **`docs/FLOW.md`** and **`.cursorrules`**):

```
Pages (src/app) → Components / Features → Hooks → State & Providers → Services → lib/client → API
```

**Localization:** all user-visible copy lives in **`src/lib/l10n/{English,Hindi,French,Spanish}/messages.ts`**, typed by **`src/types/config/messages.ts`**. Non-translated env URLs live in **`src/lib/config/env.ts`**.

## Quick start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Set **`NEXT_PUBLIC_SITE_URL`** in `.env.local` for sitemap/canonicals when needed.

```bash
pnpm lint
pnpm build
pnpm start
```

**Makefile** (optional): `make up` / `make down` / `make rebuild` (Docker), `make pm2-reload` (PM2 on host), `make install`, `make build`, `make start`.

## Documentation map

| Document | Purpose |
|----------|---------|
| **[docs/README.md](docs/README.md)** | Onboarding, brand, routing, SEO, deployment index |
| **[docs/STRUCTURE.md](docs/STRUCTURE.md)** | Repository folder map |
| **[docs/FLOW.md](docs/FLOW.md)** | Client → service → state → hooks → components → pages |
| **[docs/LOCALIZATION.md](docs/LOCALIZATION.md)** | Locales, cookies, adding strings |
| **[docs/NEW_FEATURE.md](docs/NEW_FEATURE.md)** | Checklist for new features |
| **[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)** | shadcn, Tailwind, tooling |
| **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** | Amplify, Docker, PM2 |

**Per-folder READMEs:** under **`src/`**, **`docs/`**, **`deployment/`**, **`public/`** — each explains what belongs there and how it connects to the rest of the app (start with **[src/README.md](src/README.md)**).

## Routing (summary)

| Area | Path | Note |
|------|------|------|
| Public | `(public)/*` | Marketing, catalog shells, auth *pages* at `/auth/*` |
| Account | `(auth)/*` | Cart, wishlist, account — route group does not prefix URL |
| API | `app/api/locale` | Sets `LOUVE_LOCALE` cookie for language |

## Deployment

- **AWS Amplify:** `amplify.yaml`
- **Docker:** `deployment/Dockerfile` (Next **standalone** output)
- **PM2:** `deployment/ecosystem.config.cjs`

## Related

- **Louve backend** — separate repo; CORS must allow this site’s **browser origin** (not the API hostname).

## Brand (short)

Louve — *she-wolf*: instinct, independence, territory, quiet power. Tagline: **“Mark your Presence.”** Palette and values are documented in **`docs/README.md`**.
