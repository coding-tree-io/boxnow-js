# Contributing

## Local Setup

Use Node 24 and pnpm 10.33.2.

```powershell
pnpm install
pnpm check
pnpm test
pnpm build
```

## Public API Changes

Package exports, exported symbols, request shapes, config keys, and event names
are public contracts. After package source exists, public API changes require a
changeset.

## Security Boundary

BOX NOW OAuth client ids, OAuth client secrets, partner portal credentials, and
server API base URLs are server runtime configuration only. Do not add real
credentials to examples, tests, screenshots, CI, fixtures, docs, or issue reports.

Browser-facing packages may only receive browser-safe configuration and normalized
locker selection data.
