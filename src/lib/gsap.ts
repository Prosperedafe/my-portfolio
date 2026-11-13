import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { CustomEase } from 'gsap/CustomEase'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrambleTextPlugin, CustomEase, Flip)

// Signature easings used across the site.
CustomEase.create('silk', '0.16, 1, 0.3, 1')
CustomEase.create('snap', '0.76, 0, 0.24, 1')

gsap.defaults({ ease: 'silk', duration: 1 })
ScrollTrigger.config({ ignoreMobileResize: true })

export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches

/* ------------------------------------------------------------------ */
/* "Ready" gate: page intro animations wait until the preloader or the */
/* route curtain starts lifting, so nothing plays behind a cover.      */
/* ------------------------------------------------------------------ */
let ready = false
const queue: Array<() => void> = []

export function whenReady(fn: () => void) {
  if (ready) fn()
  else queue.push(fn)
}

export function setReady() {
  ready = true
  queue.splice(0).forEach((fn) => fn())
}

export function resetReady() {
  ready = false
}

/* ------------------------------------------------------------------ */
/* Smooth scrolling                                                    */
/* ------------------------------------------------------------------ */
let smoother: ScrollSmoother | null = null

export function initSmoother() {
  if (reduced || isTouch) return null
  smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.15,
    effects: true,
    smoothTouch: false,
  })
  return smoother
}

export function pauseScroll(paused: boolean) {
  if (smoother) smoother.paused(paused)
  document.documentElement.classList.toggle('is-loading', paused)
}

export function scrollToTop(smooth = false) {
  if (smoother) smoother.scrollTo(0, smooth)
  else window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
}

export function refreshScroll() {
  if (smoother) smoother.effects('[data-speed], [data-lag]')
  ScrollTrigger.refresh()
}

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, Flip }
