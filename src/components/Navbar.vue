<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { gsap, ScrollTrigger, reduced, whenReady } from '../lib/gsap'
import { nav, socials, site } from '../data/site'
import Logo from './Logo.vue'
import ArrowIcon from './ArrowIcon.vue'

const route = useRoute()
const header = ref<HTMLElement | null>(null)
const menu = ref<HTMLElement | null>(null)
const open = ref(false)
const scrolled = ref(false)

let menuTl: gsap.core.Timeline | null = null
let trigger: ScrollTrigger | null = null

const isActive = (path: string) =>
  path === '/' ? route.path === '/' : route.path.startsWith(path)

function buildMenu() {
  if (!menu.value) return
  const q = gsap.utils.selector(menu.value)
  menuTl = gsap
    .timeline({ paused: true, defaults: { ease: 'silk' } })
    .set(menu.value, { visibility: 'visible' })
    .fromTo(
      menu.value,
      { clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' },
      { clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)', duration: reduced ? 0.01 : 1, ease: 'snap' },
    )
    .from(q('.menu-link-inner'), { yPercent: 120, rotate: 5, duration: 0.9, stagger: 0.07 }, '-=0.55')
    .from(q('.menu-fade'), { autoAlpha: 0, y: 20, duration: 0.6, stagger: 0.05 }, '-=0.6')
}

function toggle() {
  open.value = !open.value
}

watch(open, (v) => {
  if (!menuTl) return
  document.body.style.overflow = v ? 'hidden' : ''
  if (v) menuTl.timeScale(1).play()
  else menuTl.timeScale(1.6).reverse()
})

// Close the menu once the next page is in.
watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  buildMenu()
  window.addEventListener('keydown', onKey)

  if (header.value && !reduced) {
    gsap.set(header.value, { yPercent: -130 })
    whenReady(() => gsap.to(header.value, { yPercent: 0, duration: 1.2, delay: 0.35 }))
  }

  // Tuck the bar away while scrolling down, bring it back on the way up.
  trigger = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate(self) {
      scrolled.value = self.scroll() > 40
      if (!header.value || open.value || reduced) return
      const hide = self.direction === 1 && self.scroll() > 320
      gsap.to(header.value, { yPercent: hide ? -130 : 0, duration: 0.6, overwrite: 'auto' })
    },
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  trigger?.kill()
  menuTl?.kill()
  document.body.style.overflow = ''
})
</script>

<template>
  <header ref="header" class="fixed inset-x-0 top-0 z-50 px-gutter pt-4 md:pt-5">
    <div
      class="nav-bar mx-auto flex items-center justify-between rounded-full py-2 pl-2 pr-2 transition-all duration-500"
      :class="scrolled && !open ? 'is-scrolled' : ''"
    >
      <router-link to="/" class="flex items-center gap-3" aria-label="Prosper Edafe, home">
        <Logo :size="40" />
        <span class="hidden font-display text-[1.05rem] font-bold tracking-tight sm:block">
          Prosper Edafe
        </span>
      </router-link>

      <nav class="hidden items-center gap-9 md:flex" aria-label="Main">
        <router-link
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ 'is-active': isActive(item.to) }"
        >
          <span class="roll">
            <span>{{ item.label }}</span>
            <span aria-hidden="true">{{ item.label }}</span>
          </span>
        </router-link>
      </nav>

      <div class="flex items-center gap-2">
        <router-link v-magnetic="0.25" to="/contact" class="btn btn-accent hidden !px-5 !py-3 md:inline-flex">
          Let's talk <ArrowIcon :size="11" />
        </router-link>

        <button
          class="burger md:hidden"
          :class="{ 'is-open': open }"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          @click="toggle"
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Full-screen mobile menu -->
  <div id="mobile-menu" ref="menu" class="mobile-menu md:hidden" :aria-hidden="!open">
    <div class="flex h-full flex-col justify-between px-gutter pb-8 pt-28">
      <nav class="flex flex-col" aria-label="Mobile">
        <span class="menu-fade label mb-6">Menu</span>
        <router-link
          v-for="(item, i) in nav"
          :key="item.to"
          :to="item.to"
          class="menu-link"
          :class="{ 'is-active': isActive(item.to) }"
          :tabindex="open ? 0 : -1"
        >
          <span class="menu-link-inner">
            <sup>0{{ i + 1 }}</sup>{{ item.label }}
          </span>
        </router-link>
      </nav>

      <div>
        <div class="menu-fade mb-6 h-px w-full bg-ink/20"></div>
        <div class="flex flex-wrap gap-x-6 gap-y-2">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.url"
            target="_blank"
            rel="noopener noreferrer"
            class="menu-fade font-mono text-xs uppercase tracking-[0.14em]"
            :tabindex="open ? 0 : -1"
          >
            {{ s.label }} ↗
          </a>
        </div>
        <p class="menu-fade mt-6 font-mono text-[0.68rem] uppercase tracking-[0.14em] opacity-60">
          {{ site.location }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-bar {
  max-width: 100%;
  border: 1px solid transparent;
}
.nav-bar.is-scrolled {
  background: rgba(17, 17, 19, 0.72);
  border-color: var(--line);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
}

.nav-link {
  position: relative;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(237, 232, 223, 0.7);
  transition: color 0.3s;
}
.nav-link:hover,
.nav-link.is-active {
  color: var(--bone);
}
.nav-link::before {
  content: '';
  position: absolute;
  left: -0.85rem;
  top: 50%;
  width: 5px;
  height: 5px;
  margin-top: -2.5px;
  border-radius: 50%;
  background: var(--accent);
  transform: scale(0);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-link.is-active::before {
  transform: scale(1);
}

.burger {
  position: relative;
  z-index: 60;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--accent);
}
@media (min-width: 768px) {
  .burger {
    display: none;
  }
}
.burger span {
  position: absolute;
  width: 18px;
  height: 1.5px;
  background: var(--ink);
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
}
.burger span:first-child {
  transform: translateY(-3.5px);
}
.burger span:last-child {
  transform: translateY(3.5px);
}
.burger.is-open {
  background: var(--ink);
}
.burger.is-open span {
  background: var(--accent);
}
.burger.is-open span:first-child {
  transform: rotate(45deg);
}
.burger.is-open span:last-child {
  transform: rotate(-45deg);
}

.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 45;
  visibility: hidden;
  background: var(--accent);
  color: var(--ink);
  clip-path: circle(0% at calc(100% - 2.5rem) 2.5rem);
}
.menu-link {
  display: block;
  overflow: hidden;
  padding: 0.1em 0 0.16em;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: clamp(3rem, 15vw, 5.5rem);
  line-height: 1;
  letter-spacing: -0.045em;
}
.menu-link-inner {
  display: inline-block;
}
.menu-link sup {
  margin-right: 0.6em;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 400;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  vertical-align: top;
  position: relative;
  top: 1.4em;
}
.menu-link.is-active .menu-link-inner {
  font-family: 'Instrument Serif', serif;
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.02em;
}
</style>
