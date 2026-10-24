import pytest
from fastapi.testclient import TestClient
from apps.api.main import app
from apps.api.core.config import settings
from apps.api.core.security import create_access_token
from apps.api.services.scoring import (
    compute_server_side_score,
    FindingRecord,
    FindingStatus,
    MandatoryGateStatus,
    MASTER_APH_RULES
)

client = TestClient(app)

def get_auth_cookies():
    token = create_access_token(
        subject="USR-INST-001",
        role="INSTITUTION_ADMIN",
        institution_id="AICTE-2026-REG-84920"
    )
    return {settings.COOKIE_NAME: token}

class TestServerSideScoringEngine:

    def test_high_score_cannot_override_missing_or_failed_mandatory_gate(self):
        """
        NON-NEGOTIABLE PRINCIPLE 3:
        A score out of 100 is shown SEPARATELY from application status.
        A high score (e.g. 85/100) can NEVER override a missing or failed mandatory requirement.
        """
        # All rules pass except Fire Safety NOC (RULE-SAF-01, weight 15, is_mandatory=True)
        findings = [
            FindingRecord(rule_code="RULE-LEG-01", agent_id=1, status=FindingStatus.PASS, confidence=99.0, explanation="Valid land title"),
            FindingRecord(rule_code="RULE-SAF-01", agent_id=2, status=FindingStatus.FAIL_DEFICIENCY, confidence=98.0, explanation="Fire NOC expired on 15-Oct-2026"),
            FindingRecord(rule_code="RULE-SAF-02", agent_id=2, status=FindingStatus.PASS, confidence=99.0, explanation="Structure safe"),
            FindingRecord(rule_code="RULE-FAC-01", agent_id=3, status=FindingStatus.PASS, confidence=96.0, explanation="SFR 1:14 meets norm"),
            FindingRecord(rule_code="RULE-FIN-01", agent_id=4, status=FindingStatus.PASS, confidence=97.0, explanation="FDR pledged"),
            FindingRecord(rule_code="RULE-ACA-01", agent_id=5, status=FindingStatus.PASS, confidence=95.0, explanation="Curriculum endorsed"),
            FindingRecord(rule_code="RULE-REG-01", agent_id=6, status=FindingStatus.PASS, confidence=99.0, explanation="Anti-ragging committee active"),
        ]
        
        result = compute_server_side_score(findings)
        
        # Max is 100, earned is 85 (100 - 15 for Fire NOC)
        assert result.total_earned == 85
        assert result.percentage == 85.0
        # Mandatory gate MUST BE BLOCKED despite high score of 85!
        assert result.mandatory_gate_status == MandatoryGateStatus.BLOCKED
        assert len(result.blocking_reasons) == 1
        assert "RULE-SAF-01" in result.blocking_reasons[0]
        assert "Fire Safety" in result.blocking_reasons[0]

    def test_unverified_findings_excluded_from_earned_score_and_listed_separately(self):
        """
        Section 8: REVIEW_REQUIRED and EXTRACTION_ERROR = 'unverified'
        (excluded from earned points and clearly listed, not counted as fail).
        """
        findings = [
            FindingRecord(rule_code="RULE-LEG-01", agent_id=1, status=FindingStatus.PASS, confidence=99.0, explanation="Valid"),
            FindingRecord(rule_code="RULE-SAF-01", agent_id=2, status=FindingStatus.PASS, confidence=98.0, explanation="Valid"),
            FindingRecord(rule_code="RULE-SAF-02", agent_id=2, status=FindingStatus.PASS, confidence=99.0, explanation="Valid"),
            FindingRecord(rule_code="RULE-FAC-01", agent_id=3, status=FindingStatus.PASS, confidence=96.0, explanation="Valid"),
            FindingRecord(rule_code="RULE-FIN-01", agent_id=4, status=FindingStatus.PASS, confidence=97.0, explanation="Valid"),
            # Academic (weight 10) is unverified (REVIEW_REQUIRED)
            FindingRecord(rule_code="RULE-ACA-01", agent_id=5, status=FindingStatus.REVIEW_REQUIRED, confidence=82.0, explanation="Disputed syllabus credits"),
            FindingRecord(rule_code="RULE-REG-01", agent_id=6, status=FindingStatus.PASS, confidence=99.0, explanation="Valid"),
        ]
        
        result = compute_server_side_score(findings)
        
        # Earned points = 90 (Academic 10 pts excluded from earned, but not counted as fail)
        assert result.total_earned == 90
        assert result.fail_count == 0
        assert result.review_count == 1
        assert result.unverified_weight == 10
        assert len(result.unverified_items) == 1
        assert result.unverified_items[0].rule_code == "RULE-ACA-01"
        # Since Academic is not a mandatory gate, gate is CLEAR
        assert result.mandatory_gate_status == MandatoryGateStatus.CLEAR

    def test_all_mandatory_rules_pass_clears_gate(self):
        """
        When all mandatory rules pass, gate status becomes CLEAR.
        """
        findings = [
            FindingRecord(rule_code="RULE-LEG-01", agent_id=1, status=FindingStatus.PASS, confidence=99.0, explanation="Valid"),
            FindingRecord(rule_code="RULE-SAF-01", agent_id=2, status=FindingStatus.PASS, confidence=98.0, explanation="Valid"),
            FindingRecord(rule_code="RULE-SAF-02", agent_id=2, status=FindingStatus.PASS, confidence=99.0, explanation="Valid"),
            FindingRecord(rule_code="RULE-FAC-01", agent_id=3, status=FindingStatus.PASS, confidence=96.0, explanation="Valid"),
            FindingRecord(rule_code="RULE-FIN-01", agent_id=4, status=FindingStatus.PASS, confidence=97.0, explanation="Valid"),
            FindingRecord(rule_code="RULE-ACA-01", agent_id=5, status=FindingStatus.PASS, confidence=95.0, explanation="Valid"),
            FindingRecord(rule_code="RULE-REG-01", agent_id=6, status=FindingStatus.PASS, confidence=99.0, explanation="Valid"),
        ]
        
        result = compute_server_side_score(findings)
        assert result.total_earned == 100
        assert result.percentage == 100.0
        assert result.mandatory_gate_status == MandatoryGateStatus.CLEAR
        assert len(result.blocking_reasons) == 0

    def test_api_database_findings_and_score_endpoints(self):
        """
        Integration test: Verify GET /applications/{id}/findings and /score return DB findings.
        """
        cookies = get_auth_cookies()
        
        # 1. Fetch DB findings
        findings_resp = client.get("/api/v1/applications/1-84920-2026/findings", cookies=cookies)
        assert findings_resp.status_code == 200
        findings_data = findings_resp.json()
        assert len(findings_data) >= 7
        assert any(f["rule_code"] == "RULE-SAF-01" for f in findings_data)
        
        # 2. Fetch computed score from DB findings
        score_resp = client.get("/api/v1/applications/1-84920-2026/score", cookies=cookies)
        assert score_resp.status_code == 200
        score_data = score_resp.json()
        
        # Verify schema
        assert "total_earned" in score_data
        assert "mandatory_gate_status" in score_data
        assert "blocking_reasons" in score_data
        assert "unverified_items" in score_data
        assert "category_breakdown" in score_data
        # Fire safety is failed in seed DB, so gate MUST be BLOCKED
        assert score_data["mandatory_gate_status"] == "BLOCKED"
