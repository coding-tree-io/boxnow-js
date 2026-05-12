# Phase 02: Core Types And Validation - Context

**Gathered:** 2026-05-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Create the first runtime TypeScript type and validation foundation without HTTP
behavior. This phase introduces pure shared contracts, validation schemas, and
validation helpers/builders that later Partner API, Widget Helper, and Astro
Integration phases can compose.

Phase 02 does not implement API transport, OAuth token fetching, widget loading,
Astro components, checkout/payment/order ownership, live BOX NOW validation, or
npm publication behavior.

</domain>

<decisions>
## Implementation Decisions

### External Audit Gate

- **D-02-01:** Phase 02 starts with a lifecycle audit of the local WordPress Plugin and `answear/boxnow-bundle`, not merely a field-name skim.
- **D-02-02:** The audit should inspect the delivery lifecycle where it exists, including settings/config, widget or pickup-point selection, delivery/voucher creation, label/status/cancel flows, and failure handling.
- **D-02-03:** Audit findings only block Phase 02 when they affect public types, validation, naming, or authority boundaries.
- **D-02-04:** The gate output is a checklist plus gaps: inspected areas, source notes, Phase 02-relevant findings, do-not-copy notes, and unresolved gaps.
- **D-02-05:** Official BOX NOW OpenAPI/manual/widget docs and accepted ADRs remain authoritative. Ecosystem conflicts are recorded as named gaps or do-not-copy notes.
- **D-02-06:** Implement only what the `blackbox-records` project needs to start with as the MVP demand filter.
- **D-02-07:** Do not implement WooCommerce/Symfony commerce ownership, admin flows, stock, fulfillment, payment, order persistence, or migration compatibility in Phase 02.

### Type Ownership

- **D-02-08:** Introduce a separate internal workspace package for shared contracts instead of making `@coding-tree-io/boxnow` the owner of all shared types.
- **D-02-09:** The shared package is internal to the monorepo. It is not documented as an end-user import.
- **D-02-10:** The internal package owns shared primitives, shared domain models, and pure reusable validators/builders.
- **D-02-11:** Public packages expose only curated re-exports that belong to their user-facing contracts.
- **D-02-12:** Internal validation plumbing and helper-only types should stay private unless a later phase proves they belong in a public contract.

### Validation Shape

- **D-02-13:** Primary validation APIs return result objects rather than throwing.
- **D-02-14:** Phase 02 does not add throwing convenience wrappers.
- **D-02-15:** Use Valibot internally for runtime validation to avoid hand-rolling schema validation.
- **D-02-16:** Where validation schemas are exposed publicly, make that surface Standard Schema-shaped rather than Valibot-native.
- **D-02-17:** JSON Schema export is deferred until docs, tooling, or external consumers need portable schema artifacts.
- **D-02-18:** Keep the validation surface intentionally small. Less is more for the first public contract.

### Domain vs Protocol Names

- **D-02-19:** Wire-facing request/response types should be protocol-first when BOX NOW official fields are the shape consumers are building or reading.
- **D-02-20:** Domain/widget snapshot types stay ergonomic where they are not direct wire shapes.
- **D-02-21:** Raw protocol fields live in wire/protocol schema types and mappers, not everywhere by default.
- **D-02-22:** Protocol or ecosystem terms such as `voucher` may become public when official docs or the lifecycle audit show they are the practical integration term.
- **D-02-23:** If a protocol or ecosystem term becomes public, update `.planning/UBIQUITOUS_LANGUAGE.md` before implementation to explain the term, aliases, and relationship to existing concepts.
- **D-02-24:** Avoid synonym sprawl. Ecosystem terminology can win only when it improves practical integration clarity.

### the agent's Discretion

- The planner may choose the internal package name, as long as it is clearly internal and not presented as an end-user package.
- The planner may choose the exact result object property names after checking Standard Schema and Valibot conventions, provided the surface stays small and non-throwing.
- The planner may choose how to organize schema files versus model files inside the internal package.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Source Of Truth

- `.planning/PROJECT.md` - project purpose, package topology, non-goals, source material links, current Phase 02 external audit gate.
- `.planning/REQUIREMENTS.md` - functional and nonfunctional requirements, public API principles, and acceptance gates.
- `.planning/ROADMAP.md` - Phase 02 task list, including the external audit gate.
- `.planning/STATE.md` - current focus, blockers, validation evidence, and next-task notes.
- `.planning/UBIQUITOUS_LANGUAGE.md` - canonical terms, public-contract/protocol boundary, and naming source precedence.
- `.planning/public-api-sketch.md` - initial package entry points, method namespaces, events, and compatibility candidates.

### Prior Phase Context

- `.planning/phases/00-project-foundation/00-CONTEXT.md` - Phase 00 decisions on workspace tooling, ESM-first setup, lean validation, and no placeholder runtime exports.
- `.planning/phases/01-research-and-public-contract/01-CONTEXT.md` - Phase 01 decisions on source precedence, package topology, secret boundaries, widget contract, and public API sketch depth.

### Research And ADRs

- `.planning/research/boxnow-official-api.md` - official Partner API research, source hierarchy, and protocol gaps.
- `.planning/research/boxnow-widget.md` - widget behavior and Astro integration research.
- `.planning/research/boxnow-wordpress-plugin-study.md` - targeted WordPress Plugin behavior study to expand during the Phase 02 audit gate.
- `.planning/research/boxnow-symfony-bundle-study.md` - targeted Symfony bundle ecosystem study to expand during the Phase 02 audit gate.
- `.planning/adrs/ADR-001-package-topology.md` - accepted package split and consequences.
- `.planning/adrs/ADR-002-secret-boundaries.md` - Server Credentials and Browser-Safe Config boundary.
- `.planning/adrs/ADR-003-widget-contract.md` - LockerSnapshot and widget event boundary.
- `.planning/adrs/ADR-004-astro-integration-scope.md` - Astro Integration scope and route ownership boundary.

### External Standards And Libraries

- `https://valibot.dev/guides/introduction/` - Valibot as the internal validation-library candidate.
- `https://valibot.dev/guides/integrate-valibot/` - Standard Schema interoperability guidance.
- `https://json-schema.org/draft/2020-12` - future portable JSON Schema artifact reference.
- `https://github.com/standard-schema/standard-schema` - Standard Schema specification reference for public schema-shaped validation contracts.

### Local-Only Research Source

- `.planning/research/_local-sources/box-now-delivery-WP` - ignored local WordPress Plugin source. Inspect it for lifecycle audit findings; do not commit copied plugin source or copied examples.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- No runtime source code exists yet.
- Package README stubs already define the three public package surfaces.
- Root scripts already provide `pnpm check`, `pnpm test`, and `pnpm build`.

### Established Patterns

- The repository is ESM-first and uses Node 24, pnpm 10.33.2, TypeScript, Biome, Vitest, tsdown, and Changesets metadata.
- The workspace currently targets `packages/*` and `examples/*`.
- Prior phases deliberately avoided placeholder exports and behavior claims before implementation.
- Planning docs under `.planning/` are the source of truth for public naming and scope.

### Integration Points

- Phase 02 may add a new internal workspace package for shared validation and contracts.
- Public packages should curate re-exports from the internal package instead of exposing it wholesale.
- The lifecycle audit gate should update research artifacts or create a Phase 02 audit artifact before public type implementation starts.
- Any public protocol/ecosystem term that wins over a previous glossary term must update `.planning/UBIQUITOUS_LANGUAGE.md` before code lands.

</code_context>

<specifics>
## Specific Ideas

- The first implementation target is the minimum BOX NOW toolkit surface needed by `blackbox-records`.
- Phase 02 should use Valibot internally but avoid making Valibot-native errors or schemas the public contract.
- Standard Schema compatibility is in scope now; JSON Schema export is useful later but not part of the initial minimal surface.
- Wire-facing BOX NOW request/response types can mirror official protocol field names more directly than host-facing domain types.
- Terms like `voucher` are not forbidden if the audit proves they are the practical term users or BOX NOW merchant flows expect.

</specifics>

<deferred>
## Deferred Ideas

- JSON Schema export for docs, tooling, or external consumers is deferred until a later phase needs it.
- Throwing validation wrappers are deferred until real consumer ergonomics prove they are needed.
- WordPress/Symfony migration guides and framework-specific compatibility promises remain out of scope.
- Live BOX NOW behavior validation remains deferred until sandbox/partner credentials are available.

</deferred>

---

*Phase: 02-core-types-and-validation*
*Context gathered: 2026-05-12*
