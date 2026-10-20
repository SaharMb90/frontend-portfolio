import { Badge } from '@/components/ui/badge';
import type { Dictionary } from '@/i18n';

export function statusTone(s: string): 'info' | 'warning' | 'success' | 'neutral' | 'danger' {
  return s === 'open' ? 'info' : s === 'investigating' ? 'warning' : s === 'resolved' || s === 'active' ? 'success' : s === 'revoked' ? 'danger' : 'neutral';
}

export function StatusBadge({ status, t }: { status: string; t: Dictionary }) {
  const map = t.status as Record<string, string>;
  return <Badge tone={statusTone(status)}>{map[status] ?? status}</Badge>;
}
