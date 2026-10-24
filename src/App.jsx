import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './router/RouterContext';
import { AuthProvider, useAuth } from './auth/AuthContext';

// Shell & Layout Components (Phase 1)
import { DisclaimerRibbon } from './components/layout/DisclaimerRibbon';
import { TopUtilityBar } from './components/layout/TopUtilityBar';
import { PublicHeader } from './components/layout/PublicHeader';
import { PublicFooter } from './components/layout/PublicFooter';

// Public Pages (Phase 1)
import { LandingPage } from './pages/LandingPage';
import { StyleguidePage } from './pages/StyleguidePage';

// 5 Dedicated Role Login Portals (Phase 1)
import { InstitutionLoginPage } from './pages/login/InstitutionLoginPage';
import { OfficerLoginPage } from './pages/login/OfficerLoginPage';
import { EVCLoginPage } from './pages/login/EVCLoginPage';
import { CommitteeLoginPage } from './pages/login/CommitteeLoginPage';
import { AdminLoginPage } from './pages/login/AdminLoginPage';

// Portal Workspaces & Shells
import { Header } from './components/Header';
import { InstitutePortalShell } from './components/InstitutePortalShell';
import { AdminPortalShell } from './components/AdminPortalShell';
import { CommitteePortalShell } from './components/CommitteePortalShell';
import { NotificationToast } from './components/NotificationToast';
import { Footer } from './components/Footer';

import { 
  getStoredInstitutions, 
  saveInstitutions, 
  DEFAULT_INSTITUTIONS,
  DEFAULT_INSTITUTE_USER,
  DEFAULT_ADMIN_USER,
  DEFAULT_COMMITTEE_USER 
} from './data/liveStore';
import { INITIAL_GIT_COMMITS } from './data/mockData';
import { calculateInstitutionScore } from './utils/rulesEngine';

// Inner App Controller with Router & Auth hooks
function AppController() {
  const { path, navigate } = useRouter();
  const { user, isAuthenticated, logout, login } = useAuth();

  const [institutions, setInstitutions] = useState(getStoredInstitutions());
  const [commits, setCommits] = useState(() => {
    try {
      const stored = localStorage.getItem('aicte_audit_commits_live');
      return stored ? JSON.parse(stored) : INITIAL_GIT_COMMITS;
    } catch (e) {
      return INITIAL_GIT_COMMITS;
    }
  });

  const [isFixed, setIsFixed] = useState(false);
  const [notification, setNotification] = useState(null);
  const [fontSize, setFontSize] = useState('normal');
  const [lang, setLang] = useState('en');

  // Currently active institution for Institute view or selected in Admin scrutiny queue
  const [selectedInstId, setSelectedInstId] = useState(institutions[0]?.id || 'AICTE-2026-REG-84920');

  // Active institution object with guaranteed fallback
  const activeInstitution = institutions.find(i => i.id === selectedInstId) || institutions[0] || DEFAULT_INSTITUTIONS[0];

  // Save institutions to localStorage whenever updated
  useEffect(() => {
    saveInstitutions(institutions);
  }, [institutions]);

  // Save commits to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('aicte_audit_commits_live', JSON.stringify(commits));
    } catch (e) {
      console.error(e);
    }
  }, [commits]);

  const showToast = (title, message, type = 'info', hash = null) => {
    setNotification({ title, message, type, hash });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    showToast('Signed Out', 'You have been safely signed out of the AICTE portal.', 'info');
  };



  const handleAddAuditCommit = (commitObj) => {
    setCommits(prev => [commitObj, ...prev]);
  };

  const handleUpdateInstitution = (updatedInst) => {
    setInstitutions(prev => prev.map(inst => inst.id === updatedInst.id ? updatedInst : inst));
  };

  const handleSimulateFix = () => {
    setIsFixed(true);
    // Replace expired Fire Safety NOC with valid renewed NOC version 2
    const updatedDocs = (activeInstitution.documents || []).map(doc => {
      if (doc.category === 'Infrastructure & Safety' && (doc.title?.toLowerCase().includes('fire') || doc.filename?.toLowerCase().includes('fire'))) {
        return {
          ...doc,
          id: `${doc.id}-v2`,
          title: "Fire Safety Certificate (Renewed NOC)",
          filename: "Fire_Safety_NOC_Renewed_2026.pdf",
          status: "PASS",
          confidence: 99.8,
          findings: "Valid Municipal Fire NOC renewed. 12-month forward validity verified under APH Clause 4.2.",
          date: new Date().toISOString().split('T')[0]
        };
      }
      return doc;
    });

    const tempInst = {
      ...activeInstitution,
      documents: updatedDocs
    };

    // Calculate score dynamically via single source of truth rules engine
    const computed = calculateInstitutionScore(tempInst);

    const updated = {
      ...tempInst,
      priorityScore: computed.score,
      status: computed.status,
      mandatoryDeficiency: computed.isGateFailed,
      mandatoryGateStatus: computed.mandatoryGateStatus,
      deficiencyReason: computed.deficiencyReason,
      blockingReasons: computed.blockingReasons,
      unverifiedItems: computed.unverifiedItems,
      unverifiedWeight: computed.unverifiedWeight,
      categoryBreakdown: computed.breakdown,
      currentStageIndex: 3
    };

    handleUpdateInstitution(updated);
  };

  // Determine if user is in an authenticated portal view
  const isDashboardView = path.includes('/dashboard') || (isAuthenticated && !path.includes('/login') && path !== '/' && path !== '/styleguide');

  // Route Rendering Logic
  const renderCurrentRoute = () => {
    // 1. Authenticated Dashboard Views
    if (isDashboardView && isAuthenticated) {
      const role = user?.role || 'INSTITUTE';

      if (role === 'INSTITUTE' || role === 'INSTITUTION_ADMIN' || role === 'INSTITUTION_STAFF') {
        return (
          <InstitutePortalShell
            currentUser={user}
            institution={activeInstitution}
            setInstitution={handleUpdateInstitution}
            isFixed={isFixed}
            onSimulateFix={handleSimulateFix}
            onLogout={handleLogout}
            onAddAuditCommit={handleAddAuditCommit}
            showToast={showToast}
          />
        );
      }

      if (role === 'COMMITTEE' || role === 'SAC_SHC_MEMBER') {
        return (
          <CommitteePortalShell
            currentUser={user}
            institution={activeInstitution}
            institutions={institutions}
            onUpdateInstitution={handleUpdateInstitution}
            isFixed={isFixed}
            onSimulateFix={handleSimulateFix}
            onApproveScrutiny={() => {
              showToast('Scrutiny Endorsed', 'Application endorsed for EVC inspection.', 'success');
            }}
            onLogout={handleLogout}
            onAddAuditCommit={handleAddAuditCommit}
            showToast={showToast}
          />
        );
      }

      // Admin, Regional Officer, Bureau Officer, EVC Coordinator
      return (
        <AdminPortalShell
          currentUser={user}
          institutions={institutions}
          selectedInstitution={activeInstitution}
          setSelectedInstitution={(inst) => setSelectedInstId(inst.id)}
          commits={commits}
          onAddAuditCommit={handleAddAuditCommit}
          isFixed={isFixed}
          onSimulateFix={handleSimulateFix}
          onLogout={handleLogout}
          showToast={showToast}
        />
      );
    }

    // 2. The 5 Dedicated Role Login Portals
    if (path === '/institution/login') {
      return <InstitutionLoginPage />;
    }
    if (path === '/officer/login') {
      return <OfficerLoginPage />;
    }
    if (path === '/evc/login') {
      return <EVCLoginPage />;
    }
    if (path === '/committee/login') {
      return <CommitteeLoginPage />;
    }
    if (path === '/admin/login') {
      return <AdminLoginPage />;
    }

    // 3. Styleguide Route
    if (path === '/styleguide') {
      return <StyleguidePage />;
    }

    // 4. Default / Home Landing Page
    return <LandingPage />;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Persistent Top Prototype Disclaimer Ribbon (Session-Dismissible) */}
      <DisclaimerRibbon />

      {/* 2. Accessible Top Utility Bar (Contrast, Font Scale, Hindi/English) */}
      <TopUtilityBar lang={lang} onLangChange={setLang} />

      {/* 3. Navigation Header: Custom Portal Header when logged in to dashboard; PublicHeader on landing/login/styleguide */}
      {isDashboardView && isAuthenticated ? (
        <Header
          activeRole={user?.role}
          fontSize={fontSize}
          setFontSize={setFontSize}
          lang={lang}
          setLang={setLang}
          currentUser={user}
          onLogout={handleLogout}
        />
      ) : (
        <PublicHeader />
      )}

      {/* 4. Active Page Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {renderCurrentRoute()}
      </main>

      {/* 5. Footer */}
      {isDashboardView && isAuthenticated ? <Footer /> : <PublicFooter />}

      {/* 6. Global Real-Time Notification Toast */}
      <NotificationToast
        notification={notification}
        onClose={() => setNotification(null)}
      />
    </div>
  );
}

export function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <AppController />
      </AuthProvider>
    </RouterProvider>
  );
}

export default App;
