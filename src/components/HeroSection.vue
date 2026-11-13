<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap, SplitText, isTouch, reduced, whenReady } from '../lib/gsap'
import { site } from '../data/site'
import portrait from '../assets/prosper-hero.webp'
import ArrowIcon from './ArrowIcon.vue'

const root = ref<HTMLElement | null>(null)
const time = ref('')
let ctx: gsap.Context | null = null
let timer: number | undefined

function tick() {
  time.value = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: site.timeZone,
  }).format(new Date())
}

onMounted(async () => {
  tick()
  timer = window.setInterval(tick, 15000)
  if (reduced || !root.value) return
  // The preloader also waits for the fonts, so this resolves before the hero is uncovered.
  await document.fonts.ready
  if (!root.value) return

  ctx = gsap.context((self) => {
    const q = self.selector!
    const first = new SplitText(q('.hero-first'), { type: 'chars' })
    const last = new SplitText(q('.hero-last'), { type: 'chars' })

    gsap.set(q('.hero-portrait'), { clipPath: 'inset(100% 0% 0% 0% round 1.5rem)' })
    gsap.set(q('.hero-portrait img'), { scale: 1.5 })

    /* ---------- Entrance ---------- */
    const intro = gsap
      .timeline({ paused: true, defaults: { ease: 'silk' } })
      .from(first.chars, { yPercent: 120, rotate: 10, duration: 1.3, stagger: 0.045 }, 0)
      .from(last.chars, { yPercent: 120, rotate: 10, duration: 1.3, stagger: 0.045 }, 0.18)
      .to(
        q('.hero-portrait'),
        { clipPath: 'inset(0% 0% 0% 0% round 1.5rem)', duration: 1.5, ease: 'snap' },
        0.25,
      )
      .to(q('.hero-portrait img'), { scale: 1.12, duration: 1.9 }, 0.25)
      .from(q('.hero-role'), { autoAlpha: 0, duration: 0.2 }, 0.7)
      .to(
        q('.hero-role-text'),
        {
          duration: 1.3,
          scrambleText: { text: 'Software Engineer', chars: 'upperAndLowerCase', speed: 0.4 },
          ease: 'none',
        },
        0.7,
      )
      .from(q('.hero-meta > *'), { autoAlpha: 0, y: 16, duration: 0.9, stagger: 0.08 }, 0.75)
      .from(q('.hero-cta > *'), { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.1 }, 1.1)
      .from(q('.hero-badge'), { scale: 0, rotate: -120, duration: 1.4, ease: 'elastic.out(1, 0.6)' }, 1)
      .from(q('.hero-glow'), { autoAlpha: 0, scale: 0.6, duration: 2 }, 0.2)

    // The paragraph is split by line. autoSplit re-measures it if the web font
    // arrives late or the window is resized, so lines never break in odd places.
    gsap.set(q('.hero-copy'), { autoAlpha: 0 })
    whenReady(() => {
      intro.play()
      gsap.set(q('.hero-copy'), { autoAlpha: 1 })
      SplitText.create(q('.hero-copy'), {
        type: 'lines',
        mask: 'lines',
        linesClass: 'sl',
        autoSplit: true,
        onSplit: (split) => gsap.from(split.lines, { yPercent: 135, duration: 1.1, stagger: 0.08, delay: 0.9 }),
      })
    })

    /* ---------- Always-on motion ---------- */
    gsap.to(q('.hero-badge-ring'), { rotate: 360, duration: 16, ease: 'none', repeat: -1 })

    /* ---------- Scroll: the two names pull apart, the portrait drifts ---------- */
    const scrub = { trigger: root.value, start: 'top top', end: 'bottom top', scrub: 0.6 }
    gsap.to(q('.hero-line-1'), { xPercent: -9, ease: 'none', scrollTrigger: { ...scrub } })
    gsap.to(q('.hero-line-2'), { xPercent: 9, ease: 'none', scrollTrigger: { ...scrub } })
    // Desktop only: on phones the hero is taller than the screen, so the intro text and
    // buttons sit below the fold and must stay visible while you scroll down to them.
    const desktop = gsap.matchMedia()
    desktop.add('(min-width: 1024px)', () => {
      gsap.to(q('.hero-portrait-wrap'), { yPercent: -14, ease: 'none', scrollTrigger: { ...scrub } })
      gsap.to(q('.hero-bottom'), { autoAlpha: 0, y: -40, ease: 'none', scrollTrigger: { ...scrub, end: '45% top' } })
    })
    self.add(() => () => desktop.revert())

    /* ---------- Pointer: the portrait tilts, the glow follows ---------- */
    if (!isTouch) {
      const tiltX = gsap.quickTo(q('.hero-portrait'), 'rotationY', { duration: 0.9, ease: 'power3.out' })
      const tiltY = gsap.quickTo(q('.hero-portrait'), 'rotationX', { duration: 0.9, ease: 'power3.out' })
      const imgX = gsap.quickTo(q('.hero-portrait img'), 'x', { duration: 1.1, ease: 'power3.out' })
      const imgY = gsap.quickTo(q('.hero-portrait img'), 'y', { duration: 1.1, ease: 'power3.out' })
      const glowX = gsap.quickTo(q('.hero-glow'), 'x', { duration: 1.6, ease: 'power3.out' })
      const glowY = gsap.quickTo(q('.hero-glow'), 'y', { duration: 1.6, ease: 'power3.out' })

      const move = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        tiltX(nx * 12)
        tiltY(ny * -10)
        imgX(nx * -22)
        imgY(ny * -22)
        glowX(nx * window.innerWidth * 0.5)
        glowY(ny * window.innerHeight * 0.5)
      }
      window.addEventListener('mousemove', move, { passive: true })
      self.add(() => () => window.removeEventListener('mousemove', move))
    }
  }, root.value)
})

onUnmounted(() => {
  window.clearInterval(timer)
  ctx?.revert()
})
</script>

<template>
  <section ref="root" class="hero relative flex min-h-[100svh] flex-col overflow-hidden px-gutter pb-8 pt-28 md:pt-32">
    <!-- Backdrop -->
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-glow" aria-hidden="true"></div>

    <!-- Meta row -->
    <div class="hero-meta relative z-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
      <p class="label flex items-center gap-2.5 !text-bone">
        <span class="relative flex h-2 w-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70"></span>
          <span class="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
        </span>
        Available for new projects
      </p>
      <p class="label hidden sm:block">{{ site.location }} — {{ time }} WAT</p>
      <p class="label hidden lg:block">Portfolio / 2026</p>
    </div>

    <!-- Name + portrait -->
    <div class="relative z-10 mt-8 flex-1 md:mt-10">
      <h1 class="hero-title display" aria-label="Prosper Edafe, Software Engineer">
        <span class="hero-line-1 mask" aria-hidden="true">
          <span class="hero-first">Prosper</span>
        </span>
        <span class="hero-line-2 mask" aria-hidden="true">
          <span class="hero-last">Edafe</span>
          <span class="hero-role serif-i">
            <span class="hero-role-text">Software Engineer</span>
          </span>
        </span>
      </h1>

      <div class="hero-portrait-wrap">
        <div class="hero-portrait">
          <img :src="portrait" alt="Portrait of Prosper Edafe" width="1100" height="1460" fetchpriority="high" />
        </div>

        <!-- Spinning badge -->
        <div class="hero-badge" aria-hidden="true">
          <svg class="hero-badge-ring" viewBox="0 0 120 120">
            <defs>
              <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
            </defs>
            <text>
              <textPath href="#badge-circle" textLength="282">WEB ✦ MOBILE ✦ DESKTOP ✦ SINCE 2021 ✦</textPath>
            </text>
          </svg>
          <span class="hero-badge-core">PE</span>
        </div>
      </div>
    </div>

    <!-- Intro + actions -->
    <div class="hero-bottom relative z-10 mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:pr-24">
      <p class="hero-copy max-w-[30rem] text-[1.05rem] leading-relaxed text-bone/80 md:text-lg">
        I design and build complete digital products: web platforms, mobile apps and desktop software
        that real businesses run on every day.
      </p>

      <div class="hero-cta flex flex-wrap items-center gap-3">
        <router-link v-magnetic="0.25" to="/projects" class="btn btn-accent">
          View my work <ArrowIcon :size="12" />
        </router-link>
        <router-link v-magnetic="0.25" to="/contact" class="btn btn-ghost">
          Get in touch
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(237, 232, 223, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(237, 232, 223, 0.045) 1px, transparent 1px);
  background-size: clamp(3.5rem, 8vw, 7rem) clamp(3.5rem, 8vw, 7rem);
  mask-image: radial-gradient(ellipse 80% 70% at 60% 35%, #000 20%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 60% 35%, #000 20%, transparent 75%);
}
.hero-glow {
  position: absolute;
  left: 50%;
  top: 38%;
  width: 46vw;
  height: 46vw;
  min-width: 320px;
  min-height: 320px;
  margin: -23vw 0 0 -10vw;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(200, 245, 66, 0.2) 0%, rgba(200, 245, 66, 0) 62%);
  filter: blur(30px);
  pointer-events: none;
}

.hero-title {
  font-size: 20vw;
  text-transform: uppercase;
}
.hero-line-1,
.hero-line-2 {
  white-space: nowrap;
}
.hero-role {
  display: block;
  margin-top: 0.5rem;
  font-size: clamp(1.5rem, 6.4vw, 2.2rem);
  line-height: 1.1;
  text-transform: none;
  color: var(--accent);
}

.hero-portrait-wrap {
  position: relative;
  margin-top: 2rem;
  width: 100%;
  perspective: 1200px;
}
.hero-portrait {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 4.6;
  border-radius: 1.5rem;
  transform-style: preserve-3d;
  will-change: transform, clip-path;
}
.hero-portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 22%;
  filter: saturate(0.92) contrast(1.03);
}

.hero-badge {
  position: absolute;
  left: -0.75rem;
  bottom: -1.75rem;
  width: clamp(6.5rem, 11vw, 9.5rem);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--accent);
  color: var(--ink);
}
.hero-badge-ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.hero-badge-ring text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9.2px;
  font-weight: 500;
  letter-spacing: 0.08em;
  fill: var(--ink);
}
.hero-badge-core {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: clamp(1.3rem, 2.2vw, 1.9rem);
  letter-spacing: -0.05em;
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 15.2vw;
  }
  .hero-line-2 {
    display: flex;
    align-items: flex-end;
    gap: 2.2vw;
  }
  .hero-role {
    display: inline-block;
    margin: 0 0 0.24em;
    font-size: 2.5vw;
  }
  .hero-portrait-wrap {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 0;
    width: clamp(15rem, 25vw, 26rem);
  }
  .hero-portrait {
    aspect-ratio: 3 / 3.9;
  }
  .hero-badge {
    left: -3.2rem;
    bottom: 2rem;
  }
}

/* Short desktop screens: keep the name and portrait inside the first view. */
@media (min-width: 1024px) and (max-height: 760px) {
  .hero-title {
    font-size: 13vw;
  }
  .hero-portrait-wrap {
    width: clamp(13rem, 21vw, 20rem);
  }
}
</style>
