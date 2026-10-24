import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  ExternalLink, 
  FileCheck2, 
  Sparkles, 
  Lock 
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="portal-footer">
      <div className="footer-content">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <Building2 size={20} style={{ color: 'var(--aicte-gold)' }} />
            <h4 style={{ color: '#ffffff', fontSize: '1rem' }}>
              All India Council for Technical Education (AICTE)
            </h4>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '480px' }}>
            Statutory body under the Ministry of Education, Government of India. Nelson Mandela Marg, 
            Vasant Kunj, New Delhi - 110070. Regulating technical, engineering, management, and polytechnic education in India.
          </p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <span className="statutory-pill-badge">
              <Sparkles size={11} />
              APH 2026-27 Approved Standard
            </span>
            <span style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.72rem',
              color: '#cbd5e1',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Lock size={11} /> Append-Only SHA-256
            </span>
          </div>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '12px' }}>
            Regulatory Quick Links
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '8px', color: '#94a3b8' }}>
            <li><a href="#" style={{ transition: 'color 0.2s' }}>Approval Process Handbook (APH 2026-27)</a></li>
            <li><a href="#" style={{ transition: 'color 0.2s' }}>National Single Window System (NSWS)</a></li>
            <li><a href="#" style={{ transition: 'color 0.2s' }}>National Academic Depository (NAD / ABC)</a></li>
            <li><a href="#" style={{ transition: 'color 0.2s' }}>Anti-Ragging National Monitoring Portal</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '12px' }}>
            Compliance & Standards
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '8px', color: '#94a3b8' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} style={{ color: '#10b981' }} />
              <span>GIGW Compliant (Level AA)</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} style={{ color: '#10b981' }} />
              <span>ISO/IEC 27001 Data Security</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} style={{ color: '#10b981' }} />
              <span>Deterministic Multi-Agent Engine</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div>
          © 2026 All India Council for Technical Education (AICTE). All Rights Reserved.
        </div>
        <div>
          Production Enterprise System • Multi-Agent Orchestration & Digital Audit Trail Engine
        </div>
      </div>
    </footer>
  );
}
