from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any
from apps.api.core.rbac import AuthenticatedUser, require_institution_scope

router = APIRouter(prefix="/institutions", tags=["Institutions"])

# Mock institutional applications store
MOCK_APPLICATIONS_DB = {
    "AICTE-2026-REG-84920": [
        {
            "application_id": "1-84920-2026",
            "institution_id": "AICTE-2026-REG-84920",
            "institution_name": "Aryabhata Institute of Technology & Management",
            "academic_year": "2026–2027",
            "application_type": "Extension of Approval (EoA) + Additional Course",
            "current_stage": "SCRUTINY",
            "status": "IN_PROGRESS",
            "score": 88,
            "mandatory_gate": "CLEAR"
        }
    ],
    "AICTE-2026-REG-84921": [
        {
            "application_id": "1-84921-2026",
            "institution_id": "AICTE-2026-REG-84921",
            "institution_name": "Bhagalpur College of Engineering & Tech",
            "academic_year": "2026–2027",
            "application_type": "New Course Intake Increase",
            "current_stage": "EVC_QUEUE",
            "status": "IN_PROGRESS",
            "score": 92,
            "mandatory_gate": "CLEAR"
        }
    ]
}

@router.get("/{institution_id}/applications", response_model=List[Dict[str, Any]])
def get_institution_applications(
    institution_id: str,
    user: AuthenticatedUser = Depends(require_institution_scope)
):
    """
    Returns application records for the specified institution.
    Non-Negotiable Principle: Institutions access ONLY their own records.
    Cross-institution requests by institutional users are blocked with 403 Forbidden.
    """
    apps = MOCK_APPLICATIONS_DB.get(institution_id)
    if apps is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Institution with ID '{institution_id}' not found."
        )
    return apps

@router.get("/{institution_id}/profile")
def get_institution_profile(
    institution_id: str,
    user: AuthenticatedUser = Depends(require_institution_scope)
):
    """
    Returns profile information for the specified institution.
    """
    if institution_id not in MOCK_APPLICATIONS_DB:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Institution with ID '{institution_id}' not found."
        )
    return {
        "institution_id": institution_id,
        "name": MOCK_APPLICATIONS_DB[institution_id][0]["institution_name"],
        "region": "Central" if institution_id.endswith("84920") else "Eastern",
        "status": "APPROVED",
        "jurisdiction": "Autonomous State Directorate"
    }
