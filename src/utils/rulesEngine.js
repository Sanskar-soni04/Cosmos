// AICTE Deterministic Rules & Dynamic Priority Scoring Engine
// Calculates compliance scores dynamically based on uploaded documents, handbook weights, and statutory gates

export function calculateInstitutionScore(institution, weights = null) {
  if (!institution) {
    return {
      score: 0,
      isGateFailed: true,
      mandatoryGateStatus: 'BLOCKED',
      deficiencyReason: "No institutional records loaded.",
      blockingReasons: ["No institutional records loaded."],
      unverifiedItems: [],
      unverifiedWeight: 0,
      status: 'MISSING',
      breakdown: { legal: 0, infra: 0, faculty: 0, finance: 0, academic: 0, regulatory: 0 }
    };
  }

  // APH Master Rules checklist definitions (weights sum to 100)
  const rules = [
    { code: 'RULE-LEG-01', category: 'legal', title: 'Land Title & Mutation', weight: weights?.legal || 20, isMandatory: true, docMatch: (d) => d.category === 'Legal & Institution' },
    { code: 'RULE-SAF-01', category: 'infra', title: 'Fire Safety NOC', weight: 15, isMandatory: true, docMatch: (d) => d.category === 'Infrastructure & Safety' && (d.title?.toLowerCase().includes('fire') || d.filename?.toLowerCase().includes('fire')) },
    { code: 'RULE-SAF-02', category: 'infra', title: 'Building Stability & Occupancy', weight: 10, isMandatory: true, docMatch: (d) => d.category === 'Infrastructure & Safety' && !d.title?.toLowerCase().includes('fire') && !d.filename?.toLowerCase().includes('fire') },
    { code: 'RULE-FAC-01', category: 'faculty', title: 'SFR & Cadre Norms (1:15)', weight: weights?.faculty || 20, isMandatory: true, docMatch: (d) => d.category === 'Faculty & Staff' },
    { code: 'RULE-FIN-01', category: 'finance', title: 'Audited Statements & FDR', weight: weights?.finance || 15, isMandatory: false, docMatch: (d) => d.category === 'Finance & Accounts' || d.category === 'Finance & Sustainability' },
    { code: 'RULE-ACA-01', category: 'academic', title: 'Lab Equipment & Library Norms', weight: weights?.academic || 10, isMandatory: false, docMatch: (d) => d.category === 'Academic & Courses' },
    { code: 'RULE-REG-01', category: 'regulatory', title: 'Anti-Ragging, ICC & Statutory Affidavits', weight: weights?.regulatory || 10, isMandatory: true, docMatch: (d) => d.category === 'Regulatory & Declarations' }
  ];

  const docs = institution.documents || [];
  let totalEarned = 0;
  let unverifiedWeight = 0;
  const unverifiedItems = [];
  const blockingReasons = [];
  
  const breakdown = { legal: 0, infra: 0, faculty: 0, finance: 0, academic: 0, regulatory: 0 };

  rules.forEach(rule => {
    const matchedDoc = docs.find(rule.docMatch);
    
    // Determine status from document
    let status = 'MISSING';
    let explanation = `Mandatory document for '${rule.title}' not submitted.`;

    if (matchedDoc) {
      const docStatus = (matchedDoc.status || '').toUpperCase();
      if (docStatus.includes('PASS')) {
        status = 'PASS';
        explanation = matchedDoc.findings || `${rule.title} verified compliant.`;
      } else if (docStatus.includes('REVIEW') || docStatus.includes('UNVERIFIED') || docStatus.includes('PENDING')) {
        status = 'REVIEW_REQUIRED';
        explanation = matchedDoc.findings || `${rule.title} requires human scrutiny review.`;
      } else if (docStatus.includes('ERROR') || docStatus.includes('UNREADABLE')) {
        status = 'EXTRACTION_ERROR';
        explanation = matchedDoc.findings || `${rule.title} unreadable scan / extraction error.`;
      } else {
        status = 'FAIL_DEFICIENCY';
        explanation = matchedDoc.findings || `${rule.title} statutory deficiency flagged.`;
      }
    }

    if (status === 'PASS') {
      totalEarned += rule.weight;
      breakdown[rule.category] = (breakdown[rule.category] || 0) + rule.weight;
    } else if (status === 'REVIEW_REQUIRED' || status === 'EXTRACTION_ERROR') {
      unverifiedWeight += rule.weight;
      unverifiedItems.push({ ruleCode: rule.code, title: rule.title, status, explanation });
      if (rule.isMandatory) {
        blockingReasons.push(`[UNVERIFIED MANDATORY] ${rule.title}: ${explanation}`);
      }
    } else {
      // FAIL or MISSING = 0 points earned
      if (rule.isMandatory) {
        blockingReasons.push(`[MANDATORY GATE BLOCKED] ${rule.title}: ${explanation}`);
      }
    }
  });

  const isGateFailed = blockingReasons.length > 0;
  const mandatoryGateStatus = isGateFailed ? 'BLOCKED' : 'CLEAR';
  const deficiencyReason = isGateFailed ? blockingReasons[0] : null;

  return {
    score: totalEarned,
    isGateFailed,
    mandatoryGateStatus,
    deficiencyReason,
    blockingReasons,
    unverifiedItems,
    unverifiedWeight,
    status: isGateFailed ? 'DEFICIENCY_FLAGGED' : (unverifiedItems.length > 0 ? 'REVIEW_REQUIRED' : 'PASS'),
    breakdown
  };
}

export function computeRegionalStatsFromInstitutions(institutions) {
  // 12 Official AICTE Regional and Camp Offices (Verified via AICTE Act & Council Records)
  const regions = [
    { code: "WRO", city: "Mumbai", name: "Western Regional Office (WRO, Mumbai)", total: 0, cleared: 0, pending: 0, overdue: 0, bottleneck: "EVC Site Audit" },
    { code: "NRO", city: "Kanpur", name: "Northern Regional Office (NRO, Kanpur)", total: 0, cleared: 0, pending: 0, overdue: 0, bottleneck: "Scrutiny Committee" },
    { code: "NWRO", city: "Chandigarh", name: "North-Western Regional Office (NWRO, Chandigarh)", total: 0, cleared: 0, pending: 0, overdue: 0, bottleneck: "AI Document Scrutiny" },
    { code: "SWRO", city: "Bengaluru", name: "South-Western Regional Office (SWRO, Bengaluru)", total: 0, cleared: 0, pending: 0, overdue: 0, bottleneck: "Intake Expansion Review" },
    { code: "SRO", city: "Chennai", name: "Southern Regional Office (SRO, Chennai)", total: 0, cleared: 0, pending: 0, overdue: 0, bottleneck: "Digital Seal Issuance" },
    { code: "SCRO", city: "Hyderabad", name: "South-Central Regional Office (SCRO, Hyderabad)", total: 0, cleared: 0, pending: 0, overdue: 0, bottleneck: "Faculty Aadhaar Verification" },
    { code: "CRO", city: "Bhopal", name: "Central Regional Office (CRO, Bhopal)", total: 0, cleared: 0, pending: 0, overdue: 0, bottleneck: "Deficiency Cure Period" },
    { code: "ERO", city: "Kolkata", name: "Eastern Regional Office (ERO, Kolkata)", total: 0, cleared: 0, pending: 0, overdue: 0, bottleneck: "SAC Appellate Hearing" },
    { code: "NERO", city: "Guwahati", name: "North-Eastern Regional Office (NERO, Guwahati)", total: 0, cleared: 0, pending: 0, overdue: 0, bottleneck: "Land Mutation Verification" },
    { code: "CAMP-GUR", city: "Gurugram", name: "AICTE Camp Office (Gurugram)", total: 0, cleared: 0, pending: 0, overdue: 0, bottleneck: "NCR Liaison Scrutiny" },
    { code: "CAMP-VAD", city: "Vadodara", name: "AICTE Camp Office (Vadodara)", total: 0, cleared: 0, pending: 0, overdue: 0, bottleneck: "Gujarat Technical Audit" },
    { code: "CAMP-TVM", city: "Thiruvananthapuram", name: "AICTE Camp Office (Thiruvananthapuram)", total: 0, cleared: 0, pending: 0, overdue: 0, bottleneck: "Kerala EVC Panels" }
  ];

  const safeInstitutions = Array.isArray(institutions) ? institutions : [];
  let totalApplications = safeInstitutions.length;
  let approved = 0;
  let deficiencyPending = 0;
  let underScrutiny = 0;

  safeInstitutions.forEach(inst => {
    const isApproved = inst.status === 'APPROVED' || inst.status === 'PASS';
    const isDeficiency = inst.status === 'DEFICIENCY_FLAGGED' || inst.mandatoryDeficiency;

    if (isApproved) approved++;
    else if (isDeficiency) deficiencyPending++;
    else underScrutiny++;

    // Match region by code, city, or name
    const regStr = (inst.region || inst.regionalOffice || '').toLowerCase();
    const r = regions.find(reg => 
      regStr.includes(reg.code.toLowerCase()) || 
      regStr.includes(reg.city.toLowerCase()) ||
      (reg.code === 'WRO' && regStr.includes('western')) ||
      (reg.code === 'NRO' && regStr.includes('northern') && !regStr.includes('north-western') && !regStr.includes('north-eastern')) ||
      (reg.code === 'NWRO' && regStr.includes('north-western')) ||
      (reg.code === 'SWRO' && regStr.includes('south-western')) ||
      (reg.code === 'SRO' && regStr.includes('southern') && !regStr.includes('south-western') && !regStr.includes('south-central')) ||
      (reg.code === 'SCRO' && regStr.includes('south-central')) ||
      (reg.code === 'CRO' && regStr.includes('central')) ||
      (reg.code === 'ERO' && regStr.includes('eastern') && !regStr.includes('north-eastern')) ||
      (reg.code === 'NERO' && regStr.includes('north-eastern'))
    ) || regions[0];

    r.total++;
    if (isApproved) r.cleared++;
    else if (isDeficiency) {
      r.pending++;
      r.overdue++;
    } else {
      r.pending++;
    }
  });

  return {
    totalApplications,
    approved,
    deficiencyPending,
    underScrutiny,
    regions
  };
}
