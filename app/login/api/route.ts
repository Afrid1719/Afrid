import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  console.log('Req', req)
  return NextResponse.json({ success: true })
}
