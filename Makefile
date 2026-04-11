# Run from louve-frontend repo root: make <target>
ROOT := $(abspath $(dir $(lastword $(MAKEFILE_LIST))))
DOCKER_IMAGE ?= louve-frontend:latest
COMPOSE := docker compose --project-directory . -f deployment/docker-compose.yaml

.PHONY: help install build start up down rebuild docker-build docker-run pm2-start pm2-reload clean _docker-check

help:
	@echo "Docker (Next.js in container with pm2-runtime)"
	@echo "  make up       Build & start web — FRONTEND_PUBLISH_PORT=3001 make up if 3000 is busy"
	@echo "  make down     Stop and remove containers"
	@echo "  make rebuild  Recreate stack (down + up with build)"
	@echo ""
	@echo "Local / VM (no Docker)"
	@echo "  make install / build / start"
	@echo "  make docker-build / docker-run"
	@echo "  make pm2-start   build + pm2 start deployment/ecosystem.config.cjs"
	@echo "  make pm2-reload  install + build + pm2 reload (redeploy on host)"

install:
	cd $(ROOT) && pnpm install --frozen-lockfile

build: install
	cd $(ROOT) && pnpm build

start:
	cd $(ROOT) && pnpm start

up: _docker-check
	$(COMPOSE) up -d --build --remove-orphans

down: _docker-check
	$(COMPOSE) down --remove-orphans

rebuild: _docker-check
	@$(MAKE) down
	@$(MAKE) up

docker-build:
	docker build -f $(ROOT)/deployment/Dockerfile -t $(DOCKER_IMAGE) $(ROOT)

docker-run:
	docker run --rm -p 3000:3000 $(DOCKER_IMAGE)

pm2-start: build
	cd $(ROOT) && pnpm exec pm2 start deployment/ecosystem.config.cjs

pm2-reload: install build
	cd $(ROOT) && pnpm exec pm2 reload louve-frontend --update-env || pnpm exec pm2 start deployment/ecosystem.config.cjs

clean:
	cd $(ROOT) && rm -rf .next && pnpm exec pm2 delete louve-frontend 2>/dev/null || true

_docker-check:
	@docker info >/dev/null 2>&1 || (echo "Docker is not running."; exit 1)
