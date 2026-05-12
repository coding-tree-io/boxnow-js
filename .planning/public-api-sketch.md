# Public API Sketch

**Status:** Initial Phase 01 contract skeleton. Not an implementation plan.

This sketch names compatibility candidates and package boundaries before runtime
code exists. It should guide Phase 02-05 planning without locking every protocol
field.

## Naming Rules

- Public Contracts use Domain Terms from `.planning/UBIQUITOUS_LANGUAGE.md`.
- OpenAPI/manual names define Protocol Shapes and Protocol Fields.
- Protocol Fields appear in Raw Escape Hatches only when fidelity requires it.
- Package names, factories, method namespaces, event names, and glossary-backed
  domain type names require explicit review before changing.

## `@coding-tree-io/boxnow`

Server-side Partner API Client and shared domain types.

Compatibility candidates:

- `createBoxNowClient(config)`
- `BoxNowClient`
- `BoxNowEnvironment`
- `BoxNowClientConfig`
- `TransportAdapter`
- `BoxNowError`
- `BoxNowAuthError`
- `BoxNowValidationError`
- `BoxNowProtocolError`
- `CompartmentSize`
- `Origin`
- `Destination`
- `Locker`
- `DeliveryRequest`
- `Parcel`
- `ParcelLabelFormat`

Initial method namespaces:

- `client.origins.list(options?)`
- `client.destinations.list(options?)`
- `client.deliveryRequests.create(input)`
- `client.deliveryRequests.update(id, input)`
- `client.deliveryRequests.checkAddressDelivery(input)`
- `client.parcels.getLabel(id, options)`
- `client.parcels.cancel(id)`
- `client.labels.search(input)`

Server config skeleton:

```ts
type BoxNowClientConfig = {
  baseUrl: string;
  clientId: string;
  clientSecret: string;
  fetch?: TransportAdapter;
};
```

Out of scope for this package:

- checkout ownership
- order persistence
- browser widget loading
- Astro config generation
- automatic product-line to Parcel mapping

## `@coding-tree-io/boxnow-widget`

Browser-safe Widget Helper for BOX NOW Locker Selection.

Compatibility candidates:

- `createBoxNowWidget(config)`
- `BoxNowWidget`
- `BoxNowWidgetConfig`
- `BoxNowWidgetMode`
- `BoxNowCountryCode`
- `LockerSnapshot`
- `LockerSelectionEvent`
- `LockerClearEvent`

Initial events:

- `locker:selected`
- `locker:cleared`

Widget config skeleton:

```ts
type BoxNowWidgetConfig = {
  partnerId?: string;
  parentElement: string | HTMLElement;
  mode?: "iframe" | "popup" | "navigate";
  country?: BoxNowCountryCode;
  gps?: boolean;
  zip?: string;
  acceptedOrigins?: string[];
};
```

`LockerSnapshot` should include the stable host-facing locker fields needed by
checkout state. Raw widget payload access, if present, must be explicit and
secondary.

Out of scope for this package:

- hidden storage authority
- checkout blocking
- order persistence
- Server Credentials

## `@coding-tree-io/astro-boxnow`

Astro Integration that composes the Widget Helper.

Compatibility candidates:

- default export `boxnow(options)`
- `BoxNowAstroOptions`
- `BoxNowLockerPicker.astro`
- selected/cleared DOM event names

Astro options skeleton:

```ts
type BoxNowAstroOptions = {
  partnerId?: string;
  country?: BoxNowCountryCode;
  mode?: "iframe" | "popup" | "navigate";
  gps?: boolean;
  acceptedOrigins?: string[];
};
```

Component/event skeleton:

```astro
---
import { BoxNowLockerPicker } from "@coding-tree-io/astro-boxnow/components";
---

<BoxNowLockerPicker />
```

DOM events:

- `boxnow:locker-selected`
- `boxnow:locker-cleared`

Out of scope for this package:

- checkout routes
- payment routes
- webhooks
- delivery request creation
- Server Credential access from browser-facing config

## Review Notes For Later Phases

- Phase 02 should refine type names before implementation.
- Phase 03 should validate endpoint method names against OpenAPI fixtures.
- Phase 04 should prove widget origin and payload validation in browser tests.
- Phase 05 should prove static and SSR Astro fixture builds.
- Examples may be adjusted by planners as long as the named contract skeleton
  remains coherent.
