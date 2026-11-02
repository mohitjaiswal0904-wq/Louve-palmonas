# prisma/

Prisma schema, migrations, and (optional) seed script.

## Contents

- [`schema.prisma`](schema.prisma) — the single source of truth for the
  database schema.
- `migrations/` — generated migration history. Add; never edit.
- `seed.ts` — optional seed script. Not present today; introduce it with
  `prisma.seed` in `package.json` when needed.

## What belongs here

- The Prisma schema and its migration history.
- A seed script keyed to the schema.

## What does not belong here

- Route handlers, services, or any application code.
- Scripts unrelated to the schema (put those in `/scripts/`).
- Secrets. `DATABASE_URL` is read from env; it is never hard-coded.

## Workflow

Local dev (requires `DATABASE_URL` in `.env`):

```bash
npm run prisma:generate                  # generate Prisma Client
npm run prisma:migrate -- --name <msg>   # create & apply dev migration
npm run db:validate                      # validate schema syntax
npm run prisma:studio                    # open Studio
```

Production:

```bash
npm run prisma:deploy                    # apply migrations
```

**Never** run `prisma migrate dev` or `prisma db push` in production.

## When editing `schema.prisma`

1. Make the smallest coherent change.
2. Follow the conventions in
   [`../docs/database/DATABASE_GUIDELINES.md`](../docs/database/DATABASE_GUIDELINES.md).
3. Run `npm run db:validate` and `npm run prisma:generate`.
4. Create the migration.
5. Update the database docs if the change introduces a new pattern
   (indexes, relations, soft-delete, etc.).
6. If the model is new, consider whether a repository under
   `src/server/repositories/` is now warranted.

## Current status

Only `HealthProbe` exists — a placeholder used by `/api/v1/db/health`.
Real domain models (User, Product, Store, Wishlist, …) are planned.
