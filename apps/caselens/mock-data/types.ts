export type CaseStatus = 'open' | 'investigating' | 'resolved' | 'closed';
export type AnomalySeverity = 'low' | 'medium' | 'high' | 'critical';

export interface Case {
  id: string;
  title: string;
  titleFa: string;
  client: string;
  status: CaseStatus;
  riskScore: number; // 0-100
  createdAt: string;
  assignee: string;
}

export interface Anomaly {
  id: string;
  caseId: string;
  title: string;
  titleFa: string;
  severity: AnomalySeverity;
  detectedAt: string;
  description: string;
  descriptionFa: string;
}

export interface ApiKey {
  id: string;
  name: string;
  token: string; // full token, always masked in the UI
  scopes: string[];
  status: 'active' | 'revoked' | 'expired';
  lastUsedAt: string;
  createdAt: string;
}

export interface Kpi {
  id: string;
  label: string;
  value: string;
}
