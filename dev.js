// Dev server: serves this folder, and proxies /typesafe/* to api.typesafe.ai, which doesn't allow browser (CORS) calls.
// Existing .md files (and .card.json card settings) in the repo can be written back with PUT: File → Save.
// Loopback only: listens on 127.0.0.1 and ::1, and refuses any other Host (DNS rebinding).
import { rename } from 'node:fs/promises';
import { resolve, sep } from 'node:path';

const port = Number(process.env.PORT ?? 8000);
const root = resolve('.');
const hosts = new Set([`127.0.0.1:${port}`, `localhost:${port}`, `[::1]:${port}`]);
/** A repo file the page may overwrite: markdown or card settings inside the repo. */
const writable = (abs) => abs.startsWith(root + sep) && !abs.slice(root.length).includes(sep + '.') && /\.(md|card\.json)$/i.test(abs);

async function handle(req) {
  if (!hosts.has(req.headers.get('host') ?? '')) return new Response('Forbidden host', { status: 403 });
  const u = new URL(req.url);
  if (u.pathname.startsWith('/typesafe/')) {
    const r = await fetch('https://api.typesafe.ai' + u.pathname.slice('/typesafe'.length) + u.search, {
      method: req.method,
      headers: { authorization: req.headers.get('authorization') ?? '', 'content-type': req.headers.get('content-type') ?? 'application/json' },
      body: req.method === 'GET' ? undefined : await req.arrayBuffer(),
    });
    /* Body re-wrapped: fetch has already decompressed it, so the upstream content-encoding must not be passed on. */
    return new Response(await r.arrayBuffer(), { status: r.status, headers: { 'content-type': r.headers.get('content-type') ?? 'application/json' } });
  }
  const p = decodeURIComponent(u.pathname);
  const abs = resolve('.' + (p.endsWith('/') ? p + 'index.html' : p));
  if (req.method === 'PUT') {
    /* Cross-site pages can't get here: a PUT needs a CORS preflight, which this server never answers.
       Markdown must already exist; card settings may be new, beside their markdown. */
    const exists = await Bun.file(abs).exists();
    const okNew = /\.card\.json$/i.test(abs) && (await Bun.file(abs.replace(/\.card\.json$/i, '.md')).exists());
    if (!writable(abs) || !(exists || okNew)) return new Response('Not writable', { status: 403 });
    const tmp = abs + '.rr-tmp';
    await Bun.write(tmp, await req.arrayBuffer());
    await rename(tmp, abs); // whole file or nothing
    return new Response(null, { status: 204 });
  }
  const f = Bun.file(abs);
  if (!abs.startsWith(root + sep) || !(await f.exists())) return new Response('Not found', { status: 404 });
  // x-rr-writable tells the page it can offer File → Save (a PUT back to this URL).
  return new Response(f, { headers: { 'cache-control': 'no-store', ...(writable(abs) ? { 'x-rr-writable': '1' } : {}) } });
}

Bun.serve({ port, hostname: '127.0.0.1', fetch: handle });
try {
  Bun.serve({ port, hostname: '::1', fetch: handle });
} catch {
  // No IPv6 loopback: http://[::1]:port won't answer, the others still do.
}
console.log(`Serving on http://localhost:${port}/ (Ctrl-C to stop)`);
