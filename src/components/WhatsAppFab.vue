<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap, reduced, whenReady } from '../lib/gsap'
import { site } from '../data/site'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (reduced || !root.value) return
  gsap.set(root.value, { scale: 0, autoAlpha: 0 })
  whenReady(() => {
    gsap.to(root.value, { scale: 1, autoAlpha: 1, duration: 1, delay: 1.6, ease: 'elastic.out(1, 0.55)' })
  })
})
</script>

<template>
  <div ref="root" class="fab-wrap">
    <a
      v-magnetic="0.3"
      :href="site.whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      class="fab"
      aria-label="Chat with Prosper on WhatsApp"
    >
      <span class="fab-pulse" aria-hidden="true"></span>
      <span class="fab-label">Chat on WhatsApp</span>
      <span class="fab-icon">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
          />
        </svg>
      </span>
    </a>
  </div>
</template>

<style scoped>
.fab-wrap {
  position: fixed;
  right: clamp(1rem, 2.5vw, 2rem);
  bottom: clamp(1rem, 2.5vw, 2rem);
  z-index: 40;
}
.fab {
  position: relative;
  display: flex;
  align-items: center;
  height: 58px;
  border-radius: 9999px;
  background: var(--accent);
  color: var(--ink);
  box-shadow: 0 12px 40px -10px rgba(200, 245, 66, 0.55);
}
.fab-icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  flex-shrink: 0;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.fab:hover .fab-icon {
  transform: rotate(-12deg) scale(1.08);
}
/* The label unrolls to the left of the icon on hover */
.fab-label {
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0;
  transition:
    max-width 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    padding 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.35s;
}
@media (hover: hover) {
  .fab:hover .fab-label,
  .fab:focus-visible .fab-label {
    max-width: 14rem;
    padding-left: 1.4rem;
    opacity: 1;
  }
}
.fab-pulse {
  position: absolute;
  right: 0;
  top: 0;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  animation: fab-pulse 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  pointer-events: none;
}
@keyframes fab-pulse {
  0% {
    transform: scale(1);
    opacity: 0.9;
  }
  100% {
    transform: scale(1.9);
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .fab-pulse {
    animation: none;
    opacity: 0;
  }
}
</style>
