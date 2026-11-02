# src/server/auth/

**Reserved — currently empty.** Server-side authentication integration.

The current `src/lib/{account,session}.ts` is a localStorage demo and is
**not** authentication. When real auth lands:

- Session issuance / verification lives here.
- Password hashing (Argon2id / scrypt) lives here.
- OAuth / OIDC integrations live here.
- The chosen library's adapters, callbacks, and middleware live here.
- Server-side helpers like `requireUser()`, `requireRole(...)` live here
  and are called from route handlers and services.

## Rules

- Every file imports `server-only`.
- Secrets come from env (`src/lib/env/server.ts`), never hard-coded.
- Follow [`../../../docs/security/SECURITY_GUIDELINES.md`](../../../docs/security/SECURITY_GUIDELINES.md).

Do not add a placeholder auth implementation. If auth is needed before
the real integration is ready, block the capability behind an explicit
"not implemented" error that returns 501.
