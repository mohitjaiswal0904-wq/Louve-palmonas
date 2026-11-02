# API Conventions

All first-party JSON APIs live under `/api/v1/`. The `v1` prefix is
mandatory; breaking changes require a new version.

## Response envelope

Success:

```json
{ "success": true, "data": <payload>, "meta": null }
```

Error:

```json
{
  "success": false,
  "error": { "code": "VALIDATION_ERROR", "message": "…", "details": null }
}
```

Use `ok(data, { meta })` and `fail(code, message, { status, details })`
from `src/lib/http/response.ts`. Never hand-roll the envelope.

External/upstream API responses are forwarded verbatim — do not wrap
them.

## Status codes

| Code | When |
|---|---|
| 200 | Successful read. |
| 201 | Resource created. |
| 204 | Successful mutation with no body. |
| 400 | Malformed request. |
| 401 | Missing/invalid authentication. |
| 403 | Authenticated but not allowed. |
| 404 | Resource not found. |
| 409 | State conflict. |
| 422 | Semantically invalid input (`VALIDATION_ERROR`). |
| 429 | Rate limited. |
| 500 | Unexpected server error. |
| 503 | Required dependency (e.g. DB) unavailable. |

## Route handler template

```ts
import { ok, toErrorResponse } from "@/lib/http/response";
import { AppError } from "@/lib/errors/app-error";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // only when the handler must not be cached

export async function GET(req: Request) {
  try {
    // 1. parse + validate input (Zod)
    // 2. authenticate / authorise
    // 3. call service / repository
    // 4. return ok(...)
    return ok({ hello: "world" });
  } catch (error) {
    return toErrorResponse(error);
  }
}
```

## Validation

- All request bodies, query params, and dynamic segments must be
  validated with Zod before use.
- Infer TS types from the schema (`z.infer<typeof Schema>`), do not
  maintain duplicate interfaces.
- Validation failures must surface as `VALIDATION_ERROR` / 422 via
  `toErrorResponse`.

## Errors

- Throw `AppError(code, message, details?)` for expected failures.
- Never leak stack traces, SQL, Prisma internals, env values, or file
  paths to clients.
- Log unexpected errors server-side only.

## Authentication / authorisation

- Not implemented yet. When added, every mutating or privileged route
  must enforce auth inside the handler or a trusted service it calls.
  Route group names (`(public)`, `(protected)`) are organisational only
  and provide no security.

## Pagination

When list endpoints are added, use cursor pagination by default:

- Request: `?cursor=<opaque>&limit=<n>` (default `limit=20`, max 100).
- Response `data`: array of items.
- Response `meta`: `{ "nextCursor": <string|null>, "limit": <number> }`.

Avoid offset pagination for lists expected to grow unbounded.

## Rate limiting

Not implemented. When added it will emit the standard headers:
`RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`. A 429
response uses the standard envelope with `code: "RATE_LIMITED"`.

## Deprecation policy

- Breaking changes are a new version (`/api/v2/...`).
- Soft-deprecating a field: include it, log usage, document the sunset
  date in this file.
- Removing a field: only after a documented deprecation window and a
  release note.

## Testing

Route handlers should have at least one integration test covering the
success path and the primary failure (`VALIDATION_ERROR`). See
[`../testing/TESTING_STRATEGY.md`](../testing/TESTING_STRATEGY.md).

## Backward compatibility

Within a version:

- Adding optional fields is OK.
- Changing the type of an existing field is **not** OK.
- Removing a field is **not** OK.
- Changing enum values is **not** OK.
