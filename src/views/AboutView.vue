<script setup>
// Tidak perlu logic khusus untuk halaman statis ini
</script>

<template>
  <div class="pt-32 pb-20 min-h-screen flex items-center justify-center">
    <div class="container mx-auto px-6">
      <div class="max-w-3xl mx-auto bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-medan-gold/20 relative overflow-hidden">

        <!-- Dekorasi Background -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-medan-gold/10 rounded-bl-full -mr-10 -mt-10"></div>
        <div class="absolute bottom-0 left-0 w-40 h-40 bg-medan-accent/5 rounded-tr-full -ml-10 -mb-10"></div>

        <div class="relative z-10 text-center">
          <span class="text-medan-accent font-bold tracking-widest uppercase text-xs mb-4 block">Tentang Kami</span>

          <h1 class="font-serif text-4xl md:text-5xl text-medan-dark mb-8 leading-tight">
            Merekam Jejak Rasa <br>
            <span class="italic text-medan-gold">Kota Medan</span>
          </h1>

          <div class="space-y-6 text-gray-600 leading-relaxed font-sans text-lg">
            <p>
              Medan bukan sekadar kota, melainkan sebuah petualangan rasa yang tak berujung.
              Website ini didedikasikan untuk mengkurasi destinasi kuliner terbaik—mulai dari
              aroma kopi kedai legendaris hingga pedasnya sambal pinggir jalan.
            </p>
            <p>
              Kami percaya bahwa setiap hidangan punya cerita. Melalui panduan sederhana ini,
              kami ingin membantu pelancong maupun warga lokal menemukan "hidden gems" yang
              mungkin terlewatkan.
            </p>
          </div>

          <div class="mt-12 pt-8 border-t border-dashed border-gray-200">
            <p class="text-sm text-gray-400 mb-4">Ingin merekomendasikan tempat?</p>
            <a href="mailto:halo@kulinermedan.com" class="inline-flex items-center text-medan-accent font-bold hover:text-medan-dark transition-colors">
              Hubungi Kami
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
