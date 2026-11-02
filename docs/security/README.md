# Security Documentation

- [`SECURITY_GUIDELINES.md`](SECURITY_GUIDELINES.md)

Current posture (short):

- No authentication is implemented. `src/lib/account.ts` is a localStorage
  demo and must be replaced before any privileged capability ships.
- Server-only modules are isolated via `server-only`.
- Secrets live only in `.env` (gitignored); `.env.example` is tracked.
- All external input is validated with Zod at the boundary.

See `SECURITY_GUIDELINES.md` for the full implemented-vs-recommended
breakdown.
