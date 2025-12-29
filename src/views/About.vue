<script setup lang="ts">
import { ref } from "vue";

const experienceItems = ref([
  {
    company: "Dosh Services",
    position: "Frontend Engineer",
    period: "November 2022 – December 2024",
    description:
      "Developed responsive and accessible web and mobile applications using modern JavaScript frameworks and libraries. Contributed to the design and implementation of scalable frontend architectures.",
    skills: [
      "TypeScript",
      "React",
      "React Native",
      "Responsive Design",
      "REST APIs",
      "WebSockets",
    ],
  },
  {
    company: "OyaSync Ltd",
    position: "Software Engineer",
    period: "November 2024 – May 2025",
    description:
      "Designing, building, and maintaining desktop applications for business sales management using Electron. Also contributed to the development of internal web applications.",
    skills: ["React", "TypeScript", "Electron", "REST APIs"],
  },
]);

// const educationItems = ref([
//   {
//     institution: "University of Technology",
//     degree: "Bachelor of Science in Computer Science",
//     period: "2017 - 2021",
//     description:
//       "Specialized in software development with a focus on web technologies and computer programming.",
//   },
// ]);
</script>

<template>
  <div class="pt-16">
    <section class="section">
      <div class="container">
        <div class="section-heading">
          <h2 class="text-primary-600 dark:text-primary-400">About Me</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }"
          >
            <img
              src="/prosper.jpg"
              alt="Professional profile photo"
              class="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
          >
            <h3 class="text-2xl font-bold mb-4">Prosper Edafe</h3>
            <p class="text-lg mb-6 text-gray-700 dark:text-gray-300">
              I'm a passionate frontend developer with expertise in building
              beautiful, responsive web applications using modern technologies.
            </p>
            <p class="text-lg mb-6 text-gray-700 dark:text-gray-300">
              With several years of experience in web development, I specialize
              in creating performant and user-friendly interfaces that provide
              exceptional user experiences.
            </p>
            <p class="text-lg mb-6 text-gray-700 dark:text-gray-300">
              My approach combines clean code, modern design principles, and the
              latest web technologies to build applications that not only look
              great but also perform exceptionally well.
            </p>

            <div class="flex flex-wrap gap-3 mt-8">
              <a
                href="https://github.com/Prosperedafe"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/edafe-prosper-b046ba239/"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
                LinkedIn
              </a>
              <a
                href="/Prosper-Edafe-resume.pdf"
                target="_blank"
                class="btn btn-outline"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="section bg-gray-50 dark:bg-gray-800">
      <div class="container">
        <div class="section-heading">
          <h2 class="text-primary-600 dark:text-primary-400">
            Work Experience
          </h2>
        </div>

        <div class="space-y-12">
          <div
            v-for="(item, index) in experienceItems"
            :key="index"
            class="card p-8"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { delay: index * 100 + 200 },
            }"
          >
            <div
              class="flex flex-col md:flex-row md:justify-between md:items-start mb-4"
            >
              <div>
                <h3
                  class="text-xl font-bold text-primary-600 dark:text-primary-400"
                >
                  {{ item.position }}
                </h3>
                <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {{ item.company }}
                </p>
              </div>
              <p class="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                {{ item.period }}
              </p>
            </div>

            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ item.description }}
            </p>

            <div class="flex flex-wrap gap-2 mt-4">
              <span
                v-for="skill in item.skills"
                :key="skill"
                class="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <!-- <section class="section">
      <div class="container">
        <div class="section-heading">
          <h2 class="text-primary-600 dark:text-primary-400">Education</h2>
        </div>

        <div class="space-y-12">
          <div
            v-for="(item, index) in educationItems"
            :key="index"
            class="card p-8"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { delay: index * 100 + 200 },
            }"
          >
            <div
              class="flex flex-col md:flex-row md:justify-between md:items-start mb-4"
            >
              <div>
                <h3
                  class="text-xl font-bold text-primary-600 dark:text-primary-400"
                >
                  {{ item.degree }}
                </h3>
                <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {{ item.institution }}
                </p>
              </div>
              <p class="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                {{ item.period }}
              </p>
            </div>

            <p class="text-gray-700 dark:text-gray-300">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>
