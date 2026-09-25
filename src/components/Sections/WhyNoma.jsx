import { useRef } from 'react'
import { useWhyNoma } from '../../hooks/useWhyNoma'
import './WhyNoma.css'

const PRINCIPLES = [
  {
    index: '01',
    title: 'We know the places behind the places',
    copy: 'Trips are built around local knowledge, not generic lists.',
  },
  {
    index: '02',
    title: 'Built around you',
    copy: 'NOMA journeys are starting points, not fixed packages.',
  },
  {
    index: '03',
    title: 'Take the detour',
    copy: 'The moments worth remembering rarely happen on the shortest route.',
  },
]

export function WhyNoma() {
  const sectionRef = useRef(null)
  useWhyNoma(sectionRef)

  return (
    <section className="why-noma" ref={sectionRef} id="about">
      <span className="why-noma__kicker">Why NOMA</span>

      <div className="why-noma__body">
        <ol className="why-noma__list">
          {PRINCIPLES.map((item) => (
            <li className="why-noma__item" key={item.index}>
              <span className="why-noma__index">{item.index}</span>
              <div>
                <h3 className="why-noma__title">{item.title}</h3>
                <p className="why-noma__copy">{item.copy}</p>
              </div>
            </li>
          ))}
        </ol>

        <figure className="why-noma__detail">
          <img
            src="/images/srilanka/nine-arch-train.jpg"
            alt="Dense jungle canopy pressing in around a stone viaduct in the Sri Lankan hill country"
          />
        </figure>
      </div>
    </section>
  )
}
