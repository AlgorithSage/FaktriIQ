import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MessageSquareCode } from "lucide-react"
import controlRoomImg from '../assets/control_room.png'

export default function CaseStudy() {
  const [activeSlide, setActiveSlide] = useState(0)

  const slides = [
    {
      partner: "PLANT PILOT A (Refining Facility)",
      heading: "Safety Officers reduce SOP compliance audit time from hours to minutes",
      description: "FaktriIQ powers plant-wide document intelligence, parsing multi-page technical manuals, standard operating procedures, and Indian safety standards, automating risk management, officer reviews, and technician lookups.",
      metrics: [
        { value: "95%", label: "reduced gap identification time" },
        { value: "0%", label: "hallucination rate using strict grounding" },
        { value: "< 3 seconds", label: "Average question retrieval response time" }
      ]
    },
    {
      partner: "PLANT PILOT B (Petrochemical Hub)",
      heading: "EHS Safety Councils automate mechanical lock-out audits with zero errors",
      description: "By integrating OISD guidelines into shift checklists, the plant safety audit team verified pressure relief loops and static grounding setups instantly, ensuring pre-shift safety readiness.",
      metrics: [
        { value: "100%", label: "checklists reviewed automatically" },
        { value: "0", label: "manual filing record discrepancies" },
        { value: "10 mins", label: "total EHS pre-audit compliance prep" }
      ]
    }
  ]

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const current = slides[activeSlide]

  return (
    <section id="technology" className="py-24 bg-industrial-subtle border-b border-industrial-border relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0 text-left">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-[9px] font-bold text-industrial-accent uppercase tracking-widest">
              CASE STUDY PROOF
            </p>
            <h2 className="font-primary font-bold text-3xl text-industrial-ink tracking-tight">
              Safety outcomes validated on site
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={prevSlide}
              className="p-2 border border-industrial-border bg-white text-industrial-ink rounded hover:bg-industrial-subtle transition-colors"
              aria-label="Previous Case Study"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 border border-industrial-border bg-white text-industrial-ink rounded hover:bg-industrial-subtle transition-colors"
              aria-label="Next Case Study"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Carousel Showcase Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Side: Text and Metrics (Col 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between text-left space-y-8 bg-white border border-industrial-border p-8 rounded-lg shadow-sm transition-all duration-300">
            <div className="space-y-4">
              <Badge className="bg-industrial-accent-light text-industrial-accent hover:bg-industrial-accent-light border border-industrial-accent-mid/30 font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                ⚡ {current.partner}
              </Badge>
              
              <h3 className="font-primary font-extrabold text-2xl text-industrial-ink leading-snug tracking-tight">
                {current.heading}
              </h3>
              
              <p className="font-sans text-sm text-industrial-muted leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-industrial-border/60">
              {current.metrics.map((metric, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="font-primary font-bold text-2xl sm:text-3xl text-industrial-ink tracking-tight">
                    {metric.value}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-industrial-muted leading-tight">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="border-industrial-border text-industrial-ink hover:bg-industrial-subtle font-mono text-[10px] uppercase tracking-wider px-4 py-3 rounded"
              >
                Hear from our customers
              </Button>
            </div>
          </div>

          {/* Right Side: Realistic Control Room Image (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="border border-industrial-border rounded-lg bg-white overflow-hidden shadow-sm h-full min-h-[320px] relative group flex items-center justify-center">
              <img 
                src={controlRoomImg} 
                alt="Realistic minimal industrial plant control room scene" 
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-ink/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 font-mono text-[8px] tracking-widest text-white/80 uppercase">
                Plant Area-2 Operations Room
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
