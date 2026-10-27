
import {ProductCards} from './visual-cards';
import {products} from '@/lib/products';


export function ProductGrid({slugs,city}:{slugs?:string[],city?:string}) {
  const list=slugs?slugs.map(s=>products.find(p=>p.slug===s)).filter((p):p is typeof products[number]=>!!p):products;
  return <ProductCards items={list} city={city}/>;
}
