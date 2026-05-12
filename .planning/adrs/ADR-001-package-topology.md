# ADR-001: Package Topology

## Status

Accepted

## Context

BOX NOW integration spans server API calls, browser widget interaction, and Astro
project integration. Combining these into one package would risk leaking server
credentials into browser builds and would make simple consumers depend on
framework-specific code.

## Decision

Use a pnpm monorepo with three primary public packages:

- `@coding-tree-io/boxnow`
- `@coding-tree-io/boxnow-widget`
- `@coding-tree-io/astro-boxnow`

Keep docs and examples outside the public packages.

## Consequences

- Consumers can install only the package they need.
- The browser package cannot accidentally import server credential code.
- The Astro package can stay thin and compose the widget package.
- Cross-package type sharing must be intentional and covered by export tests.
