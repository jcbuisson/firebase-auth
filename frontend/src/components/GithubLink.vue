<template>
   <a :href="url" target="_blank" class="githublink">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
         <path fill="currentColor" :d="svgPath"/>
      </svg>
   </a>
</template>

<script setup>
const props = defineProps({
   url: String,
   svgPath: String,
})
</script>

<style scoped>
.githublink {
  color: black;
  width: 2rem /* 32px */;
  height: 2rem /* 32px */;
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>