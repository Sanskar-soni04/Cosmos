import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  User, 
  KeyRound, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  HelpCircle,
  ExternalLink,
  Shield,
  Layers,
  X,
  PlusCircle,
  MapPin
import { 
  DEFAULT_USERS, 
  DEFAULT_INSTITUTE_USER, 
  DEFAULT_ADMIN_USER, 
  DEFAULT_COMMITTEE_USER 
} from '../data/liveStore';

export function LoginPage({ onLoginSuccess, onRegisterInstitute }) {
  const [selectedRole, setSelectedRole] = useState('INSTITUTE'); // INSTITUTE, ADMIN, COMMITTEE
  const [username, setUsername] = useState('INST-PUNE-8492');
  const [password, setPassword] = useState('password123');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7N4K9');
  const [errorMsg, setErrorMsg] = useState('');

  // Register Modal State
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [regForm, setRegForm] = useState({
    name: '',
    pid: `1-${Math.floor(1000000 + Math.random() * 9000000)}`,
    location: '',
    region: 'Western Region (WRO)',
    category: 'Technical / Engineering',
    establishedYear: 2024,
    principalName: '',
    contactEmail: '',
    totalIntake: 300,
    landAreaAcres: 8.5,
    username: '',
    password: ''
  });

  const refreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaCode(code);
    setCaptchaInput('');
  };

  const handleRoleTabChange = (role) => {
    setSelectedRole(role);
    setErrorMsg('');
    if (role === 'INSTITUTE') {
      setUsername('INST-PUNE-8492');
      setPassword('password123');
    } else if (role === 'ADMIN') {
      setUsername('AICTE-OFFICER-01');
      setPassword('adminpassword');
    } else if (role === 'COMMITTEE') {
      setUsername('COMMITTEE-CHAIR');
      setPassword('committeepassword');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Check stored custom users first
    let user = null;
    try {
      const storedUsersRaw = localStorage.getItem('aicte_custom_users');
      const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      user = storedUsers.find(u => u.username.toLowerCase() === username.trim().toLowerCase());
    } catch (e) {}

    if (!user) {
      user = DEFAULT_USERS.find(
        u => u.username.toLowerCase() === username.trim().toLowerCase()
      );
    }

    if (!user) {
      setErrorMsg('Invalid User Name or Permanent Institute ID.');
      return;
    }

    if (user.password !== password) {
      setErrorMsg('Incorrect Password. Please check your credentials.');
      return;
    }

    onLoginSuccess(user);
  };

  const quickLoginAs = (userObj) => {
    setSelectedRole(userObj.role);
    setUsername(userObj.username);
    setPassword(userObj.password);
    onLoginSuccess(userObj);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regForm.name || !regForm.username || !regForm.password) {
      alert("Please fill in required fields.");
      return;
    }

    const newInstId = `AICTE-2026-REG-${Math.floor(10000 + Math.random() * 90000)}`;

    const newInstitution = {
      id: newInstId,
      pid: regForm.pid,
      name: regForm.name,
      location: regForm.location || 'Pune, Maharashtra',
      region: regForm.region,
      category: regForm.category,
      establishedYear: regForm.establishedYear,
      principalName: regForm.principalName || 'Dr. Principal',
      contactEmail: regForm.contactEmail || `${regForm.username}@institute.ac.in`,
      applicationType: 'Application for Establishment of New Technical Institution',
      selectedRoute: 'Scrutiny + EVC',
      currentStageIndex: 1, // submitted
      status: 'UNDER_SCRUTINY',
      priorityScore: 92,
      mandatoryDeficiency: false,
      deficiencyReason: null,
      assignedOfficer: 'Dr. Vijay Sharma (Joint Director, Regulation Bureau)',
      evcStatus: 'PENDING_SCRUTINY',
      evcDate: null,
      landAreaAcres: parseFloat(regForm.landAreaAcres || 7.5),
      totalIntake: parseInt(regForm.totalIntake || 300),
      studentFacultyRatio: '1:15.0',
      documents: [
        {
          id: `DOC-${Date.now()}-1`,
          title: 'Registered Land Deed & Ownership Certificate',
          category: 'Legal & Institution',
          agentId: 1,
          filename: 'Land_Title_Deed_Master.pdf',
          filesize: '3.8 MB',
          status: 'PASS',
          confidence: 99.1,
          date: new Date().toISOString().split('T')[0],
          hash: 'sha256:4a981c00fa...',
          findings: `Registered title clear for ${regForm.landAreaAcres} acres in ${regForm.location}. Verified under APH Section 2.1.`
        },
        {
          id: `DOC-${Date.now()}-2`,
          title: 'Municipal Fire Safety NOC & Building Plan',
          category: 'Infrastructure & Safety',
          agentId: 2,
          filename: 'Fire_Safety_Clearance_2026.pdf',
          filesize: '2.1 MB',
          status: 'PASS',
          confidence: 98.4,
          date: new Date().toISOString().split('T')[0],
          hash: 'sha256:91bf021ec8...',
          findings: 'Valid forward clearance of 36 months verified by Municipal Fire Authority. Fully compliant.'
        }
      ]
    };

    const newUser = {
      id: `user-${Date.now()}`,
      username: regForm.username,
      password: regForm.password,
      role: 'INSTITUTE',
      name: regForm.name,
      pid: regForm.pid,
      designation: 'Principal & Authorized Signatory',
      institutionId: newInstId,
      region: regForm.region
    };

    // Save custom user
    try {
      const storedUsersRaw = localStorage.getItem('aicte_custom_users');
      const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      storedUsers.push(newUser);
      localStorage.setItem('aicte_custom_users', JSON.stringify(storedUsers));
    } catch (e) {}

    setIsRegisterOpen(false);

    if (onRegisterInstitute) {
      onRegisterInstitute(newInstitution, newUser);
    } else {
      onLoginSuccess(newUser);
    }
  };

  return (
    <div className="login-portal-wrapper">
      <div className="login-ambient-grid" />

      {/* Top AICTE Navigation */}
      <header className="login-top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <svg className="login-aicte-logo" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="54" fill="#002147" stroke="#f59e0b" strokeWidth="3" />
            <circle cx="60" cy="60" r="48" fill="none" stroke="#ff9900" strokeWidth="2" strokeDasharray="6,4" />
            {[...Array(16)].map((_, i) => (
              <rect key={i} x="56" y="4" width="8" height="8" rx="1.5" fill="#f59e0b" transform={`rotate(${i * 22.5} 60 60)`} />
            ))}
            <circle cx="60" cy="60" r="32" fill="#061938" stroke="#f59e0b" strokeWidth="2" />
            <path d="M60 38 C68 48 74 54 74 64 C74 72 68 76 60 76 C52 76 46 72 46 64 C46 54 52 48 60 38 Z" fill="#f59e0b" />
          </svg>
          <div>
            <div style={{ color: 'var(--aicte-gold)', fontSize: '0.85rem', fontWeight: 600 }}>
              अखिल भारतीय तकनीकी शिक्षा परिषद्
            </div>
            <h2 style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
              ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
            </h2>
            <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
              Statutory Body Under Ministry of Education, Govt. of India
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 'var(--radius-full)',
            padding: '4px 14px',
            color: '#cbd5e1',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <ShieldCheck size={14} style={{ color: '#10b981' }} />
            <span>AICTE Secure Single Sign-On (SSO v3.2)</span>
          </div>
        </div>
      </header>

      {/* Main Login Split View */}
      <div className="login-main-container">
        {/* Left Side: National Portal Information */}
        <div className="login-left-panel">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--aicte-gold)',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '1rem'
          }}>
            <Layers size={15} />
            <span>National Regulatory & Approval Bureau</span>
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            color: '#ffffff',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '1rem'
          }}>
            Integrated Institutional <span style={{ color: 'var(--aicte-gold)' }}>Approval & Compliance</span> Portal
          </h1>

          <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '520px' }}>
            Single unified gateway for technical institutions, universities, and polytechnics to submit Approval 
            Process Handbook (APH 2026-27) applications, manage AI-assisted document scrutiny, monitor EVC 
            inspections, and preserve a tamper-proof digital audit history.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '520px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem'
            }}>
              <div style={{ color: 'var(--aicte-gold)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
                For Technical Institutions
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                Extension of Approval (EoA), New Courses, Live Document Vault & Deficiency Resolution
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem'
            }}>
              <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
                For AICTE Directorate
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                Multi-Agent OCR Scrutiny, Regional Pendency Heatmaps, EVC Panel Deployment & Audit Log
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Sign-In Card */}
        <div className="login-card-panel">
          <div className="login-form-card">
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--aicte-navy-dark)' }}>
                Sign In
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Access your designated institutional or regulatory portal
              </p>
            </div>

            {/* Role Switcher Tabs */}
            <div style={{
              display: 'flex',
              background: '#f1f5f9',
              borderRadius: 'var(--radius-md)',
              padding: '4px',
              marginBottom: '1.5rem',
              gap: '4px'
            }}>
              <button
                type="button"
                onClick={() => handleRoleTabChange('INSTITUTE')}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  background: selectedRole === 'INSTITUTE' ? '#ffffff' : 'transparent',
                  color: selectedRole === 'INSTITUTE' ? 'var(--aicte-navy-dark)' : 'var(--text-muted)',
                  boxShadow: selectedRole === 'INSTITUTE' ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                🏛️ Institution
              </button>

              <button
                type="button"
                onClick={() => handleRoleTabChange('ADMIN')}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  background: selectedRole === 'ADMIN' ? '#ffffff' : 'transparent',
                  color: selectedRole === 'ADMIN' ? 'var(--aicte-navy-dark)' : 'var(--text-muted)',
                  boxShadow: selectedRole === 'ADMIN' ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                🛡️ AICTE Admin
              </button>

              <button
                type="button"
                onClick={() => handleRoleTabChange('COMMITTEE')}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  background: selectedRole === 'COMMITTEE' ? '#ffffff' : 'transparent',
                  color: selectedRole === 'COMMITTEE' ? 'var(--aicte-navy-dark)' : 'var(--text-muted)',
                  boxShadow: selectedRole === 'COMMITTEE' ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                ⚖️ Committee
              </button>
            </div>

            {errorMsg && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 'var(--radius-md)',
                padding: '10px 12px',
                fontSize: '0.8rem',
                color: '#b91c1c',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Shield size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '6px' }}>
                  {selectedRole === 'INSTITUTE' 
                    ? 'Permanent Institute ID (PID) / User Name' 
                    : selectedRole === 'ADMIN' 
                    ? 'AICTE Officer ID' 
                    : 'Committee Panel ID'}
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0 12px',
                  background: '#ffffff'
                }}>
                  <User size={16} style={{ color: '#94a3b8', marginRight: '8px' }} />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={selectedRole === 'INSTITUTE' ? 'e.g. INST-PUNE-8492' : 'e.g. AICTE-OFFICER-01'}
                    style={{
                      width: '100%',
                      padding: '10px 0',
                      border: 'none',
                      outline: 'none',
                      fontSize: '0.85rem',
                      color: '#0f172a'
                    }}
                    id="login-username"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
                    Password
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset instructions sent to registered contact.'); }} style={{ fontSize: '0.75rem', color: 'var(--aicte-gold-hover)', fontWeight: 600 }}>
                    Forgot Password?
                  </a>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0 12px',
                  background: '#ffffff'
                }}>
                  <Lock size={16} style={{ color: '#94a3b8', marginRight: '8px' }} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    style={{
                      width: '100%',
                      padding: '10px 0',
                      border: 'none',
                      outline: 'none',
                      fontSize: '0.85rem',
                      color: '#0f172a'
                    }}
                    id="login-password"
                  />
                </div>
              </div>

              {/* Captcha */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '6px' }}>
                  Security Verification Code
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{
                    background: '#04152e',
                    color: 'var(--aicte-gold)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    letterSpacing: '4px',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    userSelect: 'none'
                  }}>
                    {captchaCode}
                  </div>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    style={{
                      padding: '8px',
                      background: '#f1f5f9',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      color: '#475569'
                    }}
                  >
                    <RefreshCw size={16} />
                  </button>
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-medium)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-gold"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.75rem',
                  fontSize: '0.92rem'
                }}
                id="btn-login-submit"
              >
                <span>Sign In to Portal</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Bottom Links: Register New Institute Modal Trigger */}
            <div style={{
              textAlign: 'center',
              marginTop: '1.25rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}>
              Want to onboard a live college?{' '}
              <button 
                type="button"
                onClick={() => setIsRegisterOpen(true)} 
                style={{ color: 'var(--aicte-blue)', fontWeight: 800, textDecoration: 'underline' }}
                id="btn-open-register"
              >
                + Register New Institute Live
              </button>
            </div>
          </div>

          {/* Quick Login Bar */}
          <div style={{
            marginTop: '1rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 'var(--radius-md)',
            padding: '0.9rem',
            color: '#ffffff'
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--aicte-gold)',
              textTransform: 'uppercase',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <Sparkles size={13} />
              <span>Committee Presentation Quick-Login</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => quickLoginAs(DEFAULT_INSTITUTE_USER)}
                id="btn-quick-institute"
                style={{
                  flex: '1 1 100%',
                  padding: '8px 12px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.45)',
                  borderRadius: '6px',
                  color: 'var(--aicte-gold)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>🏫 1. Technical Institution Portal</span>
                <span style={{ fontSize: '0.68rem', opacity: 0.85, fontWeight: 500 }}>AITM Pune (PID: 1-8492001) →</span>
              </button>

              <button
                type="button"
                onClick={() => quickLoginAs(DEFAULT_ADMIN_USER)}
                id="btn-quick-admin"
                style={{
                  flex: '1 1 100%',
                  padding: '8px 12px',
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.45)',
                  borderRadius: '6px',
                  color: '#38bdf8',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>🏛️ 2. AICTE Bureau Directorate</span>
                <span style={{ fontSize: '0.68rem', opacity: 0.85, fontWeight: 500 }}>Dr. Vijay Sharma (Joint Director) →</span>
              </button>

              <button
                type="button"
                onClick={() => quickLoginAs(DEFAULT_COMMITTEE_USER)}
                id="btn-quick-committee"
                style={{
                  flex: '1 1 100%',
                  padding: '8px 12px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.45)',
                  borderRadius: '6px',
                  color: '#10b981',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>⚖️ 3. Statutory Scrutiny & EVC Chamber</span>
                <span style={{ fontSize: '0.68rem', opacity: 0.85, fontWeight: 500 }}>Prof. Dr. S. K. Mahajan (Chair) →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NEW INSTITUTE REGISTRATION MODAL (LIVE DATA CREATION) */}
      {isRegisterOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ maxWidth: '680px' }}>
            <div className="modal-header">
              <h3>
                <Building2 size={18} style={{ color: 'var(--aicte-gold)', display: 'inline', marginRight: '8px' }} />
                AICTE Technical Institution Onboarding & Registration (APH 2026-27)
              </h3>
              <button onClick={() => setIsRegisterOpen(false)} style={{ color: '#ffffff', opacity: 0.8 }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit}>
              <div className="modal-body" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '4px' }}>
                    Full Legal Name of Institution: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kalinga Institute of Engineering & Technology"
                    value={regForm.name}
                    onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-medium)', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '4px' }}>
                      Permanent Institute ID (PID): *
                    </label>
                    <input
                      type="text"
                      required
                      value={regForm.pid}
                      onChange={(e) => setRegForm({ ...regForm, pid: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-medium)', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '4px' }}>
                      AICTE Regional Jurisdiction:
                    </label>
                    <select
                      value={regForm.region}
                      onChange={(e) => setRegForm({ ...regForm, region: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-medium)', fontSize: '0.85rem' }}
                    >
                      <option value="Western Region (WRO)">Western Region (WRO - Maharashtra/Goa)</option>
                      <option value="Northern Region (NRO)">Northern Region (NRO - UP/Bihar)</option>
                      <option value="Southern Region (SRO)">Southern Region (SRO - Tamil Nadu/AP)</option>
                      <option value="South-Western Region (SWRO)">South-Western Region (SWRO - Karnataka/Kerala)</option>
                      <option value="Eastern Region (ERO)">Eastern Region (ERO - West Bengal/Odisha)</option>
                      <option value="Central Region (CRO)">Central Region (CRO - MP/Gujarat)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '4px' }}>
                      Campus City & State: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bhubaneswar, Odisha"
                      value={regForm.location}
                      onChange={(e) => setRegForm({ ...regForm, location: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-medium)', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '4px' }}>
                      Campus Area (Acres):
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={regForm.landAreaAcres}
                      onChange={(e) => setRegForm({ ...regForm, landAreaAcres: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-medium)', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '4px' }}>
                      Principal / Director Name:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. P. K. Patnaik, Ph.D."
                      value={regForm.principalName}
                      onChange={(e) => setRegForm({ ...regForm, principalName: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-medium)', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '4px' }}>
                      Sanctioned Intake Capacity:
                    </label>
                    <input
                      type="number"
                      value={regForm.totalIntake}
                      onChange={(e) => setRegForm({ ...regForm, totalIntake: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-medium)', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                {/* Login Credentials for this new college */}
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', marginBottom: '8px' }}>
                    Create Sign-In Credentials for this Institution:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Login Username (e.g. INST-KALINGA)"
                        value={regForm.username}
                        onChange={(e) => setRegForm({ ...regForm, username: e.target.value })}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border-medium)', fontSize: '0.82rem' }}
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        required
                        placeholder="Login Password"
                        value={regForm.password}
                        onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border-medium)', fontSize: '0.82rem' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold"
                  id="btn-submit-registration"
                >
                  <PlusCircle size={15} />
                  <span>Register & Open Institute Portal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
