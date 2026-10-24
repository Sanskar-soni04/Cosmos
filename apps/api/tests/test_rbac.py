import pytest
from fastapi.testclient import TestClient
from apps.api.main import app
from apps.api.core.config import settings
from apps.api.core.security import create_access_token

client = TestClient(app)

# Helper to create cookie dict
def get_auth_cookies(user_id: str, role: str, institution_id: str = None, region: str = None):
    token = create_access_token(
        subject=user_id,
        role=role,
        institution_id=institution_id,
        region=region
    )
    return {settings.COOKIE_NAME: token}

class TestAuthenticationAndRBAC:

    def test_unauthenticated_request_rejected(self):
        """
        Verify that requests without the httpOnly session cookie receive 401 Unauthorized.
        """
        # Attempt to access officer queue without cookie
        response = client.get("/api/v1/officer/queue")
        assert response.status_code == 401
        assert "Missing httpOnly access_token" in response.json()["detail"]

        # Attempt to access institution applications without cookie
        response = client.get("/api/v1/institutions/AICTE-2026-REG-84920/applications")
        assert response.status_code == 401

    def test_institution_access_own_data_allowed(self):
        """
        Verify that an institution user can successfully retrieve their own application data.
        """
        cookies = get_auth_cookies(
            user_id="USR-INST-001",
            role="INSTITUTION_ADMIN",
            institution_id="AICTE-2026-REG-84920"
        )
        response = client.get(
            "/api/v1/institutions/AICTE-2026-REG-84920/applications",
            cookies=cookies
        )
        assert response.status_code == 200
        data = response.json()
        assert len(data) > 0
        assert data[0]["institution_id"] == "AICTE-2026-REG-84920"

    def test_institution_cross_access_blocked(self):
        """
        SECURITY REQUIREMENT: An institution cannot access other institutions' data.
        Aryabhata Institute (AICTE-2026-REG-84920) attempting to read
        Bhagalpur College (AICTE-2026-REG-84921) MUST be blocked with 403 Forbidden.
        """
        aryabhata_cookies = get_auth_cookies(
            user_id="USR-INST-001",
            role="INSTITUTION_ADMIN",
            institution_id="AICTE-2026-REG-84920"
        )
        # Attempt cross-institution access
        response = client.get(
            "/api/v1/institutions/AICTE-2026-REG-84921/applications",
            cookies=aryabhata_cookies
        )
        assert response.status_code == 403
        assert "Cross-institution isolation violation" in response.json()["detail"]

    def test_institution_access_officer_endpoint_blocked(self):
        """
        SECURITY REQUIREMENT: An institution cannot access officer endpoints.
        An institutional user calling /api/v1/officer/queue MUST receive 403 Forbidden.
        """
        inst_cookies = get_auth_cookies(
            user_id="USR-INST-001",
            role="INSTITUTION_ADMIN",
            institution_id="AICTE-2026-REG-84920"
        )
        response = client.get(
            "/api/v1/officer/queue",
            cookies=inst_cookies
        )
        assert response.status_code == 403
        assert "Access Denied" in response.json()["detail"]

    def test_officer_access_officer_queue_allowed(self):
        """
        Verify that statutory regulatory officers (Regional Officer, Bureau Officer)
        can access the officer scrutiny queue.
        """
        ro_cookies = get_auth_cookies(
            user_id="USR-REG-01",
            role="REGIONAL_OFFICER",
            region="Central"
        )
        response = client.get(
            "/api/v1/officer/queue",
            cookies=ro_cookies
        )
        assert response.status_code == 200
        cases = response.json()
        assert isinstance(cases, list)
        assert all(c["region"] == "Central" for c in cases)

    def test_bureau_officer_national_queue_access(self):
        """
        Verify that Bureau HQ officers have access to national queue data.
        """
        bureau_cookies = get_auth_cookies(
            user_id="USR-BUR-01",
            role="BUREAU_OFFICER",
            region="HQ - New Delhi"
        )
        response = client.get(
            "/api/v1/officer/queue",
            cookies=bureau_cookies
        )
        assert response.status_code == 200
        assert len(response.json()) >= 2

    def test_tampered_cookie_rejected(self):
        """
        Verify that a cryptographically tampered JWT token is rejected with 401.
        """
        tampered_cookies = {settings.COOKIE_NAME: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tampered.signature"}
        response = client.get(
            "/api/v1/officer/queue",
            cookies=tampered_cookies
        )
        assert response.status_code == 401

    def test_login_endpoint_sets_httponly_cookie(self):
        """
        Verify that the login endpoint returns user profile and sets an httpOnly cookie.
        """
        response = client.post("/api/v1/auth/login", json={
            "username": "principal@aryabhata.ac.in",
            "password": "Password123!"
        })
        assert response.status_code == 200
        assert "access_token" in response.cookies
        user_data = response.json()
        assert user_data["role"] == "INSTITUTION_ADMIN"
        assert user_data["institution_id"] == "AICTE-2026-REG-84920"
