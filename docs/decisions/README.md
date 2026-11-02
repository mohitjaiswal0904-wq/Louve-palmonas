# Architecture Decision Records

Each ADR captures one significant decision: context, options considered,
chosen approach, consequences, and status.

Naming: `NNNN-kebab-case.md` (sequential, never reused).

Status values: Proposed · Accepted · Superseded · Rejected · Deprecated.

## Index

| # | Title | Status |
|---|---|---|
| 0001 | [Next.js App Router as the application shell](0001-nextjs-app-router.md) | Accepted |
| 0002 | [PostgreSQL + Prisma 6 for persistence](0002-postgresql-prisma.md) | Accepted |
| 0003 | [`src/features/` as the home for new feature work](0003-feature-module-boundaries.md) | Accepted |

Smaller decisions and their rationale are rolled up in
[`../architecture/ARCHITECTURE_DECISIONS.md`](../architecture/ARCHITECTURE_DECISIONS.md).
Add a new ADR only when a decision has lasting consequences across
layers.
