import type { Locale } from './dictionaries';

export const locales: Locale[] = ['en', 'fa'];
export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export function dir(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'fa' ? 'rtl' : 'ltr';
}

/** Extract locale from a pathname like /en/cases or /fa/cases */
export function localeFromPathname(pathname: string): Locale {
  const seg = pathname.split('/')[1];
  return isLocale(seg) ? seg : defaultLocale;
}

export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${clean === '/' ? '' : clean}`;
}
