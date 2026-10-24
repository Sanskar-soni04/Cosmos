import React, { useState } from 'react';
import { useRouter, Link } from '../router/RouterContext';
import { 
  Building2, 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck2, 
  Cpu, 
  Clock, 
  GitCommit, 
  MapPin, 
  Gavel, 
  Sliders, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
  FileText,
  AlertTriangle,
  Lock,
  Layers,
  Database
} from 'lucide-react';

export function LandingPage() {
  const { navigate } = useRouter();

  // Track Application Search State
  const [trackAppId, setTrackAppId] = useState('');
  const [trackOtp, setTrackOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [trackResult, setTrackResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Active route tab for metro line visualizer
  const [activeRouteTab, setActiveRouteTab] = useState('ONLY_SCRUTINY');

  const handleSendOtp = () => {
    if (!trackAppId.trim()) return;
    setOtpSent(true);
    setTrackOtp('5849'); // Simulated OTP
  };

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      setTrackResult({
        appId: trackAppId || '1-84920-2026',
        institution: 'Aryabhata Institute of Technology & Management (Bhopal)',
        academicYear: '2026–2027',
        applicationType: 'Extension of Approval (EoA) + Additional Course',
        route: 'Route 2: Scrutiny + EVC',
        currentStage: 'SCRUTINY',
        stageTitle: 'Statutory Document Scrutiny (CRO)',
        slaDue: '02 Nov 2026 (7 days remaining)',
        deficiencyCount: 0,
        scoreSummary: 'Score: 88/100 | Mandatory Statutory Gate: CLEAR'
      });
    }, 400);
  };

  const METRO_ROUTES = [
    {
      id: 'ONLY_SCRUTINY',
      title: 'Route 1: Scrutiny Only',
      aphTag: 'Standard EoA & Routine Variances',
      color: '#1D4ED8',
      stops: [
        { label: 'SUBMITTED', title: 'Application Ingested', detail: 'SHA-256 verified, anti-virus scanned' },
        { label: 'SCRUTINY', title: 'Officer Document Scrutiny', detail: '6 AI agent findings reviewed by officer' },
        { label: 'DEFICIENCY / RESCRUTINY', title: 'Correction Loop', detail: 'Targeted revalidation of revised uploads' },
        { label: 'DECISION_PENDING', title: 'Competent Authority', detail: 'Executive Committee approval recording' }
      ]
    },
    {
      id: 'SCRUTINY_EVC',
      title: 'Route 2: Scrutiny + EVC',
      aphTag: 'New Technical Courses, Land/Site Shifts',
      color: '#7C3AED',
      stops: [
        { label: 'SUBMITTED', title: 'Application Ingested', detail: 'Portal registration & verification' },
        { label: 'SCRUTINY', title: 'Document Clearance', detail: 'Pre-requisite scrutiny gate completed' },
        { label: 'EVC_QUEUE & SCHEDULING', title: 'Inspection Scheduling', detail: 'COI-cleared member matching' },
        { label: 'EVC_COMPLETED', title: 'Inspection Report', detail: 'Geo-tagged observations submitted' },
        { label: 'DECISION_PENDING', title: 'Statutory Determination', detail: 'Competent authority order' }
      ]
    },
    {
      id: 'EVC_SAC_SHC',
      title: 'Route 3: EVC + SAC/SHC Hearing',
      aphTag: 'Appeals, Show Cause & Disputed Cases',
      color: '#991B1B',
      stops: [
        { label: 'SUBMITTED', title: 'Grievance / Appeal Lodged', detail: 'Legal grounds & evidence registered' },
        { label: 'EVC_QUEUE & INSPECTION', title: 'Fact-Finding EVC', detail: 'Physical on-site evidence gathering' },
        { label: 'SAC_SHC_HEARING', title: 'Quorum Committee Hearing', detail: 'Quorum bench review with live brief' },
        { label: 'DECISION_PENDING', title: 'Appellate Recommendation', detail: 'Final recording by Chairman AICTE' }
      ]
    },
    {
      id: 'ONLY_EVC',
      title: 'Route 4: Only EVC Inspection',
      aphTag: 'Surprise Inspections & Verification Visits',
      color: '#0D9488',
      stops: [
        { label: 'SUBMITTED', title: 'Direct Inspection Triggered', detail: 'Competent authority directive' },
        { label: 'EVC_SCHEDULED', title: 'Immediate Roster', detail: 'Unannounced peer committee dispatch' },
        { label: 'EVC_COMPLETED', title: 'Digital Rubric Upload', detail: 'Real-time photographic logging' },
        { label: 'DECISION_PENDING', title: 'Action Report Review', detail: 'Regulatory compliance determination' }
      ]
    }
  ];

  const activeRouteData = METRO_ROUTES.find(r => r.id === activeRouteTab) || METRO_ROUTES[0];

  return (
    <div id="main-content" style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #020E24 0%, #061938 45%, #0B2A5B 100%)',
        color: '#FFFFFF',
        padding: '4rem 1.25rem 3.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Background Glow */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(29, 78, 216, 0.25) 0%, rgba(2, 14, 36, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '850px' }}>
            {/* Regulatory Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.5)',
              borderRadius: '9999px',
              padding: '0.35rem 0.85rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: '#FBBF24',
              marginBottom: '1.5rem'
            }}>
              <Sparkles size={14} />
              <span>AICTE Regulatory Intelligence Platform • APH 2024–27 Automated Scrutiny System</span>
            </div>

            {/* Main Headline (Pure White High Contrast) */}
            <h1 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              textShadow: '0 3px 12px rgba(0, 0, 0, 0.45)'
            }}>
              Statutory Approval Workflow, Compliance Intelligence & Digital Audit Trail
            </h1>

            {/* Sub-Headline with Non-Negotiable Principle 1 */}
            <p style={{
              fontSize: '1.05rem',
              lineHeight: 1.65,
              color: '#CBD5E1',
              marginBottom: '2rem',
              maxWidth: '780px'
            }}>
              Automated end-to-end processing modeled after the <strong>Approval Process Handbook (APH 2024–27)</strong>. 
              Automation assists statutory scrutiny, document verification, and inspection scheduling—<strong>all final approvals and decisions are strictly reserved for authorized human authorities</strong>.
            </p>

            {/* Dual CTAs & Secondary Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              {/* CTA 1: Institution Portal */}
              <button
                onClick={() => navigate('/institution/login')}
                style={{
                  background: 'linear-gradient(135deg, #1D4ED8 0%, #103875 100%)',
                  color: '#FFFFFF',
                  padding: '0.85rem 1.65rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  border: '1px solid rgba(255,255,255,0.25)',
                  boxShadow: '0 8px 20px rgba(29, 78, 216, 0.35)',
                  cursor: 'pointer'
                }}
              >
                <Building2 size={18} />
                <span>Institution Login</span>
                <ArrowRight size={16} />
              </button>

              {/* CTA 2: Officer Portal */}
              <button
                onClick={() => navigate('/officer/login')}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  padding: '0.85rem 1.65rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <ShieldCheck size={18} style={{ color: '#F59E0B' }} />
                <span>Regulatory Officer Login</span>
              </button>

              {/* Secondary Quick Track Link */}
              <a
                href="#track"
                style={{
                  color: '#94A3B8',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  marginLeft: '0.5rem',
                  textDecoration: 'underline'
                }}
              >
                <Search size={14} />
                Track Application Status
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE KPI STATS STRIP */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '1.75rem 1.25rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderRight: '1px solid #F1F5F9', paddingRight: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#EFF6FF', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Poppins, sans-serif' }}>10,480+</div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>Approved Technical Institutes</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderRight: '1px solid #F1F5F9', paddingRight: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#F0FDF4', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck2 size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Poppins, sans-serif' }}>14,290+</div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>Applications Processed (2024-27)</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderRight: '1px solid #F1F5F9', paddingRight: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Poppins, sans-serif' }}>6.2 Days</div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>Avg Scrutiny SLA (Target: 15d)</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#FAF5FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GitCommit size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Poppins, sans-serif' }}>100% Chain</div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>SHA-256 Tamper-Proof Audit</div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FOUR APPROVAL ROUTES AS STOP-BY-STOP METRO LINES */}
      <section id="routes" style={{ padding: '4rem 1.25rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, color: '#1D4ED8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            Configurable Workflow State Machine
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Poppins, sans-serif' }}>
            Four Standard Approval Routes (APH 2024–27)
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#64748B', maxWidth: '680px', margin: '0.5rem auto 0' }}>
            Each application follows an immutable, version-pinned route based on its classification. Track every stage transition from submission to competent authority determination.
          </p>
        </div>

        {/* Route Selector Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {METRO_ROUTES.map((route) => {
            const isSelected = activeRouteTab === route.id;
            return (
              <button
                key={route.id}
                onClick={() => setActiveRouteTab(route.id)}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isSelected ? `2px solid ${route.color}` : '1px solid #CBD5E1',
                  background: isSelected ? route.color : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#334155',
                  boxShadow: isSelected ? `0 4px 12px ${route.color}33` : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {route.title}
              </button>
            );
          })}
        </div>

        {/* Metro Map Route Visualizer Card */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 10px 25px -5px rgba(10, 37, 76, 0.08)',
          padding: '2.5rem 2rem'
        }}>
          {/* Header Info */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '1.25rem', marginBottom: '2.5rem', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: activeRouteData.color, textTransform: 'uppercase' }}>
                Active Route Map
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0F172A' }}>
                {activeRouteData.title}
              </h3>
            </div>
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '0.35rem 0.75rem', fontSize: '0.8rem', color: '#475569' }}>
              Applicable to: <strong>{activeRouteData.aphTag}</strong>
            </div>
          </div>

          {/* Stop-by-Stop Metro Line Graphic */}
          <div style={{ position: 'relative', padding: '1rem 0' }}>
            {/* The Horizontal Metro Track Line */}
            <div style={{
              position: 'absolute',
              top: '28px',
              left: '5%',
              right: '5%',
              height: '6px',
              background: activeRouteData.color,
              borderRadius: '3px',
              zIndex: 1
            }} className="hidden md:block" />

            {/* Metro Stops Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${activeRouteData.stops.length}, 1fr)`, gap: '1.5rem', position: 'relative', zIndex: 2 }}>
              {activeRouteData.stops.map((stop, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  {/* Station Node */}
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: `4px solid ${activeRouteData.color}`,
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    color: activeRouteData.color,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}>
                    {index + 1}
                  </div>

                  {/* Stage Code Tag */}
                  <div style={{
                    display: 'inline-block',
                    background: `${activeRouteData.color}15`,
                    color: activeRouteData.color,
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    marginBottom: '0.35rem'
                  }}>
                    {stop.label}
                  </div>

                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.25rem' }}>
                    {stop.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4 }}>
                    {stop.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS: 5-STEP PIPELINE STRIP */}
      <section id="process" style={{ background: '#061938', color: '#FFFFFF', padding: '4.5rem 1.25rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Transparent Regulatory Architecture
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}>
              How the Automated Scrutiny Engine Operates
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#94A3B8', maxWidth: '650px', margin: '0.5rem auto 0' }}>
              Strictly engineered with deterministic checks, 6 AI specialist agents, human scrutiny oversight, and tamper-proof event hashing.
            </p>
          </div>

          {/* 5-Step Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem' }}>
            
            {/* Step 1 */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F59E0B', marginBottom: '0.75rem' }}>STEP 01</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>Institutional Ingest</div>
              <p style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.5, flex: 1 }}>
                Direct document upload with SHA-256 cryptographic hashing, MIME validation, and duplicate-hash detection across institutions.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F59E0B', marginBottom: '0.75rem' }}>STEP 02</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>6 Specialist Agents</div>
              <p style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.5, flex: 1 }}>
                OCR extraction and parallel analysis across Legal, Infrastructure, Faculty, Finance, Academic, and Regulatory compliance.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F59E0B', marginBottom: '0.75rem' }}>STEP 03</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>Deficiency Loop</div>
              <p style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.5, flex: 1 }}>
                Officer validates agent findings. Deficiencies issue with evidence links; institutions re-upload with targeted revalidation.
              </p>
            </div>

            {/* Step 4 */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F59E0B', marginBottom: '0.75rem' }}>STEP 04</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>EVC & SAC Stages</div>
              <p style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.5, flex: 1 }}>
                COI-cleared Expert Visit Committee inspection or Standing Hearing Committee session where required by the route.
              </p>
            </div>

            {/* Step 5 */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10B981', marginBottom: '0.75rem' }}>STEP 05</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>Competent Decision</div>
              <p style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.5, flex: 1 }}>
                Authorised statutory officer records recommendation/decision with reasons. Full append-only audit trail recorded.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PLAIN-LANGUAGE EXPLAINER: SCRUTINY vs EVC vs SAC/SHC */}
      <section style={{ padding: '4.5rem 1.25rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Poppins, sans-serif' }}>
            Regulatory Stages Explained in Plain Language
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#64748B', maxWidth: '650px', margin: '0.5rem auto 0' }}>
            A transparent guide to understand the roles and authority boundaries defined in the Approval Process Handbook.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Card 1: Scrutiny */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '2rem', borderTop: '4px solid #1D4ED8' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#DBEAFE', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <FileCheck2 size={20} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
              1. Statutory Scrutiny
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
              Desk audit performed by appointed Scrutiny Officers. Evaluates statutory land deeds, building stability certificates, fire safety NOCs, AICTE-prescribed faculty ratios, and audited balance sheets.
            </p>
            <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '6px', fontSize: '0.78rem', color: '#64748B' }}>
              <strong>Outcome:</strong> Cleared to Next Stage or Deficiency Notice issued with a strict correction deadline.
            </div>
          </div>

          {/* Card 2: EVC */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '2rem', borderTop: '4px solid #7C3AED' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#EDE9FE', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <MapPin size={20} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
              2. Expert Visit Committee (EVC)
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
              On-site peer inspection conducted by professors from Premier Institutes (IITs/NITs) with zero Conflict of Interest (COI). Verifies physical laboratories, campus land boundaries, library volumes, and barrier-free facilities.
            </p>
            <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '6px', fontSize: '0.78rem', color: '#64748B' }}>
              <strong>Outcome:</strong> Digital EVC Report submitted with photographic geo-coordinates and observations.
            </div>
          </div>

          {/* Card 3: SAC / SHC */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '2rem', borderTop: '4px solid #991B1B' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#FEE2E2', color: '#991B1B', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Gavel size={20} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
              3. Standing Appellate / Hearing Committee
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
              Quasi-judicial statutory appeal benches chaired by retired High Court Judges and distinguished academicians. Provides principles of natural justice and a formal hearing for disputed decisions or deficiency appeals.
            </p>
            <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '6px', fontSize: '0.78rem', color: '#64748B' }}>
              <strong>Outcome:</strong> Committee Recommendation recorded for final decision by Chairman AICTE.
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRACK APPLICATION WIDGET */}
      <section id="track" style={{ background: '#F1F5F9', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4rem 1.25rem' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#1D4ED8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              <Search size={14} />
              <span>Public Transparency Service</span>
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Poppins, sans-serif' }}>
              Track Application Status
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
              Enter your Permanent Application ID and mobile OTP to view limited, public-facing stage progress.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '2rem', boxShadow: '0 8px 24px rgba(10, 37, 76, 0.06)', border: '1px solid #CBD5E1' }}>
            <form onSubmit={handleTrackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    Application ID <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={trackAppId}
                    onChange={(e) => setTrackAppId(e.target.value)}
                    placeholder="e.g. 1-84920-2026"
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    Mobile Number / OTP
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={trackOtp}
                      onChange={(e) => setTrackOtp(e.target.value)}
                      placeholder={otpSent ? "Enter OTP (5849)" : "Mobile number"}
                      style={{
                        flex: 1,
                        padding: '0.65rem 0.75rem',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.875rem'
                      }}
                    />
                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        style={{
                          background: '#F1F5F9',
                          border: '1px solid #CBD5E1',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: '#1D4ED8',
                          cursor: 'pointer'
                        }}
                      >
                        Send OTP
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: 600, alignSelf: 'center' }}>
                        OTP: 5849
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSearching}
                style={{
                  background: '#0B2A5B',
                  color: '#FFFFFF',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Search size={16} />
                <span>{isSearching ? 'Querying AICTE Ledger...' : 'Check Live Status'}</span>
              </button>
            </form>

            {/* Track Result Display */}
            {trackResult && (
              <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid #E2E8F0', animation: 'fadeIn 0.2s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1D4ED8', textTransform: 'uppercase' }}>
                      Application Found
                    </span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>
                      {trackResult.institution}
                    </h4>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                      ID: {trackResult.appId} • AY: {trackResult.academicYear}
                    </div>
                  </div>
                  <span className="badge-review">
                    <Clock size={12} />
                    <span>In Progress</span>
                  </span>
                </div>

                <div style={{ background: '#F8FAFC', borderRadius: '8px', padding: '1rem', border: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.8rem' }}>
                  <div>
                    <div style={{ color: '#64748B' }}>Current Stage</div>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>{trackResult.stageTitle}</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748B' }}>Approval Route</div>
                    <div style={{ fontWeight: 600, color: '#1D4ED8' }}>{trackResult.route}</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748B' }}>SLA Target</div>
                    <div style={{ fontWeight: 600, color: '#D97706' }}>{trackResult.slaDue}</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748B' }}>Statutory Gate</div>
                    <div style={{ fontWeight: 600, color: '#15803D' }}>CLEAR (All Mandatory Docs Present)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
