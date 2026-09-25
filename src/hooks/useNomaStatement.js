import { useLayoutEffect } from 'react'
import { gsap } from '../lib/gsap'
import { fadeUpIn } from '../lib/scrollFx'

export function useNomaStatement(sectionRef) {
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      fadeUpIn(section.querySelector('.noma-statement__kicker'), { y: 12 })
      fadeUpIn(section.querySelector('.noma-statement__lead'), { y: 22 })
      fadeUpIn(section.querySelector('.noma-statement__support'), { y: 18 })
    }, section)

    return () => ctx.revert()
  }, [sectionRef])
}
