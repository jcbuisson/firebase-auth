import { initializeApp } from "firebase/app"
// import { getAuth, signInWithPopup,
//    GoogleAuthProvider,
//    GithubAuthProvider, 
//    FacebookAuthProvider,
//    signOut, getIdToken } from "firebase/auth"
import { getAuth } from "firebase/auth"
   
// Your Firebase config (replace with your own)
const firebaseConfig = {
   // apiKey: process.env.VITE_APP_API_KEY,
   // authDomain: process.env.VITE_APP_AUTH_DOMAIN,
   // projectId: process.env.VITE_APP_PROJECT_ID,
   apiKey: "AIzaSyC1CzDrA_ZMO86Bjm1AFXPk8-ALat28QgU",
   authDomain: "jcb-auth.firebaseapp.com",
   projectId: "jcb-auth",
   storageBucket: "jcb-auth.firebasestorage.app",
   messagingSenderId: "750051088238",
   appId: "1:750051088238:web:302648cae359089ffa537f",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
