import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const htmlFiles = [
  'index.html',
  'whatsapp-sanal-numara.html',
  'sanal-numara-fiyatlari.html',
  'sms-kodu-gelmiyor.html',
  'onay-merkezi-guvenilir-mi.html',
  'sanal-numara-iban-ile-odeme.html',
  'sms-onay.html',
  'turkiye-sanal-numara.html',
  'whatsapp-business-sanal-numara.html',
  'telegram-instagram-sms-onay.html',
  'ucretsiz-vs-ucretli-sanal-numara.html',
];

let jsonLdBlocks = 0;
for (const file of htmlFiles) {
  const html = readFileSync(resolve(root, file), 'utf8');
  const blocks = html.matchAll(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script\s*>/gi,
  );

  for (const [, json] of blocks) {
    try {
      JSON.parse(json);
    } catch (error) {
      throw new Error(`${file}: invalid JSON-LD: ${error.message}`);
    }
    jsonLdBlocks += 1;
  }
}

assert.ok(jsonLdBlocks > 0, 'Expected at least one JSON-LD block in the SEO pages.');

const indexHtml = readFileSync(resolve(root, 'index.html'), 'utf8');
assert.match(
  indexHtml,
  /<title>Onaymerkezi \| WhatsApp Sanal Numara Al &amp; Anında SMS Onay — 15 TL'den<\/title>/,
  'The existing homepage SEO title must remain unchanged.',
);

console.log(`Validated ${jsonLdBlocks} JSON-LD block(s) across ${htmlFiles.length} pages.`);
console.log('Homepage SEO title and all 10 SEO page files are preserved.');
