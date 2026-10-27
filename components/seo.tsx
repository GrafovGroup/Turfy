import {origin} from '@/lib/seo';
export function BreadcrumbSchema({items}:{items:{name:string,path:string}[]}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map((x,i)=>({'@type':'ListItem',position:i+1,name:x.name,item:origin+x.path}))}).replace(/</g,'\u003c')}}/>}
