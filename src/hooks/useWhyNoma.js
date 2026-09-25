import { useLayoutEffect } from 'react'
import { gsap } from '../lib/gsap'
import { fadeUpIn } from '../lib/scrollFx'

export function useWhyNoma(sectionRef) {
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      fadeUpIn(section.querySelector('.why-noma__kicker'), { y: 12 })
      fadeUpIn(section.querySelectorAll('.why-noma__item'), { stagger: 0.12, y: 20 })
      fadeUpIn(section.querySelector('.why-noma__detail'), { y: 24 })
    }, section)

    return () => ctx.revert()
  }, [sectionRef])
}
