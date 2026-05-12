# Phase 01: Research And Public Contract - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-05-12
**Phase:** 01-research-and-public-contract
**Areas discussed:** Research evidence shape, Official-source conflict policy, Public API sketch depth, WordPress reference boundary

---

## Research Evidence Shape

### Durable Research Evidence

| Option | Description | Selected |
| --- | --- | --- |
| Summaries plus source links | Commit concise local summaries with links, version/date notes, and explicit uncertainty. | |
| Detailed local extraction | Commit deeper endpoint/widget/plugin notes and small paraphrased tables. | Yes |
| Raw source snapshots | Commit downloaded PDFs/YAML/plugin copies for reproducibility. | |
| You decide | Downstream planner can choose the leanest evidence format. | |

**User's choice:** Detailed local extraction.
**Notes:** User pointed out the local WordPress Plugin source at `box-now-delivery-WP`; it was moved to `.planning/research/_local-sources/box-now-delivery-WP` and excluded through `.git/info/exclude`.

### Research Organization

| Option | Description | Selected |
| --- | --- | --- |
| Source-first research files | Separate detailed notes for official API, widget docs, and WordPress plugin behavior under `.planning/research/`. | Yes |
| One research dossier | One Phase 01 research file with all sources. | |
| Contract-first sketch | Put most evidence near the public API sketch and ADRs. | |
| You decide | Planner can choose the cleanest organization. | |

**User's choice:** Source-first research files.

### WordPress Plugin Inspection Depth

| Option | Description | Selected |
| --- | --- | --- |
| Targeted inspection only | Inspect relevant settings, API calls, widget behavior, status/failure handling, and checkout integration. | Yes |
| Broad plugin audit | Inspect the full plugin for behavior and edge cases. | |
| Treat as optional | Use only if official docs leave gaps. | |
| You decide | Planner/researcher can inspect what is needed. | |

**User's choice:** Targeted inspection only.

### Third-Party Examples

| Option | Description | Selected |
| --- | --- | --- |
| No copied examples | Commit only paraphrased findings and our own minimal pseudocode/API sketches. | |
| Tiny attributed snippets | Allow very short snippets only where necessary. | |
| Internal only | Local notes can include richer excerpts, but committed artifacts must stay paraphrased. | Yes |
| You decide | Planner can set the extraction policy. | |

**User's choice:** Internal only.

---

## Official-Source Conflict Policy

### Source Hierarchy

| Option | Description | Selected |
| --- | --- | --- |
| OpenAPI then manual then widget docs | OpenAPI wins for request/response shape, manual explains semantics, widget docs own browser widget behavior. | Yes |
| Manual then OpenAPI | Treats the human-readable manual as authoritative. | |
| Newest dated source wins | Lets recency resolve drift. | |
| You decide | Planner/researcher can define hierarchy from evidence. | |

**User's choice:** OpenAPI then manual then widget docs.

### Uncertainty Recording

| Option | Description | Selected |
| --- | --- | --- |
| Explicit research gaps | Every unresolved conflict becomes a named gap with source refs, current assumption, and validation path. | Yes |
| ADR only for major conflicts | Record only irreversible or surprising disagreements in ADRs. | |
| Inline TODOs in API sketch | Keep uncertainty near the sketch. | |
| You decide | Downstream agents can choose the lightest durable record. | |

**User's choice:** Explicit research gaps.

### WordPress Conflict Handling

| Option | Description | Selected |
| --- | --- | --- |
| Official docs win | Plugin behavior may explain real-world patterns, but cannot override official docs. | Yes |
| Plugin can reveal de facto behavior | Use plugin behavior as unconfirmed evidence of incomplete docs. | |
| Case-by-case ADR | Any conflict becomes an ADR decision. | |
| You decide | Planner can classify each conflict. | |

**User's choice:** Official docs win.

### No Live Credentials

| Option | Description | Selected |
| --- | --- | --- |
| Mock-first contracts | Design against documented contracts and mocked fixtures; mark live behavior as future validation. | Yes |
| Block uncertain endpoints | Do not sketch endpoints unless docs fully specify them. | |
| Defer risky endpoints | Sketch only stable endpoints now. | |
| You decide | Planner can decide endpoint by endpoint. | |

**User's choice:** Mock-first contracts.

---

## Public API Sketch Depth

### Sketch Depth

| Option | Description | Selected |
| --- | --- | --- |
| Named contract skeleton | Package entry points, method namespaces, major config objects, events, and key domain type names. | Yes |
| Detailed request shapes | Concrete request/response object shapes for each planned endpoint. | |
| Minimal examples only | README-style examples like the existing plan. | |
| You decide | Planner/researcher can set sketch depth after research. | |

**User's choice:** Named contract skeleton.

### Compatibility Candidates

| Option | Description | Selected |
| --- | --- | --- |
| Entry points and domain names | Package names, factories, method namespaces, event names, and glossary-backed domain type names require explicit review. | Yes |
| Everything in the sketch | All shown config keys, field names, and examples become candidate public contracts. | |
| Only package names | Keeps flexibility high. | |
| You decide | Downstream agents classify names during planning. | |

**User's choice:** Entry points and domain names.

### Protocol Fields In Public API

| Option | Description | Selected |
| --- | --- | --- |
| Domain-first with raw escape hatches | Use glossary/domain names first and expose raw protocol fields only where fidelity is required. | Yes |
| Mirror OpenAPI names | Public API follows BOX NOW field names closely. | |
| Fully abstracted domain API | Hide raw protocol shape as much as possible. | |
| You decide | Planner can balance fidelity and clarity endpoint by endpoint. | |

**User's choice:** Domain-first with raw escape hatches.
**Notes:** User connected this to ubiquitous language. `.planning/UBIQUITOUS_LANGUAGE.md` was updated with Public Contract, Domain Term, Protocol Shape, Protocol Field, Raw Escape Hatch, and naming source precedence.

### Example Style

| Option | Description | Selected |
| --- | --- | --- |
| Intent examples plus skeleton | Short examples plus named contract skeletons, without pretending endpoint fields are final. | |
| Compile-ready examples | Examples should typecheck once implementation exists. | |
| Narrative only | Describe the API contract in prose/ADRs. | |
| You decide | Planner can choose based on research detail. | Yes |

**User's choice:** You decide.

---

## WordPress Reference Boundary

### Valuable Plugin Findings

| Option | Description | Selected |
| --- | --- | --- |
| Integration behavior only | Settings model, checkout placement, widget configuration, API usage, status/failure handling, and merchant-facing edge cases. | Yes |
| Full parity target | Treat plugin behavior as a feature checklist. | |
| Failure modes only | Inspect mostly for mistakes and operational edge cases. | |
| You decide | Researcher can decide while inspecting the plugin. | |

**User's choice:** Integration behavior only.

### Rejected Plugin Behaviors

| Option | Description | Selected |
| --- | --- | --- |
| WooCommerce ownership | Reject checkout ownership, order persistence, payment/stock assumptions, admin workflows, and hidden storage as library responsibilities. | Yes |
| All UI assumptions | Reject every plugin UI behavior and keep only API-level lessons. | |
| Only unsafe patterns | Reject secrets-in-browser, hidden storage authority, and unvalidated payload trust. | |
| You decide | Researcher can classify rejected behaviors. | |

**User's choice:** WooCommerce ownership.

### Migration Guidance

| Option | Description | Selected |
| --- | --- | --- |
| Concept migration only | Map plugin/WooCommerce concepts to toolkit surfaces without promising compatibility. | |
| Compatibility notes | Document which plugin settings/events map to toolkit concepts. | |
| Avoid migration guide | Mention plugin only as research source. | Yes |
| You decide | Planner can choose later. | |

**User's choice:** Avoid migration guide.

### Plugin Influence On Names

| Option | Description | Selected |
| --- | --- | --- |
| No, glossary wins | Plugin names may be aliases to avoid or context; public names come from ubiquitous language. | Yes |
| Only familiar names | Allow plugin names when widely recognized by BOX NOW merchants. | |
| Case-by-case | ADR decides any plugin-derived public name. | |
| You decide | Planner can handle naming conflicts during public name review. | |

**User's choice:** No, glossary wins, with clarification.
**Notes:** User clarified that the ubiquitous language should itself follow established BOX NOW, OpenAPI, widget, and plugin ecosystem conventions in that order where appropriate. The glossary was updated with this naming source precedence.

---

## the agent's Discretion

- Planner may choose public API example style after research.

## Deferred Ideas

- Live BOX NOW behavior validation waits for sandbox/partner credentials.
- WordPress migration guidance is not part of Phase 01.

## Post-Discussion Addendum

- User added `https://github.com/answear/boxnow-bundle` as another potentially helpful ecosystem implementation reference for Phase 01.
- It should be researched as secondary evidence alongside the WordPress Plugin, especially for server-side configuration, OAuth/auth handling, pickup-point/location API behavior, country/region handling, and test patterns.
- It is not an authority over official BOX NOW docs and is not a compatibility target.
