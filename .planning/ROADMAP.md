# Roadmap

This roadmap splits work into the smallest independently reviewable tasks.
Each task should be one PR or one focused commit.

## Phase 00: Project Foundation

Goal: make the repository safe to build in without implementing BOX NOW behavior.

- [x] 00-01 Create public GitHub repository under `coding-tree-io`.
- [x] 00-02 Add package manager and TypeScript workspace skeleton.
- [x] 00-03 Add formatting, linting, typecheck, unit-test, and build scripts.
- [x] 00-04 Add Changesets and release workflow skeleton.
- [x] 00-05 Add contributor, security, and package support policy docs.
- [x] 00-06 Add first CI workflow for install, check, test, and build.
- [x] 00-07 Add root `AGENTS.md` for repo-specific source-of-truth rules.
- [x] 00-08 Verify the empty workspace on Windows and CI.

## Phase 01: Research And Public Contract

Goal: lock terminology, source material, and public API boundaries before code.

- [x] 01-01 Capture official BOX NOW API research.
- [x] 01-02 Capture BOX NOW widget research.
- [x] 01-03 Capture WordPress plugin and Symfony bundle behavior and failure-mode research.
- [x] 01-04 Decide package topology ADR.
- [x] 01-05 Decide secret-boundary ADR.
- [x] 01-06 Decide widget-contract ADR.
- [x] 01-07 Decide Astro integration scope ADR.
- [x] 01-08 Draft initial public API sketch.
- [x] 01-09 Review public names against the glossary.
- [x] 01-10 Add package README stubs with non-goals.

## Phase 02: Core Types And Validation

Goal: create shared types and pure validation without HTTP.

- [x] 02-00 Complete the external library audit gate before locking Phase 02 public names or validation contracts: full-enough source audit of the local WordPress Plugin and `answear/boxnow-bundle`, with official BOX NOW OpenAPI/widget docs kept as higher precedence.
- [x] 02-01 Add internal package `@coding-tree-io/boxnow-core`.
- [x] 02-02 Add `Environment`, `CountryCode`, and endpoint config types.
- [x] 02-03 Add `CompartmentSize` enum and dimension constants.
- [x] 02-04 Add `Locker`, `Origin`, and `Destination` types.
- [x] 02-05 Add `LockerSnapshot` normalization contract.
- [x] 02-06 Add `DeliveryRequest` input types.
- [x] 02-07 Add `Parcel`, `ParcelLabelFormat`, and label option types.
- [x] 02-08 Add protocol response types for auth, locations, delivery requests, and parcels.
- [x] 02-09 Add validation helpers for public request builders.
- [ ] 02-10 Add tests for all pure validation helpers.

## Phase 03: Partner API Client

Goal: implement server-side BOX NOW API access behind a fetch seam.

- [ ] 03-01 Add `TransportAdapter` and mock transport.
- [ ] 03-02 Implement client factory and config validation.
- [ ] 03-03 Implement OAuth client-credentials request.
- [ ] 03-04 Implement token cache and expiry handling.
- [ ] 03-05 Implement authenticated request helper.
- [ ] 03-06 Implement `origins.list`.
- [ ] 03-07 Implement `destinations.list`.
- [ ] 03-08 Implement `deliveryRequests.create`.
- [ ] 03-09 Implement `deliveryRequests.update`.
- [ ] 03-10 Implement `parcels.getLabel`.
- [ ] 03-11 Implement `labels.search`.
- [ ] 03-12 Implement `parcels.cancel`.
- [ ] 03-13 Implement `deliveryRequests.checkAddressDelivery`.
- [ ] 03-14 Add typed error mapping.
- [ ] 03-15 Add request/response fixture tests for every endpoint.

## Phase 04: Widget Helper

Goal: make browser locker selection safe and framework-neutral.

- [ ] 04-01 Add package `@coding-tree-io/boxnow-widget`.
- [ ] 04-02 Add widget config type and validation.
- [ ] 04-03 Add widget script URL and popup URL builders.
- [ ] 04-04 Add script loader with idempotent loading.
- [ ] 04-05 Add popup and iframe mode helpers.
- [ ] 04-06 Add widget selection parser.
- [ ] 04-07 Add accepted-origin guard.
- [ ] 04-08 Add event emitter for selected and cleared lockers.
- [ ] 04-09 Add no-storage default and optional host-provided storage adapter.
- [ ] 04-10 Add browser tests for happy path and hostile messages.

## Phase 05: Astro Integration

Goal: expose the widget helper through a clean Astro API.

- [ ] 05-01 Add package `@coding-tree-io/astro-boxnow`.
- [ ] 05-02 Add integration option schema.
- [ ] 05-03 Add Astro integration factory.
- [ ] 05-04 Add generated typed config module.
- [ ] 05-05 Add `BoxNowLockerPicker.astro`.
- [ ] 05-06 Add selected/cleared DOM event contract.
- [ ] 05-07 Add static Astro fixture.
- [ ] 05-08 Add SSR Astro fixture.
- [ ] 05-09 Add Astro build tests for both fixtures.
- [ ] 05-10 Add docs for using the component in checkout flows.

## Phase 06: Docs, Examples, And Migration Guide

Goal: make the project usable by external contributors and consumers.

- [ ] 06-01 Add Astro docs app.
- [ ] 06-02 Add package API reference pages.
- [ ] 06-03 Add server client quickstart.
- [ ] 06-04 Add widget quickstart.
- [ ] 06-05 Add Astro quickstart.
- [ ] 06-06 Add Cloudflare Worker example.
- [ ] 06-07 Add Node example.
- [ ] 06-08 Add WordPress plugin concept migration guide.
- [ ] 06-09 Add security and secrets guide.
- [ ] 06-10 Add troubleshooting guide.

## Phase 07: Release Hardening

Goal: publish a credible alpha and prepare for real integration feedback.

- [ ] 07-01 Add package export smoke tests.
- [ ] 07-02 Add API extractor or typedoc output.
- [ ] 07-03 Add bundle-size and dependency audit checks.
- [ ] 07-04 Add provenance-ready npm publish workflow.
- [ ] 07-05 Add dry-run release evidence.
- [ ] 07-06 Publish `0.1.0-alpha.0`.
- [ ] 07-07 Dogfood the alpha in a real Astro branch.
- [ ] 07-08 Record post-alpha issues and stabilize `0.1.0`.

## Deferred Gates

- BOX NOW live sandbox validation requires partner credentials.
- npm publication requires `@coding-tree-io` npm scope access.
- Any official-branding claim requires explicit BOX NOW approval.
