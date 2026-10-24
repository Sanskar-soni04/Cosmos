import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getStoredUser, 
  saveStoredUser,
  DEFAULT_INSTITUTE_USER,
  DEFAULT_ADMIN_USER,
  DEFAULT_COMMITTEE_USER
} from '../data/liveStore';

// Demo seed accounts for all 5 portal types (Section 4 & 15 Specification)
export const DEMO_PORTAL_ACCOUNTS = {
  institution: [
    {
      id: 'USR-INST-001',
      username: 'principal@aryabhata.ac.in',
      name: 'Dr. Ramesh Sharma',
      role: 'INSTITUTION_ADMIN',
      portal: 'institution',
      designation: 'Principal & Head of Institution',
      institutionId: 'AICTE-2026-REG-84920',
      institutionName: 'Aryabhata Institute of Technology & Management',
      region: 'Central',
      state: 'Madhya Pradesh',
      email: 'principal@aryabhata.ac.in',
      requires2FA: false
    },
    {
      id: 'USR-INST-002',
      username: 'admin@bhagalpur.edu',
      name: 'Prof. Ananya Sen',
      role: 'INSTITUTION_STAFF',
      portal: 'institution',
      designation: 'Registrar / Compliance Coordinator',
      institutionId: 'AICTE-2026-REG-84921',
      institutionName: 'Bhagalpur College of Engineering & Tech',
      region: 'Eastern',
      state: 'Bihar',
      email: 'admin@bhagalpur.edu',
      requires2FA: false
    }
  ],
  officer: [
    {
      id: 'USR-REG-01',
      username: 'ro.central@aicte-india.org',
      name: 'Dr. Vivek Ranade',
      role: 'REGIONAL_OFFICER',
      portal: 'officer',
      designation: 'Regional Officer (CRO - Bhopal)',
      region: 'Central',
      requires2FA: true,
      totpSecret: 'AICTE2026CRO'
    },
    {
      id: 'USR-BUR-01',
      username: 'bureau.approval@aicte-india.org',
      name: 'Dr. Sunita Deshmukh',
      role: 'BUREAU_OFFICER',
      portal: 'officer',
      designation: 'Advisor & Bureau Head (Approval Bureau HQ)',
      region: 'HQ - New Delhi',
      requires2FA: true,
      totpSecret: 'AICTE2026HQ'
    },
    {
      id: 'USR-SCRUT-01',
      username: 'scrutiny.cro@aicte-india.org',
      name: 'Er. Rajeshwar Iyer',
      role: 'SCRUTINY_OFFICER',
      portal: 'officer',
      designation: 'Senior Scrutiny Officer',
      region: 'Central',
      requires2FA: true,
      totpSecret: 'AICTE2026SCRUT'
    }
  ],
  evc: [
    {
      id: 'USR-EVC-01',
      username: 'evc.singh@iitd.ac.in',
      name: 'Prof. Harpreet Singh',
      role: 'EVC_MEMBER',
      portal: 'evc',
      designation: 'Senior EVC Member (Civil & Infra Specialist)',
      institution: 'IIT Delhi',
      expertise: ['Infrastructure', 'Building Safety', 'Laboratories'],
      requires2FA: true,
      totpSecret: 'AICTE2026EVC'
    },
    {
      id: 'USR-EVC-02',
      username: 'evc.coord@aicte-india.org',
      name: 'Dr. Nalini Swaminathan',
      role: 'EVC_COORDINATOR',
      portal: 'evc',
      designation: 'National EVC Scheduling Coordinator',
      region: 'HQ - New Delhi',
      requires2FA: true,
      totpSecret: 'AICTE2026COORD'
    }
  ],
  committee: [
    {
      id: 'USR-SAC-01',
      username: 'justice.sharma@sac.gov.in',
      name: 'Hon. Justice (Retd.) K. K. Sharma',
      role: 'SAC_SHC_MEMBER',
      portal: 'committee',
      designation: 'Chairperson, Standing Appellate Committee (SAC)',
      requires2FA: true,
      totpSecret: 'AICTE2026SAC'
    },
    {
      id: 'USR-SHC-01',
      username: 'prof.murthy@shc.gov.in',
      name: 'Prof. K. V. R. Murthy',
      role: 'SAC_SHC_MEMBER',
      portal: 'committee',
      designation: 'Member, Standing Hearing Committee (SHC)',
      requires2FA: true,
      totpSecret: 'AICTE2026SHC'
    }
  ],
  admin: [
    {
      id: 'USR-SYS-01',
      username: 'admin.workflow@aicte-india.org',
      name: 'Sanjeev Kumar (NIC / AICTE)',
      role: 'SYSTEM_ADMIN',
      portal: 'admin',
      designation: 'Lead System & Workflow Architect',
      requires2FA: true,
      totpSecret: 'AICTE2026ADMIN'
    }
  ]
};

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  switchRole: () => {},
  verifyTOTP: () => false
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());

  useEffect(() => {
    saveStoredUser(user);
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    return true;
  };

  const logout = () => {
    setUser(null);
    saveStoredUser(null);
  };

  const switchRole = (portalType, index = 0) => {
    const accountList = DEMO_PORTAL_ACCOUNTS[portalType];
    if (accountList && accountList[index]) {
      const selected = accountList[index];
      setUser(selected);
      return selected;
    }
    return null;
  };

  const verifyTOTP = (inputCode) => {
    // Demo TOTP validator: accepts '123456' or last 6 chars of secret
    return inputCode === '123456' || (inputCode && inputCode.length === 6);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      switchRole,
      verifyTOTP,
      portalAccounts: DEMO_PORTAL_ACCOUNTS
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
