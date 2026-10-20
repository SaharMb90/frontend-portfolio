'use client';
import * as React from 'react';
import { Card, Badge } from '@repo/ui/src';
import { mockApiKeys } from '@repo/mock-data/src';
import { dictionaries } from '@repo/i18n/src';
import { StatusBadge } from '../../../components/status-badge';

function mask(token: string) {
  return `${token.slice(0, 7)}${'•'.repeat(10)}`;
}

export default function ApiKeysPage({ params }: { params: { locale: 'en' | 'fa' } }) {
  const locale = params.locale;
  const t = dictionaries[locale];
  const [revealed, setRevealed] = React.useState<Record<string, boolean>>({});

  const copy = async (id: string, token: string) => {
    try { await navigator.clipboard.writeText(token); setRevealed((r) => ({ ...r, [`copied-${id}`]: true })); setTimeout(() => setRevealed((r) => ({ ...r, [`copied-${id}`]: false })), 1500); } catch {}
  };

  return (
    <div>
      <h2 style={{ margin: '0 0 1rem', fontSize: '1.25rem', fontWeight: 700 }}>{t.apiKeys.title}</h2>
      <Card style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr><th>{t.apiKeys.name}</th><th>{t.apiKeys.token}</th><th>{t.apiKeys.scopes}</th><th>{t.apiKeys.status}</th><th>{t.apiKeys.lastUsed}</th><th /></tr>
          </thead>
          <tbody>
            {mockApiKeys.map((k) => (
              <tr key={k.id}>
                <td style={{ fontWeight: 600 }}>{k.name}</td>
                <td>
                  <code style={{ fontFamily: 'monospace', fontSize: '0.8rem', background: 'var(--bg)', padding: '0.15rem 0.4rem', borderRadius: 6 }}>{revealed[k.id] ? k.token : mask(k.token)}</code>
                </td>
                <td>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {k.scopes.map((s) => <Badge key={s} tone="info">{s}</Badge>)}
                  </div>
                </td>
                <td><StatusBadge status={k.status} t={t} /></td>
                <td style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{new Date(k.lastUsedAt).toLocaleDateString(locale)}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button onClick={() => setRevealed((r) => ({ ...r, [k.id]: !r[k.id] }))} style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 6, padding: '0.25rem 0.6rem', cursor: 'pointer', color: 'var(--fg)', fontSize: '0.75rem' }}>
                      {revealed[k.id] ? t.apiKeys.hide : t.apiKeys.reveal}
                    </button>
                    <button onClick={() => copy(k.id, k.token)} style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 6, padding: '0.25rem 0.6rem', cursor: 'pointer', color: 'var(--fg)', fontSize: '0.75rem' }}>
                      {revealed[`copied-${k.id}`] ? t.apiKeys.copied : t.apiKeys.copy}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
