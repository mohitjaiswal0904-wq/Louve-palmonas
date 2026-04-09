# Repository structure

This document explains where code lives and how folders relate to each other. It matches the **data flow**
described in [FLOW.md](./FLOW.md).

## Top level

| Path | Role |
|------|------|
| `src/app/` | Next.js App Router: routes, layouts, `generateMetadata`, API route handlers |
| `src/components/` | Reusable UI: `ui/` (shadcn), `layout/`, `common/`, `seo/` |
| `src/features/` | Optional feature bundles (e.g. home sections) composed of components + hooks |
| `src/lib/` | Shared utilities: `client/`, `config/`, `l10n/`, `utils.ts` |
| `src/services/` | Service layer: orchestrates API calls via `lib/client` |
| `src/state/` | React context and client state consumed by hooks |
| `src/hooks/` | Thin hooks for locale, messages, media queries, etc. |
| `src/types/` | TypeScript types; `types/config/` holds **l10n and message shapes** |
| `src/providers/` | App-level providers (`AppProviders`, layout UI state) |
| `src/utils/` | Small helpers (e.g. `cn`, `interpolate`) |
| `deployment/` | Docker, PM2 |
| `docs/` | Human-facing documentation |

## Configuration vs localization

- **`src/lib/config/`** — Only **non-translated** concerns: `env.ts` (URLs), `languages.ts` (header locale list).
- **`src/lib/l10n/{English,Hindi,French,Spanish}/`** — All **customer-facing copy**, navigation labels, SEO
  sentences, errors, and page metadata strings. Each folder exports a typed `messages` object.

Do not add marketing copy under `lib/config`; add it to every locale file under `lib/l10n/` and extend
`AppMessages` in `src/types/config/messages.ts`.

## Types

- **`src/types/commerce.ts`** — Product and money types for future catalog work.
- **`src/types/config/`** — `locale.ts`, `messages.ts` (`AppMessages`, `PageId`, navigation shapes).

## API route

- `src/app/api/locale/route.ts` — `POST` body `{ "locale": "en" | "hi" | "fr" | "es" }`, sets `LOUVE_LOCALE` cookie.
