# ADR 0003 — `src/features/` as the home for new feature work

- **Status:** Accepted
- **Date:** 2026-10-29

## Context

Phase 1 migrated the pre-Next.js code shape 1:1. Each view has a
`src/views/<name>/<Name>View.tsx` "use client" wrapper that mounts a
pre-existing `<Name>Page.tsx` plus its related components. That shape
was the right call for a UI-preserving migration, but it leaves no
obvious home for *new* feature work that spans UI + hooks + schemas +
server actions + types.

## Options considered

1. **Put new feature work in `src/views/` next to the existing pages.**
   Pros: consistent with current layout. Cons: `views/` grows into a
   catch-all, boundaries blur, hooks/schemas/types get scattered across
   `src/hooks/`, `src/schemas/`, `src/types/`.
2. **Spread feature code across the shared folders**
   (`components/`, `hooks/`, `services/`, `actions/`, `types/`,
   `schemas/`). Pros: short imports. Cons: feature cohesion collapses;
   it becomes impossible to delete or move a feature without surgery
   across many folders.
3. **Introduce `src/features/<feature>/` as the default home for new
   feature work.** Each feature owns its components, hooks, actions,
   services, schemas, types, utils. Only the subfolders it actually
   needs. Shared primitives still live in `src/components/ui/`,
   `src/hooks/`, etc.

## Decision

Option 3.

- **New feature:** create `src/features/<feature>/` with only the
  subfolders needed. Each feature has its own `README.md`.
- **Existing views in `src/views/`:** stay there until a specific
  refactor justifies moving them. No bulk migration.
- **Shared code promotion:** when something is used by ≥2 features it
  moves out of the feature into `src/components/`, `src/hooks/`,
  `src/lib/`, etc.

## Consequences

- Clear deletion and ownership story: deleting a feature is largely a
  single-folder delete + route cleanup.
- The dependency rules in [`../architecture/DEPENDENCY_RULES.md`](../architecture/DEPENDENCY_RULES.md)
  explicitly forbid shared code from importing feature internals.
- Short-term duplication: during the transition, chrome and global
  primitives live in `src/components/`; feature-only variants may live
  inside the feature. Promotion happens only on real reuse.

## Related files

- [`../../src/features/README.md`](../../src/features/README.md)
- [`../architecture/FOLDER_STRUCTURE.md`](../architecture/FOLDER_STRUCTURE.md)
