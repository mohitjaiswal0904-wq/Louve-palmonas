---
name: ui-preserving-refactors
description: Refactor UI structure (move / rename / split / extract) without changing the rendered output. Use for any architectural touch of components or styles.
---

# UI-Preserving Refactors

## When to use

- Moving a component to a different folder (e.g. `views/` → `features/`).
- Splitting a large component.
- Extracting a hook or sub-component.
- Replacing an import source.
- Any change that touches `src/components/*`, `src/views/*`,
  `src/styles/*`, or `src/app/layout.tsx`.

## When not to use

- Intentional UI redesign — that is a product change, not a refactor,
  and must go through design review.
- Pure non-UI code changes.

## Required inputs

- The specific component(s) / file(s) in scope.
- The refactor goal (move, extract, rename, split, replace).
- The routes affected (the ones that render the component).

## Procedure

1. **Capture the before state.** For every affected route, take a
   screenshot at desktop (1440×900) and mobile (390×844) widths:
   ```bash
   # Using the installed puppeteer dep. Example scratch script.
   node scripts/screenshots.mjs --routes "/,/collection,/pdp/<id>,…" \
                                --out tmp/before/
   ```
   (`scripts/screenshots.mjs` is not committed — the harness is planned.
   Until then, screenshot manually.)
2. **Identify the boundary.** Exactly which element(s) / files move or
   change. List file paths.
3. **Preserve DOM & styling.** The refactor must keep:
   - The same HTML tag + class name on every rendered element.
   - The same prop interface for any component with external callers.
   - The same CSS import order in `src/app/layout.tsx`.
   - The same `*.css` file names (rename only with a search-and-replace
     of their imports).
   - The same asset URLs.
4. **Preserve interactions.**
   - Event handlers behave identically.
   - Keyboard focus order and ARIA attributes unchanged.
   - Overlay close behaviour unchanged.
   - Scroll positions / animations unchanged.
5. **Apply the refactor** in small, reversible steps. Prefer `git mv`
   over delete + add.
6. **Capture the after state** with the same script / snapshots.
7. **Diff.** Visually compare before vs. after on every captured route
   at both breakpoints.
8. **Validate functionally:**
   - `npm run typecheck`, `npm run lint`, `npm run build`.
   - `npm run dev`; click through every affected route; open overlays;
     resize the window.
9. **Document unavoidable differences.** If a diff cannot be avoided
   (e.g. a semantic HTML upgrade), record what changed and why in the
   PR description or the owning README.

## Architecture constraints

- Follow the [`ui-preservation`](../../rules/ui-preservation.mdc) rule.
- Follow the [`project-architecture`](../../rules/project-architecture.mdc)
  rule for folder placement.
- Do not swap `<img>` for `<Image>` as part of a refactor.
- Do not reorder global CSS imports.
- Do not rename CSS class names.

## Validation checklist

- [ ] Before + after screenshots for every affected route (desktop +
      mobile).
- [ ] No visual diffs (or documented, intentional ones).
- [ ] No class-name or DOM-tag changes.
- [ ] No change to the external prop interface of moved components.
- [ ] `typecheck`, `lint`, `build` green.
- [ ] Keyboard & overlay interactions still work.
- [ ] Any renamed import updated everywhere.

## Final report

Return:

1. Refactor summary (what moved, why).
2. Files touched + the git-move list.
3. Routes affected.
4. Screenshots: before / after.
5. Any unavoidable UI differences and the rationale.
6. Validation outputs.
