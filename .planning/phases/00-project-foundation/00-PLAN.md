# 00 Plan - Project Foundation

## Objective

Create a trustworthy TypeScript monorepo foundation.

## Tasks

- [x] 00-01 Create public GitHub repository under `coding-tree-io`.
- [x] 00-02 Add package manager and TypeScript workspace skeleton.
- [x] 00-03 Add formatting, linting, typecheck, unit-test, and build scripts.
- [x] 00-04 Add Changesets and release workflow skeleton.
- [x] 00-05 Add contributor, security, and package support policy docs.
- [x] 00-06 Add first CI workflow for install, check, test, and build.
- [x] 00-07 Add root `AGENTS.md` for repo-specific source-of-truth rules.
- [x] 00-08 Verify the empty workspace on Windows and CI.

## Acceptance Criteria

- `pnpm install` succeeds.
- `pnpm check` succeeds.
- `pnpm test` succeeds.
- `pnpm build` succeeds.
- CI runs the same checks on pull requests.
- No runtime package claims behavior that is not implemented.

## Proposed Commits

1. `chore: add pnpm typescript workspace`
2. `chore: add quality gates`
3. `chore: add release and contribution scaffolding`
4. `docs: add repository agent guidance`

## Validation

Run after implementation:

```powershell
pnpm install
pnpm check
pnpm test
pnpm build
git status --short --branch
```
