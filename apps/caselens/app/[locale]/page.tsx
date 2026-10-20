import { Card, Badge } from '@/components/ui';
import { mockKpis, mockAnomalies } from '@/mock-data';
import { dictionaries } from '@/i18n';
import { PageHeader } from '../../components/page-header';

const severityTone = { critical: 'danger', high: 'warning', medium: 'info', low: 'neutral' } as const;

export default function DashboardPage({ params }: { params: { locale: 'en' | 'fa' } }) {
  const locale = params.locale;
  const t = dictionaries[locale];
  const kpis = mockKpis(locale);
  const anomalies = mockAnomalies;
  return (
    <div>
      <PageHeader locale={locale} title={t.dashboard.title} />
      <section aria-label={t.dashboard.kpis} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {kpis.map((k) => (
          <Card key={k.id}>
            <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{k.label}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '0.25rem' }}>{k.value}</div>
          </Card>
        ))}
      </section>
      <Card>
        <h2 style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: 600 }}>{t.dashboard.recent}</h2>
        {anomalies.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>{t.dashboard.empty}</p>
        ) : (
          <table>
            <thead>
              <tr><th>{t.dashboard.case}</th><th>{t.cases.title}</th><th>{t.dashboard.severity}</th><th>{t.dashboard.detected}</th></tr>
            </thead>
            <tbody>
              {anomalies.map((a) => (
                <tr key={a.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{a.caseId}</td>
                  <td>{locale === 'fa' ? a.titleFa : a.title}</td>
                  <td><Badge tone={severityTone[a.severity]}>{t.severity[a.severity]}</Badge></td>
                  <td style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{new Date(a.detectedAt).toLocaleDateString(locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
