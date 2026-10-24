from sqlalchemy import Column, String, Integer, Float, Boolean, Text, JSON, DateTime
from datetime import datetime, timezone
import uuid
from apps.api.db.database import Base

class DBFinding(Base):
    __tablename__ = "findings"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    application_id = Column(String(64), index=True, nullable=False)
    rule_code = Column(String(64), index=True, nullable=False)
    agent_id = Column(Integer, nullable=False)
    status = Column(String(32), nullable=False) # PASS, REVIEW_REQUIRED, FAIL_DEFICIENCY, MISSING, EXTRACTION_ERROR
    confidence = Column(Float, nullable=False, default=100.0)
    explanation = Column(Text, nullable=False)
    evidence_json = Column(JSON, nullable=True)
    document_id = Column(String(64), nullable=True)
    needs_human = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class DBScore(Base):
    __tablename__ = "scores"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    application_id = Column(String(64), index=True, nullable=False)
    total_earned = Column(Integer, nullable=False)
    max_possible = Column(Integer, nullable=False)
    percentage = Column(Float, nullable=False)
    unverified_weight = Column(Integer, nullable=False, default=0)
    mandatory_gate_status = Column(String(16), nullable=False) # CLEAR, BLOCKED
    blocking_reasons_json = Column(JSON, nullable=True)
    category_breakdown_json = Column(JSON, nullable=True)
    computed_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
