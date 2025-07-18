import { initializeApp } from 'firebase/app'
import * as firebaseAuths from 'firebase/auth'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
}

const firebaseApp = initializeApp(config)
const firebaseAuth = firebaseAuths.getAuth(firebaseApp)

export { firebaseAuth, firebaseAuths, firebaseApp }
