<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap, reduced, whenReady } from '../lib/gsap'
import { experience, site, stack } from '../data/site'
import portrait from '../assets/prosper-about.webp'
import ArrowIcon from '../components/ArrowIcon.vue'
import Marquee from '../components/Marquee.vue'

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

const principles = ['Ship it', 'Sweat the details', 'Keep it fast', 'Own the outcome', 'Stay curious']

onMounted(() => {
  if (reduced || !root.value) return
  ctx = gsap.context((self) => {
    const q = self.selector!

    // Portrait: the frame wipes open while the photo settles back.
    gsap.set(q('.about-photo'), { clipPath: 'inset(100% 0% 0% 0% round 1.5rem)' })
    gsap.set(q('.about-photo img'), { scale: 1.45 })
    whenReady(() => {
      gsap.to(q('.about-photo'), { clipPath: 'inset(0% 0% 0% 0% round 1.5rem)', duration: 1.5, ease: 'snap', delay: 0.2 })
      gsap.to(q('.about-photo img'), { scale: 1.15, duration: 2, delay: 0.2 })
    })
    gsap.to(q('.about-photo img'), {
      yPercent: 9,
      ease: 'none',
      scrollTrigger: { trigger: q('.about-photo')[0], start: 'top bottom', end: 'bottom top', scrub: true },
    })

    // Timeline: the spine fills as you scroll past, entries slide in beside it.
    gsap.fromTo(
      q('.timeline-fill'),
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: q('.timeline')[0], start: 'top 70%', end: 'bottom 60%', scrub: 0.5 },
      },
    )
    q('.timeline-item').forEach((item: HTMLElement) => {
      gsap
        .timeline({ scrollTrigger: { trigger: item, start: 'top 82%', once: true } })
        .from(item.querySelector('.timeline-dot'), { scale: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' })
        .from(item.querySelectorAll('.timeline-up'), { yPercent: 120, duration: 1, stagger: 0.07 }, 0.05)
        .from(item.querySelectorAll('.timeline-fade'), { autoAlpha: 0, y: 22, duration: 0.9, stagger: 0.06 }, 0.3)
    })

    // Stack: chips pop in group by group.
    q('.stack-group').forEach((group: HTMLElement) => {
      gsap.from(group.querySelectorAll('.chip'), {
        autoAlpha: 0,
        y: 16,
        scale: 0.85,
        duration: 0.6,
        stagger: 0.035,
        scrollTrigger: { trigger: group, start: 'top 90%', once: true },
      })
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <div ref="root">
    <!-- Header -->
    <section class="px-gutter pt-36 md:pt-44">
      <p v-reveal class="label mb-6">(About) — {{ site.location }}</p>
      <h1 class="display text-[clamp(3.2rem,13vw,13.5rem)] uppercase">
        <span v-chars="{ start: 'top 100%' }" class="block">Engineer</span>
        <span v-chars="{ start: 'top 100%', delay: 0.12 }" class="serif-i block normal-case text-accent">by obsession.</span>
      </h1>
    </section>

    <!-- Bio -->
    <section class="grid gap-12 px-gutter py-section lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-5">
        <div class="about-photo">
          <img :src="portrait" alt="Prosper Edafe" width="1100" height="1412" />
        </div>
        <div v-reveal class="mt-5 flex items-center justify-between">
          <span class="label">Prosper Edafe</span>
          <span class="label">In tech since {{ site.startedYear }}</span>
        </div>
      </div>

      <div class="lg:col-span-7 lg:pt-6">
        <p v-lines class="about-lead">
          I'm Prosper, a software engineer in Lagos. I got into tech in the middle of 2021, and what began
          as curiosity became the thing I do every day.
        </p>

        <div class="mt-10 grid gap-6 text-lg text-bone/75 md:grid-cols-2 md:gap-10">
          <p v-lines>
            I started on the frontend, turning a design or a rough idea into an interface that feels
            quick and obvious. Over time the work pulled me further out, into mobile apps with React
            Native and Expo, desktop software with Electron, and the databases and payment flows behind
            them.
          </p>
          <p v-lines="{ delay: 0.1 }">
            Now I take products from the first commit to the day they ship. I care about the parts people
            notice, like speed and polish, and the parts they don't, like clean data models and code the
            next engineer can read. The goal is always the same: software a business can depend on.
          </p>
        </div>

        <div v-reveal class="mt-12 flex flex-wrap gap-3">
          <a v-magnetic="0.25" :href="site.resume" target="_blank" class="btn btn-accent">
            Download résumé <ArrowIcon :size="12" />
          </a>
          <a v-magnetic="0.25" :href="site.github" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">GitHub</a>
          <a v-magnetic="0.25" :href="site.linkedin" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">LinkedIn</a>
        </div>
      </div>
    </section>

    <div class="border-y border-line py-6">
      <Marquee :items="principles" :duration="36" outline />
    </div>

    <!-- Experience -->
    <section class="px-gutter py-section">
      <div class="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
        <p v-reveal class="label lg:col-span-4">(Experience)</p>
        <h2 class="display text-[clamp(2.8rem,7.5vw,7.5rem)] lg:col-span-8">
          <span v-chars class="block">Where I've</span>
          <span v-chars="{ delay: 0.1 }" class="serif-i block text-accent">been building.</span>
        </h2>
      </div>

      <div class="timeline">
        <span class="timeline-spine"><span class="timeline-fill"></span></span>

        <article v-for="item in experience" :key="item.company" class="timeline-item">
          <span class="timeline-dot"></span>
          <div class="grid gap-4 lg:grid-cols-12 lg:gap-8">
            <div class="lg:col-span-4">
              <div class="overflow-hidden">
                <p class="timeline-up label inline-block !text-accent">{{ item.period }}</p>
              </div>
              <p class="timeline-fade mt-2 text-sm text-mute">{{ item.location }}</p>
            </div>
            <div class="lg:col-span-8">
              <div class="overflow-hidden pb-1">
                <h3 class="timeline-up font-display text-[clamp(1.8rem,3.6vw,3.2rem)] font-extrabold leading-none tracking-tight">
                  {{ item.position }}
                </h3>
              </div>
              <div class="overflow-hidden">
                <p class="timeline-up serif-i mt-2 text-2xl text-bone/70">{{ item.company }}</p>
              </div>
              <p class="timeline-fade mt-5 max-w-[40rem] text-lg text-bone/75">{{ item.description }}</p>
              <div class="timeline-fade mt-6 flex flex-wrap gap-2">
                <span v-for="s in item.skills" :key="s" class="chip">{{ s }}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Stack -->
    <section class="px-gutter pb-section">
      <div class="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
        <p v-reveal class="label lg:col-span-4">(Toolbox)</p>
        <h2 class="display text-[clamp(2.8rem,7.5vw,7.5rem)] lg:col-span-8">
          <span v-chars class="block">What I</span>
          <span v-chars="{ delay: 0.1 }" class="serif-i block text-accent">work with.</span>
        </h2>
      </div>

      <div>
        <div v-for="g in stack" :key="g.group" class="stack-group">
          <div v-rule class="rule"></div>
          <div class="grid gap-4 py-7 lg:grid-cols-12 lg:gap-8">
            <h3 v-reveal class="font-display text-2xl font-bold tracking-tight lg:col-span-4">{{ g.group }}</h3>
            <div class="flex flex-wrap gap-2 lg:col-span-8">
              <span v-for="t in g.items" :key="t" class="chip !px-4 !py-2 !text-[0.72rem]">{{ t }}</span>
            </div>
          </div>
        </div>
        <div v-rule class="rule"></div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-photo {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  border-radius: 1.5rem;
  will-change: clip-path;
}
.about-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 20%;
  filter: saturate(0.92);
}
.about-lead {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 500;
  font-size: clamp(1.6rem, 3.1vw, 2.9rem);
  line-height: 1.14;
  letter-spacing: -0.03em;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}
.timeline-spine {
  position: absolute;
  left: 4px;
  top: 0.6rem;
  bottom: 0;
  width: 1px;
  background: rgba(237, 232, 223, 0.14);
}
.timeline-fill {
  position: absolute;
  inset: 0;
  background: var(--accent);
  transform-origin: top;
}
.timeline-item {
  position: relative;
  padding-bottom: clamp(3rem, 6vw, 5.5rem);
}
.timeline-item:last-child {
  padding-bottom: 0;
}
.timeline-dot {
  position: absolute;
  left: calc(-2rem + 0.5px);
  top: 0.35rem;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 5px var(--ink);
}
@media (min-width: 1024px) {
  .timeline {
    padding-left: 3rem;
  }
  .timeline-dot {
    left: calc(-3rem + 0.5px);
  }
}
</style>
