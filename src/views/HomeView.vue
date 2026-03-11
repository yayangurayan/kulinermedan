<script setup>
import { ref, computed } from 'vue'
import { useWindowScroll, useStorage } from '@vueuse/core'
import { kulinerMedan } from '../data/places.js'

const { y } = useWindowScroll()

const filterBudget = ref('all')
const searchQuery = ref('')
const places = ref(kulinerMedan)

// State untuk fitur Bookmark / Favorit (Tersimpan di localStorage)
const favoriteIds = useStorage('medan-culinary-favs', [])
const showFavoritesOnly = ref(false)

const activeMapIframe = ref(null)
const isMapModalOpen = ref(false)
const activePlaceName = ref('')

// Fungsi Toggle Favorit
const toggleFavorite = (id) => {
  if (favoriteIds.value.includes(id)) {
    favoriteIds.value = favoriteIds.value.filter(favId => favId !== id)
  } else {
    favoriteIds.value.push(id)
  }
}

// Computed Property untuk memfilter data (Termasuk filter Favorit)
const filteredPlaces = computed(() => {
  return places.value.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          place.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          place.category.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesBudget = filterBudget.value === 'all' || place.budget === filterBudget.value;

    const matchesFav = showFavoritesOnly.value ? favoriteIds.value.includes(place.id) : true;

    return matchesSearch && matchesBudget && matchesFav;
  })
})

const openMap = (place) => {
  activePlaceName.value = place.name;
  activeMapIframe.value = place.iframe
      .replace('width="600"', 'width="100%"')
      .replace('height="450"', 'height="100%"')
      .replace('style="border:0;"', 'style="border:0; border-radius: 1rem;"');
  isMapModalOpen.value = true;
  document.body.style.overflow = 'hidden';
}

const closeMap = () => {
  isMapModalOpen.value = false;
  activeMapIframe.value = null;
  document.body.style.overflow = 'auto';
}
</script>

<template>
  <main>
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

        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70 animate-float flex flex-col items-center gap-2">
            <span class="text-[10px] uppercase tracking-widest">Scroll</span>
            <div class="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
    </div>

    <!-- Menambahkan transisi dan background dark mode -->
    <div id="list" class="relative z-20 bg-medan-cream dark:bg-gray-900 -mt-10 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] pt-20 pb-20 px-6 overflow-hidden transition-colors duration-500">

        <div class="container mx-auto relative z-10">
            <!-- Header Filter & Search -->
            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
                <div class="w-full lg:w-1/2">
                    <h2 class="font-serif text-4xl md:text-5xl font-bold text-medan-dark dark:text-white mb-4">Pilihan Kurasi</h2>
                    <p class="text-gray-500 dark:text-gray-400 mb-6">Temukan permata tersembunyi yang sesuai dengan selera dan budget Anda.</p>

                    <div class="relative w-full max-w-md">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Cari tempat, makanan, atau kategori..."
                            class="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-medan-dark dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-medan-gold/50 focus:border-medan-gold transition-all"
                        >
                        <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </div>
                        <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>
                </div>

                <!-- Bagian Kanan (Filter Budget & Toggle Favorit) -->
                <div class="flex flex-col items-start lg:items-end gap-4 w-full lg:w-auto">
                    <!-- Toggle Favorit Saja -->
                    <button
                        @click="showFavoritesOnly = !showFavoritesOnly"
                        :class="[
                            'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all border',
                            showFavoritesOnly ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-500 border-rose-200 dark:border-rose-500/30' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                        ]"
                    >
                        <svg :class="['w-4 h-4', showFavoritesOnly ? 'fill-current' : 'none']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        {{ showFavoritesOnly ? 'Tampilkan Semua' : 'Daftar Favoritku' }}
                    </button>

                    <!-- Filter Tabs -->
                    <div class="bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 flex overflow-x-auto max-w-full scrollbar-hide">
                        <button
                            v-for="opt in ['All', 'Rendah', 'Sedang', 'Tinggi']"
                            :key="opt"
                            @click="filterBudget = opt === 'All' ? 'all' : opt"
                            :class="[
                                'px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap',
                                (filterBudget === opt || (filterBudget === 'all' && opt === 'All'))
                                    ? 'bg-medan-dark dark:bg-medan-gold text-white shadow-md'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-medan-accent dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                            ]"
                        >
                            {{ opt === 'All' ? 'Semua Budget' : opt === 'Rendah' ? 'Hemat' : opt === 'Sedang' ? 'Standar' : 'Premium' }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- GRID LAYOUT -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                <div
                    v-for="(place, index) in filteredPlaces"
                    :key="place.id"
                    class="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden hover:shadow-2xl dark:hover:shadow-medan-gold/10 transition-all duration-500 border border-gray-100 dark:border-gray-700 flex flex-col h-full transform hover:-translate-y-2"
                >
                    <div class="relative h-64 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <!-- Tombol Hati (Bookmark) Kiri Atas -->
                        <button
                            @click="toggleFavorite(place.id)"
                            class="absolute top-4 left-4 z-30 p-2.5 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform focus:outline-none group/btn"
                        >
                            <svg
                                :class="[
                                    'w-5 h-5 transition-colors duration-300',
                                    favoriteIds.includes(place.id) ? 'text-rose-500 fill-current animate-heart-pop' : 'text-gray-400 group-hover/btn:text-rose-400'
                                ]"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                            </svg>
                        </button>

                        <img
                            :src="place.image"
                            :alt="place.name"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div class="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                            <span class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-xs font-bold uppercase tracking-wider text-medan-dark dark:text-gray-200">
                                {{ place.category }}
                            </span>
                            <span :class="[
                                'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-xs font-bold uppercase tracking-wider',
                                place.budget === 'Rendah' ? 'text-emerald-600 dark:text-emerald-400' :
                                place.budget === 'Sedang' ? 'text-orange-500 dark:text-orange-400' :
                                'text-rose-600 dark:text-rose-400'
                            ]">
                                {{ place.budget }}
                            </span>
                        </div>
                    </div>

                    <div class="p-8 flex flex-col flex-grow relative">
                        <h3 class="font-serif text-2xl font-bold text-medan-dark dark:text-white mb-3 group-hover:text-medan-accent dark:group-hover:text-medan-gold transition-colors">
                            {{ place.name }}
                        </h3>

                        <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow font-sans line-clamp-3">
                            {{ place.description }}
                        </p>

                        <div class="flex items-center justify-between pt-6 border-t border-dashed border-gray-200 dark:border-gray-700 mt-auto">
                            <button @click="openMap(place)" class="flex items-center gap-2 text-sm font-bold text-gray-400 dark:text-gray-500 hover:text-medan-accent dark:hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                Lihat Peta
                            </button>

                            <a :href="place.mapLink" target="_blank" class="inline-flex items-center gap-2 text-medan-dark dark:text-gray-200 hover:text-medan-accent dark:hover:text-medan-gold font-bold text-sm transition-colors group/link">
                                Rute Maps
                                <svg class="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredPlaces.length === 0" class="text-center py-32 animate-fade-up">
                <div class="inline-block p-6 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                    <svg class="w-8 h-8 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>
                </div>
                <h3 class="text-xl font-serif font-bold text-gray-800 dark:text-white">Ups, tidak ditemukan</h3>
                <p v-if="showFavoritesOnly && favoriteIds.length === 0" class="text-gray-500 dark:text-gray-400 mt-2">
                    Anda belum menyimpan tempat favorit satupun.<br>Klik ikon hati pada daftar tempat makan untuk menyimpannya di sini.
                </p>
                <p v-else class="text-gray-500 dark:text-gray-400 mt-2">
                    Pencarian untuk <span class="font-bold text-medan-dark dark:text-white">"{{ searchQuery }}"</span> dengan filter saat ini kosong.<br>Coba kata kunci lain atau reset filter Anda.
                </p>

                <button @click="searchQuery = ''; filterBudget = 'all'; showFavoritesOnly = false" class="mt-6 px-6 py-2 bg-medan-gold text-white font-bold rounded-full hover:bg-medan-dark transition-colors shadow-lg">
                    Reset Filter
                </button>
            </div>
        </div>
    </div>

    <!-- Modal Google Maps dengan dukungan Dark Mode -->
    <transition name="fade">
        <div v-if="isMapModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeMap"></div>

            <div class="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col" style="max-height: 90vh;">
                <div class="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                    <h3 class="font-serif text-2xl font-bold text-medan-dark dark:text-white">{{ activePlaceName }}</h3>
                    <button @click="closeMap" class="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>

                <div class="relative w-full h-[50vh] sm:h-[60vh] bg-gray-100 dark:bg-gray-900 p-2 sm:p-6">
                    <div class="absolute inset-0 flex items-center justify-center z-0">
                        <div class="w-8 h-8 border-4 border-medan-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
