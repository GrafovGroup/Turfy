import {NextResponse, type NextRequest} from 'next/server';

export function middleware(request:NextRequest) {
  const headers=new Headers(request.headers);
  headers.set('x-turfy-path',request.nextUrl.pathname+request.nextUrl.search);
  headers.set('x-turfy-locale',/^\/fr(?:\/|$)/.test(request.nextUrl.pathname)?'fr':'en');
  return NextResponse.next({request:{headers}});
}
export const config={matcher:['/((?!api|_next|images|brand|favicon|robots.txt|sitemap.xml).*)']};
