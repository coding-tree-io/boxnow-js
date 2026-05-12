# ADR-003: Widget Contract

## Status

Accepted

## Context

The BOX NOW widget returns a raw selected-locker object. The WordPress plugin
stores raw-ish locker data in browser state and WooCommerce order metadata. That
works for a plugin but is too platform-coupled for a reusable TypeScript
toolkit.

The official widget docs require `parentElement` and, for iframe/popup modes,
`afterSelect`. They document widget modes and fields such as locker id, address,
postal code, and name. Those fields are Protocol Fields, not the primary
host-facing Public Contract.

## Decision

The Widget Helper exposes a normalized `LockerSnapshot` as the primary contract.
Raw widget payload access, if added, must be explicit and secondary.

The helper will not make `localStorage` authoritative. Host applications own
selection state, checkout blocking, and persistence.

Country-specific widget hosts are supported by ecosystem references, but the
final host matrix must be confirmed against official widget behavior before
implementation.

## Consequences

- The public API stays stable even if BOX NOW adds extra widget fields.
- Host applications can choose their own state management.
- Checkout examples must show host-side validation before payment.
- Browser tests must cover invalid origins, invalid payloads, selection events,
  clear events, and the no-hidden-storage default.
