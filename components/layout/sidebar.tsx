'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localizedPath, swapLocale, type Locale } from '@/i18n/locales';
import type { Dictionary } from '@/i18n/dictionaries';
import { cn } from '@/lib/cn';

const items: { key: keyof Dictionary['nav']; href: string; icon: string }[] = [
  { key: 'dashboard', href: '/', icon: '\u25A6' },
  { key: 'cases', href: '/cases', icon: '\u2630' },
  { key: 'apiKeys', href: '/api-keys', icon: '\u26BF' },
  { key: 'settings', href: '/settings', icon: '\u2699' },
];

export function Sidebar({
  locale,
  nav,
  common,
}: {
  locale: Locale;
  nav: Dictionary['nav'];
  common: Dictionary['common'];
}) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const otherLocale: Locale = locale === 'en' ? 'fa' : 'en';

  return (
    <aside className="sidebar" id="sidebar" data-open={open}>
      <div className="sidebar__brand">
        <span className="sidebar__logo" aria-hidden="true">◈</span>
        <span className="sidebar__name">{locale === 'fa' ? 'کیس‌لنز' : 'CaseLens'}</span>
      </div>
      <nav className="sidebar__nav" aria-label={common.menu}>
        {items.map((item) => {
          const href = localizedPath(locale, item.href);
          const active = item.href === '/' ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={item.key} href={href} className={cn('sidebar-link', active && 'is-active')} aria-current={active ? 'page' : undefined}>
              <span aria-hidden="true" className="sidebar-link__icon">{item.icon}</span>
              <span>{nav[item.key]}</span>
            </Link>
          );
        })}
      </nav>
      <div className="sidebar__footer">
        <Link href={swapLocale(pathname, otherLocale)} className="sidebar-link" aria-label={common.switchLanguage}>
          <span aria-hidden="true" className="sidebar-link__icon">⇄</span>
          <span>{otherLocale === 'fa' ? 'فارسی' : 'English'}</span>
        </Link>
      </div>
    </aside>
  );
}
