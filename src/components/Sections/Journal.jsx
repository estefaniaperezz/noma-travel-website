import { useRef } from 'react'
import { useJournal } from '../../hooks/useJournal'
import './Journal.css'

const STORIES = [
  {
    index: '01',
    title: 'Tokyo after midnight',
    deck: 'Where the city changes after the last train.',
    category: 'After dark',
    image: '/images/japan/alley-rain.jpg',
    alt: 'A rain-slicked Tokyo street at night reflecting warm amber light',
    size: 'large',
  },
  {
    index: '02',
    title: 'The road south',
    deck: "Driving through Namibia when there's no one else around.",
    category: 'Road trip',
    image: '/images/namibia/desert-road.jpg',
    alt: 'A dirt road curving through the Namibian desert toward distant mountains',
    size: 'regular',
  },
  {
    index: '03',
    title: 'Seven things worth getting off the train for',
    deck: 'Sri Lanka beyond the famous railway photograph.',
    category: 'Sri Lanka',
    image: '/images/srilanka/sigiriya-road.jpg',
    alt: 'A path leading toward the Sigiriya rock fortress under a blue sky',
    size: 'regular',
  },
]

export function Journal() {
  const sectionRef = useRef(null)
  useJournal(sectionRef)

  return (
    <section className="journal" ref={sectionRef} id="stories">
      <div className="journal__head">
        <span className="journal__kicker">Journal</span>
        <h2 className="journal__heading">Stories worth the detour.</h2>
      </div>

      <ul className="journal__list">
        {STORIES.map((story) => (
          <li className={`journal__row journal__row--${story.size}`} key={story.index}>
            <span className="journal__row-index">{story.index}</span>
            <div className="journal__row-media">
              <img src={story.image} alt={story.alt} />
            </div>
            <div className="journal__row-info">
              <span className="journal__row-category">{story.category}</span>
              <h3 className="journal__row-title">{story.title}</h3>
              <p className="journal__row-deck">{story.deck}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
