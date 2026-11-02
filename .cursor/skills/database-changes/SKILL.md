---
name: database-changes
description: Safely modify prisma/schema.prisma, create migrations, update repositories, and keep docs in sync. Never destructive in production.
---

# Database Changes

## When to use

- Adding, renaming, or removing a Prisma model or field.
- Adding an index or relation.
- Creating a new migration.

## When not to use

- Pure query changes that don't touch the schema (edit the repository
  directly).

## Required inputs

- The intended schema change (model name, fields, types, relations).
- Backfill / data-migration plan if the change affects existing data.

## Procedure

1. **Inspect** [`prisma/schema.prisma`](../../../prisma/schema.prisma)
   and existing migrations.
2. **Risk pass.** Identify:
   - Compatibility risks (clients reading the old shape).
   - Data-loss risks (dropping columns, narrowing types).
   - Lock risks on large tables.
3. **Edit the schema** per conventions in
   [`DATABASE_GUIDELINES.md`](../../../docs/database/DATABASE_GUIDELINES.md).
   Keep the change minimal and coherent.
4. **Validate.**
   ```
   npm run db:validate
   npm run prisma:generate
   ```
5. **Create the migration** against a dev DB:
   ```
   npm run prisma:migrate -- --name <descriptive>
   ```
   Review the generated SQL for anything unexpected.
6. **Repositories.** For a new aggregate, add a repository under
   `src/server/repositories/`. For a changed field, update existing
   repositories and their DTO mappers.
7. **Services.** Enforce any new invariants introduced by the schema.
8. **Breaking changes → multi-step rollout.** Additive schema deploy →
   application writes both old + new → data backfill → application
   reads new only → remove old schema. Document each step.
9. **Tests.** Add integration tests for new or changed queries using
   `TEST_DATABASE_URL`.
10. **Docs.**
    - [`DATABASE_GUIDELINES.md`](../../../docs/database/DATABASE_GUIDELINES.md)
      if a new pattern was introduced.
    - [`prisma/README.md`](../../../prisma/README.md) if the model
      inventory changed.
    - API docs if the change affects a public response.

## Architecture constraints

- Server-only. Nothing in `src/server/**` is imported from the client.
- Repositories own Prisma. Services own invariants. Handlers call
  services.
- Never return raw Prisma records when sensitive fields exist. Map to
  DTOs.
- **Never** `prisma migrate dev`, `prisma db push`, or destructive SQL
  against production without explicit authorisation and a verified
  backup.

## Validation checklist

- [ ] `npm run db:validate` passes.
- [ ] `npm run prisma:generate` succeeds.
- [ ] New / changed queries covered by tests against a test DB.
- [ ] DTOs omit sensitive fields.
- [ ] Rollout + rollback plan documented for breaking changes.
- [ ] `typecheck`, `lint`, `build` green.

## Final report

Return:

1. Schema diff summary.
2. Generated migration file path.
3. Repositories / services added or updated.
4. Rollout and rollback plan (for breaking changes).
5. Tests added.
6. Docs updated.
7. Validation outputs.
