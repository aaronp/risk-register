#!/usr/bin/env node
// risk-register <risks.md>: serves the viewer and that file on localhost, then opens it in the browser.
// The file is re-read on every request, so reloading shows your latest edits; File → Save writes it back (PUT).
// risk-register card <risks.md> [out-dir]: writes card.json, the register as a dashboard card (out-dir defaults to the file's folder).
// risk-register badge <risks.md> [out-dir]: writes badge.svg, drawn from the same card.
// Both read the optional sidecar <name>.card.json beside the markdown (title, kind, legend labels, colours).
// The card's links open the viewer at RR_HOST (default https://aaronp.github.io/risk-register/) with ?src=RR_SRC,
// where RR_SRC is where the published markdown lives (default: the path given, relative to RR_HOST).
import { createServer } from 'node:http';
import { readFile, rename, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { basename, dirname, join, resolve } from 'node:path';
import vm from 'node:vm';

const pkg = (p) => new URL('../' + p, import.meta.url);
const sidecarOf = (md) => md.replace(/\.md$/i, '') + '.card.json';

/** The page's own script (index.html), run outside a browser for its parser, buildCard and badgeSvg. */
async function pageScript() {
  const html = await readFile(pkg('index.html'), 'utf8');
  const start = html.indexOf('>', html.indexOf('<script type="text/x-dc"')) + 1;
  const src = html.slice(start, html.indexOf('</script>', start));
  const ctx = vm.createContext({ window: { RR_FILES: [{ name: 'risks.md', text: '' }], RR_THEIRS: null }, DCLogic: class {}, location: { search: '', href: 'http://localhost/' }, URLSearchParams, URL, console });
  vm.runInContext(src + '\n;globalThis.__rr = { buildCard, badgeSvg, parseCardPrefs, packText, unpackText };', ctx);
  return ctx.__rr;
}

const cmd = process.argv[2];
if (cmd === 'card' || cmd === 'badge') {
  const [md, out = dirname(md ?? '')] = process.argv.slice(3);
  if (!md) { console.error(`Usage: risk-register ${cmd} <risks.md> [out-dir]`); process.exit(1); }
  const fail = (where, e) => { console.error(`risk-register: ${where}: ${e.message ?? e}`); process.exit(1); };
  const rr = await pageScript();
  const sidecar = sidecarOf(md);
  let prefs = {};
  try {
    prefs = rr.parseCardPrefs(JSON.parse(await readFile(sidecar, 'utf8')));
  } catch (e) {
    if (e.code !== 'ENOENT') fail(sidecar, e);
  }
  try {
    /* The parser wants a lower-case .md name; it only shows up in error messages. */
    const name = /^[a-z0-9][a-z0-9._-]*\.md$/.test(basename(md)) ? basename(md) : 'risks.md';
    const today = new Date().toLocaleDateString('en-CA');
    const c = rr.buildCard(name, await readFile(md, 'utf8'), prefs, today, { label: md, src: process.env.RR_SRC || md }, process.env.RR_HOST || undefined);
    const [file, body] = cmd === 'card' ? ['card.json', JSON.stringify(c, null, 2) + '\n'] : ['badge.svg', rr.badgeSvg(c)];
    await writeFile(join(out, file), body);
    console.log(`Wrote ${join(out, file)}`);
  } catch (e) {
    fail(md, e);
  }
  process.exit(0);
}

const file = cmd;
if (!file || file === '-h' || file === '--help') {
  console.error('Usage: risk-register <risks.md>   (PORT=8000 to pick the port, NO_OPEN=1 to skip opening a browser)');
  console.error('       risk-register card <risks.md> [out-dir]    (writes card.json)');
  console.error('       risk-register badge <risks.md> [out-dir]   (writes badge.svg)');
  process.exit(file ? 0 : 1);
}
const path = resolve(file);
await readFile(path).catch((e) => { console.error(`risk-register: cannot read ${file}: ${e.message}`); process.exit(1); });

const route = '/' + encodeURIComponent(basename(path));
const sidecar = sidecarOf(path);
const sidecarRoute = '/' + encodeURIComponent(basename(sidecar));
/* Only these routes, so nothing else on disk is reachable. [path, type, writable] */
const routes = new Map([
  ['/', [pkg('index.html'), 'text/html']],
  ['/support.js', [pkg('support.js'), 'text/javascript']],
  ['/vendor/react.js', [pkg('vendor/react.js'), 'text/javascript']],
  ['/vendor/react-dom.js', [pkg('vendor/react-dom.js'), 'text/javascript']],
  [route, [path, 'text/markdown', true]],
  [sidecarRoute, [sidecar, 'application/json', true]],
]);
// Loopback names a browser may use for this server. Anything else in Host means DNS rebinding, so it is refused.
const hosts = (port) => new Set([`127.0.0.1:${port}`, `localhost:${port}`, `[::1]:${port}`]);
const handler = async (req, res) => {
  if (!hosts(server.address().port).has(req.headers.host)) return res.writeHead(403).end('Forbidden host');
  const hit = routes.get(new URL(req.url, 'http://x').pathname);
  if (!hit) return res.writeHead(404).end('Not found');
  const [target, type, writable] = hit;
  if (req.method === 'PUT' && writable) {
    // Cross-site pages cannot get here: a PUT needs a CORS preflight, which this server never answers.
    try {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      const tmp = `${target}.rr-tmp`;
      await writeFile(tmp, Buffer.concat(chunks));
      await rename(tmp, target); // whole file or nothing, never half-written
      return res.writeHead(204).end();
    } catch (e) {
      return res.writeHead(500).end(e.message);
    }
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') return res.writeHead(405).end('Method not allowed');
  try {
    const body = await readFile(target);
    // x-rr-writable tells the viewer it can offer File → Save (a PUT back to this URL).
    res.writeHead(200, { 'content-type': `${type}; charset=utf-8`, 'cache-control': 'no-store', ...(writable ? { 'x-rr-writable': '1' } : {}) }).end(body);
  } catch (e) {
    res.writeHead(e.code === 'ENOENT' ? 404 : 500).end(e.message);
  }
};
const server = createServer(handler);

server.listen(Number(process.env.PORT ?? 0), '127.0.0.1', () => {
  const { port } = server.address();
  // Also answer on ::1 so http://localhost:<port> works where it resolves to IPv6; skipped if IPv6 loopback is unavailable.
  createServer(handler).on('error', () => {}).listen(port, '::1');
  const url = `http://127.0.0.1:${port}/?src=${route.slice(1)}`;
  console.log(`Serving ${file} at ${url}  (Ctrl-C to stop)`);
  if (process.env.NO_OPEN) return;
  const [opener, args] = process.platform === 'darwin' ? ['open', [url]] : process.platform === 'win32' ? ['cmd', ['/c', 'start', '', url]] : ['xdg-open', [url]];
  spawn(opener, args, { stdio: 'ignore', detached: true }).on('error', () => {}).unref();
});
