from fastapi import APIRouter, Response, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from apps.api.core.config import settings
from apps.api.core.security import create_access_token
from apps.api.core.rbac import Role, AuthenticatedUser, get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    username: str
    password: str
    portal_type: Optional[str] = "institution"
    totp_code: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    username: str
    role: str
    institution_id: Optional[str] = None
    region: Optional[str] = None

# Seed demo users database
MOCK_USERS_DB = {
    "principal@aryabhata.ac.in": {
        "id": "USR-INST-001",
        "username": "principal@aryabhata.ac.in",
        "password": "Password123!",
        "role": Role.INSTITUTION_ADMIN,
        "institution_id": "AICTE-2026-REG-84920",
        "region": "Central",
        "name": "Dr. Ramesh Sharma"
    },
    "admin@bhagalpur.edu": {
        "id": "USR-INST-002",
        "username": "admin@bhagalpur.edu",
        "password": "Password123!",
        "role": Role.INSTITUTION_STAFF,
        "institution_id": "AICTE-2026-REG-84921",
        "region": "Eastern",
        "name": "Prof. Ananya Sen"
    },
    "ro.central@aicte-india.org": {
        "id": "USR-REG-01",
        "username": "ro.central@aicte-india.org",
        "password": "Password123!",
        "role": Role.REGIONAL_OFFICER,
        "institution_id": None,
        "region": "Central",
        "name": "Dr. Vivek Ranade",
        "requires_2fa": True
    },
    "bureau.approval@aicte-india.org": {
        "id": "USR-BUR-01",
        "username": "bureau.approval@aicte-india.org",
        "password": "Password123!",
        "role": Role.BUREAU_OFFICER,
        "institution_id": None,
        "region": "HQ - New Delhi",
        "name": "Dr. Sunita Deshmukh",
        "requires_2fa": True
    },
    "scrutiny.cro@aicte-india.org": {
        "id": "USR-SCRUT-01",
        "username": "scrutiny.cro@aicte-india.org",
        "password": "Password123!",
        "role": Role.SCRUTINY_OFFICER,
        "institution_id": None,
        "region": "Central",
        "name": "Er. Rajeshwar Iyer",
        "requires_2fa": True
    },
    "admin.workflow@aicte-india.org": {
        "id": "USR-SYS-01",
        "username": "admin.workflow@aicte-india.org",
        "password": "Password123!",
        "role": Role.SYSTEM_ADMIN,
        "institution_id": None,
        "region": "HQ - New Delhi",
        "name": "Sanjeev Kumar",
        "requires_2fa": True
    }
}

@router.post("/login", response_model=UserResponse)
def login(login_data: LoginRequest, response: Response):
    user = MOCK_USERS_DB.get(login_data.username.lower())
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials. Account not found."
        )
        
    # Check 2FA for officer roles
    if user.get("requires_2fa"):
        if not login_data.totp_code or (login_data.totp_code != "123456" and len(login_data.totp_code) != 6):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="2FA TOTP verification token required for statutory officer accounts."
            )
            
    # Generate JWT
    token = create_access_token(
        subject=user["id"],
        role=user["role"].value,
        institution_id=user["institution_id"],
        region=user["region"]
    )
    
    # Set httpOnly cookie (Section 2 & 14 specification)
    response.set_cookie(
        key=settings.COOKIE_NAME,
        value=token,
        httponly=settings.COOKIE_HTTPONLY,
        secure=settings.COOKIE_SECURE,
        samesite=settings.COOKIE_SAMESITE,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )
    
    return UserResponse(
        id=user["id"],
        username=user["username"],
        role=user["role"].value,
        institution_id=user["institution_id"],
        region=user["region"]
    )

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(key=settings.COOKIE_NAME)
    return {"status": "success", "message": "Logged out successfully. httpOnly cookie cleared."}

@router.get("/me", response_model=UserResponse)
def get_current_user_profile(user: AuthenticatedUser = Depends(get_current_user)):
    return UserResponse(
        id=user.id,
        username=user.username,
        role=user.role.value,
        institution_id=user.institution_id,
        region=user.region
    )
