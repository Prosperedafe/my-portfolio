<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import Marquee from '../components/Marquee.vue'
import IntroSection from '../components/IntroSection.vue'
import WorkShowcase from '../components/WorkShowcase.vue'
import ServicesSection from '../components/ServicesSection.vue'
import MobileSection from '../components/MobileSection.vue'

const stackA = ['React', 'Next.js', 'TypeScript', 'React Native', 'Electron', 'Vue']
const stackB = ['Expo', 'Supabase', 'Tailwind CSS', 'Redux Toolkit', 'Stripe', 'Paystack']
</script>

<template>
  <div>
    <HeroSection />

    <div class="border-y border-line py-6 md:py-8">
      <Marquee :items="stackA" :duration="34" />
      <Marquee :items="stackB" :duration="40" reverse outline class="mt-2" />
    </div>

    <IntroSection />
    <WorkShowcase />
    <MobileSection />
    <ServicesSection />
  </div>
</template>
