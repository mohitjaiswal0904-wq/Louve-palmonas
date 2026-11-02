# Developer Onboarding

A guided tour. Follow it top to bottom; it should take under an hour.

## 0. Get the app running

Follow [`../development/LOCAL_DEVELOPMENT.md`](../development/LOCAL_DEVELOPMENT.md).
You should see the Home page at <http://localhost:3000> with the Header,
hero banner, and footer.

## 1. How the app works

- **Framework:** Next.js 16 App Router. Routes live under `src/app/**`.
- **Page shape:** every `page.tsx` is a Server Component that mounts a
  per-view client wrapper (`src/views/<name>/<Name>View.tsx`), which in
  turn renders the pre-existing UI component (`<Name>Page.tsx`) wrapped
  in the shared `AppShell` chrome.
- **Navigation:** `src/lib/nav/useAppNav.ts` exposes callbacks
  (`goHome`, `goCollection`, `goPdp(id)`, …) that the `<Header />` was
  already written against; underneath it calls `next/navigation`.
- **State:** URL for route, local React state for interaction, a few
  `localStorage` stores in `src/lib/{session,account,wishlist}.ts`.
- **Backend:** `/api/v1/health` and `/api/v1/db/health` are the only
  endpoints today. Everything else is TODO.

## 2. Where routes are defined

```
src/app/
├── page.tsx                       →  /
├── collection/page.tsx            →  /collection
├── pdp/page.tsx                   →  /pdp
├── pdp/[productId]/page.tsx       →  /pdp/<id>
├── stores/page.tsx                →  /stores
├── stores/[storeId]/page.tsx      →  /stores/<id>
├── account/page.tsx               →  /account
└── api/v1/*/route.ts              →  JSON endpoints
```

Legacy `/?view=…` URLs redirect to the new paths via `redirects()` in
`next.config.ts`.

## 3. Where components belong

| Kind | Folder |
|---|---|
| UI primitive (Cta, Icon) | `src/components/ui/` |
| Shared chrome | `src/components/layout/` |
| Navigation menu | `src/components/navigation/` |
| React provider | `src/components/providers/` |
| Feature-only component | `src/features/<feature>/components/` |
| Legacy per-view component | `src/views/<view>/` (don't add new ones here) |

Full rules: [`../architecture/FOLDER_STRUCTURE.md`](../architecture/FOLDER_STRUCTURE.md).

## 4. How features are structured

New features go under `src/features/<feature>/`, with only the folders
they need:

```
src/features/<feature>/
├── README.md
├── components/
├── hooks/
├── actions/        # Server Actions (server-only)
├── services/       # usually server-only
├── schemas/        # Zod
├── types/
├── utils/
└── index.ts        # the feature's public surface
```

See the template in [`../../src/features/README.md`](../../src/features/README.md)
and ADR [`../decisions/0003-feature-module-boundaries.md`](../decisions/0003-feature-module-boundaries.md).

## 5. How APIs are implemented

```ts
// src/app/api/v1/<module>/route.ts
import { ok, toErrorResponse } from "@/lib/http/response";
import { AppError } from "@/lib/errors/app-error";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    // 1. parse + Zod-validate input
    // 2. authenticate / authorise
    // 3. call a service (which calls repositories)
    // 4. return ok(...)
    return ok({ hello: "world" });
  } catch (error) {
    return toErrorResponse(error);
  }
}
```

Follow the full procedure in
[`../../.cursor/skills/api-development/SKILL.md`](../../.cursor/skills/api-development/SKILL.md).

## 6. How database queries work

- `getPrisma()` from `src/server/db/prisma.ts` is the singleton.
- All queries go in repositories under `src/server/repositories/`.
- Repositories return DTOs, not raw Prisma records.
- Services compose repositories.
- Route handlers call services.
- Full procedure:
  [`../../.cursor/skills/database-changes/SKILL.md`](../../.cursor/skills/database-changes/SKILL.md).

## 7. How validation is handled

- Zod schemas live near the boundary (feature's `schemas/` or
  `src/schemas/` if shared).
- `toErrorResponse` already maps `ZodError` → 422.
- Export inferred types alongside the schema:
  `export type Foo = z.infer<typeof FooSchema>`.

## 8. How to create a new feature

```
1. Create src/features/<name>/README.md and only the subfolders you need.
2. Add Zod schemas in schemas/ with inferred TS types.
3. If it touches the DB, add a Prisma model + repository + service.
4. Expose UX through a route handler or Server Action.
5. Wire the UI from the feature's components/.
6. Add tests (unit + 1 integration).
7. Update:
   - the feature README,
   - docs/architecture/FOLDER_STRUCTURE.md if a new folder appeared,
   - docs/api/API_CONVENTIONS.md if a new endpoint shape appeared,
   - .env.example if a new env var appeared.
8. Run typecheck + lint + build.
```

Full procedure:
[`../../.cursor/skills/feature-development/SKILL.md`](../../.cursor/skills/feature-development/SKILL.md).

## 9. How to change the UI safely

Follow
[`../../.cursor/skills/ui-preserving-refactors/SKILL.md`](../../.cursor/skills/ui-preserving-refactors/SKILL.md).
TL;DR: capture before/after screenshots on the affected routes, don't
rename CSS classes, don't swap `<img>` for `<Image>` without checking
layout.

## 10. How to run tests

Not wired yet. See [`../testing/TESTING_STRATEGY.md`](../testing/TESTING_STRATEGY.md)
for the intended layout.

## 11. How to update documentation

Material architecture / API / schema / env changes update the docs in
the **same PR**. See the mapping in
[`../../AGENTS.md`](../../AGENTS.md#documentation-maintenance-mandatory).

## 12. How AI agents operate

- The project ships `AGENTS.md` + `.cursor/rules/*.mdc` +
  `.cursor/skills/*/SKILL.md`.
- Agents should read `AGENTS.md` first, then follow the scoped rule
  that matches the file they are editing, then invoke the relevant
  skill for workflows (new feature, new API, DB change, UI refactor).
- Hard prohibitions and documentation-maintenance expectations apply to
  both humans and agents.
