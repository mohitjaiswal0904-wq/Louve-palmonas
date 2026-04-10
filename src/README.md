# `src/`

All application source for Louve frontend. **Next.js** resolves **`src/app`** as the App Router root.

## Top-level folders

| Folder | Role |
|--------|------|
| **`app/`** | Routes, layouts, `generateMetadata`, route handlers (`api/*`). |
| **`components/`** | Shared UI: **`ui/`**, **`layout/`**, **`home/`**, **`catalog/`**, **`common/`**, **`seo/`**. |
| **`hooks/`** | React hooks (`useMessages`, `useLocale`, `useMediaQuery`, …). |
| **`lib/`** | **`client/`** (SSR/CSR API), **`config/`** (env, language list), **`l10n/`** (messages per locale), **`live/`** (realtime scaffold), **`utils.ts`**. |
| **`providers/`** | `AppProviders`, layout UI context. |
| **`services/`** | Calls backend via **`lib/client`** — no React. |
| **`state/`** | React context (e.g. locale + messages). |
| **`types/`** | TypeScript types — **`config/`**, **`auth/`**, **`catalog/`** (+ commerce), **`search/`**, **`common/api`**. |
| **`utils/`** | Pure helpers: `cn`, `interpolate`, `format`, `currency`, `visibility`, … |

## Conventions

- **No raw `fetch` to Louve API** from random components — use **`createSsrApiClient`** / **`createCsrApiClient`** and **`services/`**.
- **No hardcoded user-facing strings** in components — use **`useMessages()`** or **`getMessages(await getLocale())`**.
- Prefer **Server Components** for static shells; add **`"use client"`** only when you need hooks or browser APIs.

Each major subdirectory has its own **`README.md`**.
