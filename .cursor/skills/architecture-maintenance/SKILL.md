---
name: architecture-maintenance
description: Keep the folder structure, dependency rules, and architecture docs in sync with the code. Use when auditing structure, placing a new file, catching drift, or recording a significant decision.
---

# Architecture Maintenance

## When to use

- A new file / folder is being added and placement isn't obvious.
- A refactor crosses layer boundaries (`components/` → `server/`,
  `views/` → `features/`, etc.).
- A review spots that code is in the wrong folder.
- A decision with lasting consequences needs to be captured.

## When not to use

- Trivial bug fixes within an existing module.
- Cosmetic edits that don't move or rename files.

## Required inputs

- The specific file(s) or folder(s) being changed.
- The intent (new feature, refactor, cleanup, boundary fix).

## Procedure

1. **Inspect.** Read the relevant files and surrounding folder READMEs.
2. **Identify responsibility.** Use
   [`docs/architecture/FOLDER_STRUCTURE.md`](../../../docs/architecture/FOLDER_STRUCTURE.md)
   to decide the correct folder.
3. **Check conventions.** Read the destination folder's README. Confirm
   naming, dependency direction, and server/client side.
4. **Make the smallest change** that fits the intent. Prefer
   `git mv` over delete + add to preserve history.
5. **Validate dependencies.** Confirm:
   - No client module imports `server-only` code.
   - No shared folder imports feature internals.
   - No circular imports.
6. **Update documentation in the same change:**
   - Folder README for every folder whose contents or responsibility
     changed.
   - [`FOLDER_STRUCTURE.md`](../../../docs/architecture/FOLDER_STRUCTURE.md)
     if a new folder was added or a responsibility moved.
   - [`DEPENDENCY_RULES.md`](../../../docs/architecture/DEPENDENCY_RULES.md)
     if a rule or exception changed.
   - If the decision is significant → append to
     [`ARCHITECTURE_DECISIONS.md`](../../../docs/architecture/ARCHITECTURE_DECISIONS.md)
     or add an ADR under
     [`docs/decisions/`](../../../docs/decisions/).
7. **Validate build:**
   ```
   npm run typecheck
   npm run lint
   npm run build
   ```
8. **Report.** See format below.

## Architecture constraints

- Server-only vs. client boundaries ([`DEPENDENCY_RULES.md`](../../../docs/architecture/DEPENDENCY_RULES.md)).
- UI preservation ([`UI_AND_COMPONENT_GUIDELINES.md`](../../../docs/frontend/UI_AND_COMPONENT_GUIDELINES.md)).
- No upward dependencies: `components` → `features` is forbidden;
  `features` → `components` is fine.

## Validation checklist

- [ ] Target folder's README accurately describes the new state.
- [ ] `FOLDER_STRUCTURE.md` matches reality.
- [ ] `typecheck`, `lint`, `build` all green.
- [ ] No new `any`, `@ts-ignore`, or non-null `!`.
- [ ] No client import reaches a `server-only` module.
- [ ] Visual regression done if any file under
      `src/components/layout`, `src/styles`, or `src/app/layout.tsx`
      was touched.

## Documentation updates

See the mapping in
[`.cursor/rules/documentation-maintenance.mdc`](../rules/documentation-maintenance.mdc).

## Final report

Return:

1. Change summary (what moved / what was added, why).
2. Files touched.
3. Docs updated.
4. Validation results (actual outputs).
5. Residual drift, if any, and the follow-up plan.
