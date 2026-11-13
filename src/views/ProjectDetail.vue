<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { gsap, reduced } from '../lib/gsap'
import { getNextProject, getProject, projects } from '../data/projects'
import ArrowIcon from '../components/ArrowIcon.vue'

const route = useRoute()
const router = useRouter()
// Captured once: the page is keyed by path, so a new slug mounts a new instance.
const slug = String(route.params.slug)
const project = getProject(slug)
const next = getNextProject(slug)
const index = computed(() => projects.findIndex((p) => p.slug === slug) + 1)
const pad = (n: number) => String(n).padStart(2, '0')

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

if (!project) router.replace({ name: 'not-found', params: { pathMatch: route.path.slice(1).split('/') } })

onMounted(() => {
  if (reduced || !root.value || !project) return
  ctx = gsap.context((self) => {
    const q = self.selector!

    // The cover starts inset and opens to full width as it is scrolled into place.
    gsap.fromTo(
      q('.case-cover'),
      { clipPath: 'inset(0% 9% 0% 9% round 1.5rem)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
        ease: 'none',
        scrollTrigger: { trigger: q('.case-cover')[0], start: 'top 95%', end: 'top 20%', scrub: 0.5 },
      },
    )

    // Highlights: number, rule and text arrive in sequence.
    q('.case-highlight').forEach((row: HTMLElement) => {
      gsap
        .timeline({ scrollTrigger: { trigger: row, start: 'top 90%', once: true } })
        .from(row.querySelector('.case-highlight-line'), { scaleX: 0, duration: 1.3, ease: 'snap' })
        .from(row.querySelectorAll('.case-up'), { yPercent: 120, duration: 1, stagger: 0.07 }, 0.1)
        .from(row.querySelector('.case-highlight-text'), { autoAlpha: 0, y: 20, duration: 0.9 }, 0.3)
    })

    gsap.from(q('.case-chip'), {
      autoAlpha: 0,
      y: 18,
      scale: 0.85,
      duration: 0.7,
      stagger: 0.04,
      scrollTrigger: { trigger: q('.case-stack')[0], start: 'top 90%', once: true },
    })

    // Screenshots are shown whole, never cropped: the frame wipes open and the image settles.
    q('.case-shot').forEach((shot: HTMLElement) => {
      gsap
        .timeline({ scrollTrigger: { trigger: shot, start: 'top 88%', once: true } })
        .from(shot, { clipPath: 'inset(12% 6% 12% 6% round 1.25rem)', duration: 1.4, ease: 'snap' })
        .from(shot.querySelector('img'), { scale: 1.18, duration: 1.8 }, 0)
    })
    gsap.from(q('.case-cover img'), {
      scale: 1.16,
      ease: 'none',
      scrollTrigger: { trigger: q('.case-cover')[0], start: 'top 95%', end: 'top 20%', scrub: 0.5 },
    })

    // Next project: the title slides in from the right while it is scrolled into view.
    gsap.from(q('.case-next-title'), {
      xPercent: 22,
      ease: 'none',
      scrollTrigger: { trigger: q('.case-next')[0], start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <article v-if="project" ref="root" :style="{ '--tint': project.tint }">
    <!-- Header -->
    <header class="px-gutter pt-36 md:pt-44">
      <div v-reveal class="mb-8 flex items-center justify-between">
        <router-link to="/projects" class="label link-line !text-bone">← All work</router-link>
        <span class="label">{{ pad(index) }} / {{ pad(projects.length) }}</span>
      </div>

      <h1 v-chars="{ start: 'top 100%' }" class="display case-title">{{ project.title }}</h1>
      <p v-lines="{ start: 'top 100%', delay: 0.25 }" class="serif-i mt-6 max-w-[46rem] text-[clamp(1.5rem,3.2vw,2.8rem)] leading-[1.1] text-accent">
        {{ project.tagline }}
      </p>

      <div v-rule="{ delay: 0.3 }" class="rule mt-12"></div>
      <dl class="grid grid-cols-2 gap-x-6 gap-y-8 py-8 md:grid-cols-4">
        <div v-reveal="{ delay: 0.3 }">
          <dt class="label mb-2">Role</dt>
          <dd>{{ project.role }}</dd>
        </div>
        <div v-reveal="{ delay: 0.36 }">
          <dt class="label mb-2">For</dt>
          <dd>{{ project.client }}</dd>
        </div>
        <div v-reveal="{ delay: 0.42 }">
          <dt class="label mb-2">Platforms</dt>
          <dd>{{ project.platforms.join(', ') }}</dd>
        </div>
        <div v-reveal="{ delay: 0.48 }">
          <dt class="label mb-2">Year</dt>
          <dd>{{ project.year }}</dd>
        </div>
      </dl>
    </header>

    <!-- Cover -->
    <div class="px-gutter">
      <div
        class="case-cover"
        :class="{ 'is-portrait': project.cover.portrait }"
        :style="{ aspectRatio: `${project.cover.w} / ${project.cover.h}` }"
      >
        <img :src="project.cover.src" :alt="project.cover.alt" :width="project.cover.w" :height="project.cover.h" />
      </div>
    </div>

    <!-- Overview -->
    <section class="grid gap-10 px-gutter py-section lg:grid-cols-12">
      <div class="lg:col-span-4">
        <p v-reveal class="label">(Overview)</p>
        <a
          v-if="project.link"
          v-reveal="{ delay: 0.1 }"
          :href="project.link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-accent mt-8"
        >
          Visit {{ project.link.label }} <ArrowIcon :size="12" />
        </a>
      </div>
      <div class="space-y-8 lg:col-span-8">
        <p
          v-for="(para, i) in project.overview"
          :key="i"
          v-lines
          :class="i === 0 ? 'case-lead' : 'max-w-[44rem] text-lg text-bone/75'"
        >
          {{ para }}
        </p>
      </div>
    </section>

    <!-- Highlights -->
    <section class="px-gutter pb-section">
      <div class="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
        <p v-reveal class="label lg:col-span-4">(What I built)</p>
        <h2 v-chars class="display text-[clamp(2.6rem,6.5vw,6rem)] lg:col-span-8">The details</h2>
      </div>

      <ol>
        <li v-for="(h, i) in project.highlights" :key="h.title" class="case-highlight">
          <span class="case-highlight-line"></span>
          <div class="grid gap-3 py-8 md:grid-cols-12 md:gap-8">
            <div class="overflow-hidden md:col-span-1">
              <span class="case-up label inline-block">{{ pad(i + 1) }}</span>
            </div>
            <div class="overflow-hidden pb-1 md:col-span-4">
              <h3 class="case-up font-display text-2xl font-bold tracking-tight md:text-[1.75rem]">{{ h.title }}</h3>
            </div>
            <p class="case-highlight-text text-bone/75 md:col-span-7 md:text-lg">{{ h.text }}</p>
          </div>
        </li>
      </ol>
      <div v-rule class="rule"></div>
    </section>

    <!-- Stack -->
    <section class="case-stack grid gap-8 px-gutter pb-section lg:grid-cols-12">
      <p v-reveal class="label lg:col-span-4">(Built with)</p>
      <div class="flex flex-wrap gap-2.5 lg:col-span-8">
        <span v-for="t in project.stack" :key="t" class="case-chip chip !px-5 !py-2.5 !text-[0.75rem]">{{ t }}</span>
      </div>
    </section>

    <!-- Gallery -->
    <section v-if="project.gallery.length" class="grid gap-6 px-gutter pb-section md:grid-cols-2 md:gap-8">
      <figure
        v-for="img in project.gallery"
        :key="img.src"
        class="case-shot"
        :class="img.portrait ? 'is-portrait' : 'md:col-span-2'"
        :style="{ aspectRatio: `${img.w} / ${img.h}` }"
      >
        <img :src="img.src" :alt="img.alt" :width="img.w" :height="img.h" loading="lazy" />
      </figure>
    </section>

    <!-- Next project -->
    <router-link :to="`/projects/${next.slug}`" class="case-next" data-cursor="view" data-cursor-text="Next">
      <div class="px-gutter py-section">
        <p class="label mb-6">Next project</p>
        <div class="flex items-end justify-between gap-6 lg:pr-24">
          <h2 class="case-next-title display">{{ next.title }}</h2>
          <span class="case-next-arrow"><ArrowIcon :size="40" /></span>
        </div>
        <p class="mt-6 max-w-[34rem] text-bone/65">{{ next.tagline }}</p>
      </div>
    </router-link>
  </article>
</template>

<style scoped>
.case-title {
  font-size: clamp(3.4rem, 14.5vw, 15rem);
  text-transform: uppercase;
}
.case-cover {
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
  background: color-mix(in srgb, var(--tint) 22%, #111113);
  will-change: clip-path;
}
.case-cover.is-portrait {
  max-width: 30rem;
  margin: 0 auto;
}
.case-cover img,
.case-shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
.case-lead {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 500;
  font-size: clamp(1.5rem, 2.8vw, 2.5rem);
  line-height: 1.18;
  letter-spacing: -0.025em;
}

.case-highlight {
  position: relative;
}
.case-highlight-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: rgba(237, 232, 223, 0.15);
  transform-origin: left;
}

.case-shot {
  overflow: hidden;
  border-radius: 1.25rem;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--tint) 22%, #111113);
}
.case-shot.is-portrait {
  max-width: 24rem;
  width: 100%;
  margin: 0 auto;
}

.case-next {
  display: block;
  overflow: hidden;
  border-top: 1px solid var(--line);
  transition: background-color 0.6s;
}
.case-next:hover {
  background: #111113;
}
.case-next-title {
  font-size: clamp(3rem, 12.5vw, 13rem);
  text-transform: uppercase;
  white-space: nowrap;
  transition: color 0.4s;
}
.case-next:hover .case-next-title {
  color: var(--accent);
}
.case-next-arrow {
  flex-shrink: 0;
  margin-bottom: 1.2vw;
  color: var(--accent);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.case-next:hover .case-next-arrow {
  transform: translate(10px, -10px);
}
</style>
