import { useRef } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useHeroIntro } from './hooks/useHeroIntro'
import { useDestinationJourney } from './hooks/useDestinationJourney'
import { useNavAutoHide } from './hooks/useNavAutoHide'
import { Nav } from './components/Nav/Nav'
import { DestinationJourney } from './components/Transition/DestinationJourney'
import { NomaStatement } from './components/Sections/NomaStatement'
import { SelectedJourneys } from './components/Sections/SelectedJourneys'
import { TravelByFeeling } from './components/Sections/TravelByFeeling'
import { PatagoniaFeature } from './components/Sections/PatagoniaFeature'
import { WhyNoma } from './components/Sections/WhyNoma'
import { Journal } from './components/Sections/Journal'
import { JordanFeature } from './components/Sections/JordanFeature'
import { FinalCta } from './components/Sections/FinalCta'
import { Footer } from './components/Footer/Footer'

function App() {
  useSmoothScroll()
  const stageRef = useRef(null)
  useHeroIntro(stageRef)
  useDestinationJourney(stageRef)
  useNavAutoHide()

  return (
    <main ref={stageRef}>
      <Nav />
      <DestinationJourney />
      <NomaStatement />
      <SelectedJourneys />
      <TravelByFeeling />
      <PatagoniaFeature />
      <WhyNoma />
      <Journal />
      <JordanFeature />
      <FinalCta />
      <Footer />
    </main>
  )
}

export default App
