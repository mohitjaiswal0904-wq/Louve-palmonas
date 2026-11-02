# tests/e2e/

End-to-end specs that drive a real browser against a running Next.js
instance. Target tool: Playwright.

Rules:

- Boot the application in `next start` mode with a seeded test DB
  (never a production DB).
- One spec per critical user flow (home → collection → PDP → wishlist,
  immersive store entry, account sign-in, etc.).
- Visual-regression snapshots live under `tests/visual/` (planned),
  not here.

See [`../../docs/testing/TESTING_STRATEGY.md`](../../docs/testing/TESTING_STRATEGY.md).
