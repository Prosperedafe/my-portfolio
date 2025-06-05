<script setup lang="ts">
import { ref, reactive } from "vue";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const formData = reactive({ ...initialFormData });
const errors = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);
const isSubmitted = ref(false);
const submitError = ref("");

const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateForm = (): boolean => {
  let isValid = true;

  // Reset errors
  Object.keys(errors).forEach((key) => {
    errors[key as keyof typeof errors] = "";
  });

  // Validate name
  if (!formData.name.trim()) {
    errors.name = "Name is required";
    isValid = false;
  }

  // Validate email
  if (!formData.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
    isValid = false;
  }

  // Validate subject
  if (!formData.subject.trim()) {
    errors.subject = "Subject is required";
    isValid = false;
  }

  // Validate message
  if (!formData.message.trim()) {
    errors.message = "Message is required";
    isValid = false;
  } else if (formData.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  submitError.value = "";

  try {
    // In a real application, you would send the form data to your backend
    // For this example, we'll simulate a successful form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Reset form after successful submission
    Object.assign(formData, initialFormData);
    isSubmitted.value = true;
  } catch (error) {
    submitError.value =
      "An error occurred while submitting the form. Please try again.";
    console.error("Form submission error:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="pt-24">
    <section class="section">
      <div class="container">
        <div class="section-heading">
          <h2 class="text-primary-600 dark:text-primary-400">Contact Me</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach
            out!
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <!-- Contact Information -->
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :enter="{ opacity: 1, x: 0 }"
          >
            <h3
              class="text-2xl font-bold mb-6 text-primary-600 dark:text-primary-400"
            >
              Get In Touch
            </h3>

            <div class="space-y-6">
              <div class="flex items-start">
                <div
                  class="flex-shrink-0 p-3 bg-primary-100 dark:bg-primary-900 rounded-full"
                >
                  <svg
                    class="w-6 h-6 text-primary-600 dark:text-primary-400"
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
                </div>
                <div class="ml-4">
                  <h4
                    class="text-lg font-medium text-gray-800 dark:text-gray-200"
                  >
                    Email
                  </h4>
                  <a
                    href="mailto:mamusedafe19@gmail.com"
                    class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    mamusedafe19@gmail.com
                  </a>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="flex-shrink-0 p-3 bg-primary-100 dark:bg-primary-900 rounded-full"
                >
                  <svg
                    class="w-6 h-6 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    ></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <h4
                    class="text-lg font-medium text-gray-800 dark:text-gray-200"
                  >
                    Connect
                  </h4>
                  <div class="flex space-x-4 mt-2">
                    <a
                      href="https://github.com/Prosperedafe"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      <svg
                        class="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/edafe-prosper-b046ba239/"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      <svg
                        class="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="flex-shrink-0 p-3 bg-primary-100 dark:bg-primary-900 rounded-full"
                >
                  <svg
                    class="w-6 h-6 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <h4
                    class="text-lg font-medium text-gray-800 dark:text-gray-200"
                  >
                    Resume
                  </h4>
                  <a
                    href="/Prosper-Edafe-resume.pdf"
                    target="_blank"
                    class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    Download Resume
                  </a>
                </div>
              </div>
            </div>

            <div class="mt-10">
              <h4
                class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200"
              >
                Available For
              </h4>
              <div class="flex flex-wrap gap-3">
                <span
                  class="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full"
                >
                  Full-time Positions
                </span>
                <span
                  class="px-4 py-2 bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400 rounded-full"
                >
                  Freelance Projects
                </span>
                <span
                  class="px-4 py-2 bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400 rounded-full"
                >
                  Consulting
                </span>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :enter="{ opacity: 1, x: 0 }"
          >
            <div v-if="isSubmitted" class="text-center py-12">
              <svg
                class="w-16 h-16 text-green-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3
                class="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200"
              >
                Message Sent!
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                Thank you for reaching out. I'll get back to you as soon as
                possible.
              </p>
              <button @click="isSubmitted = false" class="btn btn-primary">
                Send Another Message
              </button>
            </div>

            <form v-else @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  :class="[
                    'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors',
                    errors.name
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-200 dark:focus:ring-primary-900',
                  ]"
                  placeholder="Your name"
                />
                <p v-if="errors.name" class="mt-1 text-sm text-red-500">
                  {{ errors.name }}
                </p>
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  :class="[
                    'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors',
                    errors.email
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-200 dark:focus:ring-primary-900',
                  ]"
                  placeholder="Your email address"
                />
                <p v-if="errors.email" class="mt-1 text-sm text-red-500">
                  {{ errors.email }}
                </p>
              </div>

              <div>
                <label
                  for="subject"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  v-model="formData.subject"
                  :class="[
                    'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors',
                    errors.subject
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-200 dark:focus:ring-primary-900',
                  ]"
                  placeholder="Subject"
                />
                <p v-if="errors.subject" class="mt-1 text-sm text-red-500">
                  {{ errors.subject }}
                </p>
              </div>

              <div>
                <label
                  for="message"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  rows="5"
                  :class="[
                    'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors',
                    errors.message
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-200 dark:focus:ring-primary-900',
                  ]"
                  placeholder="Your message"
                ></textarea>
                <p v-if="errors.message" class="mt-1 text-sm text-red-500">
                  {{ errors.message }}
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  class="w-full btn btn-primary"
                  :disabled="isSubmitting"
                >
                  <span
                    v-if="isSubmitting"
                    class="flex items-center justify-center"
                  >
                    <svg
                      class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                  <span v-else>Send Message</span>
                </button>
                <p
                  v-if="submitError"
                  class="mt-2 text-sm text-red-500 text-center"
                >
                  {{ submitError }}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
