# Database Guidelines

## Stack

- PostgreSQL (any 14+ instance).
- Prisma ORM (`prisma` CLI + `@prisma/client`).
- Schema: `prisma/schema.prisma`.
- Client: `src/server/db/prisma.ts` (singleton, server-only).

## Environment

Set `DATABASE_URL` in `.env` (local) or your deployment secret store:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

The server env is validated at first use by `src/lib/env/server.ts`.
`DATABASE_URL` is optional at build time and required at runtime for any
code path that touches Prisma.

## Local setup

```bash
# 1. Copy env template
cp .env.example .env
# 2. Edit DATABASE_URL to point at a running PostgreSQL instance
# 3. Generate the client
npm run prisma:generate
# 4. Create and apply the initial migration
npm run prisma:migrate -- --name init
# 5. (Optional) open Studio
npm run prisma:studio
```

> **Not yet executed.** No database was available during the Phase 2
> foundation migration, so no migration has been generated. The commands
> above are the exact ones a developer should run once a database is
> reachable.

## Schema conventions

- `id` is `String @id @default(cuid())`.
- Timestamps: `createdAt DateTime @default(now())`,
  `updatedAt DateTime @updatedAt`.
- Soft deletes are off by default; introduce `deletedAt` only when a
  real requirement appears.
- Keep names singular and `PascalCase` for models, `camelCase` for
  fields.
- Add a Prisma relation only when queries actually need it.

## Access patterns

- Route handlers → service → repository → `getPrisma()`.
- Never call `getPrisma()` from a Client Component or a hook that may
  run in the browser.
- Never return raw Prisma records containing secret fields (hashes,
  tokens, PII) to the client; select only what the API contract needs.

## Migrations

- `prisma migrate dev` for local iteration; produces files under
  `prisma/migrations/`.
- `prisma migrate deploy` in production. Never `prisma db push` in
  production.
- Never run destructive migrations against an unknown database.

## Relations and indexes

- Add indexes to fields used in filters (`@@index([status, createdAt])`).
- Use foreign keys with explicit `onDelete` behaviour. Prefer `Restrict`
  for safety; use `Cascade` only when ownership is unambiguous.
- Normalise aggressively; denormalise only with a documented reason.

## Transactions

Use `prisma.$transaction` for multi-write operations that must succeed
or fail atomically. Prefer the interactive callback form when a middle
step depends on an earlier result:

```ts
await getPrisma().$transaction(async (tx) => {
  const user = await tx.user.create({ data: ... });
  await tx.wishlistItem.createMany({ data: ... });
  return user;
});
```

Set a sensible `timeout` (default is 5s) for long transactions.

## Query performance

- Always `select` the fields you need instead of returning entire rows.
- Avoid N+1 by using `include` or batched queries.
- Add indexes before shipping queries that scan large tables.
- Use `prisma.$metrics` or query logging in development to spot slow
  queries; **never** enable query logging in production.

## Connection management

- `getPrisma()` returns a cached singleton. Do not instantiate
  `new PrismaClient()` elsewhere.
- Production hosts should use the Prisma recommended connection pool
  settings for the target platform (see Prisma docs).
- Set `connection_limit` in `DATABASE_URL` when running serverless.

## Production migrations

- Only `prisma migrate deploy`. Never `prisma migrate dev` and never
  `prisma db push`.
- Run migrations before switching the application to the new build.
- Breaking schema changes require a two-step rollout: ship additive
  schema → deploy app that writes both old and new → migrate data →
  ship app that reads new only → remove old schema.
- Never run destructive statements (`DROP TABLE`, `TRUNCATE`,
  `ALTER TABLE … DROP COLUMN`) against production without explicit
  authorisation and a verified backup.

## Data-access boundaries

- Route handlers → service → repository → `getPrisma()`.
- Repositories map Prisma results to domain types. Return DTOs — do not
  leak Prisma types across the module boundary.
- Services enforce invariants and compose multiple repositories.

## Health probe

`GET /api/v1/db/health` executes `SELECT 1` via Prisma and returns
`{ database: "ready" }` on success or `503 SERVICE_UNAVAILABLE` on
failure. It intentionally never surfaces the connection string or
driver-level error details.
