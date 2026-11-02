# tests/

Standalone test suites grouped by test type.

- [`unit/`](unit/README.md) — pure functions, hooks, schemas.
- [`integration/`](integration/README.md) — route handlers + Prisma
  against a test database.
- [`e2e/`](e2e/README.md) — Playwright specs.

**Status:** no framework is wired yet. See
[`../docs/testing/TESTING_STRATEGY.md`](../docs/testing/TESTING_STRATEGY.md)
for the intended tooling, layout, and conventions.

Colocated tests inside `src/<path>/__tests__/*.test.ts` are also
allowed when the test is tightly coupled to one module; use `tests/`
for suites that cross modules or need shared setup.
