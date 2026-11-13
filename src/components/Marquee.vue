<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap, ScrollTrigger, reduced } from '../lib/gsap'

// An endless strip of words. It speeds up with the scroll and flips
// direction when the scroll direction changes.
const props = withDefaults(
  defineProps<{ items: string[]; duration?: number; reverse?: boolean; outline?: boolean }>(),
  { duration: 28, reverse: false, outline: false },
)

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (reduced || !track.value || !root.value) return
  ctx = gsap.context(() => {
    const base = props.reverse ? -1 : 1
    const loop = gsap.fromTo(
      track.value,
      { xPercent: props.reverse ? -50 : 0 },
      { xPercent: props.reverse ? 0 : -50, duration: props.duration, ease: 'none', repeat: -1 },
    )
    // Start far into the loop so it has room to run backwards.
    loop.totalTime(props.duration * 200)
    loop.timeScale(base)
    let settle: gsap.core.Tween | null = null

    ScrollTrigger.create({
      trigger: root.value,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate(self) {
        const v = gsap.utils.clamp(-3000, 3000, self.getVelocity())
        const dir = self.direction * base
        settle?.kill()
        loop.timeScale(dir * (1 + Math.abs(v) / 350))
        gsap.to(track.value, { skewX: v / -260, duration: 0.3, overwrite: 'auto' })
        settle = gsap.to(loop, { timeScale: dir, duration: 0.9, ease: 'power2.out', delay: 0.05 })
        gsap.to(track.value, { skewX: 0, duration: 0.9, delay: 0.3, overwrite: false })
      },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <div ref="root" class="overflow-hidden whitespace-nowrap" aria-hidden="true">
    <div ref="track" class="inline-flex will-change-transform">
      <div v-for="n in 2" :key="n" class="flex shrink-0 items-center">
        <template v-for="item in items" :key="item + n">
          <span class="marquee-item" :class="{ 'is-outline': outline }">{{ item }}</span>
          <span class="marquee-star">✦</span>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-item {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: clamp(2.6rem, 8vw, 7.5rem);
  line-height: 1.05;
  letter-spacing: -0.045em;
  padding: 0 0.28em;
}
.marquee-item.is-outline {
  color: transparent;
  -webkit-text-stroke: 1px rgba(237, 232, 223, 0.55);
}
.marquee-star {
  font-size: clamp(1rem, 2.4vw, 2.2rem);
  color: var(--accent);
}
</style>
