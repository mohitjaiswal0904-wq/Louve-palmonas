# src/components/account/

Account-related UI.

## Today

- `AuthPanel.tsx` — slide-out panel orchestrating sign-in / sign-up.
- `AuthForm.tsx` — the form fields and local validation.
- `account.css` — styles for both.

## Status

**Demo only.** The data layer behind these components lives in
[`@/lib/account`](../../lib/account.ts) and persists to `localStorage`.
This is not production authentication. When a real auth integration
lands, these files move to `src/features/account/` and lose any
`localStorage` dependency.

## Rules

- Client Components.
- No server-only imports.
- Must not be used as proof that a user is signed in — authorisation
  checks live server-side (future `src/server/auth/`).

## Related

- [`../../lib/account.ts`](../../lib/account.ts)
- [`../../lib/session.ts`](../../lib/session.ts)
- [`../../../docs/security/SECURITY_GUIDELINES.md`](../../../docs/security/SECURITY_GUIDELINES.md)
