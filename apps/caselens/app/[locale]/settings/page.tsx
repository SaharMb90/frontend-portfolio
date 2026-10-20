'use client';
import * as React from 'react';
import { Card, Button } from '@/components/ui';
import { dictionaries } from '@/i18n';

export default function SettingsPage({ params }: { params: { locale: 'en' | 'fa' } }) {
  const locale = params.locale;
  const t = dictionaries[locale];
  const [saved, setSaved] = React.useState(false);

  const label = { display: 'block', fontSize: '0.8rem', color: 'var(--muted)', margin: '0.75rem 0 0.25rem' } as const;
  return (
    <div>
      <h2 style={{ margin: '0 0 1rem', fontSize: '1.25rem', fontWeight: 700 }}>{t.settings.title}</h2>
      <form
        onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); }}
        style={{ maxWidth: 560 }}
      >
        <Card>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 600 }}>{t.settings.profile}</h3>
          <label style={label} htmlFor="displayName">{t.settings.displayName}</label>
          <input id="displayName" className="input" defaultValue="Sahar Mirzabaki" required />
          <label style={label} htmlFor="email">{t.settings.email}</label>
          <input id="email" className="input" type="email" defaultValue="sahar@caselens.example" required />
          <label style={label} htmlFor="org">{t.settings.org}</label>
          <input id="org" className="input" defaultValue="CaseLens Inc." />
          <h3 style={{ margin: '1.25rem 0 0.5rem', fontSize: '1rem', fontWeight: 600 }}>{t.settings.prefs}</h3>
          <label style={label} htmlFor="language">{t.settings.language}</label>
          <select id="language" className="input" defaultValue={locale}>
            <option value="en">English</option>
            <option value="fa">فارسی</option>
          </select>
          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Button type="submit">{t.settings.save}</Button>
            {saved && <span style={{ color: 'var(--ok)', fontSize: '0.85rem', fontWeight: 600 }}>{t.settings.saved}</span>}
          </div>
        </Card>
      </form>
    </div>
  );
}
