import React from 'react';
import { 
  BellRing, 
  CheckCircle, 
  AlertTriangle, 
  ShieldAlert, 
  X 
} from 'lucide-react';

export function NotificationToast({ notification, onClose }) {
  if (!notification) return null;

  const isSuccess = notification.type === 'success';
  const isAlert = notification.type === 'alert';

  return (
    <div className="simulation-toast">
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: isSuccess ? 'rgba(16, 185, 129, 0.2)' : isAlert ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
        color: isSuccess ? '#10b981' : isAlert ? '#ef4444' : 'var(--aicte-gold)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {isSuccess ? <CheckCircle size={20} /> : isAlert ? <ShieldAlert size={20} /> : <BellRing size={20} />}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>
          {notification.title}
        </div>
        <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
          {notification.message}
        </div>
        {notification.hash && (
          <div style={{ fontSize: '0.7rem', color: 'var(--aicte-gold)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
            Hash: {notification.hash}
          </div>
        )}
      </div>

      <button 
        onClick={onClose}
        style={{ color: '#94a3b8', hover: { color: '#ffffff' }, cursor: 'pointer' }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
