from enum import Enum
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

class FindingStatus(str, Enum):
    PASS = "PASS"
    REVIEW_REQUIRED = "REVIEW_REQUIRED"
    FAIL_DEFICIENCY = "FAIL_DEFICIENCY"
    MISSING = "MISSING"
    EXTRACTION_ERROR = "EXTRACTION_ERROR"

class MandatoryGateStatus(str, Enum):
    CLEAR = "CLEAR"
    BLOCKED = "BLOCKED"

class RuleDefinition(BaseModel):
    code: str
    category: str
    agent_id: int
    title: str
    weight: int = Field(ge=0, le=100)
    is_mandatory: bool = False
    aph_reference: str
    severity: str = "HIGH"

class FindingRecord(BaseModel):
    rule_code: str
    agent_id: int
    status: FindingStatus
    confidence: float = Field(ge=0.0, le=100.0)
    explanation: str
    evidence: Optional[Dict[str, Any]] = None
    document_id: Optional[str] = None
    needs_human: bool = False

class ScoreComputationResult(BaseModel):
    total_earned: int
    max_possible: int
    percentage: float
    unverified_weight: int
    unverified_items: List[FindingRecord]
    mandatory_gate_status: MandatoryGateStatus
    blocking_reasons: List[str]
    category_breakdown: Dict[str, Dict[str, Any]]
    total_applicable_rules: int
    pass_count: int
    fail_count: int
    review_count: int
    missing_count: int

# Official APH 2024-27 Master Checklist Rules
MASTER_APH_RULES: List[RuleDefinition] = [
    # 1. Legal & Institution (Agent 1)
    RuleDefinition(
        code="RULE-LEG-01",
        category="Legal & Institution",
        agent_id=1,
        title="Land Title Deed & Mutation Certificate",
        weight=20,
        is_mandatory=True,
        aph_reference="APH 2024-27 Clause 2.1 (Land Title & Ownership Criteria)"
    ),
    # 2. Infrastructure & Safety (Agent 2)
    RuleDefinition(
        code="RULE-SAF-01",
        category="Infrastructure & Safety",
        agent_id=2,
        title="Fire Safety Certificate & Municipal NOC",
        weight=15,
        is_mandatory=True,
        aph_reference="APH 2024-27 Clause 4.2 (Mandatory Fire Safety & Life Safety NOC)"
    ),
    RuleDefinition(
        code="RULE-SAF-02",
        category="Infrastructure & Safety",
        agent_id=2,
        title="Building Stability & Occupancy Certificate",
        weight=10,
        is_mandatory=True,
        aph_reference="APH 2024-27 Clause 4.3 (Structural Stability & Built-Up Area)"
    ),
    # 3. Faculty & Staff Cadre (Agent 3)
    RuleDefinition(
        code="RULE-FAC-01",
        category="Faculty & Staff",
        agent_id=3,
        title="Student-to-Faculty Ratio (SFR) & Cadre Norms",
        weight=20,
        is_mandatory=True,
        aph_reference="APH 2024-27 Clause 5.3 (Prescribed Cadre Ratio 1:2:6 & SFR 1:15)"
    ),
    # 4. Finance & Accounts (Agent 4)
    RuleDefinition(
        code="RULE-FIN-01",
        category="Finance & Accounts",
        agent_id=4,
        title="Audited Balance Sheet & Joint FDR Security Deposit",
        weight=15,
        is_mandatory=False,
        aph_reference="APH 2024-27 Clause 3.4 (Financial Viability & Security Deposit)"
    ),
    # 5. Academic & Curricular (Agent 5)
    RuleDefinition(
        code="RULE-ACA-01",
        category="Academic & Courses",
        agent_id=5,
        title="Laboratory Equipment & Library Learning Resources",
        weight=10,
        is_mandatory=False,
        aph_reference="APH 2024-27 Clause 6.1 (Learning Resources & Laboratory Equipment)"
    ),
    # 6. Regulatory & Declarations (Agent 6)
    RuleDefinition(
        code="RULE-REG-01",
        category="Regulatory & Declarations",
        agent_id=6,
        title="Anti-Ragging, ICC & Statutory Grievance Mechanism",
        weight=10,
        is_mandatory=True,
        aph_reference="APH 2024-27 Clause 7.2 (Statutory Committees & Mandatory Affidavits)"
    ),
]

def compute_server_side_score(
    findings: List[FindingRecord],
    rules: Optional[List[RuleDefinition]] = None
) -> ScoreComputationResult:
    """
    Computes statutory compliance score and evaluates mandatory gates strictly on server:
    1. Score = sum(weight * result_factor) over APPLICABLE rules only.
       - PASS = 1.0 (earned full weight)
       - FAIL_DEFICIENCY = 0.0
       - MISSING = 0.0
       - REVIEW_REQUIRED = unverified (excluded from earned points, listed separately, NOT counted as fail)
       - EXTRACTION_ERROR = unverified (excluded from earned points, listed separately, NOT counted as fail)
    2. Mandatory Gate Status:
       - If ANY mandatory rule is != PASS (FAIL, MISSING, REVIEW_REQUIRED, or EXTRACTION_ERROR):
         mandatory_gate_status = BLOCKED
         blocking_reasons lists the exact offending clauses.
       - A high score (e.g. 85/100) NEVER overrides a blocked mandatory gate.
    """
    active_rules = rules or MASTER_APH_RULES
    rules_by_code = {r.code: r for r in active_rules}
    
    total_earned = 0
    max_possible = sum(r.weight for r in active_rules)
    unverified_weight = 0
    unverified_items: List[FindingRecord] = []
    blocking_reasons: List[str] = []
    
    pass_count = 0
    fail_count = 0
    review_count = 0
    missing_count = 0
    
    category_breakdown: Dict[str, Dict[str, Any]] = {}
    
    # Initialize category structures
    for r in active_rules:
        if r.category not in category_breakdown:
            category_breakdown[r.category] = {
                "earned": 0,
                "max": 0,
                "status": "PASS",
                "rules_count": 0
            }
        category_breakdown[r.category]["max"] += r.weight
        category_breakdown[r.category]["rules_count"] += 1

    findings_map = {f.rule_code: f for f in findings}

    for r in active_rules:
        finding = findings_map.get(r.code)
        
        # If no finding exists for an applicable rule, it is classified as MISSING
        if not finding:
            finding = FindingRecord(
                rule_code=r.code,
                agent_id=r.agent_id,
                status=FindingStatus.MISSING,
                confidence=100.0,
                explanation=f"Mandatory requirement '{r.title}' has no document submitted.",
                needs_human=True
            )
            
        status = finding.status
        
        if status == FindingStatus.PASS:
            total_earned += r.weight
            category_breakdown[r.category]["earned"] += r.weight
            pass_count += 1
            
        elif status in (FindingStatus.REVIEW_REQUIRED, FindingStatus.EXTRACTION_ERROR):
            # Excluded from earned score; listed separately as unverified
            unverified_weight += r.weight
            unverified_items.append(finding)
            review_count += 1
            category_breakdown[r.category]["status"] = "REVIEW_REQUIRED"
            
            # Non-Negotiable Principle: AI uncertainty or extraction error on a mandatory rule routes to review & blocks gate
            if r.is_mandatory:
                blocking_reasons.append(
                    f"[UNVERIFIED MANDATORY GATE] {r.title} ({r.code}) requires human review: {finding.explanation}"
                )
                
        elif status in (FindingStatus.FAIL_DEFICIENCY, FindingStatus.MISSING):
            fail_count += 1 if status == FindingStatus.FAIL_DEFICIENCY else 0
            missing_count += 1 if status == FindingStatus.MISSING else 0
            category_breakdown[r.category]["status"] = "DEFICIENCY_FLAGGED"
            
            if r.is_mandatory:
                blocking_reasons.append(
                    f"[MANDATORY GATE BLOCKED] {r.title} ({r.code}): {finding.explanation} ({r.aph_reference})"
                )

    percentage = round((total_earned / max_possible * 100), 1) if max_possible > 0 else 0.0
    gate_status = MandatoryGateStatus.BLOCKED if len(blocking_reasons) > 0 else MandatoryGateStatus.CLEAR

    return ScoreComputationResult(
        total_earned=total_earned,
        max_possible=max_possible,
        percentage=percentage,
        unverified_weight=unverified_weight,
        unverified_items=unverified_items,
        mandatory_gate_status=gate_status,
        blocking_reasons=blocking_reasons,
        category_breakdown=category_breakdown,
        total_applicable_rules=len(active_rules),
        pass_count=pass_count,
        fail_count=fail_count,
        review_count=review_count,
        missing_count=missing_count
    )
