# `src/utils`

Small, reusable helpers (no React). Prefer these over ad-hoc `Intl` / `fetch` logic in components.

| Module | Role |
|--------|------|
| `locale.ts` | Map `AppLocale` → BCP 47 for `Intl` (`en-IN`, `hi-IN`, …). |
| `locale-display.ts` | `Intl.DisplayNames` for languages, currencies, regions; plural categories. |
| `money-core.ts` | Parse / round / add / subtract `Money`; ISO minor units. |
| `currency.ts` | Convert between currencies using an `FxSnapshot` (placeholder rates — replace via `services` + API). |
| `format.ts` | `formatMoney`, `formatNumber`, `formatDate`, `formatRelativeTime`, … with locale. |
| `interpolate.ts` | `{token}` replacement; optional HTML escaping. |
| `visibility.ts` | Pure rect intersection / visible ratio (e.g. lazy loading, view tracking). |
| `motion.ts` | Reduced-motion aware scroll helpers (client-safe). |
| `debounce.ts` / `throttle.ts` | Rate-limit handlers without pulling a library. |
| `cn.ts` | Tailwind class merge (see shadcn). |

**Localization:** pass `useLocale().locale` or `AppLocale` into `format*` / `display*` functions.

**FX:** `FALLBACK_FX_SNAPSHOT` is static; production should load rates in the **service** layer and pass a snapshot into `convertMoney`.
