# ADR-004: Astro Integration Scope

## Status

Accepted

## Context

Astro integrations can inject scripts, routes, middleware, generated files, and
config. A BOX NOW integration could easily become an opinionated checkout
framework if it owns routes or server behavior.

## Decision

The first Astro package will provide:

- Integration config validation.
- Typed generated browser-safe config when useful.
- `BoxNowLockerPicker.astro`.
- Documented DOM events for selection and clearing.

It will not own checkout routes, payment routes, order persistence, webhooks, or
BOX NOW delivery-request creation.

## Consequences

- The integration works for static and SSR Astro projects.
- Server API calls remain in the host application or in examples using
  `@coding-tree-io/boxnow`.
- A future route/middleware helper requires a separate ADR.
