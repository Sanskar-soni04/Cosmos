import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Users, 
  Layers, 
  ShieldAlert, 
  ShieldCheck, 
  Flame, 
  Coins, 
  BookOpen, 
  FileCheck, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  Eye, 
  RefreshCw, 
  ExternalLink,
  FileText,
  Lock,
  ChevronRight,
  Info
} from 'lucide-react';
import { SPECIALIST_AGENTS } from '../data/mockData';

export function InstitutionView({ 
  institution, 
  isFixed, 
  onSimulateFix, 
  isScanning 
}) {
  const [selectedAgentId, setSelectedAgentId] = useState(2); // Agent 2: Infrastructure & Safety default

  // Selected agent object
  const currentAgent = SPECIALIST_AGENTS.find(a => a.id === selectedAgentId) || SPECIALIST_AGENTS[1];

  const agentIcons = {
    ShieldCheck: ShieldCheck,
    Flame: Flame,
    Users: Users,
    Coins: Coins,
    BookOpen: BookOpen,
    FileCheck: FileCheck
  };

  return (
    <div className="institution-view-container">
      {/* Institution Context Header Bar */}
      <div className="institution-context-bar">
        <div className="institution-pill-info">
          <div className="inst-avatar">
            AITM
          </div>
          <div className="inst-details">
            <h3>
              <span>{institution.name}</span>
              <span className={`badge ${isFixed ? 'badge-pass' : 'badge-fail'}`}>
                {isFixed ? 'COMPLIANT / READY FOR REVIEW' : 'DEFICIENCY FLAGGED'}
              </span>
            </h3>
            <div className="inst-meta-tags">
              <span><MapPin size={13} /> {institution.location}</span>
              <span>•</span>
              <span><FileText size={13} /> App ID: <strong>{institution.id}</strong></span>
              <span>•</span>
              <span><Layers size={13} /> Intake: <strong>{institution.totalIntake} Seats</strong></span>
              <span>•</span>
              <span><Users size={13} /> SFR: <strong>{institution.studentFacultyRatio}</strong></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Assigned Scrutiny Officer</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
              {institution.assignedOfficer}
            </div>
          </div>
        </div>
      </div>

      {/* Priority Scoring & Statutory Safeguard Card */}
      <div className="grid-2col" style={{ marginBottom: '1.75rem' }}>
        {/* Score Breakdown Card */}
        <div className="content-card">
          <div className="card-header-bar">
            <h3>
              <CheckCircle2 size={18} style={{ color: 'var(--aicte-gold)' }} />
              <span>Priority-Based Checklist Scoring (APH 2026-27)</span>
            </h3>
            <span className="badge badge-info">Deterministic Weighting</span>
          </div>

          <div className="card-body">
            <div className="score-circle-container">
              <div className="score-number-badge">
                <span className="score-num">
                  {isFixed ? '98' : '82'}
                </span>
                <span className="score-max">/ 100</span>
              </div>
              <div className="score-breakdown-details">
                <h4>
                  {isFixed 
                    ? 'Excellent Compliance Index (All Gates Passed)' 
                    : 'Qualified Score with Statutory Hold'}
                </h4>
                <p>
                  Calculated from 92 weighted criteria across 6 regulatory domains.
                  Every finding links directly to verifiable page evidence and cryptographic hash.
                </p>
              </div>
            </div>

            {/* Statutory Override Alert Box */}
            {!isFixed ? (
              <div className="statutory-alert-box">
                <ShieldAlert size={22} style={{ color: '#dc2626', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h5>Statutory Non-Override Safeguard Activated</h5>
                  <p>
                    <strong>Mandatory Regulatory Policy:</strong> Automation and high numerical scores (82/100) 
                    <strong> cannot override mandatory statutory rules</strong>. The Fire Safety Certificate is expired.
                    Workflow engine blocks stage transition to Scrutiny clearance until corrected document is submitted.
                  </p>
                </div>
              </div>
            ) : (
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderLeft: '4px solid #10b981',
                padding: '0.9rem 1.2rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start'
              }}>
                <ShieldCheck size={22} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h5 style={{ color: '#166534', fontSize: '0.88rem', fontWeight: 700 }}>
                    All Mandatory Gates Successfully Cleared
                  </h5>
                  <p style={{ color: '#15803d', fontSize: '0.8rem' }}>
                    Renewed Fire Safety Certificate (Valid till 2029) verified by Agent-2. Score updated to 98/100.
                    Application automatically advanced to the Scrutiny Committee Review queue.
                  </p>
                </div>
              </div>
            )}

            {/* Score Weights Breakdown Progress Bars */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Legal & Land Title (20 pts)</span>
                  <strong>20 / 20</strong>
                </div>
                <div className="confidence-bar"><div className="confidence-fill" style={{ width: '100%', background: '#10b981' }} /></div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Infrastructure & Fire Safety (20 pts)</span>
                  <strong>{isFixed ? '20 / 20' : '4 / 20'}</strong>
                </div>
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill" 
                    style={{ width: isFixed ? '100%' : '20%', background: isFixed ? '#10b981' : '#ef4444' }} 
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Faculty Cadre & SFR (25 pts)</span>
                  <strong>25 / 25</strong>
                </div>
                <div className="confidence-bar"><div className="confidence-fill" style={{ width: '100%', background: '#10b981' }} /></div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Finance & Security Deposit (15 pts)</span>
                  <strong>15 / 15</strong>
                </div>
                <div className="confidence-bar"><div className="confidence-fill" style={{ width: '100%', background: '#10b981' }} /></div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Curriculum & Library (10 pts)</span>
                  <strong>9 / 10</strong>
                </div>
                <div className="confidence-bar"><div className="confidence-fill" style={{ width: '90%', background: '#f59e0b' }} /></div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Regulatory Undertakings (10 pts)</span>
                  <strong>10 / 10</strong>
                </div>
                <div className="confidence-bar"><div className="confidence-fill" style={{ width: '100%', background: '#10b981' }} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Correction & Resubmission Loop Action Card */}
        <div className="content-card">
          <div className="card-header-bar">
            <h3>
              <RefreshCw size={18} style={{ color: 'var(--aicte-blue)' }} />
              <span>Correction & Revalidation Subsystem</span>
            </h3>
            <span className="badge badge-dark">APH Clause 4.5</span>
          </div>

          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                Institutions can view exact OCR page references, upload corrected documents, and trigger
                specialist agent re-validation without restarting the entire submission cycle.
              </p>

              <div style={{
                background: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
                    Active Deficiency Notice: DEF-2026-84920
                  </span>
                  <span className={`badge ${isFixed ? 'badge-pass' : 'badge-fail'}`}>
                    {isFixed ? 'RESOLVED' : 'CURE PERIOD: 11 DAYS LEFT'}
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  <strong>Required Action:</strong> Submit Municipal Fire Safety Renewal certificate with at least 
                  6 months forward validity under Clause 4.2.
                </p>
              </div>

              {/* Upload Dropzone Preview */}
              <div style={{
                border: '2px dashed var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                textAlign: 'center',
                background: '#ffffff',
                marginBottom: '1rem'
              }}>
                <Upload size={28} style={{ color: 'var(--aicte-blue)', margin: '0 auto 6px' }} />
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {isFixed ? 'Fire_NOC_Renewed_2026-2029_Verified.pdf' : 'Drop renewed certificate here to revalidate'}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Accepted format: PDF up to 25MB • Automated SHA-256 Checksum on ingest
                </div>
              </div>
            </div>

            <div>
              {!isFixed ? (
                <button
                  onClick={onSimulateFix}
                  disabled={isScanning}
                  className="btn-gold"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
                  id="btn-upload-revalidate"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Running Specialist Agent-2 OCR Extraction...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      <span>Upload Renewed Fire NOC & Re-verify Now</span>
                    </>
                  )}
                </button>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '0.6rem',
                  background: 'var(--status-pass-bg)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--status-pass)',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}>
                  ✓ Re-validation Passed • Audit Event Hash Logged
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 6 Specialist AI Verification Agents Grid */}
      <div className="content-card" style={{ marginBottom: '1.75rem' }}>
        <div className="card-header-bar">
          <div>
            <h3>
              <Users size={18} style={{ color: 'var(--aicte-gold)' }} />
              <span>Multi-Agent Verification Architecture (6 Specialist Agents)</span>
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              One main orchestrator dispatches dossiers to 6 parallel domain agents sharing structured JSON schemas.
            </p>
          </div>
          <span className="badge badge-dark">Parallel LLM + OCR</span>
        </div>

        <div className="card-body">
          <div className="agents-grid">
            {SPECIALIST_AGENTS.map((agent) => {
              const Icon = agentIcons[agent.icon] || ShieldCheck;
              const isSelected = selectedAgentId === agent.id;
              
              // Dynamic status for Agent 2 if fixed
              let agentStatus = agent.status;
              let agentFindings = agent.keyFindings;
              let confidence = agent.confidence;
              if (agent.id === 2 && isFixed) {
                agentStatus = 'PASS';
                agentFindings = 'Renewed Fire NOC validated. Valid through 14-Oct-2029 (Forward 36 months). Compliant with APH Clause 4.2.';
                confidence = 99.1;
              }

              const statusBadgeClass = agentStatus === 'PASS' 
                ? 'badge-pass' 
                : agentStatus.includes('FAIL') 
                ? 'badge-fail' 
                : 'badge-review';

              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`agent-item-card ${isSelected ? 'selected' : ''}`}
                >
                  <div className="agent-header-row">
                    <div className="agent-name">
                      <Icon size={16} style={{ color: 'var(--aicte-blue)' }} />
                      <span>{agent.name}</span>
                    </div>
                    <span className={`badge ${statusBadgeClass}`}>
                      {agentStatus}
                    </span>
                  </div>

                  <div className="agent-scope">
                    Scope: {agent.scope}
                  </div>

                  <div className="agent-finding-snippet">
                    <strong>Findings:</strong> {agentFindings}
                  </div>

                  <div className="agent-confidence-meter">
                    <span>AI Confidence: {confidence}%</span>
                    <div className="confidence-bar">
                      <div 
                        className="confidence-fill" 
                        style={{ 
                          width: `${confidence}%`, 
                          background: confidence > 95 ? '#10b981' : '#f59e0b' 
                        }} 
                      />
                    </div>
                    <span style={{ color: 'var(--aicte-blue)', fontSize: '0.7rem' }}>
                      {agent.checksCount} Checks
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Side-by-Side OCR Document Viewer & Evidence Inspector */}
      <div className="content-card">
        <div className="card-header-bar">
          <h3>
            <Eye size={18} style={{ color: 'var(--aicte-gold)' }} />
            <span>Interactive OCR Document Viewer & Evidence Reference</span>
          </h3>
          <span className="badge badge-info">
            Selected: {currentAgent.name}
          </span>
        </div>

        <div className="card-body">
          <div className="ocr-inspector-container">
            {/* Scanned Document Mockup with Bounding Box Overlay */}
            <div className="ocr-doc-mockup">
              <div style={{
                borderBottom: '1px solid #475569',
                paddingBottom: '8px',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                  DOCUMENT PREVIEW: {selectedAgentId === 2 
                    ? (isFixed ? 'NOC_FIRE_RENEWED_2026.pdf' : 'Fire_Safety_NOC_PuneMuncipal.pdf') 
                    : `${currentAgent.docTypes[0]}_Scan.pdf`}
                </span>
                <span style={{ color: '#38bdf8', fontSize: '0.72rem' }}>
                  OCR: PaddleOCR v2.8 (Confidence 98.7%)
                </span>
              </div>

              {/* Simulated Official Gov Header Inside Document */}
              <div style={{ textAlign: 'center', marginBottom: '16px', color: '#cbd5e1' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                  PUNE MUNICIPAL CORPORATION - CHIEF FIRE OFFICE
                </div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                  Central Fire Station, Old Pune-Mumbai Highway, Pune - 411005
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, marginTop: '6px', color: '#f8fafc' }}>
                  NO OBJECTION CERTIFICATE (FIRE & LIFE SAFETY)
                </div>
              </div>

              <div style={{ lineHeight: 1.6, color: '#94a3b8', fontSize: '0.75rem' }}>
                <div>Certificate No: <strong>PMC/CFO/NOC/2023/881</strong></div>
                <div>To: The Principal, Aryabhata Institute of Tech & Mgmt, Survey No 44/2, Pune.</div>
                <div>Subject: Fire Safety and Emergency Evacuation Clearance for Educational Occupancy.</div>
                <div style={{ marginTop: '8px' }}>
                  This is to certify that building blocks A, B & C consisting of Ground + 4 floors have been
                  inspected by Fire Officers. Fire hydrants, smoke alarms and wet risers were tested.
                </div>
              </div>

              {/* Bounding Box on Expiry Date */}
              {selectedAgentId === 2 && (
                <div 
                  className={`ocr-bounding-box ${isFixed ? 'verified' : ''}`}
                  style={{
                    top: '235px',
                    left: '24px',
                    right: '24px',
                    height: '52px'
                  }}
                >
                  <div className="ocr-bounding-label">
                    {isFixed ? 'PASS: VALID TILL 14/OCT/2029' : 'DEFICIENCY: EXPIRED 15/OCT/2026'}
                  </div>
                  <div style={{ color: '#ffffff', fontSize: '0.78rem', fontWeight: 700, marginTop: '2px' }}>
                    {isFixed 
                      ? 'PERIOD OF VALIDITY: Valid from 15/Oct/2026 up to 14/Oct/2029 (Forward 3 Yrs)' 
                      : 'PERIOD OF VALIDITY: Valid from 16/Oct/2023 up to 15/Oct/2026 (EXPIRED)'}
                  </div>
                </div>
              )}

              <div style={{ marginTop: '75px', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                <div>Digital Seal: PMC-FIRE-REG-84920</div>
                <div>Chief Fire Officer, Pune M.C.</div>
              </div>
            </div>

            {/* Extracted Structured JSON & Findings Reference */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  background: 'var(--bg-card-subtle)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Official Regulation Citation
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--aicte-navy-dark)', marginTop: '2px' }}>
                    {currentAgent.citation}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    "The applicant technical institute shall produce a valid Fire Safety Certificate issued by
                    Competent Fire Authority with forward validity of at least six months from application date."
                  </p>
                </div>

                <div style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  overflowX: 'auto',
                  border: '1px solid #334155'
                }}>
                  <div style={{ color: '#38bdf8', marginBottom: '4px' }}>// Structured JSON Extraction Schema:</div>
                  <div>&#123;</div>
                  <div style={{ paddingLeft: '1rem' }}>
                    "document_id": "DOC-02",<br/>
                    "certificate_type": "FIRE_SAFETY_NOC",<br/>
                    "issuing_body": "Pune Municipal Fire Dept",<br/>
                    "expiry_date": "{selectedAgentId === 2 && isFixed ? '2029-10-14' : '2026-10-15'}",<br/>
                    "mandatory_status": "{selectedAgentId === 2 && isFixed ? 'PASSED' : 'DEFICIENCY_FLAGGED'}",<br/>
                    "ocr_confidence": {selectedAgentId === 2 && isFixed ? 99.1 : currentAgent.confidence},<br/>
                    "uncertainty_index": 0.013,<br/>
                    "sha256_hash": "3b99aa8123efd91e847..."
                  </div>
                  <div>&#125;</div>
                </div>
              </div>

              <div style={{
                marginTop: '1rem',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                background: selectedAgentId === 2 && !isFixed ? '#fef2f2' : '#f0fdf4',
                border: `1px solid ${selectedAgentId === 2 && !isFixed ? '#fecaca' : '#bbf7d0'}`
              }}>
                <div style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: selectedAgentId === 2 && !isFixed ? '#991b1b' : '#166534',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Info size={15} />
                  <span>
                    {selectedAgentId === 2 && !isFixed 
                      ? 'Actionable Guidance for Institution' 
                      : 'Compliance Verification Confirmed'}
                  </span>
                </div>
                <p style={{
                  fontSize: '0.78rem',
                  color: selectedAgentId === 2 && !isFixed ? '#7f1d1d' : '#15803d',
                  marginTop: '3px'
                }}>
                  {selectedAgentId === 2 && !isFixed
                    ? 'Upload the renewed receipt or 3-year extension certificate. The automated orchestrator will rerun Agent-2 within 10 seconds.'
                    : 'All extracted parameters satisfy Approval Process Handbook norms. Preserved in tamper-proof audit trail.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
