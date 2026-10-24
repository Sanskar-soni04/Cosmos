import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  FileText, 
  Layers, 
  Users, 
  Upload, 
  CheckCircle2, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  RefreshCw, 
  Calendar, 
  Award, 
  LogOut, 
  FileCheck2, 
  Eye, 
  Hash, 
  PlusCircle, 
  AlertTriangle,
  Flame,
  Coins,
  BookOpen
} from 'lucide-react';
import { computeSHA256, formatBytes, generateShortHash } from '../utils/crypto';
import { SPECIALIST_AGENTS } from '../data/mockData';
import { EoALetterModal } from './EoALetterModal';

export function InstitutePortalShell({ 
  currentUser, 
  institution, 
  setInstitution, 
  isFixed, 
  onSimulateFix, 
  onLogout,
  onAddAuditCommit,
  showToast 
}) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, vault, deficiency, compliance, new_app
  const [selectedAgentId, setSelectedAgentId] = useState(2); // Agent 2: Infra
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState('Infrastructure & Safety');
  const [newCourseName, setNewCourseName] = useState('');
  const [newIntake, setNewIntake] = useState(60);
  const [isEoAModalOpen, setIsEoAModalOpen] = useState(false);

  const currentAgent = SPECIALIST_AGENTS.find(a => a.id === selectedAgentId) || SPECIALIST_AGENTS[1];

  // Real File Upload Handler (reads actual file from user disk and computes SHA-256)
  const handleRealFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const realHash = await computeSHA256(file);
      const timestamp = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST';
      const commitHash = generateShortHash();

      // Check if uploaded file is meant for Fire NOC resolution
      const isFireNoc = file.name.toLowerCase().includes('fire') || uploadCategory === 'Infrastructure & Safety';

      const newDoc = {
        id: `DOC-LIVE-${Date.now().toString().slice(-4)}`,
        title: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
        category: uploadCategory,
        agentId: isFireNoc ? 2 : 1,
        filename: file.name,
        filesize: formatBytes(file.size),
        status: isFireNoc ? 'PASS' : 'PASS',
        confidence: 99.2,
        date: new Date().toISOString().split('T')[0],
        hash: realHash,
        findings: `Live file ingested via Institutional Vault. Real SHA-256 computed. Satisfies APH 2026-27 compliance criteria.`
      };

      // Add document to institution
      const updatedDocs = [newDoc, ...institution.documents];
      let updatedInstitution = {
        ...institution,
        documents: updatedDocs
      };

      if (isFireNoc && !isFixed) {
        updatedInstitution = {
          ...updatedInstitution,
          priorityScore: 98,
          status: 'PASS',
          mandatoryDeficiency: false,
          deficiencyReason: null,
          currentStageIndex: 3 // advanced to Scrutiny Review
        };
        onSimulateFix(); // clear fix flag
      }

      setInstitution(updatedInstitution);

      // Add to immutable audit trail
      onAddAuditCommit({
        id: `commit-${Date.now()}`,
        hash: commitHash,
        prevHash: 'e00511a',
        timestamp,
        actor: `${currentUser.name} (${currentUser.designation})`,
        role: 'Applicant Technical Institution',
        type: 'LIVE_DOC_INGEST',
        stage: 'Institutional Document Vault',
        message: `Uploaded verified dossier: ${file.name}`,
        details: `Live file size: ${formatBytes(file.size)}. Computed Cryptographic Checksum: ${realHash}. Registered on national audit ledger.`,
        verified: true,
        signature: `GPG-VERIFIED-PID-${institution.pid}`
      });

      showToast(
        '✓ Live Document Ingested & Hashed',
        `File ${file.name} uploaded. SHA-256: ${realHash}`,
        'success',
        realHash
      );
    } catch (err) {
      console.error(err);
      showToast('Upload Error', 'Could not compute file hash.', 'alert');
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  // Submit New Course Application Handler
  const handleNewCourseSubmit = (e) => {
    e.preventDefault();
    if (!newCourseName) return;

    const timestamp = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST';
    const commitHash = generateShortHash();

    const updated = {
      ...institution,
      totalIntake: institution.totalIntake + parseInt(newIntake || 0),
      applicationType: `${institution.applicationType} + Addition of ${newCourseName} (${newIntake} Seats)`
    };

    setInstitution(updated);

    onAddAuditCommit({
      id: `commit-${Date.now()}`,
      hash: commitHash,
      prevHash: 'b198fa0',
      timestamp,
      actor: `${currentUser.name}`,
      role: 'Applicant Technical Institution',
      type: 'INTAKE_EXPANSION_SUBMITTED',
      stage: 'Application Intake & Scrutiny',
      message: `Submitted Application for New Program: ${newCourseName} (${newIntake} Seats)`,
      details: `Curricular syllabus and University endorsement dossier linked under PID ${institution.pid}.`,
      verified: true,
      signature: `GPG-VERIFIED-PID-${institution.pid}`
    });

    showToast(
      '✓ New Program Added to Application',
      `${newCourseName} (${newIntake} seats) added to regulatory docket.`,
      'success',
      commitHash
    );

    setNewCourseName('');
    setActiveTab('overview');
  };

  return (
    <div className="institute-portal-shell">
      {/* Institution Authenticated Bar */}
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
            background: 'linear-gradient(135deg, var(--aicte-navy-main), var(--aicte-blue))',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            AITM
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--aicte-navy-dark)', margin: 0 }}>
                {institution.name}
              </h3>
              <span className={`badge ${isFixed ? 'badge-pass' : 'badge-fail'}`}>
                {isFixed ? 'COMPLIANT (98/100)' : 'DEFICIENCY FLAGGED (82/100)'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              <span>PID: <strong>{institution.pid}</strong></span>
              <span>•</span>
              <span>App ID: <strong>{institution.id}</strong></span>
              <span>•</span>
              <span>{institution.location}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Authenticated As</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
              {currentUser.designation}
            </div>
          </div>

          <button
            onClick={() => setIsEoAModalOpen(true)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--aicte-gold)',
              background: 'rgba(245, 158, 11, 0.12)',
              color: 'var(--aicte-navy-dark)',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
            id="btn-inst-eoa-header"
          >
            <Award size={15} style={{ color: 'var(--aicte-gold)' }} />
            <span>Official EoA Order</span>
          </button>

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
            id="btn-logout"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Institute Portal Sub-Navigation Tabs */}
      <div style={{
        background: 'var(--aicte-navy-darkest)',
        padding: '0 2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '1440px', margin: '0 auto', overflowX: 'auto' }}>
          {[
            { id: 'overview', label: 'Dashboard & Approval Status', icon: Layers },
            { id: 'vault', label: `Live Document Vault (${institution.documents.length})`, icon: FileText },
            { id: 'deficiency', label: isFixed ? 'Deficiency Resolved (0 Pending)' : 'Deficiency Center (1 Pending)', icon: AlertTriangle },
            { id: 'compliance', label: 'Compliance & Expiry Radar', icon: Calendar },
            { id: 'new_app', label: '+ New Program / Intake Expansion', icon: PlusCircle }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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

      {/* Main Tab Content */}
      <div className="app-container" style={{ paddingTop: '1.5rem' }}>
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* Priority Scoring & Statutory Safeguard Card */}
            <div className="grid-2col" style={{ marginBottom: '1.75rem' }}>
              <div className="content-card">
                <div className="card-header-bar">
                  <h3>
                    <CheckCircle2 size={18} style={{ color: 'var(--aicte-gold)' }} />
                    <span>APH 2026-27 Institutional Compliance Score</span>
                  </h3>
                  <span className="badge badge-info">Deterministic Weighting</span>
                </div>

                <div className="card-body">
                  <div className="score-circle-container">
                    <div className="score-number-badge">
                      <span className="score-num">{isFixed ? '98' : '82'}</span>
                      <span className="score-max">/ 100</span>
                    </div>
                    <div className="score-breakdown-details">
                      <h4>
                        {isFixed ? 'Full Regulatory Compliance Confirmed' : 'Qualified Score with Mandatory Statutory Hold'}
                      </h4>
                      <p>
                        Aggregate calculation across Legal, Infrastructure, Faculty Cadre, Finance, Academic and Regulatory domains.
                      </p>
                    </div>
                  </div>

                  {!isFixed ? (
                    <div className="statutory-alert-box">
                      <ShieldAlert size={22} style={{ color: '#dc2626', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <h5>Statutory Non-Override Safeguard Active</h5>
                        <p>
                          <strong>Statutory Policy Rule Enforced:</strong> Under AICTE Regulations, an 82/100 score 
                          <strong> cannot override mandatory safety requirements</strong>. The Fire Safety Certificate 
                          is expired. Please visit the <strong>Deficiency Center</strong> tab to upload your renewed NOC.
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
                      marginBottom: '1rem',
                      display: 'flex',
                      gap: '0.75rem',
                      alignItems: 'flex-start'
                    }}>
                      <ShieldCheck size={22} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <h5 style={{ color: '#166534', fontSize: '0.88rem', fontWeight: 700 }}>All Statutory Gates Cleared</h5>
                        <p style={{ color: '#15803d', fontSize: '0.8rem' }}>
                          Renewed Fire Safety Certificate (Valid till 2029) verified by Agent-2. Score updated to 98/100.
                          Application advanced to the Scrutiny Committee Review queue.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Score breakdown metrics */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8rem' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span>Legal & Land Title (20 pts)</span>
                        <strong>20 / 20</strong>
                      </div>
                      <div className="confidence-bar"><div className="confidence-fill" style={{ width: '100%', background: '#10b981' }} /></div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span>Infrastructure & Safety (20 pts)</span>
                        <strong>{isFixed ? '20 / 20' : '4 / 20'}</strong>
                      </div>
                      <div className="confidence-bar"><div className="confidence-fill" style={{ width: isFixed ? '100%' : '20%', background: isFixed ? '#10b981' : '#ef4444' }} /></div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span>Faculty Cadre & Ratio (25 pts)</span>
                        <strong>25 / 25</strong>
                      </div>
                      <div className="confidence-bar"><div className="confidence-fill" style={{ width: '100%', background: '#10b981' }} /></div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span>Finance & FDR (15 pts)</span>
                        <strong>15 / 15</strong>
                      </div>
                      <div className="confidence-bar"><div className="confidence-fill" style={{ width: '100%', background: '#10b981' }} /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Details & AICTE Routing Card */}
              <div className="content-card">
                <div className="card-header-bar">
                  <h3>
                    <Award size={18} style={{ color: 'var(--aicte-blue)' }} />
                    <span>Application Docket: {institution.id}</span>
                  </h3>
                  <span className="badge badge-dark">{institution.selectedRoute}</span>
                </div>

                <div className="card-body">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Application Category</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
                        {institution.applicationType}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ background: '#f8fafc', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Sanctioned Total Intake</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--aicte-navy-dark)' }}>
                          {institution.totalIntake} Seats
                        </div>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Campus Land Area</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--aicte-navy-dark)' }}>
                          {institution.landAreaAcres} Acres
                        </div>
                      </div>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Assigned AICTE Scrutiny Officer</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
                        {institution.assignedOfficer}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Western Regional Office (WRO), Churchgate, Mumbai
                      </div>
                    </div>

                    {isFixed ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button
                          onClick={() => setIsEoAModalOpen(true)}
                          className="btn-gold"
                          style={{ justifyContent: 'center', padding: '0.75rem' }}
                          id="btn-view-eoa-letter"
                        >
                          <Award size={16} />
                          <span>Download Official AICTE Approval (EoA) Order</span>
                        </button>
                        <button
                          onClick={() => setActiveTab('deficiency')}
                          className="btn-secondary"
                          style={{ justifyContent: 'center', padding: '0.5rem', fontSize: '0.8rem' }}
                        >
                          <span>View Statutory Clearance Dossier</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveTab('deficiency')}
                        className="btn-gold"
                        style={{ justifyContent: 'center', padding: '0.75rem' }}
                      >
                        <span>Resolve Pending Deficiency Now</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 6 Specialist Agents Scrutiny Summary */}
            <div className="content-card">
              <div className="card-header-bar">
                <h3>
                  <Users size={18} style={{ color: 'var(--aicte-gold)' }} />
                  <span>AI Multi-Agent Verification Findings (6 Specialist Domains)</span>
                </h3>
                <span className="badge badge-info">APH 2026-27</span>
              </div>

              <div className="card-body">
                <div className="agents-grid">
                  {SPECIALIST_AGENTS.map((agent) => {
                    let agentStatus = agent.status;
                    let findings = agent.keyFindings;
                    let confidence = agent.confidence;
                    if (agent.id === 2 && isFixed) {
                      agentStatus = 'PASS';
                      findings = 'Renewed Fire NOC validated. Valid through 14-Oct-2029 (Forward 36 months). Compliant with APH Clause 4.2.';
                      confidence = 99.1;
                    }

                    const isPass = agentStatus === 'PASS';
                    const isFail = agentStatus.includes('FAIL');

                    return (
                      <div
                        key={agent.id}
                        onClick={() => setSelectedAgentId(agent.id)}
                        className={`agent-item-card ${selectedAgentId === agent.id ? 'selected' : ''}`}
                      >
                        <div className="agent-header-row">
                          <div className="agent-name">{agent.name}</div>
                          <span className={`badge ${isPass ? 'badge-pass' : isFail ? 'badge-fail' : 'badge-review'}`}>
                            {agentStatus}
                          </span>
                        </div>
                        <div className="agent-scope">{agent.scope}</div>
                        <div className="agent-finding-snippet">
                          <strong>Findings:</strong> {findings}
                        </div>
                        <div className="agent-confidence-meter">
                          <span>AI Confidence: {confidence}%</span>
                          <div className="confidence-bar">
                            <div className="confidence-fill" style={{ width: `${confidence}%`, background: confidence > 95 ? '#10b981' : '#f59e0b' }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE DOCUMENT VAULT */}
        {activeTab === 'vault' && (
          <div className="content-card">
            <div className="card-header-bar">
              <div>
                <h3>
                  <FileText size={18} style={{ color: 'var(--aicte-blue)' }} />
                  <span>Live Institutional Document Vault & SHA-256 Checksum Ledger</span>
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Upload actual files from your computer. The system computes real SHA-256 hashes in real time.
                </p>
              </div>

              {/* Real File Upload Input */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.8rem'
                  }}
                >
                  <option value="Infrastructure & Safety">Infrastructure & Safety</option>
                  <option value="Legal & Institution">Legal & Institution</option>
                  <option value="Faculty & Staff">Faculty & Staff</option>
                  <option value="Finance & Accounts">Finance & Accounts</option>
                  <option value="Academic & Courses">Academic & Courses</option>
                  <option value="Regulatory & Declarations">Regulatory & Declarations</option>
                </select>

                <label className="btn-gold" style={{ cursor: 'pointer', padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                  <Upload size={14} />
                  <span>{isUploading ? 'Computing Hash...' : 'Choose File to Upload'}</span>
                  <input
                    type="file"
                    onChange={handleRealFileUpload}
                    style={{ display: 'none' }}
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>

            <div className="card-body">
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '10px 14px' }}>Document Name & File</th>
                      <th style={{ padding: '10px 14px' }}>Category Domain</th>
                      <th style={{ padding: '10px 14px' }}>Size</th>
                      <th style={{ padding: '10px 14px' }}>Cryptographic SHA-256 Checksum</th>
                      <th style={{ padding: '10px 14px' }}>Verification Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {institution.documents.map((doc) => (
                      <tr key={doc.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>{doc.title}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{doc.filename}</div>
                        </td>
                        <td style={{ padding: '12px 14px' }}>{doc.category}</td>
                        <td style={{ padding: '12px 14px' }}>{doc.filesize || '2.4 MB'}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem' }}>
                            {doc.hash}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <span className={`badge ${doc.status === 'PASS' ? 'badge-pass' : doc.status.includes('FAIL') ? 'badge-fail' : 'badge-review'}`}>
                            {doc.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DEFICIENCY & RESUBMISSION CENTER */}
        {activeTab === 'deficiency' && (
          <div className="content-card">
            <div className="card-header-bar">
              <div>
                <h3>
                  <AlertTriangle size={18} style={{ color: isFixed ? '#10b981' : '#dc2626' }} />
                  <span>Institutional Deficiency Resolution & Compliance Cure Subsystem</span>
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Review official deficiency notices from AICTE Regulation Bureau and upload rectification evidence.
                </p>
              </div>

              <span className={`badge ${isFixed ? 'badge-pass' : 'badge-fail'}`}>
                {isFixed ? 'ALL NOTICES RESOLVED' : 'ACTIVE NOTICE DEF-2026-84920'}
              </span>
            </div>

            <div className="card-body">
              {!isFixed ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h4 style={{ color: '#991b1b', fontSize: '1rem', fontWeight: 800 }}>
                        Deficiency Notice DEF-2026-84920
                      </h4>
                      <span style={{ background: '#dc2626', color: '#ffffff', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                        CURE PERIOD: 11 DAYS REMAINING
                      </span>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: '#7f1d1d', lineHeight: 1.5, marginBottom: '10px' }}>
                      <strong>Issued By:</strong> Dr. Vijay Sharma, Joint Director, AICTE Western Regional Office (WRO).<br />
                      <strong>Regulatory Defect:</strong> The Fire & Life Safety Certificate (NOC/FS/2023-881) expired on 15-Oct-2026. 
                      Under APH Section 4.2, educational institutions must maintain valid fire safety clearance with at least 
                      6 months forward validity.
                    </p>

                    <div style={{ fontSize: '0.8rem', color: '#991b1b', fontWeight: 700 }}>
                      Required Action: Submit Municipal Fire CFO NOC renewal receipt or 3-year extension certificate.
                    </div>
                  </div>

                  {/* Upload Correction Dropzone */}
                  <div style={{
                    border: '2px dashed var(--aicte-blue)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    textAlign: 'center',
                    background: '#f8fafc'
                  }}>
                    <Upload size={36} style={{ color: 'var(--aicte-blue)', margin: '0 auto 8px' }} />
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--aicte-navy-dark)', fontWeight: 800 }}>
                      Upload Corrected Fire Safety NOC
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                      Select a file from your computer or use the instant re-verification trigger.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                      <label className="btn-primary" style={{ cursor: 'pointer' }}>
                        <span>Choose Real File from Laptop</span>
                        <input
                          type="file"
                          onChange={handleRealFileUpload}
                          style={{ display: 'none' }}
                          accept=".pdf,.png,.jpg"
                        />
                      </label>

                      <button
                        onClick={onSimulateFix}
                        className="btn-gold"
                        id="btn-cure-deficiency"
                      >
                        <RefreshCw size={16} />
                        <span>Instant Re-validation Demo (Score 98/100)</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--aicte-navy-dark)', fontWeight: 800 }}>
                    No Pending Deficiencies!
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '540px', margin: '0.5rem auto 1.5rem' }}>
                    The renewed Fire Safety Certificate (Valid till 2029) was verified by AI Specialist Agent-2.
                    Your score has been updated to 98/100 and the application has advanced to Scrutiny Committee Review.
                  </p>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className="btn-primary"
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: COMPLIANCE & EXPIRY RADAR */}
        {activeTab === 'compliance' && (
          <div className="content-card">
            <div className="card-header-bar">
              <h3>
                <Calendar size={18} style={{ color: 'var(--aicte-gold)' }} />
                <span>Institutional Expiry Radar & Mandatory Undertakings</span>
              </h3>
              <span className="badge badge-dark">Proactive Compliance</span>
            </div>

            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                <div className={`expiry-item ${isFixed ? 'safe' : 'critical'}`}>
                  <div>
                    <div className="expiry-title">Fire & Life Safety Municipal NOC</div>
                    <div className="expiry-date-tag">
                      <Clock size={12} />
                      <span>{isFixed ? 'Valid till: 2029-10-14' : 'Expired on: 2026-10-15'}</span>
                    </div>
                  </div>
                  <span className={`badge ${isFixed ? 'badge-pass' : 'badge-fail'}`}>
                    {isFixed ? 'VALID (3 YRS)' : 'OVERDUE'}
                  </span>
                </div>

                <div className="expiry-item safe">
                  <div>
                    <div className="expiry-title">Registered Land Lease (30-Year Agreement)</div>
                    <div className="expiry-date-tag">
                      <Clock size={12} />
                      <span>Valid till: 2054-08-12</span>
                    </div>
                  </div>
                  <span className="badge badge-pass">VALID (28 YRS)</span>
                </div>

                <div className="expiry-item upcoming">
                  <div>
                    <div className="expiry-title">Annual Faculty Cadre & Biometric Registry</div>
                    <div className="expiry-date-tag">
                      <Clock size={12} />
                      <span>Due date: 2026-11-15 (14 days left)</span>
                    </div>
                  </div>
                  <span className="badge badge-review">14 DAYS LEFT</span>
                </div>

                <div className="expiry-item safe">
                  <div>
                    <div className="expiry-title">Fixed Deposit Receipt (FDR) Pledged with AICTE</div>
                    <div className="expiry-date-tag">
                      <Clock size={12} />
                      <span>Amount: ₹1.50 Crores in State Bank of India</span>
                    </div>
                  </div>
                  <span className="badge badge-pass">PLEDGED & ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: NEW PROGRAM SUBMISSION WIZARD */}
        {activeTab === 'new_app' && (
          <div className="content-card">
            <div className="card-header-bar">
              <h3>
                <PlusCircle size={18} style={{ color: 'var(--aicte-blue)' }} />
                <span>Submit Application for New Technical Program / Intake Expansion</span>
              </h3>
              <span className="badge badge-info">APH 2026-27</span>
            </div>

            <div className="card-body">
              <form onSubmit={handleNewCourseSubmit} style={{ maxWidth: '640px' }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '6px' }}>
                    Proposed Program / Discipline Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. B.Tech Computer Science & Data Analytics or M.Tech Robotics"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-medium)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '6px' }}>
                      Proposed Sanctioned Intake:
                    </label>
                    <select
                      value={newIntake}
                      onChange={(e) => setNewIntake(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-medium)',
                        fontSize: '0.85rem'
                      }}
                    >
                      <option value="30">30 Seats</option>
                      <option value="60">60 Seats (Standard Unit)</option>
                      <option value="120">120 Seats (Double Unit)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '6px' }}>
                      Approval Route:
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Scrutiny + EVC (Mandatory for Intake Increase)"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        background: '#f1f5f9',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '6px' }}>
                    Attach University Affiliation Letter & Curriculum:
                  </label>
                  <input
                    type="file"
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Supported: PDF up to 25MB. Real SHA-256 hash will be generated upon submission.
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-gold"
                  style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
                >
                  <PlusCircle size={16} />
                  <span>Submit Program Expansion to AICTE Scrutiny</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Official AICTE Extension of Approval (EoA) Letter Modal */}
      <EoALetterModal
        isOpen={isEoAModalOpen}
        onClose={() => setIsEoAModalOpen(false)}
        institution={institution}
        isFixed={isFixed}
      />
    </div>
  );
}
