# src/server/

Server-only infrastructure and application logic. **No file in this
tree may be imported by a Client Component.**

Every file imports `server-only` as the first non-type import. That
makes any accidental client import a build error.

## Subfolders

| Path | Role | Status |
|---|---|---|
| [`db/`](db/README.md) | Prisma singleton, DB probe. | Implemented. |
| [`repositories/`](repositories/README.md) | Database access per aggregate. | Reserved. |
| [`services/`](services/README.md) | Application / domain services. | Reserved. |
| [`auth/`](auth/README.md) | Server-side auth integration. | Reserved. |
| [`security/`](security/README.md) | CSRF, rate-limit, header helpers. | Reserved. |

## Rules

- All files begin with `import "server-only";`.
- No React component imports.
- No `window`, `document`, `localStorage` references.
- Return DTOs, not raw Prisma records, to callers that may expose
  values to the client.
- Errors thrown here either are `AppError` instances (safe to surface)
  or get translated to one by the caller.

## Dependency direction (inside `server/`)

```
services  →  repositories  →  db
       ↘        ↘
         auth / security  (as needed)
```

Route handlers (`src/app/api/v1/.../route.ts`) are the only external
callers for `services`.
