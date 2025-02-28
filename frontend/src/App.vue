<script setup>
import { ref, onMounted } from "vue"
import { auth, logOut, getUserToken,
   signInWithGoogle, signInWithFacebook, signInWithGithub, signInWithEmail, signUpWithEmail, resetPassword } from "./firebase"

import ReloadPrompt from '/src/components/ReloadPrompt.vue'
import GithubLink from '/src/components/GithubLink.vue'

const user = ref(null)
const message = ref()
const error = ref(false)
const formData = ref({})

onMounted(() => {
   auth.onAuthStateChanged(async (user_) => {
      user.value = user_
      message.value = ""
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
      message.value = await res.json()
      error.value = false
   } catch(err) {
      message.value = "error"
      error.value = true
   }
}

async function signIn() {
   try {
      await signInWithEmail(formData.value.email, formData.value.password)
   } catch(err) {
      message.value = err.message
   }
}

async function signUp() {
   try {
      await signUpWithEmail(formData.value.email, formData.value.password)
   } catch(err) {
      message.value = err.message
   }
}

async function forgottenPassword() {
   try {
      await resetPassword(formData.value.email)
   } catch(err) {
      message.value = err.message
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
      <button @click="notImplemented" class="btn phone"><i class="fas fa-phone"></i> Sign in with phone</button>
      <button @click="notImplemented" class="btn apple"><i class="fab fa-apple"></i> Sign in with Apple</button>
      <button @click="notImplemented" class="btn microsoft"><i class="fab fa-microsoft"></i> Sign in with Microsoft</button>

      <div class="separator mt-1">
        <span>OU</span>
      </div>
    
      <form @submit.prevent="">
         <div class="form-group mb-2">
            <label for="email">Email</label>
            <div class="input-container">
               <span class="icon">@</span>
               <input type="email" id="email" name="email" v-model="formData.email" placeholder="Ex: abc@example.com" required>
            </div>
         </div>
         <div class="form-group mb-2">
            <label for="password">Mot de passe</label>
            <div class="input-container">
               <span class="icon">🔒</span>
               <input type="password" id="password" name="password" v-model="formData.password" placeholder="********" required>
            </div>
         </div>

         <div cclass="mb-2">
            <button class="mybutton" @click="signIn">Se connecter</button>
            <button class="mybutton" @click="signUp">Créer un compte</button>
            <button class="mybutton" @click="forgottenPassword">Mot de passe oublié</button>
         </div>
      </form>

   </div>

   <div v-else>
      <button class="mybutton" @click="signOut">Logout</button>
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

   <div class="mt-2">
      <button class="btn google" @click="getProtectedData">Fetch protected data</button>
      <p>{{ message }}</p>
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

.mybutton {
   padding: 8px 12px;
   background: #044c408a;
   color: white;
   border: none;
   cursor: pointer;
   border-radius: 5px;
   margin-left: 5px;
   margin-right: 5px;
}
.mybutton:hover {
   background: #555;
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
   background: #ed8f37;
}

.microsoft {
   background: #3872de;
}

.email {
   background: #d9534f;
}

.phone {
   background: #28a745;
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

.separator {
   display: flex;
   align-items: center;
   width: 100%;
}

.separator::before,
.separator::after {
   content: "";
   flex: 1;
   height: 1px;
   background: #ccc;
   margin: 0 10px;
}

.separator span {
   font-size: 14px;
   font-weight: bold;
   color: #666;
   text-transform: uppercase;
}

.login-container {
   text-align: center; /* title text is centered */
   width: 100%;
   max-width: 400px;
   background-color: #fff;
   padding: 20px;
   border-radius: 10px;
   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
   text-align: left; /* labels are left-aligned */
   width: 100%;
}

label {
   display: block;
   font-size: 16px;
   margin-bottom: 8px;
}

.input-container {
   display: flex;
   align-items: center;
   border: 2px solid #4f46e5;
   border-radius: 10px;
   padding: 8px 12px;
}

.input-container .icon {
   font-size: 18px;
   color: #4f46e5;
   margin-right: 8px;
}

.input-container input {
   border: none;
   outline: none;
   font-size: 16px;
   color: #333;
   flex: 1;
}

.input-container input::placeholder {
   color: #aaa;
}

.input-container:focus-within {
   box-shadow: 0 0 5px #4f46e5;
}

h2 {
   font-size: 24px;
   margin-bottom: 20px;
}

.mt-1 {
   margin-top: 10px;
}

.mt-2 {
   margin-top: 20px;
}

.mb-2 {
   margin-bottom: 20px;
}

.mb-4 {
   margin-bottom: 40px;
}
</style>
