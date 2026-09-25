import { useRef } from 'react'
import { useJordanFeature } from '../../hooks/useJordanFeature'
import { useExploreState } from '../../hooks/useExploreState'
import { useJordanExplore } from '../../hooks/useJordanExplore'
import { scrollToTarget } from '../../lib/scrollTo'
import './JordanFeature.css'

export function JordanFeature() {
  const sectionRef = useRef(null)
  useJordanFeature(sectionRef)
  const { isOpen, open, close } = useExploreState(sectionRef)
  useJordanExplore(sectionRef, isOpen)

  return (
    <section
      className="jordan"
      ref={sectionRef}
      aria-label="Jordan"
      data-exploring={isOpen}
    >
      <div className="jordan__media">
        <img
          className="jordan__image"
          src="/images/jordan/wadi-rum.jpg"
          alt="Small figures walking across open sand beneath towering red cliffs in Wadi Rum, Jordan"
        />
        <div className="jordan__scrim" />
      </div>

      <figure className="jordan__detail">
        <img
          src="/images/jordan/petra-treasury.jpg"
          alt="Sunlit sandstone columns carved into the rock face at Petra, Jordan"
        />
      </figure>

      <div className="jordan__content">
        <h2 className="jordan__title">JORDAN</h2>
        <p className="jordan__copy">Some places make the world feel older.</p>
        <button className="jordan__link" type="button" onClick={open} aria-expanded={isOpen}>
          <span className="jordan__link-line" aria-hidden="true" />
          Explore Jordan
        </button>
      </div>

      <div
        className="jordan-detail"
        aria-hidden={!isOpen}
        inert={!isOpen}
        data-explore-scroll
      >
        <button className="explore-close jordan-detail__close" type="button" onClick={close}>
          <span className="explore-close__line" aria-hidden="true" />
          Close
        </button>

        <span className="jordan-detail__kicker">The Siq</span>

        <p className="jordan-detail__quote">
          Walk far enough into the rock and the modern world disappears.
        </p>

        <div className="jordan-detail__meta">
          <span>Wadi Rum &amp; Petra</span>
          <span>8 days</span>
          <span>Desert / Ruins / Silence</span>
        </div>

        <a
          className="jordan-detail__link"
          href="#journeys"
          onClick={(event) => {
            event.preventDefault()
            close()
            scrollToTarget('#journeys')
          }}
        >
          View the Jordan journey
        </a>
      </div>
    </section>
  )
}
