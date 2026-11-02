# src/server/security/

**Reserved — currently empty.** Server-side security helpers.

Expected files when the time comes:

- `rate-limit.ts` — token-bucket / sliding-window rate limiter.
- `csrf.ts` — anti-CSRF token issuance / verification.
- `headers.ts` — helpers for setting security headers in route handlers.
- `origin.ts` — Origin / Referer validation.
- `input.ts` — allowlists for user-controlled URLs, filenames, etc.

## Rules

- `import "server-only";` on every file.
- No external calls that leak sensitive data in logs.
- Each helper is covered by tests (rate-limit windows, token verifiers,
  …).

## Not here

- Zod validation of request shape — that stays close to the route /
  action (feature's `schemas/` or `src/schemas/`).
- Secret management — handled by env + the deployment host.
