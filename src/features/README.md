# src/features/

Feature modules. **The default home for new product work.**

Each feature owns the pieces it needs — UI, hooks, actions, schemas,
services, types, utils — and exposes a narrow surface through its
`index.ts`.

## Template

```
src/features/<feature>/
├── README.md
├── components/        # feature-only React components
├── hooks/             # feature-only client hooks
├── actions/           # Server Actions (server-only)
├── services/          # usually server-only; browser-safe only if proven
├── schemas/           # Zod schemas (validation at the boundary)
├── types/             # TS types; prefer inferred from schemas/Prisma
├── utils/             # tiny helpers private to the feature
└── index.ts           # the feature's public surface
```

Only create the subfolders a feature actually uses. Delete empty ones.

## Rules

- Features may import from: `src/components/*`, `src/hooks/*`,
  `src/lib/*`, `src/types/*`, `src/schemas/*`, `src/constants/*`,
  `src/server/*` (only from the feature's `services/` or `actions/`),
  `src/data/*`.
- Features **must not** import from other features' internals. If
  cross-feature code is needed, promote it to a shared folder or import
  the other feature's `index.ts`.
- Shared folders (`components/`, `hooks/`, …) **must not** import
  feature internals.
- Server-only code inside a feature follows the usual rules:
  `import "server-only"` and no reach from a Client Component.

## Status

No features exist yet. Existing per-view code lives in
[`../views/`](../views/README.md) for migration reasons.

See ADR [`../../docs/decisions/0003-feature-module-boundaries.md`](../../docs/decisions/0003-feature-module-boundaries.md)
for the rationale.

## Creating a feature

Follow [`../../.cursor/skills/feature-development/SKILL.md`](../../.cursor/skills/feature-development/SKILL.md).

Minimum:

1. `src/features/<name>/README.md` describing the feature's scope and
   public surface.
2. Only the subfolders needed.
3. `index.ts` exporting the public API.
4. Any new env var added to `.env.example` + `src/lib/env/server.ts`.
5. Update [`../../docs/architecture/FOLDER_STRUCTURE.md`](../../docs/architecture/FOLDER_STRUCTURE.md)
   only if the feature introduces a new structural pattern.
