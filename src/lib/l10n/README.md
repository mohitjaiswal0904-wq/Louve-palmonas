# `src/lib/l10n`

Locale folders (**English**, **Hindi**, **French**, **Spanish**) each export a typed
`messages` object that implements `AppMessages` from `src/types/config/messages.ts`.

- `getMessages(locale)` — synchronous lookup (safe on server and client).
- `getLocale` / `getMessagesForRequest` — read the `LOUVE_LOCALE` cookie on the server (`server.ts`).

Add a new language by creating a folder, exporting `messages`, and registering it in `get-messages.ts`.

See `docs/LOCALIZATION.md`.
