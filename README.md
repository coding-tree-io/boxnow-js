# boxnow-js

Unofficial TypeScript client, widget helpers, and Astro integration for BOX NOW.

This repository is in planning/bootstrap. The source of truth for scope,
terminology, and implementation slices lives under [`.planning/`](.planning/).

## Development

This repository uses Node 24 and pnpm 10.33.2.

```powershell
pnpm install
pnpm check
pnpm test
pnpm build
```

Planned packages:

- `@coding-tree-io/boxnow` - server-side Partner API client and shared types
- `@coding-tree-io/boxnow-widget` - browser-safe BOX NOW widget helpers
- `@coding-tree-io/astro-boxnow` - Astro integration and components

The project follows a strict boundary: BOX NOW API credentials are server-only,
browser/widget code handles only non-secret locker selection, and this library
does not own checkout, payment, stock, or order persistence.
