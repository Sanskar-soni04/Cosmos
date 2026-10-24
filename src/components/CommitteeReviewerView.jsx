import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  ShieldCheck, 
  FileWarning, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Send, 
  MessageSquare, 
  Award,
  CalendarCheck,
  Building
} from 'lucide-react';
import { SPECIALIST_AGENTS } from '../data/mockData';

export function CommitteeReviewerView({ 
  institution, 
  isFixed, 
  onSimulateFix, 
  onApproveScrutiny,
  onOpenEVCScheduler 
}) {
  const [committeeNotes, setCommitteeNotes] = useState(
    'Fire Safety NOC deficiency verified against Municipal portal records. Institutional cure period in progress. Once renewed certificate is submitted and verified by Agent-2, committee will endorse EVC inspection.'
  );
  const [coiDeclared, setCoiDeclared] = useState(true);
  const [selectedDecision, setSelectedDecision] = useState(isFixed ? 'RECOMMEND_EVC' : 'DEFICIENCY_NOTICE');

  return (
    <div className="committee-reviewer-container">
      {/* Human Review Safeguard Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f2b5c 0%, #173d7a 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.75rem',
        marginBottom: '1.75rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--aicte-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
            AICTE Scrutiny & Expert Committee Evaluation Terminal
          </div>
          <h3 style={{ color: '#ffffff', fontSize: '1.25rem', marginTop: '2px' }}>
            Authorised Human Scrutiny & Statutory Oversight
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.82rem', marginTop: '4px' }}>
            Empowered by AI evidence extraction, human reviewers make final statutory determinations as required by the AICTE Act.
          </p>
        </div>

        {/* Conflict of Interest Check Badge */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          textAlign: 'right'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 700, fontSize: '0.82rem' }}>
            <ShieldCheck size={16} />
            <span>Conflict of Interest Check: CLEARED</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '2px' }}>
            Reviewer: Prof. Dr. S. K. Mahajan (Neutral Regional Panellist)
          </div>
        </div>
      </div>

      <div className="grid-2col">
        {/* Left: 6-Agent AI Checklist Evaluation */}
        <div className="content-card">
          <div className="card-header-bar">
            <h3>
              <ClipboardCheck size={18} style={{ color: 'var(--aicte-gold)' }} />
              <span>Multi-Agent Findings Scrutiny Matrix</span>
            </h3>
            <span className="badge badge-info">APH 2026-27 Checklist</span>
          </div>

          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {SPECIALIST_AGENTS.map((agent) => {
                let agentStatus = agent.status;
                let findings = agent.keyFindings;
                if (agent.id === 2 && isFixed) {
                  agentStatus = 'PASS';
                  findings = 'Renewed Fire NOC validated. Valid through 14-Oct-2029. Compliant with APH Clause 4.2.';
                }

                const isPass = agentStatus === 'PASS';
                const isFail = agentStatus.includes('FAIL');

                return (
                  <div
                    key={agent.id}
                    style={{
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.9rem',
                      background: isFail ? '#fef2f2' : isPass ? '#f8fafc' : '#fffbeb'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
                        {agent.name}
                      </span>
                      <span className={`badge ${isPass ? 'badge-pass' : isFail ? 'badge-fail' : 'badge-review'}`}>
                        {agentStatus}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      {findings}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      <span>Citation: <strong>{agent.citation}</strong></span>
                      <span>Confidence: <strong>{agent.id === 2 && isFixed ? 99.1 : agent.confidence}%</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Statutory Committee Actions & Recording of Decision */}
        <div className="content-card">
          <div className="card-header-bar">
            <h3>
              <Award size={18} style={{ color: 'var(--aicte-blue)' }} />
              <span>Statutory Decision & EVC Recommendation</span>
            </h3>
            <span className="badge badge-dark">Recordable Decision</span>
          </div>

          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Radio options for statutory decision */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '8px' }}>
                  Select Committee Action:
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    background: isFixed ? 'rgba(16, 185, 129, 0.08)' : '#ffffff',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      name="decision"
                      value="RECOMMEND_EVC"
                      checked={selectedDecision === 'RECOMMEND_EVC'}
                      onChange={() => setSelectedDecision('RECOMMEND_EVC')}
                      disabled={!isFixed}
                    />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
                        Clear Scrutiny & Recommend for EVC Inspection
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        All 6 domains verified compliant. Authorizes 3-member Expert Committee site audit.
                      </div>
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    background: !isFixed ? 'rgba(239, 68, 68, 0.08)' : '#ffffff',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      name="decision"
                      value="DEFICIENCY_NOTICE"
                      checked={selectedDecision === 'DEFICIENCY_NOTICE'}
                      onChange={() => setSelectedDecision('DEFICIENCY_NOTICE')}
                    />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#dc2626' }}>
                        Issue Formal Deficiency Notice (15-Day Cure Period)
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Halts progression until mandatory Fire Safety NOC is resubmitted.
                      </div>
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    background: '#ffffff',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      name="decision"
                      value="REFER_SAC"
                      checked={selectedDecision === 'REFER_SAC'}
                      onChange={() => setSelectedDecision('REFER_SAC')}
                    />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
                        Refer to Standing Appellate Committee (SAC)
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        For legal disputes or interpretation ambiguities.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Committee Observations Textarea */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '6px' }}>
                  Statutory Observations & Notes:
                </label>
                <textarea
                  value={committeeNotes}
                  onChange={(e) => setCommitteeNotes(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.82rem',
                    color: '#0f172a',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              {isFixed ? (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={onApproveScrutiny}
                    className="btn-gold"
                    style={{ flex: 1, justifyContent: 'center' }}
                    id="btn-endorse-scrutiny"
                  >
                    <CheckCircle size={16} />
                    <span>Endorse Scrutiny & Proceed to EVC</span>
                  </button>

                  <button
                    onClick={onOpenEVCScheduler}
                    className="btn-primary"
                    style={{ justifyContent: 'center' }}
                    id="btn-schedule-evc"
                  >
                    <CalendarCheck size={16} />
                    <span>Schedule EVC</span>
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={onSimulateFix}
                    className="btn-secondary"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <span>Simulate Institution Resolving NOC</span>
                  </button>

                  <button
                    onClick={() => alert("Deficiency Notice DEF-2026-84920 re-dispatched to Aryabhata Institute via Email & SMS.")}
                    className="btn-primary"
                    style={{ background: '#dc2626' }}
                  >
                    <Send size={15} />
                    <span>Send Notice</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
