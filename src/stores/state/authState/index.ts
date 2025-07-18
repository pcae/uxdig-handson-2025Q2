import { FirebaseError } from 'firebase/app'
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { useGlobalState } from '../globalState'
import { firebaseAuth, firebaseAuths } from './firebase'
import { queryClient } from '@/provider/tanstack'

type User = firebaseAuths.User | null
type InputData = {
  email: string
  password: string
}

const userAtom = atom<User>(null)
const loadingAtom = atom<boolean>(true)

const useAuth = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom)
  const [isAuthenticating, setAuthenticating] = useAtom(loadingAtom)

  const { setError } = useGlobalState()

  // サーバー側の /api/session エンドポイントに対してIDトークンを送信し、セッションCookieを設定する関数
  const createSessionCookie = async () => {
    const user = firebaseAuth.currentUser
    if (!user) {
      throw new Error('ユーザーがサインインしていません。')
    }

    // Firebase IDトークンを取得
    const idToken = await user.getIdToken()

    // APIエンドポイントを呼び出す
    const response = await fetch('/api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ idToken }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`セッション作成に失敗しました: ${errorData.error}`)
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new firebaseAuths.GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account',
      })
      await firebaseAuths.signInWithPopup(firebaseAuth, provider)
      await createSessionCookie()
    } catch (error) {
      const { code, message } = error as FirebaseError
      setError({
        isError: true,
        status: Number(code),
        message: message,
      })
    }
  }

  const signUp = async ({ email, password }: InputData) => {
    try {
      await firebaseAuths.createUserWithEmailAndPassword(firebaseAuth, email, password)
      await createSessionCookie()
      console.log('sign up')
    } catch (error) {
      const { code } = error as FirebaseError
      setError({
        isError: true,
        status: Number(code),
        message: 'アカウントが作成できませんでした。EmailとPasswordを確認してください。',
      })
    }
  }

  const signIn = async ({ email, password }: InputData) => {
    try {
      await firebaseAuths.signInWithEmailAndPassword(firebaseAuth, email, password)
      await createSessionCookie()
      console.log('sign in')
    } catch (error) {
      const { code } = error as FirebaseError
      setError({
        isError: true,
        status: Number(code),
        message: 'サインインできませんでした。EmailとPasswordを確認してください。',
      })
    }
  }

  const signOut = async () => {
    try {
      await firebaseAuths.signOut(firebaseAuth)
      // サーバー側のセッション削除APIを呼び出す
      await fetch('/api/session', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Cookieの送受信を有効にする
      })
      // クライアント側のユーザー状態をクリア
      queryClient.clear()
      setCurrentUser(null)
      console.log('sign out')
    } catch (error) {
      const { code } = error as FirebaseError
      setError({
        isError: true,
        status: Number(code),
        message: 'サインアウトできませんでした。しばらくしてから再度実行してください。',
      })
    }
  }

  useEffect(() => {
    if (!firebaseAuth || !firebaseAuths) return
    const unsubscribe = firebaseAuths.onAuthStateChanged(firebaseAuth, (user: User) => {
      setCurrentUser(user)
      setAuthenticating(false)
    })
    return () => unsubscribe()
  }, [setCurrentUser, setAuthenticating])

  return { currentUser, isAuthenticating, signInWithGoogle, signIn, signOut, signUp }
}

export default useAuth
