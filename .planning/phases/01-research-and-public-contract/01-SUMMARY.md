---
phase: 01-research-and-public-contract
plan: "01"
subsystem: planning
tags: [boxnow, api-research, widget, astro, public-contract]
requires:
  - phase: 00-project-foundation
    provides: TypeScript workspace skeleton, package directories, validation commands, and repo guidance.
provides:
  - Source-first BOX NOW Partner API research.
  - Source-first BOX NOW widget and Astro integration research.
  - Targeted WordPress Plugin and Symfony bundle ecosystem studies.
  - Accepted ADRs for package topology, secret boundaries, widget contract, and Astro Integration scope.
  - Initial public API contract skeleton.
  - Package README stubs with non-goals.
affects: [core-types, partner-api-client, widget-helper, astro-integration, docs]
tech-stack:
  added: []
  patterns:
    - Source-first research files under .planning/research/.
    - Public Contracts use Domain Terms with explicit Raw Escape Hatches for Protocol Fields.
    - Package README stubs are allowed before implementation, but package exports wait for implementation phases.
key-files:
  created:
    - .planning/public-api-sketch.md
    - .planning/research/boxnow-widget.md
    - .planning/research/boxnow-symfony-bundle-study.md
    - packages/boxnow/README.md
    - packages/boxnow-widget/README.md
    - packages/astro-boxnow/README.md
  modified:
    - .planning/research/boxnow-official-api.md
    - .planning/research/boxnow-wordpress-plugin-study.md
    - .planning/adrs/ADR-001-package-topology.md
    - .planning/adrs/ADR-002-secret-boundaries.md
    - .planning/adrs/ADR-003-widget-contract.md
    - .planning/adrs/ADR-004-astro-integration-scope.md
    - .planning/phases/01-research-and-public-contract/01-CONTEXT.md
    - .planning/phases/01-research-and-public-contract/01-PLAN.md
key-decisions:
  - "Official BOX NOW OpenAPI/manual are the Partner API protocol source of truth."
  - "Widget docs own browser widget behavior; ecosystem implementations are secondary evidence."
  - "Server Credentials and Browser-Safe Config stay in separate public config families."
  - "The first public API sketch locks names and boundaries, not exhaustive endpoint fields."
  - "WordPress Plugin and Symfony bundle references are research sources, not compatibility targets."
patterns-established:
  - "Research gaps are named explicitly with future validation paths."
  - "Package stubs document scope and non-goals without adding runtime exports."
requirements-completed: []
duration: 9 min
completed: 2026-05-12
---

# Phase 01 Plan 01: Research And Public Contract Summary

**BOX NOW research, ADRs, and public contract skeleton for the Partner API Client, Widget Helper, and Astro Integration**

## Performance

- **Duration:** 9 min
- **Started:** 2026-05-12T10:10:56Z
- **Completed:** 2026-05-12T10:20:07Z
- **Tasks:** 10
- **Files modified:** 18

## Accomplishments

- Split official Partner API, widget/Astro, WordPress Plugin, and Symfony bundle findings into source-first research artifacts, with ecosystem findings treated as targeted studies rather than full audits.
- Tightened four accepted ADRs with Phase 01 evidence and downstream verification implications.
- Added `.planning/public-api-sketch.md` with package entry points, method namespaces, event names, config families, and explicit non-goals.
- Added package README stubs for all three planned packages without introducing runtime exports or implementation files.
- Marked all Phase 01 plan tasks complete and extended context refs so downstream planning reads the right artifacts.

## Task Commits

The Phase 01 plan was executed as one documentation-only commit because the plan is a legacy flat checklist without task frontmatter.

1. **Tasks 01-01 through 01-10** - `6071c03` (`docs(01): execute research and public contract plan`)

**Plan metadata:** this summary commit.

## Files Created/Modified

- `.planning/public-api-sketch.md` - Initial public API contract skeleton.
- `.planning/research/boxnow-official-api.md` - Official Partner API research and protocol gaps.
- `.planning/research/boxnow-widget.md` - Widget and Astro Integration research.
- `.planning/research/boxnow-wordpress-plugin-study.md` - Targeted plugin findings from local source.
- `.planning/research/boxnow-symfony-bundle-study.md` - Answear Symfony bundle ecosystem study.
- `.planning/adrs/ADR-001-package-topology.md` - Package split evidence and consequences.
- `.planning/adrs/ADR-002-secret-boundaries.md` - Server/browser config boundary.
- `.planning/adrs/ADR-003-widget-contract.md` - LockerSnapshot and no-hidden-storage boundary.
- `.planning/adrs/ADR-004-astro-integration-scope.md` - Astro Integration hook and route ownership boundary.
- `.planning/phases/01-research-and-public-contract/01-CONTEXT.md` - Updated canonical refs and package README boundary.
- `.planning/phases/01-research-and-public-contract/01-PLAN.md` - Marked tasks complete.
- `packages/boxnow/README.md` - Package stub and non-goals.
- `packages/boxnow-widget/README.md` - Package stub and non-goals.
- `packages/astro-boxnow/README.md` - Package stub and non-goals.

## Decisions Made

- Kept official BOX NOW sources authoritative over ecosystem implementation behavior.
- Treated the Answear Symfony bundle as secondary evidence for server-side config/auth and pickup-point patterns, pending a fuller source audit before Phase 02 contracts are locked.
- Preserved the glossary boundary: Domain Terms first, Raw Escape Hatches only where Protocol Shape fidelity requires them.
- Added README stubs but removed empty `.gitkeep` placeholders because package directories now have real documentation.

## Deviations from Plan

None - plan executed exactly as written, with the user-requested Symfony bundle reference folded into task 01-03 as targeted ecosystem research.

**Total deviations:** 0 auto-fixed.
**Impact on plan:** No scope creep. The extra ecosystem reference strengthens the existing research task.

## Issues Encountered

- The plan used a legacy flat checklist rather than structured task frontmatter, so execution and commit tracking were consolidated into one documentation commit.
- Live BOX NOW behavior remains unverified because sandbox/partner credentials are not available.

## User Setup Required

None - no external service configuration required.

## Verification

- `pnpm check` passed.
- `pnpm test` passed with no test files.
- `pnpm build` passed.
- Secret-pattern scan across `.planning`, `packages`, and `README.md` found no matches.

## Next Phase Readiness

Phase 02 can create shared types and validation against the public contract skeleton, glossary, ADRs, and source-first research artifacts after completing the external library audit gate for the WordPress Plugin and Symfony bundle. Live BOX NOW validation remains deferred until credentials are available.

---
*Phase: 01-research-and-public-contract*
*Completed: 2026-05-12*
