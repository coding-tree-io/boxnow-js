---
phase: 02-core-types-and-validation
plan: 01
subsystem: planning
tags: [audit, glossary, public-api, naming]
requires:
  - phase: 01-research-and-public-contract
    provides: Official BOX NOW research, ADRs, and initial public API sketch
provides:
  - Phase 02 external library audit gate
  - Voucher and wire-facing naming guidance
  - Internal core package note in the public API sketch
affects: [phase-02, validation, package-boundaries, public-contract]
tech-stack:
  added: []
  patterns:
    - Source-neutral ecosystem audit before public contract implementation
    - Protocol-first wire naming with ergonomic host-facing models
key-files:
  created:
    - .planning/research/phase-02-external-library-audit.md
  modified:
    - .planning/UBIQUITOUS_LANGUAGE.md
    - .planning/public-api-sketch.md
    - .planning/config.json
key-decisions:
  - "Voucher is documented as ecosystem and merchant wording related to Parcel and Parcel Label, not a blanket replacement."
  - "Wire-facing types may use protocol-first names while host-facing widget/domain types remain ergonomic."
  - "@coding-tree-io/boxnow-core is internal and not the supported public import path."
patterns-established:
  - "External library evidence is paraphrased into source-neutral planning artifacts before implementation."
  - "Public package imports remain curated even when shared contracts live in an internal package."
requirements-completed: ["02-00"]
duration: 12 min
completed: 2026-05-12
---

# Phase 02 Plan 01: External Audit And Naming Gate Summary

**Source-neutral WP/Symfony lifecycle audit with voucher terminology and protocol-first naming rules**

## Performance

- **Duration:** 12 min
- **Started:** 2026-05-12T12:55:00Z
- **Completed:** 2026-05-12T13:07:19Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments

- Created the Phase 02 external library audit artifact covering settings/config,
  auth, locker selection, delivery/voucher creation, label printing, cancellation,
  validation, do-not-copy notes, and gaps.
- Updated the ubiquitous language with `Voucher`, `Wire-Facing Type`, and
  `Host-Facing Type`.
- Updated the public API sketch so `@coding-tree-io/boxnow-core` is explicitly
  internal while the three public import surfaces remain unchanged.

## Task Commits

1. **Task 1: Write the Phase 02 external library audit artifact** - `47192b5`
2. **Task 2: Update glossary for protocol-first wire names and voucher terminology** - `ffc50a6`
3. **Task 3: Align the public API sketch with the internal package and protocol naming decisions** - `617bba5`

## Files Created/Modified

- `.planning/research/phase-02-external-library-audit.md` - Lifecycle audit checklist and gaps.
- `.planning/UBIQUITOUS_LANGUAGE.md` - Voucher and wire/host-facing naming guidance.
- `.planning/public-api-sketch.md` - Internal core package boundary and public import story.
- `.planning/config.json` - Biome formatting after GSD config mutation.

## Decisions Made

- `Voucher` may be used only as practical ecosystem or merchant wording and must
  stay related to `Parcel` and `Parcel Label`.
- Protocol models can be protocol-first; host-facing models stay glossary-led.
- The internal core package is implementation infrastructure, not an end-user import.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- `pnpm check` initially failed because GSD rewrote `.planning/config.json` in a
  compact JSON style that Biome rejected. The file was formatted with Biome and
  `pnpm check` then passed.

## User Setup Required

None - no external service configuration required.

## Verification

- `rg -n "Lifecycle Checklist|Do Not Copy|Voucher|boxnow-core|protocol-first" ...` passed.
- `pnpm check` passed after formatting `.planning/config.json`.
- `pnpm test` passed with no test files yet.
- `pnpm build` passed.

## Next Phase Readiness

Wave 2 can add the internal `@coding-tree-io/boxnow-core` package and validation
foundation without unresolved audit or naming ambiguity.

## Self-Check: PASSED

- Key files exist on disk.
- All task acceptance criteria were verified.
- Plan-level verification commands passed.
- Summary includes commits, deviations, issues, and next readiness.

---
*Phase: 02-core-types-and-validation*
*Completed: 2026-05-12*
