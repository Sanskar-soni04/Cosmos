import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  ShieldCheck, 
  FileWarning, 
  Users, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Send, 
  MessageSquare, 
  Award,
  CalendarCheck,
  Building,
  Eye,
  LogOut,
  FileText,
  Lock,
  Camera,
  MapPin,
  Check,
  Printer,
  FileCheck2,
  Sparkles,
  RefreshCw,
  Hash
} from 'lucide-react';
import { SPECIALIST_AGENTS } from '../data/mockData';
import { calculateInstitutionScore } from '../utils/rulesEngine';
import { EoALetterModal } from './EoALetterModal';

export function CommitteePortalShell({ 
  currentUser, 
  institution, 
  institutions = [],
  onUpdateInstitution,
  isFixed, 
  onSimulateFix, 
  onApproveScrutiny, 
  onLogout,
  onAddAuditCommit,
  showToast 
}) {
  const [selectedInstId, setSelectedInstId] = useState(institution?.id || institutions[0]?.id || 'AICTE-2026-REG-84920');
  const [committeeTab, setCommitteeTab] = useState('scrutiny'); // 'scrutiny', 'evc_site', 'mom_report'
  const [coiSigned, setCoiSigned] = useState(true);
  const [selectedAgentId, setSelectedAgentId] = useState(2);
  const [reportSigned, setReportSigned] = useState(false);
  const [isEoAModalOpen, setIsEoAModalOpen] = useState(false);

  // Active institution from list with bulletproof fallback
  const currentTarget = institutions.find(i => i.id === selectedInstId) || institution || (institutions && institutions.length > 0 ? institutions[0] : {
    id: "AICTE-2026-REG-84920",
    pid: "1-8492001",
    name: "Aryabhata Institute of Technology & Management",
    location: "Pune, Maharashtra",
    region: "Western Regional Office (WRO)",
    category: "Technical / Engineering",
    applicationType: "Start New Program or Increase Sanctioned Intake",
    selectedRoute: "Scrutiny + EVC",
    status: "DEFICIENCY_FLAGGED",
    priorityScore: 82,
    totalIntake: 660,
    documents: [],
    courses: []
  });

  // Calculate live dynamic score from documents
  const dynamicScoreObj = calculateInstitutionScore(currentTarget);
  const liveScore = isFixed && currentTarget?.id === 'AICTE-2026-REG-84920' ? 98 : (dynamicScoreObj?.score || 82);
  const isCompliant = isFixed && currentTarget?.id === 'AICTE-2026-REG-84920' ? true : !dynamicScoreObj?.isGateFailed;

  const [committeeNotes, setCommitteeNotes] = useState(
    isCompliant
      ? `All regulatory dossiers verified compliant for ${currentTarget?.name || 'the institution'}. Scrutiny clearance recommended for EVC physical inspection.`
      : `Mandatory statutory requirement flagged. Fire Safety Certificate is expired under APH Clause 4.2. Recommended action: Issue Formal Deficiency Notice with 15-day cure period.`
  );

  const [evcChecklist, setEvcChecklist] = useState({
    landBoundary: true,
    fireEquipment: isCompliant,
    laboratories: true,
    libraryTitles: true,
    barrierFreeAccess: true,
    biometricFaculty: true
  });

  const currentAgent = SPECIALIST_AGENTS.find(a => a.id === selectedAgentId) || SPECIALIST_AGENTS[1];

  // Find real document matching selected agent
  const matchedDoc = currentTarget.documents?.find(d => d.agentId === currentAgent.id) || currentTarget.documents?.[0] || {
    title: `${currentAgent.name} Dossier`,
    filename: `${currentAgent.docTypes[0]}_Scan.pdf`,
    hash: 'sha256:7f8a91bc0...',
    filesize: '2.4 MB',
    date: '2026-10-20',
    status: isCompliant ? 'PASS' : 'FAIL / DEFICIENCY',
    findings: currentAgent.keyFindings
  };

  const handleToggleChecklist = (key) => {
    setEvcChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Live status updater for document
  const handleUpdateDocStatus = (status) => {
    const updatedDocs = (currentTarget.documents || []).map(d => {
      if (d.id === matchedDoc.id) {
        return { ...d, status, findings: `Status officially updated to ${status} by Scrutiny Committee Chairman.` };
      }
      return d;
    });

    const updatedInst = {
      ...currentTarget,
      documents: updatedDocs
    };

    if (onUpdateInstitution) {
      onUpdateInstitution(updatedInst);
    }

    if (status === 'PASS' && currentTarget.id === 'AICTE-2026-REG-84920') {
      onSimulateFix();
    }

    showToast(
      'Document Status Updated',
      `Marked ${matchedDoc.title} as ${status}. Dynamic score recalculated.`,
      'info'
    );
  };

  const handleSignReport = () => {
    setReportSigned(true);
    const timestamp = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST';
    
    onAddAuditCommit({
      id: `commit-${Date.now()}`,
      hash: '9a401bf',
      prevHash: '90fa11b',
      timestamp,
      actor: `${currentUser.name} (Committee Chairman)`,
      role: 'Statutory Peer Review Panel',
      type: 'COMMITTEE_REPORT_SIGNED',
      stage: 'Scrutiny Committee Evaluation',
      message: `Signed Official Scrutiny Evaluation Report for ${currentTarget.name}`,
      details: `Digitally signed with cryptographic token SHA-256. Live Score: ${liveScore}/100. Status: ${isCompliant ? 'RECOMMENDED FOR APPROVAL' : 'DEFICIENCY NOTICE'}. Conflict of Interest: Cleared.`,
      verified: true,
      signature: 'GPG-VERIFIED-COMMITTEE-CHAIR'
    });

    showToast(
      '✓ Statutory Report Digitally Signed',
      `Official Scrutiny Report signed for ${currentTarget.name}. Checksum logged to audit ledger.`,
      'success',
      'sha256:9a401bf...'
    );
  };

  return (
    <div className="committee-portal-shell">
      {/* Committee Header Bar */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.85rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #1e3a8a, #0f172a)',
            color: 'var(--aicte-gold)',
            fontWeight: 800,
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            ⚖️
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--aicte-navy-dark)', margin: 0 }}>
                {currentUser.name}
              </h3>
              <span className="badge badge-info">
                Senior Scrutiny & EVC Committee Chairman
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              <span>Panel ID: <strong>EVC-PANEL-WRO-2026-44</strong></span>
              <span>•</span>
              <span>Statutory Scrutiny & Peer Review Chamber</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: coiSigned ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${coiSigned ? '#bbf7d0' : '#fecaca'}`,
            borderRadius: 'var(--radius-md)',
            padding: '4px 12px',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: coiSigned ? '#166534' : '#991b1b',
            fontWeight: 700
          }}>
            <ShieldCheck size={14} />
            <span>{coiSigned ? 'CoI Affidavit: Verified & Neutral' : 'CoI Pending'}</span>
          </div>

          <button
            onClick={onLogout}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              background: '#f8fafc',
              color: '#dc2626',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Committee Sub-Navigation Tabs */}
      <div style={{
        background: 'var(--aicte-navy-darkest)',
        padding: '0 2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '1440px', margin: '0 auto', overflowX: 'auto' }}>
          {[
            { id: 'scrutiny', label: '1. Scrutiny Evidence Assessment (6 AI Agents)', icon: ClipboardCheck },
            { id: 'evc_site', label: '2. EVC Site Verification & Physical Audit', icon: Camera },
            { id: 'mom_report', label: '3. Minutes of Meeting & Official Order', icon: FileCheck2 }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = committeeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCommitteeTab(tab.id)}
                style={{
                  padding: '0.85rem 1.25rem',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderBottom: `3px solid ${isActive ? 'var(--aicte-gold)' : 'transparent'}`,
                  background: isActive ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Committee Work Area */}
      <div className="app-container" style={{ paddingTop: '1.5rem' }}>
        {/* Dynamic Institution Docket Selector Bar */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Select Institution from Assigned Scrutiny Docket:
            </label>
            <select
              value={selectedInstId}
              onChange={(e) => setSelectedInstId(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '480px',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--aicte-navy-dark)'
              }}
            >
              {institutions.map(inst => (
                <option key={inst.id} value={inst.id}>
                  {inst.name} ({inst.pid}) - {inst.region}
                </option>
              ))}
            </select>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Live Dynamic Score</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: isCompliant ? '#10b981' : '#dc2626' }}>
              {liveScore} <span style={{ fontSize: '0.9rem', color: '#64748b' }}>/ 100</span>
            </div>
            <span className={`badge ${isCompliant ? 'badge-pass' : 'badge-fail'}`}>
              {isCompliant ? 'STATUTORY COMPLIANCE' : 'STATUTORY HOLD'}
            </span>
          </div>
        </div>

        {/* TAB 1: SCRUTINY EVIDENCE ASSESSMENT */}
        {committeeTab === 'scrutiny' && (
          <div>
            <div className="grid-2col">
              {/* Left Column: 6-Agent AI Checklist */}
              <div className="content-card">
                <div className="card-header-bar">
                  <h3>
                    <ClipboardCheck size={18} style={{ color: 'var(--aicte-gold)' }} />
                    <span>Specialist Agent Evidence Verification</span>
                  </h3>
                  <span className="badge badge-info">APH 2026-27</span>
                </div>

                <div className="card-body">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {SPECIALIST_AGENTS.map((agent) => {
                      const isSelected = selectedAgentId === agent.id;
                      
                      // Match real document for this agent
                      const doc = currentTarget.documents?.find(d => d.agentId === agent.id);
                      let docStatus = doc ? doc.status : (isCompliant ? 'PASS' : agent.status);
                      if (agent.id === 2 && isFixed && currentTarget.id === 'AICTE-2026-REG-84920') {
                        docStatus = 'PASS';
                      }

                      const isPass = docStatus === 'PASS';
                      const isFail = docStatus.includes('FAIL') || docStatus.includes('DEFICIENCY');

                      return (
                        <div
                          key={agent.id}
                          onClick={() => setSelectedAgentId(agent.id)}
                          style={{
                            border: `2px solid ${isSelected ? 'var(--aicte-blue)' : 'var(--border-subtle)'}`,
                            borderRadius: 'var(--radius-md)',
                            padding: '0.9rem',
                            background: isSelected ? '#ffffff' : '#f8fafc',
                            cursor: 'pointer',
                            boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
                              {agent.name}
                            </span>
                            <span className={`badge ${isPass ? 'badge-pass' : isFail ? 'badge-fail' : 'badge-review'}`}>
                              {docStatus}
                            </span>
                          </div>

                          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                            {doc ? doc.findings : agent.keyFindings}
                          </p>

                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            <span>Citation: <strong>{agent.citation}</strong></span>
                            <span>Document: <strong>{doc ? doc.filename : 'Pending'}</strong></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Real Document Inspector & Committee Verdict */}
              <div className="content-card">
                <div className="card-header-bar">
                  <h3>
                    <Eye size={18} style={{ color: 'var(--aicte-blue)' }} />
                    <span>Live Document Inspection: {currentAgent.name}</span>
                  </h3>
                  <span className="badge badge-dark">{matchedDoc.filesize || '1.8 MB'}</span>
                </div>

                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {/* Dynamic Document Preview Box */}
                  <div className="ocr-doc-mockup" style={{ minHeight: '260px', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '6px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        FILE: {matchedDoc.filename}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                        {matchedDoc.hash}
                      </span>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1' }}>
                        {currentTarget.name.toUpperCase()}
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f8fafc' }}>
                        {matchedDoc.title.toUpperCase()}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                        Permanent Institute ID: {currentTarget.pid} • Region: {currentTarget.region}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '4px' }}>
                      <strong>Extracted Findings:</strong> {matchedDoc.findings}
                    </div>

                    {/* Interactive Status Marking Buttons */}
                    <div style={{ marginTop: '14px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Committee Action:</span>
                      <button
                        type="button"
                        onClick={() => handleUpdateDocStatus('PASS')}
                        style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: '#10b981',
                          color: '#ffffff',
                          fontSize: '0.72rem',
                          fontWeight: 700
                        }}
                      >
                        ✓ Mark Pass
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateDocStatus('FAIL / DEFICIENCY')}
                        style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: '#ef4444',
                          color: '#ffffff',
                          fontSize: '0.72rem',
                          fontWeight: 700
                        }}
                      >
                        ✕ Mark Deficiency
                      </button>
                    </div>
                  </div>

                  {/* Committee Observations Textarea */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '6px' }}>
                      Committee Chairman Observations & Statutory Record:
                    </label>
                    <textarea
                      rows={3}
                      value={committeeNotes}
                      onChange={(e) => setCommitteeNotes(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-medium)',
                        fontSize: '0.82rem',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  {/* Actions */}
                  <div>
                    {isCompliant ? (
                      <button
                        onClick={onApproveScrutiny}
                        className="btn-gold"
                        style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
                      >
                        <CheckCircle2 size={16} />
                        <span>Endorse Scrutiny Clearance & Recommend EVC Visit</span>
                      </button>
                    ) : (
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button
                          onClick={onSimulateFix}
                          className="btn-secondary"
                          style={{ flex: 1, justifyContent: 'center' }}
                        >
                          <span>Simulate Institutional Cure (Upload NOC)</span>
                        </button>
                        <button
                          onClick={() => alert(`Formal Deficiency Notice dispatched to ${currentTarget.name} under Committee seal.`)}
                          className="btn-primary"
                          style={{ background: '#dc2626' }}
                        >
                          <Send size={15} />
                          <span>Issue Deficiency Notice</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EVC SITE INSPECTION & PHYSICAL VERIFICATION */}
        {committeeTab === 'evc_site' && (
          <div className="content-card">
            <div className="card-header-bar">
              <div>
                <h3>
                  <Camera size={18} style={{ color: 'var(--aicte-gold)' }} />
                  <span>Expert Visiting Committee (EVC) Physical / Geo-Tagged Verification</span>
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Target Campus: {currentTarget.name} ({currentTarget.location})
                </p>
              </div>
              <span className="badge badge-info">3-Member Neutral Panel</span>
            </div>

            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  { key: 'landBoundary', title: '1. Campus Land Demarcation & Perimeter Wall', norm: `${currentTarget.landAreaAcres || 7.5} Acres Contiguous Area verified via GPS coordinates` },
                  { key: 'fireEquipment', title: '2. Fire Hydrants, Wet Risers & Smoke Detectors', norm: isCompliant ? 'Operational & inspected by CFO' : 'Deficiency: Expired certification' },
                  { key: 'laboratories', title: '3. Technical Laboratories & AI/ML Computing Nodes', norm: 'Computing labs verified with licensed software & AI workstations' },
                  { key: 'libraryTitles', title: '4. Central Library Books, Journals & IEEE Access', norm: 'Digital library terminal verified with DELNET subscription' },
                  { key: 'barrierFreeAccess', title: '5. Barrier-Free Ramps & Divyangjan Lifts', norm: 'Braille signage and wheelchair ramp in campus buildings' },
                  { key: 'biometricFaculty', title: '6. Aadhaar-Linked Biometric Faculty Presence', norm: `Student-Faculty ratio ${currentTarget.studentFacultyRatio || '1:15'} verified on live attendance roster` }
                ].map((item) => {
                  const isChecked = evcChecklist[item.key];
                  return (
                    <div
                      key={item.key}
                      onClick={() => handleToggleChecklist(item.key)}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        background: isChecked ? 'rgba(16, 185, 129, 0.08)' : '#fef2f2',
                        border: `1px solid ${isChecked ? '#bbf7d0' : '#fecaca'}`,
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start'
                      }}
                    >
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '4px',
                        background: isChecked ? '#10b981' : '#dc2626',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {isChecked ? <Check size={16} /> : <XCircle size={16} />}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: isChecked ? '#166534' : '#991b1b', marginTop: '2px' }}>
                          {item.norm}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  onClick={() => setCommitteeTab('mom_report')}
                  className="btn-gold"
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  <span>Proceed to Final Committee Report</span>
                  <Award size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MINUTES OF THE MEETING & ORDER SIGNING */}
        {committeeTab === 'mom_report' && (
          <div className="content-card">
            <div className="card-header-bar">
              <div>
                <h3>
                  <FileCheck2 size={18} style={{ color: 'var(--aicte-blue)' }} />
                  <span>Minutes of Meeting (MoM) & Formal Scrutiny Report</span>
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Statutory council record under Section 10 of the AICTE Act 1987.
                </p>
              </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setIsEoAModalOpen(true)}
                    className="btn-gold"
                    style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                    id="btn-committee-view-eoa"
                  >
                    <Award size={15} />
                    <span>Preview Official EoA Order</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="btn-secondary"
                    style={{ fontSize: '0.8rem' }}
                  >
                    <Printer size={15} />
                    <span>Print Official MoM</span>
                  </button>
                </div>
            </div>

            <div className="card-body">
              {/* Formal Report Layout */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '2rem',
                maxWidth: '850px',
                margin: '0 auto 1.5rem',
                color: '#0f172a'
              }}>
                <div style={{ textAlign: 'center', borderBottom: '2px solid #0a254c', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--aicte-gold)' }}>
                    ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
                  </div>
                  <h2 style={{ fontSize: '1.25rem', color: 'var(--aicte-navy-dark)', margin: '4px 0' }}>
                    STATUTORY SCRUTINY COMMITTEE EVALUATION REPORT (2026-27)
                  </h2>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Regional Directorate: {currentTarget.region} • Permanent Institute ID: {currentTarget.pid}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
                  <div><strong>Name of Institution:</strong> {currentTarget.name}</div>
                  <div><strong>Application Docket:</strong> {currentTarget.id}</div>
                  <div><strong>Evaluation Date:</strong> {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                  <div><strong>Scrutiny Routing Mode:</strong> {currentTarget.selectedRoute}</div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--aicte-navy-dark)', marginBottom: '4px' }}>
                    Summary of Statutory Observations:
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.6, background: '#ffffff', padding: '12px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                    {committeeNotes}
                  </p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--aicte-navy-dark)', marginBottom: '6px' }}>
                    Recommendation of the Committee:
                  </h4>
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: isCompliant ? '#f0fdf4' : '#fef2f2',
                    border: `1px solid ${isCompliant ? '#bbf7d0' : '#fecaca'}`,
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: isCompliant ? '#166534' : '#991b1b'
                  }}>
                    {isCompliant 
                      ? `✓ RECOMMENDED FOR GRANT OF APPROVAL & EVC VISITING COMMITTEE (Score: ${liveScore}/100)` 
                      : `⚠️ DEFICIENCY PENDING: RECOMMENDED TO CURE DEFICIENCY WITHIN 15 DAYS (Score: ${liveScore}/100)`}
                  </div>
                </div>

                {/* 3 Panel Signatures */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', borderTop: '1px dashed #cbd5e1', paddingTop: '1.25rem', textAlign: 'center', fontSize: '0.75rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>{currentUser.name}</div>
                    <div style={{ color: 'var(--text-muted)' }}>Senior Committee Chairman</div>
                    {reportSigned && <div style={{ color: '#16a34a', fontWeight: 800, marginTop: '4px' }}>✓ e-Signed</div>}
                  </div>

                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>Er. Neha Joshi</div>
                    <div style={{ color: 'var(--text-muted)' }}>Industry Expert (CII Nominee)</div>
                    {reportSigned && <div style={{ color: '#16a34a', fontWeight: 800, marginTop: '4px' }}>✓ e-Signed</div>}
                  </div>

                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>Dr. Vijay Sharma</div>
                    <div style={{ color: 'var(--text-muted)' }}>AICTE Convener & Joint Director</div>
                    {reportSigned && <div style={{ color: '#16a34a', fontWeight: 800, marginTop: '4px' }}>✓ e-Signed</div>}
                  </div>
                </div>
              </div>

              {/* Digital Signature Action */}
              <div style={{ textAlign: 'center' }}>
                {!reportSigned ? (
                  <button
                    onClick={handleSignReport}
                    className="btn-gold"
                    style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}
                  >
                    <Award size={18} />
                    <span>Apply Digital Committee Signature & Log to Audit Ledger</span>
                  </button>
                ) : (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: 'var(--radius-full)',
                    color: '#166534',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}>
                    <CheckCircle2 size={18} />
                    <span>Report Digitally Certified with Cryptographic SHA-256 Token</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Official AICTE Extension of Approval (EoA) Letter Modal */}
      <EoALetterModal
        isOpen={isEoAModalOpen}
        onClose={() => setIsEoAModalOpen(false)}
        institution={currentTarget}
        isFixed={isFixed}
      />
    </div>
  );
}
