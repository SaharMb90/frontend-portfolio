# CaseLens — Import Fix Patch (@repo/* removal)

This patch removes all `@repo/*` workspace imports from `apps/caselens` so the app
builds as a standalone-in-repo app (no dependency on `packages/ui`, `packages/i18n`,
`packages/mock-data`).

## What changed
- All `@repo/ui/src`, `@repo/i18n/src`, `@repo/mock-data/src` imports rewritten to local aliases:
  - UI components -> `@/components/ui/*` (files copied from `build/caselens-standalone/components/ui`)
  - Theme provider -> `@/components/theme-provider`; Topbar -> `@/components/topbar` (local copies)
  - i18n -> `@/i18n` (`dictionaries.ts`, `locales.ts`, `index.ts` copied from `build/caselens-standalone/i18n`)
  - Mock data -> `@/mock-data` (`caselens.ts`, `types.ts`, `index.ts` copied from `build/caselens-standalone/mock-data`)
- `apps/caselens/tsconfig.json`: `paths` now only maps `"@/*": ["./*"]`.
- `next.config.mjs`: unchanged — no `transpilePackages` needed (all deps are local TS/TSX).

## How to apply
1. Extract this ZIP at the repository root and replace/merge the files (paths are relative to repo root).
2. `pnpm install` (or your package manager), then `pnpm --filter caselens dev` / `build`.
3. Commit and push, then redeploy.

Note: the workspace packages under `packages/*` are no longer referenced by this app
and can be removed later in a separate cleanup commit.
