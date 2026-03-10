<script setup>
import { ref, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { kulinerMedan } from '../data/places.js'

// Parallax Logic
const { y } = useWindowScroll()

// State untuk Filter & Pencarian
const filterBudget = ref('all')
const searchQuery = ref('')
const places = ref(kulinerMedan)

// State untuk Modal Maps (Agar iframe hanya dimuat saat diklik)
const activeMapIframe = ref(null)
const isMapModalOpen = ref(false)
const activePlaceName = ref('')

// Computed Property untuk memfilter data
const filteredPlaces = computed(() => {
  return places.value.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          place.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          place.category.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesBudget = filterBudget.value === 'all' || place.budget === filterBudget.value;

    return matchesSearch && matchesBudget;
  })
})

// Fungsi untuk membuka modal peta
const openMap = (place) => {
  activePlaceName.value = place.name;
  // Memperbaiki string iframe agar responsif dalam modal
  activeMapIframe.value = place.iframe
      .replace('width="600"', 'width="100%"')
      .replace('height="450"', 'height="100%"')
      .replace('style="border:0;"', 'style="border:0; border-radius: 1rem;"');
  isMapModalOpen.value = true;
  // Mencegah scroll pada body saat modal terbuka
  document.body.style.overflow = 'hidden';
}

const closeMap = () => {
  isMapModalOpen.value = false;
  activeMapIframe.value = null;
  document.body.style.overflow = 'auto';
}

// Fungsi untuk mengambil link murni dari iframe
const getMapLink = (iframeString) => {
  const match = iframeString.match(/src="([^"]+)"/)
  return match ? match[1] : '#'
}
</script>

<template>
  <main>
    <!-- HERO SECTION PARALLAX -->
    <div id="home" class="relative h-[100vh] w-full overflow-hidden flex items-center justify-center">
        <div class="absolute inset-0 w-full h-[120%] bg-cover bg-center pointer-events-none"
             :style="{
                backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')`,
                transform: `translateY(${y * 0.4}px)`,
                filter: 'brightness(0.65)'
             }">
        </div>

        <div class="relative z-10 text-center px-6 max-w-4xl mx-auto mt-10">
            <div class="overflow-hidden mb-4">
                <span class="inline-block px-4 py-1 border border-white/30 rounded-full text-white/90 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-sm animate-fade-up">
                    North Sumatra Authenticity
                </span>
            </div>
            <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight animate-fade-up" style="animation-delay: 0.2s;">
                The Taste of <br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-medan-gold to-orange-300 italic pr-2">Medan City</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-fade-up" style="animation-delay: 0.4s;">
                Daftar rekomendasi tempat makan legendaris. Dari rasa kaki lima hingga suasana bintang lima.
            </p>

            <div class="animate-fade-up" style="animation-delay: 0.6s;">
                <a href="#list" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-medan-dark font-bold rounded-full hover:bg-medan-gold hover:text-white transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                    Mulai Eksplorasi
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                </a>
            </div>
        </div>

        <!-- Scroll Down Indicator -->
        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70 animate-float flex flex-col items-center gap-2">
            <span class="text-[10px] uppercase tracking-widest">Scroll</span>
            <div class="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
    </div>

    <!-- CONTENT LIST SECTION -->
    <div id="list" class="relative z-20 bg-medan-cream -mt-10 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] pt-20 pb-20 px-6 overflow-hidden">

        <div class="container mx-auto relative z-10">
            <!-- HEADER, SEARCH & FILTER -->
            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                <div class="w-full lg:w-1/2">
                    <h2 class="font-serif text-4xl md:text-5xl font-bold text-medan-dark mb-4">Pilihan Kurasi</h2>
                    <p class="text-gray-500 mb-6">Temukan permata tersembunyi yang sesuai dengan selera dan budget Anda.</p>

                    <!-- Search Bar -->
                    <div class="relative w-full max-w-md">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Cari tempat, makanan, atau kategori..."
                            class="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-medan-gold/50 focus:border-medan-gold transition-all"
                        >
                        <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </div>
                        <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>
                </div>

                <!-- Filter Tabs Budget -->
                <div class="bg-white p-1.5 rounded-full shadow-sm border border-gray-200 flex overflow-x-auto max-w-full scrollbar-hide">
                    <button
                        v-for="opt in ['All', 'Rendah', 'Sedang', 'Tinggi']"
                        :key="opt"
                        @click="filterBudget = opt === 'All' ? 'all' : opt"
                        :class="[
                            'px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap',
                            (filterBudget === opt || (filterBudget === 'all' && opt === 'All'))
                                ? 'bg-medan-dark text-white shadow-md'
                                : 'text-gray-500 hover:text-medan-accent hover:bg-gray-50'
                        ]"
                    >
                        {{ opt === 'All' ? 'Semua Budget' : opt === 'Rendah' ? 'Hemat' : opt === 'Sedang' ? 'Standar' : 'Premium' }}
                    </button>
                </div>
            </div>

            <!-- GRID LAYOUT -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                <div
                    v-for="(place, index) in filteredPlaces"
                    :key="place.id"
                    class="group relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full transform hover:-translate-y-2"
                >
                    <!-- Image Container (Pengganti Iframe agar web ringan) -->
                    <div class="relative h-64 w-full overflow-hidden bg-gray-200">
                        <img
                            :src="place.image"
                            :alt="place.name"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />
                        <!-- Overlay Gradient -->
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <!-- Category & Budget Badge -->
                        <div class="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                            <span class="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-xs font-bold uppercase tracking-wider text-medan-dark">
                                {{ place.category }}
                            </span>
                            <span :class="[
                                'bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-xs font-bold uppercase tracking-wider',
                                place.budget === 'Rendah' ? 'text-emerald-600' :
                                place.budget === 'Sedang' ? 'text-orange-500' :
                                'text-rose-600'
                            ]">
                                {{ place.budget }}
                            </span>
                        </div>
                    </div>

                    <!-- Card Content -->
                    <div class="p-8 flex flex-col flex-grow relative">
                        <h3 class="font-serif text-2xl font-bold text-medan-dark mb-3 group-hover:text-medan-accent transition-colors">
                            {{ place.name }}
                        </h3>

                        <p class="text-gray-500 text-sm leading-relaxed mb-6 flex-grow font-sans line-clamp-3">
                            {{ place.description }}
                        </p>

                        <div class="flex items-center justify-between pt-6 border-t border-dashed border-gray-200 mt-auto">
                            <!-- Tombol Lihat Peta (Buka Modal) -->
                            <button @click="openMap(place)" class="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-medan-accent transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                Lihat Peta
                            </button>

                            <!-- Link Buka di Aplikasi Gmaps -->
                            <a :href="getMapLink(place.iframe)" target="_blank" class="inline-flex items-center gap-2 text-medan-dark hover:text-medan-accent font-bold text-sm transition-colors group/link">
                                Rute Maps
                                <svg class="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredPlaces.length === 0" class="text-center py-32 animate-fade-up">
                <div class="inline-block p-6 rounded-full bg-gray-100 mb-4">
                    <svg class="w-8 h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>
                </div>
                <h3 class="text-xl font-serif font-bold text-gray-800">Ups, tidak ditemukan</h3>
                <p class="text-gray-500 mt-2">Pencarian untuk <span class="font-bold text-medan-dark">"{{ searchQuery }}"</span> dengan filter budget saat ini kosong.<br>Coba kata kunci lain atau reset filter Anda.</p>
                <button @click="searchQuery = ''; filterBudget = 'all'" class="mt-6 px-6 py-2 bg-medan-gold text-white font-bold rounded-full hover:bg-medan-dark transition-colors shadow-lg">
                    Reset Filter
                </button>
            </div>
        </div>
    </div>

    <!-- MODAL GOOGLE MAPS -->
    <transition name="fade">
        <div v-if="isMapModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeMap"></div>

            <!-- Modal Content -->
            <div class="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col" style="max-height: 90vh;">
                <!-- Header Modal -->
                <div class="flex justify-between items-center p-6 border-b border-gray-100">
                    <h3 class="font-serif text-2xl font-bold text-medan-dark">{{ activePlaceName }}</h3>
                    <button @click="closeMap" class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>

                <!-- Iframe Container -->
                <div class="relative w-full h-[50vh] sm:h-[60vh] bg-gray-100 p-2 sm:p-6">
                    <!-- Loading Spinner saat iframe dimuat -->
                    <div class="absolute inset-0 flex items-center justify-center z-0">
                        <div class="w-8 h-8 border-4 border-medan-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <!-- Iframe yang dirender -->
                    <div v-if="activeMapIframe" class="relative z-10 w-full h-full shadow-inner rounded-2xl overflow-hidden" v-html="activeMapIframe"></div>
                </div>
            </div>
        </div>
    </transition>
  </main>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* Transisi Modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
