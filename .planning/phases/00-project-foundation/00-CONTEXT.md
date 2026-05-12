# Phase 00: Project Foundation - Context

**Gathered:** 2026-05-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Make the repository ready for TypeScript package work without implementing BOX
NOW behavior. Phase 00 creates the workspace, configuration, quality gates,
versioning metadata, CI baseline, and repo guidance needed before package
implementation begins.

</domain>

<decisions>
## Implementation Decisions

### Existing Decisions

- **D-00-01:** The repository is public under `coding-tree-io/boxnow-js`.
- **D-00-02:** Planning source of truth lives under `.planning/`.
- **D-00-03:** Runtime code must use glossary terms from `.planning/UBIQUITOUS_LANGUAGE.md`.
- **D-00-04:** Package implementation waits until workspace tooling exists.

### Workspace Skeleton

- **D-00-05:** Phase 00 creates only directories and configuration for the monorepo shape.
- **D-00-06:** Do not add package source stubs, placeholder exports, or runtime implementation in Phase 00.
- **D-00-07:** If empty directories need to be tracked, use minimal non-runtime placeholders only; do not imply implemented package behavior.

### Tooling Stack

- **D-00-08:** Use `tsdown + Biome + TypeScript + Vitest` as the foundation tooling stack.
- **D-00-09:** Keep the repository ESM-first with explicit `"type": "module"`.
- **D-00-10:** Use `tsc --noEmit` as the real type gate; bundling does not replace typechecking.
- **D-00-11:** Use explicit package exports once packages have real public entry points.

### Quality Gates

- **D-00-12:** Phase 00 uses a lean validation gate: install, format/lint, typecheck, test, build.
- **D-00-13:** Defer package export smoke tests, `attw`, `publint`, size limits, Playwright, and npm publish dry-runs until packages have real exports.

### Release And Versioning

- **D-00-14:** Phase 00 adds only versioning metadata, such as Changesets setup.
- **D-00-15:** Do not add npm publish workflows or provenance dry-runs in Phase 00.

### Repo Guidance

- **D-00-16:** Add full repo guidance now: `AGENTS.md`, contribution guidance, security policy, support policy, code of conduct, and issue/PR templates where practical.
- **D-00-17:** Repo guidance must repeat the secret boundary: no BOX NOW credentials in source, docs, fixtures, screenshots, CI, or examples.

### CI Baseline

- **D-00-18:** CI should prove the current development stack only.
- **D-00-19:** Do not add a future/legacy Node compatibility matrix in Phase 00.
- **D-00-20:** Use the current local baseline as the first target: Node `24` and pnpm `10.33.2`.

### the agent's Discretion

- The implementation agent may choose the exact script names and config file
  layout as long as the public commands `pnpm check`, `pnpm test`, and
  `pnpm build` exist and stay lean.
- The implementation agent may decide whether empty workspace directories are
  tracked with `.gitkeep` or introduced when their first config/doc file exists,
  as long as no package behavior is implied.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Source Of Truth

- `.planning/PROJECT.md` - project purpose, package topology, non-goals, and open external gates.
- `.planning/REQUIREMENTS.md` - functional and nonfunctional requirements for later package phases.
- `.planning/ROADMAP.md` - phase boundary and task list.
- `.planning/STATE.md` - current focus, blockers, and next task.
- `.planning/UBIQUITOUS_LANGUAGE.md` - canonical names for public API and docs.

### Phase 00

- `.planning/phases/00-project-foundation/00-PLAN.md` - accepted Phase 00 task list and validation commands.
- `.planning/research/phase-00-modern-library-tooling.md` - library tooling research and deferred checks.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- No runtime source code exists yet.

### Established Patterns

- Planning docs are the only established project pattern.
- The repository already uses `.gitattributes` to keep text files LF-normalized.
- The generated GitHub Node `.gitignore` exists and should keep local IDE metadata and copied third-party research snapshots out of commits.

### Integration Points

- Root package manager and workspace config will become the entry point for all later package phases.
- `.planning/` docs are the source of truth for downstream GSD research, planning, and execution.

</code_context>

<specifics>
## Specific Ideas

- User explicitly chose directories/config only for Phase 00.
- User explicitly chose a lean validation gate.
- User explicitly chose versioning only, not publish workflow.
- User explicitly chose adding full repo guidance docs now.
- User explicitly rejected future compatibility work for Phase 00.
- User chose `tsdown + Biome + TypeScript + Vitest` after research-backed options.

## Boundaries

- No Partner API implementation in Phase 00.
- No widget implementation in Phase 00.
- No Astro integration implementation in Phase 00.
- No real BOX NOW credentials in any file.

</specifics>

<deferred>
## Deferred Ideas

- Package export smoke tests, `attw`, `publint`, size limits, Playwright, npm
  provenance, and publish dry-runs are deferred until packages have real public
  entry points.
- Node compatibility matrices are out of scope for Phase 00.

</deferred>

---

*Phase: 00-project-foundation*
*Context gathered: 2026-05-12*
