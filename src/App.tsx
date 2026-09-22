import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import GearRentals from './components/GearRentals'
import Testimonials from './components/Testimonials'
import ContactCTA from './components/ContactCTA'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'
import './App.css'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <GearRentals />
        <div className="section-divider" />
        <Testimonials />
        <div className="section-divider" />
        <ContactCTA />
      </main>
      <Footer />
    </>
  )
}

export default App
