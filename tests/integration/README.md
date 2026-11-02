# tests/integration/

Integration tests that cross module boundaries — primarily route
handlers against a real test PostgreSQL database.

Rules:

- Dedicated connection via `TEST_DATABASE_URL`; never touch
  `DATABASE_URL`.
- Each test wraps its work in a transaction that rolls back, OR uses a
  per-worker schema truncated between tests.
- Call route handlers directly:
  ```ts
  const res = await GET(new Request("http://local/api/v1/health"));
  ```

See [`../../docs/testing/TESTING_STRATEGY.md`](../../docs/testing/TESTING_STRATEGY.md).
