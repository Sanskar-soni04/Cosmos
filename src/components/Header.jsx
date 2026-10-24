import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Globe, 
  Clock, 
  Volume2, 
  Search, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';

export function Header({ activeRole, fontSize, setFontSize, lang, setLang, currentUser, onLogout }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-IN', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header-wrapper">
      {/* National Tricolor Top Stripe */}
      <div className="tricolor-stripe" />

      {/* Top Gov Accessibility & Live Time Bar */}
      <div className="top-utility-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={13} style={{ color: 'var(--aicte-gold)' }} />
            <strong style={{ color: '#e2e8f0' }}>{currentTime}</strong>
          </span>
          <span style={{ color: '#475569' }}>|</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Building2 size={13} />
            <span>Government of India</span>
          </span>
          <span style={{ color: '#475569' }}>|</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Volume2 size={13} />
            <a href="#main" style={{ textDecoration: 'none' }}>Screen Reader Access</a>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Font Resizer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginRight: '4px' }}>Font:</span>
            <button 
              onClick={() => setFontSize('small')}
              style={{ 
                padding: '1px 6px', 
                borderRadius: '3px',
                background: fontSize === 'small' ? 'var(--aicte-gold)' : 'rgba(255,255,255,0.1)',
                color: fontSize === 'small' ? '#041022' : '#ffffff',
                fontWeight: 700,
                fontSize: '0.7rem'
              }}
            >
              A-
            </button>
            <button 
              onClick={() => setFontSize('normal')}
              style={{ 
                padding: '1px 6px', 
                borderRadius: '3px',
                background: fontSize === 'normal' ? 'var(--aicte-gold)' : 'rgba(255,255,255,0.1)',
                color: fontSize === 'normal' ? '#041022' : '#ffffff',
                fontWeight: 700,
                fontSize: '0.75rem'
              }}
            >
              A
            </button>
            <button 
              onClick={() => setFontSize('large')}
              style={{ 
                padding: '1px 6px', 
                borderRadius: '3px',
                background: fontSize === 'large' ? 'var(--aicte-gold)' : 'rgba(255,255,255,0.1)',
                color: fontSize === 'large' ? '#041022' : '#ffffff',
                fontWeight: 700,
                fontSize: '0.8rem'
              }}
            >
              A+
            </button>
          </div>

          <span style={{ color: '#475569' }}>|</span>

          {/* Language Toggle */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              padding: '2px 8px',
              borderRadius: '4px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: 'var(--aicte-gold)',
              fontWeight: 700,
              fontSize: '0.75rem'
            }}
          >
            <Globe size={12} />
            {lang === 'en' ? 'हिंदी (Hindi)' : 'English'}
          </button>

          <span style={{ color: '#475569' }}>|</span>

          {/* Official AICTE Accreditation Tag */}
          <div className="statutory-pill-badge">
            <Sparkles size={11} />
            <span>AICTE Regulation Bureau • Official Portal</span>
          </div>
        </div>
      </div>

      {/* Main AICTE Official Header */}
      <div className="aicte-main-header">
        <div className="header-container">
          <div className="logo-branding-group">
            {/* SVG AICTE Emblem (Accurate Gold & Blue Insignia) */}
            <div className="aicte-emblem-wrapper">
              <svg 
                className="aicte-emblem" 
                viewBox="0 0 120 120" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Sun burst cog rays */}
                <circle cx="60" cy="60" r="54" fill="#002147" stroke="#f59e0b" strokeWidth="3" />
                <circle cx="60" cy="60" r="48" fill="none" stroke="#ff9900" strokeWidth="2" strokeDasharray="6,4" />
                {/* Gear teeth */}
                {[...Array(16)].map((_, i) => (
                  <rect 
                    key={i} 
                    x="56" 
                    y="4" 
                    width="8" 
                    height="8" 
                    rx="1.5" 
                    fill="#f59e0b" 
                    transform={`rotate(${i * 22.5} 60 60)`} 
                  />
                ))}
                {/* Center Lamp / Lotus / Tech flame */}
                <circle cx="60" cy="60" r="32" fill="#061938" stroke="#f59e0b" strokeWidth="2" />
                <path 
                  d="M60 38 C68 48 74 54 74 64 C74 72 68 76 60 76 C52 76 46 72 46 64 C46 54 52 48 60 38 Z" 
                  fill="url(#goldGradient)" 
                />
                <circle cx="60" cy="62" r="5" fill="#020e24" />
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="brand-text">
              <div className="hindi-title">
                {lang === 'hi' 
                  ? 'अखिल भारतीय तकनीकी शिक्षा परिषद् (विनियमन ब्यूरो)' 
                  : 'अखिल भारतीय तकनीकी शिक्षा परिषद्'}
              </div>
              <h1>
                ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
              </h1>
              <p>
                Integrated Approval Workflow Automation, Multi-Agent Compliance Monitoring & Audit Trail System
              </p>
            </div>
          </div>

          {/* Quick System Telemetry */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 10px #10b981',
                animation: 'pulse-ring 2s infinite'
              }} />
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                  APH 2026-27 Core
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                  6 AI Agents Active
                </div>
              </div>
            </div>

            {/* Authenticated Identity Chip & Logout Action (Strict RBAC - No Cross-Portal Switcher) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(2, 14, 36, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-md)',
              padding: '6px 12px'
            }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FFFFFF' }}>
                  {currentUser?.name || (activeRole === 'INSTITUTE' ? 'Institutional Applicant' : activeRole === 'COMMITTEE' ? 'Hearing Committee Member' : 'AICTE Officer')}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#F59E0B', fontWeight: 600 }}>
                  Role: {currentUser?.role || activeRole}
                </div>
              </div>

              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  title="Sign Out of Session"
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#FCA5A5',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.35)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                >
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
