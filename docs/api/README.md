# API Documentation

HTTP API conventions for Louve. All first-party JSON endpoints live
under `/api/v1`.

- [`API_CONVENTIONS.md`](API_CONVENTIONS.md) — envelope, status codes,
  validation, error handling, route-handler template.

Implemented endpoints today:

| Method | Path | Status | Notes |
|---|---|---|---|
| GET | `/api/v1/health` | Implemented & verified | Liveness. |
| GET | `/api/v1/db/health` | Implemented & verified | Returns 503 without `DATABASE_URL`. |

When adding an endpoint, update `API_CONVENTIONS.md` if the convention
changes and this table if the public contract changes.
