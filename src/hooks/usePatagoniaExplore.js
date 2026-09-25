import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { EASE_EDITORIAL } from '../lib/motion'

/**
 * Patagonia's Explore transform is deliberately slower and broader
 * than the destinations before it: the title settles into a small
 * corner mark and a wide, text-only ledger rises across the full
 * width of the frame — vast and quiet rather than layered. It never
 * touches the image or secondary card, which the scroll-scrub in
 * usePatagoniaFeature already owns.
 */
export function usePatagoniaExplore(sectionRef, isOpen) {
  const tlRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      const title = section.querySelector('.patagonia__title')
      const copy = section.querySelector('.patagonia__copy')
      const link = section.querySelector('.patagonia__link')
      const panel = section.querySelector('.patagonia-detail')

      if (!panel) return

      gsap.set(panel, { yPercent: 100 })
      gsap.set(title, { transformOrigin: 'left top' })

      const tl = gsap.timeline({ paused: true, defaults: { ease: EASE_EDITORIAL } })

      tl.to(title, { scale: 0.32, duration: 1.6 }, 0)
        .to([copy, link], { autoAlpha: 0, duration: 0.7 }, 0)
        .to(panel, { yPercent: 0, autoAlpha: 1, duration: 1.5 }, 0.25)

      tlRef.current = tl
    }, section)

    return () => ctx.revert()
  }, [sectionRef])

  useEffect(() => {
    const tl = tlRef.current
    if (!tl) return
    if (isOpen) tl.play()
    else tl.reverse()
  }, [isOpen])
}
