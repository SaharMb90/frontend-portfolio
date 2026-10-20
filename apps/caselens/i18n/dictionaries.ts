import { locales, type Locale } from './locales';

export const dictionaries = {
  en: {
    appName: 'CaseLens',
    nav: { dashboard: 'Dashboard', cases: 'Cases', apiKeys: 'API Keys', settings: 'Settings' },
    common: {
      menu: 'Menu', toggleTheme: 'Toggle theme', light: 'Light', dark: 'Dark',
      switchLanguage: 'Switch language', all: 'All', results: 'results', of: 'of',
    },
    dashboard: {
      title: 'Dashboard', subtitle: 'Live overview of open cases and detected anomalies',
      kpis: 'Key Metrics', recent: 'Recent High-Priority Anomalies',
      severity: 'Severity', case: 'Case', detected: 'Detected', empty: 'No anomalies found',
    },
    cases: {
      title: 'Cases', subtitle: 'Search and filter all cases in the workspace',
      search: 'Search cases...', status: 'Status', risk: 'Risk', client: 'Client',
      assignee: 'Assignee', created: 'Created', id: 'ID', caseTitle: 'Title',
      noResults: 'No cases match your filters', results: 'results',
    },
    apiKeys: {
      title: 'API Keys', subtitle: 'Keys are masked by default; reveal or copy on demand',
      name: 'Name', token: 'Token', scopes: 'Scopes', status: 'Status', lastUsed: 'Last Used',
      reveal: 'Show', hide: 'Hide', copy: 'Copy', copied: 'Copied!',
    },
    settings: {
      title: 'Settings', subtitle: 'Profile and workspace preferences (demo — nothing is persisted)',
      profile: 'Profile', displayName: 'Display Name', email: 'Email', org: 'Organization',
      prefs: 'Preferences', language: 'Language', theme: 'Theme',
      save: 'Save Changes', saved: 'Settings saved (demo)',
    },
    status: { open: 'Open', investigating: 'Investigating', resolved: 'Resolved', closed: 'Closed', active: 'Active', revoked: 'Revoked', expired: 'Expired' },
    severity: { high: 'High', critical: 'Critical', medium: 'Medium', low: 'Low' },
  },
  fa: {
    appName: 'کیس‌لنز',
    nav: { dashboard: 'داشبورد', cases: 'پرونده‌ها', apiKeys: 'کلیدهای API', settings: 'تنظیمات' },
    common: {
      menu: 'منو', toggleTheme: 'تغییر پوسته', light: 'روشن', dark: 'تیره',
      switchLanguage: 'تغییر زبان', all: 'همه', results: 'نتیجه', of: 'از',
    },
    dashboard: {
      title: 'داشبورد', subtitle: 'نمای زنده پرونده‌های باز و ناهنجاری‌های تشخیص‌داده‌شده',
      kpis: 'شاخص‌های کلیدی', recent: 'ناهنجاری‌های اخیر با اولویت بالا',
      severity: 'شدت', case: 'پرونده', detected: 'زمان تشخیص', empty: 'ناهنجاری‌ای یافت نشد',
    },
    cases: {
      title: 'پرونده‌ها', subtitle: 'جستجو و فیلتر همه پرونده‌های فضای کاری',
      search: 'جستجوی پرونده...', status: 'وضعیت', risk: 'ریسک', client: 'مشتری',
      assignee: 'مسئول', created: 'تاریخ ایجاد', id: 'شناسه', caseTitle: 'عنوان',
      noResults: 'پرونده‌ای با فیلترهای شما یافت نشد', results: 'نتیجه',
    },
    apiKeys: {
      title: 'کلیدهای API', subtitle: 'کلیدها به‌صورت پیش‌فرض پنهان هستند؛ در صورت نیاز نمایش یا کپی کنید',
      name: 'نام', token: 'توکن', scopes: 'دامنه‌ها', status: 'وضعیت', lastUsed: 'آخرین استفاده',
      reveal: 'نمایش', hide: 'پنهان', copy: 'کپی', copied: 'کپی شد!',
    },
    settings: {
      title: 'تنظیمات', subtitle: 'پروفایل و ترجیحات فضای کاری (دمو — چیزی ذخیره نمی‌شود)',
      profile: 'پروفایل', displayName: 'نام نمایشی', email: 'ایمیل', org: 'سازمان',
      prefs: 'ترجیحات', language: 'زبان', theme: 'پوسته',
      save: 'ذخیره تغییرات', saved: 'تنظیمات ذخیره شد (دمو)',
    },
    status: { open: 'باز', investigating: 'در حال بررسی', resolved: 'حل‌شده', closed: 'بسته', active: 'فعال', revoked: 'لغو‌شده', expired: 'منقضی' },
    severity: { high: 'بالا', critical: 'بحرانی', medium: 'متوسط', low: 'پایین' },
  },
} as const satisfies Record<Locale, unknown>;

export type Dictionary = (typeof dictionaries)['en'];

export function getDictionary(locale: string): Dictionary {
  return locale === 'fa' ? (dictionaries.fa as unknown as Dictionary) : dictionaries.en;
}

export { locales };
export type { Locale };
