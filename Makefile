# Run from louve-frontend repo root: make <target>
ROOT := $(abspath $(dir $(lastword $(MAKEFILE_LIST))))
DOCKER_IMAGE ?= louve-frontend:latest

.PHONY: help install build start docker-build docker-run pm2-start restart clean

help:
	@echo "make install     pnpm install"
	@echo "make build       next build"
	@echo "make start       next start (production build must exist)"
	@echo "make docker-build / docker-run"
	@echo "make pm2-start   build + pm2 start deployment/ecosystem.config.cjs"
	@echo "make restart     install + build + pm2 reload (rebuild on redeploy)"

install:
	cd $(ROOT) && pnpm install --frozen-lockfile

build: install
	cd $(ROOT) && pnpm build

start:
	cd $(ROOT) && pnpm start

docker-build:
	docker build -f $(ROOT)/deployment/Dockerfile -t $(DOCKER_IMAGE) $(ROOT)

docker-run:
	docker run --rm -p 3000:3000 $(DOCKER_IMAGE)

pm2-start: build
	cd $(ROOT) && pnpm exec pm2 start deployment/ecosystem.config.cjs

restart: install build
	cd $(ROOT) && pnpm exec pm2 reload louve-frontend --update-env || pnpm exec pm2 start deployment/ecosystem.config.cjs

clean:
	cd $(ROOT) && rm -rf .next && pnpm exec pm2 delete louve-frontend 2>/dev/null || true
