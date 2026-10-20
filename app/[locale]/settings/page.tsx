import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/locales';
import { SettingsForm } from '@/components/settings/settings-form';

export default function SettingsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">{dict.settings.title}</h1>
        <p className="page__subtitle">{dict.settings.subtitle}</p>
      </header>
      <SettingsForm locale={locale} dict={dict} />
    </div>
  );
}
