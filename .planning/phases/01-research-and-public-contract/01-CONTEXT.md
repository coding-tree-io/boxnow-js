# Phase 01: Research And Public Contract - Context

## Goal

Turn the official BOX NOW material, WordPress plugin study, and Astro integration
docs into explicit public API contracts before implementation.

## Decisions

- D-01-01: Official BOX NOW OpenAPI/manual are protocol sources of truth.
- D-01-02: The WordPress plugin is a behavior reference only.
- D-01-03: Public API names must follow the ubiquitous language.
- D-01-04: Server credentials and browser-safe config are distinct concepts.
- D-01-05: The Astro Integration composes the Widget Helper and does not own checkout.

## Boundaries

- No Partner API HTTP client yet.
- No browser widget loader yet.
- No Astro component yet.
- No package publishing yet.

## Review Focus

- Source material is cited and summarized without copying vendor docs.
- ADRs explain irreversible or surprising decisions.
- Public API sketches are small enough to review before implementation.
