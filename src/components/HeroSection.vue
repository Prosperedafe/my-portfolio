<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};

onMounted(() => {
  // Animate hero elements
  gsap.from(".hero-title", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".hero-subtitle", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
  });

  gsap.from(".hero-buttons", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.5,
    ease: "power3.out",
  });

  gsap.from(".hero-image", {
    opacity: 0,
    x: 50,
    duration: 1,
    delay: 0.7,
    ease: "power3.out",
  });
});
</script>

<template>
  <section class="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
      <div
        class="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-100 dark:bg-primary-900 rounded-bl-full opacity-20"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary-100 dark:bg-secondary-900 rounded-tr-full opacity-20"
      ></div>
    </div>

    <div class="container relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1
            class="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Hi, I'm
            <span class="text-primary-600 dark:text-primary-400"
              >Prosper Edafe</span
            >
          </h1>

          <p
            class="hero-subtitle text-xl text-gray-700 dark:text-gray-300 mb-8"
          >
            A dedicated Frontend Engineer with a strong engineering mindset,
            focused on designing and developing robust, scalable, and
            user-friendly Web, Mobile, and Desktop applications using modern
            technologies.
          </p>

          <div class="hero-buttons flex flex-wrap gap-4">
            <button @click="navigateTo('/projects')" class="btn btn-primary">
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
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                ></path>
              </svg>
              View Projects
            </button>

            <button @click="navigateTo('/contact')" class="btn btn-outline">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              Contact Me
            </button>
          </div>

          <div class="mt-12 flex items-center">
            <span class="text-gray-600 dark:text-gray-400 mr-6"
              >Tech Stack:</span
            >
            <div class="flex space-x-4">
              <!-- Tech stack icons -->

              <div
                class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-primary-500"
                title="React/React Native"
              >
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="32" cy="32" r="6" fill="#2563EB" />
                  <g stroke="#2563EB" stroke-width="2" fill="none">
                    <ellipse
                      rx="20"
                      ry="8"
                      cx="32"
                      cy="32"
                      transform="rotate(0 32 32)"
                    />
                    <ellipse
                      rx="20"
                      ry="8"
                      cx="32"
                      cy="32"
                      transform="rotate(60 32 32)"
                    />
                    <ellipse
                      rx="20"
                      ry="8"
                      cx="32"
                      cy="32"
                      transform="rotate(120 32 32)"
                    />
                  </g>
                </svg>
              </div>
              <div
                class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-primary-500"
                title="Electron"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 122.88 122.88"
                >
                  <title>electron</title>
                  <path
                    d="M122.88,61.44a61.44,61.44,0,1,0-61.44,61.44,61.44,61.44,0,0,0,61.44-61.44Z"
                    style="fill: #374151; fill-rule: evenodd"
                  />
                  <path
                    d="M48.24,34.41c-12.48-2.27-22.35.11-26.28,6.92-2.94,5.09-2.1,11.83,2,19a1.28,1.28,0,1,0,2.22-1.27c-3.72-6.49-4.44-12.31-2-16.48,3.27-5.66,12.07-7.78,23.61-5.68L48,37a1.28,1.28,0,0,0,.25-2.54ZM30,71.64A80.13,80.13,0,0,0,49.11,86.7C67.21,97.16,86.49,100,96,93.47a1.26,1.26,0,0,0,.58-1.07,1.28,1.28,0,0,0-2-1C86,97.16,67.73,94.5,50.39,84.49A77.33,77.33,0,0,1,31.92,69.91a1.33,1.33,0,0,0-1-.42,1.28,1.28,0,0,0-1.28,1.28,1.33,1.33,0,0,0,.33.87Z"
                    style="fill: #3b82f6"
                  />
                  <path
                    d="M93.42,67.56c8.17-9.65,11-19.37,7.1-26.16-2.89-5-9-7.65-17.11-7.75a1.28,1.28,0,0,0,0,2.56c7.3.09,12.56,2.37,14.92,6.47,3.26,5.64.72,14.3-6.84,23.23a1.28,1.28,0,1,0,2,1.65Zm-23-34.38a80.12,80.12,0,0,0-22.81,9C29,53,16.76,68.93,18.46,80.47A1.28,1.28,0,0,0,21,80.1C19.48,69.85,31,54.77,48.93,44.44A77.24,77.24,0,0,1,71,35.69a1.28,1.28,0,0,0-.24-2.54,1.36,1.36,0,0,0-.29,0Z"
                    style="fill: #3b82f6"
                  />
                  <path
                    d="M42.13,90.12c4.27,11.93,11.26,19.28,19.13,19.28,5.73,0,11-3.91,15.17-10.79a1.21,1.21,0,0,0,.19-.67,1.28,1.28,0,0,0-2.38-.65c-3.72,6.19-8.29,9.55-13,9.55-6.53,0-12.77-6.55-16.72-17.58a1.28,1.28,0,0,0-2.49.41,1.16,1.16,0,0,0,.08.45Zm41.44-3.19A80.15,80.15,0,0,0,87,63.2C87,42,79.55,23.72,69,19a1.34,1.34,0,0,0-.49-.1,1.28,1.28,0,0,0-.55,2.44C77.37,25.55,84.42,42.9,84.42,63.2a77.92,77.92,0,0,1-3.29,23,1.34,1.34,0,0,0-.06.4,1.28,1.28,0,0,0,1.28,1.28,1.29,1.29,0,0,0,1.23-.92Zm21.67-2A6.13,6.13,0,1,0,99.11,91a6.12,6.12,0,0,0,6.13-6.12Zm-2.56,0a3.57,3.57,0,1,1-3.57-3.57,3.56,3.56,0,0,1,3.57,3.57Zm-79.4,7.75a6.13,6.13,0,1,0-6.13-6.13,6.13,6.13,0,0,0,6.13,6.13Zm0-2.56a3.57,3.57,0,1,1,3.57-3.57,3.57,3.57,0,0,1-3.57,3.57Z"
                    style="fill: #3b82f6"
                  />
                  <path
                    d="M61.26,26.13A6.13,6.13,0,1,0,55.13,20a6.12,6.12,0,0,0,6.13,6.12Zm0-2.56A3.57,3.57,0,1,1,64.82,20a3.56,3.56,0,0,1-3.56,3.56Zm.93,37.69a4.43,4.43,0,0,1-5.27-3.39,4.92,4.92,0,0,1-.1-.94,4.43,4.43,0,1,1,5.37,4.33Z"
                    style="fill: #3b82f6"
                  />
                </svg>
              </div>

              <div
                class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-primary-500"
                title="Next.js"
              >
                <svg
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                >
                  <g transform="translate(.722 .64) scale(6.375)">
                    <circle fill="#374151" cx="40" cy="40" r="40" />
                    <path
                      d="M66.448 70.009L30.73 24H24v31.987h5.384v-25.15l32.838 42.427a40.116 40.116 0 004.226-3.255z"
                      fill="url(#prefix___Linear1)"
                      fill-rule="nonzero"
                    />
                    <path
                      fill="url(#prefix___Linear2)"
                      d="M51.111 24h5.333v32h-5.333z"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="prefix___Linear1"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="rotate(51.103 -29.93 76.555) scale(25.1269)"
                    >
                      <stop offset="0" stop-color="#3b82f6" />
                      <stop offset="1" stop-color="#3b82f6" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="prefix___Linear2"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="rotate(90.218 14.934 38.787) scale(23.50017)"
                    >
                      <stop offset="0" stop-color="#3b82f6" />
                      <stop offset="1" stop-color="#3b82f6" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div
                class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-primary-500"
                title="Vue.js"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path
                    d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z"
                  ></path>
                </svg>
              </div>
              <div
                class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-blue-500"
                title="TypeScript"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path
                    d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"
                  ></path>
                </svg>
              </div>
              <div
                class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-cyan-500"
                title="Tailwind CSS"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path
                    d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-image">
          <img
            src="../assets/prosper-1.jpg"
            alt="Prosper Edafe"
            class="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  </section>
</template>
