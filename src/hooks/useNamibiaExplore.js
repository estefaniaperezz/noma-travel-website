import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { EASE_EDITORIAL } from '../lib/motion'

/**
 * Namibia's Explore transform: the monumental title folds up into a
 * small corner mark, the photograph breathes in slightly, and a quiet
 * paper drawer rises along the bottom of the hero. CSS (driven by the
 * section's data-exploring attribute) owns show/hide for the detail
 * content; this hook only owns the spatial choreography, so reduced
 * motion still gets a fully functional (if instant) result.
 */
export function useNamibiaExplore(sectionRef, isOpen) {
  const tlRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      const image = section.querySelector('.hero__image')
      const title = section.querySelector('.hero__title')
      const meta = section.querySelector('.hero__meta')
      const explore = section.querySelector('.hero__explore')
      const panel = section.querySelector('.hero-detail__panel')
      const detailImage = section.querySelector('.hero-detail__image')

      gsap.set(panel, { yPercent: 100 })
      gsap.set(detailImage, { yPercent: 60 })

      const tl = gsap.timeline({ paused: true, defaults: { ease: EASE_EDITORIAL } })

      tl.to(
        title,
        {
          scale: 0.26,
          y: () => -(window.innerHeight * 0.74),
          transformOrigin: 'left bottom',
          duration: 0.9,
        },
        0,
      )
        .to(image, { scale: 1.08, duration: 1.1 }, 0)
        .to([meta, explore], { autoAlpha: 0, duration: 0.4 }, 0)
        .to(panel, { yPercent: 0, duration: 0.8 }, 0.15)
        .to(detailImage, { yPercent: 0, duration: 0.8 }, 0.3)

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
