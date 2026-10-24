import React, { useState } from 'react';
import { useRouter, Link } from '../../router/RouterContext';
import { useAuth } from '../../auth/AuthContext';
import { 
  GraduationCap, 
  Building2, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export function InstitutionLoginPage() {
  const { navigate } = useRouter();
  const { login, portalAccounts } = useAuth();
  
  const [identifier, setIdentifier] = useState('AICTE-2026-REG-84920');
  const [password, setPassword] = useState('••••••••••••');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('8W4K2');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const refreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim()) {
      setErrorMsg('Please enter your AICTE Permanent Institute ID or Registered Email');
      return;
    }

    if (captchaInput.toUpperCase() !== captchaCode) {
      setErrorMsg('Security Captcha does not match. Please re-enter.');
      return;
    }

    // Match demo institute account or create standard session
    const matched = portalAccounts.institution.find(
      acc => acc.username.toLowerCase() === identifier.toLowerCase() || 
             acc.institutionId.toLowerCase() === identifier.toLowerCase()
    ) || portalAccounts.institution[0];

    login(matched);
    navigate('/institution/dashboard');
  };

  const quickFillDemo = (index) => {
    const account = portalAccounts.institution[index];
    if (account) {
      setIdentifier(account.institutionId);
      setCaptchaInput(captchaCode);
      login(account);
      navigate('/institution/dashboard');
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', background: 'linear-gradient(135deg, #061938 0%, #0A254C 50%, #0F3B7A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.25rem' }}>
      <div style={{ maxWidth: '1050px', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
        
        {/* Left Side: Role Guidance & Capabilities */}
        <div style={{ color: '#FFFFFF' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(29, 78, 216, 0.25)', border: '1px solid #3B82F6', borderRadius: '9999px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, color: '#93C5FD', marginBottom: '1.25rem' }}>
            <GraduationCap size={15} />
            <span>Applicant & Institution Portal</span>
          </div>

          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem', color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}>
            AICTE Institutional Approval & Compliance
          </h1>
          
          <p style={{ fontSize: '0.95rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '2rem' }}>
            Single secure gateway for technical institutions seeking New Approvals, Extension of Approval (EoA), Course Additions, and Submitting Regulatory Undertakings.
          </p>

          {/* Value Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(21, 128, 61, 0.2)', border: '1px solid #15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CheckCircle2 size={16} style={{ color: '#86EFAC' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F8FAFC' }}>Real-Time Stage Journey Stepper</div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Track your application across Scrutiny, EVC, and SAC with clear SLA timelines.</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(21, 128, 61, 0.2)', border: '1px solid #15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CheckCircle2 size={16} style={{ color: '#86EFAC' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F8FAFC' }}>AI-Assisted Pre-Check & Deficiency Loop</div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Instant OCR validation and evidence-linked deficiency notices with simple re-upload.</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(21, 128, 61, 0.2)', border: '1px solid #15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CheckCircle2 size={16} style={{ color: '#86EFAC' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F8FAFC' }}>Separate Score vs Mandatory Gate</div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Transparent 100-point scoring where mandatory statutory gates are never bypassed.</div>
              </div>
            </div>
          </div>

          {/* Demo Quick Fill Shortcuts */}
          <div style={{ marginTop: '2.5rem', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.72rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              ⚡ Quick Demo Logins (Judges / Reviewers)
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button
                onClick={() => quickFillDemo(0)}
                style={{
                  background: 'rgba(29, 78, 216, 0.3)',
                  border: '1px solid #3B82F6',
                  color: '#FFFFFF',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Aryabhata Inst (Central)
              </button>
              <button
                onClick={() => quickFillDemo(1)}
                style={{
                  background: 'rgba(29, 78, 216, 0.3)',
                  border: '1px solid #3B82F6',
                  color: '#FFFFFF',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Bhagalpur College (Eastern)
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Institution Login Form */}
        <div>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(2, 14, 36, 0.5)',
            border: '4px solid #1D4ED8', // Royal Blue Portal Stripe
            padding: '2.25rem',
            position: 'relative'
          }}>
            {/* Form Header */}
            <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0F172A' }}>
                  Institution Sign In
                </h2>
                <span className="demo-data-pill">Demo Mode</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
                Enter Permanent Institute ID or Registered Nodal Officer Email
              </p>
            </div>

            {errorMsg && (
              <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#B91C1C', padding: '0.65rem', borderRadius: '6px', fontSize: '0.8rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Field 1: Permanent Institute ID / Email */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                  Permanent Institute ID / User ID <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}>
                    <Building2 size={16} />
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 1-XXXXXXXXXX or AICTE-2026-REG-84920"
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem 0.65rem 2.5rem',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      color: '#0F172A',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Field 2: Password */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
                    Password <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <a href="#forgot" style={{ fontSize: '0.75rem', color: '#1D4ED8', fontWeight: 500 }}>
                    Forgot Password?
                  </a>
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}>
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 2.5rem 0.65rem 2.5rem',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      color: '#0F172A',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', background: 'transparent' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Field 3: Visual Captcha */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                  Security Verification Code <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{
                    background: '#0F172A',
                    color: '#F59E0B',
                    padding: '0.45rem 1rem',
                    borderRadius: '6px',
                    fontFamily: 'monospace',
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    letterSpacing: '0.25em',
                    userSelect: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>{captchaCode}</span>
                    <button type="button" onClick={refreshCaptcha} title="Regenerate Captcha" style={{ color: '#94A3B8' }}>
                      <RotateCcw size={14} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Enter Code"
                    maxLength={5}
                    style={{
                      flex: 1,
                      padding: '0.65rem 0.75rem',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      textTransform: 'uppercase',
                      color: '#0F172A',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #1D4ED8 0%, #103875 100%)',
                  color: '#FFFFFF',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(29, 78, 216, 0.35)',
                  marginTop: '0.5rem'
                }}
              >
                <span>Access Institution Dashboard</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Registration / Help Links */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #E2E8F0', textAlign: 'center', fontSize: '0.8rem', color: '#64748B' }}>
              <span>New applicant institute? </span>
              <a href="#register" style={{ color: '#1D4ED8', fontWeight: 600 }}>
                Request User ID & AICTE Registration
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
