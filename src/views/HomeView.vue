<script setup>
import { ref, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'

// Parallax Logic
const { y } = useWindowScroll()
const filter = ref('all')

// Data Kuliner (Sudah di-polish deskripsinya)
const places = ref([
  {
      name: "Warkop Kilat Kuphi",
      description: "Tempat nongkrong otentik dengan kopi khas Aceh yang kental dan suasana malam yang hangat.",
      budget: "Sedang",
      iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.2319778210244!2d98.6749194!3d3.5338339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30313b003f818edb%3A0x88c6fba7b5155b77!2sKilat%20Kuphi!5e0!3m2!1sid!2sid!4v1763457827304!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  },
  {
      name: "Sambal Bakar Penyetan",
      description: "Sensasi sambal yang dibakar langsung di cobek panas. Pedasnya nendang dengan varian lauk menggugah selera.",
      budget: "Tinggi",
      iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.0551878852625!2d98.61178337847625!3d3.5747856999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312f52d1529933%3A0xc4dece0fae896805!2sSAMBAL%20BAKAR%20PENYETAN!5e0!3m2!1sid!2sid!4v1763458197504!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  },
  {
      name: "Wizzmie & Fluffy Pancakes",
      description: "Perpaduan unik mie pedas kekinian dan Fluffy Pancake lembut seharga 15rb-an. Spot manis untuk dessert lovers.",
      budget: "Rendah",
      iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.2546870872484!2d98.66269330000002!3d3.5285390999999935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30313b31a503f121%3A0x78b8d1d87d14e4af!2sWizzmie%20Medan%20Karya%20Wisata!5e0!3m2!1sid!2sid!4v1763458324376!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  },
  {
      name: "Dans Meaters",
      description: "Surga bagi pecinta daging! Steak dan olahan daging premium dengan bumbu western yang meresap sempurna.",
      budget: "Sedang",
      iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.0069036766936!2d98.75684849999999!3d3.5858890999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30313700755f264d%3A0x7a2039ff9c243ab3!2sDans%20Meaters%20Tembung!5e0!3m2!1sid!2sid!4v1763458425813!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  },
  {
      name: "Ayam Pecak Bang Jek",
      description: "Ayam pecak dengan sambal hijau yang segar dan pedas nampol. Porsi kenyang dengan harga mahasiswa.",
      budget: "Rendah",
      iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.2083937156117!2d98.65001881744381!3d3.539324300000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031250067529de9%3A0xf90b3aa5ce32391a!2sAyam%20pecak%20bg%20jek%20%26%20coffee!5e0!3m2!1sid!2sid!4v1763458517635!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  },
  {
      name: "Ayam Geprek Kak Ria",
      description: "Ayam geprek crispy dengan level kepedasan yang bisa diatur. Favorit warga lokal untuk makan siang.",
      budget: "Rendah",
      iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.876255211057!2d98.70041049999999!3d3.6157622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031318165a46837%3A0x4c6d82aa66f3c383!2sAyam%20Geprek%20Kak%20Ria!5e0!3m2!1sid!2sid!4v1763458599070!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  },
  {
      name: "Nasi Goreng APJ Aksara",
      description: "Legendaris di kawasan Aksara. Nasi goreng dengan aroma smoky khas dan pilihan ayam penyet yang gurih.",
      budget: "Tinggi",
      iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.9552594031884!2d98.70711860000002!3d3.5977273000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031310b00f951cf%3A0xc6a9a5dbb9c9c11f!2sAyam%20Penyet%20Jakarta%2C%20Aksara!5e0!3m2!1sid!2sid!4v1763458746690!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  }
])

const filteredPlaces = computed(() => {
  if (filter.value === 'all') return places.value
  return places.value.filter(p => p.budget === filter.value)
})

// Fungsi untuk membersihkan iframe gmaps agar responsif
const customizeIframe = (iframeString) => {
  return iframeString
      .replace('width="600"', 'width="100%"')
      .replace('height="450"', 'height="100%"')
      .replace('style="border:0;"', 'style="border:0; position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover;"')
}

// Fungsi untuk mengambil link murni dari iframe untuk tombol "Buka Maps"
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
                transform: `translateY(${y * 0.4}px)`, /* Logic Parallax di Vue */
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
                    <!-- Simple SVG Arrow Down -->
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
        <!-- Background Blob Decor -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
            <div class="absolute top-20 right-0 w-64 h-64 bg-medan-gold/20 rounded-full blur-3xl"></div>
            <div class="absolute bottom-20 left-0 w-96 h-96 bg-medan-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div class="container mx-auto relative">
            <!-- Header & Filter -->
            <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                    <h2 class="font-serif text-4xl md:text-5xl font-bold text-medan-dark mb-4">Pilihan Kurasi</h2>
                    <p class="text-gray-500 max-w-md">Temukan permata tersembunyi yang sesuai dengan budget Anda.</p>
                </div>

                <!-- Filter Tabs -->
                <div class="bg-white p-1.5 rounded-full shadow-sm border border-gray-200 flex overflow-x-auto max-w-full scrollbar-hide">
                    <button
                        v-for="opt in ['All', 'Rendah', 'Sedang', 'Tinggi']"
                        :key="opt"
                        @click="filter = opt === 'All' ? 'all' : opt"
                        :class="[
                            'px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap',
                            (filter === opt || (filter === 'all' && opt === 'All'))
                                ? 'bg-medan-dark text-white shadow-md'
                                : 'text-gray-500 hover:text-medan-accent hover:bg-gray-50'
                        ]"
                    >
                        {{ opt === 'All' ? 'Semua' : opt === 'Rendah' ? 'Hemat' : opt === 'Sedang' ? 'Standar' : 'Premium' }}
                    </button>
                </div>
            </div>

            <!-- GRID LAYOUT -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                <div
                    v-for="(place, index) in filteredPlaces"
                    :key="index"
                    class="group relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
                >
                    <!-- Map Container -->
                    <div class="relative h-64 w-full overflow-hidden bg-gray-100">
                         <!-- Loading Spinner Placeholder -->
                        <div class="absolute inset-0 flex items-center justify-center z-0">
                           <div class="w-6 h-6 border-2 border-medan-gold border-t-transparent rounded-full animate-spin"></div>
                        </div>

                        <!-- Actual Iframe Map -->
                        <div class="absolute inset-0 z-10 grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-110">
                            <div v-html="customizeIframe(place.iframe)" class="w-full h-full"></div>
                        </div>

                        <!-- Budget Badge -->
                        <div class="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-gray-100">
                            <span :class="[
                                'text-xs font-bold uppercase tracking-wider',
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
                        <!-- Number Decor -->
                        <span class="absolute -top-6 right-8 text-6xl font-serif font-bold text-gray-100 -z-10 select-none group-hover:text-medan-gold/10 transition-colors">
                            {{ index + 1 < 10 ? '0'+(index+1) : index+1 }}
                        </span>

                        <h3 class="font-serif text-2xl font-bold text-medan-dark mb-3 group-hover:text-medan-accent transition-colors">
                            {{ place.name }}
                        </h3>

                        <p class="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow font-sans">
                            {{ place.description }}
                        </p>

                        <div class="flex items-center justify-between pt-6 border-t border-dashed border-gray-200 mt-auto">
                            <div class="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                <!-- Map Pin Icon -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                Medan
                            </div>
                            <a :href="getMapLink(place.iframe)" target="_blank" class="inline-flex items-center gap-2 text-medan-dark hover:text-medan-accent font-bold text-sm transition-colors group/link">
                                Buka Maps
                                <!-- Arrow Up Right Icon -->
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
                <h3 class="text-xl font-serif font-bold text-gray-800">Tidak ditemukan</h3>
                <p class="text-gray-500">Coba ganti filter budget lainnya.</p>
            </div>

        </div>
    </div>
  </main>
</template>

<style scoped>
/* Utilitas khusus komponen ini */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
