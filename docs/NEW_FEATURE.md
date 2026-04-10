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
- [ ] Translate strings in **`English`**, **`Hindi`**, **`French`**, and **`Spanish`** under `src/lib/l10n/`.
- [ ] Avoid hardcoded UI strings in components; use **`useMessages()`** or server-side **`getMessages()`**.

## 3. Data and API

- [ ] Add backend calls only through **`createSsrApiClient`** or **`createCsrApiClient`**.
- [ ] Implement orchestration in **`src/services`** (pure TS, no React).
- [ ] Optionally add a small hook that calls the service for client-driven flows.

## 4. UI

- [ ] Prefer **`src/components/ui`** (shadcn) for primitives.
- [ ] Put cross-route layout in **`src/components/layout`**; route-specific sections under **`src/components/<area>`**
      (e.g. **`home/`**, **`catalog/`**) as the project grows.

## 5. State

- [ ] If multiple components need shared client state, add or extend context under **`src/state`** and expose
      **`src/hooks`**.

## 6. Verification

- [ ] `pnpm lint` and `pnpm build`.
- [ ] Switch locale in the header and confirm strings and document title update after refresh.
