# bun-app — a Bun project with its own risk register

A tiny Bun service whose risks and opportunities live beside the code in
[`risks/risks.md`](risks/risks.md).

```sh
bun install
bun run risks    # opens risks/risks.md in the viewer, served from localhost
bun start        # the app itself
```

`bun run risks` uses the [`@pritzlaff/risk-register`](https://www.npmjs.com/package/@pritzlaff/risk-register)
dev dependency. Edit in the viewer and use **File → Save** to write `risks/risks.md` back, or edit the
file and reload the page. No install? `bunx @pritzlaff/risk-register risks/risks.md` does the same.

## Badge and summary card

```sh
make snapshot    # → risks/badge.svg, risks/card.json (risks)
                 #   risks/badge-opportunity.svg, risks/card-opportunity.json (opportunities)
```

- `badge.svg` / `badge-opportunity.svg` are status badges for your README:
  `[![Risks](https://you.github.io/your-app/badge.svg)](https://you.github.io/your-app/)`
  `[![Opportunities](https://you.github.io/your-app/badge-opportunity.svg)](https://you.github.io/your-app/)`
- `card.json` / `card-opportunity.json` are the same summaries as data (title, status pill, open count,
  a count per score band, links) for a dashboard to style as it likes.

All come from `risks/risks.md`; `make snapshot` runs `risk-register badge|card risks/risks.md --kind risk|opportunity`.
To change the labels, colours or which bands show, open the viewer (`bun run risks`), pick
**File → Design card…**, then **Save risks.card.json** (it lands in `risks/`) and run `make snapshot` again.
Those settings apply to both kinds, so leave the title blank to keep "Risks" and "Opportunities".

The links in the card and badge open the hosted viewer on your published `risks.md`. `make` works out
that URL from your `origin` remote; override it with `make snapshot RR_SRC=<url>`, and point the links at
another viewer with `RR_HOST=<url>` (the same address as `VIEWER` in `risks/index.html`).

## Publishing on GitHub Pages

`.github/workflows/pages.yml` publishes only the `risks/` folder. Its `index.html` redirects to the hosted
viewer with `?src=` pointing at your `risks.md`, as in [acme-risks](../acme-risks). It also runs
`make snapshot`, so the badges and cards are published beside it. On GitHub: Settings → Pages →
Source: **GitHub Actions**.
