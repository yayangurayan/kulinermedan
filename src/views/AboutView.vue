<script setup>
import { computed } from 'vue'

const waNumber = '6281396815717'

const waMessage = computed(() => {
  const text = 'Halo Admin Kuliner Medan! Saya ingin merekomendasikan tempat makan yang enak nih:'
  return encodeURIComponent(text)
})
</script>

<template>
  <div class="pt-32 pb-20 min-h-screen flex items-center justify-center bg-medan-cream dark:bg-gray-900 relative overflow-hidden transition-colors duration-500">

    <!-- Latar Belakang Dekoratif -->
    <div class="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10">
      <div class="absolute top-20 left-10 w-64 h-64 bg-medan-gold rounded-full blur-[100px]"></div>
      <div class="absolute bottom-10 right-10 w-96 h-96 bg-medan-accent rounded-full blur-[120px]"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white dark:border-gray-700 relative overflow-hidden transition-colors duration-500">

        <!-- Dekorasi Sudut -->
        <div class="absolute top-0 right-0 w-40 h-40 bg-medan-gold/10 dark:bg-medan-gold/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 hover:scale-110"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-medan-accent/5 dark:bg-medan-accent/5 rounded-tr-full -ml-10 -mb-10 transition-transform duration-700 hover:scale-110"></div>

        <div class="relative z-10 flex flex-col items-center text-center">

          <!-- Badge -->
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-medan-gold/10 dark:bg-medan-gold/20 text-medan-gold font-bold tracking-widest uppercase text-xs mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h10"/><path d="M9 4v16"/><path d="m3 9 3-3-3-3"/></svg>
            Tentang Kami
          </span>

          <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl text-medan-dark dark:text-white mb-8 leading-tight font-bold transition-colors">
            Merekam Jejak Rasa <br>
            <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-medan-gold to-medan-accent">Kota Medan</span>
          </h1>

          <div class="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed font-sans text-lg max-w-2xl mx-auto transition-colors">
            <p>
              Medan bukan sekadar kota, melainkan sebuah petualangan rasa yang tak berujung.
              Website ini didedikasikan untuk mengkurasi destinasi kuliner terbaik—mulai dari
              aroma kopi kedai legendaris hingga pedasnya sambal pinggir jalan yang menggugah selera.
            </p>
            <p>
              Kami percaya bahwa setiap hidangan punya cerita. Melalui panduan sederhana ini,
              kami ingin membantu para pelancong maupun warga lokal menemukan <span class="font-bold text-medan-dark dark:text-medan-gold">"hidden gems"</span> yang
              mungkin terlewatkan.
            </p>
          </div>

          <!-- Bagian Hubungi Kami (WhatsApp) -->
          <div class="mt-16 pt-10 border-t border-gray-100 dark:border-gray-700 w-full flex flex-col items-center">
            <h3 class="font-serif text-2xl font-bold text-medan-dark dark:text-white mb-3 transition-colors">Punya Rekomendasi Tempat?</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-md transition-colors">Bantu kami melengkapi daftar ini! Beri tahu kami tempat makan favorit Anda di Medan.</p>

            <a
              :href="`https://wa.me/${waNumber}?text=${waMessage}`"
              target="_blank"
              class="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-full overflow-hidden shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div class="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>

              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="relative z-10"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 1.8 6.3L.1 24l5.9-1.5a12 12 0 0 0 5.9 1.5h.1a12 12 0 0 0 12-12A12 12 0 0 0 11.9 0zm0 21.6h-.1a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.6-.2-.4A9.9 9.9 0 0 1 12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 9.6zm5.5-7.5c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5s.1-.4 0-.6c-.1-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.5 4.9.8.3 1.4.5 1.9.7.8.2 1.5.2 2 .1.6-.1 1.8-.7 2-1.5.2-.8.2-1.4.1-1.5-.1-.1-.3-.2-.6-.3z"/></svg>

              <span class="relative z-10 tracking-wide">Hubungi via WhatsApp</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
