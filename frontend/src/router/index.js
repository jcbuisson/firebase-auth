import { createRouter, createWebHistory } from 'vue-router'

const routes = [
   {
      path: '/',
      component: () => import('/src/App.vue'),
   },
   {
      path: '/home',
      component: () => import('/src/Home.vue'),
   },
]

const router = createRouter({
   history: createWebHistory('/'),
   routes
})

export default router
