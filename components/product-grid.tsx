
import {ArrowUpRight} from 'lucide-react';
import {products} from '@/lib/products';

// Product photographs and descriptive copy belong to their detail page only.
export function ProductGrid({slugs,city}:{slugs?:string[],city?:string}) {
  const list=slugs?slugs.map(s=>products.find(p=>p.slug===s)).filter((p):p is typeof products[number]=>!!p):products;
  return <div className="product-link-grid">{list.map((p,i)=><a className="product-directory-link" key={p.slug} href={'/products/'+p.slug+(city?'?city='+city:'')}><span className="directory-number">{String(i+1).padStart(2,'0')}</span><h3>{p.name}</h3><ArrowUpRight size={23}/></a>)}</div>;
}
