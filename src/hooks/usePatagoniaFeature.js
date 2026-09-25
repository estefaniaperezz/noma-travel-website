import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger, EASE_EDITORIAL } from '../lib/scrollFx'

export function usePatagoniaFeature(sectionRef) {
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      const image = section.querySelector('.patagonia__image')
      const title = section.querySelector('.patagonia__title')
      const copy = section.querySelector('.patagonia__copy')
      const link = section.querySelector('.patagonia__link')
      const secondary = section.querySelector('.patagonia__secondary')

      gsap.set(image, { scale: 1.14 })
      gsap.set(title, { clipPath: 'inset(0% 0% 100% 0%)' })
      gsap.set([copy, link], { opacity: 0, y: 16 })
      gsap.set(secondary, { opacity: 0, y: 50 })

      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to(title, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.5,
            ease: EASE_EDITORIAL,
          })
          gsap.to(copy, { opacity: 0.85, y: 0, duration: 1, ease: EASE_EDITORIAL, delay: 0.3 })
          gsap.to(link, { opacity: 1, y: 0, duration: 1, ease: EASE_EDITORIAL, delay: 0.45 })
          gsap.to(secondary, { opacity: 1, y: 0, duration: 1.3, ease: EASE_EDITORIAL, delay: 0.2 })
        },
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(image, { scale: 1.14 - self.progress * 0.14 })
          gsap.set(secondary, { yPercent: (self.progress - 0.5) * -14 })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [sectionRef])
}
