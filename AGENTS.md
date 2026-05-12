# AGENTS.md

## Project

This repository builds the BOX NOW Toolkit:

- `@coding-tree-io/boxnow` for the server-side Partner API Client.
- `@coding-tree-io/boxnow-widget` for browser-safe Widget Helpers.
- `@coding-tree-io/astro-boxnow` for the Astro Integration.

Planning source of truth lives under `.planning/`. Use
`.planning/UBIQUITOUS_LANGUAGE.md` before naming public APIs.

## Boundaries

- Server Credentials must never enter browser code, public Astro env vars,
  examples, tests, fixtures, screenshots, CI logs, or generated clients.
- The Host Application owns checkout, payment, order persistence, stock, and
  fulfillment workflow.
- The Widget Helper emits Locker Selection data; it does not prove that the Host
  Application can skip server-side validation.
- Do not add runtime package exports, placeholder implementation files, or package
  behavior claims before the relevant implementation phase.

## Commands

- Install: `pnpm install`
- Format: `pnpm format`
- Check: `pnpm check`
- Test: `pnpm test`
- Build: `pnpm build`

Run `pnpm check`, `pnpm test`, and `pnpm build` before claiming implementation
work is complete.

## Release Notes

Changesets are present for versioning only in Phase 00. Publishing workflows,
provenance checks, export smoke tests, and package compatibility audits are
deferred until package entry points exist.
