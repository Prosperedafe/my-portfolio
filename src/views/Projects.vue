<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { gsap, Flip, ScrollTrigger, isTouch, reduced, whenReady } from '../lib/gsap'
import { projects } from '../data/projects'
import type { Platform } from '../types'
import ArrowIcon from '../components/ArrowIcon.vue'

type Filter = 'All' | Platform
const filters: Filter[] = ['All', 'Web', 'Mobile', 'Desktop']
const active = ref<Filter>('All')

const root = ref<HTMLElement | null>(null)
const preview = ref<HTMLElement | null>(null)
const hovered = ref(-1)
let ctx: gsap.Context | null = null

const pad = (n: number) => String(n).padStart(2, '0')
const matches = (platforms: Platform[]) => active.value === 'All' || platforms.includes(active.value as Platform)
const count = computed(() => projects.filter((p) => matches(p.platforms)).length)
const countFor = (f: Filter) => (f === 'All' ? projects.length : projects.filter((p) => p.platforms.includes(f)).length)

// Filtering: record where every row is, change the filter, then animate the difference.
async function setFilter(f: Filter) {
  if (f === active.value || !root.value) return
  const rows = root.value.querySelectorAll('.project-row')
  if (reduced) {
    active.value = f
    return
  }
  const state = Flip.getState(rows)
  active.value = f
  await nextTick()
  Flip.from(state, {
    duration: 0.8,
    ease: 'silk',
    absolute: true,
    onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05 }),
    onLeave: (els) => gsap.to(els, { autoAlpha: 0, duration: 0.3 }),
    onComplete: () => ScrollTrigger.refresh(),
  })
}

onMounted(() => {
  if (reduced || !root.value) return
  ctx = gsap.context((self) => {
    const q = self.selector!

    // Rows build in one after another once the page is uncovered.
    gsap.set(q('.project-row'), { autoAlpha: 0, y: 60 })
    whenReady(() => {
      ScrollTrigger.batch(q('.project-row'), {
        start: 'top bottom',
        once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.09, delay: 0.25 }),
      })
    })

    // Floating preview that trails the pointer over the list (desktop only).
    if (!isTouch && preview.value) {
      const p = preview.value
      gsap.set(p, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 })
      const xTo = gsap.quickTo(p, 'x', { duration: 0.7, ease: 'power3.out' })
      const yTo = gsap.quickTo(p, 'y', { duration: 0.7, ease: 'power3.out' })
      const rTo = gsap.quickTo(p, 'rotation', { duration: 0.9, ease: 'power3.out' })
      let lastX = 0

      const move = (e: MouseEvent) => {
        xTo(e.clientX + 170)
        yTo(e.clientY)
        rTo(gsap.utils.clamp(-9, 9, (e.clientX - lastX) * 0.6))
        lastX = e.clientX
      }
      const list = q('.project-list')[0] as HTMLElement
      const enter = () => gsap.to(p, { scale: 1, autoAlpha: 1, duration: 0.5 })
      const leave = () => {
        hovered.value = -1
        gsap.to(p, { scale: 0.6, autoAlpha: 0, duration: 0.35, ease: 'power2.in' })
      }
      list.addEventListener('mousemove', move)
      list.addEventListener('mouseenter', enter)
      list.addEventListener('mouseleave', leave)
      self.add(() => () => {
        list.removeEventListener('mousemove', move)
        list.removeEventListener('mouseenter', enter)
        list.removeEventListener('mouseleave', leave)
      })
    }
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <div ref="root">
    <section class="px-gutter pb-10 pt-36 md:pt-44">
      <p v-reveal class="label mb-6">(Work) — {{ pad(projects.length) }} projects</p>
      <h1 class="display text-[clamp(3.6rem,15vw,15rem)] uppercase">
        <span v-chars="{ start: 'top 100%' }" class="block">Selected</span>
        <span v-chars="{ start: 'top 100%', delay: 0.12 }" class="serif-i block normal-case text-accent">projects</span>
      </h1>

      <div class="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <p v-lines class="max-w-[30rem] text-lg text-bone/75">
          Platforms, apps and tools I've built for founders, operators and brands. Pick one to read how it
          came together.
        </p>

        <div v-reveal class="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by platform">
          <button
            v-for="f in filters"
            :key="f"
            role="tab"
            :aria-selected="active === f"
            class="filter"
            :class="{ 'is-active': active === f }"
            @click="setFilter(f)"
          >
            {{ f }} <sup>{{ countFor(f) }}</sup>
          </button>
        </div>
      </div>
    </section>

    <section class="px-gutter pb-section">
      <div class="project-list">
        <router-link
          v-for="(p, i) in projects"
          v-show="matches(p.platforms)"
          :key="p.slug"
          :to="`/projects/${p.slug}`"
          class="project-row"
          data-cursor="view"
          data-cursor-text="Open"
          @mouseenter="hovered = i"
        >
          <!-- Thumbnail for touch screens, where there is no hover preview -->
          <div class="project-thumb lg:hidden" :style="{ '--tint': p.tint }">
            <img :src="p.cover.src" :alt="p.cover.alt" loading="lazy" :class="{ 'is-portrait': p.cover.portrait }" />
          </div>

          <div class="project-row-inner">
            <span class="project-index">{{ pad(i + 1) }}</span>
            <h2 class="project-title">{{ p.title }}</h2>
            <span class="project-meta">{{ p.category }}</span>
            <span class="project-meta hidden md:block">{{ p.platforms.join(' · ') }}</span>
            <span class="project-meta">{{ p.year }}</span>
            <span class="project-arrow"><ArrowIcon :size="20" /></span>
          </div>
          <p class="project-tagline">{{ p.tagline }}</p>
        </router-link>
      </div>
      <p v-if="count === 0" class="py-16 text-center text-mute">Nothing here yet.</p>
    </section>

    <!-- Hover preview. Teleported so the smooth-scroll transform does not offset it. -->
    <Teleport to="body">
      <div ref="preview" class="project-preview" aria-hidden="true">
        <div class="project-preview-stack" :style="{ transform: `translateY(${-Math.max(hovered, 0) * 100}%)` }">
          <div v-for="p in projects" :key="p.slug" class="project-preview-item" :style="{ '--tint': p.tint }">
            <img :src="p.cover.src" alt="" :class="{ 'is-portrait': p.cover.portrait }" />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.filter {
  border-radius: 9999px;
  border: 1px solid var(--line);
  padding: 0.7rem 1.2rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(237, 232, 223, 0.75);
  transition:
    background-color 0.4s,
    color 0.4s,
    border-color 0.4s;
}
.filter sup {
  margin-left: 0.2em;
  opacity: 0.6;
}
.filter:hover {
  border-color: var(--bone);
  color: var(--bone);
}
.filter.is-active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--ink);
}

.project-list {
  border-bottom: 1px solid var(--line);
}
.project-row {
  position: relative;
  display: block;
  border-top: 1px solid var(--line);
  padding: 1.75rem 0;
}
.project-row > * {
  transition: opacity 0.4s;
}
.project-row-inner {
  display: grid;
  grid-template-columns: 2.5rem 1fr auto;
  align-items: baseline;
  column-gap: 0.75rem;
  row-gap: 0.4rem;
}
.project-index,
.project-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--mute);
}
.project-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: clamp(2.3rem, 7.2vw, 7rem);
  line-height: 0.95;
  letter-spacing: -0.045em;
  transition:
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.4s;
}
.project-row-inner .project-meta:nth-of-type(2) {
  grid-column: 2;
}
.project-arrow {
  grid-row: 1;
  grid-column: 3;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.project-tagline {
  margin: 0.9rem 0 0 3.25rem;
  max-width: 34rem;
  color: rgba(237, 232, 223, 0.65);
}
.project-thumb {
  overflow: hidden;
  aspect-ratio: 16 / 10;
  margin-bottom: 1.25rem;
  border-radius: 1rem;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--tint) 22%, #111113);
}
.project-thumb img,
.project-preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left top;
}
.project-thumb img.is-portrait,
.project-preview-item img.is-portrait {
  object-position: center 78%;
}

@media (min-width: 1024px) {
  .project-row {
    padding: 2.25rem 0;
  }
  .project-row-inner {
    grid-template-columns: 4rem minmax(0, 1fr) 11rem 13rem 4rem 2rem;
    column-gap: 1.5rem;
  }
  .project-row-inner .project-meta:nth-of-type(2),
  .project-arrow {
    grid-column: auto;
    grid-row: auto;
  }
  .project-list .project-row .project-tagline {
    margin: 0;
    max-height: 0;
    overflow: hidden;
    padding-left: 5.5rem;
    opacity: 0;
    transition:
      max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.4s,
      margin 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  /* Hovering one row dims the rest and opens its description. */
  .project-list:hover .project-row > * {
    opacity: 0.32;
  }
  .project-list .project-row:hover > * {
    opacity: 1;
  }
  .project-row:hover .project-title {
    transform: translateX(1.5rem);
    color: var(--accent);
  }
  .project-row:hover .project-arrow {
    transform: translate(6px, -6px);
    color: var(--accent);
  }
  .project-list .project-row:hover .project-tagline {
    max-height: 5rem;
    margin-top: 0.9rem;
    opacity: 1;
  }
}

.project-preview {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 30;
  width: 24rem;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 1.25rem;
  pointer-events: none;
  visibility: hidden;
  box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.8);
}
.project-preview-stack {
  height: 100%;
  transition: transform 0.7s cubic-bezier(0.76, 0, 0.24, 1);
}
.project-preview-item {
  height: 100%;
  background: color-mix(in srgb, var(--tint) 22%, #111113);
}
@media (max-width: 1023px) {
  .project-preview {
    display: none;
  }
}
</style>
