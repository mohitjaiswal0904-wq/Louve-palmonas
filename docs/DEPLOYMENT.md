# Deployment

## AWS Amplify

This repo ships an `amplify.yaml` configured for pnpm.

If Amplify uses an older Node runtime, set the build image/runtime in Amplify settings.

## Docker

From **louve-frontend** repo root (Compose project dir = `.`):

```bash
make up        # build & start (image louve-frontend:local)
make down
make rebuild   # down, then up with rebuild
```

Optional host port: `FRONTEND_PUBLISH_PORT=3001 make up`.

Manual build/run:

```bash
docker build -f deployment/Dockerfile -t louve-frontend:latest .
docker run --rm -p 3000:3000 louve-frontend:latest
```

The container runs **Next.js standalone** under **pm2-runtime** (see `deployment/ecosystem.docker.cjs`).

## PM2 (VM)

On the server:

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm exec pm2 start deployment/ecosystem.config.cjs
```

Redeploy / restart:

```bash
make pm2-reload
```

