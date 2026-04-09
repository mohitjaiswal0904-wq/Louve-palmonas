# `deployment/`

**Production-style** run artifacts for Louve frontend (singular folder name **`deployment/`** at repo root).

## Files

| File | Role |
|------|------|
| **`Dockerfile`** | Multi-stage **Next.js standalone** build with **pnpm**, non-root user, exposes app port. |
| **`ecosystem.config.cjs`** | **PM2** — `next start` on port 3000; use for VM/bare-metal deploys. |

## Build context

Docker build should run from **repository root** (see **`Makefile`** **`ROOT`**), not only inside `deployment/`, so `COPY` sees `package.json` and `src/`.

## Related

- Root **`Makefile`** — `make build`, `make start`, `make restart`.
- **`docs/DEPLOYMENT.md`** — Amplify, Docker, PM2 narrative.
- **`amplify.yaml`** (repo root) — AWS Amplify build spec.
