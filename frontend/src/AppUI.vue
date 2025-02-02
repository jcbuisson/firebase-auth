<script setup>
import { ref, onMounted } from "vue"
import { auth } from "./firebase"
import FirebaseAuth from "./components/FirebaseAuth.vue"

const user = ref(null)

onMounted(() => {
   auth.onAuthStateChanged((u) => {
      user.value = u
   });
});

const logOut = async () => {
   await auth.signOut()
}
</script>

<template>
   <div class="container">
      <h2>Firebase Drop-in Authentication</h2>

      <div v-if="user">
         <p>Welcome, {{ user.displayName || user.email }}!</p>
         <img :src="user.photoURL" v-if="user.photoURL" class="profile-img" />
         <button @click="logOut">Logout</button>
      </div>
      
      <div v-else>
         <FirebaseAuth />
      </div>
   </div>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
  text-align: center;
}
.container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
button {
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}
button:hover {
  background: #0056b3;
}
.profile-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: 10px;
}
</style>
