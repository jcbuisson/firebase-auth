<script setup>
import { ref, onMounted } from "vue"
import { auth, logOut, getUserToken,
   signInWithGoogle, signInWithFacebook, signInWithGithub, signInWithApple, signInWithMicrosoft } from "./firebase"

import ReloadPrompt from '/src/components/ReloadPrompt.vue'
import GithubLink from '/src/components/GithubLink.vue'

const user = ref(null)
const data = ref()
const dataError = ref(false)

onMounted(() => {
   auth.onAuthStateChanged(async (user_) => {
      user.value = user_
      data.value = ""
      if (user_) {
         const token = await getUserToken()
         localStorage.setItem("firebase-token", token)
      }
   })
})

function signOut() {
   logOut()
   localStorage.removeItem('firebase-token')
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
      data.value = await res.json()
      dataError.value = false
   } catch(err) {
      data.value = "error"
      dataError.value = true
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
      <button @click="notImplemented" class="btn twitter"><i class="fab fa-x"></i> Sign in with X</button>
      <button @click="signInWithGithub" class="btn github"><i class="fab fa-github"></i> Sign in with Github</button>
      <button @click="notImplemented" class="btn email"><i class="fas fa-envelope"></i> Sign in with email</button>
      <button @click="notImplemented" class="btn phone"><i class="fas fa-phone"></i> Sign in with phone</button>
      <button @click="notImplemented" class="btn apple"><i class="fab fa-apple"></i> Sign in with Apple</button>
      <button @click="notImplemented" class="btn microsoft"><i class="fab fa-microsoft"></i> Sign in with Microsoft</button>
   </div>

   <div v-else>
      <button @click="signOut">Logout</button>
      <p>Hello, {{ user.displayName }}</p>
      <img :src="user.photoURL" v-if="user.photoURL" class="profile-img" />

      <div class="table-container">
         <table>
            <thead>
               <tr>
                     <th>Key</th>
                     <th>Value</th>
               </tr>
            </thead>
            <tbody>
               <template v-for="key of ['uid', 'email', 'emailVerified', 'displayName', 'photoURL', 'metadata']">
                  <tr>
                     <td>{{ key }}</td>
                     <td>{{ user[key] }}</td>
                  </tr>
               </template>
            </tbody>
         </table>
      </div>

   </div>

   <div>
      <button class="btn google mt-2" @click="getProtectedData">Fetch protected data</button>
      <p class="{ error: dataError }">{{ data }}</p>
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
   /* width: 300px; */
}

.profile-img {
   width: 50px;
   height: 50px;
   border-radius: 50%;
   margin-top: 10px;
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

.apple {
   background: #24292e;
}

.microsoft {
   background: #24292e;
}

.email {
   background: #d9534f;
}

.phone {
   background: #28a745;
}

.mt-2 {
   margin-top: 20px;
}

.table-container {
   max-width: 800px;
   margin: 0 auto;
   background: white;
   border-radius: 8px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   overflow: hidden;
}

table {
   width: 100%;
   border-collapse: collapse;
}

th, td {
   text-align: left;
   padding: 12px;
   border-bottom: 1px solid #ddd;
}

thead th {
   background-color: #f7f7f7;
   font-weight: bold;
}

th[colspan="4"] {
   background-color: #e9ecef;
   font-weight: bold;
   text-align: left;
}

</style>
