import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import { Sidebar } from '../../components/sidebar';
import { dictionaries, isLocale, dir } from '@/i18n';

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as 'en' | 'fa';
  const t = dictionaries[locale];
  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar locale={locale} t={t} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <main style={{ padding: '1.25rem', flex: 1 }}>{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
