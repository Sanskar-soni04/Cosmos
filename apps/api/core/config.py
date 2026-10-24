import os
from pydantic import BaseModel

class Settings(BaseModel):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "AICTE Approval Workflow & Compliance Monitoring API"
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "aicte_sih2026_super_secure_jwt_secret_key_prod_grade_998811")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    
    # Cookie security settings (Section 2 & 14)
    COOKIE_NAME: str = "access_token"
    COOKIE_HTTPONLY: bool = True
    COOKIE_SECURE: bool = os.getenv("COOKIE_SECURE", "false").lower() == "true"
    COOKIE_SAMESITE: str = "lax"

settings = Settings()
