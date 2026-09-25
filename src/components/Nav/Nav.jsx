import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { scrollToTarget, scrollToTop } from '../../lib/scrollTo'
import { lenisRef } from '../../lib/lenisInstance'
import './Nav.css'

const LINKS = [
  { label: 'Destinations', action: 'top' },
  { label: 'Journeys', action: '#journeys' },
  { label: 'Stories', action: '#stories' },
  { label: 'About', action: '#about' },
]

function go(action) {
  if (action === 'top') scrollToTop()
  else scrollToTarget(action)
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const toggleRef = useRef(null)
  const firstLinkRef = useRef(null)

  const close = () => setOpen(false)

  const handleNavigate = (action) => {
    close()
    go(action)
  }

  // Close the panel automatically if a resize crosses back into the
  // desktop layout, where the panel has no trigger to reopen it from.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)')
    const onChange = (event) => {
      if (event.matches) setOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return undefined

    lenisRef.current?.stop()
    const { style } = document.body
    const previousOverflow = style.overflow
    style.overflow = 'hidden'

    const preventTouch = (event) => {
      if (!panelRef.current?.contains(event.target)) event.preventDefault()
    }
    document.addEventListener('touchmove', preventTouch, { passive: false })

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        close()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll('a, button')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    firstLinkRef.current?.focus()
    const toggleButton = toggleRef.current

    return () => {
      document.removeEventListener('touchmove', preventTouch)
      document.removeEventListener('keydown', onKeyDown)
      style.overflow = previousOverflow
      lenisRef.current?.start()
      toggleButton?.focus()
    }
  }, [open])

  return (
    <>
      <header className="nav">
        <a
          className="nav__mark"
          href="#top"
          onClick={(event) => {
            event.preventDefault()
            close()
            scrollToTop()
          }}
        >
          NOMA
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map(({ label, action }) => (
            <a
              key={label}
              className="nav__link"
              href={action === 'top' ? '#top' : action}
              onClick={(event) => {
                event.preventDefault()
                go(action)
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          className="nav__plan"
          href="#plan-a-trip"
          onClick={(event) => {
            event.preventDefault()
            scrollToTarget('#plan-a-trip')
          }}
        >
          Plan a trip
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-mobile-panel"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav__toggle-line" />
          <span className="nav__toggle-line" />
        </button>
      </header>

      {createPortal(
        <div
          id="nav-mobile-panel"
          ref={panelRef}
          className="nav__panel"
          data-open={open}
          aria-hidden={!open}
          inert={!open}
        >
          <nav className="nav__panel-links" aria-label="Mobile">
            {LINKS.map(({ label, action }, index) => (
              <a
                key={label}
                ref={index === 0 ? firstLinkRef : undefined}
                className="nav__panel-link"
                href={action === 'top' ? '#top' : action}
                style={{ transitionDelay: open ? `${0.08 + index * 0.05}s` : '0s' }}
                onClick={(event) => {
                  event.preventDefault()
                  handleNavigate(action)
                }}
              >
                <span className="nav__panel-link-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {label}
              </a>
            ))}
          </nav>

          <a
            className="nav__panel-plan"
            href="#plan-a-trip"
            style={{ transitionDelay: open ? `${0.08 + LINKS.length * 0.05}s` : '0s' }}
            onClick={(event) => {
              event.preventDefault()
              handleNavigate('#plan-a-trip')
            }}
          >
            Plan a trip
          </a>

          <button type="button" className="explore-close nav__panel-close" onClick={close}>
            <span className="explore-close__line" />
            Close
          </button>
        </div>,
        document.body,
      )}
    </>
  )
}
