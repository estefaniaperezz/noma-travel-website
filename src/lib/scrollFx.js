import { gsap, ScrollTrigger } from './gsap'
import { EASE_EDITORIAL } from './motion'

/**
 * Shared "settle into place" reveal used by the quieter editorial
 * sections. Not for pinned/choreographed moments — those get bespoke
 * timelines — this is the common fade + rise treatment.
 */
export function fadeUpIn(targets, { stagger = 0, start = 'top 82%', y = 28 } = {}) {
  if (!targets) return
  const els = targets instanceof NodeList || Array.isArray(targets) ? targets : [targets]
  if (!els.length) return

  gsap.set(els, { opacity: 0, y })

  ScrollTrigger.batch(els, {
    start,
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: EASE_EDITORIAL,
        stagger,
      }),
  })
}

export { gsap, ScrollTrigger, EASE_EDITORIAL }
