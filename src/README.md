# src/

Application source. Every folder here has a defined responsibility.
Full map and import rules:

- [`../docs/architecture/FOLDER_STRUCTURE.md`](../docs/architecture/FOLDER_STRUCTURE.md)
- [`../docs/architecture/DEPENDENCY_RULES.md`](../docs/architecture/DEPENDENCY_RULES.md)

## Quick index

| Folder | Role |
|---|---|
| [`app/`](app/README.md) | App Router — routes, layouts, API handlers. |
| [`components/`](components/README.md) | Shared presentation. |
| [`features/`](features/README.md) | Feature modules (home for new work). |
| [`views/`](views/README.md) | Per-route client wrappers around the pre-migration pages. |
| [`services/`](services/README.md) | Browser-safe service abstractions / API clients. |
| [`actions/`](actions/README.md) | Shared Server Actions. |
| [`hooks/`](hooks/README.md) | Shared React hooks. |
| [`types/`](types/README.md) | Shared TypeScript types. |
| [`schemas/`](schemas/README.md) | Shared Zod schemas. |
| [`xml/`](xml/README.md) | XML parse/serialize/transform (reserved). |
| [`lib/`](lib/README.md) | Framework-agnostic infra utilities. |
| [`server/`](server/README.md) | Server-only infrastructure. |
| [`config/`](config/README.md) | Validated config composition. |
| [`constants/`](constants/README.md) | True shared constants. |
| [`styles/`](styles/README.md) | Global CSS + tokens + fonts. |
| [`data/`](data/README.md) | Static authored content. |
| [`test-utils/`](test-utils/README.md) | Reusable test helpers (reserved). |

## Golden rules

1. **Server-only stays server-only.** `src/server/**` and
   `src/lib/env/server.ts` import `server-only`. No client module may
   reach them.
2. **New features go in `src/features/<name>/`**, not in `src/views/`,
   `src/components/`, or `src/lib/`.
3. **Validate at the boundary** with Zod before using any external
   input.
4. **Preserve the UI.** Architectural moves must not change rendered
   output.

See [`../AGENTS.md`](../AGENTS.md) for the full rule set.
