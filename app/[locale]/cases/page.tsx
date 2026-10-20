import { getDictionary } from '@/i18n/dictionaries';
import { mockCases } from '@/mock-data';
import { CasesTable } from '@/components/cases/cases-table';

export default function CasesPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">{dict.cases.title}</h1>
        <p className="page__subtitle">{dict.cases.subtitle}</p>
      </header>
      <CasesTable locale={params.locale as 'en' | 'fa'} cases={mockCases} dict={dict} />
    </div>
  );
}
