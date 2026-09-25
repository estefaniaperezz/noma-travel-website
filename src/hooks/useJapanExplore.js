import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { EASE_EDITORIAL } from '../lib/motion'

/**
 * Japan's Explore transform: tighter and more vertical than Namibia's.
 * The alley photograph compresses and dims a stop, JA/PAN relocates to
 * a small top-right mark, and a narrow dark panel slides in from the
 * right with its own layered photographic fragment.
 */
export function useJapanExplore(sectionRef, isOpen) {
  const tlRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      const image = section.querySelector('.japan-hero__image')
      const title = section.querySelector('.japan-hero__title')
      const meta = section.querySelector('.japan-hero__meta')
      const explore = section.querySelector('.japan-hero__explore')
      const panel = section.querySelector('.japan-detail')

      if (!panel) return

      gsap.set(panel, { xPercent: 100 })

      const tl = gsap.timeline({ paused: true, defaults: { ease: EASE_EDITORIAL } })

      tl.to(
        title,
        {
          scale: 0.3,
          y: () => -(window.innerHeight * 0.62),
          transformOrigin: 'right bottom',
          duration: 0.9,
        },
        0,
      )
        .to(image, { scale: 1.1, filter: 'brightness(0.75)', duration: 1.1 }, 0)
        .to([meta, explore], { autoAlpha: 0, duration: 0.4 }, 0)
        .to(panel, { xPercent: 0, duration: 0.75 }, 0.1)

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
