import { useLayoutEffect } from 'react'
import { gsap } from '../lib/gsap'
import { fadeUpIn } from '../lib/scrollFx'

export function useJournal(sectionRef) {
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      fadeUpIn(section.querySelectorAll('.journal__head > *'), { stagger: 0.08, y: 16 })
      fadeUpIn(section.querySelectorAll('.journal__row'), { stagger: 0.1, y: 22 })
    }, section)

    return () => ctx.revert()
  }, [sectionRef])
}
