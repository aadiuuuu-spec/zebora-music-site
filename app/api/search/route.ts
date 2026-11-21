import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';
export async function GET(request: NextRequest) {
 const query = request.nextUrl.searchParams.get('q')?.trim();
 if (!query || query.length < 2) return NextResponse.json({ items: [] });
 if (query.length > 100) return NextResponse.json({ error: 'Search query is too long.' }, { status: 400 });
 const key = process.env.YOUTUBE_API_KEY;
 if (!key) return NextResponse.json({ error: 'YouTube search is not configured yet. Add YOUTUBE_API_KEY in Vercel Environment Variables.' }, { status: 503 });
 const url = new URL('https://www.googleapis.com/youtube/v3/search');
 url.search = new URLSearchParams({ part:'snippet',type:'video',maxResults:'12',q:query,safeSearch:'moderate',videoEmbeddable:'true',key }).toString();
 try { const response = await fetch(url,{next:{revalidate:60}}); const data = await response.json(); if (!response.ok) return NextResponse.json({error:data?.error?.message||'YouTube search failed.'},{status:response.status});
 const items = (data.items ?? []).flatMap((item:any) => { const videoId=item.id?.videoId; if(!videoId)return[]; return [{id:videoId,title:item.snippet?.title??'Unknown title',channel:item.snippet?.channelTitle??'YouTube',thumbnail:item.snippet?.thumbnails?.high?.url??item.snippet?.thumbnails?.medium?.url??'',publishedAt:item.snippet?.publishedAt??''}]; }); return NextResponse.json({items});
 } catch { return NextResponse.json({error:'Could not reach YouTube. Please try again.'},{status:502}); }
}
