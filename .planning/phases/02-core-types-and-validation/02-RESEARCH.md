# Phase 02 Research - Core Types And Validation

**Researched:** 2026-05-12
**Scope:** external lifecycle audit gate, shared type ownership, Valibot/Standard Schema validation shape, protocol-first wire naming.

## Summary

Phase 02 can proceed with implementation only after a bounded lifecycle audit
gate. The audit should not become a framework-compatibility project: it should
extract only the WP/Symfony findings that affect public types, validation,
naming, or authority boundaries.

The implementation should introduce an internal shared workspace package for
shared contracts and validation. Public packages should curate re-exports from
that package, but the internal package itself should not be an end-user import.

Valibot is a good internal validator for this phase because it is modular,
type-safe, dependency-free, and supports non-throwing validation. Valibot also
implements Standard Schema v1, so public schema-shaped contracts can be based on
Standard Schema rather than Valibot-native types.

## Sources Checked

### Local Sources

- `.planning/research/_local-sources/box-now-delivery-WP` - local ignored WordPress Plugin source.
- `.planning/research/_local-sources/answear-boxnow-bundle` - local ignored shallow clone of `https://github.com/answear/boxnow-bundle`.
- `.planning/research/boxnow-official-api.md`
- `.planning/research/boxnow-widget.md`
- `.planning/public-api-sketch.md`
- `.planning/UBIQUITOUS_LANGUAGE.md`
- `.planning/adrs/ADR-001-package-topology.md`
- `.planning/adrs/ADR-002-secret-boundaries.md`
- `.planning/adrs/ADR-003-widget-contract.md`
- `.planning/adrs/ADR-004-astro-integration-scope.md`

### External Docs

- `https://valibot.dev/guides/introduction/`
- `https://valibot.dev/guides/integrate-valibot/`
- `https://github.com/standard-schema/standard-schema`
- `https://json-schema.org/draft/2020-12`

## External Library Audit Gate

### Checklist

- Settings/config:
  - WordPress stores API URL, client id/secret, widget display mode, voucher behavior, and locker messages in plugin settings.
  - Symfony bundle exposes `clientId`, `clientSecret`, and optional `apiUrl` configuration.
- Authentication:
  - Both ecosystem sources use `/api/v1/auth-sessions`.
  - Server credentials are framework/server-side only; this confirms ADR-002.
- Locker/pickup-point selection:
  - WordPress widget payloads contain fields such as `boxnowLockerId`, `boxnowLockerAddressLine1`, `boxnowLockerPostalCode`, and `boxnowLockerName`.
  - WordPress persists selection into hidden checkout fields, WooCommerce session, and localStorage as framework glue. This confirms that our Widget Helper should emit data and let the host app persist it.
  - Symfony bundle models pickup points from `/api/v1/destinations` and `/api/v1/apms:customerSearch`, including `id`, `state`, `name`, `addressLine1`, `postalCode`, `country`, `expectedDeliveryTime`, and `region`.
- Delivery/voucher lifecycle:
  - WordPress uses `voucher` as a merchant/admin term while BOX NOW API responses return `parcels`.
  - WordPress creates delivery requests through `/api/v1/delivery-requests`, saves returned parcel ids, prints labels via `/api/v1/parcels/{parcel_id}/label.pdf`, and cancels via `/api/v1/parcels/{parcel_id}:cancel`.
  - Symfony bundle does not cover delivery-request creation, parcel labels, or cancellation; it is only useful for config, auth, and pickup-point/destination shape.
- Validation/failure behavior:
  - WordPress validation is mixed across JavaScript checks, hidden inputs, nonce/AJAX handlers, and PHP exceptions. Do not copy the shape.
  - Symfony response validation uses field-specific required string checks for pickup points and fixture-backed integration tests. Useful pattern: validate external response payloads before constructing host-facing DTOs.

### Findings That Affect Phase 02

- `Voucher` must be treated as a real ecosystem term, but official API protocol still exposes `DeliveryRequest`, `Parcel`, and `ParcelLabel` concepts. Update the glossary before implementation if `Voucher` appears in any public API.
- `LockerSnapshot` should include at least the widget-stable fields needed by BlackBox Records: locker id, locker name, address line, postal code, and country where available. Raw widget payload should not be the primary contract.
- Wire-facing protocol types should preserve official field names for request/response shapes. Host-facing widget/domain types can stay ergonomic.
- `CompartmentSize` should support small/medium/large merchant vocabulary, but map carefully to official request values.
- Server credential config belongs only in server/internal validation surfaces.
- The internal validation package should validate both request builders and inbound protocol/widget payloads.

### Do-Not-Copy Notes

- Do not copy WooCommerce order meta names such as `_boxnow_locker_id` as public toolkit names.
- Do not copy hidden localStorage/session authority. The host app owns persistence.
- Do not copy automatic order-item-to-voucher/parcel mapping. BlackBox Records can decide how many parcels to create.
- Do not copy WordPress admin UI, order status, payment, stock, fulfillment, or migration behavior.
- Do not expose framework-specific terms as public API merely because they exist in WP/Symfony.

### Gaps

- Confirm exact official widget country-host list during Widget Helper phase; WP has GR/BG/HR/CY host assumptions, but official widget docs remain authoritative.
- Confirm whether BlackBox Records will use merchant-facing `voucher` language in its UI/admin docs before making `Voucher` public.
- Live BOX NOW validation remains blocked until partner credentials exist.

## Validation Library Research

Valibot is suitable as the internal validation library for Phase 02:

- Official docs describe it as modular, type-safe, dependency-free, and runnable
  in JavaScript environments.
- It offers non-throwing validation through `safeParse`, matching the Phase 02
  decision to avoid throwing wrappers.
- Its integration guide says Valibot implements Standard Schema v1 and every
  schema exposes `~standard.validate`, which returns either `value` or `issues`.
- The same guide recommends accepting `StandardSchemaV1` for library integrations
  when Valibot-specific APIs are not required.
- Standard Schema defines a vendor-neutral `~standard` interface with typed
  input/output inference and a validation result containing `value` or `issues`.
- JSON Schema Draft 2020-12 remains useful for future portable artifacts, but it
  is too much for the first runtime validation surface.

Recommended dependencies for Phase 02:

- Runtime/internal package dependency: `valibot`
- Type/public schema interface dependency: `@standard-schema/spec`
- Do not add `@valibot/to-json-schema` in Phase 02 unless a later plan explicitly brings JSON Schema export into scope.

## Package Shape Implications

Recommended internal package name: `@coding-tree-io/boxnow-core`.

Rationale:

- `core` communicates shared internal contracts without suggesting an end-user package as strongly as `types`.
- It can hold shared Valibot schemas, Standard Schema-compatible exports, shared model types, and validation helpers/builders.
- Public packages should depend on it and curate re-exports. The internal package README/package metadata must say it is not the supported public import path.

Expected public import story remains:

- Server users: `@coding-tree-io/boxnow`
- Browser/widget users: `@coding-tree-io/boxnow-widget`
- Astro users: `@coding-tree-io/astro-boxnow`

## Planning Recommendations

1. Start with a Wave 1 audit/glossary plan before runtime code. This satisfies the `02-00` gate and prevents public names from drifting.
2. Add the internal package and dependencies before modeling types.
3. Build validation around Standard Schema-compatible schemas, with Valibot as implementation detail.
4. Implement primitives first: country/environment, compartment size, IDs, and validation result helpers.
5. Implement locker/widget/domain snapshot models separately from wire protocol models.
6. Implement delivery-request, parcel, parcel-label, auth, origin, and destination protocol shapes with protocol-first field names.
7. Add focused unit tests for every exported pure schema/helper/builder, and ensure no browser-facing package imports server credential types.

## RESEARCH COMPLETE
