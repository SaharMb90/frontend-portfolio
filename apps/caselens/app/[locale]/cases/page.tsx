'use client';
import * as React from 'react';
import { Card, Badge } from '@repo/ui/src';
import { mockCases, type CaseStatus } from '@repo/mock-data/src';
import { dictionaries } from '@repo/i18n/src';
import { StatusBadge } from '../../../components/status-badge';

const statuses: CaseStatus[] = ['open', 'investigating', 'resolved', 'closed'];

function riskTone(score: number): 'success' | 'warning' | 'danger' {
  return score >= 70 ? 'danger' : score >= 40 ? 'warning' : 'success';
}

export default function CasesPage({ params }: { params: { locale: 'en' | 'fa' } }) {
  const locale = params.locale;
  const t = dictionaries[locale];
  const [query, setQuery] = React.useState('');
  const [status, setStatus] = React.useState<'all' | CaseStatus>('all');

  const filtered = mockCases.filter((c) => {
    const q = query.trim().toLowerCase();
    const matchesQ = !q || [c.id, c.title, c.titleFa, c.client, c.assignee].some((v) => v.toLowerCase().includes(q));
    const matchesS = status === 'all' || c.status === status;
    return matchesQ && matchesS;
  });

  return (
    <div>
      <h2 style={{ margin: '0 0 1rem', fontSize: '1.25rem', fontWeight: 700 }}>{t.cases.title}</h2>
      <Card style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          <input className="input" style={{ maxWidth: 280 }} placeholder={t.cases.search} value={query} onChange={(e) => setQuery(e.target.value)} aria-label={t.cases.search} />
          <select className="input" style={{ maxWidth: 180 }} value={status} onChange={(e) => setStatus(e.target.value as 'all' | CaseStatus)} aria-label={t.cases.status}>
            <option value="all">{locale === 'fa' ? 'همه' : 'All'}</option>
            {statuses.map((s) => <option key={s} value={s}>{t.status[s]}</option>)}
          </select>
          <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{filtered.length} / {mockCases.length}</span>
        </div>
      </Card>
      <Card style={{ overflowX: 'auto' }}>
        {filtered.length === 0 ? (
          <p style={{ color: 'var(--muted)', margin: 0 }}>{t.cases.noResults}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>{t.cases.id}</th><th>{t.cases.title}</th><th>{t.cases.client}</th>
                <th>{t.cases.status}</th><th>{t.cases.risk}</th><th>{t.cases.assignee}</th><th>{t.cases.created}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{c.id}</td>
                  <td>{locale === 'fa' ? c.titleFa : c.title}</td>
                  <td>{c.client}</td>
                  <td><StatusBadge status={c.status} t={t} /></td>
                  <td><Badge tone={riskTone(c.riskScore)}>{c.riskScore}</Badge></td>
                  <td style={{ color: 'var(--muted)' }}>{c.assignee}</td>
                  <td style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{new Date(c.createdAt).toLocaleDateString(locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
