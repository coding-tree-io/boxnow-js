# Requirements

## Functional Requirements

### Partner API Client

- Provide a typed server-side `createBoxNowClient(config)` entry point.
- Support OAuth client-credentials authentication via `/api/v1/auth-sessions`.
- Cache access tokens until expiry without exposing credentials.
- Support listing origins and destinations.
- Support creating delivery requests.
- Support updating officially mutable delivery-request fields only.
- Support fetching parcel labels in PDF and ZPL formats.
- Support batch label search when BOX NOW API support is confirmed in the OpenAPI/manual.
- Support canceling parcels with clear "New status only" documentation.
- Support closest-locker lookup through `/api/v2/delivery-requests:checkAddressDelivery`.
- Expose typed errors for auth, validation, not-found, rate/network, and BOX NOW error-code failures.

### Widget Helper

- Provide a browser-safe BOX NOW widget loader.
- Build widget configuration for `iframe`, `popup`, and `navigate` modes.
- Normalize widget selections into a stable `LockerSnapshot`.
- Validate expected widget origins before accepting message data.
- Never require hidden `localStorage`; state belongs to the host application.
- Emit selection and clear events in a framework-neutral way.
- Support country-specific widget hosts where officially known.

### Astro Integration

- Provide an Astro integration function exported by `@coding-tree-io/astro-boxnow`.
- Validate integration options at config time.
- Generate typed integration config using Astro's integration lifecycle.
- Provide a `BoxNowLockerPicker.astro` component.
- Work in static and SSR Astro projects.
- Avoid bundling server credentials into client assets.
- Provide documented event contracts for selected and cleared lockers.

### Docs And Examples

- Include a docs site with mocked examples that contributors can run without BOX NOW credentials.
- Include server-client examples for Node and Cloudflare Workers.
- Include an Astro checkout-like example that demonstrates widget selection without owning payment.
- Document migration concepts from the WordPress plugin without promising WooCommerce compatibility.

## Nonfunctional Requirements

- TypeScript strict mode for all packages.
- ESM-first package exports.
- Runtime support target: modern Node LTS, Cloudflare Workers-compatible fetch, and browser code where applicable.
- No mandatory runtime dependency on a specific validation library in public value shapes.
- Public API changes require a changeset and migration notes after `0.1.0`.
- Tests must run without BOX NOW credentials by default.
- Live BOX NOW tests, when added, must be opt-in and secret-gated.
- Package names, exported symbols, request fields, config keys, and event names are public contracts and require migration care.

## Public API Principles

- Prefer named objects over positional arguments for public functions.
- Use domain terms from `.planning/UBIQUITOUS_LANGUAGE.md`.
- Use `Locker`, `LockerSnapshot`, `DeliveryRequest`, `Parcel`, and `CompartmentSize` consistently.
- Do not leak raw OpenAPI naming directly when it is confusing; keep raw fields available only where needed for protocol fidelity.
- Include units in names when units can be confused, such as `weightKg` or `timeoutMs`.

## Acceptance Gates

- Unit tests cover every exported pure helper and request builder.
- Mocked HTTP tests cover every Partner API method.
- Browser tests cover widget selection, invalid origins, invalid payloads, and event emission.
- Astro fixture builds prove static and SSR compatibility.
- Docs examples compile.
- Package exports pass a consumer smoke test.
- Release workflow can publish dry-run artifacts before the first alpha.
