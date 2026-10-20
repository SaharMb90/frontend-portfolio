# CaseLens

CaseLens is a bilingual (English / فارسی) case & anomaly review dashboard demo built with
**Next.js 14 App Router**, **React 18**, and **TypeScript** — no external UI libraries,
no CDN fonts or scripts, and pure CSS (works fully offline).

## Features

- **Dashboard** — KPI cards (open cases, active anomalies, average risk, resolved) and a
  recent high-priority anomalies table.
- **Cases** — client-side search + status filter over 24 mock cases with localized dates
  and Persian digits.
- **API Keys** — masked tokens with reveal/copy actions and status badges.
- **Settings** — profile form, language switcher, and light/dark theme (persisted to
  `localStorage`).
- **i18n** — locale-segmented routes (`/en`, `/fa`) with full RTL support for Persian.
- **Theming** — CSS custom properties, no flash on first paint, toggle in the topbar.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000 -> redirects to /en
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve production build
npm run typecheck  # tsc --noEmit
npm run lint
```

Requires Node.js >= 20.

## Project structure

```
app/
  layout.tsx            # root layout (metadata, globals.css)
  page.tsx              # redirects / -> /en
  not-found.tsx         # 404
  [locale]/             # en | fa routes
    layout.tsx          # shell: sidebar + topbar + theme provider
    page.tsx            # dashboard
    cases/page.tsx
    api-keys/page.tsx
    settings/page.tsx
components/
  layout/               # sidebar, topbar
  cases/                # cases-table (search/filter, client component)
  api-keys/             # api-keys-table (reveal/copy)
  settings/             # settings-form
  theme-provider.tsx    # light/dark context (localStorage)
  theme-toggle.tsx
  ui/                   # button, card, badge primitives
i18n/                   # locales, dictionaries (EN/FA)
lib/                    # cn(), format helpers (dates, digits, token masking)
mock-data/              # typed mock cases, anomalies, API keys, KPIs
```

## Notes

- All data is mock data; nothing is persisted server-side.
- The `fa` locale renders right-to-left with Persian digits and localized dates.
