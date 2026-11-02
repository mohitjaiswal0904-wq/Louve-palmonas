# AGENTS.md — Louve

Concise, authoritative entry point for AI coding agents working on this
repository. Read this first. Follow the canonical documents linked below
for anything deeper.

## Project

Louve is an editorial fine-jewellery storefront. The repository is a
**Next.js 16 App Router** application (TypeScript, React 19) with
**Prisma 6 + PostgreSQL** on the server. Phase-1 migration from
Vite + React is complete; see
[`docs/migration/REACT_TO_NEXT_MIGRATION.md`](docs/migration/REACT_TO_NEXT_MIGRATION.md).

## Canonical documents

- Architecture: [`docs/architecture/SYSTEM_ARCHITECTURE.md`](docs/architecture/SYSTEM_ARCHITECTURE.md)
- Folder rules: [`docs/architecture/FOLDER_STRUCTURE.md`](docs/architecture/FOLDER_STRUCTURE.md)
- Dependency rules: [`docs/architecture/DEPENDENCY_RULES.md`](docs/architecture/DEPENDENCY_RULES.md)
- Rendering: [`docs/architecture/RENDERING_STRATEGY.md`](docs/architecture/RENDERING_STRATEGY.md)
- Coding standards: [`docs/architecture/CODING_STANDARDS.md`](docs/architecture/CODING_STANDARDS.md)
- API: [`docs/api/API_CONVENTIONS.md`](docs/api/API_CONVENTIONS.md)
- Database: [`docs/database/DATABASE_GUIDELINES.md`](docs/database/DATABASE_GUIDELINES.md)
- Frontend / UI: [`docs/frontend/UI_AND_COMPONENT_GUIDELINES.md`](docs/frontend/UI_AND_COMPONENT_GUIDELINES.md)
- Testing: [`docs/testing/TESTING_STRATEGY.md`](docs/testing/TESTING_STRATEGY.md)
- Security: [`docs/security/SECURITY_GUIDELINES.md`](docs/security/SECURITY_GUIDELINES.md)
- Local dev: [`docs/development/LOCAL_DEVELOPMENT.md`](docs/development/LOCAL_DEVELOPMENT.md)
- Onboarding: [`docs/onboarding/DEVELOPER_ONBOARDING.md`](docs/onboarding/DEVELOPER_ONBOARDING.md)
- Decisions index: [`docs/decisions/README.md`](docs/decisions/README.md)

Cursor-specific rules live in [`.cursor/rules/`](.cursor/rules/) and
reusable workflows in [`.cursor/skills/`](.cursor/skills/).

## Non-negotiable rules

1. **Do not change the UI.** Preserve HTML structure, CSS classes,
   design tokens, fonts, and asset paths. UI changes must be
   intentional and reviewed; architectural refactors must not alter the
   rendered output.
2. **Server-only code stays server-only.** Any module that touches
   Prisma, secrets, or `src/lib/env/server.ts` MUST import
   `server-only` and must never be reached from a Client Component.
3. **Validate every external input** with Zod before use (request
   bodies, query params, dynamic segments, env vars).
4. **Never commit `.env`** or any real secret. Only `.env.example` is
   tracked.
5. **No destructive DB commands** (`prisma migrate reset`,
   `DROP DATABASE`, raw `TRUNCATE`) without explicit authorization.
6. **No type suppression** (`any`, `@ts-ignore`, `@ts-expect-error`,
   non-null `!` on validated-elsewhere values) to make a build pass.
7. **No committed credentials, tokens, or stack traces** in logs or API
   responses.
8. **Do not create unauthorized git commits.** Stage changes; let the
   user commit.

## Folder placement (quick reference)

| You're adding… | It goes in… |
|---|---|
| A new URL / page / layout / route handler | `src/app/**` |
| A shared primitive (Cta, EditorialTitle, Icon) | `src/components/ui/` |
| Shared chrome (Header, PopularSearches, AppShell) | `src/components/layout/` |
| Reusable client provider (Theme, Session) | `src/components/providers/` |
| A product feature (its own UI + logic) | `src/features/<feature>/` |
| A view wrapper for an existing route (`*View.tsx`) | `src/views/<view>/` |
| Shared hook used by ≥2 features | `src/hooks/` |
| Browser-safe API client / shared service | `src/services/` |
| Shared Server Action | `src/actions/` |
| Shared TS type / contract | `src/types/` |
| Shared Zod schema | `src/schemas/` |
| Prisma access | `src/server/db/`, `src/server/repositories/` |
| Server-side business logic | `src/server/services/` |
| Auth integration (server) | `src/server/auth/` |
| Security helpers (CSRF, rate limit, …) | `src/server/security/` |
| Framework-agnostic utility | `src/lib/<topic>/` |
| Validated config composition | `src/config/` |
| True module-level constants | `src/constants/` |
| XML parse/serialize/transform | `src/xml/` (reserved — see folder README) |
| Global CSS or design tokens | `src/styles/` |
| Static image / icon / font | `public/assets/**` |

## Dependency direction

```
app  →  features / views  →  components / hooks  →  lib
                                              ↘
                               actions ─────→ server/services ─→ server/repositories ─→ server/db (Prisma) ─→ PostgreSQL
```

- `components/`, `views/`, `features/*/components|hooks`, `hooks/` MUST NOT import from `server/`, `@prisma/client`, `src/lib/env/server`, or any `server-only` module.
- `server/` MUST NOT import React components or anything client-side.
- Feature code may freely use shared `components/`, `hooks/`, `lib/`, `types/`, `schemas/`. Shared code must not import feature-specific internals.

## Validation before you report "done"

Run and confirm green:

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
npm run build        # next build
```

For DB changes also run `npm run db:validate` and
`npm run prisma:generate`.

For UI-touching changes, open the affected routes locally and confirm
no visual regression against the pre-change state.

## Documentation maintenance (mandatory)

When you change the architecture, a folder's responsibility, a
dependency rule, an API contract, the DB schema, an environment
variable, or a reusable workflow — update the relevant docs in the
**same change**:

| Change | Update |
|---|---|
| New architectural folder | its own `README.md` + [`FOLDER_STRUCTURE.md`](docs/architecture/FOLDER_STRUCTURE.md) |
| New feature module | `src/features/<name>/README.md` |
| New API endpoint / contract change | [`docs/api/API_CONVENTIONS.md`](docs/api/API_CONVENTIONS.md) |
| DB schema change | [`docs/database/DATABASE_GUIDELINES.md`](docs/database/DATABASE_GUIDELINES.md) + migration notes |
| New env var | `.env.example` + [`src/lib/env/server.ts`](src/lib/env/server.ts) + [`docs/development/LOCAL_DEVELOPMENT.md`](docs/development/LOCAL_DEVELOPMENT.md) |
| New rendering pattern | [`docs/architecture/RENDERING_STRATEGY.md`](docs/architecture/RENDERING_STRATEGY.md) |
| New coding convention | [`docs/architecture/CODING_STANDARDS.md`](docs/architecture/CODING_STANDARDS.md) + relevant `.cursor/rules/*.mdc` |
| New reusable workflow | new skill under [`.cursor/skills/`](.cursor/skills/) |
| New architecture decision | append to [`docs/architecture/ARCHITECTURE_DECISIONS.md`](docs/architecture/ARCHITECTURE_DECISIONS.md) or add an ADR in [`docs/decisions/`](docs/decisions/) |

Do not update unrelated docs for cosmetic activity. Do not record a
decision as made unless it actually was.

## Source-of-truth order

1. Actual, verified implementation.
2. Documents in `docs/`.
3. `AGENTS.md` and `.cursor/rules/*`.
4. Skills in `.cursor/skills/*`.
5. Folder-level `README.md`.

If these disagree, investigate and resolve — do not blindly follow a
stale instruction.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
