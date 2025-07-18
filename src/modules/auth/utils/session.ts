import { expiresCookie } from '@/constants/globals'
import { compare, hash } from 'bcryptjs'
import { cookies } from 'next/headers'

const SALT_ROUNDS = 10

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS)
}

export async function comparePasswords(plainTextPassword: string, hashedPassword: string) {
  return compare(plainTextPassword, hashedPassword)
}

export async function setSession(idToken: string) {
  if (!idToken) throw new Error('idToken is required')

  const cookiesStore = await cookies()

  cookiesStore.set('session', idToken, {
    maxAge: expiresCookie,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}
