PORT ?= 8000

.PHONY: dev
dev:
	@bun -e 'const s = Bun.serve({ port: $(PORT), async fetch(req) { const p = new URL(req.url).pathname; const f = Bun.file("." + (p.endsWith("/") ? p + "index.html" : p)); return (await f.exists()) ? new Response(f) : new Response("Not found", { status: 404 }); } }); console.log("Serving on " + s.url.href + " (Ctrl-C to stop)")'
