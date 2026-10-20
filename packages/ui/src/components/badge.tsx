import * as React from 'react';

const toneStyles: Record<string, React.CSSProperties> = {
  neutral: { background: 'var(--muted)', color: 'var(--bg)' },
  success: { background: 'var(--ok)', color: '#fff' },
  warning: { background: 'var(--warn)', color: '#fff' },
  danger: { background: 'var(--danger)', color: '#fff' },
  info: { background: 'var(--primary)', color: 'var(--primary-fg)' },
};

export function Badge({ tone = 'neutral', children }: { tone?: keyof typeof toneStyles; children: React.ReactNode }) {
  return (
    <span style={{ ...toneStyles[tone], display: 'inline-block', padding: '0.15rem 0.6rem', borderRadius: 999, fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
      {children}
    </span>
  );
}
