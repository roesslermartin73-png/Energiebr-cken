import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const map=readFileSync(new URL('map-v21.mjs',root),'utf8');
const sw=readFileSync(new URL('sw.js',root),'utf8');
test('16 Bundesländer werden angeboten',()=>{
  const states=['Baden-Württemberg','Bayern','Berlin','Brandenburg','Bremen','Hamburg','Hessen','Mecklenburg-Vorpommern','Niedersachsen','Nordrhein-Westfalen','Rheinland-Pfalz','Saarland','Sachsen','Sachsen-Anhalt','Schleswig-Holstein','Thüringen'];
  for(const name of states) assert.ok(map.includes("name:'"+name+"'"),name);
  assert.equal((map.match(/\{name:'/g)||[]).length,16);
});
test('Karte zeigt keine erfundenen Mitgliederzahlen',()=>{
  assert.match(map,/keine erhobenen Projekte, Mitglieder oder Kennzahlen/);
  assert.match(map,/Kein GPS/);
});
test('Alle neuen statischen Dateien sind offline vorgesehen',()=>{
  for(const file of ['map-v21.css','map-v21.mjs','manifest.webmanifest','icons/icon-192.png','matching.html'])assert.ok(sw.includes(file),file);
  assert.match(sw,/v2\.1-static-20261107/);
});
