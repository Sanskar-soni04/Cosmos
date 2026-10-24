import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export function DisclaimerRibbon() {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check session storage so it stays dismissed during the session but reappears on fresh reload
    const dismissed = sessionStorage.getItem('aicte_prototype_ribbon_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('aicte_prototype_ribbon_dismissed', 'true');
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <div 
      role="banner" 
      aria-label="Prototype Disclaimer"
      style={{
        background: '#FEF3C7',
        borderBottom: '1px solid #FDE68A',
        color: '#92400E',
        fontSize: '0.8125rem',
        padding: '0.4rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 9999,
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto', textAlign: 'center' }}>
        <AlertTriangle size={15} style={{ color: '#D97706', flexShrink: 0 }} />
        <span>
          <strong>AICTE Regulatory Workflow & Compliance Automation Platform.</strong> Prototype Mode (APH 2024–27).
          All regulatory rules modelled after statutory provisions. All demo records are synthetic for demonstration.
        </span>
      </div>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss prototype notification"
        style={{
          background: 'transparent',
          border: 'none',
          color: '#92400E',
          cursor: 'pointer',
          padding: '0.15rem',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '4px'
        }}
        title="Dismiss for this session"
      >
        <X size={15} />
      </button>
    </div>
  );
}
