# Architecture Decisions (rolling log)

Short entries. Significant decisions get a full ADR under
[`../decisions/`](../decisions/).

Status values: Proposed · Accepted · Superseded · Rejected · Deprecated.

---

## 2026-10-29 — Next.js App Router as the application shell

- **Status:** Accepted. See [`../decisions/0001-nextjs-app-router.md`](../decisions/0001-nextjs-app-router.md).
- **Context:** Replacing the Vite + React 19 SPA with a full-stack
  framework that supports Server Components, Route Handlers, and native
  server/client boundaries.
- **Decision:** Next.js 16 App Router + TypeScript strict.
- **Alternatives rejected:** Remix (less ecosystem overlap with React 19
  features we rely on today), continuing with Vite + external BFF (two
  deploy targets, no Server Components).

## 2026-10-29 — PostgreSQL + Prisma 6

- **Status:** Accepted. See [`../decisions/0002-postgresql-prisma.md`](../decisions/0002-postgresql-prisma.md).
- **Context:** Need a durable server-side store once the localStorage
  stand-ins (session/account/wishlist) are replaced.
- **Decision:** PostgreSQL as the primary store, Prisma 6 as the ORM.
- **Why Prisma 6 (not 7-rc):** Prisma 7 removed `url = env(...)` from
  `schema.prisma`, requires `prisma.config.ts` with an adapter or
  Accelerate. Prisma 6 keeps the straightforward schema and is still
  actively supported.

## 2026-10-29 — Feature boundary: `src/features/` as the forward-looking home for new work

- **Status:** Accepted. See [`../decisions/0003-feature-module-boundaries.md`](../decisions/0003-feature-module-boundaries.md).
- **Context:** The migration landed with `src/views/` as a thin wrapper
  over the pre-Next.js `*Page.tsx` components. That is fine for existing
  pages but we don't want new feature logic sprawling across `views/`,
  `components/`, and `lib/`.
- **Decision:** All new product features go under `src/features/<name>/`
  with the sub-folders they actually need (components, hooks, actions,
  services, schemas, types, utils).
- **Migration path:** Existing views stay in `src/views/` until an
  intentional refactor moves them.

## 2026-10-29 — `public/assets/` stays feature-grouped (not kind-grouped)

- **Status:** Accepted.
- **Context:** The Phase-2 brief suggests `public/assets/{images,icons,
  fonts,…}/`. The repo already uses feature-grouped folders
  (`collection/`, `menu/`, `pdp/`, `slides/`, `slides/feature/`) that
  are referenced from `src/data/*` and components.
- **Decision:** Keep the working organisation. Document it in
  `public/README.md` and `public/assets/README.md`. Fonts remain in
  `public/fonts/` for `@font-face` loading.
- **Reversed when:** a real asset management workflow needs
  category-based paths.

## 2026-10-29 — Server/client boundary enforced by `server-only`

- **Status:** Accepted.
- **Context:** We considered an ESLint `no-restricted-imports` rule.
- **Decision:** Use `server-only` on every file under `src/server/**`
  and on `src/lib/env/server.ts`. This fails the build when a client
  module reaches server-only code. ESLint boundaries deferred — too
  noisy against the current React 19 / Next 16 setup.
