# `src/app/api/`

Next.js **Route Handlers** (server-side HTTP endpoints in the App Router).

## `locale/`

- **`POST locale/route.ts`** — validates `en` | `hi` | `fr` | `es`, sets **`LOUVE_LOCALE`** httpOnly-capable cookie (via `cookies()`), used by the header language switcher + **`router.refresh()`**.

## Adding handlers

- Prefer small JSON APIs that the **browser** or **Server Actions** call; heavy Louve domain logic should still go through **Louve backend** via **`services/`** when possible, unless you need BFF aggregation.

## Security

- Validate input, rate-limit sensitive routes in production, and never expose secrets to the client bundle.
