<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap, reduced } from '../lib/gsap'
import { featuredProjects, projects } from '../data/projects'
import ArrowIcon from './ArrowIcon.vue'

// Desktop: the section pins and the cards travel sideways as you scroll.
// Smaller screens: a plain vertical stack.
const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const current = ref(1)
let mm: gsap.MatchMedia | null = null

const pad = (n: number) => String(n).padStart(2, '0')

onMounted(() => {
  if (reduced || !root.value || !track.value) return
  const el = root.value
  const tr = track.value
  mm = gsap.matchMedia(el)

  mm.add('(min-width: 1024px)', () => {
    const q = gsap.utils.selector(el)
    const distance = () => tr.scrollWidth - window.innerWidth

    const scroll = gsap.to(tr, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: () => '+=' + distance(),
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate(self) {
          gsap.set(q('.work-progress'), { scaleX: self.progress })
        },
      },
    })

    q('.work-card').forEach((card: HTMLElement, i: number) => {
      // The image slides inside its frame, opposite to the travel direction.
      gsap.fromTo(
        card.querySelector('.work-img'),
        { xPercent: -4.5 },
        {
          xPercent: 4.5,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: scroll,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        },
      )
      // Each card straightens and its caption rises as it enters.
      gsap.from(card.querySelector('.work-frame'), {
        rotate: 5,
        yPercent: 8,
        scale: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          containerAnimation: scroll,
          start: 'left right',
          end: 'left 55%',
          scrub: true,
        },
      })
      gsap.from(card.querySelectorAll('.work-caption > *'), {
        yPercent: 120,
        duration: 0.9,
        stagger: 0.07,
        scrollTrigger: {
          trigger: card,
          containerAnimation: scroll,
          start: 'left 78%',
          toggleActions: 'play none none reverse',
        },
      })
      // Keep the "02 / 04" counter in step with the card nearest the centre.
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: card,
            containerAnimation: scroll,
            start: 'left center',
            end: 'right center',
            onToggle: (self) => {
              if (self.isActive) current.value = i + 1
            },
          },
        },
      )
    })

    gsap.from(q('.work-intro > *'), {
      y: 50,
      autoAlpha: 0,
      duration: 1.1,
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 70%', once: true },
    })
  })

  mm.add('(max-width: 1023px)', () => {
    const q = gsap.utils.selector(el)
    q('.work-card').forEach((card: HTMLElement) => {
      gsap.from(card.querySelector('.work-frame'), {
        clipPath: 'inset(18% 8% 18% 8% round 1.25rem)',
        duration: 1.3,
        ease: 'snap',
        scrollTrigger: { trigger: card, start: 'top 85%', once: true },
      })
      gsap.from(card.querySelector('.work-img'), {
        scale: 1.35,
        duration: 1.6,
        scrollTrigger: { trigger: card, start: 'top 85%', once: true },
      })
      gsap.from(card.querySelectorAll('.work-caption > *'), {
        yPercent: 120,
        duration: 0.9,
        stagger: 0.07,
        scrollTrigger: { trigger: card, start: 'top 70%', once: true },
      })
    })
  })
})

onUnmounted(() => mm?.revert())
</script>

<template>
  <section ref="root" class="work">
    <div class="work-head px-gutter">
      <p class="label">(02) — Selected work</p>
      <div class="hidden items-center gap-5 lg:flex">
        <span class="label !text-bone">{{ pad(current) }} / {{ pad(featuredProjects.length) }}</span>
        <span class="relative block h-px w-40 bg-bone/20">
          <span class="work-progress absolute inset-0 origin-left scale-x-0 bg-accent"></span>
        </span>
      </div>
    </div>

    <div ref="track" class="work-track">
      <div class="work-intro">
        <h2 class="display text-[clamp(3.2rem,8vw,8.5rem)]">
          Selected <br /><span class="serif-i text-accent">work</span>
        </h2>
        <p class="mt-6 max-w-[22rem] text-bone/70">
          A few of the products I've designed and built recently, across web, mobile and desktop.
        </p>
      </div>

      <router-link
        v-for="(p, i) in featuredProjects"
        :key="p.slug"
        :to="`/projects/${p.slug}`"
        class="work-card"
        :class="{ 'is-portrait': p.cover.portrait }"
        data-cursor="view"
        data-cursor-text="View"
      >
        <div class="work-frame" :style="{ '--tint': p.tint }">
          <img class="work-img" :src="p.cover.src" :alt="p.cover.alt" loading="lazy" />
        </div>
        <div class="work-caption-row">
          <div class="overflow-hidden">
            <div class="work-caption">
              <span class="label">{{ pad(i + 1) }} — {{ p.category }}</span>
            </div>
          </div>
          <div class="overflow-hidden pb-[0.18em]">
            <div class="work-caption">
              <h3 class="work-title">{{ p.title }}</h3>
            </div>
          </div>
          <div class="overflow-hidden">
            <div class="work-caption">
              <span class="text-sm text-bone/60">{{ p.platforms.join(' · ') }} — {{ p.year }}</span>
            </div>
          </div>
        </div>
      </router-link>

      <router-link to="/projects" class="work-all" data-cursor="view" data-cursor-text="Open">
        <span class="label">{{ pad(projects.length) }} projects</span>
        <span class="display mt-4 block text-[clamp(2.6rem,6vw,6.5rem)]">
          See <span class="serif-i text-accent">all</span><br />work
        </span>
        <span class="work-all-arrow"><ArrowIcon :size="22" /></span>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.work {
  position: relative;
  padding-bottom: clamp(4rem, 10vw, 8rem);
}
.work-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2.5rem;
}
.work-track {
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
  padding: 0 clamp(1.25rem, 4vw, 4rem);
}
.work-card {
  display: block;
}
.work-frame {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10.5;
  border-radius: 1.25rem;
  background: color-mix(in srgb, var(--tint) 22%, #111113);
  border: 1px solid var(--line);
}
.work-card.is-portrait .work-frame {
  aspect-ratio: 4 / 5;
}
.work-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left top;
  transition: filter 0.6s;
}
.work-card.is-portrait .work-img {
  object-position: center 80%;
}
.work-caption-row {
  margin-top: 1.25rem;
  display: grid;
  gap: 0.35rem;
}
.work-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: clamp(2.2rem, 4.6vw, 4.6rem);
  line-height: 1;
  letter-spacing: -0.045em;
  transition: color 0.4s;
}
.work-card:hover .work-title {
  color: var(--accent);
}
.work-all {
  position: relative;
  display: block;
  padding: 2.5rem;
  border-radius: 1.25rem;
  border: 1px solid var(--line);
  transition:
    background-color 0.5s,
    color 0.5s;
}
.work-all:hover {
  background: var(--accent);
  color: var(--ink);
}
.work-all:hover .label,
.work-all:hover .serif-i {
  color: var(--ink);
}
.work-all-arrow {
  position: absolute;
  right: 2rem;
  top: 2rem;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.work-all:hover .work-all-arrow {
  transform: translate(6px, -6px);
}

@media (min-width: 1024px) {
  .work {
    height: 100vh;
    padding: 6.5rem 0 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .work-head {
    padding-bottom: 1.5rem;
    flex-shrink: 0;
  }
  .work-track {
    flex: 1;
    min-height: 0;
    flex-direction: row;
    align-items: center;
    gap: 5vw;
    width: max-content;
    padding: 0 6vw 2rem clamp(1.25rem, 4vw, 4rem);
    will-change: transform;
  }
  .work-intro {
    width: 30vw;
    flex-shrink: 0;
  }
  .work-card {
    flex-shrink: 0;
  }
  .work-frame {
    height: min(56vh, 34vw);
    aspect-ratio: 16 / 9.4;
  }
  .work-card.is-portrait .work-frame {
    aspect-ratio: 4 / 4.6;
  }
  .work-img {
    /* Wider than the frame so it can slide sideways without showing an edge. */
    width: 112%;
    max-width: none;
    margin-left: -6%;
  }
  .work-all {
    flex-shrink: 0;
    width: 30vw;
    height: min(56vh, 34vw);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
}
</style>
