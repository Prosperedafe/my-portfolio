<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap, isTouch, reduced } from '../lib/gsap'

// A dot that tracks the pointer exactly and a ring that trails it.
// Elements can opt in with data-cursor="view" (and data-cursor-text="Open").
const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)
const text = ref('')
const enabled = !isTouch && !reduced

let cleanup = () => {}

onMounted(() => {
  if (!enabled || !dot.value || !ring.value) return
  const d = dot.value
  const r = ring.value
  document.documentElement.classList.add('has-cursor')

  gsap.set([d, r], { xPercent: -50, yPercent: -50, autoAlpha: 0 })
  const dx = gsap.quickTo(d, 'x', { duration: 0.12, ease: 'power3.out' })
  const dy = gsap.quickTo(d, 'y', { duration: 0.12, ease: 'power3.out' })
  const rx = gsap.quickTo(r, 'x', { duration: 0.55, ease: 'power3.out' })
  const ry = gsap.quickTo(r, 'y', { duration: 0.55, ease: 'power3.out' })

  let shown = false
  let state = ''

  const setState = (next: string, label = '') => {
    if (next === state && label === text.value) return
    state = next
    text.value = label
    if (next === 'view') {
      gsap.to(r, { width: 104, height: 104, backgroundColor: '#C8F542', borderColor: '#C8F542', duration: 0.5 })
      gsap.to(d, { scale: 0, duration: 0.3 })
    } else if (next === 'link') {
      gsap.to(r, { width: 64, height: 64, backgroundColor: 'rgba(200,245,66,0)', borderColor: '#C8F542', duration: 0.45 })
      gsap.to(d, { scale: 0.5, duration: 0.3 })
    } else {
      gsap.to(r, {
        width: 38,
        height: 38,
        backgroundColor: 'rgba(200,245,66,0)',
        borderColor: 'rgba(237,232,223,0.5)',
        duration: 0.45,
      })
      gsap.to(d, { scale: 1, duration: 0.3 })
    }
  }

  const move = (e: MouseEvent) => {
    dx(e.clientX)
    dy(e.clientY)
    rx(e.clientX)
    ry(e.clientY)
    if (!shown) {
      shown = true
      gsap.set([d, r], { x: e.clientX, y: e.clientY })
      gsap.to([d, r], { autoAlpha: 1, duration: 0.3 })
    }
  }

  const over = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null
    if (!target?.closest) return
    const custom = target.closest<HTMLElement>('[data-cursor]')
    if (custom) {
      setState(custom.dataset.cursor || 'view', custom.dataset.cursorText || 'View')
      return
    }
    if (target.closest('a, button, [role="button"], input, textarea, label')) setState('link')
    else setState('')
  }

  const hide = () => {
    shown = false
    gsap.to([d, r], { autoAlpha: 0, duration: 0.25 })
  }
  const down = () => gsap.to(r, { scale: 0.82, duration: 0.2 })
  const up = () => gsap.to(r, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' })

  window.addEventListener('mousemove', move, { passive: true })
  document.addEventListener('mouseover', over, { passive: true })
  document.documentElement.addEventListener('mouseleave', hide)
  window.addEventListener('mousedown', down)
  window.addEventListener('mouseup', up)

  cleanup = () => {
    window.removeEventListener('mousemove', move)
    document.removeEventListener('mouseover', over)
    document.documentElement.removeEventListener('mouseleave', hide)
    window.removeEventListener('mousedown', down)
    window.removeEventListener('mouseup', up)
    document.documentElement.classList.remove('has-cursor')
  }
})

onUnmounted(() => cleanup())
</script>

<template>
  <template v-if="enabled">
    <div ref="ring" class="cursor-ring" aria-hidden="true">
      <span>{{ text }}</span>
    </div>
    <div ref="dot" class="cursor-dot" aria-hidden="true"></div>
  </template>
</template>

<style scoped>
.cursor-dot,
.cursor-ring {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 90;
  pointer-events: none;
  border-radius: 9999px;
  visibility: hidden;
}
.cursor-dot {
  width: 7px;
  height: 7px;
  background: var(--accent);
}
.cursor-ring {
  width: 38px;
  height: 38px;
  border: 1px solid rgba(237, 232, 223, 0.5);
  display: grid;
  place-items: center;
  overflow: hidden;
}
.cursor-ring span {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink);
  white-space: nowrap;
}
</style>
