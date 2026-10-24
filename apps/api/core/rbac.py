from enum import Enum
from typing import List, Optional
from fastapi import Request, HTTPException, status, Depends
from pydantic import BaseModel
from apps.api.core.config import settings
from apps.api.core.security import decode_token

class Role(str, Enum):
    INSTITUTION_ADMIN = "INSTITUTION_ADMIN"
    INSTITUTION_STAFF = "INSTITUTION_STAFF"
    SCRUTINY_OFFICER = "SCRUTINY_OFFICER"
    REGIONAL_OFFICER = "REGIONAL_OFFICER"
    BUREAU_OFFICER = "BUREAU_OFFICER"
    EVC_COORDINATOR = "EVC_COORDINATOR"
    EVC_MEMBER = "EVC_MEMBER"
    SAC_SHC_MEMBER = "SAC_SHC_MEMBER"
    SYSTEM_ADMIN = "SYSTEM_ADMIN"
    AUDITOR = "AUDITOR"

class AuthenticatedUser(BaseModel):
    id: str
    username: str
    role: Role
    institution_id: Optional[str] = None
    region: Optional[str] = None

def get_current_user(request: Request) -> AuthenticatedUser:
    """
    Extracts JWT from httpOnly cookie 'access_token' (Section 2 & 14 specification).
    Falls back to 'Authorization: Bearer' header for automated testing / CLI tools.
    """
    token = request.cookies.get(settings.COOKIE_NAME)
    
    if not token:
        # Check authorization header fallback
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header[7:].strip()
            
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Missing httpOnly access_token session cookie."
        )
        
    try:
        payload = decode_token(token)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or expired authentication session: {str(e)}"
        )
        
    user_id = payload.get("sub")
    role_str = payload.get("role")
    
    if not user_id or not role_str:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Malformed token claims: missing subject or role."
        )
        
    try:
        role_enum = Role(role_str)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Unrecognized security role: {role_str}"
        )
        
    return AuthenticatedUser(
        id=user_id,
        username=user_id,
        role=role_enum,
        institution_id=payload.get("institution_id"),
        region=payload.get("region")
    )

def require_role(allowed_roles: List[Role]):
    """
    Role-Based Access Control (RBAC) Dependency.
    Enforces that the authenticated user possesses one of the allowed statutory roles.
    """
    def role_checker(current_user: AuthenticatedUser = Depends(get_current_user)) -> AuthenticatedUser:
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access Denied: Role '{current_user.role}' is not authorized to access this endpoint. Allowed: {[r.value for r in allowed_roles]}"
            )
        return current_user
    return role_checker

def require_institution_scope(institution_id: str, current_user: AuthenticatedUser = Depends(get_current_user)) -> AuthenticatedUser:
    """
    Attribute-Based Access Control (ABAC) / Row-Level Scoping Dependency.
    Non-Negotiable Principle: Institutions may ONLY access their own institution's records.
    Cross-institution access returns 403 Forbidden.
    """
    # If the user is an institutional user, enforce row-level scoping strictly
    if current_user.role in [Role.INSTITUTION_ADMIN, Role.INSTITUTION_STAFF]:
        if not current_user.institution_id or current_user.institution_id != institution_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access Denied: Cross-institution isolation violation. You are assigned to '{current_user.institution_id}' and cannot access records for '{institution_id}'."
            )
            
    # Statutory officers and system admins can view according to administrative scope
    return current_user
