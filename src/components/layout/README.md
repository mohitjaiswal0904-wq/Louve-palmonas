# src/components/layout/

Page chrome shared by every route.

## Today

- `AppShell.tsx` — client shell: `Header` + optional immersive flag +
  `PopularSearches` footer. Mounted inside every `*View.tsx`.
- `Header.tsx` — the editorial header. Owns menu overlay, wishlist
  drawer, and account drawer.
- `NavOverlay.tsx` — the categories mega-menu.
- `PopularSearches.tsx` — the site-wide footer links section.
- `WishlistPanel.tsx` — slide-out wishlist drawer.

## Rules

- Every file is a Client Component (`"use client"`).
- Reads client state (localStorage, event listeners, window scroll).
- Must stay visually identical to the pre-migration implementation.
  See [`../../../docs/frontend/UI_AND_COMPONENT_GUIDELINES.md`](../../../docs/frontend/UI_AND_COMPONENT_GUIDELINES.md).

## What belongs here

- Chrome that wraps every page (header, drawers, overlays, footer).
- Shared layout wrappers like `AppShell`.

## What does not belong here

- Page-specific sections (those stay in `src/views/<view>/` or
  `src/features/<feature>/components/`).
- Primitives (buttons, titles) — those live in [`../ui/`](../ui/README.md).

## Changing chrome

Chrome changes affect every route. Mandatory:

1. Capture before/after screenshots for `/`, `/collection`,
   `/pdp/<id>`, `/stores`, `/stores/<id>`, `/account`.
2. Verify desktop + mobile.
3. Verify keyboard navigation and the WishlistPanel / NavOverlay close
   behaviour.
