import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Layers, 
  Users, 
  BarChart3, 
  ClipboardCheck, 
  Calendar, 
  GitCommit, 
  Sliders, 
  LogOut, 
  BellRing, 
  CalendarCheck2, 
  CheckCircle, 
  AlertTriangle, 
  Eye, 
  Building,
  ArrowRight
} from 'lucide-react';
import { OfficerDashboard } from './OfficerDashboard';
import { CommitteeReviewerView } from './CommitteeReviewerView';
import { AuditTrailView } from './AuditTrailView';
import { WorkflowConfigView } from './WorkflowConfigView';
import { EVCSchedulerModal } from './EVCSchedulerModal';
import { EoALetterModal } from './EoALetterModal';

export function AdminPortalShell({ 
  currentUser, 
  institutions, 
  selectedInstitution, 
  setSelectedInstitution, 
  commits, 
  onAddAuditCommit, 
  isFixed, 
  onSimulateFix, 
  onLogout,
  showToast 
}) {
  const [adminTab, setAdminTab] = useState('dashboard'); // dashboard, queue, evc_deploy, escalations, audit, config
  const [isEVCSchedulerOpen, setIsEVCSchedulerOpen] = useState(false);
  const [isEoAModalOpen, setIsEoAModalOpen] = useState(false);

  // Safe active institution fallback
  const activeInst = selectedInstitution || (institutions && institutions.length > 0 ? institutions[0] : {
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
    assignedOfficer: "Dr. Vijay Sharma (Joint Director, WRO Mumbai)"
  });

  // Trigger Overdue Escalation Alert
  const handleTriggerEscalation = () => {
    const timestamp = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST';
    const alertCommit = {
      id: `commit-${Date.now()}`,
      hash: 'fa208c9',
      prevHash: commits[0]?.hash || 'e00511a',
      timestamp,
      actor: `Regulation Bureau Director (${currentUser.name})`,
      role: 'AICTE Executive Directorate',
      type: 'DEADLINE_ESCALATION_TRIGGER',
      stage: 'Continuous Monitoring & Accountability',
      message: 'Dispatched Level 2 Automated Escalation Notice to Regional Director & Principal',
      details: 'Fire Safety Certificate expiry threshold triggered automated SMS, push notice, and registered dispatch to Regional Officer Dr. Vijay Sharma.',
      verified: true,
      signature: 'GPG-VERIFIED-AICTE-GOV-IN'
    };

    onAddAuditCommit(alertCommit);

    showToast(
      '⚠️ Automated Escalation Alert Fired!',
      'SMS & Email dispatch recorded to Regional Director (WRO) and Institutional Management.',
      'alert',
      'sha256:fa208c9...'
    );
  };

  // Schedule EVC Complete
  const handleScheduleEVCComplete = ({ date, mode, panellists }) => {
    const timestamp = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST';
    const evcCommit = {
      id: `commit-${Date.now()}`,
      hash: 'c8812e4',
      prevHash: commits[0]?.hash || 'e00511a',
      timestamp,
      actor: `${currentUser.name} (AICTE Bureau Director)`,
      role: 'AICTE Regional Directorate',
      type: 'EVC_SCHEDULED',
      stage: 'EVC Inspection',
      message: `Issued Digital Inspection Order for ${date} (${mode})`,
      details: `3-Member Panellist assigned: ${Array.isArray(panellists) ? panellists.map(p => `${p.name} (${p.role})`).join('; ') : 'Academic, Industry & AICTE experts'}. Verified free of conflict of interest.`,
      verified: true,
      signature: 'GPG-VERIFIED-AICTE-GOV-IN'
    };

    onAddAuditCommit(evcCommit);

    showToast(
      '📅 EVC Inspection Scheduled',
      `Inspection scheduled for ${date}. 3-member neutral panellist notified.`,
      'success',
      'sha256:c8812e4...'
    );
  };

  return (
    <div className="admin-portal-shell">
      {/* Officer Authenticated Bar */}
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
            background: 'linear-gradient(135deg, var(--aicte-navy-dark), #0f3b73)',
            color: 'var(--aicte-gold)',
            fontWeight: 800,
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            HQ
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--aicte-navy-dark)', margin: 0 }}>
                {currentUser.name}
              </h3>
              <span className="badge badge-dark">
                {currentUser.designation}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              <span>Jurisdiction: <strong>{currentUser.region}</strong></span>
              <span>•</span>
              <span>Regulation Bureau (National Administration)</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setIsEVCSchedulerOpen(true)}
            className="btn-gold"
            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
          >
            <CalendarCheck2 size={14} />
            <span>Deploy EVC Panel</span>
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
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Admin Portal Sub-Navigation Ribbon */}
      <div style={{
        background: 'var(--aicte-navy-darkest)',
        padding: '0 2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '1440px', margin: '0 auto', overflowX: 'auto' }}>
          {[
            { id: 'dashboard', label: 'Pan-India Executive Dashboard & Regional Heatmaps', icon: BarChart3 },
            { id: 'queue', label: `National Application Docket (${institutions.length})`, icon: ClipboardCheck },
            { id: 'audit', label: `Cryptographic Audit Ledger (${commits.length})`, icon: GitCommit },
            { id: 'config', label: 'APH Regulatory Rules & Scoring Weights', icon: Sliders }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id)}
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

      {/* Main Tab View */}
      <div className="app-container" style={{ paddingTop: '1.5rem' }}>
        {/* TAB 1: EXECUTIVE DASHBOARD (DEFAULT FOR ADMIN) */}
        {adminTab === 'dashboard' && (
          <OfficerDashboard
            institutions={institutions}
            onTriggerEscalation={handleTriggerEscalation}
            onOpenEVCScheduler={() => setIsEVCSchedulerOpen(true)}
            isFixed={isFixed}
          />
        )}

        {/* TAB 2: NATIONAL DOCKET & CASE ALLOCATION */}
        {adminTab === 'queue' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', marginBottom: '8px' }}>
                Select Institution from National Docket:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                {(institutions || []).map(inst => {
                  const isSelected = activeInst?.id === inst.id;
                  const isCurFixed = inst.id === 'AICTE-2026-REG-84920' ? isFixed : (inst.status === 'APPROVED');
                  return (
                    <div
                      key={inst.id}
                      onClick={() => setSelectedInstitution(inst)}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        background: isSelected ? '#ffffff' : '#f8fafc',
                        border: `2px solid ${isSelected ? 'var(--aicte-blue)' : 'var(--border-subtle)'}`,
                        boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--aicte-navy-dark)' }}>
                          {inst.name}
                        </div>
                        <span className={`badge ${isCurFixed ? 'badge-pass' : 'badge-fail'}`}>
                          {isCurFixed ? 'CLEARED' : 'DEFICIENCY'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        PID: <strong>{inst.pid}</strong> • {inst.location}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.75rem' }}>
                        <span>Route: <strong>{inst.selectedRoute}</strong></span>
                        <strong style={{ color: isCurFixed ? '#10b981' : '#dc2626' }}>
                          Score: {isCurFixed ? '98/100' : `${inst.priorityScore}/100`}
                        </strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Institution Case Summary */}
            <div className="content-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--aicte-navy-dark)' }}>
                    Regulatory Docket: {activeInst?.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Application ID: <strong>{activeInst?.id}</strong> • Region: <strong>{activeInst?.region}</strong>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setIsEoAModalOpen(true)}
                    className="btn-secondary"
                    style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                    id="btn-admin-view-eoa"
                  >
                    <Award size={15} style={{ color: 'var(--aicte-gold)' }} />
                    <span>Inspect Council EoA Order</span>
                  </button>
                  <button
                    onClick={() => setIsEVCSchedulerOpen(true)}
                    className="btn-gold"
                    style={{ fontSize: '0.8rem' }}
                  >
                    <CalendarCheck2 size={15} />
                    <span>Deploy EVC Panel</span>
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Approval Pathway</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--aicte-navy-dark)' }}>{activeInst?.selectedRoute}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current Status</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: (isFixed && activeInst?.id === 'AICTE-2026-REG-84920') || activeInst?.status === 'APPROVED' ? '#10b981' : '#dc2626' }}>
                    {(isFixed && activeInst?.id === 'AICTE-2026-REG-84920') || activeInst?.status === 'APPROVED' ? 'Compliant / Approved' : activeInst?.status}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sanctioned Intake</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--aicte-navy-dark)' }}>{activeInst?.totalIntake} Seats</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Assigned Officer</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--aicte-navy-dark)' }}>{activeInst?.assignedOfficer}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AUDIT TRAIL */}
        {adminTab === 'audit' && (
          <AuditTrailView
            commits={commits || []}
            institution={activeInst}
          />
        )}

        {/* TAB 4: CONFIGURATOR */}
        {adminTab === 'config' && (
          <WorkflowConfigView />
        )}
      </div>

      {/* EVC Modal */}
      <EVCSchedulerModal
        isOpen={isEVCSchedulerOpen}
        onClose={() => setIsEVCSchedulerOpen(false)}
        onScheduleComplete={handleScheduleEVCComplete}
        institution={activeInst}
        institutions={institutions}
      />

      {/* Official AICTE Extension of Approval (EoA) Letter Modal */}
      <EoALetterModal
        isOpen={isEoAModalOpen}
        onClose={() => setIsEoAModalOpen(false)}
        institution={activeInst}
        isFixed={isFixed}
      />
    </div>
  );
}
