# Research: Official BOX NOW API And Widget

## Sources

- Partner API entry point: https://boxnow.gr/en/hidden/Partner-API-EN
- API manual PDF: https://boxnow.gr/media/hidden/BoxNow%20API%20Manual%20%28v.7.2%29.pdf
- OpenAPI YAML: https://boxnow.gr/media/hidden/partner-api-1.68.yaml
- Widget developer page: https://widget-v5.boxnow.gr/devs
- Astro Integration API: https://docs.astro.build/en/reference/integrations-reference/

## Setup Requirements

BOX NOW requires partner onboarding before API use. The API manual says partners
receive:

- OAuth client id
- OAuth client secret
- API base URL

Those values are server credentials. They must not appear in browser code,
Astro public env vars, docs examples, CI logs, committed fixtures, or generated
client bundles.

## Partner API Shape

Known API surface from official manual/OpenAPI:

- `POST /api/v1/auth-sessions`: OAuth client-credentials auth.
- `GET /api/v1/origins`: pickup locations, commonly warehouses or any-APM.
- `GET /api/v1/destinations`: APM destination lockers.
- `POST /api/v1/delivery-requests`: create delivery requests and parcels.
- `PUT /api/v1/delivery-requests/{id}`: modify limited delivery request fields.
- `GET /api/v1/parcels/{id}/label.pdf`: fetch PDF label.
- `GET /api/v1/parcels/{id}/label.zpl`: fetch ZPL label when supported.
- `POST /api/v1/labels:search`: fetch multiple labels when supported.
- `POST /api/v1/parcels/{id}:cancel`: cancel parcel label while parcel is new.
- `POST /api/v2/delivery-requests:checkAddressDelivery`: closest-locker lookup.

The OpenAPI YAML is version `1.68` and should be the preferred protocol fixture
when manual and website snippets disagree.

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

## Widget Shape

The official widget page documents:

- CDN script: `https://widget-cdn.boxnow.gr/map-widget/client/v5.js`
- Global config: `_bn_map_widget_config`
- Required `parentElement`
- Required `afterSelect` for iframe and popup modes
- Optional `partnerId`
- Optional `type`: `iframe`, `popup`, or `navigate`
- Optional `gps`
- Optional `autoclose`
- Optional `autoselect`
- Optional `buttonSelector`
- Optional `zip`

The widget selection includes raw fields such as:

- `boxnowLockerId`
- `boxnowLockerAddressLine1`
- `boxnowLockerPostalCode`
- `boxnowLockerName`

The widget helper should normalize those fields and avoid exposing raw payloads
as the primary public contract.

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
