<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

// Props
const props = defineProps<{
  isDarkMode: boolean;
}>();

// Emits
const emit = defineEmits(["toggle-dark-mode"]);

// Toggle mobile menu
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Handle window resize to close mobile menu
const handleResize = () => {
  if (window.innerWidth >= 768) {
    isMenuOpen.value = false;
  }
};

// Check active route
const route = useRoute();
const isActive = (path: string) => {
  return route.path === path;
};

// Scroll listener for navbar background
const scrolled = ref(false);
const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Check initial scroll position
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    :class="[
      'fixed w-full z-50 transition-all duration-300',
      scrolled
        ? 'bg-white dark:bg-gray-900 shadow-md py-2'
        : 'bg-transparent py-4',
    ]"
  >
    <div class="container flex items-center justify-between">
      <!-- Logo -->
      <router-link
        to="/"
        class="font-heading text-2xl font-bold text-primary-600 dark:text-primary-400"
      >
        Portfolio
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex space-x-8">
        <router-link
          v-for="item in [
            { path: '/', label: 'Home' },
            { path: '/about', label: 'About' },
            { path: '/projects', label: 'Projects' },
            { path: '/contact', label: 'Contact' },
          ]"
          :key="item.path"
          :to="item.path"
          :class="[
            'font-medium transition-colors duration-300 hover:text-primary-500',
            isActive(item.path)
              ? 'text-primary-500'
              : 'text-gray-800 dark:text-gray-200',
          ]"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <!-- Dark mode toggle -->
      <button
        @click="emit('toggle-dark-mode')"
        class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle dark mode"
      >
        <svg
          v-if="props.isDarkMode"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>

      <!-- Mobile menu button -->
      <button
        @click="toggleMenu"
        class="p-2 rounded-md md:hidden focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          v-if="!isMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-800 dark:text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-800 dark:text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="isMenuOpen"
      class="md:hidden bg-white dark:bg-gray-800 absolute top-full left-0 w-full shadow-lg py-2 transition-all duration-300"
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 300 } }"
    >
      <div class="container flex flex-col space-y-3 py-3">
        <router-link
          v-for="item in [
            { path: '/', label: 'Home' },
            { path: '/about', label: 'About' },
            { path: '/projects', label: 'Projects' },
            { path: '/contact', label: 'Contact' },
          ]"
          :key="item.path"
          :to="item.path"
          :class="[
            'py-2 px-4 font-medium rounded-md transition-colors',
            isActive(item.path)
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200',
          ]"
          @click="isMenuOpen = false"
        >
          {{ item.label }}
        </router-link>
      </div>
    </div>
  </header>
</template>
