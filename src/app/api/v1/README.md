# src/app/api/v1/

Version 1 of the Louve HTTP API.

## Current endpoints

| Method | Path | File | Status |
|---|---|---|---|
| GET | `/api/v1/health` | `health/route.ts` | Liveness. 200 always when the app is up. |
| GET | `/api/v1/db/health` | `db/health/route.ts` | DB readiness. 200 when `SELECT 1` succeeds, else 503. |

## Rules

- Every file is `route.ts`.
- Use `export const runtime = "nodejs"` and
  `export const dynamic = "force-dynamic"` for handlers that touch
  request state or the DB.
- Use `ok()` / `fail()` / `toErrorResponse()` from
  [`@/lib/http/response`](../../../lib/http/response.ts). No hand-rolled
  envelopes.
- Validate every incoming body / query / dynamic segment with Zod
  before use.
- Throw `AppError(code, message)` for expected failures.
- Never leak stack traces, Prisma internals, SQL, or
  `DATABASE_URL`.

Full procedure for adding a new endpoint:
[`../../../../.cursor/skills/api-development/SKILL.md`](../../../../.cursor/skills/api-development/SKILL.md).
