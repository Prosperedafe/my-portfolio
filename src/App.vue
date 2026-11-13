<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  gsap,
  ScrollTrigger,
  initSmoother,
  pauseScroll,
  refreshScroll,
  resetReady,
  scrollToTop,
  setReady,
  reduced,
} from './lib/gsap'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Preloader from './components/Preloader.vue'
import Cursor from './components/Cursor.vue'
import WhatsAppFab from './components/WhatsAppFab.vue'

const router = useRouter()
const loading = ref(true)
const curtain = ref<HTMLElement | null>(null)
const curtainLabel = ref('')

// The curtain shows the name of the page you are heading to.
router.beforeEach((to) => {
  curtainLabel.value = String(to.meta.title ?? '')
})

onMounted(() => {
  initSmoother()
  pauseScroll(true)
  // Late-loading images change the page height, so measure again once they are in.
  window.addEventListener('load', () => ScrollTrigger.refresh())
})

function onPreloaderReveal() {
  pauseScroll(false)
  refreshScroll()
  setReady()
}

/* Route transition: columns rise to cover the page, then lift off the new one. */
function onLeave(_el: Element, done: () => void) {
  resetReady()
  if (reduced || !curtain.value) {
    scrollToTop()
    done()
    return
  }
  const q = gsap.utils.selector(curtain.value)
  gsap
    .timeline({
      onComplete: () => {
        scrollToTop()
        done()
      },
    })
    .set(curtain.value, { visibility: 'visible' })
    .set(q('.curtain-col'), { transformOrigin: '50% 100%', scaleY: 0 })
    .set(q('.curtain-label span'), { yPercent: 120 })
    .to(q('.curtain-col'), { scaleY: 1, duration: 0.6, ease: 'snap', stagger: 0.055 })
    .to(q('.curtain-label span'), { yPercent: 0, duration: 0.5 }, '-=0.3')
}

function onEnter(_el: Element, done: () => void) {
  nextTick(() => {
    refreshScroll()
    if (reduced || !curtain.value) {
      setReady()
      done()
      return
    }
    const q = gsap.utils.selector(curtain.value)
    gsap
      .timeline({ onComplete: done })
      .to(q('.curtain-label span'), { yPercent: -120, duration: 0.4, ease: 'power3.in' }, 0.15)
      .set(q('.curtain-col'), { transformOrigin: '50% 0%' })
      .add(() => setReady())
      .to(q('.curtain-col'), { scaleY: 0, duration: 0.7, ease: 'snap', stagger: 0.055 })
      .set(curtain.value, { visibility: 'hidden' })
  })
}
</script>

<template>
  <Preloader v-if="loading" @reveal="onPreloaderReveal" @done="loading = false" />
  <Cursor />
  <Navbar />

  <div ref="curtain" class="curtain" aria-hidden="true">
    <div v-for="n in 5" :key="n" class="curtain-col"></div>
    <div class="curtain-label"><div class="curtain-mask"><span>{{ curtainLabel }}</span></div></div>
  </div>

  <div id="smooth-wrapper">
    <div id="smooth-content">
      <main>
        <router-view v-slot="{ Component, route }">
          <transition :css="false" mode="out-in" @leave="onLeave" @enter="onEnter">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </main>
      <Footer />
    </div>
  </div>

  <WhatsAppFab />
  <div class="grain" aria-hidden="true"></div>
</template>

<style>
.curtain {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  visibility: hidden;
  pointer-events: none;
}
.curtain-col {
  flex: 1;
  /* A hair wider than its slot so no seams show between columns. */
  margin-right: -1px;
  background: var(--accent);
  transform: scaleY(0);
}
.curtain-label {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
.curtain-mask {
  overflow: hidden;
  padding: 0.1em 0.1em 0.2em;
  font-size: clamp(3.5rem, 13vw, 11rem);
}
.curtain-label span {
  display: block;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1;
  color: var(--ink);
}
</style>
