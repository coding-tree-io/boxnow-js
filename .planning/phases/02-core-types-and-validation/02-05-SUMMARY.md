---
phase: 02-core-types-and-validation
plan: 05
status: completed
completed_at: "2026-05-12T14:14:40.7598916Z"
commits:
  - 1b4d63f fix(02-05): typecheck locker selection normalization
  - d171b1c feat(02-05): expose curated package contracts
  - 2da2b0f test(02-05): verify public package surfaces
  - f5a2da7 docs(02-05): update package phase status
---

# 02-05 Summary

## Completed

- Added package metadata and source entry points for `@coding-tree-io/boxnow`
  and `@coding-tree-io/boxnow-widget`.
- Curated server package exports for Phase 02 validation contracts, protocol
  validators, primitive/domain types, and validation result types.
- Curated widget package exports for browser-safe locker selection contracts
  without auth-session, server credential, or delivery-request exports.
- Added package-surface tests for server and widget imports, including a widget
  secret-boundary guard.
- Updated `tsdown.config.ts` with build entries for implemented Phase 02 package
  entry points.
- Updated root `tsconfig.json` so `pnpm check` and `pnpm build` typecheck
  package source and tests instead of an empty file set.
- Updated package READMEs to describe Phase 02 as pure type/schema/validation
  contracts only, with no HTTP client or widget-loader behavior.

## Verification

- `pnpm install` passed.
- `pnpm exec vitest run packages/boxnow/src/index.test.ts packages/boxnow-widget/src/index.test.ts`
  passed: 2 files, 4 tests.
- `pnpm check` passed.
- `pnpm test` passed: 6 files, 24 tests.
- `pnpm build` passed, including `tsdown` package builds for core, server, and
  widget entry points.
- README internal-import guard passed.

## Notes

- `tsdown` required `dts.eager` for the current declaration bundling path.
- Generated `dist` output remains ignored by the repository.
