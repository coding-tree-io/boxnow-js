# Phase 00: Project Foundation - Context

## Goal

Make the repository ready for TypeScript package work without implementing BOX
NOW behavior.

## Decisions

- D-00-01: The repository is public under `coding-tree-io/boxnow-js`.
- D-00-02: Planning source of truth lives under `.planning/`.
- D-00-03: Runtime code must use glossary terms from `.planning/UBIQUITOUS_LANGUAGE.md`.
- D-00-04: Package implementation waits until workspace tooling exists.

## Boundaries

- No Partner API implementation in Phase 00.
- No widget implementation in Phase 00.
- No Astro integration implementation in Phase 00.
- No real BOX NOW credentials in any file.

## Review Focus

- Repo metadata is correct.
- Tooling choices are minimal and maintainable.
- CI can prove the empty workspace before real code begins.
