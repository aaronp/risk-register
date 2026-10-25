PORT ?= 8000

.PHONY: dev
dev:
	@echo "Example: http://localhost:$(PORT)/?src=examples/acme-risks/risks.md"
	@PORT=$(PORT) bun dev.js
