import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CoreValueProp from './components/CoreValueProp'
import ValuePillars from './components/ValuePillars'
import CaseStudy from './components/CaseStudy'
import IndustryVerticals from './components/IndustryVerticals'
import PilotRequestForm from './components/PilotRequestForm'
import Footer from './components/Footer'
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="min-h-screen bg-white text-industrial-ink font-primary antialiased">
      {/* Navigation Header */}
      <Navbar />

      <main>
        {/* Section 1: Hero Static View & Entrance */}
        <HeroSection />

        {/* Section 2: Core Value Prop - Interactive Split Layout */}
        <CoreValueProp />

        {/* Section 3: Value Pillars - Interactive Vertical Tab Slider */}
        <ValuePillars />

        {/* Section 4: Customer Case Study - Carousel Card Showcase */}
        <CaseStudy />

        {/* Section 5: Industry Verticals - Grid Navigation */}
        <IndustryVerticals />

        {/* Pilot Sandbox Onboarding & Request Form */}
        <PilotRequestForm />
      </main>

      {/* Footer & Credits */}
      <Footer />

      {/* sonner Toaster for feedbacks */}
      <Toaster position="top-center" richColors />
    </div>
  )
}

export default App
