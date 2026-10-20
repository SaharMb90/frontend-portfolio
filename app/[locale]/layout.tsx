import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { dir, isLocale, locales, type Locale } from '@/i18n/locales';
import { getDictionary } from '@/i18n/dictionaries';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { ThemeProvider } from '@/components/theme-provider';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(params.locale);
  return { title: `${dict.appName} — ${dict.dashboard.title}`, description: dict.dashboard.subtitle };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <ThemeProvider>
      <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
        <body>
          <div className="app-shell">
            <Sidebar locale={locale} nav={dict.nav} common={dict.common} />
            <div className="app-main">
              <Topbar locale={locale} common={dict.common} />
              <main className="app-content">{children}</main>
            </div>
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
