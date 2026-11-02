---
name: feature-development
description: Scaffold a new product feature under src/features/<name>/ with the right folders, boundaries, docs, and tests.
---

# Feature Development

## When to use

- Adding a new product feature with its own UI + logic.
- Promoting a slice of `src/views/<view>/` into a proper feature.

## When not to use

- Tiny changes to an existing feature (edit in place).
- Shared primitive component (goes to `src/components/ui/`).
- Shared hook used by chrome (goes to `src/hooks/`).

## Required inputs

- Feature name (`kebab-case` on disk, `camelCase` in TS).
- Short scope statement (what the feature does, what it does not).
- Routes it touches, if any.

## Procedure

1. **Understand** the requirement. Read any linked spec / design.
2. **Search for reuse.** Grep `src/components/`, `src/hooks/`,
   `src/lib/`, `src/features/`. Don't re-implement what exists.
3. **Decide the boundary.** One feature folder per bounded context.
   Only create subfolders you'll actually use:
   ```
   src/features/<name>/
   ├── README.md               # scope + public surface
   ├── components/             # feature-only UI
   ├── hooks/                  # feature-only client hooks
   ├── actions/                # Server Actions (if any)
   ├── services/               # usually server-only
   ├── schemas/                # Zod
   ├── types/                  # TS types (prefer inferred)
   ├── utils/
   └── index.ts                # public surface
   ```
4. **Client / server split.** For each file, decide server vs. client.
   Server code imports `server-only`.
5. **Validation first.** Define Zod schemas in `schemas/`; export
   inferred types alongside.
6. **DB (if needed).** Add the Prisma model via the
   [`database-changes`](../database-changes/SKILL.md) skill, then add a
   repository under `src/server/repositories/` and a service under
   `src/server/services/`. Expose through an action or route handler.
7. **Routes (if needed).** Add `src/app/<path>/page.tsx` as a Server
   Component that mounts the feature's client entry.
8. **UI.** Reuse chrome from `src/components/layout/AppShell.tsx`. Do
   not alter existing CSS classes.
9. **Tests.** Add at least:
   - Unit test for every pure function and Zod schema.
   - Integration test for every new route / action.
10. **Documentation.** Update:
    - `src/features/<name>/README.md` (scope, API, public surface).
    - [`FOLDER_STRUCTURE.md`](../../../docs/architecture/FOLDER_STRUCTURE.md)
      only if a new structural pattern was introduced.
    - [`.env.example`](../../../.env.example) and
      [`src/lib/env/server.ts`](../../../src/lib/env/server.ts) if a new
      env var was added.
    - API docs if a new endpoint was added.
11. **Validate.**
    ```
    npm run typecheck
    npm run lint
    npm run build
    ```

## Architecture constraints

- Features **must not** import other features' internals. Depend on
  shared code or the other feature's `index.ts`.
- Shared folders **must not** import feature internals.
- UI preservation: do not change existing chrome or styles to serve the
  feature.
- See [`DEPENDENCY_RULES.md`](../../../docs/architecture/DEPENDENCY_RULES.md).

## Validation checklist

- [ ] Feature folder has a `README.md` describing scope + surface.
- [ ] Only the sub-folders actually used were created.
- [ ] All inputs validated with Zod.
- [ ] Any server code imports `server-only`.
- [ ] No client component reaches server-only code.
- [ ] Tests added for new code paths.
- [ ] Build and typecheck green.

## Final report

Return:

1. Feature name and scope.
2. Public surface exposed by `index.ts`.
3. New files + folders.
4. New routes / endpoints / actions.
5. Env vars added.
6. Docs updated.
7. Validation results.
