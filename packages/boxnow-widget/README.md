# @coding-tree-io/boxnow-widget

Browser-safe helpers for the BOX NOW map widget.

## Planned Scope

- Load and configure the BOX NOW widget.
- Support iframe, popup, and navigate modes where officially supported.
- Normalize widget selections into `LockerSnapshot`.
- Emit framework-neutral selected and cleared events.
- Validate expected widget origins before accepting message data.

## Non-Goals

- No Server Credentials.
- No checkout, payment, order persistence, stock, or fulfillment ownership.
- No hidden `localStorage` authority.
- No package exports until the implementation phase creates real entry points.

See `.planning/public-api-sketch.md` for the Phase 01 contract skeleton.
