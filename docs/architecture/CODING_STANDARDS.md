# Coding Standards

Short, enforceable. Every rule here is either checked automatically or
part of code review.

## TypeScript

- `strict: true`. Keep it on.
- No `any`. Prefer `unknown` + narrowing, or a Zod schema.
- No `@ts-ignore` / `@ts-expect-error` to make a build pass. Fix the
  type.
- No non-null assertion (`!`) when a check or Zod schema is possible.
- Infer types from Zod (`z.infer<typeof Schema>`) and Prisma — do not
  hand-maintain duplicates.
- Server-only Prisma types must not leak into client bundles. Define a
  separate DTO when exposing data to the client.

## Naming

| Kind | Convention | Example |
|---|---|---|
| Component | `PascalCase` | `Header`, `AppShell` |
| View (route-level wrapper) | `PascalCase` + `View` | `HomeView`, `PdpView` |
| Hook | `useX` | `useAppNav` |
| Function / variable | `camelCase` | `getPrisma`, `wishlistCount` |
| Constant (true module-level) | `UPPER_SNAKE_CASE` | `WISHLIST_EVENT` |
| Type / interface | `PascalCase` | `AppError`, `HeaderProps` |
| File | matches its primary export | `AppShell.tsx`, `prisma.ts` |
| Route handler | `route.ts` (Next.js required) | — |
| Zod schema | `PascalCase` + `Schema` | `ProductSchema` |
| ADR | `NNNN-kebab-case.md` | `0003-feature-boundaries.md` |

Avoid generic filenames (`utils.ts`, `helpers.ts`, `data.ts`,
`manager.ts`) when a specific topic exists.

## File structure

- One primary export per file; co-locate tightly-related types.
- Co-locate CSS next to its component (`AppShell.tsx` + `app-shell.css`
  if a new CSS file is needed; prefer extending `src/styles/*` for truly
  global styles).
- Index files are optional; use them when a feature exposes a public
  surface, not for every folder.

## Imports / exports

- Use the `@/*` path alias (`"@/components/..."`). Avoid long
  `../../..` chains.
- Order within a file: node built-ins → third-party → `@/*` → relative.
- Named exports by default; default export only where the framework
  requires it (route handlers, Next.js page/layout files).
- No `.ts`/`.tsx` extensions in import specifiers.
- No circular imports.

## Components

- Server Components by default. Add `"use client"` only when needed —
  see [`RENDERING_STRATEGY.md`](RENDERING_STRATEGY.md).
- Push the client boundary as low as practical.
- Components must not import `server-only`, `@prisma/client`, or
  `src/lib/env/server`.
- Props: typed, named `XxxProps`.
- No business logic inside render — extract to hooks or services.

## Hooks

- Follow the Rules of Hooks.
- Shared hooks → `src/hooks/`. Feature-local → `src/features/<f>/hooks/`.
- Hooks must not import server-only modules.

## Zod schemas

- Validate every untrusted input (request body, query, params, env).
- Define schemas close to the boundary that uses them, or in
  `src/schemas/` if genuinely shared.
- Export inferred types alongside: `export type Foo = z.infer<typeof FooSchema>`.

## API contracts

- Use `ok()` / `fail()` / `toErrorResponse()` from
  `src/lib/http/response.ts`. No hand-rolled envelopes.
- One versioned prefix (`/api/v1`). Breaking changes bump the version.
- Status codes match the semantics (see
  [`../api/API_CONVENTIONS.md`](../api/API_CONVENTIONS.md)).

## Error handling

- Throw `AppError(code, message, details?)` for expected failures.
- Never leak stack traces, SQL, Prisma internals, env values, or file
  paths to clients.
- Server-side logs are gated by `NODE_ENV !== "production"` for now.
- UI boundaries: `error.tsx` / `not-found.tsx`.

## Logging

- No logging of passwords, tokens, PII, raw SQL, DATABASE_URL,
  Authorization headers.
- Use `console.error` only for truly unexpected server-side failures;
  prefer `AppError` for expected cases.

## Database access

- All Prisma usage goes through `getPrisma()` in
  `src/server/db/prisma.ts`.
- Place queries in `src/server/repositories/<aggregate>.ts` once
  non-trivial domain code appears.
- Never return raw Prisma records to the client when sensitive fields
  exist — map to a DTO.
- Migrations: `prisma migrate dev` locally, `prisma migrate deploy` in
  production. Never `prisma db push` in production.

## Testing

- No framework wired yet (see
  [`../testing/TESTING_STRATEGY.md`](../testing/TESTING_STRATEGY.md)).
- When added: Vitest for unit/component, Playwright for E2E, Puppeteer
  already available for visual regression.
- Mark a check as passed only if it actually ran green.

## Documentation updates

Material changes update the docs in the **same change**. See the
mapping in [`../../AGENTS.md`](../../AGENTS.md#documentation-maintenance-mandatory).

## UI preservation

- Do not rename CSS classes.
- Do not substitute `<img>` with `next/image` without checking visual
  parity.
- Do not replace existing design tokens.
- Do not reorder global CSS imports in `src/app/layout.tsx`.
- Visual-regression check (Puppeteer screenshots) before merging any
  change in `src/components/layout/` or any global stylesheet.

## Code review expectations

- Diffs are focused — one concern per PR.
- Public surface changes (API, schema, env, folder responsibility)
  bring their docs along.
- No pseudo-progress ("TODO: add later" without an issue link).
- Reviewers verify: typecheck, lint, build, and that UI-touching changes
  include screenshots.
