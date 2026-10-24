# AICTE Approval Workflow Automation API (FastAPI Backend)

Domain-driven, modular architecture designed for high-concurrency statutory workflows under the Approval Process Handbook (APH 2024-27).

## Architecture & Modules

```
/apps/api
├── main.py                     # FastAPI application factory, middleware, CORS, OpenAPI setup
├── config.py                   # Pydantic v2 Settings from .env
├── database.py                 # SQLAlchemy 2.0 AsyncEngine & sessionmaker
├── routers/                    # REST API route handlers
│   ├── auth.py                 # Token issuance, argon2 validation, TOTP 2FA
│   ├── institutions.py         # Institutional records & PID queries
│   ├── applications.py         # Application intake, routing & state machine
│   ├── documents.py            # MinIO uploads, SHA-256 verification
│   ├── verification.py         # AI orchestrator & specialist agents trigger
│   ├── rules.py                # Deterministic scoring, mandatory gates
│   ├── evc.py                  # Expert visiting committee queue & scheduling
│   ├── undertakings.py         # Compliance conditions & tracking
│   ├── validity.py             # Document expiry & renewal schedules
│   ├── notifications.py        # Multi-channel alerts & SSE stream
│   ├── audit.py                # Hash-chain integrity verifier & PDF export
│   └── simulator.py            # Time-travel demo clock & scenario loader
└── worker/                     # Celery background tasks & scheduler
    ├── celery_app.py
    ├── tasks_ocr.py            # PaddleOCR extraction
    └── tasks_scheduler.py      # Hourly Beat checks for expiries & escalations
```

## Running the API Locally (Without Docker)

```bash
# 1. Create and activate Python virtual environment
python -m venv venv
source venv/bin/activate  # Or `venv\Scripts\activate` on Windows

# 2. Install dependencies
pip install fastapi uvicorn[standard] sqlalchemy asyncpg pydantic pydantic-settings celery redis minio

# 3. Start development server
uvicorn main:app --reload --port 8000
```
