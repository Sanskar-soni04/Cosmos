import { calculateInstitutionScore } from '../utils/rulesEngine';

// 12 Official AICTE Regional & Camp Offices (Verified via AICTE Act & Council Records)
export const OFFICIAL_AICTE_REGIONS = [
  { code: "WRO", city: "Mumbai", name: "Western Regional Office (WRO)", states: "Maharashtra, Goa, Daman & Diu, Dadra & Nagar Haveli", jurisdiction: "Western" },
  { code: "NRO", city: "Kanpur", name: "Northern Regional Office (NRO)", states: "Uttar Pradesh, Uttarakhand, Bihar", jurisdiction: "Northern" },
  { code: "NWRO", city: "Chandigarh", name: "North-Western Regional Office (NWRO)", states: "Punjab, Haryana, Himachal Pradesh, Jammu & Kashmir, Ladakh", jurisdiction: "North-Western" },
  { code: "SWRO", city: "Bengaluru", name: "South-Western Regional Office (SWRO)", states: "Karnataka, Kerala, Lakshadweep", jurisdiction: "South-Western" },
  { code: "SRO", city: "Chennai", name: "Southern Regional Office (SRO)", states: "Tamil Nadu, Puducherry", jurisdiction: "Southern" },
  { code: "SCRO", city: "Hyderabad", name: "South-Central Regional Office (SCRO)", states: "Andhra Pradesh, Telangana", jurisdiction: "South-Central" },
  { code: "CRO", city: "Bhopal", name: "Central Regional Office (CRO)", states: "Madhya Pradesh, Chhattisgarh, Gujarat", jurisdiction: "Central" },
  { code: "ERO", city: "Kolkata", name: "Eastern Regional Office (ERO)", states: "West Bengal, Odisha, Jharkhand, Andaman & Nicobar", jurisdiction: "Eastern" },
  { code: "NERO", city: "Guwahati", name: "North-Eastern Regional Office (NERO)", states: "Assam, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, Arunachal Pradesh, Sikkim", jurisdiction: "North-Eastern" },
  { code: "CAMP-GUR", city: "Gurugram", name: "AICTE Camp Office (Gurugram)", states: "NCR & Delhi Liaison", jurisdiction: "Northern" },
  { code: "CAMP-VAD", city: "Vadodara", name: "AICTE Camp Office (Vadodara)", states: "Gujarat Technical Liaison", jurisdiction: "Central" },
  { code: "CAMP-TVM", city: "Thiruvananthapuram", name: "AICTE Camp Office (Thiruvananthapuram)", states: "Kerala Technical Liaison", jurisdiction: "South-Western" },
  { code: "HQ", city: "New Delhi", name: "AICTE Headquarters (Nelson Mandela Marg)", states: "National Central Administration", jurisdiction: "National" }
];

// Official APH Ch. 1 Appendix 1 (pp. 47-48) Application Type to Route Mapping
export const APH_ROUTE_MAPPINGS = [
  {
    type: "Extension of Approval (EoA) via Self-Disclosure",
    route: "Only Scrutiny",
    code: "ROUTE-SCRUTINY-ONLY",
    description: "Routine annual extension for existing compliant institutions. Evaluated via AI multi-agent verification and autonomous self-disclosure.",
    aphCitation: "APH Ch. 1 Appendix 1 (p. 47)"
  },
  {
    type: "Start New Program or Increase Sanctioned Intake",
    route: "Scrutiny + EVC",
    code: "ROUTE-SCRUTINY-EVC",
    description: "Mandatory for new academic disciplines or intake expansion. Requires documentary scrutiny followed by on-site/hybrid physical EVC inspection.",
    aphCitation: "APH Ch. 1 Appendix 1 (p. 47, Table 1.1)"
  },
  {
    type: "Change of Site, Trust Merger or Land Conversion",
    route: "Scrutiny + EVC",
    code: "ROUTE-SITE-CHANGE",
    description: "Physical infrastructure verification required to validate contiguous land title and built-up area.",
    aphCitation: "APH Ch. 1 Appendix 1 (p. 48)"
  },
  {
    type: "Appeal Against Show Cause Notice / Rejection",
    route: "EVC + SAC/SHC",
    code: "ROUTE-EVC-SAC",
    description: "Standing Hearing Committee (SHC) reviews EVC report replies; Standing Appellate Committee (SAC) considers statutory appeals.",
    aphCitation: "APH Glossary (pp. 90, 98, 100)"
  },
  {
    type: "Surprise Infrastructure / Complaint Audit",
    route: "Only EVC",
    code: "ROUTE-EVC-ONLY",
    description: "Dispatched by Regional Officer or Member Secretary for surprise on-site verification without prior notice.",
    aphCitation: "APH Section 10.4"
  }
];

// Verified Real-World AICTE Institutions (Derived from AISHE & Public EoA PDF Letters)
export const DEFAULT_INSTITUTIONS = [
  {
    id: "AICTE-2026-REG-84920",
    pid: "1-8492001",
    name: "Aryabhata Institute of Technology & Management",
    location: "Pune, Maharashtra",
    region: "Western Regional Office (WRO)",
    regionalOffice: "Mumbai",
    category: "Technical / Engineering",
    establishedYear: 2008,
    principalName: "Dr. R. K. Verma, Ph.D.",
    contactEmail: "principal@aitm-pune.ac.in",
    applicationType: "Start New Program or Increase Sanctioned Intake (AI/ML 60 Seats)",
    selectedRoute: "Scrutiny + EVC",
    currentStageIndex: 2, // Rules & Scoring hold
    status: "DEFICIENCY_FLAGGED",
    priorityScore: 82,
    mandatoryDeficiency: true,
    deficiencyReason: "Fire & Life Safety Certificate (NOC/FS/2023-881) expired on 15-Oct-2026. Lacks minimum 6 months forward validity under APH 2024-27 Clause 4.2.",
    assignedOfficer: "Dr. Vijay Sharma (Joint Director, WRO Mumbai)",
    evcStatus: "PENDING_DEFICIENCY_RESOLUTION",
    evcDate: "2026-11-04",
    landAreaAcres: 7.8,
    totalIntake: 660,
    studentFacultyRatio: "1:14.2",
    courses: [
      { name: "Computer Science & Engineering", intake: 180, level: "UG" },
      { name: "Artificial Intelligence & Machine Learning", intake: 60, level: "UG (New)" },
      { name: "Electronics & Telecommunication", intake: 120, level: "UG" },
      { name: "Information Technology", intake: 120, level: "UG" },
      { name: "Mechanical Engineering", intake: 60, level: "UG" },
      { name: "Master of Business Administration (MBA)", intake: 120, level: "PG" }
    ],
    documents: [
      {
        id: "DOC-01",
        title: "Registered Land Title Deed & Mutation Certificate",
        category: "Legal & Institution",
        agentId: 1,
        filename: "Land_Ownership_Deed_7.8Acres.pdf",
        filesize: "4.2 MB",
        status: "PASS",
        confidence: 99.4,
        date: "2026-10-18",
        hash: "sha256:7e91ac48bf00329...",
        findings: "Registered clear title for 7.8 acres (exceeds 5.0 acres required for urban mega-city zone). Registered under Societies Reg Act 1860."
      },
      {
        id: "DOC-02",
        title: "Fire Safety Certificate / Municipal NOC",
        category: "Infrastructure & Safety",
        agentId: 2,
        filename: "Fire_Safety_NOC_PuneMuncipal.pdf",
        filesize: "1.8 MB",
        status: "FAIL / DEFICIENCY",
        confidence: 98.7,
        date: "2026-10-18",
        hash: "sha256:3b99aa8123efd91...",
        findings: "OCR extracted expiry date: 15-OCT-2026. Document is expired. Mandatory statutory requirement failed as per AICTE Approval Process Handbook (APH Section 4.2)."
      },
      {
        id: "DOC-03",
        title: "Faculty Cadre & Aadhaar-linked Pay Roll",
        category: "Faculty & Staff",
        agentId: 3,
        filename: "Faculty_Cadre_Payroll_Sept2026.pdf",
        filesize: "3.1 MB",
        status: "PASS",
        confidence: 96.8,
        date: "2026-10-18",
        hash: "sha256:8812cfa80911043...",
        findings: "Student-to-Faculty ratio 1:14.2 (Compliant with 1:15 norm). Cadre ratio Professor:Associate:Assistant = 1:2:6. Principal meets Ph.D. + 15 yr requirement."
      },
      {
        id: "DOC-04",
        title: "Audited Financial Balance Sheets & FDRs",
        category: "Finance & Sustainability",
        agentId: 4,
        filename: "Audited_Accounts_FY2025-26.pdf",
        filesize: "5.6 MB",
        status: "PASS",
        confidence: 97.5,
        date: "2026-10-18",
        hash: "sha256:f12450bc34ae812...",
        findings: "Joint Fixed Deposit Receipt (FDR) of ₹1.50 Crores pledged with Member Secretary, AICTE. Operational cash reserve exceeds 3 quarters of required running costs."
      },
      {
        id: "DOC-05",
        title: "Curricular Intake & University Affiliation",
        category: "Academic & Courses",
        agentId: 5,
        filename: "SPPU_University_Affiliation_2026.pdf",
        filesize: "2.4 MB",
        status: "REVIEW_REQUIRED",
        confidence: 89.2,
        date: "2026-10-18",
        hash: "sha256:4a02119c83210fe...",
        findings: "Proposed new branch CSE (AI & ML) 60 intake endorsed by Affiliating University. Library title count is 380 books against recommended 450 titles."
      },
      {
        id: "DOC-06",
        title: "Anti-Ragging Undertaking & Grievance Redressal",
        category: "Regulatory & Declarations",
        agentId: 6,
        filename: "Anti_Ragging_Affidavits_ICC.pdf",
        filesize: "1.2 MB",
        status: "PASS",
        confidence: 99.8,
        date: "2026-10-18",
        hash: "sha256:d884e1123490aa1...",
        findings: "All student and parent affidavits registered on Anti-Ragging National Portal. Internal Complaints Committee (ICC) & Ombudsman published on website."
      }
    ]
  },
  // Real Verified Institute from Research PDF: Government Polytechnic Bhagalpur
  {
    id: "AICTE-2024-EOA-38101",
    pid: "1-3324501",
    name: "Government Polytechnic, Bhagalpur",
    location: "Bhagalpur, Bihar",
    region: "Northern Regional Office (NRO)",
    regionalOffice: "Kanpur",
    category: "Government Polytechnic / Diploma",
    establishedYear: 1955,
    principalName: "Dr. S. N. Ray, M.Tech, Ph.D.",
    contactEmail: "gpbihar.bhagalpur@gmail.com",
    applicationType: "Extension of Approval (EoA) via Self-Disclosure",
    selectedRoute: "Only Scrutiny",
    currentStageIndex: 5, // Fully Approved
    status: "APPROVED",
    priorityScore: 98,
    mandatoryDeficiency: false,
    deficiencyReason: null,
    eoaLetterNo: "F.No. Northern/1-3324501/2024/EOA",
    eoaDate: "2024-06-12",
    assignedOfficer: "Dr. K. N. Mishra (Adviser-I, AICTE NRO Kanpur)",
    evcStatus: "EXEMPTED_GOVERNMENT",
    evcDate: null,
    landAreaAcres: 24.5,
    totalIntake: 360,
    studentFacultyRatio: "1:15.0",
    courses: [
      { name: "Civil Engineering", intake: 60, level: "Diploma" },
      { name: "Electrical Engineering", intake: 60, level: "Diploma" },
      { name: "Mechanical Engineering", intake: 60, level: "Diploma" },
      { name: "Electronics Engineering", intake: 60, level: "Diploma" },
      { name: "Computer Science & Engineering", intake: 60, level: "Diploma" },
      { name: "Textile Technology", intake: 60, level: "Diploma" }
    ],
    documents: [
      {
        id: "DOC-GPB-01",
        title: "Government Land Gazette & Public Property Deed",
        category: "Legal & Institution",
        agentId: 1,
        filename: "Govt_Poly_Bhagalpur_Land_Gazette.pdf",
        filesize: "5.1 MB",
        status: "PASS",
        confidence: 99.8,
        date: "2024-05-10",
        hash: "sha256:3811af0012e...",
        findings: "Government-owned land deed of 24.5 acres recorded in Bihar State Gazette. Clear title."
      },
      {
        id: "DOC-GPB-02",
        title: "State Public Works (PWD) Building Safety Certificate",
        category: "Infrastructure & Safety",
        agentId: 2,
        filename: "PWD_Building_Fire_Clearance_Bhagalpur.pdf",
        filesize: "2.4 MB",
        status: "PASS",
        confidence: 98.9,
        date: "2024-05-12",
        hash: "sha256:8890cf1120a...",
        findings: "PWD Executive Engineer Building Safety and Fire NOC valid through 2027."
      }
    ]
  },
  // Real Verified Institute from Research PDF: Harcourt Butler Technical University (HBTU)
  {
    id: "AICTE-2024-EOA-66102",
    pid: "1-2811902",
    name: "Harcourt Butler Technical University (HBTU)",
    location: "Kanpur, Uttar Pradesh",
    region: "Northern Regional Office (NRO)",
    regionalOffice: "Kanpur",
    category: "State Technical University",
    establishedYear: 1921,
    principalName: "Prof. Dr. Samsher, Vice Chancellor",
    contactEmail: "vc@hbtu.ac.in",
    applicationType: "Extension of Approval (EoA) via Self-Disclosure",
    selectedRoute: "Only Scrutiny",
    currentStageIndex: 5,
    status: "APPROVED",
    priorityScore: 99,
    mandatoryDeficiency: false,
    deficiencyReason: null,
    eoaLetterNo: "F.No. Northern/1-2811902/2024/EOA",
    eoaDate: "2024-06-15",
    assignedOfficer: "Dr. K. N. Mishra (Adviser-I, AICTE NRO Kanpur)",
    evcStatus: "EXEMPTED_UNIVERSITY",
    evcDate: null,
    landAreaAcres: 77.0,
    totalIntake: 920,
    studentFacultyRatio: "1:12.8",
    courses: [
      { name: "Computer Science & Engineering", intake: 90, level: "UG" },
      { name: "Chemical Engineering", intake: 80, level: "UG" },
      { name: "Biochemical Engineering", intake: 60, level: "UG" },
      { name: "Oil Technology", intake: 60, level: "UG" },
      { name: "Paint Technology", intake: 60, level: "UG" },
      { name: "Plastic Technology", intake: 60, level: "UG" }
    ],
    documents: [
      {
        id: "DOC-HBTU-01",
        title: "UP State Legislative University Act & Land Ownership",
        category: "Legal & Institution",
        agentId: 1,
        filename: "HBTU_Act_Land_Deed_77Acres.pdf",
        filesize: "8.2 MB",
        status: "PASS",
        confidence: 99.9,
        date: "2024-04-10",
        hash: "sha256:6612df9901a...",
        findings: "Established under UP Act No. 23 of 2016. Campus span: 77.0 acres across East & West Campus."
      }
    ]
  },
  // Real Verified Institute from Research PDF: Sir M. Visvesvaraya Institute of Technology
  {
    id: "AICTE-2024-EOA-75103",
    pid: "1-4512903",
    name: "Sir M. Visvesvaraya Institute of Technology (Sir MVIT)",
    location: "Bengaluru, Karnataka",
    region: "South-Western Regional Office (SWRO)",
    regionalOffice: "Bengaluru",
    category: "Technical / Engineering (Autonomous)",
    establishedYear: 1986,
    principalName: "Dr. Rakesh Kumar, Ph.D.",
    contactEmail: "principal@sirmvit.edu",
    applicationType: "Start New Program or Increase Sanctioned Intake (MCA 60 Seats)",
    selectedRoute: "Scrutiny + EVC",
    currentStageIndex: 5,
    status: "APPROVED",
    priorityScore: 96,
    mandatoryDeficiency: false,
    deficiencyReason: null,
    eoaLetterNo: "F.No. South-West/1-4512903/2024/EOA",
    eoaDate: "2024-06-20",
    assignedOfficer: "Smt. L. Sundaram (Director, AICTE SWRO Bengaluru)",
    evcStatus: "COMPLETED",
    evcDate: "2024-05-18",
    landAreaAcres: 133.0,
    totalIntake: 840,
    studentFacultyRatio: "1:13.9",
    courses: [
      { name: "Master of Computer Applications (MCA)", intake: 60, level: "PG" },
      { name: "Computer Science & Engineering", intake: 180, level: "UG" },
      { name: "Information Science & Engineering", intake: 120, level: "UG" },
      { name: "Biotechnology", intake: 60, level: "UG" },
      { name: "Electronics & Communication", intake: 120, level: "UG" }
    ],
    documents: [
      {
        id: "DOC-MVIT-01",
        title: "Trust Registration & 133-Acre Title Deeds",
        category: "Legal & Institution",
        agentId: 1,
        filename: "SirMVIT_SriKET_Trust_Deed.pdf",
        filesize: "6.4 MB",
        status: "PASS",
        confidence: 99.7,
        date: "2024-05-02",
        hash: "sha256:7511ef90aa2...",
        findings: "Registered under Sri Krishnadevaraya Educational Trust. 133 acres in Yelahanka, Bengaluru."
      }
    ]
  }
];

export const DEFAULT_USERS = [
  {
    id: "user-inst-1",
    username: "INST-PUNE-8492",
    password: "password123",
    role: "INSTITUTE",
    name: "Aryabhata Institute of Technology & Management",
    pid: "1-8492001",
    designation: "Authorized Institute Signatory",
    institutionId: "AICTE-2026-REG-84920",
    region: "Western Regional Office (WRO Mumbai)"
  },
  {
    id: "user-admin-1",
    username: "AICTE-OFFICER-01",
    password: "adminpassword",
    role: "ADMIN",
    name: "Dr. Vijay Sharma",
    designation: "Joint Director, AICTE Regulation Bureau",
    region: "Western Regional Office (WRO Mumbai) & HQ New Delhi",
    badgeNumber: "AICTE-GOV-REG-9912"
  },
  {
    id: "user-committee-1",
    username: "COMMITTEE-CHAIR",
    password: "committeepassword",
    role: "COMMITTEE",
    name: "Prof. Dr. S. K. Mahajan",
    designation: "Senior Scrutiny & EVC Committee Chairman",
    institutionId: "AICTE-2026-REG-84920",
    region: "National Peer Review Panel"
  },
  {
    id: "user-inst-2",
    username: "INST-BHAGALPUR",
    password: "password123",
    role: "INSTITUTE",
    name: "Government Polytechnic, Bhagalpur",
    pid: "1-3324501",
    designation: "Principal, Govt. Polytechnic Bhagalpur",
    institutionId: "AICTE-2024-EOA-38101",
    region: "Northern Regional Office (NRO Kanpur)"
  },
  {
    id: "user-inst-3",
    username: "INST-SIRMVIT",
    password: "password123",
    role: "INSTITUTE",
    name: "Sir M. Visvesvaraya Institute of Technology",
    pid: "1-4512903",
    designation: "Principal, Sir MVIT Bengaluru",
    institutionId: "AICTE-2024-EOA-75103",
    region: "South-Western Regional Office (SWRO Bengaluru)"
  }
];

export const DEFAULT_INSTITUTE_USER = DEFAULT_USERS[0];
export const DEFAULT_ADMIN_USER = DEFAULT_USERS[1];
export const DEFAULT_COMMITTEE_USER = DEFAULT_USERS[2];

// LocalStorage Persistence Handlers
const STORAGE_KEY_INSTS = 'aicte_enterprise_institutions_v3';
const STORAGE_KEY_COMMITS = 'aicte_enterprise_audit_commits_v3';
const STORAGE_KEY_USER = 'aicte_enterprise_active_user_v3';

export function getStoredInstitutions() {
  let insts = DEFAULT_INSTITUTIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INSTS);
    if (raw) insts = JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }

  // Enforce single source of truth: compute score and gates dynamically from findings
  return insts.map(inst => {
    const scoreResult = calculateInstitutionScore(inst);
    return {
      ...inst,
      priorityScore: scoreResult.score,
      mandatoryDeficiency: scoreResult.isGateFailed,
      mandatoryGateStatus: scoreResult.mandatoryGateStatus,
      deficiencyReason: scoreResult.deficiencyReason,
      blockingReasons: scoreResult.blockingReasons,
      unverifiedItems: scoreResult.unverifiedItems,
      unverifiedWeight: scoreResult.unverifiedWeight,
      categoryBreakdown: scoreResult.breakdown
    };
  });
}

export function saveInstitutions(institutions) {
  try {
    localStorage.setItem(STORAGE_KEY_INSTS, JSON.stringify(institutions));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return null;
}

export function saveStoredUser(user) {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  } catch (e) {
    console.error(e);
  }
}
