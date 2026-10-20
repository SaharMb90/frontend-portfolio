export const locales = ['en', 'fa'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dir(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'fa' ? 'rtl' : 'ltr';
}

export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${clean === '/' ? '' : clean}`;
}

/** Swap the locale segment of a pathname, e.g. /en/cases -> /fa/cases */
export function swapLocale(pathname: string, next: Locale): string {
  const parts = pathname.split('/');
  if (parts.length > 1 && isLocale(parts[1])) {
    parts[1] = next;
    return parts.join('/') || `/${next}`;
  }
  return `/${next}`;
}
