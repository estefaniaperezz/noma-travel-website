import { useRef } from 'react'
import { usePatagoniaFeature } from '../../hooks/usePatagoniaFeature'
import { useExploreState } from '../../hooks/useExploreState'
import { usePatagoniaExplore } from '../../hooks/usePatagoniaExplore'
import { scrollToTarget } from '../../lib/scrollTo'
import './PatagoniaFeature.css'

export function PatagoniaFeature() {
  const sectionRef = useRef(null)
  usePatagoniaFeature(sectionRef)
  const { isOpen, open, close } = useExploreState(sectionRef)
  usePatagoniaExplore(sectionRef, isOpen)

  return (
    <section
      className="patagonia"
      ref={sectionRef}
      aria-label="Patagonia"
      data-exploring={isOpen}
    >
      <div className="patagonia__media">
        <img
          className="patagonia__image"
          src="/images/patagonia/mountain-lake-alone.jpg"
          alt="A lone figure beside a teal glacial lake beneath dark, fog-wrapped granite peaks in Patagonia"
        />
        <div className="patagonia__scrim" />
      </div>

      <h2 className="patagonia__title">PATAGONIA</h2>

      <p className="patagonia__copy">
        Go south until the map starts running out.
      </p>

      <button className="patagonia__link" type="button" onClick={open} aria-expanded={isOpen}>
        <span className="patagonia__link-line" aria-hidden="true" />
        Explore Patagonia
      </button>

      <figure className="patagonia__secondary">
        <img
          src="/images/patagonia/torres-del-paine-lake.jpg"
          alt="A turquoise lake beneath snow-capped mountains in Torres del Paine, Patagonia"
        />
      </figure>

      <div
        className="patagonia-detail"
        aria-hidden={!isOpen}
        inert={!isOpen}
        data-explore-scroll
      >
        <button className="explore-close patagonia-detail__close" type="button" onClick={close}>
          <span className="explore-close__line" aria-hidden="true" />
          Close
        </button>

        <span className="patagonia-detail__kicker">South of Everything</span>

        <p className="patagonia-detail__quote">The wind never really stops.</p>

        <div className="patagonia-detail__meta">
          <span>Southern Patagonia</span>
          <span>10 days</span>
          <span>Glacier / Trek / Silence</span>
        </div>

        <a
          className="patagonia-detail__link"
          href="#journeys"
          onClick={(event) => {
            event.preventDefault()
            close()
            scrollToTarget('#journeys')
          }}
        >
          View the Patagonia journey
        </a>
      </div>
    </section>
  )
}
