# Phase 02 External Library Audit

**Date:** 2026-05-12
**Phase:** 02-core-types-and-validation
**Status:** Complete for Phase 02 implementation

## Scope

This audit converts the local WordPress Plugin source and the `answear/boxnow-bundle`
repository into source-neutral findings for Phase 02. It only affects public type names,
validation boundaries, protocol/domain naming, and authority boundaries.

Official BOX NOW OpenAPI/manual/widget documentation and accepted ADRs remain
authoritative. Ecosystem behavior is evidence for practical merchant vocabulary and
integration lifecycle pressure, not a source of framework ownership for this toolkit.

## Inspected Sources

- `.planning/research/_local-sources/box-now-delivery-WP`
- `.planning/research/_local-sources/answear-boxnow-bundle`
- `.planning/phases/02-core-types-and-validation/02-CONTEXT.md`
- `.planning/phases/02-core-types-and-validation/02-RESEARCH.md`
- `.planning/research/boxnow-official-api.md`
- `.planning/research/boxnow-widget.md`
- `.planning/adrs/ADR-001-package-topology.md`
- `.planning/adrs/ADR-002-secret-boundaries.md`
- `.planning/adrs/ADR-003-widget-contract.md`

No third-party source snippets or examples are copied here.

## Lifecycle Checklist

| Area | WordPress Plugin | Symfony Bundle | Phase 02 impact |
| --- | --- | --- | --- |
| Settings/config | Stores API URL, credentials, widget mode, button text, voucher options, and checkout/admin behavior in WordPress settings. | Configures `clientId`, `clientSecret`, and optional `apiUrl` through Symfony configuration. | Server credential shapes belong to server-only validation. Widget config must stay browser-safe. |
| Authentication | Uses `/api/v1/auth-sessions` before delivery, label, and cancellation calls. | Uses `/api/v1/auth-sessions` and validates token response shape. | Auth request/response protocol types should exist, but no token-fetching transport behavior is implemented in Phase 02. |
| Locker or pickup-point selection | Handles widget locker fields, hidden checkout fields, WooCommerce session, and localStorage glue. | Reads pickup points through `/api/v1/destinations`, `/api/v1/apms:customerSearch`, and regional location files. | `LockerSnapshot` should be host-facing and minimal; persistence belongs to the Host Application. |
| Delivery/voucher creation | Creates delivery requests, stores returned parcel ids, and exposes admin "voucher" creation controls. | Does not implement delivery-request creation. | Protocol types should use Delivery Request and Parcel concepts, while `Voucher` is a practical ecosystem term. |
| Label printing | Fetches parcel label PDFs by parcel id for admin printing. | Not covered. | `ParcelLabel` remains the canonical toolkit term; voucher wording can appear as alias/context only. |
| Cancellation | Cancels BOX NOW parcels and mirrors the result into WooCommerce order/admin behavior. | Not covered. | Cancellation protocol can be modeled later; order-status ownership must not leak into Phase 02. |
| Validation/failure handling | Mixes JavaScript checks, hidden inputs, WordPress nonce/AJAX validation, PHP exceptions, and admin notices. | Uses field-level assertions and fixture-backed integration tests for pickup-point and auth responses. | Prefer small non-throwing validation helpers and focused fixtures/tests; do not copy framework-specific control flow. |

## Phase 02 Findings

- `Voucher` is real merchant/admin vocabulary in the WordPress ecosystem, especially
  around delivery creation and label printing. It should be documented as an ecosystem
  term related to `Parcel` and `Parcel Label`, not as a replacement for protocol terms.
- The official API lifecycle still centers Phase 02 around auth sessions, origins,
  destinations, delivery requests, parcels, labels, and cancellation.
- Wire-facing request/response types may preserve official protocol field names because
  consumers need to construct and inspect BOX NOW payloads accurately.
- Host-facing widget/domain types should remain ergonomic and should not mirror raw
  WordPress field names such as `boxnowLockerAddressLine1` as the primary public model.
- `LockerSnapshot` should cover the BlackBox Records MVP fields: locker id, locker
  display name, address line, postal code, and country when available.
- `CompartmentSize` should preserve the merchant vocabulary of small, medium, and large
  while mapping to official BOX NOW values in protocol builders.
- The Symfony bundle supports the value of validating inbound remote data before it is
  transformed into host-facing objects, but its Webmozart/assert exception style should
  not define this TypeScript toolkit's public validation surface.
- The WordPress Plugin confirms that checkout/order persistence, stock, payment,
  fulfillment, and admin lifecycle decisions belong outside this toolkit.

## Do Not Copy

- Do not copy WooCommerce order meta names, hidden checkout field names, admin action
  names, order statuses, or session/localStorage keys into the public contract.
- Do not make browser localStorage a hidden authority. The Host Application owns state.
- Do not copy automatic WooCommerce product-line-to-voucher mapping. Parcel creation is
  a host workflow decision.
- Do not copy WordPress admin screens, settings pages, nonce/AJAX shape, migration
  behavior, stock/payment/fulfillment coupling, or order persistence.
- Do not copy Symfony service/container naming or PHP assertion exceptions into public
  TypeScript package names.
- Do not let ecosystem conflicts override official BOX NOW documentation or accepted ADRs.

## Gaps

- Live delivery-request behavior remains unverified until BOX NOW sandbox/partner
  credentials exist.
- The exact future public use of `Voucher` depends on whether BlackBox Records or BOX NOW
  merchant-facing flows need that term in user-facing documentation.
- Widget country host behavior should be confirmed again in the Widget Helper phase
  against official widget documentation.
- Label format coverage beyond PDF and ZPL should remain tied to official API evidence.
- Framework migration notes are deferred. This audit is not a WordPress or Symfony
  compatibility promise.

## Decision Trace

- D-02-01 through D-02-04: the lifecycle audit is complete as a checklist, findings,
  do-not-copy notes, and gaps.
- D-02-05: official BOX NOW docs and accepted ADRs remain authoritative.
- D-02-06: findings are filtered to the BlackBox Records MVP.
- D-02-07: WooCommerce/Symfony commerce ownership remains out of scope.
- D-02-19 through D-02-24: protocol-first wire names are allowed where they improve
  integration clarity; host-facing names stay glossary-led and practical.
