# Phase 01: Research And Public Contract - Context

**Gathered:** 2026-05-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Turn the official BOX NOW material, WordPress plugin study, Astro integration
docs, and existing glossary into explicit research notes, ADRs, and a first
public contract skeleton before runtime implementation starts.

This phase locks research/source boundaries and reviewable public API direction.
It does not implement the Partner API Client, browser widget loader, Astro
component, package exports, live credential validation, or npm publishing.

</domain>

<decisions>
## Implementation Decisions

### Existing Decisions

- **D-01-01:** Official BOX NOW OpenAPI/manual are protocol sources of truth.
- **D-01-02:** The WordPress Plugin is a behavior reference only.
- **D-01-03:** Public API names must follow `.planning/UBIQUITOUS_LANGUAGE.md`.
- **D-01-04:** Server Credentials and Browser-Safe Config are distinct concepts.
- **D-01-05:** The Astro Integration composes the Widget Helper and does not own checkout.

### Research Evidence Shape

- **D-01-06:** Phase 01 should commit detailed, paraphrased extraction rather than raw source snapshots.
- **D-01-07:** Research should be organized as source-first files under `.planning/research/`, with ADRs citing those files.
- **D-01-08:** The local WordPress Plugin source lives at `.planning/research/_local-sources/box-now-delivery-WP` and is excluded through `.git/info/exclude`; it is for investigation only.
- **D-01-09:** Inspect the WordPress Plugin only where relevant to settings, API calls, widget behavior, status/failure handling, and checkout integration.
- **D-01-10:** Committed artifacts must stay paraphrased and source-neutral. Richer excerpts may exist only in local notes and must not be committed.

### Official-Source Conflict Policy

- **D-01-11:** For Partner API protocol shape, OpenAPI wins for request/response shape, the manual explains semantics, and widget docs own browser widget behavior.
- **D-01-12:** Every unresolved contradiction or missing source detail becomes a named research gap with source refs, current assumption, and validation path.
- **D-01-13:** WordPress Plugin behavior cannot override official BOX NOW OpenAPI, manual, or widget documentation.
- **D-01-14:** Without BOX NOW live credentials, design against documented contracts and mocked fixtures, then mark live behavior as future validation work.

### Public API Sketch Depth

- **D-01-15:** The public API sketch should lock a named contract skeleton: package entry points, method namespaces, major config objects, events, and key domain type names.
- **D-01-16:** Do not exhaustively lock endpoint fields in Phase 01 unless research proves a field is central to the contract.
- **D-01-17:** Package names, factories, method namespaces, event names, and glossary-backed domain type names are compatibility candidates and require explicit review before changing.
- **D-01-18:** Public Contracts use Domain Terms first; Raw Escape Hatches expose Protocol Fields only when Protocol Shape fidelity requires it.

### WordPress Reference Boundary

- **D-01-19:** Valuable WordPress Plugin input is limited to integration behavior: settings model, checkout placement, widget configuration, API usage, status/failure handling, and merchant-facing edge cases.
- **D-01-20:** Reject checkout ownership, order persistence, payment/stock assumptions, admin workflows, hidden storage authority, and WooCommerce-specific responsibility as toolkit responsibilities.
- **D-01-21:** Do not create a WordPress migration guide in this phase. Treat the plugin as a research source, not a compatibility target.
- **D-01-22:** WordPress Plugin and ecosystem vocabulary may inform the glossary as secondary evidence, but public names come from the ubiquitous language.

### Naming Source Precedence

- **D-01-23:** Official BOX NOW documentation establishes canonical terms when clear and safe for public use.
- **D-01-24:** OpenAPI/manual names define Protocol Shapes and Protocol Fields, but do not automatically become Public Contract names.
- **D-01-25:** Widget documentation defines browser widget behavior terms for the Widget Helper and Astro Integration.
- **D-01-26:** Existing ecosystem terms, including the WordPress Plugin, are secondary evidence for merchant vocabulary, aliases to avoid, and possible future context.
- **D-01-27:** Toolkit authority boundaries override familiar ecosystem terms when those terms imply checkout, payment, order persistence, stock, fulfillment, or credential ownership.

### the agent's Discretion

- **D-01-28:** The planner may choose the example style for the public API sketch based on research detail, as long as the sketch does not pretend exhaustive endpoint fields are final.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Source Of Truth

- `.planning/PROJECT.md` - project purpose, package topology, non-goals, source material links, and open external gates.
- `.planning/REQUIREMENTS.md` - functional and nonfunctional requirements for the Partner API Client, Widget Helper, Astro Integration, docs, and examples.
- `.planning/ROADMAP.md` - Phase 01 scope and task list.
- `.planning/STATE.md` - current focus, blockers, and validation evidence.
- `.planning/UBIQUITOUS_LANGUAGE.md` - canonical terms, public-contract/protocol boundary, and naming source precedence.

### Prior Phase Context

- `.planning/phases/00-project-foundation/00-CONTEXT.md` - Phase 00 decisions: no runtime stubs, tsdown/Biome/TypeScript/Vitest stack, ESM-first package foundation, and lean gates.

### Phase 01 Artifacts

- `.planning/phases/01-research-and-public-contract/01-PLAN.md` - current Phase 01 plan and initial public API sketch.
- `.planning/phases/01-research-and-public-contract/01-CONTEXT.md` - this context file.

### Local-Only Research Source

- `.planning/research/_local-sources/box-now-delivery-WP` - local ignored WordPress Plugin source for targeted inspection only. Do not commit copied plugin source or copied examples.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- No runtime source code exists yet.
- Root tooling already provides `pnpm check`, `pnpm test`, and `pnpm build` as the validation baseline.

### Established Patterns

- The repository is ESM-first and currently uses Node 24, pnpm 10.33.2, TypeScript, Biome, Vitest, tsdown, and Changesets metadata.
- The workspace is configured for `packages/*` and `examples/*`.
- Phase 00 explicitly avoided runtime package stubs, placeholder exports, and behavior claims.
- Planning source of truth lives under `.planning/`.

### Integration Points

- Phase 01 research files should live under `.planning/research/`.
- Phase 01 ADRs should capture package topology, secret boundary, widget contract, and Astro scope decisions.
- The public API sketch must be reviewed against `.planning/UBIQUITOUS_LANGUAGE.md`.
- Local third-party source copies belong under `.planning/research/_local-sources/` and are excluded from git.

</code_context>

<specifics>
## Specific Ideas

- The WordPress Plugin source has been moved from the repository root to `.planning/research/_local-sources/box-now-delivery-WP`.
- The WordPress Plugin should be inspected for targeted behavior only and summarized without mirroring its structure.
- The glossary now distinguishes Public Contract, Domain Term, Protocol Shape, Protocol Field, and Raw Escape Hatch.
- Phase 01 should prefer detailed source-first research summaries over raw snapshots or one mixed research dossier.
- The WordPress Plugin should be mentioned as a research source, not as a compatibility or migration target.

</specifics>

<deferred>
## Deferred Ideas

- Live BOX NOW behavior validation is deferred until sandbox/partner credentials are available.
- WordPress migration guidance is not part of Phase 01 and should not be implied by the research.

</deferred>

---

*Phase: 01-research-and-public-contract*
*Context gathered: 2026-05-12*
