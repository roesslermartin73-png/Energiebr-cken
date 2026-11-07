export const SKILLS = Object.freeze(['energieberatung','waermeplanung','photovoltaik','waermepumpen','sanierung','elektrotechnik','foerdermittel','projektmanagement']);
export function cleanText(value, max=80) { return typeof value === 'string' ? value.normalize('NFKC').trim().slice(0,max) : ''; }
export function validateQuery(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Ungueltige Suchanfrage');
  const skills = input.skills;
  if (!Array.isArray(skills) || skills.length < 1 || skills.length > 5 || skills.some(s => !SKILLS.includes(s))) throw new Error('Ungueltige Fachgebiete');
  const region = cleanText(input.region, 40);
  if (input.region !== undefined && (typeof input.region !== 'string' || input.region.length > 40)) throw new Error('Ungueltige Region');
  return {skills:[...new Set(skills)],region};
}
export function rankProfiles(profiles, query) {
  const q=validateQuery(query);
  return profiles.filter(p=>p.visibility==='public' && p.approved===true).map(p=>{
    const hits=q.skills.filter(s=>p.skills.includes(s));
    const regionMatch=!!q.region && p.region.toLocaleLowerCase('de')===q.region.toLocaleLowerCase('de');
    return {id:p.id,displayName:p.displayName,organization:p.organization,region:p.region,skills:p.skills,score:hits.length*10+(regionMatch?3:0),reasons:[...hits.map(s=>`Fachgebiet: ${s}`),...(regionMatch?['Region passt']:[])]};
  }).filter(p=>p.score>0).sort((a,b)=>b.score-a.score || a.id.localeCompare(b.id)).slice(0,20);
}
export const DEMO_PROFILES=Object.freeze([
  {id:'demo-01',displayName:'Demoprofil Wärmeplanung',organization:'Fiktive Kommune Nord',region:'Hessen',skills:['waermeplanung','projektmanagement'],visibility:'public',approved:true},
  {id:'demo-02',displayName:'Demoprofil Energieberatung',organization:'Fiktives Ingenieurbüro',region:'Bayern',skills:['energieberatung','sanierung','foerdermittel'],visibility:'public',approved:true},
  {id:'demo-03',displayName:'Privates Testprofil',organization:'Nur intern',region:'Hessen',skills:['waermeplanung'],visibility:'private',approved:true},
  {id:'demo-04',displayName:'Ungeprüftes Testprofil',organization:'Nicht freigegeben',region:'Hessen',skills:['waermeplanung'],visibility:'public',approved:false}
]);
