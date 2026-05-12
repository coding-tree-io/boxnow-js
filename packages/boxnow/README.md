# @coding-tree-io/boxnow

Server-side Partner API Client for BOX NOW.

## Phase 02 Status

This package currently exposes pure type, schema, and validation contracts for
the server-side BOX NOW Partner API surface. It does not perform HTTP requests
yet.

The shared validation implementation is internal to this repository; end users
should import from `@coding-tree-io/boxnow`, not from the internal core package.

## Planned Runtime Scope

- OAuth client-credentials authentication.
- Typed Partner API request helpers.
- Origins, destinations, delivery requests, parcels, labels, and closest-locker
  lookup.
- Fetch-compatible transport seam for Node, Cloudflare Workers, and tests.

## Non-Goals

- No browser use.
- No HTTP client behavior in Phase 02.
- No checkout, payment, order persistence, stock, or fulfillment ownership.
- No hidden storage authority.

See `.planning/public-api-sketch.md` for the Phase 01 contract skeleton.
