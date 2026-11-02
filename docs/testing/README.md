# Testing Documentation

- [`TESTING_STRATEGY.md`](TESTING_STRATEGY.md) — intended layout, tools,
  conventions.

**Current status:** no test framework is wired. `puppeteer` is a dev
dependency (unused today). The intended target when tests are
introduced is Vitest (unit/component), Playwright (E2E), Puppeteer for
visual-regression screenshots. See `TESTING_STRATEGY.md` for the full
plan.
