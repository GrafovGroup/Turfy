
import {notFound} from 'next/navigation';
import {ArrowUpRight} from 'lucide-react';
import {cities} from '@/lib/locations';
import {pageMetadata} from '@/lib/seo';
import {BreadcrumbSchema} from '@/components/seo';
import {ProductGrid} from '@/components/product-grid';
export async function generateMetadata({params}:{params:Promise<{city:string}>}){const {city}=await params;const c=cities.find(x=>x.slug===city);return c?pageMetadata('Artificial turf in '+c.name+' — sales & rentals',c.planning,'/locations/'+c.slug):{title:'City not found',robots:{index:false,follow:false}};}
export default async function CityPage({params}:{params:Promise<{city:string}>}){
 const {city}=await params;const c=cities.find(x=>x.slug===city);if(!c)notFound();const nearby=cities.filter(x=>x.province===c.province&&x.slug!==c.slug).slice(0,5);
 return <main id="main"><BreadcrumbSchema items={[{name:'Home',path:'/'},{name:'Canadian cities',path:'/locations'},{name:c.name,path:'/locations/'+c.slug}]}/><nav className="wrap breadcrumb" aria-label="Breadcrumb"><a href="/locations">Canadian cities</a> / {c.provinceName} / {c.name}</nav>
 <section className="wrap city-hero"><div><span className="eyebrow">Turfy · {c.provinceName}</span><h1>Artificial turf<br/>in {c.name}.</h1><p className="lede">{c.planning}</p><div className="action-row"><a href={'/quote?type=sales&city='+c.slug} className="button dark">Plan my {c.name} project <ArrowUpRight size={18}/></a></div></div><aside className="city-summary"><span className="eyebrow">Your project brief</span><h2>{c.focus}</h2><p>{c.prompt}</p><a href={'/quote?city='+c.slug}>Start an enquiry <ArrowUpRight size={16}/></a></aside></section>
 <section className="subsection"><div className="wrap info-grid"><div><span className="eyebrow">Working out the details</span><h2 style={{marginTop:20}}>{c.logisticsHeading}</h2></div><div><p>{c.logistics}</p><div className="action-row"><a className="text-link" href={'/quote?type=rental&city='+c.slug}>Rental enquiry</a><a className="text-link" href={'/quote?type=installation&city='+c.slug}>Installation enquiry</a><a className="text-link" href="/plan">Calculate area</a></div></div></div></section>
 <section className="wrap section"><div className="section-heading"><h2>Explore materials<br/>for your {c.name} brief.</h2></div><ProductGrid slugs={c.products} city={c.slug}/></section>
 {nearby.length>0&&<nav className="wrap related-cities" aria-label={'Other guides in '+c.provinceName}><h2>Elsewhere in {c.provinceName}</h2><div className="city-links">{nearby.map(x=><a href={'/locations/'+x.slug} key={x.slug}>{x.name}<ArrowUpRight size={18}/></a>)}</div><a className="text-link" href="/locations">All Canadian city guides</a></nav>}</main>;
}
