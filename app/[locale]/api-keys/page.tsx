import { getDictionary } from '@/i18n/dictionaries';
import { mockApiKeys } from '@/mock-data';
import { ApiKeysTable } from '@/components/api-keys/api-keys-table';

export default function ApiKeysPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">{dict.apiKeys.title}</h1>
        <p className="page__subtitle">{dict.apiKeys.subtitle}</p>
      </header>
      <ApiKeysTable locale={params.locale as 'en' | 'fa'} keys={mockApiKeys} dict={dict} />
    </div>
  );
}
