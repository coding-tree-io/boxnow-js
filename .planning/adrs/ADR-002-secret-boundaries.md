# ADR-002: Secret Boundaries

## Status

Accepted

## Context

The BOX NOW Partner API uses OAuth client credentials. The widget uses
browser-visible configuration such as partner id and mode. Mixing these in a
single configuration object would make secret leaks more likely.

Official Partner API docs identify OAuth client id, OAuth client secret, and API
base URL as partner-provided server credentials. Ecosystem references also keep
client id/secret in server-side settings or service config.

## Decision

Define two explicit configuration families:

- Server configuration for the Partner API Client.
- Browser-safe configuration for the Widget Helper and Astro component.

Server credentials must never be exported through browser packages, Astro public
env vars, docs fixtures, generated client bundles, or example frontends.

Browser-safe config may include partner id, widget mode, country/host selection,
GPS behavior, ZIP hints, accepted origins, and element selectors.

## Consequences

- The Astro integration may accept browser-safe widget options directly.
- Server examples must use runtime/server-only environment variables.
- Tests must include bundle/import checks for secret-boundary regressions.
- Public API sketches must keep `BoxNowClientConfig` separate from widget and
  Astro option types.
