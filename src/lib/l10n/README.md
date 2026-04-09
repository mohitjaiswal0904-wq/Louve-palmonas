# `src/lib/l10n/`

**Typed localization bundles** for Louve. Each language folder exports **`messages`** satisfying **`AppMessages`** (`src/types/config/messages.ts`).

## Locale folders

| Folder | Code (`AppLocale`) |
|--------|---------------------|
| **`English/`** | `en` |
| **`Hindi/`** | `hi` |
| **`French/`** | `fr` |
| **`Spanish/`** | `es` |

## Core files

- **`get-messages.ts`** — `getMessages(locale)`, `resolveLocale`.
- **`server.ts`** — `getLocale()` from **`LOUVE_LOCALE`** cookie; `getMessagesForRequest()`.
- **`build-page-metadata.ts`** — `buildStaticPageMetadata`, dynamic product/search title builders using **`interpolate`**.

## Rules

1. Add keys to **`AppMessages`** in TypeScript **first**.
2. Update **all four** `messages.ts` files.
3. Use **`useMessages()`** (client) or **`getMessages(await getLocale())`** (server).

See **`docs/LOCALIZATION.md`**. Each locale folder has a short **`README.md`**.
