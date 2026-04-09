# `src/types/config/`

Types for **internationalization** and **locale** — the contract for everything under **`src/lib/l10n/`**.

## Files

| File | Exports |
|------|---------|
| **`locale.ts`** | `AppLocale`, `APP_LOCALES`, `DEFAULT_LOCALE`, `LOCALE_COOKIE`, `LOCALE_TO_FOLDER`, `isLocale`, `localeHtmlLang`. |
| **`messages.ts`** | `AppMessages`, navigation row types, `PagesMessages`, `PageId`, `HomeFeatureMessages`, etc. |
| **`index.ts`** | Barrel for clean imports. |

## Rules

1. Change **`messages.ts`** **before** adding keys to locale bundles.
2. Keep **URLs and secrets** out of these types — use **`src/lib/config/env.ts`**.
