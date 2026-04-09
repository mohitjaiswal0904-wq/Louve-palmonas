# Deployment

## AWS Amplify

This repo ships an `amplify.yaml` configured for pnpm.

If Amplify uses an older Node runtime, set the build image/runtime in Amplify settings.

## Docker

Build:

```bash
docker build -f deployment/Dockerfile -t louve-frontend:latest .
```

Run:

```bash
docker run --rm -p 3000:3000 louve-frontend:latest
```

## PM2 (VM)

On the server:

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm exec pm2 start deployment/ecosystem.config.cjs
```

Redeploy / restart:

```bash
make restart
```

