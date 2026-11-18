---
register: bun-app
as_at: 2026-11-18
---

## Single maintainer
- id: R-01
- impact: 4
- likelihood: 3
- appetite: 8

Only one person knows how the service is deployed.

## Bun runtime upgrade breaks the build
- id: R-02
- impact: 2
- likelihood: 2

A major Bun release changes an API we rely on.

## Reuse the service for internal tools
- id: O-01
- value: 4
- effort: 2

Other teams could call the same endpoint instead of building their own.
