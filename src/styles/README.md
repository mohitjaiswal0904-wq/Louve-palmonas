# src/styles/

Global CSS, design tokens, and font declarations.

## Files

- `tokens.css` — CSS custom properties (colour, spacing, radius,
  shadow, gold tones).
- `fonts.css` — `@font-face` declarations loading `/public/fonts/*`.
- `base.css` — reset and base element styles.
- `layout.css` — page-level layout rules.
- `header.css`, `nav-overlay.css`, `cta.css`, `popular.css`,
  `glass-panel.css`, `eyebrow.css`, `responsive.css` — shared chrome
  stylesheets.

## Rules

- Loaded exactly once from [`../app/layout.tsx`](../app/layout.tsx) in
  this order:
  ```
  fonts → tokens → base → layout → header → nav-overlay → cta →
  popular → responsive → eyebrow → glass-panel
  ```
  **Do not reorder.** The cascade depends on this.
- Per-view / per-feature styles live next to their component
  (`src/views/<view>/<view>.css`), not here.
- Design tokens: add new tokens here, not inline hex values. Document
  the token's intent in a comment.
- `@font-face` → self-hosted WOFF2 only, served from `/public/fonts/`.

## Changing globals

Changes to any file in this folder affect every page. Mandatory:

1. Capture before/after screenshots for all seven routes.
2. Desktop + mobile breakpoints.
3. If a token value changes, grep for its old value across `src/**/*.css`
   to make sure no component depends on the old number.

## Related

- [`../../docs/frontend/UI_AND_COMPONENT_GUIDELINES.md`](../../docs/frontend/UI_AND_COMPONENT_GUIDELINES.md)
