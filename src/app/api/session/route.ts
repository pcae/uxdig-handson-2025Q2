import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getAuth } from 'firebase-admin/auth'
import { z } from 'zod'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { setSession } from '@/lib/auth/session'
import { expiresCookie } from '@/constants/globals'

const loginSchema = z.object({
  idToken: z.string(),
})
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  const result = loginSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: '無効なリクエスト' }, { status: 400 })
  }

  try {
    const { idToken } = result.data

    // Firebase IDトークンをセッションCookieに変換
    const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn: expiresCookie })
    await setSession(sessionCookie)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function DELETE(request: Request) {
  const cookiesStore = await cookies()
  cookiesStore.delete('session')
  return NextResponse.json({ success: true }, { status: 200 })
}
