# `src/state/`

**Client providers** (`*.state.tsx`) hold React Context and call **`src/services`** with a shared **`createCsrApiClient()`** instance. UI never imports services directly — it uses **`@/hooks`** (`useAuth`, `useCatalog`, …).

## Files

| File | Provider | Role |
|------|------------|------|
| **`auth.state.tsx`** | **`AuthProvider`** | Session, login/signup/logout, forgot/reset password → **`auth.service`**. |
| **`locale.state.tsx`** | **`LocaleProvider`** | Locale, messages, `setLocale` (cookie + refresh). No service layer. |
| **`catalog.state.tsx`** | **`CatalogProvider`** | `listProducts`, `getProductByHandle`, `getFilters`, … → **`catalog.service`**. |
| **`search.state.tsx`** | **`SearchProvider`** | `searchProducts`, `getSuggestions`, … → **`search.service`**. |
| **`health.state.tsx`** | **`HealthProvider`** | `checkLive` → **`health.service`**. |

Internal hooks **`useAuthState`**, **`useCatalogState`**, … are for **`src/hooks/**` only; components use the public hooks.

## Wiring

**`AppProviders`** nests: **`AuthProvider`** → **`LocaleProvider`** → **`CatalogProvider`** → **`SearchProvider`** → **`HealthProvider`** → **`LayoutProvider`**.

## When to add

- New domain API surface: add **`services/<domain>.service.ts`**, types under **`types/<domain>/`**, then **`state/<domain>.state.tsx`** + **`hooks/<domain>/use-<domain>.ts`**.
