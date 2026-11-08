/** Build release assets into dist/. Only this directory is published to Netlify. */
import {mkdir,readFile,writeFile,copyFile,rm} from 'node:fs/promises';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const dist=join(root,'dist');
await rm(dist,{recursive:true,force:true});
await mkdir(join(dist,'icons'),{recursive:true});
const files=['matching.html','matching.css','matching-ui.mjs','matching-engine.mjs','standalone.html','sw.js','manifest.webmanifest','map-v21.mjs','map-v21.css','_headers'];
for(const name of files) await copyFile(join(root,name),join(dist,name));
for(const name of ['icon-192.png','icon-512.png','icon-maskable-512.png']) {
  let src=join(root,'icons',name);
  try {await copyFile(src,join(dist,'icons',name));}
  catch(error){if(error.code!=='ENOENT')throw error;await copyFile(join(root,name),join(dist,'icons',name));}
}
let index=await readFile(join(root,'index.html'),'utf8');
if(!index.includes('id="deutschland"') || !index.includes('</head>') || !index.includes('</body>')) throw new Error('Unerwartete HTML-Struktur: Build abgebrochen');
index=index.replace('Energiewende · V1</title>','Energiewende · V2.1</title>')
  .replace('Erste Kolleg:innen-Version · V1','Kolleg:innen-Version · V2.1 · 07.11.2026')
  .replace('Kolleg:innen-Version V1','Kolleg:innen-Version V2.1')
;
if(!index.includes('map-v21.css')) index=index.replace('</head>','  <link rel="stylesheet" href="./map-v21.css">\n</head>');
if(!index.includes('map-v21.mjs')) index=index.replace('</body>','  <script type="module" src="./map-v21.mjs"></script>\n</body>');
await writeFile(join(dist,'index.html'),index,'utf8');
console.log('Energiebrücken V2.1: dist/ mit '+(files.length+4)+' Website-Dateien erstellt.');
