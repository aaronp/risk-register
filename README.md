# Risk register

**[▶ Open the viewer](https://aaronp.github.io/risk-register/)** ·
[Acme example](https://aaronp.github.io/risk-register/?src=examples/acme-risks/risks.md)

A static viewer for risk registers kept as markdown elsewhere. This repo is
only the presentation; the content lives in its own repo (see
[Publishing your own register](#publishing-your-own-register)) and is pointed
at with query parameters.

| Query | Shows |
|-------|-------|
| _(none)_ | Data → Form on a new register (`examples/minimal.md`), ready to fill in. |
| `?src=<url>` | The register on its own; Compare lets you pick a second source in the page. |
| `?ours=<url>&theirs=<url>` | The Compare view from A = ours to B = theirs. |

Add any of these to preset the controls (unknown values are ignored):

| Query | Values |
|-------|--------|
| `theme` | `paper` (default), `slate`, `night`, `contrast` |
| `kind` | `risk` (default), `opportunity` |
| `page` | `register`, `data`; defaults to `data` with no source, else `register` |
| `view` | `matrix` (default), `distribution`, `table`, `compare`, `trajectories`; opens `register` unless `page` says otherwise |

The address bar keeps up with these as you change them, so you can copy it to share the current view.

Two pickers at the top choose the sources: **B** is the register on view and
**A** is an optional baseline. Every view shows B, with changes measured from A;
with A set to None, Compare and Trajectories are hidden. Compare has a Summary layout (the change list) and side-by-side layouts (Butterfly, Twin matrices, Shift matrix).

URLs may be relative to the page or absolute. Sources on another host must
allow CORS — `https://raw.githubusercontent.com/<owner>/<repo>/<branch>/risks.md`
works for public repos; private repos won't.

## Format

The full format is in **[spec.md](spec.md)**. The minimum is a `##` heading
per entry with its two scores; front matter, ids, people, prose and tables are
all optional, and anything unrecognised is ignored:

    ## Supplier fails
    - impact: 4
    - likelihood: 2

    Our only supplier of X goes under.

`value`/`effort` instead of `impact`/`likelihood` makes it an opportunity.

Data → Form edits entries field by field; each change rewrites only that
entry's lines in the markdown (tables are edited in Data → Source).

`examples/acme-risks/` is a fictional register, laid out as a
standalone data repo; `examples/partenaire.md` is a second register to compare
it with, and `examples/minimal.md` is the smallest valid one.

## Viewing locally

`make dev` serves the folder with Bun on http://localhost:8000 and prints the
example's URL; some browsers block the scripts over file://.

## Hosting & external data

Served on GitHub Pages by `.github/workflows/pages.yml` on pushes to `main`
(Settings → Pages → Source: **GitHub Actions**; the `github-pages` environment
must allow `main`). `.md` files are served raw, without Jekyll.

Load any register with `?src=<url>` (absolute, or relative to the page), e.g.
`https://aaronp.github.io/risk-register/?src=examples/acme-risks/risks.md`.
The source must allow CORS (GitHub Pages and raw.githubusercontent.com do).

## Publishing your own register

Your register lives in its own data-only repo (`risks.md`, a
redirecting `index.html` and a Pages workflow); this repo stays the viewer.
Create an empty repo on GitHub, then either:

**A. Start from `examples/` in this repo**

```sh
git clone https://github.com/aaronp/risk-register.git
cd risk-register/examples/acme-risks
make clone REPO=you/your-risks    # or ./clone.sh to be prompted
```

This copies the example to `../your-risks` as a fresh repo on `main`, points
its README link at `https://you.github.io/your-risks/` and sets the `origin`
remote.

**B. Clone the standalone example**

```sh
git clone https://github.com/aaronp/risk-register-example.git your-risks
cd your-risks
git remote set-url origin git@github.com:you/your-risks.git
```

Then change the **View** link in its README to `https://you.github.io/your-risks/`.

Either way, edit `risks.md`, commit and `git push -u origin main`, then on
GitHub set Settings → Pages → Source: **GitHub Actions**. Your site at
`https://you.github.io/your-risks/` redirects here with `?src=` pointing at
your `risks.md`, passing on any other query params
(`https://you.github.io/your-risks/?page=data`).

## Files

- `index.html` — the page: an `<x-dc>` template, its logic class, and the loader
  that fetches the markdown before booting.
- `support.js`, `vendor/react*.js` — the runtime that renders the component.
