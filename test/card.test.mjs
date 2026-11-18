// npm test: the CLI's card and badge on the example register, and share-link packing.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import vm from 'node:vm';

const cli = (...args) => spawnSync('node', ['bin/risk-register.mjs', ...args], { encoding: 'utf8' });
const example = 'examples/acme-risks/risks.md';

test('card.json counts open entries by band and badge.svg draws them', () => {
  const out = mkdtempSync(join(tmpdir(), 'rr-'));
  assert.equal(cli('card', example, out).status, 0);
  assert.equal(cli('badge', example, out).status, 0);
  const card = JSON.parse(readFileSync(join(out, 'card.json'), 'utf8'));
  assert.equal(card.version, 1);
  assert.deepEqual(card.legend.map((l) => l.id), ['low', 'medium', 'high', 'critical']);
  assert.equal(Object.values(card.report).reduce((a, b) => a + b, 0), Number(card.heading.primary));
  assert.match(card.source.url, /^https:\/\/aaronp\.github\.io\/risk-register\/\?src=examples\/acme-risks\/risks\.md$/);
  const svg = readFileSync(join(out, 'badge.svg'), 'utf8');
  for (const l of card.legend) if (card.report[l.id] > 0) assert.ok(svg.includes(`${l.label} ${card.report[l.id]}`));
});

test('the sidecar renames and filters; a bad one fails', () => {
  const dir = mkdtempSync(join(tmpdir(), 'rr-'));
  copyFileSync(example, join(dir, 'risks.md'));
  writeFileSync(join(dir, 'risks.card.json'), JSON.stringify({ kind: 'opportunity', title: 'Upside', legend: [{ id: 'critical', label: 'Big' }] }));
  assert.equal(cli('card', join(dir, 'risks.md')).status, 0);
  const card = JSON.parse(readFileSync(join(dir, 'card.json'), 'utf8'));
  assert.equal(card.title, 'Upside');
  assert.deepEqual(card.legend.map((l) => l.label), ['Big']);
  assert.match(card.source.url, /&kind=opportunity$/);
  writeFileSync(join(dir, 'risks.card.json'), '{"legend":[{"id":"severe"}]}');
  const r = cli('card', join(dir, 'risks.md'));
  assert.equal(r.status, 1);
  assert.match(r.stderr, /legend\[0\]\.id/);
});

test('share links round-trip, and the loader unpacks what the page packs', async () => {
  const html = readFileSync('index.html', 'utf8');
  const start = html.indexOf('>', html.indexOf('<script type="text/x-dc"')) + 1;
  const ctx = vm.createContext({ window: { RR_FILES: [{ name: 'risks.md', text: '' }] }, DCLogic: class {}, location: { search: '', href: 'http://x/' }, URLSearchParams, URL, TextEncoder, TextDecoder, Blob, Response, CompressionStream, DecompressionStream, btoa, atob, Uint8Array });
  vm.runInContext(html.slice(start, html.indexOf('</script>', start)) + ';globalThis.__rr = { packText, unpackText };', ctx);
  const md = readFileSync(example, 'utf8');
  const packed = await ctx.__rr.packText(md);
  assert.match(packed, /^[A-Za-z0-9_-]+$/);
  assert.equal(await ctx.__rr.unpackText(packed), md);
  /* The loader's own copy, as in the page. */
  const loader = /const unpack = async \(p\) => \{[\s\S]*?\n {2}\};/.exec(html)[0];
  const unpack = new Function(loader + '\nreturn unpack;')();
  assert.equal(await unpack(packed), md);
  await assert.rejects(unpack(packed.slice(0, 40)), /damaged or incomplete/);
});
