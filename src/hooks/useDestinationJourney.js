import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { EASE_EDITORIAL } from '../lib/motion'

// Duration (in the timeline's own units) of the Namibia → Japan half.
// Sri Lanka's phase is appended starting exactly here, on the same
// Japan elements Namibia revealed — there is no handoff between two
// different Japan instances, so there is nothing to seam.
const JAPAN_ARRIVES_AT = 4.5

export function useDestinationJourney(containerRef) {
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return undefined

    // The choreography itself (every gsap.set/timeline step below) is
    // identical at every size — only how much scroll distance it's
    // stretched across changes. A 3.8-viewport-height pin reads as
    // cinematic on a desktop trackpad/wheel; the same distance under a
    // touch scroll on a phone reads as a stuck page. gsap.matchMedia
    // keeps the approved desktop number untouched above 1024px and
    // shortens it going down, while also handling teardown/rebuild
    // cleanly across the breakpoint (and orientation-change) crossing,
    // which a one-off resize listener would not.
    const mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: '(min-width: 1025px)',
        isTablet: '(min-width: 769px) and (max-width: 1024px)',
        isMobile: '(max-width: 768px)',
      },
      (context) => {
        const { isTablet, isMobile } = context.conditions
        const pinMultiplier = isMobile ? 2.1 : isTablet ? 2.8 : 3.8

        const stage = container.querySelector('.journey-stage')
        const japanMask = container.querySelector('.journey-stage__japan-mask')
        const srilankaMask = container.querySelector('.journey-stage__srilanka-mask')

        const heroImage = container.querySelector('.journey-stage__namibia .hero__image')
        const heroTitle = container.querySelector('.journey-stage__namibia .hero__title')
        const heroMeta = container.querySelector('.journey-stage__namibia .hero__meta')
        const heroExplore = container.querySelector('.journey-stage__namibia .hero__explore')

        const japanImage = container.querySelector('.journey-stage__japan-mask .japan-hero__image')
        const japanTitle = container.querySelector('.journey-stage__japan-mask .japan-hero__title')
        const japanMeta = container.querySelector('.journey-stage__japan-mask .japan-hero__meta')
        const japanExplore = container.querySelector('.journey-stage__japan-mask .japan-hero__explore')

        const srilankaImage = container.querySelector('.journey-stage__srilanka-mask .srilanka-hero__image')
        const srilankaLines = container.querySelectorAll('.journey-stage__srilanka-mask .srilanka-hero__title-line')
        const srilankaMeta = container.querySelector('.journey-stage__srilanka-mask .srilanka-hero__meta')
        const srilankaExplore = container.querySelector('.journey-stage__srilanka-mask .srilanka-hero__explore')

        if (!stage || !japanMask || !srilankaMask) return undefined

        gsap.set(japanMask, { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set(japanImage, { scale: 1.12, yPercent: 4 })
        gsap.set(japanTitle, { clipPath: 'inset(0% 0% 100% 0%)', yPercent: 34 })
        gsap.set([japanMeta, japanExplore], { opacity: 0, y: 12 })

        gsap.set(srilankaMask, { clipPath: 'inset(0% 0% 0% 100%)' })
        gsap.set(srilankaImage, { scale: 1.14, filter: 'brightness(0.55) saturate(0.65)' })
        gsap.set(srilankaLines[0], { yPercent: -60, rotate: -4, opacity: 0 })
        gsap.set(srilankaLines[1], { yPercent: 60, rotate: 3, opacity: 0 })
        gsap.set([srilankaMeta, srilankaExplore], { opacity: 0, y: 12 })

        const tl = gsap.timeline({ defaults: { ease: 'none' } })

        // ---- Namibia → Japan --------------------------------------------
        // Phase 1 — Namibia stays alive: photography drifts slowly and wide
        // while its typography exits independently, and faster.
        tl.to(heroImage, { scale: 1.16, yPercent: -6, duration: 4.2 }, 0)
          .to(
            heroTitle,
            { yPercent: -70, scale: 0.82, opacity: 0, duration: 1.1, ease: EASE_EDITORIAL },
            0,
          )
          .fromTo(
            heroMeta,
            { opacity: 0.85, y: 0 },
            { opacity: 0, y: -10, duration: 0.35, immediateRender: false },
            0,
          )
          .fromTo(
            heroExplore,
            { opacity: 1, y: 0 },
            { opacity: 0, y: -10, duration: 0.35, immediateRender: false },
            0,
          )

          // Phase 2/3 — Japan reveals through a rising horizontal mask while
          // its own photography and typography move at independent rates,
          // sharing the frame with the still-drifting Namibia scene.
          .to(
            japanMask,
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 2.0, ease: EASE_EDITORIAL },
            0.3,
          )
          .to(japanImage, { scale: 1, yPercent: 0, duration: 2.1, ease: EASE_EDITORIAL }, 0.5)
          .to(
            japanTitle,
            { clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0, duration: 1.9, ease: EASE_EDITORIAL },
            0.9,
          )

          // Phase 4 — Japan takes over; metadata and explore settle last.
          // The gap before Sri Lanka's phase begins (below) is Japan's
          // resting window — the same instance just sits here, arrived.
          .to(
            [japanMeta, japanExplore],
            { opacity: 1, y: 0, duration: 0.6, ease: EASE_EDITORIAL, stagger: 0.1 },
            2.6,
          )

          // ---- Japan → Sri Lanka ------------------------------------------
          // Phase 1 — Japan exits quickly and cleanly: no extra dark bars,
          // just its own photograph dimming and its typography lifting
          // away, well before Sri Lanka's sweep reaches that edge.
          .to(
            japanImage,
            { scale: 1.1, filter: 'brightness(0.7)', duration: 1.0 },
            JAPAN_ARRIVES_AT,
          )
          .to(
            japanTitle,
            { yPercent: -40, opacity: 0, duration: 0.6, ease: EASE_EDITORIAL },
            JAPAN_ARRIVES_AT,
          )
          .to(japanMeta, { opacity: 0, y: -8, duration: 0.5 }, JAPAN_ARRIVES_AT)

          // Phase 2 — Sri Lanka sweeps in as one continuous left-to-right
          // wipe, so it reaches Japan's dark margin quickly instead of
          // leaving it stranded while a center-out reveal catches up.
          .to(
            srilankaMask,
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: EASE_EDITORIAL },
            JAPAN_ARRIVES_AT + 0.3,
          )
          .to(
            srilankaImage,
            { scale: 1, filter: 'brightness(1) saturate(1)', duration: 1.9, ease: EASE_EDITORIAL },
            JAPAN_ARRIVES_AT + 0.3,
          )

          // Phase 3 — typography arrives with a looser, more fluid rhythm
          // than Japan's, settling once the frame belongs to Sri Lanka.
          .to(
            srilankaLines[0],
            { yPercent: 0, rotate: 0, opacity: 1, duration: 1.1, ease: 'back.out(1.5)' },
            JAPAN_ARRIVES_AT + 1.7,
          )
          .to(
            srilankaLines[1],
            { yPercent: 0, rotate: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.5)' },
            JAPAN_ARRIVES_AT + 1.85,
          )
          .to(
            [srilankaMeta, srilankaExplore],
            { opacity: 1, y: 0, duration: 0.5, ease: EASE_EDITORIAL, stagger: 0.08 },
            JAPAN_ARRIVES_AT + 2.7,
          )

          // Resting pad — Sri Lanka sits fully settled, static, for the
          // remainder of the pin so there is a real window to Explore.
          .to({}, { duration: 1.1 })

        ScrollTrigger.create({
          trigger: stage,
          start: 'top top',
          end: () => `+=${window.innerHeight * pinMultiplier}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          animation: tl,
        })

        return undefined
      },
    )

    return () => mm.revert()
  }, [containerRef])
}
