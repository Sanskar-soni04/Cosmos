import React, { useState } from 'react';
import { 
  Sliders, 
  ShieldCheck, 
  Settings, 
  Save, 
  RotateCcw, 
  Check, 
  ToggleLeft, 
  ToggleRight, 
  HelpCircle,
  Cpu,
  FileCheck2
} from 'lucide-react';

export function WorkflowConfigView() {
  const [weights, setWeights] = useState({
    legal: 20,
    infrastructure: 20,
    faculty: 25,
    finance: 15,
    academic: 10,
    regulatory: 10
  });

  const [hardGates, setHardGates] = useState({
    fireNoc: true,
    landTitle: true,
    facultyRatio: true,
    securityDeposit: true
  });

  const [cureDays, setCureDays] = useState(15);
  const [escalationDays, setEscalationDays] = useState(3);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleWeightChange = (key, val) => {
    setWeights(prev => ({ ...prev, [key]: parseInt(val) || 0 }));
  };

  const toggleGate = (key) => {
    setHardGates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="workflow-config-container">
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #071e3d 0%, #0d3b66 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.75rem',
        marginBottom: '1.75rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--aicte-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
            System Administrator & Policy Configuration Subsystem
          </div>
          <h3 style={{ color: '#ffffff', fontSize: '1.25rem', marginTop: '2px' }}>
            Configurable Rules, Weights & Mandatory Gates Engine
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.82rem', marginTop: '4px' }}>
            Adjust Approval Process Handbook (APH) priority score calculations, statutory override gates, and automated alert SLAs.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="btn-gold"
          id="btn-save-config"
        >
          {savedSuccess ? <Check size={16} /> : <Save size={16} />}
          <span>{savedSuccess ? 'Rules Updated!' : 'Save & Publish Rules'}</span>
        </button>
      </div>

      <div className="grid-2col">
        {/* Priority Score Weight Allocation */}
        <div className="content-card">
          <div className="card-header-bar">
            <h3>
              <Sliders size={18} style={{ color: 'var(--aicte-gold)' }} />
              <span>Priority Score Weight Allocation (Must Equal 100%)</span>
            </h3>
            <span className={`badge ${totalWeight === 100 ? 'badge-pass' : 'badge-fail'}`}>
              Total: {totalWeight}%
            </span>
          </div>

          <div className="card-body">
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Define the percentage impact of each specialist agent check towards the aggregate 100-point institutional rating.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <strong>Agent 1: Legal & Land Title Ownership</strong>
                  <span style={{ color: 'var(--aicte-blue)', fontWeight: 700 }}>{weights.legal}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={weights.legal}
                  onChange={(e) => handleWeightChange('legal', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--aicte-gold)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <strong>Agent 2: Infrastructure & Fire Safety</strong>
                  <span style={{ color: 'var(--aicte-blue)', fontWeight: 700 }}>{weights.infrastructure}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={weights.infrastructure}
                  onChange={(e) => handleWeightChange('infrastructure', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--aicte-gold)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <strong>Agent 3: Faculty Cadre Ratio & Pay Scales</strong>
                  <span style={{ color: 'var(--aicte-blue)', fontWeight: 700 }}>{weights.faculty}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={weights.faculty}
                  onChange={(e) => handleWeightChange('faculty', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--aicte-gold)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <strong>Agent 4: Finance, Audited Balance & Security FDR</strong>
                  <span style={{ color: 'var(--aicte-blue)', fontWeight: 700 }}>{weights.finance}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={weights.finance}
                  onChange={(e) => handleWeightChange('finance', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--aicte-gold)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <strong>Agent 5: Academic Curricula, Lab & Library</strong>
                  <span style={{ color: 'var(--aicte-blue)', fontWeight: 700 }}>{weights.academic}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  value={weights.academic}
                  onChange={(e) => handleWeightChange('academic', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--aicte-gold)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <strong>Agent 6: Anti-Ragging & Regulatory Undertakings</strong>
                  <span style={{ color: 'var(--aicte-blue)', fontWeight: 700 }}>{weights.regulatory}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  value={weights.regulatory}
                  onChange={(e) => handleWeightChange('regulatory', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--aicte-gold)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Statutory Override Gates */}
        <div className="content-card">
          <div className="card-header-bar">
            <h3>
              <ShieldCheck size={18} style={{ color: 'var(--aicte-blue)' }} />
              <span>Mandatory Statutory Gates (Non-Override Rules)</span>
            </h3>
            <span className="badge badge-dark">Statutory Hard Gate</span>
          </div>

          <div className="card-body">
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              When enabled, a failure in these requirements instantly locks the application in DEFICIENCY_FLAGGED,
              blocking stage transition regardless of a high numerical priority score.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div 
                onClick={() => toggleGate('fireNoc')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: hardGates.fireNoc ? 'rgba(16, 185, 129, 0.08)' : '#f8fafc',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
                    Fire & Life Safety NOC Expiry Hard Gate
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Requires at least 6 months forward validity. Blocks Scrutiny passage if expired.
                  </div>
                </div>
                <div style={{ color: hardGates.fireNoc ? '#10b981' : '#94a3b8' }}>
                  {hardGates.fireNoc ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </div>
              </div>

              <div 
                onClick={() => toggleGate('landTitle')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: hardGates.landTitle ? 'rgba(16, 185, 129, 0.08)' : '#f8fafc',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
                    Land Title Deed & 30-Year Registered Lease Gate
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Prevents approval if land is mortgaged without AICTE NOC.
                  </div>
                </div>
                <div style={{ color: hardGates.landTitle ? '#10b981' : '#94a3b8' }}>
                  {hardGates.landTitle ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </div>
              </div>

              <div 
                onClick={() => toggleGate('facultyRatio')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: hardGates.facultyRatio ? 'rgba(16, 185, 129, 0.08)' : '#f8fafc',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
                    Mandatory Student-Faculty Ratio (1:15 or 1:20 norm)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Enforces cadre ratio Professor : Associate : Assistant of 1:2:6.
                  </div>
                </div>
                <div style={{ color: hardGates.facultyRatio ? '#10b981' : '#94a3b8' }}>
                  {hardGates.facultyRatio ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </div>
              </div>
            </div>

            {/* Notification & SLA Parameters */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--aicte-navy-dark)' }}>
                Automated Escalation Timers
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Institutional Cure Period:
                  </label>
                  <input
                    type="number"
                    value={cureDays}
                    onChange={(e) => setCureDays(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-medium)',
                      fontSize: '0.85rem'
                    }}
                  />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Days before rejection recommendation</span>
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Regional Escalation Notice:
                  </label>
                  <input
                    type="number"
                    value={escalationDays}
                    onChange={(e) => setEscalationDays(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-medium)',
                      fontSize: '0.85rem'
                    }}
                  />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Days before deadline to alert Bureau</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
