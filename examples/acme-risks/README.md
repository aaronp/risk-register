# Acme — risk register

**[▶ View the register](https://aaronp.github.io/risk-register-example/)**

The data lives in [`risks.md`](risks.md) and the dated snapshots it lists. The
UI comes from [aaronp/risk-register](https://github.com/aaronp/risk-register).

## Using this as a template

1. Create an empty repo on GitHub, then from this directory run
   `make clone REPO=you/your-repo` (or `./clone.sh`, which prompts).
   It copies the files to `../your-repo`, points the View link above at
   your Pages site and sets the git remote.
2. Edit `risks.md` (or edit it in the viewer's Data page and copy the source
   back), then commit and push.
3. On GitHub: Settings → Pages → Source: **GitHub Actions**.
4. Optional: on the repo page, open About (⚙) → tick **Use your GitHub Pages
   website** so the link also shows in the sidebar.

The workflow deploys from `main` or `master`. "Branch … is not allowed to
deploy to github-pages"? Add your branch under Settings → Environments →
github-pages → Deployment branches and tags.

Your site redirects to the viewer with `?src=` pointing at your `risks.md`.
Any query params you add are passed on, e.g. `?page=data` or
`?view=table&kind=opportunity`.

No Pages? Link straight to the raw file:
`https://aaronp.github.io/risk-register/?src=https://raw.githubusercontent.com/<you>/<repo>/<branch>/risks.md`
