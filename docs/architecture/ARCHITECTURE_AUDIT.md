# Architecture Audit (Phase 2 kickoff)

Snapshot taken at the start of the Phase-2 standardisation. Captures the
state of the repository **before** READMEs, agent configuration, and the
remaining folder scaffolding were added.

## 1. Current folder structure (before Phase 2)

```
src/
├── app/                    # App Router: layout, home, collection, pdp, pdp/[id],
│                           # stores, stores/[id], account, api/v1/{health,db/health}
├── assets/                 # orphan — contained only hero.png, unreferenced
├── components/
│   ├── account/            # AuthPanel, AuthForm (localStorage-backed demo auth)
│   ├── layout/             # Header, NavOverlay, PopularSearches, WishlistPanel, AppShell
│   └── ui/                 # Cta, EditorialTitle
├── data/                   # static content: products, stores, nav categories, …
├── lib/
│   ├── account.ts, session.ts, wishlist.ts  # browser localStorage stores
│   ├── slugify.ts
│   ├── env/server.ts       # Zod-validated server env (server-only)
│   ├── errors/app-error.ts
│   ├── http/response.ts    # API envelope + error mapping
│   └── nav/useAppNav.ts    # next/navigation shim
├── server/
│   └── db/prisma.ts        # Prisma singleton (server-only, lazy)
├── styles/                 # global CSS + tokens + fonts
└── views/                  # per-route client wrappers + page components
    ├── account/, collection/, home/, pdp/, store/

public/
└── assets/                 # feature-grouped: collection/, menu/, pdp/, slides/, slides/feature/
    + icon-*.svg at root, logo.png, louve-wolf.png

prisma/
└── schema.prisma           # single HealthProbe model
```

## 2. Responsibilities as implemented

- `app/` holds routing + API only. Clean.
- `components/` holds reusable chrome and UI primitives. Clean.
- `views/<name>/<Name>View.tsx` is the thin `"use client"` wrapper per
  route; `views/<name>/<Name>Page.tsx` is the actual UI. Clear split.
- `lib/{env,errors,http,nav}/` are focused infra modules.
- `server/db/` is the only server-only module; Prisma is isolated.
- `data/` holds static design content (navigation, product catalog, store
  list). No DB access.

## 3. Missing architectural layers

Phase-2 adds the following as reserved extension points — documented but
intentionally empty where unused:

- `src/features/` — not yet exercised; current UI lives in `views/` because
  the migration preserved the pre-Next.js structure. New product features
  should go here.
- `src/services/` — browser-safe service abstractions. None today.
- `src/actions/` — shared Server Actions. None today.
- `src/hooks/` — shared hooks. None today (hooks are feature-local or
  component-local).
- `src/types/`, `src/schemas/` — shared contracts and runtime validation.
  None extracted yet.
- `src/xml/` — reserved; no current XML workload.
- `src/config/`, `src/constants/`, `src/test-utils/`.
- `src/server/{repositories,services,auth,security}/`.
- `src/components/{common,navigation,providers}/`.
- `tests/{unit,integration,e2e}/` — no tests exist yet.

## 4. Duplicate or overlapping folders

- `src/views/` vs. `src/features/` — overlapping conceptually. Phase 2
  keeps `views/` for the current migrated structure and reserves
  `features/` for new, cross-concern feature modules. Future refactors
  should move features from `views/` into `features/` incrementally.
- `src/lib/{account,session,wishlist}.ts` are strictly browser stores but
  share a folder with cross-cutting infra (`env/`, `errors/`, `http/`).
  Flagged for a future split under `src/features/account/` once a real
  server backend exists.

## 5. Incorrect client/server boundaries

None detected. `src/lib/env/server.ts` and `src/server/db/prisma.ts` both
import `server-only`. No component imports Prisma.

## 6. Asset-location inconsistencies

- `src/assets/hero.png` was an orphan — unreferenced; the actual asset in
  use lives at `/public/assets/pdp/hero.png`. **Removed** in Phase 2.
- `public/assets/` uses feature-based grouping (`collection/`, `menu/`,
  `pdp/`, `slides/`) rather than kind-based (`images/`, `icons/`). Per
  the Phase-2 brief, we **keep the working organisation** and document
  it in [`../../public/README.md`](../../public/README.md) and
  [`../../public/assets/README.md`](../../public/assets/README.md).

## 7. Documentation gaps (resolved by Phase 2)

Before Phase 2 only four documents existed:
`docs/architecture/{APPLICATION_ARCHITECTURE,API_CONVENTIONS,DATABASE_GUIDELINES,CODING_STANDARDS}.md`
plus `docs/migration/REACT_TO_NEXT_MIGRATION.md`. Phase 2 adds
system architecture, folder structure, dependency rules, rendering
strategy, decisions, frontend/UI, testing, security, local dev,
onboarding, operations, and per-folder READMEs.

## 8. Existing AI-agent configuration

Only `.cursor/settings.json` (Figma plugin enablement). No `AGENTS.md`,
no `.cursor/rules/`, no `.cursor/skills/`, no `.agents/`. All of these
are added in Phase 2.

## 9. Restructuring risks

- Moving `views/` → `features/` would churn imports and risk UI
  regressions. Deferred.
- Splitting `public/assets/` by file-kind would break the URL conventions
  used in `src/data/*`. Deferred.
- Introducing ESLint boundary rules risks breaking the current build;
  implemented as **documented conventions** backed by `server-only`, not
  as hard ESLint failures (see [`DEPENDENCY_RULES.md`](DEPENDENCY_RULES.md)).

## 10. Recommended changes (and their disposition in Phase 2)

| Recommendation | Status |
|---|---|
| Remove orphaned `src/assets/` | **Done** |
| Document `public/assets/` organisation | **Done** |
| Create READMEs for every meaningful folder | **Done** |
| Create full `docs/` tree | **Done** |
| Add `AGENTS.md`, `.cursor/rules/`, `.cursor/skills/` | **Done** |
| Enforce server/client boundary via ESLint | **Deferred** (documented; `server-only` runtime guard in place) |
| Split `src/lib/{account,session,wishlist}` into a feature | **Deferred** until a real backend replaces localStorage |
| Add first ADRs | **Done** (NextJS App Router, Prisma 6, feature boundaries) |
