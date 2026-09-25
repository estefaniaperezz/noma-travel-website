import { useLayoutEffect } from 'react'
import { gsap } from '../lib/gsap'
import { EASE_EDITORIAL } from '../lib/motion'

export function useHeroIntro(containerRef) {
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const ctx = gsap.context(() => {
      const media = container.querySelector('.hero__media')
      const image = container.querySelector('.hero__image')
      const title = container.querySelector('.hero__title')
      const navMark = container.querySelector('.nav__mark')
      const navLinks = container.querySelectorAll('.nav__link')
      const navPlan = container.querySelector('.nav__plan')
      const meta = container.querySelector('.hero__meta')
      const explore = container.querySelector('.hero__explore')

      const revealTargets = [navMark, ...navLinks, navPlan, meta, explore]

      if (prefersReducedMotion) {
        gsap.set([media, image, title, ...revealTargets], { clearProps: 'all' })
        return
      }

      gsap.set(media, { clipPath: 'inset(0% 50% 0% 50%)' })
      gsap.set(image, { scale: 1.15 })
      gsap.set(title, { clipPath: 'inset(0% 0% 100% 0%)', y: 36 })
      gsap.set(revealTargets, { opacity: 0, y: 14 })

      const tl = gsap.timeline({ delay: 0.15 })

      tl.to(media, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
        ease: EASE_EDITORIAL,
      })
        .to(image, { scale: 1, duration: 1.9, ease: EASE_EDITORIAL }, '<')
        .to(
          title,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            duration: 1.1,
            ease: EASE_EDITORIAL,
          },
          0.5,
        )
        .to(
          navMark,
          { opacity: 1, y: 0, duration: 0.7, ease: EASE_EDITORIAL },
          1.05,
        )
        .to(
          navLinks,
          { opacity: 1, y: 0, duration: 0.7, ease: EASE_EDITORIAL, stagger: 0.06 },
          1.1,
        )
        .to(
          navPlan,
          { opacity: 1, y: 0, duration: 0.7, ease: EASE_EDITORIAL },
          1.2,
        )
        .to(
          meta,
          { opacity: 0.85, y: 0, duration: 0.7, ease: EASE_EDITORIAL },
          1.25,
        )
        .to(
          explore,
          { opacity: 1, y: 0, duration: 0.7, ease: EASE_EDITORIAL },
          1.3,
        )

      // Namibia's exit is choreographed by the unified transition stage
      // (see useJapanTransition) rather than a standalone exit scrub here.
    }, container)

    return () => ctx.revert()
  }, [containerRef])
}
