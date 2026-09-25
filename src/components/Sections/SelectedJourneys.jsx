import { useRef } from 'react'
import { useSelectedJourneys } from '../../hooks/useSelectedJourneys'
import './SelectedJourneys.css'

export function SelectedJourneys() {
  const sectionRef = useRef(null)
  useSelectedJourneys(sectionRef)

  return (
    <section className="journeys" ref={sectionRef} id="journeys">
      <div className="journeys__head">
        <span className="journeys__kicker">Selected Journeys</span>
        <h2 className="journeys__heading">Three ways to start.</h2>
      </div>

      <article className="journeys__primary">
        <div className="journeys__primary-media">
          <img
            src="/images/journeys/namibia-dunes.jpg"
            alt="An aerial view of shadow-carved sand dunes in the Namib desert at low sun"
          />
          <h3 className="journeys__primary-title">
            Into the
            <br />
            Empty
          </h3>
        </div>
        <div className="journeys__primary-caption">
          <span className="journeys__index">01 — Namibia, 10 days</span>
          <p>
            Desert roads, wildlife and nights beneath a sky with nothing
            around it.
          </p>
        </div>
      </article>

      <article className="journeys__secondary">
        <div className="journeys__secondary-text">
          <span className="journeys__index">02 — Japan, 9 days</span>
          <p className="journeys__secondary-deck">
            Tokyo after sunset, mountain towns and everything that happens
            between trains.
          </p>
          <h3 className="journeys__secondary-title">After Dark</h3>
        </div>
        <div className="journeys__secondary-media">
          <img
            src="/images/journeys/japan-train-window.jpg"
            alt="A woman and child looking out through an open train door at the tracks ahead in Japan"
          />
        </div>
      </article>

      <article className="journeys__tertiary">
        <div className="journeys__tertiary-media">
          <img
            src="/images/journeys/srilanka-tea.jpg"
            alt="A tea picker at work among green tea bushes in the Sri Lankan hill country"
          />
        </div>
        <span className="journeys__index">03 — Sri Lanka, 11 days</span>
        <h3 className="journeys__tertiary-title">The Green Line</h3>
        <p className="journeys__tertiary-desc">
          Tea country, coastal roads and one of the world&rsquo;s best train
          windows.
        </p>
      </article>
    </section>
  )
}
