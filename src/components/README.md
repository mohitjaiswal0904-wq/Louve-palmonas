# src/components/

Shared, reusable presentation. Nothing feature-specific.

## Subfolders

| Folder | Role |
|---|---|
| [`ui/`](ui/README.md) | Primitive, atomic UI (`Cta`, `EditorialTitle`). |
| [`layout/`](layout/README.md) | Page chrome: `Header`, `AppShell`, overlays, drawers. |
| [`navigation/`](navigation/README.md) | Navigation-specific UI (reserved). |
| [`providers/`](providers/README.md) | React providers (Theme, Session) (reserved). |
| [`common/`](common/README.md) | Generic reusable widgets (reserved). |
| [`account/`](account/README.md) | `AuthPanel`, `AuthForm` (demo auth UI — will move to `src/features/account/` when a real backend lands). |

## Rules

- No Prisma, no `server-only` modules, no secrets.
- No feature logic. If a component is only used by one feature, it goes
  inside `src/features/<f>/components/`.
- Client / Server split: components are Server Components by default.
  Add `"use client"` only when the file uses state, effects, event
  handlers, or browser APIs. Push the client boundary down.
- Preserve existing CSS classes and styling conventions. See
  [`../../docs/frontend/UI_AND_COMPONENT_GUIDELINES.md`](../../docs/frontend/UI_AND_COMPONENT_GUIDELINES.md).

## Naming

- File + export: `PascalCase` matching the component.
- Props type: `XxxProps`.
- Styles: colocated `component.css` or extend a global file in
  `src/styles/`.

## Dependency rules

- May import from: `components/*`, `hooks/*`, `lib/*` (client-safe
  parts), `types/*`, `schemas/*`, `data/*`.
- May **not** import from: `server/*`, `@prisma/client`,
  `src/lib/env/server`.

## Adding a new component

1. Decide subfolder (`ui/` for primitives, `layout/` for chrome, etc.).
2. If used by only one feature, move it to the feature instead.
3. Follow naming above.
4. Only add a client boundary if truly needed.
5. Visual-regression check if it affects shared chrome.
