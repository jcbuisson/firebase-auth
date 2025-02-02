<script setup>
import { ref, onMounted } from "vue"
import { auth, signInWithGoogle, signInWithFacebook, signInWithGithub, logOut, getUserToken } from "./firebase"

const user = ref(null);

onMounted(() => {
   auth.onAuthStateChanged(async (u) => {
      user.value = u
      if (u) {
         const token = await getUserToken()
         console.log("Sending token to backend:", token)
         await fetch("/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
         })
      }
   })
})
</script>

<template>
   <div>
      <button v-if="!user" @click="signInWithGoogle">Sign in with Google</button>
      <button v-if="!user" @click="signInWithFacebook">Sign in with Facebook</button>
      <button v-if="!user" @click="signInWithGithub">Sign in with Github</button>
      <button v-else @click="logOut">Logout</button>
      <p v-if="user">Hello, {{ user.displayName }}</p>
   </div>
</template>
