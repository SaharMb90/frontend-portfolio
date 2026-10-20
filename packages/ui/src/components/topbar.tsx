'use client';
import * as React from 'react';
import { useTheme } from './theme-provider';

export function Topbar({ title, locale, onLocaleChange }: { title: string; locale: string; onLocaleChange: (l: 'en' | 'fa') => void }) {
  const { toggle } = useTheme();
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--border)', background: 'var(--card)' }}>
      <h1 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>{title}</h1>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={toggle} aria-label="Toggle theme" style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 8, padding: '0.4rem 0.7rem', cursor: 'pointer', color: 'var(--fg)' }}>◐</button>
        <button onClick={() => onLocaleChange(locale === 'fa' ? 'en' : 'fa')} style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 8, padding: '0.4rem 0.7rem', cursor: 'pointer', color: 'var(--fg)' }}>
          {locale === 'fa' ? 'EN' : 'FA'}
        </button>
      </div>
    </header>
  );
}
