# @coding-tree-io/boxnow-widget

Browser-safe helpers for the BOX NOW map widget.

## Phase 02 Status

This package currently exposes pure type, schema, and validation contracts for
browser-safe locker selection data. It does not load or control the BOX NOW
widget yet.

The shared validation implementation is internal to this repository; end users
should import from `@coding-tree-io/boxnow-widget`, not from the internal core
package.

## Planned Runtime Scope

- Load and configure the BOX NOW widget.
- Support iframe, popup, and navigate modes where officially supported.
- Normalize widget selections into `LockerSnapshot`.
- Emit framework-neutral selected and cleared events.
- Validate expected widget origins before accepting message data.

## Non-Goals

- No Server Credentials.
- No widget loader behavior in Phase 02.
- No checkout, payment, order persistence, stock, or fulfillment ownership.
- No hidden `localStorage` authority.

See `.planning/public-api-sketch.md` for the Phase 01 contract skeleton.
