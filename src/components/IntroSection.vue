<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap, SplitText, reduced } from '../lib/gsap'
import { site } from '../data/site'
import { projects } from '../data/projects'
import ArrowIcon from './ArrowIcon.vue'

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

const years = new Date().getFullYear() - site.startedYear
const stats = [
  { value: years, suffix: '+', label: 'Years building software' },
  { value: projects.length, suffix: '', label: 'Products in this portfolio' },
  { value: 3, suffix: '', label: 'Platforms: web, mobile, desktop' },
]

onMounted(() => {
  if (reduced || !root.value) return
  ctx = gsap.context((self) => {
    const q = self.selector!

    // The statement lights up word by word as it is scrolled through.
    SplitText.create(q('.intro-statement'), {
      type: 'words',
      autoSplit: true,
      onSplit(split) {
        return gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.08,
            scrollTrigger: {
              trigger: q('.intro-statement')[0],
              start: 'top 82%',
              end: 'bottom 55%',
              scrub: 0.4,
            },
          },
        )
      },
    })

    // Numbers count up once.
    q('.stat-number').forEach((el: HTMLElement) => {
      const target = Number(el.dataset.value)
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v))
        },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="px-gutter py-section">
    <div class="grid gap-10 lg:grid-cols-12">
      <div class="lg:col-span-3">
        <p v-reveal class="label">(01) — About</p>
      </div>

      <div class="lg:col-span-9">
        <p class="intro-statement">
          I got into tech in <span class="serif-i text-accent">mid-2021</span> and never left. Today I'm a
          software engineer who takes products from a blank file to something people
          <span class="serif-i text-accent">rely on</span>, from nightclub payments in Lagos to cleaning
          companies in the UK.
        </p>

        <div v-reveal class="mt-12">
          <router-link to="/about" class="btn btn-ghost">
            More about me <ArrowIcon :size="12" />
          </router-link>
        </div>
      </div>
    </div>

    <div class="mt-20 grid gap-px overflow-hidden rounded-3xl border border-line bg-bone/10 md:mt-28 md:grid-cols-3">
      <div v-for="(s, i) in stats" :key="s.label" v-reveal="{ delay: i * 0.1 }" class="bg-ink p-8 md:p-10">
        <p class="display text-[clamp(4rem,9vw,8rem)] text-bone">
          <span class="stat-number" :data-value="s.value">{{ s.value }}</span
          ><span class="text-accent">{{ s.suffix }}</span>
        </p>
        <p class="label mt-6">{{ s.label }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro-statement {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 500;
  font-size: clamp(1.7rem, 4.1vw, 4rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
}
.intro-statement .serif-i {
  font-size: 1.08em;
}
</style>
