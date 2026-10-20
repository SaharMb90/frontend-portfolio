'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Dictionary, Locale } from '@repo/i18n/src';

export function Sidebar({ locale, t }: { locale: Locale; t: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const items = [
    { href: `/${locale}`, label: t.nav.dashboard, icon: '▤' },
    { href: `/${locale}/cases`, label: t.nav.cases, icon: '▦' },
    { href: `/${locale}/api-keys`, label: t.nav.apiKeys, icon: '⚿' },
    { href: `/${locale}/settings`, label: t.nav.settings, icon: '⚙' },
  ];
  const active = (href: string) => (href === `/${locale}` ? pathname === href : pathname.startsWith(href));
  return (
    <>
      <button aria-label="Menu" onClick={() => setOpen(!open)} style={{ position: 'fixed', insetInlineStart: '1rem', top: '1rem', zIndex: 60, display: 'none' }} className="menu-btn" id="menu-btn">
        ☰
      </button>
      <style>{`@media (max-width: 768px){ #menu-btn{display:inline-flex !important} #sidebar{position:fixed;inset-block:0;inset-inline-start:0;transform:translateX(0);z-index:50;transition:transform .2s} html[dir="rtl"] #sidebar{transform:none} #sidebar[data-open="false"]{transform:translateX(-100%)} html[dir="rtl"] #sidebar[data-open="false"]{transform:translateX(100%)} }`}</style>
      <nav id="sidebar" data-open={String(open)} aria-label={t.appName} style={{ width: 220, borderInlineEnd: '1px solid var(--border)', background: 'var(--card)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Link href={`/${locale}`} style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '1rem', color: 'var(--fg)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span aria-hidden>◉</span> {t.appName}
        </Link>
        {items.map((it) => (
          <Link key={it.href} href={it.href} onClick={() => setOpen(false)} style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.55rem 0.7rem', borderRadius: 8,
            textDecoration: 'none', fontSize: '0.9rem',
            background: active(it.href) ? 'var(--primary)' : 'transparent',
            color: active(it.href) ? 'var(--primary-fg)' : 'var(--fg)',
          }}>
            <span aria-hidden>{it.icon}</span> {it.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
