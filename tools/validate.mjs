// Vérifie meta.json avec exactement les mêmes règles que l'extension.
// Usage : node tools/validate.mjs [meta.json]
import { readFileSync } from 'node:fs';
import { validateMetaConfig } from './lib/metaConfig.js';

const file = process.argv[2] || 'meta.json';
let raw;
try { raw = JSON.parse(readFileSync(file, 'utf8')); }
catch (e) { console.error(`✗ ${file} n'est pas un JSON valide : ${e.message}`); process.exit(1); }
const v = validateMetaConfig(raw);
if (!v.ok) { console.error(`✗ ${file} refusé :\n - ${v.errors.join('\n - ')}`); process.exit(1); }
const c = v.config;
console.log(`✓ ${file} valide — mis à jour le ${c.updated}, ${c.formations.length} formations, ${(c.playerBoosts || []).length} joueurs en vogue, ${c.sources.length} sources.`);
