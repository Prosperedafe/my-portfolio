<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap, reduced } from '../lib/gsap'
import Logo from './Logo.vue'

const emit = defineEmits<{ (e: 'reveal'): void; (e: 'done'): void }>()

const root = ref<HTMLElement | null>(null)
const count = ref('000')
const words = ['Hello', 'Bawo', 'Ndewo', 'Sannu', 'How far', 'Welcome']

onMounted(async () => {
  const el = root.value!

  if (reduced) {
    emit('reveal')
    emit('done')
    return
  }

  // Do not start the reveal until the display fonts are in, or the hero would reflow.
  const fonts = Promise.race([
    document.fonts.ready,
    new Promise((resolve) => setTimeout(resolve, 2500)),
  ])

  const q = gsap.utils.selector(el)
  const counter = { v: 0 }
  const wordEls = q('.pre-word')
  gsap.set(wordEls, { yPercent: 130 })

  const tl = gsap.timeline()

  tl.from(q('.pre-fade'), { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.08 })
    .to(
      counter,
      {
        v: 100,
        duration: 2.1,
        ease: 'power2.inOut',
        onUpdate: () => {
          count.value = String(Math.round(counter.v)).padStart(3, '0')
        },
      },
      0,
    )
    .to(q('.pre-bar'), { scaleX: 1, duration: 2.1, ease: 'power2.inOut' }, 0)

  // Greetings flick past, each one replacing the last.
  wordEls.forEach((w, i) => {
    const at = 0.15 + i * 0.32
    tl.to(w, { yPercent: 0, duration: 0.3, ease: 'power3.out' }, at)
    if (i < wordEls.length - 1) {
      tl.to(w, { yPercent: -130, duration: 0.3, ease: 'power3.in' }, at + 0.3)
    }
  })

  await Promise.all([tl.then(), fonts])

  gsap
    .timeline({ onComplete: () => emit('done') })
    .to(q('.pre-word'), { yPercent: -130, duration: 0.5, ease: 'power3.in' })
    .to(q('.pre-fade'), { autoAlpha: 0, y: -16, duration: 0.4, stagger: 0.04, ease: 'power2.in' }, 0)
    .add(() => emit('reveal'), 0.35)
    // The whole panel lifts away with a curved lower edge.
    .fromTo(
      el,
      { clipPath: 'ellipse(150% 150% at 50% 0%)' },
      { clipPath: 'ellipse(150% 0% at 50% 0%)', duration: 1.15, ease: 'snap' },
      0.35,
    )
})
</script>

<template>
  <div ref="root" class="preloader" aria-hidden="true">
    <div class="pre-fade absolute left-gutter top-6 flex items-center gap-3 md:top-8">
      <Logo :size="34" />
      <span class="label !text-bone">Prosper Edafe</span>
    </div>
    <span class="pre-fade label absolute right-gutter top-8 md:top-10">Portfolio — 2026</span>

    <div class="pre-words">
      <div class="pre-line">
        <span v-for="w in words" :key="w" class="pre-word">{{ w }}<i>.</i></span>
      </div>
    </div>

    <div class="absolute inset-x-gutter bottom-6 md:bottom-8">
      <div class="flex items-end justify-between">
        <span class="pre-fade label">Loading experience</span>
        <span class="pre-fade pre-count">{{ count }}</span>
      </div>
      <div class="mt-4 h-px w-full bg-bone/15">
        <div class="pre-bar h-px w-full origin-left scale-x-0 bg-accent"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: #111113;
  clip-path: ellipse(150% 150% at 50% 0%);
}
.pre-words {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
/* One line box that masks the greetings as they slide through it. */
.pre-line {
  display: grid;
  overflow: hidden;
  padding: 0.12em 0.08em 0.2em;
}
.pre-word {
  grid-area: 1 / 1;
  text-align: center;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: clamp(3rem, 11vw, 9rem);
  letter-spacing: -0.045em;
  line-height: 1;
}
.pre-word i {
  font-style: normal;
  color: var(--accent);
}
.pre-count {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: clamp(3rem, 9vw, 7rem);
  line-height: 0.8;
  letter-spacing: -0.05em;
  font-variant-numeric: tabular-nums;
  color: var(--bone);
}
</style>
