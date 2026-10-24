import React, { useState } from 'react';
import { 
  Award, 
  Printer, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  Building2, 
  FileText, 
  Hash, 
  ExternalLink,
  QrCode
} from 'lucide-react';

export function EoALetterModal({ isOpen, onClose, institution, isFixed = true }) {
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isOpen || !institution) return null;

  const currentYear = "2026-27";
  const councilRef = `F.No. ${institution.regionalOffice || 'Western'}/1-${institution.pid || '8492001'}/${currentYear.slice(0, 4)}/EOA`;
  const issueDate = "24-Oct-2026";
  const certDigest = `sha256:d94fa28019b48c7e90142b6a0991823f66291b72a088cdb918247f71a92bf01e`;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(certDigest);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const courses = institution.courses && institution.courses.length > 0 ? institution.courses : [
    { name: "Computer Science & Engineering", intake: 180, level: "UG" },
    { name: "Artificial Intelligence & Machine Learning", intake: 60, level: "UG (New)" },
    { name: "Electronics & Telecommunication", intake: 120, level: "UG" },
    { name: "Information Technology", intake: 120, level: "UG" },
    { name: "Mechanical Engineering", intake: 60, level: "UG" },
    { name: "Master of Business Administration (MBA)", intake: 120, level: "PG" }
  ];

  const totalSanctionedIntake = courses.reduce((acc, c) => acc + (c.intake || 0), 0);

  return (
    <div className="modal-backdrop" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(2, 14, 36, 0.8)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1.5rem',
      overflowY: 'auto'
    }}>
      <div 
        className="eoa-modal-card"
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '920px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
          border: '1px solid #cbd5e1',
          overflow: 'hidden'
        }}
      >
        {/* Top Action Bar (hidden on print) */}
        <div 
          className="no-print"
          style={{
            background: 'var(--aicte-navy-darkest)',
            padding: '12px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid var(--aicte-gold)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={20} style={{ color: 'var(--aicte-gold)' }} />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.5px' }}>
                OFFICIAL EXTENSION OF APPROVAL (EoA) LETTER
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                AICTE Approval Process Handbook 2024–27 • Council Seal Verified
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handlePrint}
              style={{
                background: 'var(--aicte-gold)',
                color: 'var(--aicte-navy-darkest)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
              id="btn-print-eoa"
            >
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#ffffff',
                padding: '6px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              id="btn-close-eoa"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Letter Body */}
        <div 
          className="eoa-letter-container"
          style={{
            padding: '2.5rem 3rem',
            overflowY: 'auto',
            background: '#ffffff',
            color: '#0f172a',
            fontFamily: "'Times New Roman', Times, serif",
            lineHeight: 1.5,
            fontSize: '0.88rem'
          }}
        >
          {/* Official AICTE Letterhead */}
          <div style={{ textAlign: 'center', borderBottom: '2px double #0a254c', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
              {/* National Emblem Representation */}
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: '2px solid #0a254c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                color: '#0a254c',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-sans)',
                background: '#f8fafc'
              }}>
                सत्यमेव<br/>जयते
              </div>

              <div>
                <h1 style={{ 
                  fontSize: '1.45rem', 
                  fontWeight: 900, 
                  color: '#0a254c', 
                  margin: 0, 
                  letterSpacing: '1px',
                  fontFamily: 'var(--font-sans)'
                }}>
                  ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
                </h1>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', letterSpacing: '0.5px' }}>
                  (A STATUTORY BODY OF THE GOVERNMENT OF INDIA, MINISTRY OF EDUCATION)
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Nelson Mandela Marg, Vasant Kunj, New Delhi-110070 | Website: www.aicte-india.org
                </div>
              </div>
            </div>
          </div>

          {/* Letter Meta Reference & Date */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
            <div>
              <strong>{councilRef}</strong>
            </div>
            <div>
              <strong>Date: {issueDate}</strong>
            </div>
          </div>

          {/* Addressee */}
          <div style={{ marginBottom: '1.25rem', fontSize: '0.85rem' }}>
            <div>To,</div>
            <div style={{ fontWeight: 700 }}>The Principal Secretary / Commissioner (Higher & Technical Education)</div>
            <div>Government of {institution.location?.split(',')[1]?.trim() || 'Maharashtra'}</div>
            <div style={{ marginTop: '6px' }}>And to:</div>
            <div style={{ fontWeight: 700 }}>The Director / Principal</div>
            <div style={{ fontWeight: 700, color: '#0a254c' }}>{institution.name}</div>
            <div>{institution.location}</div>
          </div>

          {/* Subject */}
          <div style={{ 
            background: '#f1f5f9', 
            padding: '10px 14px', 
            borderRadius: '4px', 
            borderLeft: '4px solid #0a254c', 
            marginBottom: '1.25rem',
            fontSize: '0.85rem'
          }}>
            <div>
              <strong>Sub:</strong> Approval Process 2024–27 – <strong>Extension of Approval (EoA) / Sanctioned Intake</strong> for the Academic Year <strong>{currentYear}</strong>.
            </div>
            <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '2px' }}>
              <strong>Ref:</strong> Online Application of the Institution for Academic Year {currentYear} (Docket: {institution.id}).
            </div>
          </div>

          {/* Conveyance Paragraph */}
          <p style={{ textAlign: 'justify', marginBottom: '1rem', textIndent: '2rem' }}>
            Sir/Madam, In terms of the provisions under the All India Council for Technical Education (Grant of Approvals for Technical Institutions) Regulations, 2024 notified vide F.No. AB/AICTE/REG/2024 and norms, standards, procedures and conditions prescribed by the Council from time to time, and based on the recommendations of the Scrutiny Committee and Expert Visit Committee (EVC), I am directed to convey the approval of the Council to:
          </p>

          {/* Institution Master Details Table */}
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            marginBottom: '1.25rem', 
            fontSize: '0.8rem',
            border: '1px solid #94a3b8'
          }}>
            <tbody>
              <tr style={{ background: '#f8fafc' }}>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', width: '25%', fontWeight: 700 }}>Permanent Institute ID</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', width: '25%', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{institution.pid || '1-8492001'}</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', width: '25%', fontWeight: 700 }}>Application Docket ID</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', width: '25%', fontFamily: 'var(--font-mono)' }}>{institution.id}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Name of the Institution</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', fontWeight: 700, color: '#0a254c' }} colSpan={3}>
                  {institution.name}
                </td>
              </tr>
              <tr style={{ background: '#f8fafc' }}>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Campus Address</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }} colSpan={3}>
                  {institution.location} (Total Campus Land Area: {institution.landAreaAcres || '7.8'} Acres)
                </td>
              </tr>
              <tr>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Institution Category / Type</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>{institution.category || 'Technical / Engineering'} (Autonomous)</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Regional Directorate</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>{institution.region || 'Western Regional Office (WRO)'}</td>
              </tr>
            </tbody>
          </table>

          {/* Courses & Sanctioned Intake Table */}
          <div style={{ marginBottom: '6px', fontWeight: 700, fontSize: '0.85rem' }}>
            To conduct the following Courses with the Approved Sanctioned Intake indicated below for the Academic Year {currentYear}:
          </div>

          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            marginBottom: '1.25rem', 
            fontSize: '0.78rem',
            border: '1px solid #94a3b8'
          }}>
            <thead>
              <tr style={{ background: '#0a254c', color: '#ffffff', textAlign: 'center' }}>
                <th style={{ padding: '7px 8px', border: '1px solid #475569' }}>#</th>
                <th style={{ padding: '7px 8px', border: '1px solid #475569' }}>Program</th>
                <th style={{ padding: '7px 8px', border: '1px solid #475569' }}>Level</th>
                <th style={{ padding: '7px 8px', border: '1px solid #475569', textAlign: 'left' }}>Course / Discipline</th>
                <th style={{ padding: '7px 8px', border: '1px solid #475569' }}>Affiliating Body</th>
                <th style={{ padding: '7px 8px', border: '1px solid #475569' }}>Intake 25-26</th>
                <th style={{ padding: '7px 8px', border: '1px solid #475569' }}>Intake {currentYear}</th>
                <th style={{ padding: '7px 8px', border: '1px solid #475569' }}>NRI</th>
                <th style={{ padding: '7px 8px', border: '1px solid #475569' }}>TFW</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, idx) => {
                const prevIntake = course.level?.includes('New') ? 0 : course.intake;
                return (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? '#ffffff' : '#f8fafc', textAlign: 'center' }}>
                    <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1' }}>{idx + 1}</td>
                    <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1' }}>ENGINEERING & TECH</td>
                    <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 600 }}>{course.level || 'UG'}</td>
                    <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', textAlign: 'left', fontWeight: 700, color: '#0a254c' }}>
                      {course.name}
                    </td>
                    <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontSize: '0.72rem' }}>State Tech Univ</td>
                    <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1' }}>{prevIntake}</td>
                    <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 800, color: '#16a34a' }}>
                      {course.intake}
                    </td>
                    <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1' }}>Yes</td>
                    <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1' }}>Yes</td>
                  </tr>
                );
              })}
              <tr style={{ background: '#f1f5f9', fontWeight: 800 }}>
                <td colSpan={6} style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'right' }}>
                  Total Sanctioned Intake:
                </td>
                <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', color: '#0a254c', fontSize: '0.88rem' }}>
                  {totalSanctionedIntake}
                </td>
                <td colSpan={2} style={{ padding: '8px', border: '1px solid #cbd5e1' }}></td>
              </tr>
            </tbody>
          </table>

          {/* Statutory Conditions & Mandatory Directives */}
          <div style={{ marginBottom: '1.25rem', fontSize: '0.78rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '4px', textDecoration: 'underline' }}>
              Statutory Terms and Conditions of Approval (APH 2024–27):
            </div>
            <ol style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px', color: '#334155' }}>
              <li>
                <strong>Anti-Ragging Compliance:</strong> The institution shall strictly comply with AICTE Regulations on Prevention and Prohibition of Ragging in Technical Institutions (F.No. 37-3/Legal/AICTE/2009).
              </li>
              <li>
                <strong>Student-Faculty Ratio (SFR):</strong> The institution must continuously maintain the cadre ratio and student-to-faculty ratio of 1:15 for UG programs as prescribed in APH 2024–27.
              </li>
              <li>
                <strong>Fire Safety & Building NOC:</strong> The Fire and Life Safety NOC along with Municipal Occupancy Certificate must be maintained valid throughout the academic duration without lapse.
              </li>
              <li>
                <strong>Aadhaar Biometric Attendance:</strong> Mandatory integration with the national AICTE Biometric Faculty Attendance portal for salary disbursement and service verification.
              </li>
              <li>
                <strong>Deficiency Liability:</strong> In the event of any false disclosure or suppression of facts, the Council reserves the right to withdraw approval under Section 10(k) of the AICTE Act.
              </li>
            </ol>
          </div>

          {/* Cryptographic Seal & Signatures */}
          <div style={{ 
            borderTop: '2px solid #0a254c', 
            paddingTop: '1.25rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            fontSize: '0.78rem'
          }}>
            {/* Left: Cryptographic QR & Token */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                border: '1px solid #cbd5e1',
                padding: '4px',
                background: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <QrCode size={54} style={{ color: '#0a254c' }} />
              </div>
              <div style={{ maxWidth: '280px' }}>
                <div style={{ fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} />
                  <span>Digitally Sealed & Verified</span>
                </div>
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#64748b', wordBreak: 'break-all', marginTop: '2px' }}>
                  {certDigest}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '2px' }}>
                  Timestamp: {issueDate} 11:42:09 IST
                </div>
              </div>
            </div>

            {/* Right: Digital Signatory */}
            <div style={{ textAlign: 'center', minWidth: '220px' }}>
              <div style={{ 
                fontFamily: "'Brush Script MT', cursive, serif", 
                fontSize: '1.4rem', 
                color: '#1e3a8a',
                lineHeight: 1
              }}>
                Prof. Rajive Kumar
              </div>
              <div style={{ fontWeight: 800, color: '#0a254c', marginTop: '4px' }}>
                Prof. Rajive Kumar
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                Member Secretary, AICTE
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                Digitally Signed with Council GPG Master Key
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div 
          className="no-print"
          style={{
            background: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            padding: '12px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#64748b' }}>
            <Hash size={14} />
            <span>Digital Ledger Audit:</span>
            <button 
              onClick={handleCopyHash}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                cursor: 'pointer',
                fontWeight: 600,
                textDecoration: 'underline',
                padding: 0
              }}
            >
              {copySuccess ? '✓ Copied Hash!' : 'Copy SHA-256 Digest'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handlePrint}
              className="btn-gold"
              style={{ fontSize: '0.8rem', padding: '6px 16px' }}
            >
              <Download size={14} />
              <span>Download Official Letter</span>
            </button>
            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '6px 14px' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
