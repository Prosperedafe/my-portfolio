<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap, reduced } from '../lib/gsap'
import bexoraMobile1 from '../assets/projects/bexora-mobile-1.webp'
import bexoraMobile2 from '../assets/projects/bexora-mobile-2.webp'
import cleanproMobile from '../assets/projects/cleanpro-mobile.webp'
import quilox from '../assets/projects/quilox.webp'
import ArrowIcon from './ArrowIcon.vue'

// Desktop: the section pins while three phones rise out of a stack and fan apart.
// Phones and tablets: the phones sit in a swipeable row.
const root = ref<HTMLElement | null>(null)
let mm: gsap.MatchMedia | null = null

const phones = [
  {
    slug: 'bexora',
    name: 'Bexora mobile',
    meta: 'iOS · Android',
    note: 'Comms, CRM, meetings, notes, vault, ID cards',
  },
  {
    slug: 'cleanpro-os',
    name: 'CleanPro mobile',
    meta: 'iOS · Android',
    note: 'Customer booking, tracking and ratings',
  },
  {
    slug: 'quilox',
    name: 'Quilox',
    meta: 'Google Play',
    note: 'Wallet, QR payments and event tickets',
  },
]

const capabilities = [
  'Push notifications',
  'In-app payments',
  'Real-time chat',
  'Camera & QR codes',
  'Voice dictation',
  'Location services',
  'Offline queues',
  'Deep links',
  'File uploads',
  'iOS & Android builds',
]

onMounted(() => {
  if (reduced || !root.value) return
  const el = root.value
  mm = gsap.matchMedia(el)

  mm.add('(min-width: 1024px)', () => {
    const q = gsap.utils.selector(el)
    const [left, mid, right] = q('.phone')
    // Only the device tilts; the caption under it stays level.
    const [leftBody, , rightBody] = q('.phone-body')

    gsap.set([left, mid, right], { xPercent: 0, yPercent: 30, scale: 0.86 })
    gsap.set(leftBody, { rotate: -4 })
    gsap.set(rightBody, { rotate: 4 })
    gsap.set(q('.phone-caption'), { autoAlpha: 0, y: 24 })
    gsap.set(q('.cap'), { autoAlpha: 0, y: 18 })

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=170%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    })

    tl.to(q('.mobile-ghost'), { xPercent: -28, duration: 1 }, 0)
      .to(q('.mobile-head'), { yPercent: -30, autoAlpha: 0.12, duration: 0.6 }, 0.25)
      .to(mid, { yPercent: -4, scale: 1, duration: 0.45, ease: 'power2.out' }, 0)
      .to(left, { xPercent: -118, yPercent: 4, scale: 0.94, duration: 0.5, ease: 'power2.out' }, 0.12)
      .to(right, { xPercent: 118, yPercent: 4, scale: 0.94, duration: 0.5, ease: 'power2.out' }, 0.12)
      .to(leftBody, { rotate: -7, duration: 0.5, ease: 'power2.out' }, 0.12)
      .to(rightBody, { rotate: 7, duration: 0.5, ease: 'power2.out' }, 0.12)
      .to(q('.phone-screen-img'), { yPercent: -6, duration: 1 }, 0)
      .to(q('.phone-caption'), { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.06 }, 0.5)
      .to(q('.cap'), { autoAlpha: 1, y: 0, duration: 0.12, stagger: 0.035 }, 0.55)
      .to({}, { duration: 0.15 })
  })

  mm.add('(max-width: 1023px)', () => {
    const q = gsap.utils.selector(el)
    gsap.from(q('.phone'), {
      yPercent: 18,
      autoAlpha: 0,
      duration: 1.2,
      stagger: 0.12,
      scrollTrigger: { trigger: q('.phones')[0], start: 'top 85%', once: true },
    })
    gsap.from(q('.cap'), {
      autoAlpha: 0,
      y: 14,
      duration: 0.7,
      stagger: 0.04,
      scrollTrigger: { trigger: q('.caps')[0], start: 'top 92%', once: true },
    })
  })
})

onUnmounted(() => mm?.revert())
</script>

<template>
  <section ref="root" class="mobile">
    <!-- Giant outlined word drifting behind everything -->
    <div class="mobile-ghost" aria-hidden="true">Mobile — Mobile — Mobile</div>

    <div class="mobile-head px-gutter">
      <p class="label">(03) — On mobile</p>
      <h2 class="display mt-5 text-[clamp(2.8rem,7vw,7rem)]">
        Also in your <span class="serif-i text-accent">pocket.</span>
      </h2>
      <p class="mt-5 max-w-[34rem] text-bone/70 lg:mx-auto">
        Bexora and CleanPro aren't only on the web. Both have mobile apps for iOS and Android, built
        with React Native and Expo, alongside the Quilox app.
      </p>
    </div>

    <div class="phones">
      <router-link
        v-for="p in phones"
        :key="p.slug"
        :to="`/projects/${p.slug}`"
        class="phone"
        data-cursor="view"
        data-cursor-text="View"
      >
        <div class="phone-body" :class="{ 'is-art': p.slug !== 'cleanpro-os' }">
          <!-- Bexora: two App Store screens; the second fades in on hover -->
          <template v-if="p.slug === 'bexora'">
            <img class="phone-art" :src="bexoraMobile1" alt="Bexora mobile app home dashboard" loading="lazy" />
            <img class="phone-art phone-art-alt" :src="bexoraMobile2" alt="Bexora mobile app project management screen" loading="lazy" />
          </template>
          <div v-else-if="p.slug === 'cleanpro-os'" class="phone-screen">
            <img class="phone-screen-img" :src="cleanproMobile" alt="CleanPro app, book a service screen" loading="lazy" />
          </div>
          <img v-else class="phone-art" :src="quilox" alt="Quilox app showing upcoming events and tickets" loading="lazy" />
          <span v-if="p.slug === 'cleanpro-os'" class="phone-island" aria-hidden="true"></span>
        </div>

        <div class="phone-caption">
          <span class="block font-display text-xl font-extrabold leading-tight tracking-tight">{{ p.name }}</span>
          <span class="label mt-1 block">{{ p.meta }}</span>
          <p class="mt-1.5 text-sm leading-snug text-bone/60">{{ p.note }}</p>
        </div>
      </router-link>
    </div>

    <div class="caps px-gutter">
      <span v-for="c in capabilities" :key="c" class="cap chip">{{ c }}</span>
      <router-link to="/projects" class="cap chip chip-link">
        See the apps <ArrowIcon :size="10" />
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.mobile {
  position: relative;
  overflow: hidden;
  padding: clamp(4rem, 10vw, 7rem) 0;
}
.mobile-ghost {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: 30vw;
  line-height: 1;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1px rgba(237, 232, 223, 0.07);
  pointer-events: none;
  user-select: none;
}

.phones {
  position: relative;
  display: flex;
  gap: 1.25rem;
  margin-top: 3rem;
  padding: 0 clamp(1.25rem, 4vw, 4rem) 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
.phones::-webkit-scrollbar {
  display: none;
}
.phone {
  flex: 0 0 auto;
  width: min(68vw, 17rem);
  scroll-snap-align: center;
}
.phone-body {
  position: relative;
  aspect-ratio: 9 / 19;
  padding: 0.55rem;
  border-radius: 2.6rem;
  background: linear-gradient(145deg, #2c2c31, #0e0e10 55%, #26262b);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    0 40px 80px -30px rgba(0, 0, 0, 0.9),
    0 0 0 1px rgba(0, 0, 0, 0.6);
}
.phone-body.is-art {
  padding: 0;
  overflow: hidden;
  background: #1a1a1d;
}
.phone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 2.1rem;
  background: #fff;
}
.phone-screen-img {
  width: 100%;
  max-width: none;
  height: auto;
}
.phone-art {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 70%;
}
.phone-art-alt {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.phone:hover .phone-art-alt {
  opacity: 1;
}
.phone-island {
  position: absolute;
  left: 50%;
  top: 1.05rem;
  width: 30%;
  height: 1.35rem;
  transform: translateX(-50%);
  border-radius: 9999px;
  background: #050506;
}
.phone-caption {
  margin-top: 1.25rem;
}
.phone:hover .phone-body {
  box-shadow:
    inset 0 0 0 1px rgba(200, 245, 66, 0.5),
    0 40px 80px -30px rgba(0, 0, 0, 0.9),
    0 0 60px -20px rgba(200, 245, 66, 0.35);
}

.caps {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 2.5rem;
}
.chip-link {
  gap: 0.5rem;
  background: var(--accent);
  border-color: var(--accent);
  color: var(--ink);
}

@media (min-width: 1024px) {
  .mobile {
    height: 100vh;
    padding: 6rem 0 2.5rem;
    display: flex;
    flex-direction: column;
  }
  .mobile-head {
    position: absolute;
    inset: 7rem 0 auto;
    text-align: center;
  }
  .phones {
    flex: 1;
    min-height: 0;
    margin-top: 0;
    justify-content: center;
    align-items: flex-end;
    overflow: visible;
    padding-bottom: 0;
  }
  .phone {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: auto;
    height: min(58vh, 36rem);
    aspect-ratio: 9 / 23;
    margin-left: calc(min(58vh, 36rem) * -0.196);
  }
  .phone:nth-child(2) {
    z-index: 2;
  }
  .phone-body {
    height: calc(100% - 6.5rem);
    aspect-ratio: auto;
  }
  .phone-caption {
    text-align: center;
  }
  .caps {
    justify-content: center;
    margin-top: 1.75rem;
  }
}
</style>
