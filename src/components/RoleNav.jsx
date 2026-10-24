import React from 'react';
import { 
  Building, 
  ShieldAlert, 
  ClipboardCheck, 
  GitCommit, 
  Sliders, 
  UploadCloud, 
  BellRing, 
  CalendarCheck2 
} from 'lucide-react';

export function RoleNav({ 
  activeRole, 
  setActiveRole, 
  onSimulateFix, 
  onTriggerEscalation,
  onOpenEVCScheduler,
  isFixed
}) {
  const roles = [
    {
      id: 'institution',
      label: 'Institution Portal',
      icon: Building,
      badge: isFixed ? 'Pass (98/100)' : 'Deficiency (82/100)',
      badgeType: isFixed ? 'pass' : 'fail'
    },
    {
      id: 'officer',
      label: 'Regional Bureau Officer',
      icon: ShieldAlert,
      badge: '50 Overdue Pendency',
      badgeType: 'review'
    },
    {
      id: 'committee',
      label: 'Scrutiny & EVC Committee',
      icon: ClipboardCheck,
      badge: 'Statutory Review',
      badgeType: 'info'
    },
    {
      id: 'audit',
      label: 'GitHub Audit Trail',
      icon: GitCommit,
      badge: 'Append-Only Ledger',
      badgeType: 'purple'
    },
    {
      id: 'workflow',
      label: 'Workflow Configurator',
      icon: Sliders,
      badge: 'APH Rules Engine',
      badgeType: 'neutral'
    }
  ];

  return (
    <nav className="role-nav-ribbon">
      <div className="role-nav-container">
        {/* Role Tabs */}
        <div className="role-tabs">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = activeRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`role-tab-btn ${isActive ? 'active' : ''}`}
                id={`tab-${role.id}`}
              >
                <Icon size={16} />
                <span>{role.label}</span>
                <span className="role-badge">
                  {role.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Demo Scenario Triggers */}
        <div className="nav-actions">
          {!isFixed ? (
            <button
              onClick={onSimulateFix}
              className="btn-gold"
              title="Demonstrate automatic re-verification and deficiency clearance"
              id="btn-simulate-fix"
            >
              <UploadCloud size={15} />
              <span>Simulate Fix (Upload Renewed NOC)</span>
            </button>
          ) : (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: 'var(--radius-md)',
              color: '#10b981',
              fontSize: '0.8rem',
              fontWeight: 700
            }}>
              ✓ Deficiencies Resolved (98/100)
            </div>
          )}

          <button
            onClick={onTriggerEscalation}
            className="btn-outline-light"
            title="Demonstrate deadline monitor triggering automated escalation alert"
            id="btn-simulate-escalate"
          >
            <BellRing size={14} style={{ color: 'var(--aicte-gold)' }} />
            <span>Test Overdue Alert</span>
          </button>

          <button
            onClick={onOpenEVCScheduler}
            className="btn-outline-light"
            title="Schedule Expert Visiting Committee inspection"
            id="btn-open-evc-scheduler"
          >
            <CalendarCheck2 size={14} style={{ color: '#38bdf8' }} />
            <span>Schedule EVC</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
