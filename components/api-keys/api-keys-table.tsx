'use client';

import * as React from 'react';
import { type Locale } from '@/i18n/locales';
import type { Dictionary } from '@/i18n/dictionaries';
import type { ApiKey } from '@/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate, maskToken, toLocaleDigits } from '@/lib/format';

const statusTone: Record<ApiKey['status'], BadgeTone> = {
  active: 'success',
  revoked: 'danger',
  expired: 'warning',
};

export function ApiKeysTable({ locale, keys, dict }: { locale: Locale; keys: ApiKey[]; dict: Dictionary }) {
  const [revealed, setRevealed] = React.useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const copy = React.useCallback(async (key: ApiKey) => {
    try {
      await navigator.clipboard.writeText(key.token);
      setCopiedId(key.id);
      window.setTimeout(() => setCopiedId((cur) => (cur === key.id ? null : cur)), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  }, []);

  return (
    <Card>
      <CardContent>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{dict.apiKeys.name}</th>
                <th>{dict.apiKeys.token}</th>
                <th>{dict.apiKeys.scopes}</th>
                <th>{dict.apiKeys.status}</th>
                <th>{dict.apiKeys.lastUsed}</th>
                <th>{dict.common.menu}</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key) => {
                const shown = revealed[key.id] ?? false;
                return (
                  <tr key={key.id}>
                    <td>{key.name}</td>
                    <td>
                      <code className="mono">{shown ? key.token : maskToken(key.token)}</code>
                    </td>
                    <td>{key.scopes.join(', ')}</td>
                    <td><Badge tone={statusTone[key.status]}>{dict.status[key.status]}</Badge></td>
                    <td>{formatDate(key.lastUsedAt, locale)}</td>
                    <td>
                      <div className="btn-row">
                        <Button
                          variant="outline"
                          size="sm"
                          aria-pressed={shown}
                          onClick={() => setRevealed((prev) => ({ ...prev, [key.id]: !shown }))}
                        >
                          {shown ? dict.apiKeys.hide : dict.apiKeys.reveal}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => copy(key)}>
                          {copiedId === key.id ? dict.apiKeys.copied : dict.apiKeys.copy}
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
