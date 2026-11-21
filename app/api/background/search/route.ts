import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';
const allowed=(raw:string)=>{try{const u=new URL(raw);if(u.hostname!=='creativecommons.org')return false;const p=u.pathname.toLowerCase().split('/').filter(Boolean);return (p[0]==='publicdomain'&&p[1]==='zero')||(p[0]==='licenses'&&(p[1]==='by'||p[1]==='by-sa'));}catch{return false;}};
export async function GET(request:NextRequest){
 const q=request.nextUrl.searchParams.get('q')?.trim()||'';if(q.length<2||q.length>100)return NextResponse.json({error:'Enter a search between 2 and 100 characters.'},{status:400});
 const clientId=process.env.JAMENDO_CLIENT_ID;if(!clientId)return NextResponse.json({error:'Background music is not configured. Add JAMENDO_CLIENT_ID in Vercel.'},{status:503});
 const params=new URLSearchParams({client_id:clientId,format:'json',limit:'15',audioformat:'mp32',include:'licenses',search:q});
 try{const response=await fetch('https://api.jamendo.com/v3.0/tracks/?'+params.toString(),{next:{revalidate:60}});const data=await response.json();if(!response.ok||data?.headers?.status!=='success')return NextResponse.json({error:data?.headers?.error_message||'Licensed music search failed.'},{status:502});
 const items=(data.results||[]).filter((x:any)=>x.id&&x.name&&x.audio&&allowed(x.license_ccurl)).map((x:any)=>({id:String(x.id),title:String(x.name),artist:String(x.artist_name||'Unknown artist'),license:String(x.license_ccurl)}));return NextResponse.json({items});
 }catch{return NextResponse.json({error:'Could not reach the licensed music catalog.'},{status:502});}
}
