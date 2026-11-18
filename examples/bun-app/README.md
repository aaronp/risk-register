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
make snapshot    # → risks/badge.svg and risks/card.json
```

- `badge.svg` is a status badge for your README:
  `[![Risks](https://you.github.io/your-app/badge.svg)](https://you.github.io/your-app/)`
- `card.json` is the same summary as data (title, status pill, open count, a count per score band, links)
  for a dashboard to style as it likes.

Both come from `risks/risks.md`. To change the title, labels, colours, which bands show, or to count
opportunities instead, open the viewer (`bun run risks`), pick **File → Design card…**, then **Save
risks.card.json** (it lands in `risks/`) and run `make snapshot` again.

The links in the card and badge open the hosted viewer on your published `risks.md`. `make` works out
that URL from your `origin` remote; override it with `make snapshot RR_SRC=<url>`, and point the links at
another viewer with `RR_HOST=<url>` (the same address as `VIEWER` in `risks/index.html`).

## Publishing on GitHub Pages

`.github/workflows/pages.yml` publishes only the `risks/` folder. Its `index.html` redirects to the hosted
viewer with `?src=` pointing at your `risks.md`, as in [acme-risks](../acme-risks). It also runs
`make snapshot`, so `badge.svg` and `card.json` are published beside it. On GitHub: Settings → Pages →
Source: **GitHub Actions**.
