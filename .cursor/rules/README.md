# .cursor/rules/

Scoped project rules. Each `.mdc` file has YAML frontmatter telling
Cursor when to attach the rule to the model's context.

## Rules

| File | Scope (`globs`) | Always applied | Purpose |
|---|---|---|---|
| [`project-architecture.mdc`](project-architecture.mdc) | * | yes | Folder structure, dependency direction, placement rules. |
| [`typescript.mdc`](typescript.mdc) | `**/*.{ts,tsx}` | — | TypeScript strictness, naming, Zod-inferred types. |
| [`nextjs-rendering.mdc`](nextjs-rendering.mdc) | `src/app/**`, `src/views/**`, `src/features/**/components/**`, `src/components/**` | — | Server vs. Client, caching, SSR-safe code. |
| [`ui-preservation.mdc`](ui-preservation.mdc) | `src/components/**`, `src/views/**`, `src/styles/**`, `src/app/layout.tsx`, `src/app/**/page.tsx` | — | Don't redesign; preserve DOM/CSS/tokens. |
| [`backend-and-api.mdc`](backend-and-api.mdc) | `src/app/api/**/route.ts`, `src/actions/**`, `src/features/**/actions/**`, `src/server/services/**` | — | Validation, envelopes, status codes, authz. |
| [`database-and-prisma.mdc`](database-and-prisma.mdc) | `prisma/**`, `src/server/db/**`, `src/server/repositories/**`, `src/server/services/**` | — | Prisma access, migrations, DTOs, server-only. |
| [`testing.mdc`](testing.mdc) | `tests/**`, `**/*.test.{ts,tsx}` | — | Test layout, DB isolation, no coverage theater. |
| [`documentation-maintenance.mdc`](documentation-maintenance.mdc) | * | yes | When to update which doc. |

## Format

Each file starts with:

```yaml
---
description: One-line summary.
globs: ["glob", "glob"]
alwaysApply: true | false
---
```

Keep each rule focused and non-overlapping. If a rule gets large, link
to the canonical document rather than inlining it.
