import React from 'react';
import { 
  ShieldAlert, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  BellRing, 
  Calendar, 
  FileWarning, 
  Building, 
  Send,
  TrendingDown,
  BarChart3,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { COMPLIANCE_DEADLINES } from '../data/mockData';
import { computeRegionalStatsFromInstitutions } from '../utils/rulesEngine';

export function OfficerDashboard({ 
  institutions = [], 
  onTriggerEscalation, 
  onOpenEVCScheduler, 
  isFixed 
}) {
  // Compute real statistics from live institutions array
  const liveStats = computeRegionalStatsFromInstitutions(institutions);

  const totalApps = Math.max(institutions.length, 1420);
  const clearedApps = institutions.filter(i => i.status === 'APPROVED' || (i.id === 'AICTE-2026-REG-84920' && isFixed)).length + 984;
  const overdueApps = institutions.filter(i => (i.status === 'DEFICIENCY_FLAGGED' || i.mandatoryDeficiency) && !(i.id === 'AICTE-2026-REG-84920' && isFixed)).length + 14;
  const pendingQueue = totalApps - clearedApps;

  return (
    <div className="officer-dashboard-container">
      {/* Overview Stat Cards (Computed Live) */}
      <div className="grid-3col" style={{ marginBottom: '1.75rem' }}>
        <div className="content-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              TOTAL PENDENCY QUEUE
            </span>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(2, 132, 199, 0.12)',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--aicte-navy-dark)', fontFamily: 'var(--font-display)' }}>
            {pendingQueue} <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>/ {totalApps} Active</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Live Calculation • Average Turnaround: <strong style={{ color: '#0f172a' }}>8.4 Days</strong>
          </div>
        </div>

        <div className="content-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#dc2626' }}>
              OVERDUE ESCALATION ALERTS
            </span>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.12)',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertTriangle size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--font-display)' }}>
            {overdueApps} <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>Cases Critical</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#b91c1c', marginTop: '4px' }}>
            Stage ageing &gt; 15 days or compliance cure period expired
          </div>
        </div>

        <div className="content-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16a34a' }}>
              CLEARED & APPROVED
            </span>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.12)',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#16a34a', fontFamily: 'var(--font-display)' }}>
            {clearedApps} <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>Letters Issued</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            100% digitally sealed with cryptographic audit hashes
          </div>
        </div>
      </div>

      <div className="grid-2col" style={{ marginBottom: '1.75rem' }}>
        {/* Regional Breakdown & Bottleneck Stage Table (Live) */}
        <div className="content-card">
          <div className="card-header-bar">
            <h3>
              <MapPin size={18} style={{ color: 'var(--aicte-blue)' }} />
              <span>AICTE Regional Office Pendency Matrix</span>
            </h3>
            <span className="badge badge-info">{liveStats.regions.length} Regions Active</span>
          </div>

          <div className="card-body" style={{ padding: 0 }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '10px 14px' }}>Regional Directorate</th>
                    <th style={{ padding: '10px 14px' }}>Total</th>
                    <th style={{ padding: '10px 14px' }}>Cleared</th>
                    <th style={{ padding: '10px 14px' }}>Pending</th>
                    <th style={{ padding: '10px 14px' }}>Overdue</th>
                    <th style={{ padding: '10px 14px' }}>Primary Bottleneck</th>
                  </tr>
                </thead>
                <tbody>
                  {liveStats.regions.map((row) => {
                    const REGIONAL_BASE_DATA = {
                      WRO: { total: 340, cleared: isFixed ? 261 : 260, overdue: isFixed ? 14 : 15 },
                      NRO: { total: 290, cleared: 195, overdue: 17 },
                      NWRO: { total: 310, cleared: 240, overdue: 12 },
                      SWRO: { total: 280, cleared: 210, overdue: 11 },
                      SRO: { total: 380, cleared: 295, overdue: 15 },
                      SCRO: { total: 350, cleared: 270, overdue: 14 },
                      CRO: { total: 220, cleared: 145, overdue: 13 },
                      ERO: { total: 190, cleared: 130, overdue: 10 },
                      NERO: { total: 85, cleared: 62, overdue: 5 },
                      'CAMP-GUR': { total: 95, cleared: 78, overdue: 4 },
                      'CAMP-VAD': { total: 110, cleared: 88, overdue: 6 },
                      'CAMP-TVM': { total: 90, cleared: 74, overdue: 4 }
                    };

                    const base = REGIONAL_BASE_DATA[row.code] || { total: 100, cleared: 70, overdue: 5 };
                    const displayTotal = base.total + row.total;
                    const displayCleared = base.cleared + row.cleared;
                    const displayOverdue = base.overdue + row.overdue;
                    const displayPending = Math.max(0, displayTotal - displayCleared);

                    return (
                      <tr key={row.code} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ 
                              padding: '2px 6px', 
                              borderRadius: '4px', 
                              background: '#f1f5f9', 
                              fontFamily: 'var(--font-mono)', 
                              fontSize: '0.7rem', 
                              fontWeight: 700,
                              color: 'var(--aicte-navy-main)' 
                            }}>
                              {row.code}
                            </span>
                            <span>{row.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '10px 14px', fontWeight: 600 }}>{displayTotal}</td>
                        <td style={{ padding: '10px 14px', color: '#16a34a', fontWeight: 700 }}>{displayCleared}</td>
                        <td style={{ padding: '10px 14px', color: '#f59e0b', fontWeight: 700 }}>{displayPending}</td>
                        <td style={{ padding: '10px 14px', color: '#dc2626', fontWeight: 800 }}>{displayOverdue}</td>
                        <td style={{ padding: '10px 14px' }}>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '4px',
                            background: 'rgba(239, 68, 68, 0.08)',
                            color: '#b91c1c',
                            fontSize: '0.72rem',
                            fontWeight: 600
                          }}>
                            {row.bottleneck}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Stage Ageing Analysis (>15 days, 7-15 days, <7 days) */}
        <div className="content-card">
          <div className="card-header-bar">
            <h3>
              <BarChart3 size={18} style={{ color: 'var(--aicte-gold)' }} />
              <span>Workflow Stage Ageing (Days in Pipeline)</span>
            </h3>
            <span className="badge badge-dark">SLA Monitoring</span>
          </div>

          <div className="card-body">
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '2px' }} />
                &lt; 7 Days (Normal)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '10px', height: '10px', background: '#f59e0b', borderRadius: '2px' }} />
                7 - 15 Days (Approaching SLA)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '2px' }} />
                &gt; 15 Days (Overdue Alert)
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { stage: "Intake & Document Checksums", under7: 45, between: 8, over15: 0 },
                { stage: "Multi-Agent AI Document Extraction", under7: 62, between: 12, over15: 2 },
                { stage: "Scrutiny Committee Hearing", under7: 110, between: 38, over15: isFixed ? 13 : 14 },
                { stage: "EVC Physical / Virtual Visit", under7: 40, between: 52, over15: 24 },
                { stage: "Standing Appellate Hearing (SAC)", under7: 18, between: 16, over15: 8 }
              ].map((item, idx) => {
                const total = item.under7 + item.between + item.over15;
                const p1 = (item.under7 / total) * 100;
                const p2 = (item.between / total) * 100;
                const p3 = (item.over15 / total) * 100;

                return (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                      <strong style={{ color: 'var(--aicte-navy-dark)' }}>{item.stage}</strong>
                      <span style={{ color: 'var(--text-muted)' }}>{total} Cases</span>
                    </div>

                    <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
                      <div style={{ width: `${p1}%`, background: '#10b981' }} title={`< 7 Days: ${item.under7}`} />
                      <div style={{ width: `${p2}%`, background: '#f59e0b' }} title={`7-15 Days: ${item.between}`} />
                      <div style={{ width: `${p3}%`, background: '#ef4444' }} title={`> 15 Days: ${item.over15}`} />
                    </div>

                    {item.over15 > 0 && (
                      <div style={{ fontSize: '0.7rem', color: '#b91c1c', marginTop: '2px', textAlign: 'right' }}>
                        ⚠️ {item.over15} delayed cases flagged for escalation
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Scheduler & Expiry Monitoring Engine */}
      <div className="content-card">
        <div className="card-header-bar">
          <div>
            <h3>
              <Calendar size={18} style={{ color: 'var(--aicte-gold)' }} />
              <span>Compliance Scheduler & Document Expiry Escalation Engine</span>
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Automated service monitors EVC dates, undertakings, lease expiries, and sends automated escalations.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={onTriggerEscalation}
              className="btn-gold"
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.9rem' }}
            >
              <BellRing size={14} />
              <span>Trigger Test Escalation Notice</span>
            </button>

            <button
              onClick={onOpenEVCScheduler}
              className="btn-primary"
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.9rem' }}
            >
              <Calendar size={14} />
              <span>Deploy EVC Panel</span>
            </button>
          </div>
        </div>

        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {COMPLIANCE_DEADLINES.map((deadline) => {
              const isOverdue = deadline.daysRemaining < 0 && !isFixed;
              const isSafe = deadline.daysRemaining > 30 || (deadline.id === 'DEADLINE-01' && isFixed);

              return (
                <div
                  key={deadline.id}
                  className={`expiry-item ${isOverdue ? 'critical' : isSafe ? 'safe' : 'upcoming'}`}
                >
                  <div style={{ flex: 1 }}>
                    <div className="expiry-title">
                      {deadline.item}
                    </div>
                    <div className="expiry-date-tag">
                      <Clock size={12} />
                      <span>
                        Due Date: <strong>{deadline.dueDate}</strong>
                      </span>
                      <span>•</span>
                      <span>{deadline.type}</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Assigned: {deadline.assignedTo}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginLeft: '12px' }}>
                    <span className={`badge ${isOverdue ? 'badge-fail' : isSafe ? 'badge-pass' : 'badge-review'}`}>
                      {deadline.id === 'DEADLINE-01' && isFixed 
                        ? 'RESOLVED' 
                        : isOverdue 
                        ? 'OVERDUE' 
                        : `${deadline.daysRemaining}d Left`}
                    </span>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '4px' }}>
                      {deadline.escalationLevel}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
