# Database Documentation

PostgreSQL + Prisma 6. See [`DATABASE_GUIDELINES.md`](DATABASE_GUIDELINES.md)
for the full operating manual.

Quick links:

- Prisma schema: [`../../prisma/schema.prisma`](../../prisma/schema.prisma)
- Client singleton: [`../../src/server/db/prisma.ts`](../../src/server/db/prisma.ts)
- Env schema: [`../../src/lib/env/server.ts`](../../src/lib/env/server.ts)
- ADR: [`../decisions/0002-postgresql-prisma.md`](../decisions/0002-postgresql-prisma.md)

Current schema status: **minimal** — only a `HealthProbe` model exists.
Add real models through [`../../prisma/schema.prisma`](../../prisma/schema.prisma)
and the migration workflow documented in `DATABASE_GUIDELINES.md`.
