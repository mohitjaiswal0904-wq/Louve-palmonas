# `deployment/`

**Production-style** run artifacts for Louve frontend (singular folder name **`deployment/`** at repo root).

## Files

| File | Role |
|------|------|
| **`Dockerfile`** | Multi-stage **Next.js standalone** build with **pnpm**, **pm2-runtime** in the final image, non-root user. |
| **`docker-compose.yaml`** | Local/prod-like stack: `make up` / `make down` / `make rebuild` from repo root. |
| **`ecosystem.config.cjs`** | **PM2** on the host — `next start` on port 3000 (VM/bare-metal, not Docker). |
| **`ecosystem.docker.cjs`** | **PM2 in Docker** — `server.js` standalone; copied as `ecosystem.config.cjs` in the image. |

## Build context

Docker build should run from **repository root** (see **`Makefile`** **`ROOT`**), not only inside `deployment/`, so `COPY` sees `package.json` and `src/`.

**`NEXT_PUBLIC_*`:** Inlined at **`pnpm build`**. The **`Dockerfile`** sets defaults for production (`louve.palmonas.tech` / `api-louve.palmonas.tech`). Override via **`docker-compose.yaml`** build `args` (Compose reads repo-root **`.env`** for substitution) or `docker build --build-arg ...`.

## Related

- Root **`Makefile`** — Docker: `make up`, `make down`, `make rebuild`; host PM2: `make pm2-reload`; local: `make build`, `make start`.
- **`docs/DEPLOYMENT.md`** — Amplify, Docker, PM2 narrative.
- **`amplify.yaml`** (repo root) — AWS Amplify build spec.
