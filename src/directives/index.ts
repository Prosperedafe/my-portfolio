import type { App, Directive } from 'vue'
import { gsap, SplitText, whenReady, reduced, isTouch } from '../lib/gsap'

type AnyEl = HTMLElement & {
  _tween?: gsap.core.Tween | gsap.core.Timeline
  _split?: SplitText
  _off?: () => void
}

interface RevealOptions {
  delay?: number
  y?: number
  start?: string
}

interface TextOptions {
  delay?: number
  stagger?: number
  start?: string
}

/** Text is split only once the page is uncovered and the web fonts are in, so lines break correctly. */
function afterFonts(fn: () => void) {
  whenReady(() => {
    document.fonts.ready.then(fn)
  })
}

function killTween(el: AnyEl) {
  el._tween?.scrollTrigger?.kill()
  el._tween?.kill()
}

/** v-reveal: fade and rise into place when scrolled into view. */
const reveal: Directive<AnyEl, RevealOptions | undefined> = {
  mounted(el, binding) {
    if (reduced) return
    const o = binding.value || {}
    gsap.set(el, { autoAlpha: 0, y: o.y ?? 44 })
    whenReady(() => {
      if (!el.isConnected) return
      el._tween = gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        delay: o.delay ?? 0,
        scrollTrigger: { trigger: el, start: o.start ?? 'top 92%', once: true },
      })
    })
  },
  unmounted: killTween,
}

/** v-lines: split into lines and slide each one up from behind a mask. */
const lines: Directive<AnyEl, TextOptions | undefined> = {
  mounted(el, binding) {
    if (reduced) return
    const o = binding.value || {}
    gsap.set(el, { autoAlpha: 0 })
    afterFonts(() => {
      if (!el.isConnected) return
      gsap.set(el, { autoAlpha: 1 })
      el._split = SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'sl',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 135,
            duration: 1.15,
            stagger: o.stagger ?? 0.09,
            delay: o.delay ?? 0,
            scrollTrigger: { trigger: el, start: o.start ?? 'top 90%', once: true },
          })
        },
      })
    })
  },
  unmounted(el) {
    el._split?.revert()
  },
}

/** v-chars: big headings, letters rise one after another. */
const chars: Directive<AnyEl, TextOptions | undefined> = {
  mounted(el, binding) {
    if (reduced) return
    const o = binding.value || {}
    gsap.set(el, { autoAlpha: 0 })
    afterFonts(() => {
      if (!el.isConnected) return
      gsap.set(el, { autoAlpha: 1 })
      el._split = SplitText.create(el, {
        type: 'lines,chars',
        mask: 'lines',
        linesClass: 'sl',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.chars, {
            yPercent: 135,
            rotate: 6,
            duration: 1.1,
            stagger: o.stagger ?? 0.022,
            delay: o.delay ?? 0,
            scrollTrigger: { trigger: el, start: o.start ?? 'top 90%', once: true },
          })
        },
      })
    })
  },
  unmounted(el) {
    el._split?.revert()
  },
}

/** v-magnetic: element leans toward the pointer and springs back. */
const magnetic: Directive<AnyEl, number | undefined> = {
  mounted(el, binding) {
    if (reduced || isTouch) return
    const strength = binding.value ?? 0.35
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1, 0.35)', overwrite: true })
    }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    el._off = () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  },
  unmounted(el) {
    el._off?.()
    gsap.killTweensOf(el)
  },
}

/** v-parallax: image drifts inside its overflow-hidden frame while scrolling. */
const parallax: Directive<AnyEl, number | undefined> = {
  mounted(el, binding) {
    if (reduced) return
    const amount = binding.value ?? 10
    gsap.set(el, { scale: 1 + (amount * 2.4) / 100 })
    el._tween = gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )
  },
  unmounted: killTween,
}

/** v-rule: hairline that draws itself from the left. */
const rule: Directive<AnyEl, RevealOptions | undefined> = {
  mounted(el, binding) {
    if (reduced) return
    const o = binding.value || {}
    gsap.set(el, { scaleX: 0, transformOrigin: 'left center' })
    whenReady(() => {
      if (!el.isConnected) return
      el._tween = gsap.to(el, {
        scaleX: 1,
        duration: 1.5,
        ease: 'snap',
        delay: o.delay ?? 0,
        scrollTrigger: { trigger: el, start: o.start ?? 'top 95%', once: true },
      })
    })
  },
  unmounted: killTween,
}

export function registerDirectives(app: App) {
  app.directive('reveal', reveal)
  app.directive('lines', lines)
  app.directive('chars', chars)
  app.directive('magnetic', magnetic)
  app.directive('parallax', parallax)
  app.directive('rule', rule)
}
