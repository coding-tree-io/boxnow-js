# Security Policy

## Reporting

Please report security issues privately to the maintainers instead of opening a
public issue. If no private advisory channel is available for this repository yet,
contact the Coding Tree maintainers through the GitHub organization.

## Scope

Security-sensitive areas include:

- BOX NOW Server Credentials.
- Partner API token handling.
- Widget message-origin validation.
- Preventing server credentials from entering browser bundles.
- CI, examples, fixtures, and docs that might accidentally expose secrets.

Do not include real credentials, customer data, delivery payloads, or partner
portal screenshots in reports.
