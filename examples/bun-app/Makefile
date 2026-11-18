# Where the published risks.md lives. Pages serves risks/ at the site root, so for the GitHub repo
# you/your-app that is https://you.github.io/your-app/risks.md (worked out from the origin remote).
# The card's links open the viewer with ?src= pointing here. Override: make snapshot RR_SRC=<url>
RR_SRC ?= $(shell git remote get-url origin 2>/dev/null | sed -nE 's|^.*github\.com[:/]([^/]+)/([^/]+)$$|https://\1.github.io/\2/risks.md|p' | sed 's|\.git/risks|/risks|')

.PHONY: snapshot
# Regenerates risks/badge.svg and risks/card.json from risks/risks.md (and risks/risks.card.json, if present).
snapshot:
	RR_SRC=$(RR_SRC) bunx risk-register badge risks/risks.md
	RR_SRC=$(RR_SRC) bunx risk-register card risks/risks.md
