import { useEffect } from 'react'
import { applyNavVisibility, navScrollState } from '../lib/navVisibility'

/**
 * Keeps NOMA's navigation reachable across a very long Home without
 * turning it into a heavy sticky bar or leaving any residue behind:
 * it is fully hidden the instant the user scrolls down (no grace
 * zone, no lingering strip), reappears the instant they scroll up,
 * and returns to its original transparent-over-Namibia look at the
 * absolute top.
 */
export function useNavAutoHide() {
  useEffect(() => {
    const nav = document.querySelector('.nav')
    if (!nav) return undefined

    navScrollState.lastY = window.scrollY
    navScrollState.direction = 'none'
    applyNavVisibility(nav)

    let ticking = false

    const update = () => {
      ticking = false
      const currentY = window.scrollY

      if (currentY > navScrollState.lastY) navScrollState.direction = 'down'
      else if (currentY < navScrollState.lastY) navScrollState.direction = 'up'

      navScrollState.lastY = currentY
      applyNavVisibility(nav)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
