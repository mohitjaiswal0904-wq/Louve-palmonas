# `src/types/`

Shared **TypeScript types** for the Louve app — imported via **`@/types`** or **`@/types/config`**.

## Layout

| Path | Role |
|------|------|
| **`config/locale.ts`** | `AppLocale`, `APP_LOCALES`, `LOCALE_COOKIE`, `localeHtmlLang`, `isLocale`. |
| **`config/messages.ts`** | **`AppMessages`** and nested shapes: navigation, pages, `homeFeature`, errors, brand, SEO. |
| **`config/index.ts`** | Re-exports for config types. |
| **`commerce.ts`** | `Currency`, `Money`, `Product`, `Collection` — catalog/checkout domain. |
| **`index.ts`** | Barrel for common imports. |

## Workflow for new copy

1. Extend **`AppMessages`** (or commerce types) in **`config/messages.ts`** / **`commerce.ts`**.
2. Update **all** locale **`messages.ts`** files under **`src/lib/l10n/`**.
3. Use types in components and services for end-to-end safety.

## Rules

- Keep **runtime config** (URLs) out of types — use **`src/lib/config/env.ts`**.
