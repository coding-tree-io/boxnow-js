# Ubiquitous Language

## Product Surface

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **BOX NOW Toolkit** | The full open-source repository containing the client, widget helpers, Astro integration, docs, and examples. | plugin, ecommerce app |
| **Partner API Client** | Server-side TypeScript client for authenticated BOX NOW Partner API calls. | SDK, service, adapter |
| **Widget Helper** | Browser-safe package that loads/configures the BOX NOW map widget and normalizes locker selection. | picker service, frontend SDK |
| **Astro Integration** | Astro package that wires widget helpers and typed configuration into Astro projects. | Astro plugin, adapter |
| **Docs Playground** | Example Astro app that demonstrates the packages with mocks and documented setup flows. | demo app, sample checkout |

## BOX NOW Domain

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Locker** | A BOX NOW APM destination selected by a shopper or returned by the destinations API. | box, pickup point |
| **Locker Selection** | Browser event/value representing the shopper's chosen BOX NOW Locker. | raw widget payload |
| **Locker Snapshot** | Minimal normalized locker data passed to the host application. | locker response, widget data |
| **Origin** | BOX NOW pickup location such as a warehouse or any-APM origin. | warehouse when not always true |
| **Destination** | BOX NOW delivery location, normally an APM locker. | shipping address |
| **Delivery Request** | BOX NOW API request that creates one or more parcel vouchers. | order, shipment |
| **Parcel** | BOX NOW delivery unit created from one delivery-request item. | product, line item |
| **Parcel Label** | PDF or ZPL label fetched for a BOX NOW parcel. | voucher PDF |
| **Compartment Size** | BOX NOW parcel size code: small `1`, medium `2`, or large `3`. | package tier |
| **Any APM** | BOX NOW origin mode with location id `2` for locker-origin flows. | any locker |

## Security And Authority

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Server Credential** | OAuth client id, OAuth client secret, or API base URL that belongs only in server runtime configuration. | public env, widget config |
| **Browser-Safe Config** | Non-secret widget configuration such as partner id, country, mode, GPS flag, and ZIP hint. | client credentials |
| **Host Application** | Consumer app that owns checkout, payment, order persistence, and operational workflow. | this library |
| **Normalized Selection** | Validated locker selection emitted by the widget helper. | trusted selection |
| **Transport Adapter** | Fetch-compatible seam used by the Partner API Client for runtimes and tests. | HTTP helper |

## Public Contract And Protocol

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Public Contract** (new) | Exported package names, factories, method namespaces, config keys, event names, and domain type names that consumers may depend on. | sketch, internal API |
| **Domain Term** (new) | Glossary-approved name used in public APIs, docs, examples, and ADRs. | friendly alias, marketing name |
| **Protocol Shape** (new) | BOX NOW request or response structure as documented by the official OpenAPI/manual sources. | public API shape |
| **Protocol Field** (new) | BOX NOW field name preserved because wire-level fidelity or official documentation requires it. | domain name, raw field |
| **Raw Escape Hatch** (new) | Explicit public surface that exposes protocol data when lossless mapping is necessary. | primary model, trusted data |

## Relationships

- A **Host Application** may use the **Astro Integration**, **Widget Helper**, and **Partner API Client** independently.
- The **Widget Helper** produces a **Normalized Selection** from browser widget data.
- A **Delivery Request** contains one or more parcel items, and each item creates one **Parcel**.
- A **Parcel Label** belongs to exactly one **Parcel** unless labels are fetched in a batch PDF.
- A **Server Credential** must never be part of **Browser-Safe Config**.
- A **Locker Snapshot** is host-facing data; it is not proof that the **Host Application** may skip server-side validation.
- A **Public Contract** should use **Domain Terms** by default.
- A **Protocol Field** may appear in a **Raw Escape Hatch** only when **Protocol Shape** fidelity is required.

## Naming Source Precedence (new)

1. Official BOX NOW documentation establishes canonical BOX NOW terms when the term is clear and safe for public use.
2. Official OpenAPI/manual names define **Protocol Shapes** and **Protocol Fields**, but do not automatically become **Public Contract** names.
3. Official widget documentation defines browser widget behavior terms for the **Widget Helper** and **Astro Integration**.
4. Existing ecosystem terms, including the WordPress Plugin and Symfony bundle references, are secondary evidence for merchant/developer vocabulary, aliases to avoid, and future context.
5. Toolkit authority boundaries can override familiar ecosystem terms when a term would imply checkout, payment, order persistence, stock, fulfillment, framework ownership, or credential ownership.

## Example Dialogue

> **Dev:** "Can the Astro Integration create the delivery request after the shopper picks a Locker?"
> **Domain expert:** "No. The Astro Integration can emit a Locker Selection, but the Host Application owns checkout and server-side delivery creation."
> **Dev:** "So the Partner API Client needs Server Credentials, but the Widget Helper only receives Browser-Safe Config?"
> **Domain expert:** "Exactly. The browser can know the partner id, but not OAuth client secrets."
> **Dev:** "Should the Public Contract mirror every Protocol Field from the OpenAPI file?"
> **Domain expert:** "No. Use Domain Terms first, and add a Raw Escape Hatch only when the Protocol Shape must be preserved."
> **Dev:** "And one order line does not automatically equal one Parcel?"
> **Domain expert:** "Correct. A Delivery Request item represents a parcel, not a product line."

## Flagged Ambiguities

- "Plugin" can mean WordPress plugin or Astro integration. Use **Astro Integration** for the Astro package and **WordPress Plugin** only for the researched reference implementation.
- "Voucher" is used by the WordPress plugin and partner portal. Use **Parcel** for API-created delivery units and **Parcel Label** for printable output.
- "Order" belongs to the **Host Application**, not this toolkit. Use **Delivery Request** for BOX NOW API creation.
- "SDK" is broad. Use **Partner API Client**, **Widget Helper**, or **Astro Integration** depending on the package.
- "Raw" can mean an unvalidated browser payload or an official BOX NOW wire field. Use **Protocol Field** for documented wire names and **Raw Escape Hatch** for intentional public exposure.
- "API shape" can mean the **Public Contract** or the **Protocol Shape**. Use the precise term before making naming decisions.
- WordPress Plugin and Symfony bundle vocabulary may describe useful merchant/developer habits, but it must not import framework ownership terms into this toolkit's **Public Contract**.
