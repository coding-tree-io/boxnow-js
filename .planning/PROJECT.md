# Project: boxnow-js

## Purpose

Create an unofficial open-source TypeScript toolkit for BOX NOW integrations:
a server-side Partner API client, browser-safe widget helpers, and an Astro
integration that makes locker selection easy without turning the library into
an ecommerce platform.

## Repository

- GitHub organization: `coding-tree-io`
- Repository: `boxnow-js`
- Visibility: public
- License: MIT
- Package manager target: pnpm
- Primary language: TypeScript

## Product Shape

The repository is a small monorepo:

- `packages/boxnow`: server-side BOX NOW Partner API client and shared domain types.
- `packages/boxnow-widget`: browser-safe helper package for the BOX NOW map widget.
- `packages/astro-boxnow`: Astro integration and components.
- `apps/docs`: Astro documentation site and mocked playground.
- `examples/*`: runnable integration examples when they add concrete value.

## Non-Goals

- No WooCommerce, Shopify, Stripe, inventory, payment, or order persistence ownership.
- No browser access to BOX NOW OAuth client secrets.
- No hidden `localStorage` authority inside the library.
- No raw BOX NOW widget payload persistence contract.
- No claim of official BOX NOW endorsement unless BOX NOW grants it explicitly.

## Source Material

- Official BOX NOW Partner API entry point: https://boxnow.gr/en/hidden/Partner-API-EN
- Official BOX NOW API manual PDF: https://boxnow.gr/media/hidden/BoxNow%20API%20Manual%20%28v.7.2%29.pdf
- Official BOX NOW OpenAPI YAML: https://boxnow.gr/media/hidden/partner-api-1.68.yaml
- Official widget developer page: https://widget-v5.boxnow.gr/devs
- Astro Integration API: https://docs.astro.build/en/reference/integrations-reference/
- WordPress plugin reference: https://wordpress.org/plugins/box-now-delivery/

## Current Status

Planning/bootstrap. No runtime package implementation has been started.

## Open External Gates

- npm organization access for `@coding-tree-io/*` package publication.
- BOX NOW sandbox/partner credentials for live contract validation.
- Trademark/wording review if the README or package metadata needs stronger
  BOX NOW brand language.
