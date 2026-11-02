# src/server/db/

Prisma client plumbing.

## Files

- `prisma.ts` — lazy singleton (`getPrisma()`), hot-reload safe,
  `server-only`. Also exports `checkDatabaseConnection()` used by
  `/api/v1/db/health`.

## Rules

- `getPrisma()` is the **only** way to obtain a Prisma Client in this
  codebase. Do not instantiate `new PrismaClient()` elsewhere.
- First call validates `DATABASE_URL` via
  [`@/lib/env/server`](../../lib/env/server.ts). Builds without a DB
  succeed; runtime calls without a DB throw a helpful error.
- Future transaction helpers (`withTx<T>(fn)`) go here as
  `transactions.ts`.

## Related

- [`../../../prisma/schema.prisma`](../../../prisma/schema.prisma)
- [`../../../docs/database/DATABASE_GUIDELINES.md`](../../../docs/database/DATABASE_GUIDELINES.md)
