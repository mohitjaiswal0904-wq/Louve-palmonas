# UI & Component Guidelines

The design is the source of truth. **Do not redesign.** Architectural
work must preserve the rendered output.

## Design system

Louve uses a hand-authored design system — no external component
library.

- **Design tokens:** [`../../src/styles/tokens.css`](../../src/styles/tokens.css)
  (CSS custom properties for colour, spacing, radius, shadow, gold tones).
- **Typography:** two custom families loaded from `/public/fonts/`:
  - `Neue Haas` (400/500/600/700)
  - `Editorial New` (400/500/600 incl. italics)
  - `@font-face` declarations: [`../../src/styles/fonts.css`](../../src/styles/fonts.css)
- **Base / reset:** [`../../src/styles/base.css`](../../src/styles/base.css)
- **Layout / chrome:** `src/styles/{layout,header,nav-overlay,cta,popular,eyebrow,glass-panel,responsive}.css`.
- **Per-view styles:** `src/views/<view>/<view>.css` (`home.css`,
  `collection.css`, `pdp.css`, …).

The global CSS import order in [`../../src/app/layout.tsx`](../../src/app/layout.tsx)
is load-bearing. Do not reorder.

## Components

- Primitives: [`../../src/components/ui/`](../../src/components/ui/)
  (`Cta`, `EditorialTitle`).
- Chrome: [`../../src/components/layout/`](../../src/components/layout/)
  (`Header`, `AppShell`, `NavOverlay`, `PopularSearches`, `WishlistPanel`).
- Feature-local components live inside the feature
  (`src/features/<f>/components/`).

Prefer composition over variants: add a new primitive before adding a
third branch of behaviour to an existing one.

## Styling conventions

- Plain CSS files colocated with the stylesheet's scope (global under
  `src/styles/`, per-view under `src/views/<view>/`).
- BEM-ish class names already present (`banner__copy`, `header__brand`).
  Match that for new chrome.
- Design tokens via CSS custom properties
  (`color: var(--gold-amber-500)`), never hard-coded hex.
- No CSS-in-JS, no Tailwind — intentional, to preserve the editorial
  feel.
- Responsive: breakpoints are set in `src/styles/responsive.css`. New
  responsive behaviour extends that file rather than introducing new
  media-query strategies.

## Accessibility

- Semantic HTML first (`<header>`, `<nav>`, `<main>`, `<section>`,
  `<footer>`).
- Interactive icons expose `aria-label`.
- Dialogs (`WishlistPanel`, `AuthPanel`, `NavOverlay`) use
  `role="dialog"` + `aria-modal="true"`.
- Keyboard: Escape closes overlays. Tab order follows DOM order.
- Colour contrast: tested against the editorial tokens; new tokens must
  meet WCAG AA against their intended surface.
- Images: `alt` text for content imagery; `alt=""` + `aria-hidden`
  for decorative imagery (e.g. background stars, blueprints).

## Responsive behaviour

- Mobile-first.
- Primary breakpoints follow `src/styles/responsive.css`.
- No device-sniffing JavaScript. Use CSS media queries.

## Loading / empty / error states

- Route-level: [`../../src/app/loading.tsx`](../../src/app/loading.tsx)
  and [`../../src/app/error.tsx`](../../src/app/error.tsx).
- Component-level: pass `aria-busy="true"` on the container; preserve
  layout dimensions to avoid shift.
- 3D store: `src/views/store/StoreView.tsx` renders
  `<div className="store-page" aria-busy />` inside `<Suspense>` while
  the three.js chunk loads.

## Forms

- Native HTML form elements first.
- Validation: Zod schemas in the feature's `schemas/`.
- Server-side revalidation is mandatory even when the client validated.

## Interaction states

Preserve the existing hover/focus/active/disabled/loading styles — they
are integral to the editorial feel.

## Assets

- Live under [`../../public/assets/`](../../public/assets/).
- Reference by public URL (`/assets/pdp/hero.png`), never a TS import.
- Feature-grouped (`pdp/`, `collection/`, `menu/`, `slides/`,
  `slides/feature/`).
- Fonts live under `/public/fonts/`.

## `next/image`

**Not** adopted globally. Replacing `<img>` with `<Image>` must be
done per-component with explicit sizing and visual verification; it
changes layout and loading behaviour.

## UI preservation (hard rule)

Architectural changes must not alter:

- HTML structure or class names.
- Design tokens.
- Font loading order.
- CSS import order.
- Image sizing / cropping.
- Hover / focus / active states.
- Scroll and animation behaviour.

See the [`.cursor/rules/ui-preservation.mdc`](../../.cursor/rules/ui-preservation.mdc)
rule and the [`.cursor/skills/ui-preserving-refactors/SKILL.md`](../../.cursor/skills/ui-preserving-refactors/SKILL.md)
procedure.

## Visual regression

`puppeteer` is already a dev dependency. When touching any file in
`src/components/layout/`, `src/styles/`, or `src/app/layout.tsx`:

1. Capture a before screenshot for the affected routes.
2. Apply the change.
3. Capture an after screenshot.
4. Compare and attach to the PR.

A script-based visual-regression harness is planned but not yet wired.
