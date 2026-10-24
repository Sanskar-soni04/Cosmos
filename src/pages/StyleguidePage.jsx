import React from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  FileQuestion, 
  FileWarning, 
  Clock, 
  Hourglass, 
  AlertTriangle,
  Building2,
  ShieldCheck,
  GraduationCap,
  MapPin,
  Gavel,
  Sliders,
  Palette,
  Eye,
  ArrowRight,
  Download,
  Upload
} from 'lucide-react';
import { DESIGN_TOKENS } from '../theme/tokens';

export function StyleguidePage() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.25rem', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ borderBottom: '2px solid #E2E8F0', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#1D4ED8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          <Palette size={14} />
          <span>Section 16 Specification</span>
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Poppins, sans-serif' }}>
          Design System & Component Styleguide
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748B', maxWidth: '750px', marginTop: '0.5rem' }}>
          Living reference of brand tokens, semantic status chips, portal accent themes, typography, form controls, and accessible government UI primitives.
        </p>
      </div>

      {/* 1. BRAND PALETTE */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
          1. Brand Palette & Indian Tricolor Accents
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          
          <div style={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <div style={{ height: '70px', background: '#0B2A5B' }} />
            <div style={{ padding: '0.75rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Deep Navy (Primary)</div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#64748B' }}>#0B2A5B</div>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.2rem' }}>Headers, Bureau & Authority</div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <div style={{ height: '70px', background: '#1D4ED8' }} />
            <div style={{ padding: '0.75rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Royal Blue (Interactive)</div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#64748B' }}>#1D4ED8</div>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.2rem' }}>Primary CTAs & Institution Portal</div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <div style={{ height: '70px', background: '#F59E0B' }} />
            <div style={{ padding: '0.75rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Saffron Accent</div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#64748B' }}>#F59E0B</div>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.2rem' }}>Highlights & Headings Stripe</div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <div style={{ height: '70px', background: '#15803D' }} />
            <div style={{ padding: '0.75rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>India Green (Success)</div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#64748B' }}>#15803D</div>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.2rem' }}>Pass status & cleared gates</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SEMANTIC STATUS BADGES (ALWAYS ICON + TEXT) */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
          2. Semantic Status Colors (Mandatory: Icon + Text Paired)
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
          Strictly compliant with Section 16 accessibility rules: statuses are never indicated by color alone.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          
          <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Rule Passed / Compliant</div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>PASS</div>
            </div>
            <span className="badge-pass">
              <CheckCircle2 size={13} />
              <span>PASS</span>
            </span>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>AI Conflict / Uncertainty</div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>REVIEW_REQUIRED</div>
            </div>
            <span className="badge-review">
              <AlertCircle size={13} />
              <span>REVIEW_REQUIRED</span>
            </span>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Non-Compliant Rule</div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>FAIL_DEFICIENCY</div>
            </div>
            <span className="badge-fail">
              <XCircle size={13} />
              <span>FAIL_DEFICIENCY</span>
            </span>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Mandatory Attachment</div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>MISSING</div>
            </div>
            <span className="badge-missing">
              <FileQuestion size={13} />
              <span>MISSING</span>
            </span>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>OCR Unreadable (Human Task)</div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>EXTRACTION_ERROR</div>
            </div>
            <span className="badge-extraction-error">
              <FileWarning size={13} />
              <span>EXTRACTION_ERROR</span>
            </span>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Undertaking / Deficiency Due</div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>OVERDUE</div>
            </div>
            <span className="badge-overdue">
              <Clock size={13} />
              <span>OVERDUE</span>
            </span>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Lease / Fire Safety Expiry</div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>EXPIRING (≤90d)</div>
            </div>
            <span className="badge-expiring">
              <Hourglass size={13} />
              <span>EXPIRING</span>
            </span>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Pendency Stage Risk</div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>SLA AT RISK</div>
            </div>
            <span className="badge-at-risk">
              <AlertTriangle size={13} />
              <span>AT_RISK</span>
            </span>
          </div>

        </div>
      </section>

      {/* 3. PER-PORTAL ACCENT IDENTITIES */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
          3. Five Portal Identity Stripes & Role Color Accents
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
          Per-portal accent stripes orient users immediately to their authority workspace.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          
          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E2E8F0', borderTop: '4px solid #1D4ED8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1D4ED8', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              <GraduationCap size={16} />
              <span>Institution Portal</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Accent: #1D4ED8 (Royal Blue)</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E2E8F0', borderTop: '4px solid #0B2A5B' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0B2A5B', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              <ShieldCheck size={16} />
              <span>Officer Portal</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Accent: #0B2A5B (Deep Navy)</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E2E8F0', borderTop: '4px solid #7C3AED' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#7C3AED', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              <MapPin size={16} />
              <span>EVC Member Portal</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Accent: #7C3AED (Violet)</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E2E8F0', borderTop: '4px solid #991B1B' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991B1B', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              <Gavel size={16} />
              <span>SAC / SHC Hearing</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Accent: #991B1B (Maroon)</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E2E8F0', borderTop: '4px solid #475569' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              <Sliders size={16} />
              <span>System Admin</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Accent: #475569 (Slate)</div>
          </div>

        </div>
      </section>

      {/* 4. BUTTONS & ACTIONS */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
          4. Buttons, Micro-Interactions & Form Controls
        </h2>
        
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <button style={{ background: '#1D4ED8', color: '#FFFFFF', padding: '0.65rem 1.25rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Primary Royal Blue</span>
            <ArrowRight size={15} />
          </button>

          <button style={{ background: '#0B2A5B', color: '#FFFFFF', padding: '0.65rem 1.25rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={16} />
            <span>Bureau Navy</span>
          </button>

          <button style={{ background: '#15803D', color: '#FFFFFF', padding: '0.65rem 1.25rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={16} />
            <span>Success / Approve</span>
          </button>

          <button style={{ background: '#DC2626', color: '#FFFFFF', padding: '0.65rem 1.25rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <XCircle size={16} />
            <span>Raise Deficiency</span>
          </button>

          <button style={{ background: '#FFFFFF', color: '#334155', border: '1px solid #CBD5E1', padding: '0.65rem 1.25rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </section>

      {/* 5. TYPOGRAPHY & MULTI-LINGUAL SCALE */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
          5. Typography & Bilingual Hindi Rendering
        </h2>

        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.5rem' }}>English (Inter / Poppins)</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0B2A5B', marginBottom: '0.5rem' }}>
              Statutory Scrutiny & Approval System
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
              All actions are recorded in an append-only digital audit trail with SHA-256 hash chaining. Automation assists authorities without superseding statutory mandates.
            </p>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.5rem' }}>हिन्दी (Noto Sans Devanagari)</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0B2A5B', marginBottom: '0.5rem' }}>
              सांविधिक संवीक्षा एवं अनुमोदन प्रणाली
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
              सभी कार्यवाहियाँ SHA-256 हैश शृंखला के साथ एक अपरिवर्तनीय डिजिटल ऑडिट ट्रेल में दर्ज की जाती हैं। स्वचालन अधिकारियों की सहायता करता है, निर्णय नहीं लेता।
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
