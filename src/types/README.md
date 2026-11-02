# src/types/

**Reserved — currently empty.** Shared TypeScript contracts used across
features or layers.

## What belongs here

- Shared domain types (`Money`, `Locale`, `OrderStatus`, …).
- Public API contract types (if hand-written; prefer Zod-inferred).
- Shared UI primitives (`Variant`, `Size`).
- Cross-feature utility types (`DeepPartial`, `Prettify`).

## What does not belong here

- Feature-specific types → the feature's `types/`.
- Database model types → Prisma generates these; re-export only when
  shaping a DTO.
- Types that duplicate what a Zod schema can infer. Prefer:
  ```ts
  export type Product = z.infer<typeof ProductSchema>;
  ```

## Rules

- Client-safe only (no Prisma, no `server-only`).
- One module per domain (`money.ts`, `order.ts`), not a catch-all
  `types.ts`.
- Keep server-only shapes out of this folder; if a type should be
  server-only, define it next to the server module that owns it.
