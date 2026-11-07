import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const root=new URL('../dist/',import.meta.url);
test('Nur Website-Dateien im dist-Verzeichnis',()=>{
  for(const file of ['index.html','map-v21.mjs','map-v21.css','sw.js','matching.html','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png'])assert.ok(existsSync(new URL(file,root)),file);
  for(const file of ['README.md','security.test.mjs','netlify.toml'])assert.equal(existsSync(new URL(file,root)),false,file);
});
test('Startseite lädt Bundesländer-Erweiterung',()=>{
  const html=readFileSync(new URL('index.html',root),'utf8');
  assert.match(html,/Kolleg:innen-Version · V2\.1/);
  assert.match(html,/map-v21\.mjs/);
  assert.match(html,/map-v21\.css/);
});
