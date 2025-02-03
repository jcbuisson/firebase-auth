<script setup>
import { ref, onMounted } from "vue"
import { auth, signInWithGoogle, signInWithFacebook, signInWithGithub, logOut, getUserToken } from "./firebase"

import ReloadPrompt from '/src/components/ReloadPrompt.vue'
import GithubLink from '/src/components/GithubLink.vue'

const user = ref(null)

onMounted(() => {
   auth.onAuthStateChanged(async (user_) => {
      user.value = user_
      if (user_) {
         const token = await getUserToken()
         localStorage.setItem("firebase-token", token)

         // console.log("Sending JWT authentication token to backend", token)
         // await fetch("/auth", {
         //    method: "POST",
         //    headers: { "Content-Type": "application/json" },
         //    body: JSON.stringify({ token }),
         // })
      }
   })
})

function signOut() {
   logOut()
   localStorage.removeItem(firebase-token)
}

function notImplemented() {
   alert("Not implemented")
}

async function getProtectedData() {
   const jwt = localStorage.getItem("firebase-token")
   try {
      const res = await fetch("/api", {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
         },
      })
      const val = await res.json()
      console.log('val', val)
   } catch(err) {
      console.log('err', err)
   }
}
</script>

<template>
   <GithubLink url="https://github.com/jcbuisson/firebase-auth" svgPath="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></GithubLink>

   <ReloadPrompt></ReloadPrompt>

   <h1>Firebase Authentication</h1>

   <div class="container" v-if="!user">
      <button @click="signInWithGoogle" class="btn google"><i class="fab fa-google"></i> Sign in with Google</button>
      <button @click="signInWithFacebook" class="btn facebook"><i class="fab fa-facebook-f"></i> Sign in with Facebook</button>
      <button @click="notImplemented" class="btn twitter"><i class="fab fa-twitter"></i> Sign in with Twitter</button>
      <button @click="signInWithGithub" class="btn github"><i class="fab fa-github"></i> Sign in with Github</button>
      <button @click="notImplemented" class="btn email"><i class="fas fa-envelope"></i> Sign in with email</button>
      <button @click="notImplemented" class="btn phone"><i class="fas fa-phone"></i> Sign in with phone</button>
   </div>

   <div v-else>
      <button @click="signOut">Logout</button>
      <p>Hello, {{ user.displayName }}</p>
      <p>{{ user }}</p>
   </div>

   <div>
      <button class="btn google" @click="getProtectedData">Fetch protected data</button>
   </div>

</template>

<style scoped>
body {
   font-family: Arial, sans-serif;
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100vh;
   background: #f5f5f5;
}

.container {
   display: flex;
   flex-direction: column;
   gap: 10px;
   width: 300px;
}

.btn {
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 16px;
   font-weight: bold;
   border: none;
   padding: 12px;
   border-radius: 5px;
   cursor: pointer;
   color: white;
   transition: 0.3s;
   width: 100%;
}

.btn i {
   font-size: 20px;
   margin-right: 10px;
}

.btn:hover {
  border-color: #646cff;
}
.btn:focus,
.btn:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.google {
   background: #fff;
   color: black;
   border: 1px solid #ccc;
}

.google i {
   color: #DB4437;
}

.facebook {
   background: #3b5998;
}

.twitter {
   background: #1da1f2;
}

.github {
   background: #24292e;
}

.email {
   background: #d9534f;
}

.phone {
   background: #28a745;
}
</style>
