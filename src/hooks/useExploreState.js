import { useCallback, useEffect, useRef, useState } from 'react'
import { lenisRef } from '../lib/lenisInstance'
import { ScrollTrigger } from '../lib/gsap'
import { applyNavVisibility } from '../lib/navVisibility'

const SCROLL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
])

/**
 * Shared open/close state for a destination's Explore transformation.
 * Owns scroll-locking (so background Home scroll can't fight the
 * transformation), Escape-key dismissal, and focus management. The
 * motion itself is bespoke per destination and lives in its own hook.
 *
 * `sectionRef` (the destination's own root element) is used only to
 * find its Close button (every destination's shares the
 * `.explore-close` class) so focus can move into the panel on open
 * and back to the Explore trigger — not into a page reload — on
 * close.
 *
 * Scroll lock: Lenis is stopped, AND the scroll position is actively
 * held in place on every 'scroll' event. Wheel-input preventDefault
 * alone was tried first, but it can't stop a dragged native
 * scrollbar (that fires 'scroll' directly, no 'wheel' involved) —
 * holding position on 'scroll' itself catches every input source.
 *
 * Touch is handled separately: reacting to 'scroll' after the fact is
 * enough for a mouse/scrollbar, but on touch it lets momentum scroll
 * start and then visibly snaps back, which reads as a jitter/rubber-
 * band bug. `touchmove` is prevented outright instead, with an escape
 * hatch for any panel content that opts in via `data-explore-scroll`
 * (used where a destination's detail content can exceed the viewport
 * height on small screens and needs its own internal scroll).
 *
 * The teardown is torn down synchronously inside `close()` (via
 * `teardownRef`), not left to wait for the effect's own cleanup on
 * the next render — a caller that closes and immediately requests a
 * scroll in the same handler (e.g. a "View the journey" link) would
 * otherwise have that scroll caught and snapped straight back by the
 * still-attached `holdScrollPosition` listener. React's own cleanup
 * still runs afterwards too; everything here is idempotent, so
 * running it twice is harmless.
 */
export function useExploreState(sectionRef) {
  const [isOpen, setIsOpen] = useState(false)
  const previouslyFocused = useRef(null)
  const teardownRef = useRef(null)

  const open = useCallback(() => {
    // A destination's Explore trigger can become clickable before its
    // section has scrolled fully flush with the viewport top (it sits
    // partway down the section, not at its very bottom edge). Locking
    // scroll below without correcting for that first would freeze the
    // previous section's tail in view for the whole time Explore is
    // open, since the lock prevents the user from ever scrolling the
    // rest of the way in themselves.
    const section = sectionRef?.current
    if (section) {
      const rectTop = section.getBoundingClientRect().top
      if (Math.abs(rectTop) > 0.5) {
        lenisRef.current?.stop()
        window.scrollTo(0, window.scrollY + rectTop)
      }
    }

    previouslyFocused.current = document.activeElement
    setIsOpen(true)
  }, [sectionRef])

  const close = useCallback(() => {
    teardownRef.current?.()
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const lockedY = window.scrollY
    lenisRef.current?.stop()

    // Explore always hides the nav outright, regardless of scroll
    // position/direction — it has no role over an editorial state.
    const nav = document.querySelector('.nav')
    nav?.classList.add('nav--hidden')
    nav?.classList.remove('nav--solid')
    if (nav) nav.inert = true

    const closeButton = sectionRef?.current?.querySelector('.explore-close')
    closeButton?.focus()

    const holdScrollPosition = () => {
      if (window.scrollY !== lockedY) window.scrollTo(0, lockedY)
    }

    const preventKeyScroll = (event) => {
      if (SCROLL_KEYS.has(event.key)) event.preventDefault()
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') close()
      preventKeyScroll(event)
    }

    const preventBackgroundTouch = (event) => {
      if (event.target?.closest?.('[data-explore-scroll]')) return
      event.preventDefault()
    }

    window.addEventListener('scroll', holdScrollPosition, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchmove', preventBackgroundTouch, { passive: false })

    // Guarded so running it a second time (React's own effect cleanup
    // fires on the next render, after `close()` already ran it
    // synchronously) is a true no-op — re-calling lenis.start()/
    // ScrollTrigger.refresh() a second time was observed to clobber a
    // scroll that a caller had already kicked off in between (e.g. a
    // "View the journey" link that closes and scrolls in one click).
    let hasTornDown = false
    const teardown = () => {
      if (hasTornDown) return
      hasTornDown = true

      window.removeEventListener('scroll', holdScrollPosition)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchmove', preventBackgroundTouch)

      lenisRef.current?.start()
      // A destination's own scroll-scrubbed ScrollTrigger (e.g.
      // Patagonia/Jordan's image parallax) can end up with a stale
      // cached scroll position after Lenis was stopped/restarted —
      // resync it so scrubbing resumes cleanly rather than lagging or
      // fighting the next real scroll input.
      ScrollTrigger.refresh()

      // Hand back whatever the nav's scroll-derived state actually is
      // (top/solid/hidden) rather than unconditionally revealing it —
      // closing Explore mid-scroll-down should not summon the nav.
      applyNavVisibility(nav)

      previouslyFocused.current?.focus?.()
    }

    teardownRef.current = teardown

    return () => {
      teardown()
      teardownRef.current = null
    }
  }, [isOpen, close, sectionRef])

  return { isOpen, open, close }
}
