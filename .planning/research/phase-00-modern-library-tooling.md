# Research: Phase 00 Modern TypeScript Library Tooling

## Purpose

Phase 00 needs a foundation that fits modern open-source TypeScript libraries
without overbuilding package behavior before the BOX NOW package contracts are
implemented.

## Sources Reviewed

- Node.js package documentation: https://nodejs.org/api/packages.html
- tsdown documentation: https://tsdown.dev/guide/how-it-works
- pnpm workspace documentation: https://pnpm.io/pnpm-workspace_yaml
- Vitest guide: https://vitest.dev/guide/
- TypeScript TSConfig reference: https://www.typescriptlang.org/tsconfig/
- npm provenance documentation: https://docs.npmjs.com/generating-provenance-statements/
- UnJS `ofetch`: https://unjs.io/packages/ofetch/
- `ofetch` package metadata: https://github.com/unjs/ofetch
- `openapi-fetch` documentation: https://openapi-ts.dev/openapi-fetch/
- `openapi-fetch` package metadata: https://github.com/openapi-ts/openapi-typescript
- Astro sitemap integration package metadata: https://github.com/withastro/astro/tree/main/packages/integrations/sitemap

## Patterns To Carry Into This Repository

- Use explicit `"type": "module"` so Node and build tools do not infer module
  format from ambiguous files.
- Use explicit package `exports` for public entry points once package stubs
  exist; exports are the package boundary.
- Prefer ESM-first output. Do not add CJS compatibility until a real consumer
  need is identified.
- Keep package contents narrow with `files: ["dist"]` once buildable packages
  exist.
- Mark packages `sideEffects: false` when package behavior is pure/import-safe.
- Use strict TypeScript checks independently from bundling; `tsc --noEmit` is
  the type gate.
- Keep the early validation gate lean. Publish-readiness checks such as
  package export smoke tests, `publint`, `attw`, size limits, and npm provenance
  dry-runs belong later when packages have real exports.
- Use Vitest for unit tests; browser or Playwright coverage belongs to widget,
  Astro, and docs phases.
- Use Changesets for versioning metadata early, but defer publish workflow and
  dry-run release evidence until release hardening.
- Use pnpm workspace structure with package/app/example globs, but avoid
  package source stubs during Phase 00.

## Phase 00 Decision

Use `tsdown + Biome + TypeScript + Vitest`.

Rationale:

- `tsdown` is modern, library-oriented, and can grow into export/declaration
  validation later.
- Biome keeps formatting/linting simple for a small early repository.
- TypeScript remains the real type-safety gate.
- Vitest is a pragmatic test runner for pure helpers and later mocked client
  tests.

## Deferred Checks

Do not add these in Phase 00:

- `attw`
- `publint`
- package export smoke tests
- size-limit checks
- Playwright
- npm provenance/publish dry-run
- Node version compatibility matrix

These checks become useful after packages expose real public entry points.
