import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { EASE_EDITORIAL } from '../lib/motion'

/**
 * Jordan's Explore transform is a geometric mask growth rather than a
 * sliding panel: the small Petra inset scales up into a large
 * architectural frame, the title recedes to a faint watermark, and a
 * narrative column opens beside the enlarged stonework. Distinct from
 * every other destination's Explore treatment, and slow/sparse to
 * match Jordan's stone-and-silence register. Never touches
 * `.jordan__image`, which the scroll-scrub in useJordanFeature owns.
 *
 * The inset grows via actual `width`/`height` (not `transform:
 * scale`) — scaling a small rasterized image layer up can render
 * soft on some browsers/GPUs regardless of the source file's real
 * resolution, since the layer is captured at its pre-scale pixel
 * size and then stretched. Animating layout size instead forces a
 * genuine re-render at every step, so it stays crisp.
 */
export function useJordanExplore(sectionRef, isOpen) {
  const tlRef = useRef(null)
  const isOpenRef = useRef(isOpen)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return undefined

    // Below 769px the desktop geometry (grow the inset to a fixed
    // 456px, sit the narrative beside it) no longer fits: 456px alone
    // can exceed the viewport width, and the narrative becomes a
    // full-screen takeover that would immediately cover the growing
    // inset anyway. gsap.matchMedia swaps in a simpler fade that never
    // animates a fixed pixel width, so nothing can push the layout
    // wider than the viewport mid-transition.
    const mm = gsap.matchMedia()

    mm.add(
      {
        isMobile: '(max-width: 768px)',
        isTablet: '(min-width: 769px) and (max-width: 1024px)',
        isDesktop: '(min-width: 1025px)',
      },
      (context) => {
        const { isMobile, isTablet } = context.conditions
        const detail = section.querySelector('.jordan__detail')
        const title = section.querySelector('.jordan__title')
        const copy = section.querySelector('.jordan__copy')
        const link = section.querySelector('.jordan__link')
        const narrative = section.querySelector('.jordan-detail')

        if (!detail || !narrative) return undefined

        gsap.set(title, { transformOrigin: isMobile ? 'left bottom' : 'right bottom' })

        const tl = gsap.timeline({ paused: true, defaults: { ease: EASE_EDITORIAL } })

        if (isMobile) {
          tl.to([copy, link], { autoAlpha: 0, duration: 0.4 }, 0)
            .to(title, { autoAlpha: 0.16, duration: 0.5 }, 0)
            .to(narrative, { autoAlpha: 1, duration: 0.6 }, 0.15)
        } else {
          const expandedWidth = isTablet ? Math.min(window.innerWidth * 0.42, 360) : 456

          tl.to(detail, { width: expandedWidth, duration: 1.7 }, 0)
            .to(title, { scale: 0.4, opacity: 0.5, duration: 1.3 }, 0)
            .to([copy, link], { autoAlpha: 0, duration: 0.6 }, 0)
            .to(narrative, { autoAlpha: 1, duration: 0.9 }, 0.7)
        }

        tl.progress(isOpenRef.current ? 1 : 0)
        tlRef.current = tl

        return () => {
          tlRef.current = null
        }
      },
    )

    return () => mm.revert()
  }, [sectionRef])

  useEffect(() => {
    isOpenRef.current = isOpen
    const tl = tlRef.current
    if (!tl) return
    if (isOpen) tl.play()
    else tl.reverse()
  }, [isOpen])
}
