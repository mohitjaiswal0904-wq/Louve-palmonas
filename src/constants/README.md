# src/constants/

**Reserved — currently empty.** True module-level constants shared
across the app.

## What belongs here

- Values that are stable across runs (`DEFAULT_PAGE_SIZE = 20`).
- Enum-like string unions used in multiple features.
- Event names, cookie names, header names.

## What does not belong here

- Environment values — those live in [`../lib/env/server.ts`](../lib/env/server.ts).
- Feature-specific constants — those live inside the feature.
- Design tokens — those live in [`../styles/tokens.css`](../styles/tokens.css).

## Rules

- Name `UPPER_SNAKE_CASE`.
- Export `as const`:
  ```ts
  export const WISHLIST_EVENT = "louve:wishlist-change" as const;
  ```
- Keep the file small; split by topic (`http.ts`, `events.ts`,
  `pagination.ts`) rather than one giant `constants.ts`.
