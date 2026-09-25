import { useRef } from 'react'
import { useExploreState } from '../../hooks/useExploreState'
import { useSriLankaExplore } from '../../hooks/useSriLankaExplore'
import { scrollToTarget } from '../../lib/scrollTo'
import './SriLankaHero.css'

export function SriLankaHero() {
  const sectionRef = useRef(null)
  const { isOpen, open, close } = useExploreState(sectionRef)
  useSriLankaExplore(sectionRef, isOpen)

  return (
    <section
      className="srilanka-hero"
      aria-label="Sri Lanka"
      ref={sectionRef}
      data-exploring={isOpen}
    >
      <div className="srilanka-hero__media">
        <img
          className="srilanka-hero__image"
          src="/images/srilanka/nine-arch-train.jpg"
          alt="A blue train curving over a jungle-covered stone viaduct in the Sri Lankan hill country, dense green forest pressing in on every side"
        />
        <div className="srilanka-hero__scrim" />
      </div>

      <div className="srilanka-hero__exit-fade" aria-hidden="true" />

      <div className="srilanka-hero__meta">
        <span>Hill Country, Sri Lanka</span>
        <span>Best Dec&ndash;Mar</span>
      </div>

      <h1 className="srilanka-hero__title">
        <span className="srilanka-hero__title-line srilanka-hero__title-line--one">SRI</span>
        <span className="srilanka-hero__title-line srilanka-hero__title-line--two">LANKA</span>
      </h1>

      <button
        className="srilanka-hero__explore"
        type="button"
        onClick={open}
        aria-expanded={isOpen}
      >
        <span className="srilanka-hero__explore-line" aria-hidden="true" />
        Explore
      </button>

      <div className="srilanka-detail" aria-hidden={!isOpen} inert={!isOpen}>
        <div className="srilanka-detail__inner" data-explore-scroll>
          <button
            className="explore-close srilanka-detail__close"
            type="button"
            onClick={close}
          >
            <span className="explore-close__line" aria-hidden="true" />
            Close
          </button>

          <span className="srilanka-detail__kicker">The Green Line</span>

          <p className="srilanka-detail__quote">
            Get off wherever the window looks too good to stay on the
            train.
          </p>

          <div className="srilanka-detail__meta">
            <span>Southern Asia</span>
            <span>11 days</span>
            <span>Train / Coast / Tea Country</span>
          </div>

          <div className="srilanka-detail__images">
            <figure className="srilanka-detail__image srilanka-detail__image--one">
              <img
                src="/images/srilanka/market.jpg"
                alt="A roadside market in the Sri Lankan hill country, stalls of fruit and toys beside the road"
              />
              <figcaption>Roadside market, hill country</figcaption>
            </figure>
            <figure className="srilanka-detail__image srilanka-detail__image--two">
              <img
                src="/images/srilanka/sigiriya-road.jpg"
                alt="A path leading toward the Sigiriya rock fortress under a blue sky"
              />
              <figcaption>Sigiriya, at the end of a detour</figcaption>
            </figure>
          </div>

          <span className="srilanka-detail__rule" aria-hidden="true" />

          <a
            className="srilanka-detail__link"
            href="#journeys"
            onClick={(event) => {
              event.preventDefault()
              close()
              scrollToTarget('#journeys')
            }}
          >
            View the Green Line journey
          </a>
        </div>
      </div>
    </section>
  )
}
