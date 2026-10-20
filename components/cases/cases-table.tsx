'use client';

import * as React from 'react';
import Link from 'next/link';
import { localizedPath, type Locale } from '@/i18n/locales';
import type { Dictionary } from '@/i18n/dictionaries';
import type { Case, CaseStatus } from '@/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { formatDate, toLocaleDigits } from '@/lib/format';

const statusTone: Record<CaseStatus, BadgeTone> = {
  open: 'info',
  investigating: 'warning',
  resolved: 'success',
  closed: 'neutral',
};

const statuses: CaseStatus[] = ['open', 'investigating', 'resolved', 'closed'];

export function CasesTable({
  locale,
  cases,
  dict,
}: {
  locale: Locale;
  cases: Case[];
  dict: Dictionary;
}) {
  const [query, setQuery] = React.useState('');
  const [status, setStatus] = React.useState<CaseStatus | 'all'>('all');

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return cases.filter((c) => {
      const matchesQuery =
        q === '' ||
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.titleFa.includes(query.trim()) ||
        c.client.toLowerCase().includes(q) ||
        c.assignee.toLowerCase().includes(q);
      const matchesStatus = status === 'all' || c.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [cases, query, status]);

  return (
    <Card>
      <CardContent>
        <div className="toolbar">
          <input
            type="search"
            className="input"
            placeholder={dict.cases.search}
            aria-label={dict.cases.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="input"
            aria-label={dict.cases.status}
            value={status}
            onChange={(e) => setStatus(e.target.value as CaseStatus | 'all')}
          >
            <option value="all">{dict.common.all}</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{dict.status[s]}</option>
            ))}
          </select>
          <span className="muted" role="status">
            {toLocaleDigits(String(filtered.length), locale)} {dict.cases.results}
          </span>
        </div>

        {filtered.length === 0 ? (
          <p className="muted">{dict.cases.noResults}</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{dict.cases.id}</th>
                  <th>{dict.cases.caseTitle}</th>
                  <th>{dict.cases.client}</th>
                  <th>{dict.cases.status}</th>
                  <th>{dict.cases.risk}</th>
                  <th>{dict.cases.assignee}</th>
                  <th>{dict.cases.created}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <Link className="mono" href={`${localizedPath(locale, '/cases')}?case=${c.id}`}>{c.id}</Link>
                    </td>
                    <td>{locale === 'fa' ? c.titleFa : c.title}</td>
                    <td>{c.client}</td>
                    <td><Badge tone={statusTone[c.status]}>{dict.status[c.status]}</Badge></td>
                    <td>
                      <span className="risk" data-level={c.riskScore >= 80 ? 'high' : c.riskScore >= 50 ? 'mid' : 'low'}>
                        {toLocaleDigits(String(c.riskScore), locale)}
                      </span>
                    </td>
                    <td>{c.assignee}</td>
                    <td>{formatDate(c.createdAt, locale)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
