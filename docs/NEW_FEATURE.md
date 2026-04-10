# Adding a new feature (checklist)

Use this checklist so new work fits the documented **flow** and **localization** rules.

## 1. Routing and SEO

- [ ] Add `src/app/.../page.tsx` (and `layout.tsx` if the segment needs a distinct shell).
- [ ] Export **`generateMetadata`** using `buildStaticPageMetadata("yourPageId", "/path")` after extending
      `PagesMessages` in `src/types/config/messages.ts` and all locale files.
- [ ] If the URL has dynamic segments, add a template field (e.g. `metaTitleTemplate`) and a builder in
      `src/lib/l10n/build-page-metadata.ts`.

## 2. Copy and types

- [ ] Add or extend **`AppMessages`** keys in `src/types/config/messages.ts`.
- [ ] Translate strings in **every** locale under `src/lib/l10n/*/messages.ts` (see `LANGUAGE_OPTIONS`).
- [ ] Avoid hardcoded UI strings in components; use **`useMessages()`** or server-side **`getMessages()`**.

## 3. Data and API

- [ ] Implement HTTP orchestration in **`src/services`** (pure TS; takes **`ApiClient`**).
- [ ] **Server** data: **`createSsrApiClient()`** from RSC / route handlers when needed.
- [ ] **Client** data: add or extend **`src/state/<domain>.state.tsx`** (CSR client + service), then
      **`src/hooks/<domain>/use-<domain>.ts`** — UI imports **`@/hooks`** only.

## 4. UI

- [ ] Prefer **`src/components/ui`** (shadcn) for primitives.
- [ ] Put cross-route layout in **`src/components/layout`**; route-specific sections under **`src/components/<area>`**
      (e.g. **`home/`**, **`catalog/`**) as the project grows.

## 5. State and hooks

- [ ] Add or extend **`src/state/<domain>.state.tsx`** and **`src/hooks/<domain>/use-<domain>.ts`**, export from
      **`src/hooks/index.ts`**, register the provider in **`AppProviders`** if it must be app-wide.

## 6. Verification

- [ ] `pnpm lint` and `pnpm build`.
- [ ] Switch locale in the header and confirm strings and document title update after refresh.
