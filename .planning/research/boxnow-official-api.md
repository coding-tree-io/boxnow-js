# Research: Official BOX NOW Partner API

## Sources

- Partner API entry point: https://boxnow.gr/en/hidden/Partner-API-EN
- API manual PDF: https://boxnow.gr/media/hidden/BoxNow%20API%20Manual%20%28v.7.2%29.pdf
- OpenAPI YAML: https://boxnow.gr/media/hidden/partner-api-1.68.yaml

## Source Status

- Checked on 2026-05-12.
- Partner API entry point links to the manual, webhook tracking guide, swagger,
  and API documentation.
- OpenAPI version is `1.68`, with a 2025-03-03 revision note for delivery
  request parcel weight description.
- Manual version is `v7.2`.
- OpenAPI is the protocol source of truth for request and response shape.
- Manual text explains semantics and operational intent when the OpenAPI shape
  is terse.

## Setup Requirements

BOX NOW requires partner onboarding before API use. The API manual says partners
receive:

- OAuth client id
- OAuth client secret
- API base URL

Those values are server credentials. They must not appear in browser code,
Astro public env vars, docs examples, CI logs, committed fixtures, or generated
client bundles.

Sandbox and production base URLs are partner-provided. Public examples should
use placeholder environment variable names and must not imply that a public
base URL is safe to hard-code.

## Partner API Shape

Known API surface from official manual/OpenAPI:

- `POST /api/v1/auth-sessions`: OAuth client-credentials auth.
- `GET /api/v1/origins`: pickup locations, commonly warehouses or any-APM.
- `GET /api/v1/destinations`: APM destination lockers.
- `POST /api/v1/delivery-requests`: create delivery requests and parcels.
- `PUT /api/v1/delivery-requests/{id}`: modify limited delivery request fields.
- `GET /api/v1/parcels`: list or search accessible parcels where allowed.
- `GET /api/v1/parcels/{id}/label.pdf`: fetch PDF label.
- `GET /api/v1/parcels/{id}/label.zpl`: fetch ZPL label when supported.
- `POST /api/v1/labels:search`: fetch multiple labels when supported.
- `POST /api/v1/parcels/{id}:cancel`: cancel parcel label while parcel is new.
- `POST /api/v2/delivery-requests:checkAddressDelivery`: closest-locker lookup.

The OpenAPI YAML is version `1.68` and should be the preferred protocol fixture
when manual and website snippets disagree.

## Authentication Contract

The public client should expose a single server-side factory that accepts Server
Credentials and a fetch-compatible transport seam. Internally, the first
implementation must:

- call `/api/v1/auth-sessions` with `client_credentials`
- cache the returned bearer token until expiry
- attach the bearer token to Partner API requests
- map 401/403 responses into typed auth/permission errors

Token cache behavior is a server-side concern. Browser packages and Astro
client assets must never import or serialize the OAuth client secret.

## Delivery Request Semantics

The API manual is explicit that delivery-request `items` represent parcels, not
commerce product lines. This project must keep that distinction in names and
docs.

Important fields to support:

- `orderNumber`
- `invoiceValue`
- `paymentMode`
- `amountToBeCollected`
- `notifyOnAccepted`
- `origin.contactNumber`
- `origin.contactEmail`
- `origin.contactName`
- `origin.locationId`
- `destination.contactNumber`
- `destination.contactEmail`
- `destination.contactName`
- `destination.locationId`
- `items[].value`
- `items[].weight`
- `items[].compartmentSize`

Public request builders should use Domain Terms where they clarify intent, such
as `weightKg` and `CompartmentSize`, while preserving Protocol Fields through a
Raw Escape Hatch when exact OpenAPI fidelity is required.

## Compartment Sizes

BOX NOW compartment size codes:

- Small: `1`
- Medium: `2`
- Large: `3`

The WordPress plugin currently uses these dimension constants:

- Length: `60 cm`
- Width: `45 cm`
- Small height: `8 cm`
- Medium height: `17 cm`
- Large height: `36 cm`

Do not make automatic compartment calculation the default behavior. Consumers
should choose the size or explicitly opt into helper logic.

## Error And Gap Notes

- The OpenAPI/manual error-code list is broad. The initial client should map at
  least auth, validation, not-found/permission, rate/network, and BOX NOW
  protocol-code failures.
- Parcel cancellation is not a generic order-cancel operation. It is constrained
  by parcel state and should be named around Parcel cancellation.
- `labels:search` and batch label behavior need fixture-backed confirmation
  before the public API promises a rich query helper.
- Live behavior remains unverified until BOX NOW sandbox/partner credentials are
  available.

## Research Decisions

- Use official OpenAPI/manual as the protocol source of truth.
- Keep server client and browser widget packages separate.
- Make live BOX NOW tests opt-in because credentials are external.
- Preserve protocol fidelity behind explicit escape hatches, not as the default
  naming style.

## Research Gaps

- Confirm whether `/api/v1/labels:search` should be a first-class helper or a
  lower-level protocol method in the first alpha.
- Confirm the current OpenAPI response shape for `parcels` and delivery request
  label URLs before implementing typed response models.
- Confirm live sandbox behavior for token expiry and retry timing.
- Confirm if `X-PartnerID` must be surfaced in public config for partners with
  multiple entrusted partners.

## Astro Integration Notes

Astro integrations expose lifecycle hooks such as `astro:config:setup`. Current
docs include support for:

- `updateConfig`
- `injectScript`
- `injectRoute`
- `createCodegenDir`
- `addMiddleware`
- `addWatchFile`

The Astro package should use the smallest necessary hook surface. For initial
scope, generated typed config plus a component package is preferable to hidden
route ownership.

## Research Decisions

- Use official OpenAPI/manual as the protocol source of truth.
- Keep server client and browser widget packages separate.
- Keep Astro integration thin and explicit.
- Make live BOX NOW tests opt-in because credentials are external.
