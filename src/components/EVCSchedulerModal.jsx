import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  Eye, 
  CheckCircle, 
  Building, 
  ShieldCheck, 
  FileText,
  Plus,
  Trash2,
  Sparkles
} from 'lucide-react';

export function EVCSchedulerModal({ 
  isOpen, 
  onClose, 
  onScheduleComplete, 
  institution, 
  institutions = [] 
}) {
  const [targetInstId, setTargetInstId] = useState(institution?.id || institutions[0]?.id || '');
  const [visitDate, setVisitDate] = useState('2026-11-12');
  const [inspectionMode, setInspectionMode] = useState('PHYSICAL');
  const [inspectionDirectives, setInspectionDirectives] = useState(
    'Verify physical built-up carpet area, conduct live fire hydrant pressure test, inspect AI/ML computer labs, and verify Aadhaar-linked biometric faculty attendance roster.'
  );

  // Fully editable panellists list
  const [panellists, setPanellists] = useState([
    { id: 1, role: 'Academic Expert (IIT/NIT Nominee)', name: 'Prof. Dr. A. K. Sen', designation: 'Senior Professor, Computer Engineering, IIT Bombay' },
    { id: 2, role: 'Industry Expert (CII / FICCI Nominee)', name: 'Er. Neha Joshi', designation: 'VP Engineering & Infrastructure, Tata Technologies' },
    { id: 3, role: 'AICTE Regional Directorate Convener', name: 'Dr. Vijay Sharma', designation: 'Joint Director, AICTE Western Regional Office' }
  ]);

  const [newPanellistName, setNewPanellistName] = useState('');
  const [newPanellistRole, setNewPanellistRole] = useState('Subject Matter Specialist');
  const [newPanellistDesignation, setNewPanellistDesignation] = useState('');

  if (!isOpen) return null;

  const currentTarget = institutions.find(i => i.id === targetInstId) || institution;

  const handleUpdatePanellist = (id, field, value) => {
    setPanellists(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleRemovePanellist = (id) => {
    if (panellists.length <= 1) {
      alert("At least one expert panellist is mandatory under AICTE norms.");
      return;
    }
    setPanellists(prev => prev.filter(p => p.id !== id));
  };

  const handleAddPanellist = () => {
    if (!newPanellistName.trim()) return;
    const newP = {
      id: Date.now(),
      role: newPanellistRole,
      name: newPanellistName.trim(),
      designation: newPanellistDesignation.trim() || 'AICTE Verified Nominee'
    };
    setPanellists(prev => [...prev, newP]);
    setNewPanellistName('');
    setNewPanellistDesignation('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onScheduleComplete({
      institutionId: targetInstId,
      date: visitDate,
      mode: inspectionMode,
      directives: inspectionDirectives,
      panellists: {
        academic: panellists[0]?.name || 'Appointed Expert',
        industry: panellists[1]?.name || 'Appointed Expert',
        aicteOfficer: panellists[2]?.name || 'AICTE Officer',
        allPanellists: panellists
      }
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-dialog" style={{ maxWidth: '720px' }}>
        <div className="modal-header">
          <h3>
            <Calendar size={18} style={{ color: 'var(--aicte-gold)', display: 'inline', marginRight: '8px' }} />
            Deploy Expert Visiting Committee (EVC) Inspection Panel
          </h3>
          <button onClick={onClose} style={{ color: '#ffffff', opacity: 0.8, cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ maxHeight: '78vh', overflowY: 'auto' }}>
            {/* Target Institution Selector (LIVE from DB) */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '6px' }}>
                Select Institution for Inspection:
              </label>
              {institutions.length > 0 ? (
                <select
                  value={targetInstId}
                  onChange={(e) => setTargetInstId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--aicte-navy-dark)'
                  }}
                >
                  {institutions.map(inst => (
                    <option key={inst.id} value={inst.id}>
                      {inst.name} ({inst.pid}) - {inst.region}
                    </option>
                  ))}
                </select>
              ) : (
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--aicte-navy-dark)' }}>
                  {currentTarget?.name} ({currentTarget?.pid})
                </div>
              )}
            </div>

            {/* Date & Mode inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '6px' }}>
                  Inspection Date:
                </label>
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '6px' }}>
                  Inspection Protocol Mode:
                </label>
                <select
                  value={inspectionMode}
                  onChange={(e) => setInspectionMode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="PHYSICAL">Physical On-Site Comprehensive Audit</option>
                  <option value="HYBRID">Hybrid Live Geo-Tagged Video Stream</option>
                  <option value="SURPRISE">Surprise Infrastructure Compliance Verification</option>
                </select>
              </div>
            </div>

            {/* Editable Panellists List */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
                  Assigned Expert Panellists ({panellists.length}):
                </label>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  All members screened for Conflict of Interest
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {panellists.map((p, idx) => (
                  <div 
                    key={p.id} 
                    style={{ 
                      padding: '10px 12px', 
                      borderRadius: 'var(--radius-md)', 
                      background: '#f8fafc', 
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'var(--aicte-navy-main)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </div>

                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) => handleUpdatePanellist(p.id, 'name', e.target.value)}
                        placeholder="Panellist Name & Title"
                        style={{
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: '1px solid var(--border-medium)',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          color: 'var(--aicte-navy-dark)'
                        }}
                      />
                      <input
                        type="text"
                        value={p.designation}
                        onChange={(e) => handleUpdatePanellist(p.id, 'designation', e.target.value)}
                        placeholder="Organization / Institution"
                        style={{
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: '1px solid var(--border-medium)',
                          fontSize: '0.78rem',
                          color: '#475569'
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemovePanellist(p.id)}
                      style={{ color: '#94a3b8', hover: { color: '#dc2626' }, cursor: 'pointer', padding: '4px' }}
                      title="Remove Panellist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Custom Panellist Row */}
              <div style={{
                marginTop: '10px',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                background: '#ffffff',
                border: '1px dashed var(--border-medium)',
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}>
                <input
                  type="text"
                  placeholder="Add Panellist Name (e.g. Dr. Ramesh Kumar)"
                  value={newPanellistName}
                  onChange={(e) => setNewPanellistName(e.target.value)}
                  style={{ flex: 1, padding: '6px 10px', borderRadius: '4px', border: '1px solid var(--border-medium)', fontSize: '0.8rem' }}
                />
                <input
                  type="text"
                  placeholder="Designation / Institute"
                  value={newPanellistDesignation}
                  onChange={(e) => setNewPanellistDesignation(e.target.value)}
                  style={{ flex: 1, padding: '6px 10px', borderRadius: '4px', border: '1px solid var(--border-medium)', fontSize: '0.8rem' }}
                />
                <button
                  type="button"
                  onClick={handleAddPanellist}
                  className="btn-primary"
                  style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                >
                  <Plus size={14} />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Directives textarea */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--aicte-navy-dark)', display: 'block', marginBottom: '6px' }}>
                Statutory Inspection Directives & Terms of Reference:
              </label>
              <textarea
                rows={3}
                value={inspectionDirectives}
                onChange={(e) => setInspectionDirectives(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  fontSize: '0.82rem',
                  fontFamily: 'inherit',
                  lineHeight: 1.4
                }}
              />
            </div>

            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem',
              fontSize: '0.75rem',
              color: '#166534',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <ShieldCheck size={16} />
              <span>Section 10 AICTE Act: Digital Appointment Orders automatically dispatched with SHA-256 seal.</span>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-gold"
              id="btn-confirm-evc-schedule"
            >
              <CheckCircle size={15} />
              <span>Issue Digital Inspection Order</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
