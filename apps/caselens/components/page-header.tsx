import { Topbar } from '@/components/topbar';
import { locales } from '@/i18n';

export function PageHeader({ locale, title }: { locale: 'en' | 'fa'; title: string }) {
  return (
    <div style={{ margin: '-1.25rem -1.25rem 1.25rem' }}>
      <Topbar
        title={title}
        locale={locale}
        onLocaleChange={(l) => {
          const parts = typeof window !== 'undefined' ? window.location.pathname.split('/') : [];
          if (locales.includes(l as never) && parts.length > 1) parts[1] = l;
          if (typeof window !== 'undefined') window.location.assign(parts.join('/') || `/${l}`);
        }}
      />
    </div>
  );
}
