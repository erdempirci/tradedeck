import { NextRequest, NextResponse } from 'next/server'

export async function POST(req:NextRequest){
 const token=req.headers.get('x-collector-token')
 if(!process.env.COLLECTOR_TOKEN || token!==process.env.COLLECTOR_TOKEN){
  return NextResponse.json({ok:false,error:'unauthorized'},{status:401})
 }
 const payload=await req.json()
 console.log('collector payload',JSON.stringify(payload).slice(0,8000))
 return NextResponse.json({ok:true,receivedAt:new Date().toISOString()})
}
