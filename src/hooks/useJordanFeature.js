import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger, EASE_EDITORIAL } from '../lib/scrollFx'

export function useJordanFeature(sectionRef) {
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      const image = section.querySelector('.jordan__image')
      const title = section.querySelector('.jordan__title')
      const copy = section.querySelector('.jordan__copy')
      const link = section.querySelector('.jordan__link')
      const detail = section.querySelector('.jordan__detail')

      gsap.set(image, { scale: 1.12 })
      gsap.set(title, { clipPath: 'inset(0% 0% 100% 0%)' })
      gsap.set([copy, link], { opacity: 0, y: 14 })
      gsap.set(detail, { opacity: 0, y: -30 })

      ScrollTrigger.create({
        trigger: section,
        start: 'top 65%',
        once: true,
        onEnter: () => {
          gsap.to(title, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.5,
            ease: EASE_EDITORIAL,
          })
          gsap.to(copy, { opacity: 0.85, y: 0, duration: 1, ease: EASE_EDITORIAL, delay: 0.3 })
          gsap.to(link, { opacity: 1, y: 0, duration: 1, ease: EASE_EDITORIAL, delay: 0.45 })
          gsap.to(detail, { opacity: 1, y: 0, duration: 1.1, ease: EASE_EDITORIAL, delay: 0.15 })
        },
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(image, { scale: 1.12 - self.progress * 0.12 })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [sectionRef])
}
