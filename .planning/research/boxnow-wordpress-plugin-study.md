# Research: WordPress Plugin Reference

## Source

- Plugin page: https://wordpress.org/plugins/box-now-delivery/
- Downloaded version studied: `3.2.1`
- Local study path at research time: `C:\WINDOWS\TEMP\box-now-delivery-plugin-study\box-now-delivery`

The plugin is a behavior reference, not an architecture template.

## Useful High-Level Flow

The WordPress plugin validates the same product flow this toolkit should support
as independent primitives:

1. Merchant configures BOX NOW API URL, partner id, OAuth client id/secret,
   warehouse/origin ids, voucher contact data, widget display mode, and returns
   behavior.
2. Shopper picks a locker through the BOX NOW widget.
3. WooCommerce order metadata stores the selected locker id and selected
   warehouse.
4. Admin can create vouchers with selected compartment size.
5. Admin can fetch parcel labels.
6. Admin can cancel parcel vouchers.

## Plugin Behavior Worth Keeping

- Support popup and embedded widget modes.
- Support country-specific widget hosts for BOX NOW markets.
- Treat partner API credentials as server-side configuration.
- Let operators choose compartment size manually.
- Use order notes/admin feedback around voucher creation and cancellation.
- Generate delivery requests through `/api/v1/delivery-requests`.
- Fetch labels through `/api/v1/parcels/{parcelId}/label.pdf`.
- Cancel through `/api/v1/parcels/{parcelId}:cancel`.

## Plugin Behavior To Avoid

- Do not make hidden `localStorage` the authority for checkout validity.
- Do not couple locker selection to a specific ecommerce platform.
- Do not mix checkout UI, order persistence, voucher creation, and label printing
  in one package.
- Do not persist raw widget/API payloads as the main public contract.
- Do not silently auto-pick compartment sizes unless the host application opts in.
- Do not make browser code depend on API credentials.

## Public Feedback Signals

WordPress.org reviews and changelog entries show the integration pain points:

- Some stores reported checkout completion without locker selection.
- Some stores wanted selected locker details reflected in customer/admin
  surfaces.
- Compatibility with WooCommerce HPOS was reported as an issue.
- Version `3.2.0` included security hardening for checkout, admin order updates,
  voucher actions, and thank-you locker updates.
- Version `3.2.1` included asset-versioning and admin voucher printing fixes.

These signals support the package split: selection, server client, and framework
integration should remain separate and strongly typed.

## Design Decisions From This Study

- The first Astro package should emit a selected locker and leave checkout
  blocking to the host app.
- The Partner API Client should expose voucher/label/cancel primitives, not an
  order lifecycle.
- The Widget Helper should parse and validate widget selections without forcing
  storage.
- The docs should include a "host app responsibilities" section.
