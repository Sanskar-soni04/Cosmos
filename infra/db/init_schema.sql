-- ==============================================================================
-- AICTE Approval Workflow Automation, Compliance Monitoring & Alert Platform
-- Production PostgreSQL 15 Database Schema (APH 2024-27 Reference)
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Administrative Regions & Jurisdiction
CREATE TABLE IF NOT EXISTS regions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(32) UNIQUE NOT NULL, -- e.g. WRO, NRO, SWRO, SRO, CRO, ERO, NWRO, NERO, HQ
    name VARCHAR(128) NOT NULL,
    office_city VARCHAR(64) NOT NULL,
    jurisdiction_states TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. User & RBAC Subsystem
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(64) UNIQUE NOT NULL, -- INSTITUTION_ADMIN, REGIONAL_OFFICER, BUREAU_OFFICER, SCRUTINY_OFFICER, EVC_MEMBER, SAC_SHC_MEMBER, SYSTEM_ADMIN, AUDITOR
    name VARCHAR(128) NOT NULL,
    portal VARCHAR(64) NOT NULL, -- institution, officer, evc, committee, admin, public
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(64) UNIQUE NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    full_name VARCHAR(128) NOT NULL,
    designation VARCHAR(128),
    region_id UUID REFERENCES regions(id),
    institution_id UUID, -- For institution staff
    phone_number VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    totp_secret VARCHAR(64),
    totp_enabled BOOLEAN DEFAULT FALSE,
    failed_login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id)
);

-- 3. Institutions & Regulatory Master
CREATE TABLE IF NOT EXISTS institutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    permanent_id VARCHAR(32) UNIQUE NOT NULL, -- AICTE Permanent Institute ID (PID), e.g. 1-8492001
    name VARCHAR(256) NOT NULL,
    institution_type VARCHAR(64) NOT NULL, -- Private-Self Financing, State University, Govt Polytechnic, Autonomous
    state VARCHAR(64) NOT NULL,
    district VARCHAR(64) NOT NULL,
    address TEXT NOT NULL,
    region_id UUID REFERENCES regions(id),
    principal_name VARCHAR(128),
    contact_email VARCHAR(128),
    land_area_acres NUMERIC(6, 2),
    status VARCHAR(32) DEFAULT 'ACTIVE', -- ACTIVE, DEFICIENCY_HOLD, CLOSED, REJECTED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key constraint to users after institutions table creation
ALTER TABLE users ADD CONSTRAINT fk_users_institution FOREIGN KEY (institution_id) REFERENCES institutions(id);

-- 4. Workflow Routes & Dynamic State Machine (APH 2024-27)
CREATE TABLE IF NOT EXISTS workflow_routes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(64) UNIQUE NOT NULL, -- ONLY_SCRUTINY, SCRUTINY_EVC, EVC_SAC_SHC, ONLY_EVC
    name VARCHAR(128) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    current_version INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS workflow_route_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_id UUID REFERENCES workflow_routes(id),
    version_number INT NOT NULL,
    definition JSONB NOT NULL, -- Array of stages and order
    aph_edition VARCHAR(32) DEFAULT 'APH 2024-27',
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (route_id, version_number)
);

CREATE TABLE IF NOT EXISTS workflow_stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(64) UNIQUE NOT NULL, -- SUBMITTED, AI_VERIFICATION, SCRUTINY, DEFICIENCY_RETURNED, RESCRUTINY, EVC_QUEUE, EVC_SCHEDULED, EVC_COMPLETED, SAC_SHC_HEARING, DECISION_PENDING, APPROVED, REJECTED
    name VARCHAR(128) NOT NULL,
    description TEXT,
    default_sla_days INT DEFAULT 7
);

CREATE TABLE IF NOT EXISTS stage_transitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_version_id UUID REFERENCES workflow_route_versions(id),
    from_stage_id UUID REFERENCES workflow_stages(id),
    to_stage_id UUID REFERENCES workflow_stages(id),
    allowed_roles JSONB NOT NULL, -- Array of role codes permitted
    entry_conditions JSONB, -- JSON conditions e.g. {"no_open_deficiencies": true, "mandatory_gate": "PASSED"}
    requires_reason BOOLEAN DEFAULT FALSE,
    sla_days INT DEFAULT 5
);

-- 5. Applications (Regulatory Dockets)
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id VARCHAR(64) UNIQUE NOT NULL, -- Human-readable, e.g. AICTE-2026-REG-84920
    institution_id UUID REFERENCES institutions(id) NOT NULL,
    academic_year VARCHAR(16) DEFAULT '2026-27',
    application_type VARCHAR(64) NOT NULL, -- new_institute, extension_of_approval, new_course, intake_increase, etc.
    route_id UUID REFERENCES workflow_routes(id) NOT NULL,
    route_version_id UUID REFERENCES workflow_route_versions(id) NOT NULL, -- Pinned route version
    current_stage_id UUID REFERENCES workflow_stages(id) NOT NULL,
    status VARCHAR(64) DEFAULT 'SUBMITTED',
    compliance_score INT DEFAULT 0,
    mandatory_gate_status VARCHAR(32) DEFAULT 'PENDING', -- PASSED, BLOCKED
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    region_id UUID REFERENCES regions(id),
    assigned_officer_id UUID REFERENCES users(id),
    total_intake INT DEFAULT 0,
    optimistic_lock_version INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS application_stage_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    from_stage_id UUID REFERENCES workflow_stages(id),
    to_stage_id UUID REFERENCES workflow_stages(id),
    actor_id UUID REFERENCES users(id),
    reason TEXT,
    entered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    exited_at TIMESTAMP WITH TIME ZONE
);

-- 6. Documents & Ingestion Vault
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    category VARCHAR(64) NOT NULL, -- Legal & Institution, Infrastructure & Safety, Faculty, Finance, Academic, Regulatory
    doc_type VARCHAR(128) NOT NULL,
    is_mandatory BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS document_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    version_no INT NOT NULL,
    storage_key VARCHAR(512) NOT NULL, -- MinIO S3 object key
    sha256 VARCHAR(64) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    mime_type VARCHAR(64) NOT NULL,
    original_filename VARCHAR(256) NOT NULL,
    uploader_id UUID REFERENCES users(id),
    upload_reason TEXT,
    ocr_status VARCHAR(32) DEFAULT 'PENDING', -- PENDING, COMPLETED, EXTRACTION_ERROR
    supersedes_version_id UUID REFERENCES document_versions(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ocr_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_version_id UUID REFERENCES document_versions(id) ON DELETE CASCADE,
    page_no INT NOT NULL,
    extracted_text TEXT,
    bounding_boxes JSONB,
    confidence_score NUMERIC(5, 2),
    ocr_engine VARCHAR(64) DEFAULT 'paddleocr',
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Deterministic Rules & Multi-Agent Findings
CREATE TABLE IF NOT EXISTS rule_sets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    version_tag VARCHAR(32) UNIQUE NOT NULL, -- e.g. APH-2024-27-V1.0
    effective_from DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rule_set_id UUID REFERENCES rule_sets(id),
    code VARCHAR(64) NOT NULL, -- e.g. R-INFRA-FIRE-01, R-FACULTY-SFR-01
    title VARCHAR(256) NOT NULL,
    category VARCHAR(64) NOT NULL,
    agent_id INT NOT NULL, -- 1 to 6 specialist agents
    check_type VARCHAR(32) NOT NULL, -- deterministic, ai_assisted, manual
    weight INT DEFAULT 10,
    is_mandatory BOOLEAN DEFAULT FALSE,
    parameters JSONB,
    aph_reference VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (rule_set_id, code)
);

CREATE TABLE IF NOT EXISTS verification_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    rule_set_id UUID REFERENCES rule_sets(id),
    trigger_type VARCHAR(32) DEFAULT 'ON_UPLOAD',
    model_version VARCHAR(64),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS findings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    run_id UUID REFERENCES verification_runs(id) ON DELETE CASCADE,
    rule_id UUID REFERENCES rules(id),
    agent_id INT NOT NULL,
    status VARCHAR(32) NOT NULL, -- PASS, REVIEW_REQUIRED, FAIL_DEFICIENCY, MISSING, EXTRACTION_ERROR
    confidence NUMERIC(5, 2),
    explanation TEXT,
    evidence JSONB, -- document_version_id, page, bbox, quoted_value
    needs_human_review BOOLEAN DEFAULT FALSE,
    resolved_by UUID REFERENCES users(id),
    resolution_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Deficiencies & Correction Loop
CREATE TABLE IF NOT EXISTS deficiencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    finding_id UUID REFERENCES findings(id),
    raised_by UUID REFERENCES users(id),
    reason TEXT NOT NULL,
    required_correction TEXT NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(32) DEFAULT 'OPEN', -- OPEN, CORRECTED, VERIFIED_CLOSED
    correction_document_version_id UUID REFERENCES document_versions(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. EVC Queue & Inspection Console
CREATE TABLE IF NOT EXISTS evc_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    status VARCHAR(32) DEFAULT 'QUEUED', -- QUEUED, SCHEDULED, COMPLETED, DELAYED
    scheduled_date DATE,
    inspection_mode VARCHAR(32) DEFAULT 'PHYSICAL', -- PHYSICAL, ONLINE, HYBRID
    sla_due_date DATE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    report_document_id UUID REFERENCES documents(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS evc_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    evc_case_id UUID REFERENCES evc_cases(id) ON DELETE CASCADE,
    member_user_id UUID REFERENCES users(id),
    panel_role VARCHAR(64) NOT NULL, -- Academic Expert, Industry Expert, Regional Convener
    status VARCHAR(32) DEFAULT 'ACCEPTED', -- PROPOSED, ACCEPTED, DECLINED, REPLACED
    conflict_of_interest_cleared BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Compliance Register: Validity & Undertakings
CREATE TABLE IF NOT EXISTS validity_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
    item_type VARCHAR(64) NOT NULL, -- fire_safety, land_lease, building_stability, occupancy
    source_document_version_id UUID REFERENCES document_versions(id),
    issue_date DATE,
    expiry_date DATE NOT NULL,
    status VARCHAR(32) DEFAULT 'VALID', -- VALID, EXPIRING_90, EXPIRING_30, EXPIRED, RENEWED
    extracted_by VARCHAR(32) DEFAULT 'OCR',
    confidence NUMERIC(5, 2),
    renewal_document_version_id UUID REFERENCES document_versions(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS undertakings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    condition_text TEXT NOT NULL,
    source VARCHAR(64) DEFAULT 'APPROVAL_LETTER',
    due_date DATE NOT NULL,
    status VARCHAR(32) DEFAULT 'PENDING', -- PENDING, SUBMITTED, VERIFIED, OVERDUE, WAIVED
    evidence_document_version_id UUID REFERENCES document_versions(id),
    verified_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Multi-Level Escalations & Notifications
CREATE TABLE IF NOT EXISTS notification_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trigger_type VARCHAR(64) NOT NULL, -- validity_expiry, undertaking_due, evc_sla, deficiency_due
    offset_days INT NOT NULL, -- -90, -60, -30, -7, 0, +3
    channel VARCHAR(32) NOT NULL, -- IN_APP, EMAIL, SMS, WHATSAPP
    recipient_role VARCHAR(64) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dedupe_key VARCHAR(128) UNIQUE NOT NULL,
    recipient_user_id UUID REFERENCES users(id),
    channel VARCHAR(32) NOT NULL,
    subject VARCHAR(256) NOT NULL,
    message TEXT NOT NULL,
    delivery_status VARCHAR(32) DEFAULT 'SENT', -- QUEUED, SENT, DELIVERED, ACKNOWLEDGED, FAILED
    scheduled_for TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    sent_at TIMESTAMP WITH TIME ZONE,
    acknowledged_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS escalation_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_type VARCHAR(64) NOT NULL, -- DEFICIENCY, VALIDITY, UNDERTAKING, EVC_SLA
    subject_id UUID NOT NULL,
    level INT NOT NULL, -- 1, 2, 3
    role_escalated_to VARCHAR(64) NOT NULL,
    triggered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- 12. GitHub-Inspired Immutable Audit Trail (Hash-Chain Ledger)
CREATE TABLE IF NOT EXISTS audit_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sequence_no BIGSERIAL UNIQUE NOT NULL,
    application_id UUID REFERENCES applications(id),
    institution_id UUID REFERENCES institutions(id),
    event_type VARCHAR(64) NOT NULL, -- APPLICATION_SUBMITTED, DOC_UPLOAD, FINDING_RECORDED, GATE_ENFORCED, DEFICIENCY_RAISED, EVC_SCHEDULED, AUDIT_VERIFIED
    actor_type VARCHAR(32) NOT NULL, -- USER, AI_AGENT, RULES_ENGINE, SYSTEM
    actor_id UUID REFERENCES users(id),
    actor_name VARCHAR(128) NOT NULL,
    actor_role VARCHAR(64) NOT NULL,
    occurred_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    payload JSONB NOT NULL,
    document_version_id UUID REFERENCES document_versions(id),
    file_sha256 VARCHAR(64),
    prev_hash VARCHAR(64) NOT NULL,
    event_hash VARCHAR(64) NOT NULL -- SHA-256(canonical(payload) + prev_hash)
);

-- Enforce Immutability Trigger: Revoke UPDATE and DELETE
CREATE OR REPLACE FUNCTION prevent_audit_tampering()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'Audit Trail is append-only and cryptographically sealed. UPDATE or DELETE operations are strictly forbidden.';
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_audit_tampering ON audit_events;
CREATE TRIGGER trg_audit_tampering
BEFORE UPDATE OR DELETE ON audit_events
FOR EACH ROW EXECUTE FUNCTION prevent_audit_tampering();

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_applications_institution ON applications(institution_id);
CREATE INDEX IF NOT EXISTS idx_applications_stage ON applications(current_stage_id);
CREATE INDEX IF NOT EXISTS idx_audit_events_app ON audit_events(application_id);
CREATE INDEX IF NOT EXISTS idx_audit_events_seq ON audit_events(sequence_no);
CREATE INDEX IF NOT EXISTS idx_validity_expiry ON validity_items(expiry_date);
CREATE INDEX IF NOT EXISTS idx_undertakings_due ON undertakings(due_date);
