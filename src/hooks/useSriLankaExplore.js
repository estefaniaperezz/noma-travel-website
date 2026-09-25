import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { EASE_EDITORIAL } from '../lib/motion'

/**
 * Sri Lanka's Explore transform — the strongest existing idea from the
 * earlier scroll-driven bridge, now triggered deliberately by the user
 * instead of automatically on scroll, and living on a single hero
 * instance so nothing duplicates or fragments.
 */
export function useSriLankaExplore(sectionRef, isOpen) {
  const tlRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      const media = section.querySelector('.srilanka-hero__media')
      const title = section.querySelector('.srilanka-hero__title')
      const meta = section.querySelector('.srilanka-hero__meta')
      const explore = section.querySelector('.srilanka-hero__explore')
      const panel = section.querySelector('.srilanka-detail')
      const panelInner = section.querySelector('.srilanka-detail__inner')
      const images = section.querySelectorAll('.srilanka-detail__image')
      const rule = section.querySelector('.srilanka-detail__rule')

      if (!panel) return

      gsap.set(title, { transformOrigin: 'top left' })
      gsap.set(panelInner, { autoAlpha: 0, x: 24 })
      gsap.set(images, { autoAlpha: 0, y: 18 })

      const tl = gsap.timeline({ paused: true, defaults: { ease: EASE_EDITORIAL } })

      tl.to(media, { clipPath: 'inset(0% 44% 0% 0%)', duration: 1.1 }, 0)
        .to(title, { scale: 0.24, y: 104, duration: 1.0 }, 0.05)
        .to([meta, explore], { autoAlpha: 0, duration: 0.4 }, 0)
        .to(panel, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1 }, 0.1)
        .to(panelInner, { autoAlpha: 1, x: 0, duration: 0.7 }, 0.55)
        .to(rule, { width: '100%', duration: 0.6 }, 0.85)
        .to(images, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 }, 0.7)

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
