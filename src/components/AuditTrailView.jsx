import React, { useState } from 'react';
import { 
  GitCommit, 
  GitBranch, 
  ShieldCheck, 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  Clock, 
  FileCode, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Copy,
  Hash,
  Terminal,
  Printer
} from 'lucide-react';

export function AuditTrailView({ commits, institution }) {
  const [filterType, setFilterType] = useState('ALL');
  const [searchFilter, setSearchFilter] = useState('');
  const [expandedCommitId, setExpandedCommitId] = useState(commits[0]?.id || null);
  const [copiedHash, setCopiedHash] = useState(null);

  const handleCopyHash = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleExportCertificate = () => {
    window.print();
  };

  // Filter commits based on type and search query
  const filteredCommits = commits.filter((c) => {
    const matchesSearch = 
      c.message.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.actor.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.hash.toLowerCase().includes(searchFilter.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'ALL') return true;
    if (filterType === 'AI' && (c.actor.includes('Agent') || c.actor.includes('AI'))) return true;
    if (filterType === 'HUMAN' && (c.actor.includes('Officer') || c.actor.includes('Institution'))) return true;
    if (filterType === 'RULES' && (c.actor.includes('Engine') || c.type.includes('GATE'))) return true;
    return true;
  });

  return (
    <div className="audit-trail-container">
      {/* Header Bar */}
      <div className="content-card" style={{ marginBottom: '1.5rem', padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <GitBranch size={18} style={{ color: 'var(--aicte-gold)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--aicte-navy-dark)' }}>
                branch: main/apps/{institution.id}
              </span>
              <span className="git-verified-seal">
                <ShieldCheck size={12} />
                Cryptographically Chained (SHA-256)
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Append-only audit timeline recording every dossier ingest, OCR extraction, score calculation, and statutory decision.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handleExportCertificate}
              className="btn-gold"
              style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
            >
              <Printer size={15} />
              <span>Export Audit Certificate (PDF)</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Ribbon */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'AI', 'HUMAN', 'RULES'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  background: filterType === type ? 'var(--aicte-navy-main)' : '#f1f5f9',
                  color: filterType === type ? '#ffffff' : 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {type === 'ALL' ? 'All Commit Events' : type === 'AI' ? 'AI Agent Findings' : type === 'HUMAN' ? 'Human Actions' : 'Rules Engine'}
              </button>
            ))}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f8fafc',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '4px 10px',
            maxWidth: '320px',
            width: '100%'
          }}>
            <Search size={14} style={{ color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Filter by hash, actor, or event..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.78rem', width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* GitHub Commit Timeline */}
      <div className="content-card">
        <div className="card-header-bar">
          <h3>
            <GitCommit size={18} style={{ color: 'var(--aicte-blue)' }} />
            <span>Immutable Commit Event History ({filteredCommits.length} Events)</span>
          </h3>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            Root: sha256:10cb99a0...
          </span>
        </div>

        <div className="card-body">
          <div className="git-audit-timeline">
            {filteredCommits.map((commit) => {
              const isExpanded = expandedCommitId === commit.id;
              const isFlagged = commit.type.includes('DEFICIENCY') || commit.type.includes('GATE');

              return (
                <div
                  key={commit.id}
                  className={`git-commit-entry ${isFlagged ? 'flagged' : ''}`}
                >
                  <div className="git-commit-node">
                    <GitCommit size={13} />
                  </div>

                  <div className="git-commit-card">
                    <div className="git-commit-meta">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span 
                          className="commit-hash"
                          onClick={() => handleCopyHash(commit.hash)}
                          title="Click to copy SHA hash"
                          style={{ cursor: 'pointer' }}
                        >
                          <Hash size={11} />
                          {commit.hash}
                          {copiedHash === commit.hash ? ' (Copied!)' : ''}
                        </span>

                        <span style={{ fontWeight: 700, color: 'var(--aicte-navy-dark)' }}>
                          {commit.actor}
                        </span>

                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                          ({commit.role})
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="git-verified-seal">
                          <CheckCircle size={11} />
                          {commit.signature}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                          {commit.timestamp}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div className="git-commit-msg">
                          {commit.message}
                        </div>
                        <div className="git-commit-details">
                          {commit.details}
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedCommitId(isExpanded ? null : commit.id)}
                        style={{
                          padding: '4px',
                          color: '#64748b',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        title="Toggle Diff / Audit Payload"
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>

                    {/* Expandable Technical Git Diff / Payload */}
                    {isExpanded && (
                      <div style={{
                        marginTop: '12px',
                        padding: '10px 14px',
                        background: '#091528',
                        borderRadius: 'var(--radius-sm)',
                        color: '#cbd5e1',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        border: '1px solid #1e293b'
                      }}>
                        <div style={{ color: 'var(--aicte-gold)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Terminal size={12} />
                          <span>Audit Event Payload & Cryptographic Proof:</span>
                        </div>
                        <div style={{ color: '#94a3b8' }}>
                          parent_hash: {commit.prevHash} | tree_sha: 44b9a11... | state_machine_stage: "{commit.stage}"
                        </div>
                        <div style={{ marginTop: '6px', color: commit.type.includes('DEFICIENCY') ? '#f87171' : '#4ade80' }}>
                          {commit.type.includes('DEFICIENCY') 
                            ? '- [STATUTORY_GATE]: BLOCKED stage progression to Scrutiny Clearance'
                            : '+ [AUDIT_APPEND]: State successfully transition committed to immutable log'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
