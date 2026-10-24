import React from 'react';
import { Shield, ExternalLink, Phone, Mail, Clock, HelpCircle, FileText } from 'lucide-react';
import { Link } from '../../router/RouterContext';

export function PublicFooter() {
  return (
    <footer style={{ background: '#061938', color: '#94A3B8', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 'auto' }}>
      {/* Top Banner / Statutory Notice */}
      <div style={{ background: '#020E24', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', fontSize: '0.78rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#E2E8F0' }}>
            <Shield size={16} style={{ color: '#F59E0B', flexShrink: 0 }} />
            <span>
              <strong>Statutory Scrutiny Mandate:</strong> The automated system and AI algorithms provide assistance only. 
              Under AICTE Approval Process Handbook (APH), all final approvals, rejections, and regulatory determinations are made exclusively by authorized competent authorities.
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748B' }}>
            <span>Last Updated: <strong>24 Oct 2026</strong></span>
            <span>•</span>
            <span>Version: <strong style={{ color: '#F59E0B' }}>v2026.1-APH</strong></span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.25rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
        {/* Col 1: System Purpose */}
        <div>
          <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>AICTE Approval Workflow Automation</span>
          </div>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.6, color: '#94A3B8', marginBottom: '1rem' }}>
            Next-generation regulatory intelligence platform designed for seamless institutional compliance monitoring, multi-stage approval routing, and digital audit integrity.
          </p>
          <div style={{ display: 'inline-block', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '4px', padding: '0.35rem 0.6rem', fontSize: '0.72rem', color: '#F59E0B' }}>
            AICTE Regulatory Intelligence Platform
          </div>
        </div>

        {/* Col 2: Regulatory Workflow Routes */}
        <div>
          <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.75rem' }}>
            Approval Routes (APH 2024–27)
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>
              <a href="/#routes" style={{ color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1D4ED8' }}></span>
                Route 1: Scrutiny Only (Existing EoA)
              </a>
            </li>
            <li>
              <a href="/#routes" style={{ color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7C3AED' }}></span>
                Route 2: Scrutiny + EVC (New Courses / Land)
              </a>
            </li>
            <li>
              <a href="/#routes" style={{ color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#991B1B' }}></span>
                Route 3: EVC + SAC/SHC (Appeals / Variations)
              </a>
            </li>
            <li>
              <a href="/#routes" style={{ color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0D9488' }}></span>
                Route 4: Only EVC (Surprise / Verification)
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Portal Links */}
        <div>
          <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.75rem' }}>
            Dedicated Portals
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>
              <Link to="/institution/login" style={{ color: '#CBD5E1' }}>Institution Applicant Portal</Link>
            </li>
            <li>
              <Link to="/officer/login" style={{ color: '#CBD5E1' }}>Regional & Scrutiny Officer Portal</Link>
            </li>
            <li>
              <Link to="/evc/login" style={{ color: '#CBD5E1' }}>EVC Inspector Portal</Link>
            </li>
            <li>
              <Link to="/committee/login" style={{ color: '#CBD5E1' }}>SAC / SHC Hearing Committee Portal</Link>
            </li>
            <li>
              <Link to="/admin/login" style={{ color: '#CBD5E1' }}>System Administrator Portal</Link>
            </li>
            <li>
              <Link to="/styleguide" style={{ color: '#F59E0B', fontWeight: 600 }}>Design System Tokens & Styleguide</Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Statutory Help & Contacts */}
        <div>
          <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.75rem' }}>
            Support & Grievances
          </div>
          <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#CBD5E1' }}>
              <Phone size={14} style={{ color: '#F59E0B' }} />
              <span>Toll Free: 1800-11-2428 (10AM - 5PM)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#CBD5E1' }}>
              <Mail size={14} style={{ color: '#F59E0B' }} />
              <span>helpdesk-approval@aicte-india.org</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94A3B8', marginTop: '0.25rem' }}>
              <Clock size={14} />
              <span>Nelson Mandela Marg, Vasant Kunj, New Delhi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Accessibility Links */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1rem 1.25rem', fontSize: '0.75rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div>
            © 2026 All India Council for Technical Education (AICTE). Regulatory Workflow & Compliance System.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <a href="#accessibility" style={{ color: '#94A3B8' }}>Accessibility Statement</a>
            <a href="#privacy" style={{ color: '#94A3B8' }}>Privacy Policy</a>
            <a href="#terms" style={{ color: '#94A3B8' }}>Terms of Use</a>
            <a href="#hyperlink" style={{ color: '#94A3B8' }}>Hyperlinking Policy</a>
            <a href="#sitemap" style={{ color: '#94A3B8' }}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
