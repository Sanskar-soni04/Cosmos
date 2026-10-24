from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from apps.api.db.database import get_db, Base, engine
from apps.api.models.entities import DBFinding, DBScore
from apps.api.services.scoring import (
    compute_server_side_score,
    FindingRecord,
    FindingStatus,
    ScoreComputationResult,
    MASTER_APH_RULES
)
from apps.api.core.rbac import AuthenticatedUser, get_current_user

# Create tables if not exist
Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/applications", tags=["Applications & Verification Findings"])

# Seed initial findings for Aryabhata Institute (Application 1-84920-2026) in the database
def ensure_seed_findings(db: Session, application_id: str):
    existing = db.query(DBFinding).filter(DBFinding.application_id == application_id).first()
    if existing:
        return

    # Seed findings: Note that Fire Safety NOC has expired, triggering a mandatory gate block!
    seed_data = [
        DBFinding(
            application_id=application_id,
            rule_code="RULE-LEG-01",
            agent_id=1,
            status=FindingStatus.PASS.value,
            confidence=99.4,
            explanation="Registered clear title for 7.8 acres (meets mega-city norms). Registered under Societies Reg Act 1860.",
            evidence_json={"document_id": "DOC-01", "page": 2, "bbox": [100, 200, 300, 50], "quoted_value": "Clear Title: 7.80 Acres"},
            document_id="DOC-01",
            needs_human=False
        ),
        DBFinding(
            application_id=application_id,
            rule_code="RULE-SAF-01",
            agent_id=2,
            status=FindingStatus.FAIL_DEFICIENCY.value,
            confidence=98.7,
            explanation="Fire Safety Certificate (NOC/FS/2023-881) expired on 15-Oct-2026. Lacks minimum 6 months forward validity.",
            evidence_json={"document_id": "DOC-02", "page": 1, "bbox": [120, 340, 210, 45], "quoted_value": "Valid Until: 15/10/2026"},
            document_id="DOC-02",
            needs_human=False
        ),
        DBFinding(
            application_id=application_id,
            rule_code="RULE-SAF-02",
            agent_id=2,
            status=FindingStatus.PASS.value,
            confidence=99.1,
            explanation="Building Stability and Occupancy Certificate valid and sealed by Municipal Chief Engineer.",
            evidence_json={"document_id": "DOC-03", "page": 1, "bbox": [50, 100, 400, 30], "quoted_value": "Structure Safe & Occupancy Granted"},
            document_id="DOC-03",
            needs_human=False
        ),
        DBFinding(
            application_id=application_id,
            rule_code="RULE-FAC-01",
            agent_id=3,
            status=FindingStatus.PASS.value,
            confidence=96.8,
            explanation="Student-to-Faculty Ratio is 1:14.2 (meets prescribed 1:15 standard). Cadre ratio 1:2:6 verified.",
            evidence_json={"document_id": "DOC-04", "page": 4, "bbox": [80, 150, 350, 60], "quoted_value": "SFR: 1:14.2; Verified Cadre 1:2:6"},
            document_id="DOC-04",
            needs_human=False
        ),
        DBFinding(
            application_id=application_id,
            rule_code="RULE-FIN-01",
            agent_id=4,
            status=FindingStatus.PASS.value,
            confidence=97.5,
            explanation="Joint FDR of Rs. 1.5 Cr pledged with AICTE. Audited balance sheet indicates positive reserve surplus.",
            evidence_json={"document_id": "DOC-05", "page": 2, "bbox": [150, 250, 280, 40], "quoted_value": "FDR Fixed Deposit Rs 1,50,00,000"},
            document_id="DOC-05",
            needs_human=False
        ),
        DBFinding(
            application_id=application_id,
            rule_code="RULE-ACA-01",
            agent_id=5,
            status=FindingStatus.REVIEW_REQUIRED.value,
            confidence=88.5,
            explanation="AI/ML 60-seat expansion curriculum verified. Library title count is 380 (short by 20 titles of recommended 400 titles). Routes to human review.",
            evidence_json={"document_id": "DOC-06", "page": 3, "bbox": [90, 310, 320, 50], "quoted_value": "Titles: 380, Required: 400"},
            document_id="DOC-06",
            needs_human=True
        ),
        DBFinding(
            application_id=application_id,
            rule_code="RULE-REG-01",
            agent_id=6,
            status=FindingStatus.PASS.value,
            confidence=99.8,
            explanation="Anti-Ragging undertakings, Internal Complaints Committee (ICC), and Student Grievance Redressal established.",
            evidence_json={"document_id": "DOC-07", "page": 1, "bbox": [70, 90, 380, 40], "quoted_value": "ICC & Anti-Ragging Committees Notified"},
            document_id="DOC-07",
            needs_human=False
        )
    ]
    for f in seed_data:
        db.add(f)
    db.commit()

@router.get("/{application_id}/findings", response_model=List[Dict[str, Any]])
def get_application_findings(
    application_id: str,
    db: Session = Depends(get_db),
    user: AuthenticatedUser = Depends(get_current_user)
):
    """
    Returns single source of truth findings stored in the database.
    """
    ensure_seed_findings(db, application_id)
    findings = db.query(DBFinding).filter(DBFinding.application_id == application_id).all()
    
    return [
        {
            "id": f.id,
            "application_id": f.application_id,
            "rule_code": f.rule_code,
            "agent_id": f.agent_id,
            "status": f.status,
            "confidence": f.confidence,
            "explanation": f.explanation,
            "evidence": f.evidence_json,
            "document_id": f.document_id,
            "needs_human": f.needs_human
        }
        for f in findings
    ]

@router.get("/{application_id}/score", response_model=ScoreComputationResult)
def get_computed_application_score(
    application_id: str,
    db: Session = Depends(get_db),
    user: AuthenticatedUser = Depends(get_current_user)
):
    """
    Computes score and mandatory gate status dynamically on the server:
    - PASS = full weight earned
    - FAIL / MISSING = 0
    - REVIEW_REQUIRED / EXTRACTION_ERROR = unverified, listed separately, NOT counted as fail
    - If ANY mandatory rule is != PASS => gate BLOCKED.
    - Score is shown separately from gate status.
    """
    ensure_seed_findings(db, application_id)
    db_findings = db.query(DBFinding).filter(DBFinding.application_id == application_id).all()
    
    finding_records = [
        FindingRecord(
            rule_code=f.rule_code,
            agent_id=f.agent_id,
            status=FindingStatus(f.status),
            confidence=f.confidence,
            explanation=f.explanation,
            evidence=f.evidence_json,
            document_id=f.document_id,
            needs_human=f.needs_human
        )
        for f in db_findings
    ]
    
    score_result = compute_server_side_score(finding_records)
    
    # Store or update in DB scores table
    db_score = db.query(DBScore).filter(DBScore.application_id == application_id).first()
    if not db_score:
        db_score = DBScore(
            application_id=application_id,
            total_earned=score_result.total_earned,
            max_possible=score_result.max_possible,
            percentage=score_result.percentage,
            unverified_weight=score_result.unverified_weight,
            mandatory_gate_status=score_result.mandatory_gate_status.value,
            blocking_reasons_json=score_result.blocking_reasons,
            category_breakdown_json=score_result.category_breakdown
        )
        db.add(db_score)
    else:
        db_score.total_earned = score_result.total_earned
        db_score.max_possible = score_result.max_possible
        db_score.percentage = score_result.percentage
        db_score.unverified_weight = score_result.unverified_weight
        db_score.mandatory_gate_status = score_result.mandatory_gate_status.value
        db_score.blocking_reasons_json = score_result.blocking_reasons
        db_score.category_breakdown_json = score_result.category_breakdown
    db.commit()
    
    return score_result
