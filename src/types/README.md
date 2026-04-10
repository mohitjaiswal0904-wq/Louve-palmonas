# `src/types/`

Shared **TypeScript types** — import via **`@/types`** or **`@/types/config`**.

## Layout

| Path | Role |
|------|------|
| **`config/locale.ts`** | `AppLocale`, `APP_LOCALES`, `LOCALE_COOKIE`, `localeHtmlLang`, `isLocale`. |
| **`config/messages.ts`** | **`AppMessages`** and nested shapes: navigation, pages, `homeFeature`, errors, brand, SEO. |
| **`config/index.ts`** | Re-exports for config types. |
| **`common/api.ts`** | `ApiResponse`, `PaginatedResponse`, `Pagination`, `ApiError`. |
| **`auth/index.ts`** | Auth DTOs: `LoginRequest`, `UserResponse`, `AuthResponse`, … |
| **`catalog/index.ts`** | Catalog DTOs: `ProductDTO`, `FiltersDTO`, `ProductListParams`, … |
| **`catalog/commerce.ts`** | `Currency`, `Money`, `Product`, `Collection` — higher-level catalog/checkout shapes. |
| **`search/index.ts`** | Search DTOs: `SearchProductsParams`, `SuggestionDTO`, … |
| **`health/index.ts`** | Health probe result type. |
| **`index.ts`** | Barrel for **`@/types`**. |

## Workflow for new copy

1. Extend **`AppMessages`** in **`config/messages.ts`**.
2. Update **all** locale **`messages.ts`** files under **`src/lib/l10n/`**.
3. Domain API shapes: add under **`auth/`**, **`catalog/`**, or **`search/`** first, then export from **`index.ts`** if needed globally.

## Rules

- Keep **runtime config** (URLs) out of types — use **`src/lib/config/env.ts`**.
