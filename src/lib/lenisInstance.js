// Shared handle to the single Lenis instance created by useSmoothScroll,
// so features outside that hook (e.g. Explore overlays) can stop/start it
// without needing their own instance or React context plumbing.
export const lenisRef = { current: null }
