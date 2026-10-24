from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any
from apps.api.core.rbac import Role, AuthenticatedUser, require_role

router = APIRouter(prefix="/officer", tags=["Regulatory Officer Operations"])

OFFICER_ROLES = [
    Role.REGIONAL_OFFICER,
    Role.BUREAU_OFFICER,
    Role.SCRUTINY_OFFICER,
    Role.SYSTEM_ADMIN
]

MOCK_OFFICER_QUEUE = [
    {
        "case_id": "CASE-2026-001",
        "application_id": "1-84920-2026",
        "institution_name": "Aryabhata Institute of Technology & Management",
        "region": "Central",
        "stage": "SCRUTINY",
        "sla_days_remaining": 7,
        "is_at_risk": False,
        "assigned_officer": "Er. Rajeshwar Iyer",
        "findings_summary": {"PASS": 18, "REVIEW_REQUIRED": 1, "FAIL_DEFICIENCY": 0, "MISSING": 0}
    },
    {
        "case_id": "CASE-2026-002",
        "application_id": "1-84921-2026",
        "institution_name": "Bhagalpur College of Engineering & Tech",
        "region": "Eastern",
        "stage": "EVC_QUEUE",
        "sla_days_remaining": 3,
        "is_at_risk": True,
        "assigned_officer": "Dr. Vivek Ranade",
        "findings_summary": {"PASS": 22, "REVIEW_REQUIRED": 0, "FAIL_DEFICIENCY": 0, "MISSING": 0}
    }
]

@router.get("/queue", response_model=List[Dict[str, Any]])
def get_officer_scrutiny_queue(
    user: AuthenticatedUser = Depends(require_role(OFFICER_ROLES))
):
    """
    Returns the regional scrutiny and monitoring queue.
    Strict RBAC: Only authorized statutory officers (Regional, Bureau, Scrutiny, System Admin)
    may access this endpoint. Institutional users receive 403 Forbidden.
    """
    # If regional officer, filter by their region
    if user.role == Role.REGIONAL_OFFICER and user.region:
        return [c for c in MOCK_OFFICER_QUEUE if c["region"] == user.region]
    
    # Bureau HQ and System Admin see national queue
    return MOCK_OFFICER_QUEUE

@router.get("/cases/{application_id}")
def get_case_detail(
    application_id: str,
    user: AuthenticatedUser = Depends(require_role(OFFICER_ROLES))
):
    """
    Returns full statutory case dossier for scrutiny.
    Restricted to authorized officers only.
    """
    for case in MOCK_OFFICER_QUEUE:
        if case["application_id"] == application_id:
            return case
            
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Regulatory case with application ID '{application_id}' not found."
    )
