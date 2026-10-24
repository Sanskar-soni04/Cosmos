import React, { useState, useEffect } from 'react';
import { Eye, Languages, ZoomIn, ZoomOut, Check, Volume2 } from 'lucide-react';

export function TopUtilityBar({ lang = 'en', onLangChange }) {
  const [fontScale, setFontScale] = useState('base');
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.body.classList.remove('font-scale-sm', 'font-scale-base', 'font-scale-lg');
    document.body.classList.add(`font-scale-${fontScale}`);
  }, [fontScale]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  return (
    <div className="utility-bar-container" style={{ background: '#061938', color: '#CBD5E1', fontSize: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Accessible Skip Link */}
      <a href="#main-content" className="skip-to-content-link">
        Skip to main content
      </a>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0.3rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Left: Ministry / Statutory Header Mention */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#94A3B8' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }}></span>
            Ministry of Education, Government of India
          </span>
          <span style={{ color: '#475569' }}>|</span>
          <span style={{ color: '#E2E8F0', fontWeight: 500 }}>AICTE Regulatory Automation Portal</span>
        </div>

        {/* Right: Accessibility & Internationalization Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Text Size Scale */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', padding: '0.1rem 0.35rem' }}>
            <button
              onClick={() => setFontScale('sm')}
              title="Decrease Font Size"
              style={{
                color: fontScale === 'sm' ? '#F59E0B' : '#CBD5E1',
                padding: '0.15rem 0.35rem',
                fontSize: '0.7rem',
                fontWeight: 600,
                borderRadius: '3px',
                background: fontScale === 'sm' ? 'rgba(245, 158, 11, 0.15)' : 'transparent'
              }}
            >
              A-
            </button>
            <button
              onClick={() => setFontScale('base')}
              title="Default Font Size"
              style={{
                color: fontScale === 'base' ? '#F59E0B' : '#CBD5E1',
                padding: '0.15rem 0.35rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '3px',
                background: fontScale === 'base' ? 'rgba(245, 158, 11, 0.15)' : 'transparent'
              }}
            >
              A
            </button>
            <button
              onClick={() => setFontScale('lg')}
              title="Increase Font Size"
              style={{
                color: fontScale === 'lg' ? '#F59E0B' : '#CBD5E1',
                padding: '0.15rem 0.35rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                borderRadius: '3px',
                background: fontScale === 'lg' ? 'rgba(245, 158, 11, 0.15)' : 'transparent'
              }}
            >
              A+
            </button>
          </div>

          {/* High Contrast Mode Toggle */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            title="Toggle High Contrast Mode (WCAG AAA)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              color: highContrast ? '#F59E0B' : '#CBD5E1',
              padding: '0.15rem 0.45rem',
              borderRadius: '4px',
              background: highContrast ? '#000000' : 'rgba(255,255,255,0.06)',
              border: highContrast ? '1px solid #F59E0B' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            <Eye size={12} />
            <span>Contrast</span>
          </button>

          {/* Screen Reader Aid Link */}
          <a
            href="#screen-reader-help"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              color: '#CBD5E1',
              padding: '0.15rem 0.45rem',
              borderRadius: '4px',
              background: 'rgba(255,255,255,0.06)'
            }}
            title="Screen Reader Access Instructions"
          >
            <Volume2 size={12} />
            <span className="hidden sm:inline">Screen Reader</span>
          </a>

          {/* Language Switcher */}
          <button
            onClick={() => onLangChange && onLangChange(lang === 'en' ? 'hi' : 'en')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: '#FFFFFF',
              background: '#1E56A0',
              padding: '0.18rem 0.6rem',
              borderRadius: '4px',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
            title="Switch Language / भाषा बदलें"
          >
            <Languages size={13} />
            <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
