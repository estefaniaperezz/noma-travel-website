import { useRef } from 'react'
import { useExploreState } from '../../hooks/useExploreState'
import { useJapanExplore } from '../../hooks/useJapanExplore'
import { scrollToTarget } from '../../lib/scrollTo'
import './JapanHero.css'

export function JapanHero() {
  const sectionRef = useRef(null)
  const { isOpen, open, close } = useExploreState(sectionRef)
  useJapanExplore(sectionRef, isOpen)

  return (
    <section
      className="japan-hero"
      aria-label="Japan"
      ref={sectionRef}
      data-exploring={isOpen}
    >
      <div className="japan-hero__frame">
        <img
          className="japan-hero__image"
          src="/images/japan/alley-rain.jpg"
          alt="A rain-slicked Tokyo street at night, reflecting warm amber light from shuttered shopfronts as a lone figure walks beneath an umbrella"
        />
        <div className="japan-hero__scrim" />
      </div>

      <div className="japan-hero__meta">
        <span>Tokyo, Honshu</span>
        <span>Best Mar&ndash;May, Oct&ndash;Dec</span>
      </div>

      <h1 className="japan-hero__title">
        <span>JA</span>
        <span>PAN</span>
      </h1>

      <button
        className="japan-hero__explore"
        type="button"
        onClick={open}
        aria-expanded={isOpen}
      >
        <span className="japan-hero__explore-line" aria-hidden="true" />
        Explore
      </button>

      <div className="japan-detail" aria-hidden={!isOpen} inert={!isOpen} data-explore-scroll>
        <button className="explore-close japan-detail__close" type="button" onClick={close}>
          <span className="explore-close__line" aria-hidden="true" />
          Close
        </button>

        <span className="japan-detail__kicker">After Dark</span>

        <p className="japan-detail__quote">
          Tokyo after sunset, mountain towns and everything that happens
          between trains.
        </p>

        <figure className="japan-detail__image">
          <img
            src="/images/japan/lantern-alley.jpg"
            alt="A narrow Tokyo alley at night strung with glowing red lanterns and hand-painted shop signs"
          />
        </figure>

        <div className="japan-detail__meta">
          <span>Tokyo, Honshu</span>
          <span>9 days</span>
          <span>Night / Trains / Neighbourhoods</span>
        </div>

        <a
          className="japan-detail__link"
          href="#journeys"
          onClick={(event) => {
            event.preventDefault()
            close()
            scrollToTarget('#journeys')
          }}
        >
          View the Japan journey
        </a>
      </div>
    </section>
  )
}
