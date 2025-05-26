<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const isDarkMode = ref(false)

// Check for saved theme preference or prefer-color-scheme
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})

// Toggle dark/light mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// For page transition animations
const route = useRoute()
const currentRoute = ref(route.path)

watch(() => route.path, (newPath) => {
  currentRoute.value = newPath
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />
    
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="currentRoute" />
        </transition>
      </router-view>
    </main>
    
    <Footer />
  </div>
</template>