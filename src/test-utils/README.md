# src/test-utils/

**Reserved — currently empty.** Reusable test helpers, fixtures,
factories, and testing-only utilities.

## What belongs here

- Factory functions returning complete valid domain objects
  (`makeUser(partial?)`).
- Shared Vitest / Playwright setup helpers.
- In-memory stand-ins for `localStorage` (`fakeStorage()`).
- Rendering helpers that wrap components with required providers.

## Rules

- **Must not** ship to production. Keep this folder outside production
  imports. The planned Vitest config excludes it from `next build`.
- No test runner specifics in the exports (prefer plain functions /
  objects over `vi.*`/`jest.*` globals when possible).
- Mirrors the structure of the code it supports when useful (e.g.
  `test-utils/features/<feature>/factory.ts`).

## Not here

- Test fixtures that only one test file uses — put them next to the
  test.
- Mocks of production dependencies — those live beside the test using
  Vitest / Playwright mocks.
