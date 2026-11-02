# src/lib/

Framework-agnostic infrastructure utilities. **Topic-scoped
subfolders**, not a dumping ground.

## Current subfolders

| Path | Role | Side |
|---|---|---|
| [`env/`](env/) | Zod-validated env (`server.ts`). | **server-only** |
| [`errors/`](errors/) | `AppError`, error codes, status mapping. | client-safe |
| [`http/`](http/) | API envelope + error → response mapping (`ok`, `fail`, `toErrorResponse`). | client-safe (uses `next/server`) |
| [`nav/`](nav/) | `useAppNav` shim over `next/navigation`. | client |

Plus a few top-level utilities that pre-date Phase 2 and are not yet
moved into subfolders:

- `account.ts`, `session.ts`, `wishlist.ts` — localStorage demo stores
  (will migrate to `src/features/account/` when a real backend lands).
- `slugify.ts` — small string helper.

## What belongs here

- Narrow, reusable technical utilities (HTTP primitives, errors,
  validation helpers, config, constants shared by infra, logging).
- Code that would be identical in a different React / Next.js app.

## What does not belong here

- Business logic → `src/features/<f>/` or `src/server/services/`.
- Database queries → `src/server/repositories/`.
- Random helpers with no obvious owner — give it a topic folder or
  put it in a feature.
- Secrets.

## Adding a file

1. Does it belong to a topic subfolder (`http/`, `errors/`, …)? Put it
   there.
2. Is it a new topic (say, `rate-limit/`)? Create the subfolder and a
   short `README.md` describing it.
3. Does it have business meaning? Move it to a feature.

## Rules

- `env/server.ts` is **server-only**. Nothing else here should import
  `server-only`.
- Each utility is independently testable.
- Each subfolder gets its own README once it holds more than one file.
