---
name: api-development
description: Add or modify a versioned HTTP endpoint under /api/v1 (or a Server Action) with validation, authz, services, repositories, and docs.
---

# API Development

## When to use

- Adding a route handler under `src/app/api/v1/**/route.ts`.
- Adding a Server Action.
- Changing the contract of an existing endpoint.

## When not to use

- Internal server-only utilities (`src/lib/*` / `src/server/*`).
- Pure UI changes.

## Required inputs

- HTTP verb(s) + path (or Action name).
- Contract (inputs, outputs, errors, status codes).
- Whether the endpoint is public, requires auth, or requires a specific
  role.

## Procedure

1. **Review conventions.** Read
   [`API_CONVENTIONS.md`](../../../docs/api/API_CONVENTIONS.md).
2. **Define schemas.** Write Zod schemas for every input (body, query,
   dynamic segment, headers you consume). Export inferred types.
3. **Create the handler** at `src/app/api/v1/<module>/<...>/route.ts`:
   ```ts
   import { ok, toErrorResponse } from "@/lib/http/response";
   import { AppError } from "@/lib/errors/app-error";
   // import schemas, services

   export const runtime = "nodejs";
   export const dynamic = "force-dynamic";

   export async function GET(req: Request) {
     try {
       // 1. parse + validate
       // 2. authenticate / authorise
       // 3. call service
       // 4. return ok(...)
     } catch (error) {
       return toErrorResponse(error);
     }
   }
   ```
4. **Authenticate / authorise.** If the action is privileged, call the
   auth helper (future `src/server/auth/`) and check permissions. Do
   not rely on route group names.
5. **Delegate.** Business logic lives in a service under
   `src/server/services/`. The handler is just the HTTP boundary.
6. **Repository.** Prisma access lives in a repository under
   `src/server/repositories/`. Repositories return DTOs.
7. **Response shape.** Use `ok({...})`. For errors, throw
   `AppError(...)`; `toErrorResponse` maps it. Match the status code to
   the semantics.
8. **Tests.** Add at least a happy-path and a primary failure
   (`VALIDATION_ERROR` or `NOT_FOUND`) integration test.
9. **Docs.**
   - Add the endpoint to the table in
     [`src/app/api/v1/README.md`](../../../src/app/api/v1/README.md).
   - If the contract shape introduces a new pattern, update
     [`API_CONVENTIONS.md`](../../../docs/api/API_CONVENTIONS.md).
   - If a new env var was introduced, update `.env.example` +
     [`src/lib/env/server.ts`](../../../src/lib/env/server.ts) +
     [`LOCAL_DEVELOPMENT.md`](../../../docs/development/LOCAL_DEVELOPMENT.md).
10. **Validate.** Hit the endpoint locally:
    ```
    curl -i http://localhost:3000/api/v1/<path>
    ```
    Then:
    ```
    npm run typecheck
    npm run lint
    npm run build
    ```

## Architecture constraints

- `/api/v1` only. Breaking changes bump the version.
- No hand-rolled envelopes.
- Never leak stack traces, SQL, env values, or Prisma internals.
- No `any`. Zod-infer everything.

## Validation checklist

- [ ] Zod validates every input.
- [ ] Status code matches semantics.
- [ ] Service / repository used where logic is non-trivial.
- [ ] Tests cover happy path + a failure.
- [ ] Docs table updated.
- [ ] Build + typecheck green.
- [ ] Smoke `curl` confirmed.

## Final report

Return:

1. Path + verb + status codes supported.
2. Request schema and response shape.
3. Authentication / authorisation rules.
4. Service / repository added or extended.
5. Tests added.
6. Docs updated.
7. Validation outputs.
