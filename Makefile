.PHONY: help up down build logs migrate seed test lint clean

help:
	@echo "AICTE Approval Workflow Automation Platform - Developer Commands"
	@echo "-----------------------------------------------------------------"
	@echo "make up       - Start all containers (frontend, API, DB, Redis, MinIO, MailHog)"
	@echo "make down     - Stop all running containers"
	@echo "make build    - Rebuild Docker images"
	@echo "make logs     - View tail logs of all services"
	@echo "make migrate  - Run PostgreSQL schema migrations"
	@echo "make seed     - Populate synthetic institutions and demo records"
	@echo "make test     - Run backend pytest and frontend vitest test suites"
	@echo "make lint     - Run code quality checkers (oxlint / ruff)"

up:
	docker compose up -d

down:
	docker compose down

build:
	docker compose build

logs:
	docker compose logs -f

migrate:
	docker compose exec api alembic upgrade head

seed:
	docker compose exec api python -m seed.seed_runner

test:
	docker compose exec api pytest
	npm run test

lint:
	npm run lint
