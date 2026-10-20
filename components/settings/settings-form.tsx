'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { locales, type Locale } from '@/i18n/locales';
import type { Dictionary } from '@/i18n/dictionaries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

export function SettingsForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [name, setName] = React.useState('S. Mirzabaki');
  const [email, setEmail] = React.useState('demo@caselens.dev');
  const [org, setOrg] = React.useState('CaseLens Labs');
  const [saved, setSaved] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <form onSubmit={handleSubmit} className="stack-lg">
      <Card>
        <CardHeader>
          <CardTitle>{dict.settings.profile}</CardTitle>
          <CardDescription>{dict.settings.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="form-grid">
            <label className="field">
              <span>{dict.settings.displayName}</span>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="field">
              <span>{dict.settings.email}</span>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="field">
              <span>{dict.settings.org}</span>
              <input className="input" value={org} onChange={(e) => setOrg(e.target.value)} />
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{dict.settings.prefs}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="form-grid">
            <label className="field">
              <span>{dict.settings.language}</span>
              <select
                className="input"
                value={locale}
                onChange={(e) => {
                  const next = e.target.value as Locale;
                  const parts = (routerHref() || '').split('/');
                  if (locales.includes(next) && parts.length > 1) {
                    parts[1] = next;
                    router.push(parts.join('/') || `/${next}`);
                  }
                }}
              >
                <option value="en">English</option>
                <option value="fa">فارسی</option>
              </select>
            </label>
            <label className="field">
              <span>{dict.settings.theme}</span>
              <select className="input" value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}>
                <option value="light">{dict.common.light}</option>
                <option value="dark">{dict.common.dark}</option>
              </select>
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="btn-row">
        <Button type="submit">{dict.settings.save}</Button>
        {saved && <span className="muted" role="status">{dict.settings.saved}</span>}
      </div>
    </form>
  );
}

function routerHref(): string {
  return typeof window === 'undefined' ? '' : window.location.pathname;
}
