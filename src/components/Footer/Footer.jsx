import { scrollToTarget, scrollToTop } from '../../lib/scrollTo'
import './Footer.css'

const NAV_LINKS = [
  { label: 'Destinations', action: 'top' },
  { label: 'Journeys', action: '#journeys' },
  { label: 'Stories', action: '#stories' },
  { label: 'About', action: '#about' },
  { label: 'Plan a trip', action: '#plan-a-trip' },
]

function go(action) {
  if (action === 'top') scrollToTop()
  else scrollToTarget(action)
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <a
          className="footer__mark"
          href="#top"
          onClick={(event) => {
            event.preventDefault()
            scrollToTop()
          }}
        >
          NOMA
        </a>
        <p className="footer__line">Go somewhere worth remembering.</p>
      </div>

      <div className="footer__columns">
        <nav className="footer__col" aria-label="Footer navigation">
          <span className="footer__col-label">Explore</span>
          {NAV_LINKS.map(({ label, action }) => (
            <a
              key={label}
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

        <div className="footer__col">
          <span className="footer__col-label">Follow</span>
          {/* NOMA has no live social presence yet — these are named as
              a placeholder of intent rather than styled as working
              links to nowhere. */}
          <span className="footer__static">Instagram</span>
          <span className="footer__static">Pinterest</span>
          <a href="mailto:hello@noma.studio">Email</a>
        </div>
      </div>

      <div className="footer__base">
        <span>&copy; {new Date().getFullYear()} NOMA Studio</span>
        <div className="footer__legal">
          {/* No Privacy/Terms pages exist yet in this scope — left as
              plain text rather than dead links. */}
          <span className="footer__static">Privacy</span>
          <span className="footer__static">Terms</span>
        </div>
      </div>
    </footer>
  )
}
