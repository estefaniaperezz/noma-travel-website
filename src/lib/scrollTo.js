import { gsap } from './gsap'
import { lenisRef } from './lenisInstance'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function clampToDocument(y) {
  const max = document.documentElement.scrollHeight - window.innerHeight
  return Math.max(0, Math.min(y, max))
}

/**
 * Drives in-page navigation with its own GSAP tween rather than
 * `Lenis#scrollTo()` or the native `behavior: 'smooth'` option —
 * both were found unreliable in combination with this project's
 * GSAP-ticker-driven Lenis setup (the animation would report started
 * but never actually advance the scroll position). Lenis is stopped
 * for the duration of the tween so it can't fight it, then restarted
 * once the tween completes.
 */
function animateScrollTo(destination, duration) {
  const target = clampToDocument(destination)

  if (prefersReducedMotion()) {
    window.scrollTo(0, target)
    return
  }

  lenisRef.current?.stop()

  const state = { y: window.scrollY }
  gsap.to(state, {
    y: target,
    duration,
    ease: 'power2.inOut',
    onUpdate: () => window.scrollTo(0, state.y),
    onComplete: () => lenisRef.current?.start(),
  })
}

/**
 * Scrolls to a selector or element. `offset` shifts the landing
 * position — negative values land lower, clearing the fixed nav.
 */
export function scrollToTarget(target, { offset = -90, duration = 1.2 } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  const destination = el.getBoundingClientRect().top + window.scrollY + offset
  animateScrollTo(destination, duration)
}

export function scrollToTop(duration = 1.2) {
  animateScrollTo(0, duration)
}
