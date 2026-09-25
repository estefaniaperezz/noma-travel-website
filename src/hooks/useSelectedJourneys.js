import { gsap, ScrollTrigger, EASE_EDITORIAL, fadeUpIn } from '../lib/scrollFx'
import { useLayoutEffect } from 'react'

export function useSelectedJourneys(sectionRef) {
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      fadeUpIn(section.querySelectorAll('.journeys__head > *'), { stagger: 0.08, y: 16 })

      const reveals = [
        {
          media: '.journeys__primary-media',
          extra: ['.journeys__primary-title', '.journeys__primary-caption'],
        },
        {
          media: '.journeys__secondary-media',
          extra: ['.journeys__secondary-text'],
        },
        {
          media: '.journeys__tertiary-media',
          extra: ['.journeys__tertiary .journeys__index', '.journeys__tertiary-title', '.journeys__tertiary-desc'],
        },
      ]

      reveals.forEach(({ media, extra }, index) => {
        const mediaEl = section.querySelector(media)
        const img = mediaEl?.querySelector('img')
        const extraEls = extra
          .map((selector) => section.querySelector(selector))
          .filter(Boolean)

        if (!mediaEl || !img) return

        gsap.set(mediaEl, { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set(img, { scale: 1.18 })
        gsap.set(extraEls, { opacity: 0, y: 16 })

        ScrollTrigger.create({
          trigger: mediaEl,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(mediaEl, {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.1,
              ease: EASE_EDITORIAL,
              delay: index * 0.06,
            })
            gsap.to(img, {
              scale: 1,
              duration: 1.4,
              ease: EASE_EDITORIAL,
              delay: index * 0.06,
            })
            gsap.to(extraEls, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: EASE_EDITORIAL,
              stagger: 0.1,
              delay: 0.3 + index * 0.06,
            })
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [sectionRef])
}
