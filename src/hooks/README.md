# `src/hooks/`

Public hooks for **pages and components**. They read **`src/state`** (never **`src/services`** directly).

## Layout

| Path | Export | Backed by |
|------|--------|-----------|
| **`auth/use-auth.ts`** | **`useAuth`** | **`auth.state`** |
| **`catalog/use-catalog.ts`** | **`useCatalog`** | **`catalog.state`** |
| **`search/use-search.ts`** | **`useSearch`** | **`search.state`** |
| **`health/use-health.ts`** | **`useHealth`** | **`health.state`** |
| **`locale/use-locale.ts`** | **`useLocale`** | **`locale.state`** |
| **`locale/use-messages.ts`** | **`useMessages`** | **`locale.state`** |
| **`use-media-query.ts`** | **`useMediaQuery`** | Browser `matchMedia` |

**`index.ts`** re-exports everything for **`import { … } from "@/hooks"`**.

## Conventions

- One folder per domain where it helps navigation; **`useMediaQuery`** stays at the root as a generic utility.
- Do not call **`createCsrApiClient`** from new feature hooks — extend the right **`.state.tsx`** and expose methods there.
