import React, { useState } from 'react';
import { useRouter } from '../../router/RouterContext';
import { useAuth } from '../../auth/AuthContext';
import { 
  Gavel, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ArrowRight, 
  KeyRound, 
  AlertCircle,
  Smartphone,
  Scale,
  FileSpreadsheet,
  Award
} from 'lucide-react';

export function CommitteeLoginPage() {
  const { navigate } = useRouter();
  const { login, verifyTOTP, portalAccounts } = useAuth();
  
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('justice.sharma@sac.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [totpCode, setTotpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const matched = portalAccounts.committee.find(
      acc => acc.username.toLowerCase() === email.toLowerCase() || 
             acc.email?.toLowerCase() === email.toLowerCase()
    ) || portalAccounts.committee[0];

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
      login(selectedAccount || portalAccounts.committee[0]);
      navigate('/committee/dashboard');
    } else {
      setErrorMsg('Invalid authentication code. Use demo code: 123456');
    }
  };

  const quickLoginAs = (index) => {
    const acc = portalAccounts.committee[index];
    if (acc) {
      setSelectedAccount(acc);
      setEmail(acc.username);
      login(acc);
      navigate('/committee/dashboard');
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', background: 'linear-gradient(135deg, #2D0606 0%, #450A0A 50%, #7F1D1D 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.25rem' }}>
      <div style={{ maxWidth: '1050px', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
        
        {/* Left Side: Hearing & Statutory Appellate Functions */}
        <div style={{ color: '#FFFFFF' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(153, 27, 27, 0.4)', border: '1px solid #DC2626', borderRadius: '9999px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, color: '#FECACA', marginBottom: '1.25rem' }}>
            <Gavel size={15} />
            <span>Appellate & Hearing Committee (SAC / SHC)</span>
          </div>

          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem', color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}>
            Statutory Appeals & Hearing Chambers
          </h1>
          
          <p style={{ fontSize: '0.95rem', color: '#E2E8F0', lineHeight: 1.6, marginBottom: '2rem' }}>
            Authoritative session console for Standing Appellate Committee (SAC) and Standing Hearing Committee (SHC) members. Review escalated institution representations, inspect evidence summaries, and record final statutory recommendations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Scale size={16} style={{ color: '#FCA5A5' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F8FAFC' }}>Quorum Hearing Session Management</div>
                <div style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>Structured agendas with digital representations and prior scrutiny/EVC findings.</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileSpreadsheet size={16} style={{ color: '#FCA5A5' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F8FAFC' }}>AI-Generated One-Page Briefs</div>
                <div style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>Concise summaries synthesizing chronological facts, disputed clauses, and compliance status.</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Award size={16} style={{ color: '#FCA5A5' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F8FAFC' }}>Statutory Authority Reservations</div>
                <div style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>Human-in-the-loop decisions: AI never decides; committee recordings are immutably signed.</div>
              </div>
            </div>
          </div>

          {/* Quick Demo Logins */}
          <div style={{ marginTop: '2.5rem', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.72rem', color: '#FECACA', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              ⚡ Quick Committee Logins (Judges / Reviewers)
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button
                onClick={() => quickLoginAs(0)}
                style={{
                  background: 'rgba(153, 27, 27, 0.6)',
                  border: '1px solid #EF4444',
                  color: '#FFFFFF',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Justice (Retd.) K. K. Sharma (SAC Chair)
              </button>
              <button
                onClick={() => quickLoginAs(1)}
                style={{
                  background: 'rgba(153, 27, 27, 0.6)',
                  border: '1px solid #EF4444',
                  color: '#FFFFFF',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Prof. K. V. R. Murthy (SHC Member)
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(45, 6, 6, 0.6)',
            border: '4px solid #991B1B', // Maroon Portal Accent Stripe
            padding: '2.25rem',
            position: 'relative'
          }}>
            <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0F172A' }}>
                  {step === 1 ? 'Committee Sign In' : 'Appellate 2FA Verification'}
                </h2>
                <span className="demo-data-pill" style={{ background: '#FEE2E2', color: '#991B1B', borderColor: '#FCA5A5' }}>
                  Statutory
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
                {step === 1 
                  ? 'Sign in using your appointed Committee credentials' 
                  : `Enter 6-digit TOTP token for ${selectedAccount?.name || 'hearing member'}`}
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
                    Committee Member Email <span style={{ color: '#DC2626' }}>*</span>
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
                    background: 'linear-gradient(135deg, #991B1B 0%, #450A0A 100%)',
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
                    boxShadow: '0 4px 12px rgba(153, 27, 27, 0.35)',
                    marginTop: '0.5rem'
                  }}
                >
                  <span>Proceed to 2FA Authentication</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleTOTPSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ background: '#FEF2F2', padding: '1rem', borderRadius: '8px', border: '1px solid #FEE2E2', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#991B1B', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                        border: '2px solid #991B1B',
                        borderRadius: '6px',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        letterSpacing: '0.35em',
                        color: '#991B1B',
                        outline: 'none',
                        textAlign: 'center'
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.35rem' }}>
                    Tip: Enter demo code <strong style={{ color: '#991B1B' }}>123456</strong> or any 6 digits.
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
                      background: 'linear-gradient(135deg, #991B1B 0%, #450A0A 100%)',
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
                      boxShadow: '0 4px 12px rgba(153, 27, 27, 0.35)'
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
