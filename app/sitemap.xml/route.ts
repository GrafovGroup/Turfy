import {cities} from '@/lib/locations';
import {products} from '@/lib/products';
import {collections} from '@/lib/collections';
import {origin} from '@/lib/seo';
import {localizedPath} from '@/lib/locale';
export function GET(){const paths=['/','/collections','/rentals','/installation','/plan','/privacy','/products','/locations',...collections.map(c=>'/collections/'+c.slug),...products.map(p=>'/products/'+p.slug),...cities.map(c=>'/locations/'+c.slug)];const xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+paths.flatMap(p=>{const en=origin+p,fr=origin+localizedPath(p,'fr');const links='<xhtml:link rel="alternate" hreflang="en-CA" href="'+en+'"/><xhtml:link rel="alternate" hreflang="fr-CA" href="'+fr+'"/><xhtml:link rel="alternate" hreflang="x-default" href="'+en+'"/>';return[en,fr].map(url=>'<url><loc>'+url+'</loc>'+links+'</url>');}).join('')+'</urlset>';return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600'}});}
