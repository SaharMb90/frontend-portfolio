import Link from 'next/link';
import { defaultLocale } from '@/i18n/locales';

export default function NotFound() {
  return (
    <div className="page page--center">
      <h1 className="page__title">404</h1>
      <p className="page__subtitle">
        This page could not be found. / این صفحه یافت نشد.
      </p>
      <Link className="ui-btn ui-btn--default" href={`/${defaultLocale}`}>
        CaseLens
      </Link>
    </div>
  );
}
