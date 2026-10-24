/**
 * AICTE Approval Workflow & Compliance System
 * Design System Tokens (Section 16 Specification)
 * 
 * Brand Colors, Semantic Statuses, Portal Accents, Typography & Shadows
 */

export const DESIGN_TOKENS = {
  // Brand Palette
  brand: {
    navyDeep: '#0B2A5B',      // Primary Header, Bureau & Authority
    navyDarkest: '#061938',   // Deep backdrop
    blueRoyal: '#1D4ED8',     // Interactive CTA & Institution Portal
    blueLight: '#3B82F6',     // Secondary accents
    saffronAccent: '#F59E0B', // Highlight bar & alert badge
    saffronDeep: '#D97706',   // Hover state
    greenIndia: '#15803D',    // Success & verified status
    greenLight: '#22C55E',    // Positive delta
  },

  // Semantic Status Colors (Always paired with Icon + Text)
  status: {
    PASS: {
      label: 'Compliant / Passed',
      color: '#15803D',
      bg: 'rgba(21, 128, 61, 0.10)',
      border: '#86EFAC',
      badgeClass: 'badge-pass',
      icon: 'CheckCircle2'
    },
    REVIEW_REQUIRED: {
      label: 'Human Review Required',
      color: '#D97706',
      bg: 'rgba(217, 119, 6, 0.12)',
      border: '#FDE68A',
      badgeClass: 'badge-review',
      icon: 'AlertCircle'
    },
    FAIL_DEFICIENCY: {
      label: 'Deficiency Identified',
      color: '#DC2626',
      bg: 'rgba(220, 38, 38, 0.10)',
      border: '#FECACA',
      badgeClass: 'badge-fail',
      icon: 'XCircle'
    },
    MISSING: {
      label: 'Mandatory Doc Missing',
      color: '#B91C1C',
      bg: 'rgba(185, 28, 28, 0.08)',
      border: '#F87171',
      badgeClass: 'badge-missing',
      icon: 'FileQuestion'
    },
    EXTRACTION_ERROR: {
      label: 'OCR / Extraction Unreadable',
      color: '#6B21A8',
      bg: 'rgba(107, 33, 168, 0.10)',
      border: '#D8B4FE',
      badgeClass: 'badge-extraction-error',
      icon: 'FileWarning'
    },
    OVERDUE: {
      label: 'Overdue / Escalated',
      color: '#991B1B',
      bg: 'rgba(153, 27, 27, 0.14)',
      border: '#FCA5A5',
      badgeClass: 'badge-overdue',
      icon: 'Clock'
    },
    EXPIRING: {
      label: 'Expiring Soon (<= 90d)',
      color: '#B45309',
      bg: 'rgba(180, 83, 9, 0.12)',
      border: '#FCD34D',
      badgeClass: 'badge-expiring',
      icon: 'Hourglass'
    },
    AT_RISK: {
      label: 'SLA At Risk',
      color: '#EA580C',
      bg: 'rgba(234, 88, 12, 0.12)',
      border: '#FDBA74',
      badgeClass: 'badge-at-risk',
      icon: 'AlertTriangle'
    }
  },

  // Per-Portal Accent Stripe and Identity
  portals: {
    institution: {
      id: 'institution',
      title: 'Institution Portal',
      subtitle: 'For AICTE Approved Institutes & New Applicants',
      accent: '#1D4ED8', // Royal Blue
      accentClass: 'border-portal-institution',
      loginRoute: '/institution/login',
      dashboardRoute: '/institution/dashboard',
      roles: ['INSTITUTION_ADMIN', 'INSTITUTION_STAFF'],
      icon: 'GraduationCap'
    },
    officer: {
      id: 'officer',
      title: 'Regional & Bureau Portal',
      subtitle: 'For Regional Officers, Scrutiny Staff & Bureau HQ',
      accent: '#0B2A5B', // Deep Navy
      accentClass: 'border-portal-officer',
      loginRoute: '/officer/login',
      dashboardRoute: '/officer/dashboard',
      roles: ['REGIONAL_OFFICER', 'BUREAU_OFFICER', 'SCRUTINY_OFFICER'],
      icon: 'ShieldCheck'
    },
    evc: {
      id: 'evc',
      title: 'EVC Member Portal',
      subtitle: 'Expert Visit Committee for Inspections & Observations',
      accent: '#7C3AED', // Violet
      accentClass: 'border-portal-evc',
      loginRoute: '/evc/login',
      dashboardRoute: '/evc/dashboard',
      roles: ['EVC_MEMBER', 'EVC_COORDINATOR'],
      icon: 'MapPin'
    },
    committee: {
      id: 'committee',
      title: 'SAC / SHC Hearing Portal',
      subtitle: 'Standing Appeal & Hearing Committee Sessions',
      accent: '#991B1B', // Maroon
      accentClass: 'border-portal-committee',
      loginRoute: '/committee/login',
      dashboardRoute: '/committee/dashboard',
      roles: ['SAC_SHC_MEMBER'],
      icon: 'Gavel'
    },
    admin: {
      id: 'admin',
      title: 'System Administrator Portal',
      subtitle: 'Workflow Config, APH Rules, Policies & Health',
      accent: '#475569', // Slate
      accentClass: 'border-portal-admin',
      loginRoute: '/admin/login',
      dashboardRoute: '/admin/dashboard',
      roles: ['SYSTEM_ADMIN'],
      icon: 'Sliders'
    }
  },

  // Neutrals (Slate scale)
  neutrals: {
    bgPage: '#F8FAFC',
    bgCard: '#FFFFFF',
    borderSubtle: '#E2E8F0',
    borderMedium: '#CBD5E1',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#64748B',
  },

  // Typography
  typography: {
    fontSans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontHeading: "'Poppins', 'Inter', sans-serif",
    fontHindi: "'Noto Sans Devanagari', 'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  }
};
