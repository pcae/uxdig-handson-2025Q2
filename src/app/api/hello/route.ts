// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server'

type Data = {
  name: string
}

export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return NextResponse.json({ name: 'John Doe' })
}
