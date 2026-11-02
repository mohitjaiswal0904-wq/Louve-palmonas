# Dependency Rules

## Dependency direction

```
     ┌─────────────────────────────────────────────┐
     │                src/app/**                   │   routes + handlers
     └─────────────┬────────────────────┬──────────┘
                   │                    │
      ┌────────────▼────────┐   ┌───────▼────────┐
      │ src/features/<f>/** │   │ src/views/**   │   feature + view entries
      └──┬──────┬──────┬────┘   └──┬──────┬──────┘
         │      │      │           │      │
         ▼      ▼      ▼           ▼      ▼
  src/components  src/hooks  src/services  src/actions
         │                                     │
         ▼                                     │
      src/lib (client-safe parts)              │
                                               ▼
                                 src/server/services ─▶ src/server/repositories ─▶ src/server/db ─▶ Prisma ─▶ PostgreSQL
```

## Hard rules

1. **App Router files** compose routes and delegate to a service, action,
   or feature boundary. They may contain small composition logic only.
2. **Presentation components** (`src/components/**`, `src/views/**`,
   `src/features/**/components/**`) MUST NOT import:
   - `@prisma/client`
   - `src/server/**`
   - `src/lib/env/server`
   - any module that imports `server-only`
3. **Hooks** (`src/hooks/**`, `src/features/**/hooks/**`) follow the same
   prohibition as components.
4. **Repositories** own all Prisma access. Route handlers and services
   should not call Prisma directly once repositories exist for the
   relevant aggregate. (Today the only Prisma caller is
   `checkDatabaseConnection()` in `src/server/db/prisma.ts`; that is
   fine as a probe.)
5. **Services** own domain operations. Call repositories, enforce
   business rules. They may be composed by route handlers or Server
   Actions.
6. **Server Actions** validate inputs with Zod and enforce authorization
   inside the action or the service it calls. They are **not** a free
   substitute for Route Handlers for public contracts.
7. **Shared modules** (`src/lib/**`, `src/types/**`, `src/schemas/**`,
   `src/constants/**`) MUST NOT import feature-specific code.
8. **No circular imports.** Keep modules small and focused.
9. **Feature code stays inside the feature folder** unless it is proven
   to be shared (used by ≥2 features or by shared chrome).
10. **Secrets stay on the server.** No `NEXT_PUBLIC_*` for anything
    sensitive. Any env variable surfacing in the browser must have a
    non-sensitive value.
11. **No duplicate service abstractions.** Do not create a client-side
    copy of a server-side service. Expose capabilities through a
    Server Action, a Route Handler, or an explicit client wrapper that
    calls one of them.
12. **Validate at trust boundaries.** All external input (`fetch`,
    request body, query, dynamic segment, env) is validated by a Zod
    schema before use.

## Enforcement

- **Hard enforcement:** `server-only` throws at build time if a module
  that imports it is reached from a client module.
- **Soft enforcement:** code review + the Cursor rule
  [`.cursor/rules/database-and-prisma.mdc`](../../.cursor/rules/database-and-prisma.mdc)
  and [`backend-and-api.mdc`](../../.cursor/rules/backend-and-api.mdc).
- **Not yet enforced automatically:** import-boundary ESLint rules,
  circular-dependency detection. See
  [`ARCHITECTURE_AUDIT.md`](ARCHITECTURE_AUDIT.md) §10 for rationale and
  the planned follow-up.

## Legitimate exceptions

- `src/lib/http/response.ts` imports `next/server`'s `NextResponse` and
  is used by route handlers; it is still client-safe to import for
  envelope types.
- `src/app/api/v1/db/health/route.ts` calls `checkDatabaseConnection()`
  directly without a service/repo. Acceptable because it is an
  infrastructure probe.
- `src/views/*View.tsx` wrap pre-existing `*Page.tsx` components with a
  client boundary. They are deliberately thin and bridge the pre-Next
  codebase; new features should not follow the same pattern — go
  straight to `src/features/`.
