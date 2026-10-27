export const origin='https://turfy.ca';
const socialImage={url:origin+'/images/backyard.webp',alt:'Artificial turf in a modern backyard'};
export function pageMetadata(title:string,description:string,path:string){return {title,description,alternates:{canonical:path},openGraph:{title:title+' | Turfy.ca',description,url:origin+path,type:'website' as const,siteName:'Turfy.ca',locale:'en_CA',images:[socialImage]},twitter:{card:'summary_large_image' as const,title:title+' | Turfy.ca',description,images:[socialImage.url]}};}
