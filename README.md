# Risk register

A static viewer for risk registers kept as markdown elsewhere. This repo is
only the layout; point it at your markdown with query parameters.

| Query | Shows |
|-------|-------|
| _(none)_ | Data → Form on a new register (`examples/minimal.md`), ready to fill in. |
| `?src=<url>` | The register as B, with its latest listed snapshot as A. Snapshots listed in its front matter are fetched from the same directory. |
| `?ours=<url>&theirs=<url>` | The Diff view from A = ours to B = theirs. |

Two pickers at the top choose the sources: **B** is the register on view and
**A** is an optional baseline. Every view shows B, with changes measured from A;
with A set to None, Diff, Trajectories and Compare are hidden.

URLs may be relative to the page or absolute. Sources on another host must
allow CORS — `https://raw.githubusercontent.com/<owner>/<repo>/<branch>/risks.md`
works for public repos; private repos won't.

## Format

The minimum is front matter with `as_at`, then one `##` section per entry
with its score and, optionally, some text:

    ---
    as_at: 2026-01-01
    ---

    ## Supplier fails
    - impact: 4
    - likelihood: 2

    Our only supplier of X goes under.

`value`/`effort` instead of `impact`/`likelihood` makes it an opportunity.
Every other field, section and table is optional, and the views hide whatever
is missing. Entry ids come from the heading (`## R01 · Title`), else the first
slug, else are auto-numbered in file order (R01, O01…). Across snapshots,
give entries an id or slug so they stay matched if the order changes.

Data → Form edits entries field by field; each change rewrites only that
entry's lines in the markdown (tables are edited in Data → Source).

`examples/` holds a fictional register in the expected format
(`?src=examples/risks.md`), and `examples/minimal.md` is the smallest valid one.

## Local

    make dev    # serves with Bun on http://localhost:8000/

## Deploy

`.github/workflows/pages.yml` publishes the repo root to GitHub Pages on push
to `main`. Enable it once under Settings → Pages → Source: GitHub Actions.

## Files

- `index.html` — the page: an `<x-dc>` template, its logic class, and the loader
  that fetches the markdown before booting.
- `support.js`, `vendor/react*.js` — the runtime that renders the component.
