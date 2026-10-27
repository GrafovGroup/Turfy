
import {notFound} from 'next/navigation';
import {ArrowUpRight} from 'lucide-react';
import {products} from '@/lib/products';
import {cities} from '@/lib/locations';
import {pageMetadata} from '@/lib/seo';
import {BreadcrumbSchema} from '@/components/seo';
import {ProductGrid} from '@/components/product-grid';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=products.find(p=>p.slug===slug);return p?pageMetadata(p.name+' — options & quotes',p.summary+' '+p.planningHeading,'/products/'+p.slug):{title:'Product not found',robots:{index:false,follow:false}};}
export default async function ProductPage({params,searchParams}:{params:Promise<{slug:string}>,searchParams:Promise<Record<string,string|string[]|undefined>>}){
 const {slug}=await params;const p=products.find(p=>p.slug===slug);if(!p)notFound();const q=await searchParams;const city=cities.find(c=>c.slug===q.city);
 const href='/quote?product='+p.slug+'&type='+p.type+(city?'&city='+city.slug:'');
 const similar=products.filter(x=>x.slug!==p.slug&&x.application===p.application).slice(0,3).map(x=>x.slug);
 return <main id="main"><BreadcrumbSchema items={[{name:'Home',path:'/'},{name:'Products',path:'/products'},{name:p.name,path:'/products/'+p.slug}]}/><nav className="wrap breadcrumb" aria-label="Breadcrumb"><a href="/products">Products</a> / {p.name}</nav>
 <section className="wrap detail-hero product-hero"><div><span className="eyebrow">{p.kicker}</span><h1>{p.name}</h1><p>{p.summary}</p><a className="button dark" href={href}>Enquire about {p.name.toLowerCase()} <ArrowUpRight size={18}/></a>{city&&<p className="product-small">Project destination: {city.name}, {city.provinceName}.</p>}</div><figure><img src={'/images/'+p.image+'.webp'} alt={'Turf setting for '+p.name}/></figure></section>
 <section className="subsection"><div className="wrap info-grid"><div><h2>{p.introHeading}</h2><p style={{marginTop:24}}>{p.intro}</p></div><div><h2>{p.compareHeading}</h2><ul>{p.points.map(point=><li key={point}>{point}</li>)}</ul></div></div></section>
 <section className="wrap section info-grid"><div><h2>{p.planningHeading}</h2><p style={{marginTop:24}}>{p.planning}</p><div className="action-row"><a className="text-link" href="/plan">Area calculator</a><a className="text-link" href={href}>Request specifications & pricing <ArrowUpRight size={18}/></a></div></div><div><h2>{p.question}</h2><p style={{marginTop:24}}>{p.answer}</p></div></section>
 {similar.length>0&&<section className="wrap related-products"><h2>Related product guides</h2><ProductGrid slugs={similar} city={city?.slug}/></section>}</main>;
}
