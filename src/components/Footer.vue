<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { gsap, reduced, scrollToTop } from '../lib/gsap'
import { nav, site, socials } from '../data/site'
import ArrowIcon from './ArrowIcon.vue'
import Logo from './Logo.vue'

const route = useRoute()
const root = ref<HTMLElement | null>(null)
const time = ref('')
const year = new Date().getFullYear()

// The contact page already is the call to action, so the big one is skipped there.
const showCta = computed(() => route.name !== 'contact')

let timer: number | undefined
let ctx: gsap.Context | null = null

function tick() {
  time.value = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: site.timeZone,
  }).format(new Date())
}

onMounted(() => {
  tick()
  timer = window.setInterval(tick, 15000)

  if (reduced || !root.value) return
  ctx = gsap.context(() => {
    // The giant wordmark rises letter by letter each time the footer comes into view.
    gsap.from('.footer-letter', {
      yPercent: 110,
      duration: 1.2,
      stagger: 0.035,
      scrollTrigger: {
        trigger: '.footer-wordmark',
        start: 'top 96%',
        toggleActions: 'play none none reset',
      },
    })
  }, root.value)
})

onUnmounted(() => {
  window.clearInterval(timer)
  ctx?.revert()
})

const wordmark = 'Prosper Edafe'.split('')
</script>

<template>
  <footer ref="root" class="relative overflow-hidden border-t border-line bg-ink-800">
    <!-- Call to action -->
    <section v-if="showCta" class="px-gutter pb-16 pt-section">
      <p class="label mb-8 flex items-center gap-3">
        <span class="inline-block h-2 w-2 animate-pulse rounded-full bg-accent"></span>
        Available for new projects
      </p>

      <div class="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <h2 class="display text-[clamp(3.2rem,12vw,12rem)]">
          <span v-chars class="block">Let's build</span>
          <span v-chars="{ delay: 0.12 }" class="serif-i block text-accent">something good.</span>
        </h2>

        <router-link
          v-magnetic="0.4"
          to="/contact"
          class="cta-circle shrink-0"
          data-cursor="link"
        >
          <span>Get in touch</span>
          <ArrowIcon :size="18" />
        </router-link>
      </div>

      <div v-reveal class="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4">
        <a :href="`mailto:${site.email}`" class="link-line font-display text-xl md:text-2xl">
          {{ site.email }}
        </a>
        <a :href="site.whatsapp" target="_blank" rel="noopener noreferrer" class="link-line font-display text-xl md:text-2xl">
          {{ site.phoneDisplay }}
        </a>
      </div>
    </section>

    <div class="px-gutter">
      <div v-rule class="rule"></div>
    </div>

    <!-- Link columns -->
    <section class="grid grid-cols-2 gap-10 px-gutter py-12 md:grid-cols-4">
      <div class="col-span-2 md:col-span-1">
        <Logo :size="44" />
        <p class="mt-5 max-w-[16rem] text-sm text-mute">
          Software engineer building for web, mobile and desktop since {{ site.startedYear }}.
        </p>
      </div>

      <div>
        <p class="label mb-4">Sitemap</p>
        <ul class="space-y-2">
          <li v-for="item in nav" :key="item.to">
            <router-link :to="item.to" class="footer-link">
              <span class="roll"><span>{{ item.label }}</span><span aria-hidden="true">{{ item.label }}</span></span>
            </router-link>
          </li>
        </ul>
      </div>

      <div>
        <p class="label mb-4">Connect</p>
        <ul class="space-y-2">
          <li v-for="s in socials" :key="s.label">
            <a :href="s.url" target="_blank" rel="noopener noreferrer" class="footer-link">
              <span class="roll"><span>{{ s.label }}</span><span aria-hidden="true">{{ s.label }}</span></span>
            </a>
          </li>
        </ul>
      </div>

      <div class="col-span-2 md:col-span-1 md:text-right">
        <p class="label mb-4">Local time</p>
        <p class="font-display text-3xl font-bold tabular-nums tracking-tight">
          {{ time }} <span class="text-base font-normal text-mute">WAT</span>
        </p>
        <p class="mt-1 text-sm text-mute">{{ site.location }}</p>
        <button class="footer-link mt-6 inline-flex items-center gap-2" @click="scrollToTop(true)">
          <span class="roll"><span>Back to top</span><span aria-hidden="true">Back to top</span></span>
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </section>

    <!-- Giant wordmark -->
    <div class="footer-wordmark px-gutter" aria-hidden="true">
      <span v-for="(l, i) in wordmark" :key="i" class="footer-letter-mask">
        <span class="footer-letter">{{ l === ' ' ? ' ' : l }}</span>
      </span>
    </div>

    <div class="flex flex-col gap-2 px-gutter pb-9 pr-24 pt-9 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-mute sm:flex-row sm:justify-between">
      <span>© {{ year }} Prosper Edafe</span>
      <span>Designed & built with Vue + GSAP</span>
    </div>
  </footer>
</template>

<style scoped>
.cta-circle {
  display: grid;
  place-items: center;
  align-content: center;
  gap: 0.6rem;
  width: clamp(9rem, 15vw, 13rem);
  height: clamp(9rem, 15vw, 13rem);
  border-radius: 50%;
  background: var(--accent);
  color: var(--ink);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: background-color 0.4s;
}
.cta-circle:hover {
  background: var(--bone);
}
.cta-circle svg {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.cta-circle:hover svg {
  transform: translate(4px, -4px) scale(1.15);
}

.footer-link {
  font-size: 0.95rem;
  color: rgba(237, 232, 223, 0.85);
  transition: color 0.3s;
}
.footer-link:hover {
  color: var(--accent);
}

.footer-wordmark {
  display: flex;
  justify-content: space-between;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: 12.6vw;
  line-height: 0.82;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  color: var(--bone);
  user-select: none;
}
.footer-letter-mask {
  display: inline-block;
  overflow: hidden;
  padding-top: 0.06em;
}
.footer-letter {
  display: inline-block;
  will-change: transform;
}
</style>
