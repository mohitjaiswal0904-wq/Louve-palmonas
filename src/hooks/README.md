# `src/hooks/`

React **hooks** — thin facades over context, browser APIs, or (future) service calls.

## Current exports (`index.ts`)

| Hook | Role |
|------|------|
| **`useMessages()`** | Full **`AppMessages`** for active locale (from **`LocaleProvider`**). |
| **`useLocale()`** | `{ locale, setLocale }` — `setLocale` hits **`POST /api/locale`** + **`router.refresh()`**. |
| **`useMediaQuery(query)`** | Sync external store for matchMedia (sidebar desktop vs mobile). |

## Conventions

- Prefer **one hook per concern**; avoid duplicating **`useContext`** patterns.
- Hooks that call the backend should use **`createCsrApiClient`** + **`services/`** — document new patterns in **`docs/FLOW.md`** when added.

## Adding a hook

1. Implement in **`use-<name>.ts`**.
2. Export from **`index.ts`** if it’s stable public API for components.
