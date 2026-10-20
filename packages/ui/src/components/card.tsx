import * as React from 'react';

export function Card({ className = '', style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`card ${className}`} style={style} {...props} />;
}
export function CardHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{title}</h3>
      {description && <p style={{ margin: '0.25rem 0 0', color: 'var(--muted)', fontSize: '0.8rem' }}>{description}</p>}
    </div>
  );
}
export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{children}</h3>;
}
