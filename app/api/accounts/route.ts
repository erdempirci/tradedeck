import { NextResponse } from 'next/server'
import { demoAccounts } from '@/lib/demo'
export async function GET(){return NextResponse.json({mode:'demo',accounts:demoAccounts,updatedAt:new Date().toISOString()})}
