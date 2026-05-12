# ADR-004: Astro Integration Scope

## Status

Accepted

## Context

Astro integrations can inject scripts, routes, middleware, generated files, and
config. A BOX NOW integration could easily become an opinionated checkout
framework if it owns routes or server behavior.

Astro's Integration API exposes hooks and helpers such as `astro:config:setup`,
`updateConfig`, `injectScript`, `injectRoute`, and `createCodegenDir`. Phase 01
does not need the full surface.

## Decision

The first Astro package will provide:

- Integration config validation.
- Typed generated browser-safe config when useful.
- `BoxNowLockerPicker.astro`.
- Documented DOM events for selection and clearing.

It will not own checkout routes, payment routes, order persistence, webhooks, or
BOX NOW delivery-request creation.

Server-side delivery creation belongs to the Host Application, optionally using
`@coding-tree-io/boxnow`.

## Consequences

- The integration works for static and SSR Astro projects.
- Server API calls remain in the host application or in examples using
  `@coding-tree-io/boxnow`.
- A future route/middleware helper requires a separate ADR.
- Static and SSR fixture builds must prove the component and generated
  browser-safe config do not leak Server Credentials.
