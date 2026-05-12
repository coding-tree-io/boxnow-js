# @coding-tree-io/boxnow

Server-side Partner API Client for BOX NOW.

## Planned Scope

- OAuth client-credentials authentication.
- Typed Partner API request helpers.
- Origins, destinations, delivery requests, parcels, labels, and closest-locker
  lookup.
- Fetch-compatible transport seam for Node, Cloudflare Workers, and tests.

## Non-Goals

- No browser use.
- No checkout, payment, order persistence, stock, or fulfillment ownership.
- No hidden storage authority.
- No package exports until the implementation phase creates real entry points.

See `.planning/public-api-sketch.md` for the Phase 01 contract skeleton.
