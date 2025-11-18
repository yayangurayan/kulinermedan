<script setup>
import { RouterView } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'

// Mengambil posisi scroll Y untuk efek navbar
const { y } = useWindowScroll()
</script>

<template>
  <div class="bg-medan-cream text-medan-dark min-h-screen font-sans">

    <!-- Navbar (Sticky & Adaptive) -->
    <nav :class="[
        'fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-6 py-4',
        y > 50 ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100/50 py-3' : 'bg-transparent pt-6'
    ]">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center gap-2 group cursor-pointer select-none">
            <div class="w-10 h-10 bg-medan-dark text-medan-gold rounded-full flex items-center justify-center font-serif text-xl font-bold shadow-lg group-hover:bg-medan-accent transition-colors duration-300">
                M
            </div>
            <span :class="['font-serif font-bold text-xl tracking-wide transition-colors duration-300', y > 50 ? 'text-medan-dark' : 'text-white']">
                Medan<span class="text-medan-accent">Culinary</span>
            </span>
        </div>

        <!-- Menu Desktop -->
        <div class="hidden md:flex items-center space-x-8">
           <a href="#home" :class="['text-sm font-medium tracking-wider hover:text-medan-accent transition-colors', y > 50 ? 'text-gray-600' : 'text-gray-200']">Home</a>
           <a href="#list" :class="['text-sm font-medium tracking-wider hover:text-medan-accent transition-colors', y > 50 ? 'text-gray-600' : 'text-gray-200']">Daftar Kuliner</a>
           <button class="px-5 py-2 rounded-full bg-medan-accent text-white text-sm font-bold shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-orange-500/20">
              Jelajah Sekarang
           </button>
        </div>
      </div>
    </nav>

    <!-- Router View (Halaman HomeView akan muncul di sini) -->
    <RouterView />

    <!-- Footer -->
    <footer class="bg-medan-dark text-white py-16 relative overflow-hidden mt-auto">
        <div class="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div class="container mx-auto px-6 relative z-10 text-center">
            <h2 class="font-serif text-3xl font-bold mb-6">Sudah siap berburu rasa?</h2>
            <div class="w-16 h-1 bg-medan-accent mx-auto mb-8 rounded-full"></div>
            <p class="text-gray-400 text-xs tracking-widest uppercase">
                &copy; 2025 Kuliner Medan Guide. Dibuat dengan Vue 3 & Tailwind.
            </p>
        </div>
    </footer>
  </div>
</template>

<style>
/* Global styles jika diperlukan */
html { scroll-behavior: smooth; }
</style>
