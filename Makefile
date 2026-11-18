PORT ?= 8000

.PHONY: dev test dist bump-patch bump-minor bump-major publish

# Serves the repo; File → Save writes .md files (and .card.json card settings) back (see dev.js).
dev:
	@echo "Example: http://localhost:$(PORT)/?src=examples/acme-risks/risks.md"
	@PORT=$(PORT) bun dev.js

test:
	npm test

# Packs the CLI into pritzlaff-risk-register-<version>.tgz (install with: npm i -D ./pritzlaff-risk-register-*.tgz)
dist: test
	npm pack

# Bumps package.json, commits and tags v<version> (needs a clean tree)
bump-patch bump-minor bump-major:
	npm version $(@:bump-%=%)

# Publishes @pritzlaff/risk-register to npm. Bump first: make bump-patch|bump-minor|bump-major
publish: test
	npm publish
