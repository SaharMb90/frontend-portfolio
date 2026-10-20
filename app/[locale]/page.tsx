import Link from 'next/link';
import { getDictionary } from '@/i18n/dictionaries';
import { localizedPath, type Locale } from '@/i18n/locales';
import { mockAnomalies, mockKpis } from '@/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { formatDate, toLocaleDigits } from '@/lib/format';

const severityTone: Record<string, BadgeTone> = { critical: 'danger', high: 'warning', medium: 'info', low: 'neutral' };

export default function DashboardPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  const kpis = mockKpis(locale);
  const anomalies = mockAnomalies;

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">{dict.dashboard.title}</h1>
        <p className="page__subtitle">{dict.dashboard.subtitle}</p>
      </header>

      <section aria-labelledby="kpis-heading">
        <h2 id="kpis-heading" className="section-title">{dict.dashboard.kpis}</h2>
        <div className="kpi-grid">
          {kpis.map((kpi) => (
            <Card key={kpi.id}>
              <CardContent>
                <p className="kpi__label">{kpi.label}</p>
                <p className="kpi__value">{toLocaleDigits(kpi.value, locale)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="anomalies-heading">
        <h2 id="anomalies-heading" className="section-title">{dict.dashboard.recent}</h2>
        <Card>
          <CardHeader>
            <CardTitle>{dict.dashboard.recent}</CardTitle>
            <CardDescription>{dict.dashboard.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            {anomalies.length === 0 ? (
              <p className="muted">{dict.dashboard.empty}</p>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>{dict.dashboard.severity}</th>
                      <th>{dict.dashboard.case}</th>
                      <th>{dict.cases.caseTitle}</th>
                      <th>{dict.dashboard.detected}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {anomalies.map((anomaly) => (
                      <tr key={anomaly.id}>
                        <td>
                          <Badge tone={severityTone[anomaly.severity] ?? 'neutral'}>
                            {dict.severity[anomaly.severity]}
                          </Badge>
                        </td>
                        <td>
                          <Link className="mono" href={localizedPath(locale, `/cases?case=${anomaly.caseId}`)}>
                            {anomaly.caseId}
                          </Link>
                        </td>
                        <td>{locale === 'fa' ? anomaly.titleFa : anomaly.title}</td>
                        <td>{formatDate(anomaly.detectedAt, locale)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
