<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const featuredProjects = ref([
  {
    id: 1,
    title: "Pebbles Signature",
    description: "An e-commerce website for a fashion brand with product filtering, cart functionality, and a seamless checkout process.",
    image: "https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Vue.js", "TypeScript", "TailwindCSS", "Firebase"],
    link: "https://pebbles-signature.com"
  },
  {
    id: 2,
    title: "DiLusso Store",
    description: "A modern e-commerce platform featuring responsive design, user authentication, and payment integration.",
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    link: "https://dilussostore.shop"
  },
  {
    id: 3,
    title: "PlaySafari",
    description: "A gamification platform for educational content with interactive learning modules and progress tracking.",
    image: "https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Vue.js", "JavaScript", "SCSS", "Supabase"],
    link: "https://playsafari.ca"
  }
])

const navigateToProjects = () => {
  router.push('/projects')
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-heading">
        <h2 class="text-primary-600 dark:text-primary-400">Featured Projects</h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Take a look at some of my recent projects that showcase my skills and expertise.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="(project, index) in featuredProjects" 
          :key="project.id"
          class="card group transform hover:-translate-y-2 transition-all duration-300"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 + 200 } }"
        >
          <div class="relative overflow-hidden h-48">
            <img 
              :src="project.image" 
              :alt="project.title" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">{{ project.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ project.description }}</p>
            
            <div class="flex flex-wrap gap-2">
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
      
      <div class="mt-12 text-center">
        <button @click="navigateToProjects" class="btn btn-outline">
          View All Projects
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>