# Localization (l10n / i18n)

Louve uses **cookie-based locale** with **typed message bundles** — no external i18n framework required for
v1. Every customer-visible string should come from **`AppMessages`**, not hardcoded in components.

## Locales

| Code | Folder under `src/lib/l10n/` |
|------|------------------------------|
| `en` | `English/` |
| `hi` | `Hindi/` |
| `fr` | `French/` |
| `es` | `Spanish/` |

The cookie **`LOUVE_LOCALE`** stores the active code. `DEFAULT_LOCALE` is `en`.

## Changing language

The header **`LanguageSwitcher`** posts to **`POST /api/locale`** with `{ "locale": "fr" }`, sets the cookie,
updates client state, and calls **`router.refresh()`** so Server Components and `generateMetadata` re-run with
the new locale.

## Adding a string

1. Extend **`AppMessages`** in `src/types/config/messages.ts` (or an existing subsection such as `pages`,
   `common`, `homeFeature`).
2. Add the key to **all four** locale files under `src/lib/l10n/*/messages.ts`.
3. Use **`useMessages()`** in client components or **`getMessages(await getLocale())`** in Server Components.

## Adding a new language

1. Create `src/lib/l10n/<FolderName>/messages.ts` exporting `messages` that `satisfies AppMessages`.
2. Add the locale code to `APP_LOCALES`, `LOCALE_TO_FOLDER`, and `localeHtmlLang` in
   `src/types/config/locale.ts`.
3. Register the import in `src/lib/l10n/get-messages.ts`.
4. Append an entry to `LANGUAGE_OPTIONS` in `src/lib/config/languages.ts`.

## Metadata and SEO

- Root **`generateMetadata`** in `src/app/layout.tsx` uses `getLocale()` + `getMessages()`.
- Per-route metadata uses **`buildStaticPageMetadata`**, **`buildProductPageMetadata`**, or
  **`buildSearchQueryMetadata`** which read the same cookie-backed locale.
- Dynamic title templates use **`interpolate()`** in `src/utils/interpolate.ts` with placeholders like
  `{slug}`, `{query}`, `{siteName}`.

## HTML `lang`

`src/app/layout.tsx` sets `<html lang={localeHtmlLang(locale)}>`. `global-error.tsx` falls back to the default
locale for the shell.
