import {notFound} from 'next/navigation';
import {GuideArticle} from '@/components/guides';
import {guides} from '@/lib/guides';
import {pageMetadata} from '@/lib/seo';
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props){const {slug}=await params;const g=guides.find(x=>x.slug===slug);return g?pageMetadata(g.en.title,g.en.summary,'/guides/'+slug):{title:'Not found',robots:{index:false}}}
export default async function Page({params}:Props){const {slug}=await params;if(!guides.some(x=>x.slug===slug))notFound();return <GuideArticle slug={slug}/>}
