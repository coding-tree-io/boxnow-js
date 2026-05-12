# Phase 00: project-foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md; this log preserves the alternatives considered.

**Date:** 2026-05-12
**Phase:** 00-project-foundation
**Areas discussed:** Workspace Skeleton Depth, Quality Gate Strictness, Release Scaffolding Boundary, Repo Guidance Surface, CI Evidence Shape, Library Tooling Stack

---

## Workspace Skeleton Depth

| Option | Description | Selected |
| --- | --- | --- |
| Directories/config only | Establish monorepo shape and root config without package behavior. | yes |
| Minimal package stubs | Add per-package package files, READMEs, and placeholder exports. | |
| Full placeholder exports | Add buildable no-op package entry points immediately. | |

**User's choice:** Only directories and config.
**Notes:** Phase 00 must not create source stubs or imply implemented package behavior.

---

## Quality Gate Strictness

| Option | Description | Selected |
| --- | --- | --- |
| Lean validation gate | Install, format/lint, typecheck, test, and build only. | yes |
| Strict package export gate | Add package export and consumer checks before package code exists. | |
| Full publish-readiness gate | Add publish dry-runs, package audits, and size checks immediately. | |

**User's choice:** Lean validation gate.
**Notes:** Heavier package-publication checks are deferred until packages have real exports.

---

## Release Scaffolding Boundary

| Option | Description | Selected |
| --- | --- | --- |
| Only versioning | Add versioning metadata only. | yes |
| Versioning plus dry-run publish workflow | Add Changesets plus non-publishing release validation. | |
| Full release workflow | Add publish workflow immediately. | |

**User's choice:** Only versioning.
**Notes:** Changesets setup belongs in Phase 00; publish workflow belongs later.

---

## Repo Guidance Surface

| Option | Description | Selected |
| --- | --- | --- |
| Add repo guidance docs now | Add repo agent guidance, contribution, security, support, conduct, and templates early. | yes |
| Keep docs minimal until code exists | Wait for package code before adding community docs. | |

**User's choice:** Add everything from now.
**Notes:** Guidance should include the BOX NOW secret boundary before contributors add examples or fixtures.

---

## CI Evidence Shape

| Option | Description | Selected |
| --- | --- | --- |
| Current stack only | Prove the current Node/pnpm foundation with no compatibility promises. | yes |
| Future compatibility matrix | Test multiple Node versions/runtimes from the start. | |

**User's choice:** No future compatibility.
**Notes:** First CI lane should target the current development baseline only.

---

## Library Tooling Stack

| Option | Description | Selected |
| --- | --- | --- |
| tsdown + Biome | Modern library-oriented build tooling with lean formatting/linting. | yes |
| unbuild + Biome | Closer to UnJS/openapi-fetch patterns. | |
| tsup + ESLint/Prettier | Familiar but less aligned with current library-tooling research. | |

**User's choice:** tsdown + Biome + TypeScript + Vitest.
**Notes:** TypeScript remains the type gate; Vitest handles tests; Biome handles formatting/linting.

---

## the agent's Discretion

- Exact root script composition and config layout may be selected during implementation.
- Empty directory tracking can use minimal non-runtime placeholders or wait until directories receive config/docs.

## Deferred Ideas

- `attw`, `publint`, package export smoke tests, size limits, Playwright, npm provenance, and publish dry-runs.
- Node compatibility matrix.
