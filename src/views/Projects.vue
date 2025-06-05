<script setup lang="ts">
import { ref, computed } from "vue";
import hblImg from "../assets/hbl.png";
import playSafari from "../assets/play-safari.png";
import dilusso from "../assets/dilusso.png";
import quilox from "../assets/quilox.webp";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  link: string;
}

const projects = ref<Project[]>([
  {
    id: 2,
    title: "DiLusso Store",
    description:
      "A modern e-commerce platform featuring responsive design, user authentication, and payment integration.",
    image: dilusso,
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    category: "Full Stack",
    link: "https://dilussostore.shop",
  },
  {
    id: 3,
    title: "PlaySafari",
    description:
      "A gamification platform for educational content with interactive learning modules and progress tracking.",
    image: playSafari,
    technologies: ["Vue.js", "JavaScript", "SCSS", "Supabase"],
    category: "Web Application",
    link: "https://playsafari.ca",
  },
  {
    id: 4,
    title: "Quilox Mobile App",
    description:
      "A mobile application for event management and ticket booking with real-time notifications.",
    image: quilox,
    technologies: ["React Native", "TypeScript", "Firebase", "Redux"],
    category: "Mobile App",
    link: "https://play.google.com/store/apps/details?id=com.quilox.mobile",
  },
  {
    id: 5,
    title: "OyaSync HBL",
    description:
      "A task management and collaboration tool for teams with real-time updates and file sharing capabilities.",
    image: hblImg,
    technologies: ["Vue.js", "TypeScript", "TailwindCSS", "Supabase"],
    category: "Web Application",
    link: "https://apps.microsoft.com/detail/9N9TRMZDRQ2L?hl=en-us&gl=GB&ocid=pdpshare",
  },
]);

const categories = computed(() => {
  const allCategories = projects.value.map((project) => project.category);
  return ["All", ...new Set(allCategories)];
});

const selectedCategory = ref("All");

const filteredProjects = computed(() => {
  if (selectedCategory.value === "All") {
    return projects.value;
  }
  return projects.value.filter(
    (project) => project.category === selectedCategory.value
  );
});

const setCategory = (category: string) => {
  selectedCategory.value = category;
};
</script>

<template>
  <div class="pt-24">
    <section class="section">
      <div class="container">
        <div class="section-heading">
          <h2 class="text-primary-600 dark:text-primary-400">Projects</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my latest projects that showcase my skills and expertise in
            web development.
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
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-primary-900',
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
              <div
                class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div class="flex space-x-3">
                  <a
                    :href="project.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 transition-colors"
                    :aria-label="`Visit ${project.title} website`"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div class="p-6 flex-grow flex flex-col">
              <span
                class="text-sm text-primary-500 dark:text-primary-400 font-medium mb-2"
                >{{ project.category }}</span
              >
              <h3
                class="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200"
              >
                {{ project.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                {{ project.description }}
              </p>

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
