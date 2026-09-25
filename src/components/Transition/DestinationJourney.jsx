import { NamibiaHero } from '../Hero/NamibiaHero'
import { JapanHero } from '../Hero/JapanHero'
import { SriLankaHero } from '../Hero/SriLankaHero'
import './DestinationJourney.css'

/**
 * The full Namibia → Japan → Sri Lanka opening sequence, pinned once
 * and driven by a single combined timeline (see useDestinationJourney).
 *
 * Each hero is a single canonical DOM instance: Japan is not a
 * temporary "incoming" copy that gets swapped for a separate
 * "settled" copy later — it is the same element throughout, which is
 * also the element Explore transforms. There is exactly one of each
 * destination in the Home.
 */
export function DestinationJourney() {
  return (
    <section className="journey-stage">
      <div className="journey-stage__namibia">
        <NamibiaHero />
      </div>
      <div className="journey-stage__japan-mask">
        <JapanHero />
      </div>
      <div className="journey-stage__srilanka-mask">
        <SriLankaHero />
      </div>
    </section>
  )
}
