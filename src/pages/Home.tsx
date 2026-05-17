import { useState } from 'react'
import { Hero } from '../sections/Hero'
import { K3Method } from '../sections/K3Method'
import { Coach } from '../sections/Coach'
import { Transformations } from '../sections/Transformations'
import { Qualifier } from '../sections/Qualifier'
import { ForWhom } from '../sections/ForWhom'
import { Services } from '../sections/Services'
import { Reviews } from '../sections/Reviews'
import { InstagramFeed } from '../sections/InstagramFeed'
import { FAQ } from '../sections/FAQ'
import { LossAversion } from '../sections/LossAversion'
import { FinalCTA } from '../sections/FinalCTA'
import { CalDialog } from '../components/shared/CalDialog'

// <EgymPartnership /> — auskommentiert, aktivieren wenn EGYM-Studio bereit ist

function Home() {
  const [calOpen, setCalOpen] = useState(false)

  return (
    <>
      <Hero onCalOpen={() => setCalOpen(true)} />
      <K3Method />
      <Coach onCalOpen={() => setCalOpen(true)} />
      <Transformations />
      <Qualifier />
      <ForWhom />
      <Services onCalOpen={() => setCalOpen(true)} />
      <Reviews />
      <InstagramFeed />
      <FAQ />
      <LossAversion />
      <FinalCTA onCalOpen={() => setCalOpen(true)} />

      <CalDialog open={calOpen} onClose={() => setCalOpen(false)} source="page" />
    </>
  )
}

export { Home }
