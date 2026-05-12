---
phase: 02-core-types-and-validation
plan: 03
status: completed
completed_at: "2026-05-12T13:26:21.8123971Z"
commits:
  - d31b815 feat(02-03): add core primitive schemas
  - 3862b83 feat(02-03): add locker normalization contracts
  - 931020b test(02-03): cover primitives and locker normalization
  - 58353f4 feat(02-03): add compartment dimension constants
---

# 02-03 Summary

## Completed

- Added shared primitive schemas and inferred types for `BoxNowEnvironment`,
  `BoxNowCountryCode`, `CompartmentSize`, `CompartmentSizeCode`, and small
  string primitives used by later validation contracts.
- Added BOX NOW compartment size code and centimeter dimension constants from
  the external audit evidence.
- Added pure locker/location contracts for `Locker`, `Origin`, `Destination`,
  `LockerSnapshot`, and raw widget locker selection input.
- Added `normalizeLockerSelection(value)` to validate raw widget protocol fields
  and return a host-facing `LockerSnapshot` without browser storage authority.
- Exported primitive and locker contracts from the internal core package.
- Added focused Vitest coverage for valid primitives, invalid primitive values,
  widget selection normalization, invalid widget payloads, and the absence of
  raw `boxnowLockerId` fields in normalized output.

## Verification

- `pnpm exec vitest run packages/boxnow-core/src/primitives.test.ts packages/boxnow-core/src/locker.test.ts`
  passed: 2 files, 8 tests.
- `pnpm check` passed.
- `pnpm test` passed: 3 files, 11 tests.
- `pnpm build` passed.

## Notes

- `src/index.ts` export ordering was normalized by Biome before the full gates.
- `country` is only attached to normalized locker snapshots when present in the
  raw widget payload.
