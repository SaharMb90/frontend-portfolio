import type { Locale } from '@/i18n/locales';

const FA_DIGITS = ['\u06F0','\u06F1','\u06F2','\u06F3','\u06F4','\u06F5','\u06F6','\u06F7','\u06F8','\u06F9'];

/** Convert ASCII digits to Persian digits when rendering Persian UI. */
export function toLocaleDigits(value: string, locale: Locale): string {
  if (locale !== 'fa') return value;
  return value.replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

/** Format an ISO date for display. Deterministic (UTC) so server & client agree. */
export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const formatted = locale === 'fa' ? `${y}/${m}/${d}` : `${y}-${m}-${d}`;
  return toLocaleDigits(formatted, locale);
}

/** Mask a token, keeping a short prefix/suffix, e.g. sk_l------f2a1 */
export function maskToken(token: string): string {
  if (token.length <= 8) return '\u2022'.repeat(token.length);
  return `${token.slice(0, 4)}${'\u2022'.repeat(6)}${token.slice(-4)}`;
}
