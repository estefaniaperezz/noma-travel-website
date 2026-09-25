import { useRef } from 'react'
import { useNomaStatement } from '../../hooks/useNomaStatement'
import './NomaStatement.css'

export function NomaStatement() {
  const sectionRef = useRef(null)
  useNomaStatement(sectionRef)

  return (
    <section className="noma-statement" ref={sectionRef}>
      <span className="noma-statement__kicker">Studio note</span>

      <p className="noma-statement__lead">
        We make trips for people who&rsquo;d rather come home
        <br />
        with stories than souvenirs.
      </p>

      <p className="noma-statement__support">
        NOMA designs journeys around places worth slowing down for, people
        worth meeting and roads worth taking the long way around.
      </p>
    </section>
  )
}
