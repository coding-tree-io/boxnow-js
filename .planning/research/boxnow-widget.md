# Research: BOX NOW Widget And Astro Integration Surface

## Sources

- Widget developer page: https://widget-v5.boxnow.gr/devs
- Astro Integration API: https://docs.astro.build/en/reference/integrations-reference/
- WordPress Plugin local source: `.planning/research/_local-sources/box-now-delivery-WP`

## Source Status

- Checked on 2026-05-12.
- Widget docs own browser widget behavior.
- Astro docs own integration lifecycle terminology.
- WordPress Plugin behavior is secondary ecosystem evidence only.

## Widget Shape

The official widget page documents:

- CDN script: `https://widget-cdn.boxnow.gr/map-widget/client/v5.js`
- global config: `_bn_map_widget_config`
- required `parentElement`
- required `afterSelect` for `iframe` and `popup`
- optional `partnerId`
- optional `type`: `iframe`, `popup`, or `navigate`
- optional `gps`
- optional `autoclose`
- optional `autoselect`
- optional `buttonSelector`
- optional `zip`

The widget selection includes Protocol Fields such as:

- `boxnowLockerId`
- `boxnowLockerAddressLine1`
- `boxnowLockerPostalCode`
- `boxnowLockerName`

The Widget Helper should normalize those fields into a `LockerSnapshot` and
avoid exposing raw widget payloads as the primary Public Contract.

## Country Host Behavior

The WordPress Plugin uses different widget hosts for Greece, Cyprus, Bulgaria,
and Croatia in its browser scripts. This is useful ecosystem evidence that the
Widget Helper should model country-specific widget hosts, but official widget
docs and live verification should confirm the final host matrix.

## Storage And Authority

The WordPress Plugin uses browser storage and WooCommerce session/order metadata
to bridge checkout and post-payment flows. The toolkit should not copy this
authority model:

- no hidden `localStorage` authority by default
- no checkout blocking inside the Widget Helper
- no order persistence inside the Widget Helper or Astro Integration
- no raw widget payload persistence contract

The Widget Helper emits selection and clear events. The Host Application decides
whether and where to persist the `LockerSnapshot`.

## Astro Integration Notes

Astro integrations expose lifecycle hooks including `astro:config:setup`, with
helpers such as `updateConfig`, `injectScript`, `injectRoute`, and
`createCodegenDir`.

Initial Astro Integration scope:

- validate browser-safe integration options
- generate typed browser-safe config when useful
- expose `BoxNowLockerPicker.astro`
- document selected/cleared DOM events
- work in static and SSR Astro projects

Out of scope:

- checkout routes
- payment routes
- order persistence
- webhooks
- server-side delivery request creation
- Server Credential serialization into client assets

## Research Decisions

- Widget docs own browser widget behavior.
- WordPress Plugin browser behavior can reveal integration pain points, but not
  public API authority.
- Keep the Astro Integration thin and explicit.
- Prefer generated browser-safe config and a component over hidden route or
  middleware ownership.

## Research Gaps

- Confirm the authoritative country-to-widget-host mapping.
- Confirm whether `navigate` mode returns a selection or only redirects the user.
- Confirm exact postMessage/origin behavior before implementing hostile-message
  browser tests.
- Confirm whether `autoclose` and `autoselect` constraints differ by widget host
  or country.
