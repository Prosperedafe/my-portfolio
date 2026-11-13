<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap, reduced } from '../lib/gsap'
import { services } from '../data/site'
import ArrowIcon from './ArrowIcon.vue'

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (reduced || !root.value) return
  ctx = gsap.context((self) => {
    self.selector!('.service-row').forEach((row: HTMLElement) => {
      gsap
        .timeline({ scrollTrigger: { trigger: row, start: 'top 90%', once: true } })
        .from(row.querySelector('.service-line'), { scaleX: 0, duration: 1.4, ease: 'snap' })
        .from(row.querySelectorAll('.service-up'), { yPercent: 120, duration: 1, stagger: 0.06 }, 0.15)
        .from(row.querySelectorAll('.service-fade'), { autoAlpha: 0, y: 20, duration: 0.9, stagger: 0.05 }, 0.35)
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="px-gutter py-section">
    <div class="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
      <p v-reveal class="label lg:col-span-3">(04) — What I do</p>
      <h2 class="display text-[clamp(2.8rem,7.5vw,7.5rem)] lg:col-span-9">
        <span v-chars class="block">One engineer,</span>
        <span v-chars="{ delay: 0.1 }" class="serif-i block text-accent">every screen.</span>
      </h2>
    </div>

    <ul>
      <li v-for="(s, i) in services" :key="s.title" class="service-row group">
        <span class="service-line"></span>
        <span class="service-fill" aria-hidden="true"></span>

        <div class="relative grid gap-4 py-8 md:grid-cols-12 md:items-start md:gap-8 md:py-10">
          <div class="overflow-hidden md:col-span-1">
            <span class="service-up service-num">0{{ i + 1 }}</span>
          </div>
          <div class="overflow-hidden pb-1 md:col-span-4">
            <h3 class="service-up service-title"><span>{{ s.title }}</span></h3>
          </div>
          <div class="md:col-span-6">
            <p class="service-fade service-text">{{ s.text }}</p>
            <div class="service-fade mt-5 flex flex-wrap gap-2">
              <span v-for="t in s.tools" :key="t" class="chip service-chip">{{ t }}</span>
            </div>
          </div>
          <div class="hidden justify-end md:col-span-1 md:flex">
            <span class="service-arrow"><ArrowIcon :size="22" /></span>
          </div>
        </div>
      </li>
    </ul>
    <div v-rule class="rule"></div>
  </section>
</template>

<style scoped>
.service-row {
  position: relative;
  transition: color 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.service-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: rgba(237, 232, 223, 0.15);
  transform-origin: left;
}
/* Accent panel that wipes up behind the row on hover */
.service-fill {
  position: absolute;
  inset: 0 calc(clamp(1.25rem, 4vw, 4rem) * -0.5);
  border-radius: 1.25rem;
  background: var(--accent);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}
.service-num {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  color: var(--mute);
  transition: color 0.45s;
}
.service-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: clamp(1.9rem, 3.6vw, 3.4rem);
  line-height: 1;
  letter-spacing: -0.04em;
}
.service-title span {
  display: inline-block;
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}
.service-text {
  max-width: 34rem;
  color: rgba(237, 232, 223, 0.72);
  transition: color 0.45s;
}
.service-arrow {
  display: inline-block;
  transform: rotate(90deg);
  opacity: 0.4;
  transition:
    transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.45s;
}

@media (hover: hover) {
  .service-row:hover {
    color: var(--ink);
  }
  .service-row:hover .service-fill {
    transform: scaleY(1);
  }
  .service-row:hover .service-title span {
    transform: translateX(0.6rem);
  }
  .service-row:hover .service-num,
  .service-row:hover .service-text {
    color: var(--ink);
  }
  .service-row:hover .service-chip {
    border-color: rgba(10, 10, 11, 0.3);
    color: var(--ink);
  }
  .service-row:hover .service-arrow {
    transform: rotate(0deg);
    opacity: 1;
  }
}
</style>
