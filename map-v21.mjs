/* Energiebrücken 2.1: Interaktive Konzeptkarte, keine Mitglieder-/Geodaten. */
const NS = 'http://www.w3.org/2000/svg';
const regions = [
  {name:'Schleswig-Holstein', x:237, y:76, topics:['waerme','strom'], tags:['Kommunale Wärme','Wind & Strom'], question:'Welche lokale Energiefrage könnte eine Kommune mit Fachleuten gemeinsam klären?'},
  {name:'Hamburg', x:241, y:125, topics:['gebaeude','digital'], tags:['Gebäudebestand','Digitalisierung'], question:'Welches Gebäudeprojekt profitiert von einem gemeinsamen Fachteam?'},
  {name:'Mecklenburg-Vorpommern', x:313, y:110, topics:['strom','waerme'], tags:['Erneuerbare','Wärmenetze'], question:'Wie werden Erzeugung und lokale Wärmenutzung sinnvoll verbunden?'},
  {name:'Bremen', x:179, y:150, topics:['industrie','strom'], tags:['Industrie','Strom'], question:'Welcher betriebliche Energiebedarf könnte zum Pilotprojekt werden?'},
  {name:'Niedersachsen', x:198, y:205, topics:['industrie','strom'], tags:['Gewerbe','Erneuerbare'], question:'Wie können Betrieb und Kommune einen umsetzbaren Effizienztest starten?'},
  {name:'Berlin', x:347, y:180, topics:['gebaeude','digital'], tags:['Gebäude','Software'], question:'Welche digitale Hilfe erleichtert die Umsetzung im Gebäudebestand?'},
  {name:'Brandenburg', x:331, y:228, topics:['waerme','strom'], tags:['Wärmeplanung','Erneuerbare'], question:'Welche Wärme- oder Stromfrage braucht mehrere Projektpartner?'},
  {name:'Sachsen-Anhalt', x:260, y:267, topics:['industrie','waerme'], tags:['Abwärme','Wärme'], question:'Wo könnte eine fachübergreifende Abwärme-Idee geprüft werden?'},
  {name:'Nordrhein-Westfalen', x:134, y:291, topics:['industrie','gebaeude'], tags:['Industrie','Sanierung'], question:'Welcher Effizienzbedarf braucht Beratung, Handwerk und Betriebe?'},
  {name:'Thüringen', x:275, y:325, topics:['gebaeude','waerme'], tags:['Sanierung','Kommunen'], question:'Welche Sanierungsfrage kann mit einem kleinen Team bearbeitet werden?'},
  {name:'Sachsen', x:341, y:314, topics:['digital','industrie'], tags:['Technologie','Industrie'], question:'Welche technische Lösung könnte mit regionalen Pilotpartnern getestet werden?'},
  {name:'Hessen', x:198, y:349, topics:['waerme','digital','industrie'], tags:['Rhein-Main-Startpunkt','Beratung','Handwerk','Industrie'], question:'Welche konkrete Zusammenarbeit können wir in Rhein-Main als erstes ausprobieren?'},
  {name:'Rheinland-Pfalz', x:153, y:384, topics:['gebaeude','waerme'], tags:['Sanierung','Wärme'], question:'Welcher Projektansatz verbindet Beratung, Kommune und Handwerk?'},
  {name:'Saarland', x:115, y:409, topics:['industrie','gebaeude'], tags:['Betriebe','Gebäude'], question:'Welche kleine Energieeffizienz-Maßnahme wäre gemeinsam testbar?'},
  {name:'Baden-Württemberg', x:206, y:453, topics:['industrie','digital'], tags:['Mittelstand','Technik'], question:'Wie lässt sich ein konkretes Energieproblem durch Technik und Praxis lösen?'},
  {name:'Bayern', x:292, y:462, topics:['gebaeude','strom'], tags:['Gebäude','Photovoltaik'], question:'Wer kann ein gemeinsames Pilotprojekt für Gebäudeenergie starten?'}
];
const regionByName = new Map(regions.map(r => [r.name, r]));
const map = document.querySelector('#deutschland .germany-map');
const layout = document.querySelector('#deutschland .map-layout');
if (map && layout) {
  document.title = document.title.replace(/V1\b/, 'V2.1');
  const section = document.getElementById('deutschland');
  section.querySelector('.section-intro').textContent = 'Alle 16 Bundesländer als auswählbare Konzeptregionen entdecken. Themenfilter und regionale Projektideen helfen beim Vernetzen – ohne echte Mitgliederzahlen oder Standortverfolgung.';
  const toolbar = document.createElement('div');
  toolbar.className = 'map-v21-toolbar';
  const regionControl = document.createElement('label');
  regionControl.textContent = 'Bundesland auswählen';
  const regionSelect = document.createElement('select');
  regionSelect.id = 'mapFederalState';
  regionSelect.className = 'field-control';
  regions.map(r => r.name).sort((a,b) => a.localeCompare(b,'de')).forEach(name => {
    const option = document.createElement('option'); option.value = name; option.textContent = name; regionSelect.append(option);
  });
  regionControl.append(regionSelect);
  const topicControl = document.createElement('label');
  topicControl.textContent = 'Thematischer Fokus';
  const topicSelect = document.createElement('select');
  topicSelect.id = 'mapTopic'; topicSelect.className = 'field-control';
  [['alle','Alle Themen'],['waerme','Wärmeplanung'],['gebaeude','Gebäude & Sanierung'],['strom','Strom & Erneuerbare'],['industrie','Industrie & Abwärme'],['digital','Software & Digitalisierung']].forEach(([value,label]) => {
    const option = document.createElement('option'); option.value=value; option.textContent=label; topicSelect.append(option);
  });
  topicControl.append(topicSelect);
  const count = document.createElement('p'); count.className='map-v21-count'; count.id='mapRegionCount'; count.setAttribute('role','status');
  toolbar.append(regionControl,topicControl,count);
  layout.before(toolbar);
  const legend = section.querySelector('.map-legend');
  legend.textContent = '16 Bundesländer · schematische Positionen · Auswahl per Tippen oder Tastatur';
  section.querySelector('.map-disclaimer').textContent = 'Konzeptkarte V2.1: Positionen sind schematisch und keine amtlichen Bundeslandgrenzen. Themen sind unverbindliche Ideen, keine erhobenen Projekte, Mitglieder oder Kennzahlen. Kein GPS, keine Standortübertragung.';
  map.querySelector('#mapTitle').textContent = 'Deutschland: 16 Bundesländer als auswählbare Konzeptregionen';
  map.querySelector('#mapDescription').textContent = 'Schematische, nicht maßstabsgetreue Deutschland-Silhouette mit 16 auswählbaren Bundesländern.';
  map.querySelectorAll('.map-marker').forEach(marker => marker.remove());
  const markerByName = new Map();
  const createSvg = (tag, attrs={}) => { const el=document.createElementNS(NS,tag); Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v))); return el; };
  let chosen = 'Hessen';
  let filter = 'alle';
  let label = createSvg('text', {class:'map-v21-label'});
  regions.forEach(region => {
    const marker = createSvg('g', {class:'map-marker map-v21-marker', tabindex:'0', role:'button', 'data-region':region.name, 'aria-label':region.name+' auswählen', 'aria-pressed':'false'});
    marker.append(createSvg('circle', {class:'marker-halo',cx:region.x,cy:region.y,r:'13'}));
    marker.append(createSvg('circle', {class:'marker-dot',cx:region.x,cy:region.y,r:'6'}));
    const title=createSvg('title');title.textContent=region.name;marker.append(title);
    marker.addEventListener('click',()=>selectRegion(region.name));
    marker.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();selectRegion(region.name);}});
    map.append(marker); markerByName.set(region.name,marker);
  });
  map.append(label);
  const detail = document.querySelector('#deutschland .map-details');
  detail.querySelector('.section-kicker').textContent='Bundesland · Projektideen (Demo)';
  function selectRegion(name) {
    const region=regionByName.get(name);if(!region)return;
    if(filter!=='alle'&&!region.topics.includes(filter)){topicSelect.value='alle';applyFilter();}
    chosen=name;regionSelect.value=name;
    markerByName.forEach((marker,key)=>{const selected=key===name;marker.classList.toggle('selected',selected);marker.setAttribute('aria-pressed',String(selected));});
    label.textContent=name;
    label.setAttribute('x',String(region.x > 290 ? region.x-12 : region.x+12));
    label.setAttribute('y',String(region.y-15));
    label.setAttribute('text-anchor',region.x>290?'end':'start');
    document.getElementById('mapRegionTitle').textContent=name;
    document.getElementById('mapRegionDescription').textContent= name==='Hessen'
      ? 'Rhein-Main ist unser Ausgangspunkt. Die folgenden Schwerpunkte sind Vorschläge zur gemeinsamen Erprobung – noch keine bestätigten Partner oder Aktivitäten.'
      : 'Ideenraum für '+name+'. Hier könnten Fachleute, Kommunen und Unternehmen mögliche Pilotprojekte zusammen entwickeln. Konkrete Kontakte und Bedarfe müssen erst geprüft werden.';
    document.getElementById('mapRegionQuestion').textContent='Leitfrage: '+region.question;
    const tags=document.getElementById('mapTags');tags.replaceChildren();
    region.tags.forEach(tag=>{const el=document.createElement('span');el.textContent=tag;tags.append(el);});
  }
  function applyFilter() {
    filter=topicSelect.value;
    let visible=0;
    regions.forEach(region=>{const matches=filter==='alle'||region.topics.includes(filter);if(matches)visible++;const el=markerByName.get(region.name);el.classList.toggle('map-v21-dimmed',!matches);});
    count.textContent=filter==='alle'?'16 Bundesländer zur Auswahl':visible+' von 16 Konzeptregionen mit diesem Beispielthema';
    if(filter!=='alle'&&!regionByName.get(chosen).topics.includes(filter)){
      const first=regions.find(region=>region.topics.includes(filter));if(first)selectRegion(first.name);
    }
  }
  regionSelect.addEventListener('change',()=>selectRegion(regionSelect.value));
  topicSelect.addEventListener('change',applyFilter);
  const join=document.getElementById('mapJoinButton');
  join.addEventListener('click',event=>{
    event.stopImmediatePropagation();
    document.getElementById('profileRegion').value=chosen;
    document.getElementById('mitmachen').scrollIntoView({behavior:'smooth',block:'start'});
    document.getElementById('profileName').focus({preventScroll:true});
  },true);
  const workshop=document.getElementById('mapWorkshopButton');
  workshop.addEventListener('click',event=>{
    event.stopImmediatePropagation();
    document.getElementById('workshopTheme').value='Netzwerk selbst weiterentwickeln';
    document.getElementById('workshopChallenge').value='Welche fachübergreifende Energiewende-Idee lässt sich in '+chosen+' innerhalb von 90 Tagen als Pilot erproben?';
    document.getElementById('workshopGenerate').click();
    document.getElementById('kreativwerkstatt').scrollIntoView({behavior:'smooth',block:'start'});
  },true);
  selectRegion('Hessen'); applyFilter();
}
