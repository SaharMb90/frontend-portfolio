import type { Case, Anomaly, ApiKey } from './types';

export const mockCases: Case[] = Array.from({ length: 24 }, (_, i) => {
  const statuses = ['open', 'investigating', 'resolved', 'closed'] as const;
  const clients = ['Nexa Corp', 'Delta Logistics', 'Aria Bank', 'Fintech One', 'Helios Retail'];
  const assignees = ['S. Mirzabaki', 'A. Karimi', 'M. Rahimi', 'L. Chen'];
  const risk = (i * 37 + 13) % 100;
  return {
    id: `CASE-2024-${String(101 + i).padStart(4, '0')}`,
    title: `Suspicious transaction pattern #${i + 1}`,
    titleFa: `الگوی تراکنش مشکوک شماره ${i + 1}`,
    client: clients[i % clients.length],
    status: statuses[i % statuses.length],
    riskScore: risk,
    createdAt: new Date(Date.UTC(2024, 5, 1 + (i % 28))).toISOString(),
    assignee: assignees[i % assignees.length],
  };
});

export const mockAnomalies: Anomaly[] = mockCases
  .filter((c) => c.riskScore >= 70)
  .slice(0, 6)
  .map((c, i) => ({
    id: `ANM-${String(i + 1).padStart(3, '0')}`,
    caseId: c.id,
    title: c.title,
    titleFa: c.titleFa,
    severity: c.riskScore >= 90 ? 'critical' : 'high',
    detectedAt: c.createdAt,
    description: `Model flagged unusual activity on ${c.client} account stream.`,
    descriptionFa: `مدل، فعالیت غیرمعمول در جریان حساب ${c.client} را علامت‌گذاری کرد.`,
  }));

export const mockApiKeys: ApiKey[] = [
  { id: 'key-1', name: 'Production Ingest', token: 'cl_live_9f2b7c41d8e64a3f8a5c2e0d9b1f7a3c', scopes: ['cases:read', 'cases:write', 'anomalies:read'], status: 'active', lastUsedAt: '2024-06-18T09:12:00Z', createdAt: '2024-01-10T00:00:00Z' },
  { id: 'key-2', name: 'Analytics Dashboard', token: 'cl_live_5a1d8e3f2b7c49d0aa6f4e2c8b9d1f5e', scopes: ['cases:read', 'anomalies:read'], status: 'active', lastUsedAt: '2024-06-17T14:40:00Z', createdAt: '2024-02-02T00:00:00Z' },
  { id: 'key-3', name: 'Legacy Sync', token: 'cl_live_7c3e9f1a5d2b48e6b0a9d4c1f8e2b6d7', scopes: ['cases:read'], status: 'revoked', lastUsedAt: '2024-03-05T11:00:00Z', createdAt: '2023-11-20T00:00:00Z' },
  { id: 'key-4', name: 'Sandbox Testing', token: 'cl_test_2b8f4d6a1c9e47358d0b2f7e9a4c1d3e', scopes: ['cases:read', 'cases:write'], status: 'expired', lastUsedAt: '2024-01-15T08:30:00Z', createdAt: '2023-07-01T00:00:00Z' },
];

export const mockKpis = (locale: 'en' | 'fa') => {
  const open = mockCases.filter((c) => c.status === 'open').length;
  const high = mockAnomalies.length;
  const avgRisk = Math.round(mockCases.reduce((s, c) => s + c.riskScore, 0) / mockCases.length);
  const resolved = mockCases.filter((c) => c.status === 'resolved' || c.status === 'closed').length;
  return [
    { id: 'open', label: locale === 'fa' ? 'پرونده‌های باز' : 'Open Cases', value: String(open) },
    { id: 'anomalies', label: locale === 'fa' ? 'ناهنجاری‌های فعال' : 'Active Anomalies', value: String(high) },
    { id: 'risk', label: locale === 'fa' ? 'میانگین ریسک' : 'Avg. Risk Score', value: `${avgRisk}%` },
    { id: 'resolved', label: locale === 'fa' ? 'حل‌شده' : 'Resolved', value: String(resolved) },
  ];
};
