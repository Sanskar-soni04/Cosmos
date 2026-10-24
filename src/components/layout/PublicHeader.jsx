import React, { useState, useRef, useEffect } from 'react';
import { useRouter, Link } from '../../router/RouterContext';
import { useAuth } from '../../auth/AuthContext';
import { 
  Building2, 
  Shield, 
  GraduationCap, 
  MapPin, 
  Gavel, 
  Sliders, 
  ChevronDown, 
  LogOut, 
  UserCheck, 
  ExternalLink,
  Compass,
  FileCheck2,
  Sparkles,
  HelpCircle,
  Palette
} from 'lucide-react';
import { DESIGN_TOKENS } from '../../theme/tokens';

export function PublicHeader() {
  const { path, navigate } = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMegaMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePortalSelect = (loginUrl) => {
    setMegaMenuOpen(false);
    navigate(loginUrl);
  };

  return (
    <header style={{ background: '#0B2A5B', borderBottom: '1px solid rgba(255,255,255,0.12)', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 15px rgba(2, 14, 36, 0.25)' }}>
      {/* Indian Tricolor Stripe */}
      <div style={{ height: '3px', width: '100%', background: 'linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand & Neutral Emblem */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', textDecoration: 'none' }}>
          {/* Neutral Placeholder Emblem */}
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #061938 0%, #103875 100%)',
            border: '2px solid #F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(245, 158, 11, 0.25)',
            flexShrink: 0
          }} title="Neutral Emblem (Placeholder for Statutory Agency)">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.75">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em', fontFamily: 'Poppins, sans-serif' }}>
                AICTE APPROVAL WORKFLOW
              </span>
              <span style={{
                background: '#F59E0B',
                color: '#061938',
                fontSize: '0.65rem',
                fontWeight: 800,
                padding: '0.1rem 0.4rem',
                borderRadius: '3px',
                letterSpacing: '0.04em'
              }}>
                PROTOTYPE
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 500 }}>
              Compliance Monitoring & Alert Management System (APH 2024–27)
            </div>
          </div>
        </Link>

        {/* Primary Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }} className="hidden md:flex">
          <Link 
            to="/" 
            style={{ 
              color: path === '/' ? '#F59E0B' : '#E2E8F0', 
              fontSize: '0.85rem', 
              fontWeight: 500,
              padding: '0.35rem 0.5rem',
              borderBottom: path === '/' ? '2px solid #F59E0B' : '2px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            Home
          </Link>

          <a 
            href="/#routes" 
            style={{ color: '#E2E8F0', fontSize: '0.85rem', fontWeight: 500 }}
            onClick={(e) => {
              if (path === '/') {
                e.preventDefault();
                document.getElementById('routes')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Approval Routes
          </a>

          <a 
            href="/#process" 
            style={{ color: '#E2E8F0', fontSize: '0.85rem', fontWeight: 500 }}
            onClick={(e) => {
              if (path === '/') {
                e.preventDefault();
                document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            How It Works
          </a>

          <a 
            href="/#track" 
            style={{ color: '#E2E8F0', fontSize: '0.85rem', fontWeight: 500 }}
            onClick={(e) => {
              if (path === '/') {
                e.preventDefault();
                document.getElementById('track')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Track Status
          </a>

          <Link 
            to="/styleguide" 
            style={{ 
              color: path === '/styleguide' ? '#F59E0B' : '#94A3B8', 
              fontSize: '0.82rem', 
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <Palette size={13} />
            Styleguide
          </Link>
        </nav>

        {/* Right CTA / User State */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isAuthenticated && user ? (
            /* Logged in state with quick portal drop */
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }} className="hidden sm:block">
                <div style={{ color: '#FFFFFF', fontSize: '0.82rem', fontWeight: 600 }}>{user.name}</div>
                <div style={{ color: '#F59E0B', fontSize: '0.7rem' }}>{user.role}</div>
              </div>
              <button
                onClick={logout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.75rem',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#FECACA',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                title="Sign Out"
              >
                <LogOut size={13} />
                <span>Exit</span>
              </button>
            </div>
          ) : (
            /* Portal Login Mega-Menu Dropdown */
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, #1D4ED8 0%, #103875 100%)',
                  color: '#FFFFFF',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.25)',
                  boxShadow: '0 4px 10px rgba(29, 78, 216, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
              >
                <Shield size={15} style={{ color: '#F59E0B' }} />
                <span>Portals Login</span>
                <ChevronDown size={14} style={{ transform: megaMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {/* Mega-Menu Dropdown Panel with 5 Dedicated Portals */}
              {megaMenuOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 8px)',
                  width: '380px',
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  boxShadow: '0 20px 40px rgba(2, 14, 36, 0.25), 0 0 0 1px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  zIndex: 2000,
                  animation: 'fadeIn 0.15s ease'
                }}>
                  {/* Mega-menu Header */}
                  <div style={{ background: '#061938', color: '#FFFFFF', padding: '0.75rem 1rem', borderBottom: '2px solid #F59E0B' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Select Your Authorized Role Portal
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                      Each stakeholder group accesses an isolated, role-scoped workspace
                    </div>
                  </div>

                  {/* 5 Portals List */}
                  <div style={{ padding: '0.5rem' }}>
                    {/* 1. Institution Portal */}
                    <button
                      onClick={() => handlePortalSelect('/institution/login')}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.65rem 0.75rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        borderRadius: '6px',
                        background: 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                        borderBottom: '1px solid #F1F5F9'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#EFF6FF'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#DBEAFE', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <GraduationCap size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1D4ED8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          Institution Portal
                          <span style={{ fontSize: '0.65rem', background: '#DBEAFE', color: '#1D4ED8', padding: '0.05rem 0.35rem', borderRadius: '4px' }}>Applicant</span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '1px' }}>
                          For AICTE approved institutes & new technical education applicants
                        </div>
                      </div>
                    </button>

                    {/* 2. Regional & Bureau Officer Portal */}
                    <button
                      onClick={() => handlePortalSelect('/officer/login')}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.65rem 0.75rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        borderRadius: '6px',
                        background: 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                        borderBottom: '1px solid #F1F5F9'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#E2E8F0', color: '#0B2A5B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <Shield size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0B2A5B', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          Officer Portal
                          <span style={{ fontSize: '0.65rem', background: '#E2E8F0', color: '#0B2A5B', padding: '0.05rem 0.35rem', borderRadius: '4px' }}>RO / Bureau / Scrutiny</span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '1px' }}>
                          Scrutiny review, regional case queues & national HQ monitoring
                        </div>
                      </div>
                    </button>

                    {/* 3. EVC Member Portal */}
                    <button
                      onClick={() => handlePortalSelect('/evc/login')}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.65rem 0.75rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        borderRadius: '6px',
                        background: 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                        borderBottom: '1px solid #F1F5F9'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#F5F3FF'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#EDE9FE', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <MapPin size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#7C3AED', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          EVC Member Portal
                          <span style={{ fontSize: '0.65rem', background: '#EDE9FE', color: '#7C3AED', padding: '0.05rem 0.35rem', borderRadius: '4px' }}>Inspection</span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '1px' }}>
                          Assigned physical/online visits, checklist execution & report submission
                        </div>
                      </div>
                    </button>

                    {/* 4. SAC / SHC Hearing Committee Portal */}
                    <button
                      onClick={() => handlePortalSelect('/committee/login')}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.65rem 0.75rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        borderRadius: '6px',
                        background: 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                        borderBottom: '1px solid #F1F5F9'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#FEF2F2'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#FEE2E2', color: '#991B1B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <Gavel size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#991B1B', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          SAC / SHC Committee Portal
                          <span style={{ fontSize: '0.65rem', background: '#FEE2E2', color: '#991B1B', padding: '0.05rem 0.35rem', borderRadius: '4px' }}>Hearing</span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '1px' }}>
                          Standing Appellate Committee & Standing Hearing Committee hearings
                        </div>
                      </div>
                    </button>

                    {/* 5. System Administrator Portal */}
                    <button
                      onClick={() => handlePortalSelect('/admin/login')}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.65rem 0.75rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        borderRadius: '6px',
                        background: 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#E2E8F0', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <Sliders size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          System Admin Portal
                          <span style={{ fontSize: '0.65rem', background: '#E2E8F0', color: '#475569', padding: '0.05rem 0.35rem', borderRadius: '4px' }}>Config & Engine</span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '1px' }}>
                          Workflow rules, stage transitions, escalation ladders & demo simulator
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
