# ADR 0002 — PostgreSQL + Prisma 6 for persistence

- **Status:** Accepted
- **Date:** 2026-10-29

## Context

The application needs a durable server-side store once localStorage
stand-ins (`src/lib/{session,account,wishlist}.ts`) are replaced by real
backends. We also want a typed ORM aligned with Next.js server runtimes.

## Options considered

1. **PostgreSQL + Prisma 6.**
2. **PostgreSQL + Drizzle.** Lower-level, less generated runtime; a
   plausible fit, but Prisma's tooling (Studio, migrations, generated
   client) is more productive at our stage and the team is familiar.
3. **SQLite.** Operationally simple, but we expect multi-connection
   writes, concurrency, and eventual production hosting with
   replication.
4. **Prisma 7-rc.** Removes `url = env(...)` from `schema.prisma` and
   requires a `prisma.config.ts` with a driver adapter or Accelerate. We
   don't want to adopt a release candidate for foundational infra.

## Decision

PostgreSQL as the primary store. Prisma **6.19** as the ORM. One
Prisma client singleton under
[`src/server/db/prisma.ts`](../../src/server/db/prisma.ts), lazy, with
hot-reload safety via `globalThis`.

## Consequences

- Schema is single-sourced in `prisma/schema.prisma`.
- `prisma migrate dev` locally, `prisma migrate deploy` in production.
  `db push` is never used in production.
- Database access must go through `getPrisma()`. New aggregates get a
  repository under `src/server/repositories/`.
- `server-only` protects client bundles from accidental Prisma imports.
- `DATABASE_URL` is validated by [`src/lib/env/server.ts`](../../src/lib/env/server.ts)
  on first use, not at build time, so builds don't require a running DB.

## Alternatives rejected

Drizzle (team familiarity + Studio), SQLite (production fit),
Prisma 7-rc (stability).

## Related files

- [`../../prisma/schema.prisma`](../../prisma/schema.prisma)
- [`../../src/server/db/prisma.ts`](../../src/server/db/prisma.ts)
- [`../database/DATABASE_GUIDELINES.md`](../database/DATABASE_GUIDELINES.md)
