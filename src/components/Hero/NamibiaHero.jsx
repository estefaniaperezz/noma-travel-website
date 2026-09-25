import { useRef } from 'react'
import { useExploreState } from '../../hooks/useExploreState'
import { useNamibiaExplore } from '../../hooks/useNamibiaExplore'
import { scrollToTarget } from '../../lib/scrollTo'
import './NamibiaHero.css'

export function NamibiaHero() {
  const sectionRef = useRef(null)
  const { isOpen, open, close } = useExploreState(sectionRef)
  useNamibiaExplore(sectionRef, isOpen)

  return (
    <section
      className="hero"
      aria-label="Namibia"
      ref={sectionRef}
      data-exploring={isOpen}
    >
      <div className="hero__media">
        <img
          className="hero__image"
          src="/images/namibia/desert-road.jpg"
          alt="A dirt road curving through the Namibian desert toward distant mountains under an open sky"
        />
        <div className="hero__scrim" />
      </div>

      <h1 className="hero__title">NAMIBIA</h1>

      <div className="hero__meta">
        <span>Southern Africa</span>
        <span>Best May&ndash;Oct</span>
      </div>

      <button
        className="hero__explore"
        type="button"
        onClick={open}
        aria-expanded={isOpen}
      >
        <span className="hero__explore-line" aria-hidden="true" />
        Explore
      </button>

      <div className="hero-detail" aria-hidden={!isOpen} inert={!isOpen}>
        <div className="hero-detail__panel" data-explore-scroll>
          <button className="explore-close hero-detail__close" type="button" onClick={close}>
            <span className="explore-close__line" aria-hidden="true" />
            Close
          </button>

          <span className="hero-detail__kicker">Into the Empty</span>

          <p className="hero-detail__quote">
            Take the road until there is nothing left around you but dust,
            sky and distance.
          </p>

          <div className="hero-detail__meta">
            <span>Southern Africa</span>
            <span>10 days</span>
            <span>Road / Wildlife / Desert</span>
          </div>

          <a
            className="hero-detail__link"
            href="#journeys"
            onClick={(event) => {
              event.preventDefault()
              close()
              scrollToTarget('#journeys')
            }}
          >
            View the Namibia journey
          </a>
        </div>

        <figure className="hero-detail__image">
          <img
            src="/images/namibia/dune-figure.jpg"
            alt="A lone figure walking along the ridge of a towering red dune in Deadvlei, Namibia, dwarfed by the scale of the desert"
          />
        </figure>
      </div>
    </section>
  )
}
