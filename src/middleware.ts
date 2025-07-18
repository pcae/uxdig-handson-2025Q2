import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import routePaths from './constants/paths'
import { setSession } from './lib/auth/session'

const protectedRoutes = '/protected'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get('session')
  const isProtectedRoute = pathname.startsWith(protectedRoutes)

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL(routePaths.signIn, request.url))
  }

  let res = NextResponse.next()

  if (sessionCookie) {
    try {
      await setSession(sessionCookie.value)
    } catch (error) {
      console.error('Error updating session:', error)
      res.cookies.delete('session')
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }
    }
  }

  if (process.env.TARGET === 'Local') return res

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
