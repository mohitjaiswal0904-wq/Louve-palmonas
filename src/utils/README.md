# `src/utils/`

**Pure helpers** — no React, safe to import from server or client unless noted.

## Modules

| Module | Role |
|--------|------|
| **`cn.ts`** | Tailwind class merge (used across shadcn components). |
| **`interpolate.ts`** | `{token}` string replacement; **`interpolateHtml`** escapes values. |
| **`locale.ts`** | Map **`AppLocale`** → BCP 47 for **`Intl`** (`en-IN`, `hi-IN`, …). |
| **`locale-display.ts`** | `Intl.DisplayNames` for languages, currencies, regions; plural **`select`**. |
| **`money-core.ts`** | Parse/round **`Money`**, minor units per currency, add/subtract same currency. |
| **`currency.ts`** | Convert between currencies using **`FxSnapshot`** (placeholder rates — replace via **`services`**). |
| **`format.ts`** | **`formatMoney`**, **`formatNumber`**, **`formatDate`**, **`formatRelativeTime`**, etc. |
| **`visibility.ts`** | Pure rect intersection / **visible ratio** (lazy load, analytics). |
| **`motion.ts`** | **`getPrefersReducedMotion`**, smooth **`scrollIntoView`** / **`scrollTo`**. |
| **`debounce.ts`**, **`throttle.ts`** | Rate-limited callbacks with **`.cancel()`**. |
| **`index.ts`** | Barrel re-exports. |

## Usage with i18n

Pass **`useLocale().locale`** or **`AppLocale`** into **`format*`** and **`display*`** functions.

## Backend FX

**`FALLBACK_FX_SNAPSHOT`** is static — production should load rates in **`services`** and pass a snapshot into **`convertMoney`**.
