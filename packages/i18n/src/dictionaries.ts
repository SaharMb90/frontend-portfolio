export const dictionaries = {
  en: {
    appName: 'CaseLens',
    nav: { dashboard: 'Dashboard', cases: 'Cases', apiKeys: 'API Keys', settings: 'Settings' },
    dashboard: { title: 'Dashboard', kpis: 'Key Metrics', recent: 'Recent High-Priority Anomalies', severity: 'Severity', case: 'Case', detected: 'Detected', empty: 'No anomalies found' },
    cases: { title: 'Cases', search: 'Search cases...', status: 'Status', risk: 'Risk', client: 'Client', assignee: 'Assignee', created: 'Created', id: 'ID', title: 'Title', noResults: 'No cases match your filters' },
    apiKeys: { title: 'API Keys', name: 'Name', token: 'Token', scopes: 'Scopes', status: 'Status', lastUsed: 'Last Used', reveal: 'Show', hide: 'Hide', copy: 'Copy', copied: 'Copied!' },
    settings: { title: 'Settings', profile: 'Profile', displayName: 'Display Name', email: 'Email', org: 'Organization', prefs: 'Preferences', language: 'Language', save: 'Save Changes', saved: 'Settings saved (demo)' },
    status: { open: 'Open', investigating: 'Investigating', resolved: 'Resolved', closed: 'Closed', active: 'Active', revoked: 'Revoked', expired: 'Expired' },
    severity: { high: 'High', critical: 'Critical', medium: 'Medium', low: 'Low' },
  },
  fa: {
    appName: 'کیس‌لنز',
    nav: { dashboard: 'داشبورد', cases: 'پرونده‌ها', apiKeys: 'کلیدهای API', settings: 'تنظیمات' },
    dashboard: { title: 'داشبورد', kpis: 'شاخص‌های کلیدی', recent: 'ناهنجاری‌های اخیر با اولویت بالا', severity: 'شدت', case: 'پرونده', detected: 'زمان تشخیص', empty: 'ناهنجاری‌ای یافت نشد' },
    cases: { title: 'پرونده‌ها', search: 'جستجوی پرونده...', status: 'وضعیت', risk: 'ریسک', client: 'مشتری', assignee: 'مسئول', created: 'تاریخ ایجاد', id: 'شناسه', title: 'عنوان', noResults: 'پرونده‌ای با فیلترهای شما یافت نشد' },
    apiKeys: { title: 'کلیدهای API', name: 'نام', token: 'توکن', scopes: 'دامنه‌ها', status: 'وضعیت', lastUsed: 'آخرین استفاده', reveal: 'نمایش', hide: 'پنهان', copy: 'کپی', copied: 'کپی شد!' },
    settings: { title: 'تنظیمات', profile: 'پروفایل', displayName: 'نام نمایشی', email: 'ایمیل', org: 'سازمان', prefs: 'ترجیحات', language: 'زبان', save: 'ذخیره تغییرات', saved: 'تنظیمات ذخیره شد (دمو)' },
    status: { open: 'باز', investigating: 'در حال بررسی', resolved: 'حل‌شده', closed: 'بسته', active: 'فعال', revoked: 'لغو‌شده', expired: 'منقضی' },
    severity: { high: 'بالا', critical: 'بحرانی', medium: 'متوسط', low: 'پایین' },
  },
} as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof dictionaries.en;
