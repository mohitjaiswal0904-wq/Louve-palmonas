# `src/lib/config`

Reserved for **environment** and **i18n plumbing** that is not itself translated.

- `env.ts` — `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL`
- `languages.ts` — locales shown in the header selector (native labels)

All brand copy, navigation labels, SEO sentences, and UI strings live under
[`src/lib/l10n/`](../l10n/README.md) in the `English`, `Hindi`, `French`, and `Spanish` folders.

See [`docs/LOCALIZATION.md`](../../docs/LOCALIZATION.md) and [`docs/FLOW.md`](../../docs/FLOW.md).
