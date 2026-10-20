import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
}

export function Button({ variant = 'primary', className = '', style, ...props }: ButtonProps) {
  const styles: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.55rem 1rem', borderRadius: 8, fontSize: '0.875rem', fontWeight: 500,
    cursor: 'pointer', border: '1px solid transparent', ...style,
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: 'var(--primary)', color: 'var(--primary-fg)' },
    outline: { background: 'transparent', borderColor: 'var(--border)', color: 'var(--fg)' },
    ghost: { background: 'transparent', color: 'var(--fg)' },
    danger: { background: 'var(--danger)', color: '#fff' },
  };
  return <button className={className} style={{ ...styles, ...variants[variant] }} {...props} />;
}
