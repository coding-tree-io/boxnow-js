# ADR-002: Secret Boundaries

## Status

Accepted

## Context

The BOX NOW Partner API uses OAuth client credentials. The widget uses
browser-visible configuration such as partner id and mode. Mixing these in a
single configuration object would make secret leaks more likely.

## Decision

Define two explicit configuration families:

- Server configuration for the Partner API Client.
- Browser-safe configuration for the Widget Helper and Astro component.

Server credentials must never be exported through browser packages, Astro public
env vars, docs fixtures, generated client bundles, or example frontends.

## Consequences

- The Astro integration may accept browser-safe widget options directly.
- Server examples must use runtime/server-only environment variables.
- Tests must include bundle/import checks for secret-boundary regressions.
