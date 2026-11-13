<script setup lang="ts">
import ArrowIcon from '../components/ArrowIcon.vue'
</script>

<template>
  <section class="flex min-h-[90svh] flex-col justify-center px-gutter pb-20 pt-36">
    <p v-reveal class="label mb-6">(404) — Page not found</p>
    <h1 class="display text-[clamp(5rem,26vw,26rem)]">
      <span v-chars="{ start: 'top 100%' }" class="block">4<span class="text-accent">0</span>4</span>
    </h1>
    <p v-lines="{ delay: 0.2 }" class="serif-i mt-4 max-w-[30rem] text-3xl text-bone/80 md:text-4xl">
      This page went off to build something else.
    </p>
    <div v-reveal="{ delay: 0.3 }" class="mt-10 flex flex-wrap gap-3">
      <router-link v-magnetic="0.25" to="/" class="btn btn-accent">Back home <ArrowIcon :size="12" /></router-link>
      <router-link v-magnetic="0.25" to="/projects" class="btn btn-ghost">See my work</router-link>
    </div>
  </section>
</template>
