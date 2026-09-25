import { useRef } from 'react'
import { useFinalCta } from '../../hooks/useFinalCta'
import './FinalCta.css'

export function FinalCta() {
  const sectionRef = useRef(null)
  useFinalCta(sectionRef)

  return (
    <section className="final-cta" ref={sectionRef} id="plan-a-trip">
      <h2 className="final-cta__headline">Where are you thinking about?</h2>

      <p className="final-cta__support">
        You don&rsquo;t need an itinerary yet. A place, a feeling or a
        half-formed idea is enough.
      </p>

      <a
        className="final-cta__link"
        href="mailto:hello@noma.studio?subject=Where%20I%27m%20thinking%20about"
      >
        <span className="final-cta__link-line" aria-hidden="true" />
        Plan a trip
      </a>
    </section>
  )
}
