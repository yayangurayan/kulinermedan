<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'

// Mengambil posisi scroll Y untuk efek navbar
const { y } = useWindowScroll()

// State untuk mengatur menu mobile
const isMobileMenuOpen = ref(false)

// Fungsi untuk menutup menu mobile saat link diklik
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div class="bg-medan-cream text-medan-dark min-h-screen font-sans flex flex-col">

    <!-- Navbar (Sticky & Adaptive) -->
    <nav :class="[
        'fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-6 py-4',
        y > 50 ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100/50 py-3' : 'bg-transparent pt-6',
        isMobileMenuOpen ? 'bg-white/95 backdrop-blur-md' : ''
    ]">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 group cursor-pointer select-none z-50" @click="closeMobileMenu">
            <div class="w-10 h-10 bg-medan-dark text-medan-gold rounded-full flex items-center justify-center font-serif text-xl font-bold shadow-lg group-hover:bg-medan-accent transition-colors duration-300">
                M
            </div>
            <span :class="['font-serif font-bold text-xl tracking-wide transition-colors duration-300', y > 50 || isMobileMenuOpen ? 'text-medan-dark' : 'text-white']">
                Medan<span class="text-medan-accent">Culinary</span>
            </span>
        </router-link>

        <!-- Menu Desktop -->
        <div class="hidden md:flex items-center space-x-8">
           <router-link to="/#home" :class="['text-sm font-medium tracking-wider hover:text-medan-accent transition-colors', y > 50 ? 'text-gray-600' : 'text-gray-200']">Home</router-link>
           <router-link to="/#list" :class="['text-sm font-medium tracking-wider hover:text-medan-accent transition-colors', y > 50 ? 'text-gray-600' : 'text-gray-200']">Daftar Kuliner</router-link>
           <router-link to="/about" :class="['text-sm font-medium tracking-wider hover:text-medan-accent transition-colors', y > 50 ? 'text-gray-600' : 'text-gray-200']">Tentang Kami</router-link>
           <a href="/#list" class="px-5 py-2 rounded-full bg-medan-accent text-white text-sm font-bold shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-orange-500/20">
              Jelajah Sekarang
           </a>
        </div>

        <!-- Tombol Hamburger (Mobile) -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          :class="['md:hidden z-50 p-2 focus:outline-none transition-colors duration-300', y > 50 || isMobileMenuOpen ? 'text-medan-dark' : 'text-white']"
        >
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Menu Mobile (Dropdown) -->
      <transition name="slide-down">
        <div v-if="isMobileMenuOpen" class="absolute top-full left-0 w-full bg-white shadow-xl border-b border-gray-100 md:hidden flex flex-col px-6 py-6 gap-6">
           <router-link to="/#home" @click="closeMobileMenu" class="text-medan-dark font-medium hover:text-medan-accent text-lg">Home</router-link>
           <router-link to="/#list" @click="closeMobileMenu" class="text-medan-dark font-medium hover:text-medan-accent text-lg">Daftar Kuliner</router-link>
           <router-link to="/about" @click="closeMobileMenu" class="text-medan-dark font-medium hover:text-medan-accent text-lg">Tentang Kami</router-link>
           <a href="/#list" @click="closeMobileMenu" class="w-full text-center px-5 py-3 rounded-full bg-medan-accent text-white font-bold shadow-md hover:bg-orange-600 transition-all">
              Jelajah Sekarang
           </a>
        </div>
      </transition>
    </nav>

    <!-- Router View (Halaman Utama / About) -->
    <div class="flex-grow">
      <RouterView />
    </div>

    <!-- Footer -->
    <footer class="bg-medan-dark text-white py-16 relative overflow-hidden mt-auto">
        <div class="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div class="container mx-auto px-6 relative z-10 text-center">
            <h2 class="font-serif text-3xl font-bold mb-6">Sudah siap berburu rasa?</h2>
            <div class="w-16 h-1 bg-medan-accent mx-auto mb-8 rounded-full"></div>
            <p class="text-gray-400 text-xs tracking-widest uppercase mb-4">
                &copy; 2025 Kuliner Medan Guide. Dibuat dengan Vue 3 & Tailwind.
            </p>
            <div class="flex justify-center gap-4 text-sm text-gray-500">
               <router-link to="/" class="hover:text-medan-gold transition-colors">Home</router-link>
               <router-link to="/about" class="hover:text-medan-gold transition-colors">Tentang Kami</router-link>
            </div>
        </div>
    </footer>
  </div>
</template>

<style>
/* Global styles */
html { scroll-behavior: smooth; }

/* Animasi untuk menu mobile */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-out;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
