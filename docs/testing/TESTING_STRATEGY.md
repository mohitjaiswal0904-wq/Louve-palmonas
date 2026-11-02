# Testing Strategy

> **Status:** Planned. No test framework is currently installed. This
> document describes the intended target so new work can be built with
> testability in mind. When tests land, update this document to reflect
> what actually exists.

## Test pyramid

```
             ┌──────────────┐
             │ visual +     │  Puppeteer screenshots (already available)
             │ e2e (few)    │  Playwright (planned)
             └──────┬───────┘
         ┌──────────┴──────────┐
         │ integration (some)  │  API handlers + Prisma (test DB)
         └──────────┬──────────┘
┌────────────────────┴────────────────────┐
│ unit / component (many)                 │  Vitest + Testing Library
└─────────────────────────────────────────┘
```

## Tools (intended)

| Layer | Tool |
|---|---|
| Unit / component | Vitest, @testing-library/react, jsdom |
| Integration (API + DB) | Vitest + a dedicated Postgres test DB |
| E2E | Playwright |
| Visual regression | Puppeteer (already a dev dep) |

## Layout

```
tests/
├── unit/            # Pure functions, hooks, schemas
├── integration/     # Route handlers against a real test DB
└── e2e/             # Playwright specs

src/
└── <path>/__tests__/<file>.test.ts   # Allowed when the test is
                                      # tightly coupled to the module.
```

Colocated tests are allowed for close coverage; `tests/` holds suites
that cross modules or need shared setup.

## Conventions

- Test file suffix: `.test.ts` / `.test.tsx`.
- One `describe` per module; one `it` per behaviour.
- Arrange / Act / Assert, with a blank line between.
- No snapshot testing for UI unless the snapshot has an owner. Prefer
  explicit assertions.

## Fixtures and factories

- Factories live in [`../../src/test-utils/`](../../src/test-utils/).
- Each factory returns a complete valid object; override via a partial
  argument.

## Database isolation

- Each integration test runs in a transaction that rolls back on
  teardown, OR against a per-worker schema that is truncated between
  tests.
- The test database connection string is a dedicated env var
  (`TEST_DATABASE_URL`), never `DATABASE_URL`.

## API tests

- Hit the route handler module directly (`route.GET(new Request(...))`)
  rather than booting a Next.js server where possible.
- Assert on status, envelope `success`, and representative fields.

## Visual regression

- One Puppeteer run captures the key routes at desktop + mobile sizes.
- Baselines live in `tests/visual/__snapshots__/` (gitignored by file
  content, tracked by hash).
- Required for any PR touching `src/components/layout/*`,
  `src/styles/*`, or `src/app/layout.tsx`.

## CI validation (when added)

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run test:e2e` (gated to main)

## Coverage expectations

- Routes: happy path + primary failure (validation / 503) covered.
- Services / repositories: full behavioural coverage.
- UI primitives: covered via component tests when logic is non-trivial.
- Pure functions in `src/lib/` and `src/utils/`: 100% branches.

No coverage threshold is enforced yet.
