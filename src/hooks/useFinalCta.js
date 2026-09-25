import { useLayoutEffect } from 'react'
import { gsap } from '../lib/gsap'
import { fadeUpIn } from '../lib/scrollFx'

export function useFinalCta(sectionRef) {
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      fadeUpIn(section.querySelector('.final-cta__headline'), { y: 24 })
      fadeUpIn(section.querySelector('.final-cta__support'), { y: 18 })
      fadeUpIn(section.querySelector('.final-cta__link'), { y: 14 })
    }, section)

    return () => ctx.revert()
  }, [sectionRef])
}
