# Phase 02: Core Types And Validation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-05-12
**Phase:** 02-core-types-and-validation
**Areas discussed:** External Audit Gate, Type Ownership, Validation Shape, Domain vs Protocol Names

---

## External Audit Gate

| Option | Description | Selected |
|--------|-------------|----------|
| Contract-impact audit | Inspect only behavior that can affect public types, validation, naming, and boundaries. | |
| Lifecycle audit | Inspect the delivery lifecycle where it exists, then carry forward only findings relevant to Phase 02. | yes |
| Full source audit | Systematically inspect every relevant source/test file and produce a broad findings report. | |

**User's choice:** Lifecycle audit.
**Notes:** The audit must inspect WP/Symfony lifecycle behavior broadly enough to understand integration shape, but only block Phase 02 on public types, validation, naming, and authority boundaries.

| Option | Description | Selected |
|--------|-------------|----------|
| Checklist + gaps | Produce inspected areas, source notes, Phase 02 findings, and unresolved gaps. | yes |
| ADR update | Checklist plus ADR updates wherever ecosystem findings challenge prior decisions. | |
| Research dossier | Full standalone audit document per library. | |

**User's choice:** Checklist + gaps.
**Notes:** The audit should be enough to unblock planning without overproducing documentation.

| Option | Description | Selected |
|--------|-------------|----------|
| Official docs win, gap recorded | Keep official docs/ADRs authoritative and record ecosystem conflicts. | yes |
| Pause for decision | Stop planning if meaningful conflicts appear. | |
| ADR challenge path | Create an ADR amendment candidate for practical integration conflicts. | |

**User's choice:** Official docs win, gap recorded.
**Notes:** Conflicts become gaps or do-not-copy notes.

| Option | Description | Selected |
|--------|-------------|----------|
| Framework commerce ownership | Exclude framework checkout, orders, payment, admin UI, stock, fulfillment, and migration compatibility. | yes |
| Only payment/stock | Exclude payment and stock, but allow checkout/order concepts if useful. | |
| Nothing excluded from audit notes | Document everything, then filter later. | |

**User's choice:** Framework commerce ownership.
**Notes:** User clarified the MVP should implement only what `blackbox-records` needs to start with.

---

## Type Ownership

| Option | Description | Selected |
|--------|-------------|----------|
| Core-first in `@coding-tree-io/boxnow` | Define shared domain types in the server package first. | |
| Package-local from the start | Define types separately in each public package. | |
| Separate shared package | Add a fourth workspace package for shared contracts. | yes |

**User's choice:** Separate shared package.
**Notes:** The agent challenged the extra boundary; user kept the separate-package direction.

| Option | Description | Selected |
|--------|-------------|----------|
| Internal workspace package | Shared implementation/types for repo packages, not documented as an end-user import. | yes |
| Public shared package | Publish/import as a public shared package. | |
| Reconsider core-first | Avoid the fourth package unless duplication proves it. | |

**User's choice:** Internal workspace package.
**Notes:** End users should still import the relevant public package, not the internal one.

| Option | Description | Selected |
|--------|-------------|----------|
| Domain primitives only | Country, environment, compartment size, shared errors, small branded IDs. | |
| All shared domain models | Also own `Locker`, `LockerSnapshot`, `DeliveryRequest`, `Parcel`, etc. | |
| Validation foundation too | Own primitives, shared models, and reusable validators/builders. | yes |

**User's choice:** Validation foundation too.
**Notes:** The internal package owns pure shared validators/builders as well as shared contracts.

| Option | Description | Selected |
|--------|-------------|----------|
| Curated re-exports only | Public packages re-export only user-facing contract types. | yes |
| Broad re-export | Public packages re-export most internal shared types. | |
| No re-exports initially | Users see only package-local wrapper types. | |

**User's choice:** Curated re-exports only.
**Notes:** Internal validation plumbing stays private.

---

## Validation Shape

| Option | Description | Selected |
|--------|-------------|----------|
| Result objects | Return result objects instead of throwing. | yes |
| Throwing validators | Invalid input throws typed validation errors. | |
| Both, with result primary | Result helpers are base API with throwing convenience wrappers. | |

**User's choice:** Result objects.
**Notes:** Avoid surprise exceptions in checkout-like flows.

| Option | Description | Selected |
|--------|-------------|----------|
| No throwing wrappers in Phase 02 | Result objects only. | yes |
| Throwing wrappers for builders only | Builders throw, low-level validators return results. | |
| Both everywhere | Every public validator has result and throwing variants. | |

**User's choice:** No throwing wrappers in Phase 02.
**Notes:** Keep the first validation contract small.

| Option | Description | Selected |
|--------|-------------|----------|
| Structured issue list backed by an internal schema library | Public errors use a stable issue list while internal schemas do validation. | |
| Single error per failure | Return only the first error. | |
| Schema-library native error | Expose the chosen schema library's native error. | |
| Public contract is JSON Schema/Standard Schema shaped | Use Valibot internally, but public schema contracts follow standards. | yes |

**User's choice:** Public contract is JSON Schema/Standard Schema shaped.
**Notes:** User wanted less bespoke surface, Valibot internally, and less is more.

| Option | Description | Selected |
|--------|-------------|----------|
| Standard Schema now, JSON Schema later | Standard Schema compatibility now; JSON Schema export later. | yes |
| Both now | Standard Schema compatibility and JSON Schema export in Phase 02. | |
| JSON Schema now | Make JSON Schema the primary public artifact. | |

**User's choice:** Standard Schema now, JSON Schema later.
**Notes:** JSON Schema export is deferred until docs/tooling need it.

---

## Domain vs Protocol Names

| Option | Description | Selected |
|--------|-------------|----------|
| Domain-first with explicit raw mapping | Use clear domain names publicly and protocol names in schema/mapper code. | |
| Protocol-first | Mirror BOX NOW field names in wire-facing public types. | yes |
| Dual fields | Expose both domain and protocol aliases in public types. | |

**User's choice:** Protocol-first.
**Notes:** Constrained to wire-facing request/response types; host-facing domain/widget snapshot types stay ergonomic.

| Option | Description | Selected |
|--------|-------------|----------|
| Never public canonical | Keep ecosystem terms such as `Voucher` out of canonical public type names. | |
| Alias exports | Provide migration-friendly type aliases. | |
| Protocol/ecosystem terms allowed | If users or merchant flows expect a term, it can become public API. | yes |

**User's choice:** Protocol/ecosystem terms allowed.
**Notes:** Must be backed by official docs or audit evidence and reflected in the glossary.

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, before implementation | Update `.planning/UBIQUITOUS_LANGUAGE.md` before adding public types. | yes |
| Yes, after implementation | Implement first, then backfill glossary. | |
| No, only code matters | Glossary remains advisory. | |

**User's choice:** Yes, before implementation.
**Notes:** Public protocol/ecosystem terms must be traceable before code lands.

| Option | Description | Selected |
|--------|-------------|----------|
| Wire/protocol types only | Protocol fields appear in request/response schema types and mappers. | yes |
| Everywhere by default | All public data shapes mirror BOX NOW fields unless impossible. | |
| Only internal | Public types are domain-first; raw fields stay hidden. | |

**User's choice:** Wire/protocol types only.
**Notes:** This matches the protocol-first preference while preserving ergonomic host-facing types.

---

## the agent's Discretion

- Choose the internal shared package name.
- Choose the exact result object property names after checking Standard Schema and Valibot conventions.
- Choose how to organize schema files versus model files inside the internal package.

## Deferred Ideas

- JSON Schema export.
- Throwing validation wrappers.
- WordPress/Symfony migration guides.
- Live BOX NOW validation.
