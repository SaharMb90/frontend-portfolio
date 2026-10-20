'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { swapLocale, type Locale } from '@/i18n/locales';
import type { Dictionary } from '@/i18n/dictionaries';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export function Topbar({ locale, common }: { locale: Locale; common: Dictionary['common'] }) {
  const pathname = usePathname() || `/${locale}`;
  const otherLocale: Locale = locale === 'en' ? 'fa' : 'en';

  return (
    <header className="topbar">
      <Button
        variant="ghost"
        size="sm"
        id="menu-btn"
        className="topbar__menu"
        aria-label={common.menu}
        onClick={() => {
          const sidebar = document.getElementById('sidebar');
          if (sidebar) sidebar.dataset.open = sidebar.dataset.open === 'true' ? 'false' : 'true';
        }}
      >
        <span aria-hidden="true">☰</span>
      </Button>
      <div className="topbar__spacer" />
      <ThemeToggle label={common.toggleTheme} />
      <Link
        href={swapLocale(pathname, otherLocale)}
        className="ui-btn ui-btn--outline ui-btn--sm"
        aria-label={common.switchLanguage}
      >
        {otherLocale === 'fa' ? 'FA' : 'EN'}
      </Link>
    </header>
  );
}
