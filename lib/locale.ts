export type Locale='en'|'fr';
export function localizedPath(path:string,locale:Locale){
  const queryIndex=path.indexOf('?');
  const pathname=queryIndex<0?path:path.slice(0,queryIndex);
  const query=queryIndex<0?'':path.slice(queryIndex);
  const base=pathname.replace(/^\/fr(?=\/|$)/,'')||'/';
  return (locale==='fr'?'/fr'+(base==='/'?'':base):base)+query;
}
export function languageAlternates(path:string){const en=localizedPath(path,'en');return {'en-CA':en,'fr-CA':localizedPath(en,'fr'),'x-default':en};}
