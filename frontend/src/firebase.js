import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup, signOut, getIdToken,
   GoogleAuthProvider, GithubAuthProvider,  FacebookAuthProvider, OAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"


const firebaseConfig = {
   apiKey: import.meta.env.VITE_API_KEY,
   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
   projectId: import.meta.env.VITE_PROJECT_ID,
   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
   appId: import.meta.env.VITE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()
const githubProvider = new GithubAuthProvider()
const appleProvider = new OAuthProvider('apple.com')
const microsoftProvider = new OAuthProvider('microsoft.com')

export const signInWithGoogle = async () => {
   const result = await signInWithPopup(auth, googleProvider)
   return result.user
}

export const signInWithFacebook = async () => {
   const result = await signInWithPopup(auth, facebookProvider)
   return result.user
}

export const signInWithGithub = async () => {
   const result = await signInWithPopup(auth, githubProvider)
   return result.user
}

export const signInWithApple = async () => {
   const result = await signInWithPopup(auth, appleProvider)
   return result.user
}

export const signInWithMicrosoft = async () => {
   const result = await signInWithPopup(auth, microsoftProvider)
   return result.user
}

// Get Firebase JWT Auth Token
export const getUserToken = async () => {
   if (!auth.currentUser) return null
   return await getIdToken(auth.currentUser)
}

// Logout
export const logOut = async () => {
   await signOut(auth)
}

export { auth }
