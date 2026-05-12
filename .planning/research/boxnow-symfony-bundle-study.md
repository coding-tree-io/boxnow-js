# Research: Answear Symfony BoxNow Bundle Reference

## Source

- Repository: https://github.com/answear/boxnow-bundle
- Latest release visible during research: `2.4.0` on 2026-04-28
- License: MIT
- Checked on 2026-05-12

This bundle is secondary ecosystem evidence. It does not override official BOX
NOW documentation and is not a compatibility target.

## Useful High-Level Flow

The Symfony bundle validates a small server-side integration shape:

1. Configure client id, client secret, API URL, and optional logger.
2. Authorize through a service that returns access token, token type, and expiry.
3. Fetch pickup points through a service using the access token.
4. Optionally fetch pickup points from a location API by region.

## Behavior Worth Keeping

- Server-side config groups `clientId`, `clientSecret`, and `apiUrl` together.
- Auth is exposed as an explicit service boundary instead of leaking credentials
  into call sites.
- Pickup-point access is separate from authorization.
- Region-specific pickup point lookup is a useful clue for country/region
  modeling.
- Tests/fixtures in a small ecosystem implementation are worth reviewing for
  compact contract-test patterns.

## Behavior To Avoid

- Do not copy Symfony service/container vocabulary into TypeScript public names.
- Do not rename BOX NOW Lockers to pickup points in this toolkit unless official
  BOX NOW terminology or the glossary changes.
- Do not treat location API examples as Partner API authority without official
  confirmation.
- Do not make framework-specific setup conventions part of the core package.

## Design Signals

- The Partner API Client needs an explicit environment/base URL seam.
- `AuthorizationResponse`-style token shape supports the existing token-cache
  requirement.
- Region/country handling should be designed before widget host helpers and
  closest-locker helpers are implemented.
- A logger/diagnostics seam may be useful later, but should not be part of the
  first public contract unless implementation needs it.

## Research Gaps

- Inspect bundle source before Phase 03 to see whether it targets the Partner
  API, a location API, or both.
- Confirm whether the region list maps to official BOX NOW countries or bundle
  convenience names.
- Confirm whether bundle tests include useful response fixtures that can inspire
  TypeScript mock tests without copying source.
