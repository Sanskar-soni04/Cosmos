import React, { useState } from 'react';
import { useRouter } from '../../router/RouterContext';
import { useAuth } from '../../auth/AuthContext';
import { 
  Sliders, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ArrowRight, 
  KeyRound, 
  AlertCircle,
  Smartphone,
  Cpu,
  GitBranch,
  ShieldCheck,
  Zap
} from 'lucide-react';

export function AdminLoginPage() {
  const { navigate } = useRouter();
  const { login, verifyTOTP, portalAccounts } = useAuth();
  
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('admin.workflow@aicte-india.org');
  const [password, setPassword] = useState('••••••••••••');
  const [totpCode, setTotpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const matched = portalAccounts.admin.find(
      acc => acc.username.toLowerCase() === email.toLowerCase() || 
             acc.email?.toLowerCase() === email.toLowerCase()
    ) || portalAccounts.admin[0];

    setSelectedAccount(matched);
    setStep(2);
  };

  const handleTOTPSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!totpCode || totpCode.trim().length !== 6) {
      setErrorMsg('Please enter a valid 6-digit TOTP authentication token.');
      return;
    }

    if (verifyTOTP(totpCode)) {
      login(selectedAccount || portalAccounts.admin[0]);
      navigate('/admin/dashboard');
    } else {
      setErrorMsg('Invalid authentication code. Use demo code: 123456');
    }
  };

  const quickLoginAsAdmin = () => {
    const acc = portalAccounts.admin[0];
    if (acc) {
      setSelectedAccount(acc);
      setEmail(acc.username);
      login(acc);
      navigate('/admin/dashboard');
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.25rem' }}>
      <div style={{ maxWidth: '1050px', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
        
        {/* Left Side: System Admin & Config Capabilities */}
        <div style={{ color: '#FFFFFF' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(71, 85, 105, 0.4)', border: '1px solid #94A3B8', borderRadius: '9999px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, color: '#E2E8F0', marginBottom: '1.25rem' }}>
            <Sliders size={15} />
            <span>Workflow Engine & System Admin Portal</span>
          </div>

          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem', color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}>
            AICTE Rules, Routes & Engine Control
          </h1>
          
          <p style={{ fontSize: '0.95rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '2rem' }}>
            Central administration hub for system architects, NIC administrators, and policy directors. Configure versioned APH approval workflows, define rule weights and mandatory gates, manage escalation policies, and control demo simulations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(148, 163, 184, 0.2)', border: '1px solid #94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <GitBranch size={16} style={{ color: '#E2E8F0' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F8FAFC' }}>Visual Workflow Route Configurator</div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Versioned state machine graph with stage validation, SLA days, and role matrix.</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(148, 163, 184, 0.2)', border: '1px solid #94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Cpu size={16} style={{ color: '#E2E8F0' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F8FAFC' }}>APH 2024–27 Rules & Scoring Table</div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Dynamic weights, severity classifications, and mandatory gate toggles.</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(148, 163, 184, 0.2)', border: '1px solid #94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={16} style={{ color: '#E2E8F0' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F8FAFC' }}>Interactive Time Simulator (Judge Testing)</div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Advance system clock by +1d / +7d / +30d to trigger escalations and overdue triggers.</div>
              </div>
            </div>
          </div>

          {/* Quick Demo Login */}
          <div style={{ marginTop: '2.5rem', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              ⚡ Superuser Demo Login (Judges / Reviewers)
            </div>
            <button
              onClick={quickLoginAsAdmin}
              style={{
                background: 'rgba(71, 85, 105, 0.6)',
                border: '1px solid #94A3B8',
                color: '#FFFFFF',
                padding: '0.35rem 0.75rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Sign In as Lead System Architect (Admin)
            </button>
          </div>
        </div>

        {/* Right Side: Form */}
        <div>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.7)',
            border: '4px solid #475569', // Slate Portal Accent Stripe
            padding: '2.25rem',
            position: 'relative'
          }}>
            <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0F172A' }}>
                  {step === 1 ? 'Admin Authentication' : 'Admin Security Verification'}
                </h2>
                <span className="demo-data-pill" style={{ background: '#F1F5F9', color: '#334155', borderColor: '#CBD5E1' }}>
                  Root Level
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
                {step === 1 
                  ? 'Sign in with your system administrator account' 
                  : `Enter 6-digit TOTP token for ${selectedAccount?.name || 'administrator'}`}
              </p>
            </div>

            {errorMsg && (
              <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#B91C1C', padding: '0.65rem', borderRadius: '6px', fontSize: '0.8rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleCredentialsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    Administrator Email / User ID <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}>
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    Password <span style={{ color: '#DC2626' }}>*</span>
                  </label>
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

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #475569 0%, #1E293B 100%)',
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
                    boxShadow: '0 4px 12px rgba(71, 85, 105, 0.35)',
                    marginTop: '0.5rem'
                  }}
                >
                  <span>Proceed to 2FA Authentication</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleTOTPSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#475569', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>{selectedAccount?.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{selectedAccount?.designation}</div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    Enter 6-Digit Time-Based Security Token <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}>
                      <KeyRound size={16} />
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={totpCode}
                      onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="123456"
                      autoFocus
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                        border: '2px solid #475569',
                        borderRadius: '6px',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        letterSpacing: '0.35em',
                        color: '#475569',
                        outline: 'none',
                        textAlign: 'center'
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.35rem' }}>
                    Tip: Enter demo code <strong style={{ color: '#475569' }}>123456</strong> or any 6 digits.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      flex: 1,
                      padding: '0.65rem',
                      borderRadius: '6px',
                      background: '#F1F5F9',
                      color: '#475569',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 2,
                      background: 'linear-gradient(135deg, #475569 0%, #1E293B 100%)',
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
                      boxShadow: '0 4px 12px rgba(71, 85, 105, 0.35)'
                    }}
                  >
                    <span>Verify & Enter</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
