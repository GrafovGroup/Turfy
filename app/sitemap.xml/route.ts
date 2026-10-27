import {cities} from '@/lib/locations';
import {products} from '@/lib/products';
import {collections} from '@/lib/collections';
import {origin} from '@/lib/seo';
export function GET(){const paths=['/','/collections','/rentals','/installation','/plan','/privacy','/products','/locations',...collections.map(c=>'/collections/'+c.slug),...products.map(p=>'/products/'+p.slug),...cities.map(c=>'/locations/'+c.slug)];const xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>'<url><loc>'+origin+p+'</loc></url>').join('')+'</urlset>';return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600'}});}
