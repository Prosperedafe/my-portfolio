<script setup lang="ts">
import { ref, computed } from 'vue'

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  link: string;
  github?: string;
}

const projects = ref<Project[]>([
  {
    id: 1,
    title: "Pebbles Signature",
    description: "An e-commerce website for a fashion brand with product filtering, cart functionality, and a seamless checkout process.",
    image: "https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Vue.js", "TypeScript", "TailwindCSS", "Firebase"],
    category: "Web Application",
    link: "https://pebbles-signature.com",
    github: "https://github.com/Prosperedafe/pebbles-signature"
  },
  {
    id: 2,
    title: "DiLusso Store",
    description: "A modern e-commerce platform featuring responsive design, user authentication, and payment integration.",
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    category: "Full Stack",
    link: "https://dilussostore.shop",
    github: "https://github.com/Prosperedafe/dilusso-store"
  },
  {
    id: 3,
    title: "PlaySafari",
    description: "A gamification platform for educational content with interactive learning modules and progress tracking.",
    image: "https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Vue.js", "JavaScript", "SCSS", "Supabase"],
    category: "Web Application",
    link: "https://playsafari.ca",
    github: "https://github.com/Prosperedafe/play-safari"
  },
  {
    id: 4,
    title: "Quilox Mobile App",
    description: "A mobile application for event management and ticket booking with real-time notifications.",
    image: "https://images.pexels.com/photos/8441810/pexels-photo-8441810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["React Native", "TypeScript", "Firebase", "Redux"],
    category: "Mobile App",
    link: "https://play.google.com/store/apps/details?id=com.quilox.mobile"
  },
  {
    id: 5,
    title: "OyaSync",
    description: "A task management and collaboration tool for teams with real-time updates and file sharing capabilities.",
    image: "https://images.pexels.com/photos/6804581/pexels-photo-6804581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Vue.js", "TypeScript", "TailwindCSS", "Supabase"],
    category: "Web Application",
    link: "https://oyasync.com",
    github: "https://github.com/Prosperedafe/oyasync"
  },
  {
    id: 6,
    title: "Weather App",
    description: "A weather forecast application with location-based service and interactive visualization of weather data.",
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["JavaScript", "CSS", "OpenWeather API"],
    category: "Web Application",
    link: "https://apps.microsoft.com/detail/9N9TRMZDRQ2L",
    github: "https://github.com/Prosperedafe/weather-app"
  }
])

const categories = computed(() => {
  const allCategories = projects.value.map(project => project.category);
  return ['All', ...new Set(allCategories)];
})

const selectedCategory = ref('All')

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return projects.value;
  }
  return projects.value.filter(project => project.category === selectedCategory.value);
})

const setCategory = (category: string) => {
  selectedCategory.value = category;
}
</script>

<template>
  <div class="pt-24">
    <section class="section">
      <div class="container">
        <div class="section-heading">
          <h2 class="text-primary-600 dark:text-primary-400">Projects</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my latest projects that showcase my skills and expertise in web development.
          </p>
        </div>
        
        <!-- Category Filter -->
        <div 
          class="flex flex-wrap justify-center gap-3 mb-12"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          <button
            v-for="category in categories"
            :key="category"
            @click="setCategory(category)"
            :class="[
              'px-4 py-2 rounded-full transition-all duration-300',
              selectedCategory === category
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-primary-900'
            ]"
          >
            {{ category }}
          </button>
        </div>
        
        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="card group h-full flex flex-col overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
          >
            <div class="relative overflow-hidden h-48">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="flex space-x-3">
                  <a
                    :href="project.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 transition-colors"
                    :aria-label="`Visit ${project.title} website`"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a
                    v-if="project.github"
                    :href="project.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 transition-colors"
                    :aria-label="`View ${project.title} code on GitHub`"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div class="p-6 flex-grow flex flex-col">
              <span class="text-sm text-primary-500 dark:text-primary-400 font-medium mb-2">{{ project.category }}</span>
              <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">{{ project.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{{ project.description }}</p>
              
              <div class="flex flex-wrap gap-2 mt-auto">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-xs"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>