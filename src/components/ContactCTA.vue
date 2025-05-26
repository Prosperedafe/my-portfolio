<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToContact = () => {
  router.push('/contact')
}
</script>

<template>
  <section class="py-20 bg-primary-600 dark:bg-primary-800">
    <div 
      class="container"
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0 }"
    >
      <div class="text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Ready to work together?</h2>
        <p class="text-primary-100 dark:text-primary-200 max-w-2xl mx-auto mb-8">
          I'm currently available for freelance projects, full-time positions, and consulting opportunities. Let's create something amazing together!
        </p>
        <button @click="navigateToContact" class="btn bg-white text-primary-600 hover:bg-primary-50 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Get in Touch
        </button>
      </div>
    </div>
  </section>
</template>