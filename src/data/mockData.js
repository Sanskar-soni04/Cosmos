// Official AICTE Enterprise Regulation Bureau Master Data
// Approval Process Handbook (APH 2026-27) Compliance & Monitoring Standard

export const SPECIALIST_AGENTS = [
  {
    id: 1,
    name: "Agent 1: Legal & Institution",
    scope: "Registration, Land ownership/lease deed, Society constitution & Affiliation",
    docTypes: ["Land Deeds", "Society Byelaws", "Affiliation Letters"],
    status: "PASS",
    confidence: 99.4,
    checksCount: 14,
    icon: "ShieldCheck",
    keyFindings: "Land Title clear (7.8 acres). Registered society valid till 2038. No pending litigation flags.",
    citation: "APH 2026-27 Section 2.1 (Land & Ownership Criteria)"
  },
  {
    id: 2,
    name: "Agent 2: Infrastructure & Safety",
    scope: "Building plans, Fire Safety NOC, Occupancy certificates & Barrier-free access",
    docTypes: ["Fire Safety NOC", "Building Completion", "Occupancy Certificate"],
    status: "FAIL / DEFICIENCY",
    confidence: 98.7,
    checksCount: 18,
    icon: "Flame",
    keyFindings: "Fire Safety Certificate NOC/FS/2023-881 expired on 15-Oct-2026. Lacks forward 6-month validity.",
    citation: "APH 2026-27 Section 4.2 (Mandatory Safety Certifications)"
  },
  {
    id: 3,
    name: "Agent 3: Faculty & Staff Cadre",
    scope: "Qualifications, student-faculty ratio, Pay scale adherence & Aadhaar registry",
    docTypes: ["Faculty Registry", "Pay Bills", "Principal Appointment"],
    status: "PASS",
    confidence: 96.8,
    checksCount: 22,
    icon: "Users",
    keyFindings: "SFR 1:14.2 meets mandatory 1:15 norm. Cadre 1:2:6 verified. 100% faculty Aadhaar verified.",
    citation: "APH 2026-27 Section 5.3 (Cadre Ratio & Faculty Norms)"
  },
  {
    id: 4,
    name: "Agent 4: Finance & Accounts",
    scope: "Audited financial statements, Fixed Deposit Receipts (FDR) & Fee structures",
    docTypes: ["Audited Balance Sheet", "FDR Receipts", "Endowment Fund"],
    status: "PASS",
    confidence: 97.5,
    checksCount: 12,
    icon: "Coins",
    keyFindings: "FDR ₹1.5 Cr pledged jointly with AICTE. Clean audit report with positive operational reserve.",
    citation: "APH 2026-27 Section 3.4 (Financial Viability & Security Deposit)"
  },
  {
    id: 5,
    name: "Agent 5: Academic & Curricular",
    scope: "Sanctioned intake limits, syllabus sync, laboratory apparatus & library volumes",
    docTypes: ["Curriculum Plan", "Library Register", "Lab Equipment List"],
    status: "REVIEW_REQUIRED",
    confidence: 89.2,
    checksCount: 16,
    icon: "BookOpen",
    keyFindings: "New branch AI/ML 60 intake endorsed by University. Library titles count is 380 (short by 70 titles).",
    citation: "APH 2026-27 Section 6.1 (Learning Resources & Laboratory Norms)"
  },
  {
    id: 6,
    name: "Agent 6: Regulatory & Declarations",
    scope: "Anti-ragging affidavits, Grievance Redressal Committee, ICC & Prior approvals",
    docTypes: ["Anti-Ragging Affidavits", "Ombudsman Order", "ICC Notification"],
    status: "PASS",
    confidence: 99.8,
    checksCount: 10,
    icon: "FileCheck",
    keyFindings: "Zero pending anti-ragging complaints. Ombudsman and ICC members published on web portal.",
    citation: "APH 2026-27 Section 7.2 (Statutory Committees & Compliance)"
  }
];

export const INITIAL_GIT_COMMITS = [
  {
    id: "commit-6",
    hash: "e00511a",
    prevHash: "c41188e",
    timestamp: "2026-10-23 15:42 IST",
    actor: "Bureau Officer (Dr. Vijay Sharma)",
    role: "AICTE Regulatory Officer",
    type: "NOTICE_ISSUED",
    stage: "Rules & Scoring Engine",
    message: "Dispatched Deficiency Notice DEF-2026-84920 to Aryabhata Institute",
    details: "Automated alert sent via Email & SMS to Principal & Management. 15-day cure period initiated for Fire Safety NOC renewal.",
    verified: true,
    signature: "GPG-VERIFIED-AICTE-GOV-IN"
  },
  {
    id: "commit-5",
    hash: "a209bc3",
    prevHash: "99e120f",
    timestamp: "2026-10-23 15:30 IST",
    actor: "Deterministic Rules Engine",
    role: "Core Automation Subsystem",
    type: "GATE_ENFORCED",
    stage: "Rules & Scoring Engine",
    message: "Calculated Priority Score: 82/100; Enforced Mandatory Safety Gate",
    details: "Statutory override invoked: Even though aggregate score is 82/100, Fire NOC deficiency enforces DEFICIENCY_FLAGGED status. Stage advancement halted.",
    verified: true,
    signature: "GPG-VERIFIED-AICTE-GOV-IN"
  },
  {
    id: "commit-4",
    hash: "99e120f",
    prevHash: "7b22d14",
    timestamp: "2026-10-23 15:24 IST",
    actor: "Agent-2: Infrastructure & Safety",
    role: "AI Specialist Agent",
    type: "AGENT_FINDING",
    stage: "AI Multi-Agent Verification",
    message: "Flagged DEFICIENCY on DOC-02 (Fire Safety NOC Expiry)",
    details: "OCR extracted date '15/10/2026'. Current date '23/10/2026'. Document is expired. Confidence: 98.7%. Evidence bbox [x:120, y:340, w:210, h:45].",
    verified: true,
    signature: "GPG-VERIFIED-AICTE-GOV-IN"
  },
  {
    id: "commit-3",
    hash: "7b22d14",
    prevHash: "3f89a1c",
    timestamp: "2026-10-23 15:15 IST",
    actor: "AI Verification Orchestrator",
    role: "AI Multi-Agent Master",
    type: "ORCHESTRATION_COMPLETE",
    stage: "AI Multi-Agent Verification",
    message: "Completed parallel document extraction across 6 specialist agents",
    details: "Processed 6 PDF dossiers (142 pages total). Cross-document verification completed in 8.4 seconds. 5 Pass, 1 Review Required, 1 Deficiency.",
    verified: true,
    signature: "GPG-VERIFIED-AICTE-GOV-IN"
  },
  {
    id: "commit-2",
    hash: "3f89a1c",
    prevHash: "10cb99a",
    timestamp: "2026-10-23 14:50 IST",
    actor: "Institution Administrator (AITM Pune)",
    role: "Applicant Institution",
    type: "DOC_UPLOAD",
    stage: "Application Intake",
    message: "Uploaded 6 regulatory dossiers with cryptographic SHA-256 signatures",
    details: "Documents submitted for Extension of Approval (EoA) and 60-seat AI/ML expansion. Checksums registered on blockchain-ready audit ledger.",
    verified: true,
    signature: "GPG-VERIFIED-INST-AITM"
  },
  {
    id: "commit-1",
    hash: "10cb99a",
    prevHash: "0000000",
    timestamp: "2026-10-23 14:30 IST",
    actor: "Approval Workflow Engine",
    role: "Workflow State Machine",
    type: "WORKFLOW_INIT",
    stage: "Application Intake",
    message: "Application AICTE-2026-REG-84920 initialized with route 'Scrutiny + EVC'",
    details: "Application submitted under Approval Process Handbook 2026-27 regulations. Automated tracking registered.",
    verified: true,
    signature: "GPG-VERIFIED-AICTE-GOV-IN"
  }
];

export const REGIONAL_STATISTICS = {
  totalApplications: 1420,
  approved: 985,
  underScrutiny: 240,
  underEVC: 145,
  deficiencyPending: 50,
  avgTurnaroundDays: 8.4,
  regionalBreakdown: [
    { region: "Western (WRO)", total: 340, cleared: 260, pending: 65, overdue: 15, bottleneckStage: "EVC Scheduling" },
    { region: "Northern (NRO)", total: 290, cleared: 195, pending: 78, overdue: 17, bottleneckStage: "Scrutiny Committee" },
    { region: "Southern (SRO)", total: 380, cleared: 295, pending: 70, overdue: 15, bottleneckStage: "AI Document Review" },
    { region: "Central (CRO)", total: 220, cleared: 145, pending: 62, overdue: 13, bottleneckStage: "Deficiency Cure Period" },
    { region: "Eastern (ERO)", total: 190, cleared: 130, pending: 50, overdue: 10, bottleneckStage: "SAC Appellate Hearing" }
  ],
  stageAgeing: [
    { stage: "Intake & OCR Extraction", under7Days: 45, between7And15Days: 8, over15Days: 0 },
    { stage: "AI Multi-Agent Verification", under7Days: 62, between7And15Days: 12, over15Days: 2 },
    { stage: "Scrutiny Committee Review", under7Days: 110, between7And15Days: 38, over15Days: 14 },
    { stage: "EVC Physical / Virtual Visit", under7Days: 40, between7And15Days: 52, over15Days: 24 },
    { stage: "SAC Appellate Hearings", under7Days: 18, between7And15Days: 16, over15Days: 8 }
  ]
};

export const COMPLIANCE_DEADLINES = [
  {
    id: "DEADLINE-01",
    item: "Fire Safety Certificate Renewal (Aryabhata Institute)",
    type: "Deficiency Cure Period",
    dueDate: "2026-11-06",
    daysRemaining: -4,
    status: "OVERDUE_ALERT",
    assignedTo: "Principal & Management, AITM",
    escalationLevel: "Level 2: Regional Director Escalation Triggered",
    mandatory: true
  },
  {
    id: "DEADLINE-02",
    item: "Expert Visiting Committee (EVC) Physical Audit",
    type: "Inspection Schedule",
    dueDate: "2026-11-04",
    daysRemaining: 12,
    status: "UPCOMING",
    assignedTo: "EVC Inspection Panel (Prof. Sen, Dr. Iyer, Er. Joshi)",
    escalationLevel: "Normal",
    mandatory: true
  },
  {
    id: "DEADLINE-03",
    item: "Annual Faculty Cadre Undertaking & Biometric Sync",
    type: "Mandatory Undertaking",
    dueDate: "2026-11-15",
    daysRemaining: 23,
    status: "SAFE",
    assignedTo: "Registrar, AITM",
    escalationLevel: "Normal",
    mandatory: false
  },
  {
    id: "DEADLINE-04",
    item: "30-Year Registered Land Lease Renewal Check",
    type: "Lease Validity",
    dueDate: "2054-08-12",
    daysRemaining: 10150,
    status: "SAFE",
    assignedTo: "Legal Counsel, AITM",
    escalationLevel: "Normal",
    mandatory: true
  }
];
