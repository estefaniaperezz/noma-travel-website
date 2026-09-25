import { useState } from 'react'
import './TravelByFeeling.css'

const CATEGORIES = [
  {
    key: 'signal',
    index: '01',
    label: 'Lose signal',
    caption: 'Patagonia — where the fog closes the road behind you.',
    image: '/images/patagonia/mountain-lake-alone.jpg',
    alt: 'A lone figure beside a teal glacial lake beneath dark, fog-wrapped peaks in Patagonia',
  },
  {
    key: 'road',
    index: '02',
    label: 'Take the long road',
    caption: 'Namibia — dust, distance and a road that keeps going.',
    image: '/images/namibia/desert-road.jpg',
    alt: 'A dirt road curving through the Namibian desert toward distant mountains',
  },
  {
    key: 'eat',
    index: '03',
    label: 'Eat everything',
    caption: 'Sri Lanka — a roadside stall is still a kitchen.',
    image: '/images/srilanka/market.jpg',
    alt: 'A roadside market stall in the Sri Lankan hill country',
  },
  {
    key: 'late',
    index: '04',
    label: 'Stay out late',
    caption: "Japan — the city after the last train.",
    image: '/images/japan/alley-rain.jpg',
    alt: 'A rain-slicked Tokyo street at night reflecting warm amber light',
  },
  {
    key: 'wild',
    index: '05',
    label: 'Wake up somewhere wild',
    caption: 'Jordan — canvas walls and a sky full of static.',
    image: '/images/jordan/wadi-rum.jpg',
    alt: 'Small figures walking across the sand beneath towering cliffs in Wadi Rum, Jordan',
  },
  {
    key: 'slow',
    index: '06',
    label: 'Slow it down',
    caption: 'Patagonia — nothing to do but watch the water.',
    image: '/images/patagonia/torres-del-paine-lake.jpg',
    alt: 'A turquoise lake beneath snow-capped mountains in Torres del Paine, Patagonia',
  },
]

export function TravelByFeeling() {
  const [active, setActive] = useState(0)

  return (
    <section className="feeling">
      <span className="feeling__kicker">Travel by feeling</span>

      <div className="feeling__body">
        <ul className="feeling__list">
          {CATEGORIES.map((cat, i) => (
            <li key={cat.key}>
              <button
                type="button"
                className={`feeling__item${active === i ? ' is-active' : ''}`}
                aria-pressed={active === i}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="feeling__item-index">{cat.index}</span>
                <span className="feeling__item-label">{cat.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="feeling__frame">
          {CATEGORIES.map((cat, i) => (
            <img
              key={cat.key}
              src={cat.image}
              alt={cat.alt}
              className={`feeling__frame-img${active === i ? ' is-visible' : ''}`}
            />
          ))}
          <div className="feeling__frame-scrim" />
          <p className="feeling__caption">{CATEGORIES[active].caption}</p>
        </div>
      </div>
    </section>
  )
}
