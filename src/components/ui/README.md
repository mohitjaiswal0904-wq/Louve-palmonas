# src/components/ui/

Atomic UI primitives used by chrome and features.

## Today

- `Cta.tsx` — the editorial call-to-action link / button.
- `EditorialTitle.tsx` — the layered editorial headline (regular +
  italic emphasis).

## What belongs here

- Buttons, badges, chips, inputs, icons, headings, dividers,
  cards — any component with no business meaning.
- Zero dependencies on features, no DB, no secrets.

## What does not belong here

- Compound chrome (Header, drawers): those live in [`../layout/`](../layout/README.md).
- Anything with product / content knowledge.

## Conventions

- Server Component by default; use `"use client"` only when a primitive
  truly needs interactive state (dropdowns, tooltips, carousels).
- Props strongly typed; variants expressed via explicit `kind` /
  `variant` props, not boolean flags that combine arbitrarily.
- Styles via colocated CSS or the shared tokens in
  [`../../styles/`](../../styles/).

## Testing

Component tests (planned). Pure logic (variant → class mapping) is
unit-testable.
