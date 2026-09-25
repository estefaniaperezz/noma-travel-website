// Shared scroll-direction bookkeeping + the single source of truth for
// what the nav should look like right now. Both useNavAutoHide (the
// scroll listener) and useExploreState (which must freeze the nav
// hidden while open, then hand back a *correct* state on close — not
// just unconditionally show it again) read/write through here so the
// two never disagree about what "should" be showing.
export const navScrollState = {
  lastY: typeof window !== 'undefined' ? window.scrollY : 0,
  direction: 'none', // 'up' | 'down' | 'none'
}

const TOP_EPSILON = 4

/**
 * - at/near the absolute top: transparent, directly over Namibia
 * - scrolling up anywhere else: solid, so it reads over any section
 * - scrolling down (or no deliberate upward intent yet): fully hidden
 */
export function computeNavVisibility(scrollY) {
  if (scrollY <= TOP_EPSILON) return 'top'
  if (navScrollState.direction === 'up') return 'solid'
  return 'hidden'
}

export function applyNavVisibility(nav) {
  if (!nav) return
  const state = computeNavVisibility(window.scrollY)
  const hidden = state === 'hidden'
  nav.classList.toggle('nav--hidden', hidden)
  nav.classList.toggle('nav--solid', state === 'solid')
  nav.inert = hidden
}
