<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useWindowScroll, useDark } from '@vueuse/core'

const { y } = useWindowScroll()

// Konfigurasi eksplisit agar 'dark' class benar-benar ditambah/dihapus dari tag <html>
const isDark = useDark({
  selector: 'html',
  valueDark: 'dark',
  valueLight: '', // Kosongkan class saat mode terang
})

// Fungsi sakelar anti-bug (mengubah nilai isDark secara manual)
const toggleTheme = () => {
  isDark.value = !isDark.value
}

const isMobileMenuOpen = ref(false)

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div class="bg-medan-cream dark:bg-gray-900 text-medan-dark dark:text-gray-100 min-h-screen font-sans flex flex-col transition-colors duration-500">

    <!-- Navbar -->
    <nav :class="[
        'fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-6 py-4',
        y > 50 ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-100/50 dark:border-gray-800 py-3' : 'bg-transparent pt-6',
        isMobileMenuOpen ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md' : ''
    ]">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 group cursor-pointer select-none z-50" @click="closeMobileMenu">
            <div class="w-10 h-10 bg-medan-dark dark:bg-medan-gold text-medan-gold dark:text-medan-dark rounded-full flex items-center justify-center font-serif text-xl font-bold shadow-lg group-hover:bg-medan-accent dark:group-hover:bg-medan-accent transition-colors duration-300">
                M
            </div>
            <span :class="['font-serif font-bold text-xl tracking-wide transition-colors duration-300', y > 50 || isMobileMenuOpen ? 'text-medan-dark dark:text-white' : 'text-white']">
                Medan<span class="text-medan-accent">Culinary</span>
            </span>
        </router-link>

        <!-- Menu Desktop -->
        <div class="hidden md:flex items-center space-x-8">
           <router-link to="/#home" :class="['text-sm font-medium tracking-wider hover:text-medan-accent transition-colors', y > 50 ? 'text-gray-600 dark:text-gray-300' : 'text-gray-200']">Home</router-link>
           <router-link to="/#list" :class="['text-sm font-medium tracking-wider hover:text-medan-accent transition-colors', y > 50 ? 'text-gray-600 dark:text-gray-300' : 'text-gray-200']">Daftar Kuliner</router-link>
           <router-link to="/about" :class="['text-sm font-medium tracking-wider hover:text-medan-accent transition-colors', y > 50 ? 'text-gray-600 dark:text-gray-300' : 'text-gray-200']">Tentang Kami</router-link>

           <!-- Tombol Dark Mode Desktop (Menggunakan toggleTheme) -->
           <button @click="toggleTheme" :class="['p-2 rounded-full backdrop-blur-sm transition-all duration-300', y > 50 ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-medan-gold hover:bg-gray-200 dark:hover:bg-gray-700' : 'bg-black/20 text-white hover:bg-black/40']" title="Toggle Dark Mode">
              <!-- Ikon Matahari (muncul jika mode gelap aktif) -->
              <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              <!-- Ikon Bulan (muncul jika mode terang aktif) -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
           </button>

           <a href="/#list" class="px-5 py-2 rounded-full bg-medan-accent text-white text-sm font-bold shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-orange-500/20">
              Jelajah Sekarang
           </a>
        </div>

        <!-- Kontrol Mobile (Hamburger + Dark Mode) -->
        <div class="md:hidden flex items-center gap-4 z-50">
           <!-- Tombol Dark Mode Mobile -->
           <button @click="toggleTheme" :class="['p-2 rounded-full transition-all duration-300', y > 50 || isMobileMenuOpen ? 'text-gray-600 dark:text-medan-gold bg-gray-100 dark:bg-gray-800' : 'text-white bg-black/20']">
              <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
           </button>

          <!-- Tombol Hamburger -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            :class="['p-2 focus:outline-none transition-colors duration-300', y > 50 || isMobileMenuOpen ? 'text-medan-dark dark:text-white' : 'text-white']"
          >
            <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu Mobile (Dropdown) -->
      <transition name="slide-down">
        <div v-if="isMobileMenuOpen" class="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-xl border-b border-gray-100 dark:border-gray-800 md:hidden flex flex-col px-6 py-6 gap-6">
           <router-link to="/#home" @click="closeMobileMenu" class="text-medan-dark dark:text-white font-medium hover:text-medan-accent dark:hover:text-medan-accent text-lg">Home</router-link>
           <router-link to="/#list" @click="closeMobileMenu" class="text-medan-dark dark:text-white font-medium hover:text-medan-accent dark:hover:text-medan-accent text-lg">Daftar Kuliner</router-link>
           <router-link to="/about" @click="closeMobileMenu" class="text-medan-dark dark:text-white font-medium hover:text-medan-accent dark:hover:text-medan-accent text-lg">Tentang Kami</router-link>
           <a href="/#list" @click="closeMobileMenu" class="w-full text-center px-5 py-3 rounded-full bg-medan-accent text-white font-bold shadow-md hover:bg-orange-600 transition-all">
              Jelajah Sekarang
           </a>
        </div>
      </transition>
    </nav>

    <!-- Router View -->
    <div class="flex-grow">
      <RouterView />
    </div>

    <!-- Footer -->
    <footer class="bg-medan-dark dark:bg-black text-white py-16 relative overflow-hidden mt-auto transition-colors duration-500">
        <div class="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div class="container mx-auto px-6 relative z-10 text-center">
            <h2 class="font-serif text-3xl font-bold mb-6">Sudah siap berburu rasa?</h2>
            <div class="w-16 h-1 bg-medan-accent mx-auto mb-8 rounded-full"></div>
            <p class="text-gray-400 text-xs tracking-widest uppercase mb-4">
                &copy; 2026 Kuliner Medan Guide. Dibuat dengan Vue 3 & Tailwind.
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
html { scroll-behavior: smooth; }

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
