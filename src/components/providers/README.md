# src/components/providers/

**Reserved — currently empty.**

Home for client-side React providers that wrap the entire application
or large sub-trees (`ThemeProvider`, `SessionProvider`,
`QueryClientProvider`, `AnalyticsProvider`, …).

## Rules

- Every file is a Client Component (`"use client"`).
- Providers compose at the top of `src/app/layout.tsx` (or a per-route
  layout) and are the only legitimate place to introduce React context
  that spans the app.
- A provider that is only needed inside one feature belongs in the
  feature, not here.
- No server-only imports.

## When to add one

- A new cross-cutting client state (theme, session, feature flags).
- A client-side library requires a provider at the root (React Query,
  Jotai, etc.) — this project does not use one today.

Earlier a `LouveApp.tsx` provider lived here as the legacy router
bridge; it was deleted when the per-view routes landed in Phase 1.
