# AICTE National Regulatory Portal
### Approval Workflow Automation, Institutional Compliance & Multi-Agent Verification System
*Statutory Body Under Ministry of Education, Government of India*

---

## ⚡ Quick Start Guide

The enterprise platform development server is **running live**:

👉 **Open in browser:** [http://localhost:5173/](http://localhost:5173/)

---

## 🔐 Authentication & Role-Based Portals

The application features the **AICTE Single Sign-On (SSO)** login gateway, providing separate, dedicated environments for Institutions and the AICTE Regulatory Directorate.

### Available Login Credentials (or use the one-click quick login buttons on the login card):

| Portal Type | Role | User Name / Permanent Institute ID | Password | Access Scope |
|---|---|---|---|---|
| **🏛️ Institute Portal** | Technical Institution | `INST-PUNE-8492` | `password123` | Aryabhata Institute of Technology (PID: 1-8492001) - Applications, Live Document Vault, Deficiency Cure, Expiry Radar |
| **🛡️ Admin Portal** | AICTE Directorate | `AICTE-OFFICER-01` | `adminpassword` | Dr. Vijay Sharma (Joint Director, Regulation Bureau & WRO) - National Scrutiny Queue, Regional Heatmaps, Policy Rules |
| **⚖️ Committee Portal** | Expert Committee | `COMMITTEE-CHAIR` | `committeepassword` | Prof. Dr. S. K. Mahajan (Senior Scrutiny & EVC Panel Chair) - Multi-Agent Evidence Assessment & Statutory Orders |

---

## 🏛️ 1. Institutional Compliance Portal

When logged in as an institution:
1. **Approval Status & Deterministic Score**:
   - Shows active status (`DEFICIENCY_FLAGGED` initially at **82/100**).
   - **Mandatory Statutory Gate**: Demonstrates that high algorithmic scores (82/100) **cannot override statutory non-compliance** (Fire Safety NOC is expired).
2. **Live Document Vault & Real File Uploader**:
   - Ingests **actual files from your laptop** (`.pdf`, `.png`, `.jpg`).
   - Dynamically computes the **real cryptographic SHA-256 hash** using the browser's Web Crypto API (`crypto.subtle.digest`).
   - Categorizes files by regulatory domain (Legal, Infrastructure, Faculty, Finance, Academic, Regulatory).
3. **Deficiency Resolution & Instant Re-verification**:
   - Displays official deficiency notice `DEF-2026-84920`.
   - Upload your renewed Fire Safety Certificate or click **"Instant Re-validation Demo"**.
   - Watch the score update live to **98/100**, the statutory hold clear, and a new commit get written to the audit log!
4. **+ New Program / Intake Expansion Wizard**:
   - Submit applications for new degrees (e.g. B.Tech Data Science) with custom intake units. Updates the regulatory docket live.

---

## 🛡️ 2. AICTE Directorate & Bureau Admin Portal

When logged in as AICTE Admin or Committee Chair:
1. **Pan-India Executive Dashboard**:
   - Regional pendency matrix across the 5 AICTE regions (WRO, NRO, SRO, CRO, ERO).
   - Stage Ageing SLA breakdown (`<7 days`, `7-15 days`, `>15 days` overdue warnings).
2. **Scrutiny & Application Queue**:
   - Select and evaluate any institution across India.
   - Inspect 6 specialist AI agent extractions, confidence indices, and rule citations.
   - Side-by-side OCR document preview with interactive bounding boxes.
   - Record formal committee observations and endorse applications for EVC inspection.
3. **EVC Panel Deployment & Inspection Scheduler**:
   - Schedule on-site or hybrid audits.
   - Deploy 3 independent, conflict-free panellists (IIT/NIT Professor, Industry Expert, AICTE Convener).
   - Generates digitally signed appointment orders.
4. **Compliance Escalation Engine**:
   - Real-time monitoring of institutional expirations.
   - One-click trigger for automated SMS/Email escalations to Regional Officers.
5. **Cryptographic Append-Only Audit Trail**:
   - Immutable commit ledger with SHA-256 seals, search filters, and expandable diff payloads.
   - One-click **"Export Audit Certificate (PDF)"** for official printable records.
6. **APH Policy Rules & Scoring Configurator**:
   - Tweak scoring weights across the 6 domains.
   - Toggle mandatory statutory gates (Fire NOC, Land Title, Faculty Ratio).

---

## 📋 Comprehensive Production Roadmap (What Else Should Be Added)

For presentation to the committee, here are the mission-critical enterprise modules recommended for full production scale:

1. **National DigiLocker & NAD API Integration**:
   - Direct API handshake with DigiLocker to auto-fetch authentic 10+2 marksheets, faculty degree certificates, and caste/EWS certificates with zero manual uploads.
2. **Aadhaar-Enabled Biometric Attendance (AEBAS) & APAAR Sync**:
   - Live integration with APAAR (Automated Permanent Academic Account Registry) and UIDAI biometrics to eliminate "ghost faculty" and verify genuine 1:15 Cadre ratios.
3. **GIS Satellite Geotagging & Drone Infrastructure Verification**:
   - Integration with ISRO Bhuvan / Google Earth APIs to verify land coordinates, built-up carpet area, and boundary wall footprints against municipal mutation records.
4. **State Fire Services & Municipal API Webhooks**:
   - Real-time webhook integration with state municipal corporations (e.g., Pune PMC, Delhi Fire Service, BBMP) to automatically verify forward validity of Fire Safety NOCs and Building Occupancy Certificates without manual scanning.
5. **Hyperledger Fabric / Enterprise Blockchain Audit Node**:
   - Moving from local SHA-256 hash chaining to a multi-node permissioned consortium blockchain hosted across AICTE HQ, Regional Offices, and Affiliating State Universities.
6. **AI Multi-Modal OCR & Fraud Detection Subsystem**:
   - Integration of PaddleOCR and LayoutLMv3 to detect forged seals, font discrepancies, and digital photo edits on uploaded certificates.
