import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // Lazy loading untuk performa lebih baik
      component: () => import('../views/AboutView.vue'),
    },
  ],
  // Menambahkan behavior scroll yang halus
  scrollBehavior(to, from, savedPosition) {
    // Jika ada hash (#list, #home), scroll ke elemen tersebut
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80, // Memberi jarak dari navbar
      }
    }
    // Jika posisi tersimpan (tombol back), gunakan itu
    if (savedPosition) {
      return savedPosition
    }
    // Default: scroll ke paling atas
    return { top: 0 }
  },
})

export default router
