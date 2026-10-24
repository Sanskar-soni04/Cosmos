import React from 'react';
import { 
  Search, 
  ShieldCheck, 
  Cpu, 
  FileCheck2, 
  Flame, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  FileCode2
} from 'lucide-react';

export function WorkflowHero({ searchQuery, setSearchQuery, selectedInstitution, isFixed }) {
  return (
    <section className="workflow-hero">
      <div className="hero-content">
        <div className="hero-subtitle-tag">
          <Sparkles size={14} />
          <span>AICTE Next-Gen Approval Ecosystem • Regulation Bureau</span>
        </div>

        <h2 className="hero-title">
          Smart AI Approval Workflow, <span className="highlight-gold">Deterministic Compliance</span> & Audit Trail
        </h2>

        <p className="hero-desc">
          A unified national automation engine orchestrating 6 specialist AI agents, configurable regulatory routes,
          statutory oversight safeguards, and a tamper-proof GitHub-inspired commit audit history.
        </p>

        {/* Modern Search & Quick Action Bar (styled like NSWS) */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: 'var(--radius-md)',
          padding: '6px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
          maxWidth: '720px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0 12px',
            borderRight: '1px solid #cbd5e1',
            color: 'var(--aicte-navy-dark)',
            fontSize: '0.82rem',
            fontWeight: 700
          }}>
            <span>APH 2026-27</span>
          </div>

          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '0 12px'
          }}>
            <Search size={18} style={{ color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search by Application ID (e.g. AICTE-2026-REG-84920), Institution, or Rule..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '0.88rem',
                color: '#0f172a'
              }}
              id="search-approvals-input"
            />
          </div>

          <button 
            style={{
              background: 'linear-gradient(135deg, var(--aicte-gold) 0%, var(--aicte-gold-hover) 100%)',
              color: '#041022',
              fontWeight: 800,
              fontSize: '0.85rem',
              padding: '0.65rem 1.4rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Explore</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="hero-metrics-grid">
          <div className="hero-metric-card">
            <div className="metric-val">6</div>
            <div className="metric-label">Specialist AI Agents</div>
          </div>

          <div className="hero-metric-card">
            <div className="metric-val">1,420</div>
            <div className="metric-label">Monitored Applications</div>
          </div>

          <div className="hero-metric-card">
            <div className="metric-val" style={{ color: isFixed ? '#10b981' : 'var(--aicte-gold)' }}>
              {isFixed ? '98 / 100' : '82 / 100'}
            </div>
            <div className="metric-label">Priority Score (AITM)</div>
          </div>

          <div className="hero-metric-card">
            <div className="metric-val">100%</div>
            <div className="metric-label">Append-Only Audit Trail</div>
          </div>
        </div>
      </div>
    </section>
  );
}
