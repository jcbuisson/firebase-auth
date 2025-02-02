<script setup>
import { ref, onMounted } from "vue"
import { auth } from "../firebase"
import firebase from "firebase/compat/app"
import * as firebaseui from "firebaseui"

// Reference for UI container
const uiContainer = ref(null)

// Initialize FirebaseUI on mount
onMounted(() => {
   const ui = new firebaseui.auth.AuthUI(auth)
   ui.start(uiContainer.value, {
      signInOptions: [
         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
         firebase.auth.FacebookAuthProvider.PROVIDER_ID,
         firebase.auth.GithubAuthProvider.PROVIDER_ID,
         firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: "/home",
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
   })
})
</script>

<template>
   <div>
      <h2>Login</h2>
      <div ref="uiContainer"></div>
   </div>
</template>

<style>
/* FirebaseUI default styles */
@import "firebaseui/dist/firebaseui.css"
</style>
