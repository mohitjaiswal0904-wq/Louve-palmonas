# ADR 0001 — Next.js App Router as the application shell

- **Status:** Accepted
- **Date:** 2026-10-29
- **Deciders:** Phase-1 migration pairing

## Context

Louve was a Vite + React 19 SPA with a hand-written query-string router
and no backend. The product roadmap requires a server-rendered UI, API
endpoints, and eventual authentication. We needed one framework that
covers the server-rendered UI, API handlers, and native server/client
boundaries so we don't operate two deploy artifacts.

## Options considered

1. **Next.js 16 (App Router).** Server Components, Route Handlers,
   Server Actions, Turbopack dev, excellent React 19 alignment.
2. **Remix.** Loader/action model is clean, but weaker ecosystem overlap
   with the React 19 features we expect to use (Server Actions, Server
   Components) and a smaller plugin ecosystem for our 3D/media stack.
3. **Keep Vite + add a separate BFF (Fastify/Hono).** Two deploy
   targets, no Server Components, extra orchestration for shared types.

## Decision

Next.js 16 App Router with TypeScript strict. Single deploy artifact.
`src/app/**` owns routing and HTTP boundaries; `src/server/**` owns
server-only infra.

## Consequences

- UI code can incrementally become Server Components; initial pages are
  prerendered.
- `/api/v1/*` is the HTTP surface. One versioned prefix.
- The legacy custom router (`src/router/*`) was retired in Phase 1;
  legacy `/?view=…` URLs preserved via `redirects()` in
  `next.config.ts`.
- We rely on `server-only` to prevent accidental client bundling of
  Prisma / secrets.

## Alternatives rejected

Remix (ecosystem fit), Vite + BFF (two artifacts).

## Related files

- [`../../next.config.ts`](../../next.config.ts)
- [`../../src/app/layout.tsx`](../../src/app/layout.tsx)
- [`../migration/REACT_TO_NEXT_MIGRATION.md`](../migration/REACT_TO_NEXT_MIGRATION.md)
