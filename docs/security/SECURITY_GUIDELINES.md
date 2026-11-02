# Security Guidelines

Each item is tagged: **[I]** implemented · **[R]** recommended / planned.

## Secret management

- **[I]** `.env` is gitignored; `.env.example` is the only tracked
  template.
- **[I]** `src/lib/env/server.ts` imports `server-only` and validates
  env vars with Zod on first use.
- **[I]** `DATABASE_URL` is server-only. There is no `NEXT_PUBLIC_`
  equivalent.
- **[R]** Rotate `DATABASE_URL` on any suspected leak. Store production
  secrets in the host's secret manager, never in the repo.

## Authentication

- **[R]** Not implemented. `src/lib/account.ts` is a localStorage demo
  and must not be treated as auth. See
  [`../architecture/SYSTEM_ARCHITECTURE.md`](../architecture/SYSTEM_ARCHITECTURE.md) §9.
- **[R]** When added, follow:
  - Server-side session via `httpOnly`, `Secure`, `SameSite=Lax` cookies.
  - Short access-token TTL, rotating refresh.
  - Password hashing with Argon2id or scrypt (never SHA alone).
  - Rate-limited login + lockout policy.

## Authorization

- **[R]** Enforced inside the route handler, Server Action, or trusted
  service.
- **[R]** Default deny. Each privileged operation declares the role or
  claim required.
- Route group names (`(public)`, `(protected)`) are organisational;
  they are **not** security.

## Input validation

- **[I]** Zod validates request bodies, query params, and dynamic
  segments at the boundary.
- **[I]** `toErrorResponse` maps `ZodError` → 422 with safe details.
- **[R]** Reject with 400 for malformed JSON; 422 for semantically
  invalid.

## SQL safety

- **[I]** All DB access goes through Prisma (parameterised).
- **[R]** Raw SQL via `$queryRaw` only with tagged-template parameter
  binding. Never string-concatenate user input.

## Cookies

- **[R]** `httpOnly`, `Secure`, `SameSite=Lax` for session cookies.
- **[R]** `__Host-` prefix in production.

## CSRF and cross-origin

- **[R]** Mutating endpoints protected via Origin check and/or
  anti-CSRF token when cookie-based auth is introduced.
- **[R]** Browser-to-API requests from third-party origins blocked by
  default. Open CORS only for a documented reason.

## Rate limiting

- **[R]** Public endpoints and auth endpoints must be rate-limited.
  Headers follow IETF `RateLimit-*` draft; 429 uses the standard
  envelope.

## Logging

- **[I]** No logging of passwords, tokens, PII, raw SQL, or
  `DATABASE_URL`.
- **[I]** `console.error` guarded by `NODE_ENV !== "production"`.
- **[R]** Structured logs (JSON) once an observability stack is chosen.

## Sensitive information in responses

- **[I]** Prisma errors are not surfaced; `toErrorResponse` returns a
  generic `INTERNAL_ERROR` for unknowns.
- **[I]** `/api/v1/db/health` does not disclose the connection string
  or driver details.
- **[R]** When Prisma models grow, map to DTOs that exclude secret
  fields (hashes, tokens, PII) before returning.

## Public API exposure

- Only `/api/v1/*` is a public contract. Never expose internal server
  utilities as HTTP endpoints.

## Dependency security

- **[R]** `npm audit` on each dependency bump. Address high/critical
  advisories before merging.
- **[R]** Pin major versions; use `--legacy-peer-deps` only when
  necessary.

## Production database

- **[R]** `prisma migrate deploy` only. Never `migrate dev` or `db
  push` in production.
- **[R]** No destructive statements against production without a
  verified backup and explicit authorisation.

## Headers

- **[R]** `Strict-Transport-Security`, `X-Content-Type-Options`,
  `Referrer-Policy`, and a conservative CSP once a hosting provider
  is chosen. Next.js supports these via `headers()` in `next.config.ts`.
