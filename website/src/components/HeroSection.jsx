import React from 'react'
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const socialLogos = [
    "Factories Act 1948",
    "OISD Standards",
    "PESO Regulations",
    "Process Plants",
    "EHS Safety Councils"
  ]

  return (
    <section className="relative bg-white pt-36 pb-24 overflow-hidden text-left border-b border-industrial-border">
      {/* Quiet, minimalist line art connection graphic background */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[300px] pointer-events-none opacity-20 hidden md:block select-none">
        <svg viewBox="0 0 500 300" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Flowing lines representing nodes */}
          <path d="M 50 150 C 150 50, 250 250, 350 150" stroke="#CA8A04" strokeWidth="1" />
          <path d="M 50 150 C 150 250, 250 50, 350 150" stroke="#1E293B" strokeWidth="0.8" strokeDasharray="3,3" />
          <path d="M 350 150 H 450" stroke="#1E293B" strokeWidth="0.8" />
          {/* Subtle node points */}
          <circle cx="50" cy="150" r="3" fill="#0F172A" />
          <circle cx="170" cy="100" r="3" fill="#CA8A04" />
          <circle cx="220" cy="200" r="2.5" fill="#1E293B" />
          <circle cx="350" cy="150" r="3" fill="#0F172A" />
          <circle cx="450" cy="150" r="4" fill="#CA8A04" />
          {/* Labels */}
          <text x="35" y="135" fill="#64748B" fontSize="9" fontFamily="monospace">SOP INGESTION</text>
          <text x="365" y="135" fill="#64748B" fontSize="9" fontFamily="monospace">VERIFICATION</text>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Heading */}
          <h1 className="font-primary font-bold text-4xl sm:text-5xl lg:text-6xl text-industrial-ink tracking-tight leading-[1.08] mb-6">
            Catch compliance gaps <br className="hidden sm:inline" />
            before your next audit does.
          </h1>

          {/* Subheading */}
          <p className="font-primary text-base sm:text-lg text-industrial-muted leading-relaxed mb-8 max-w-2xl">
            A unified AI asset & operations brain mapping plant procedures against Indian regulations—delivering traceable, cited answers for technicians on the floor and safety officers at their desks.
          </p>

          {/* Action CTA */}
          <div className="mb-16">
            <Button
              className="bg-industrial-ink hover:bg-industrial-slate text-white font-mono text-xs uppercase tracking-wider px-6 py-5 rounded border border-industrial-border shadow-sm transition-all"
              onClick={() => document.getElementById('compliance')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See our Platform
            </Button>
          </div>
        </div>

        {/* Social Proof Panel */}
        <div className="border-t border-industrial-border pt-8 mt-4">
          <p className="font-mono text-[9px] font-bold text-industrial-muted uppercase tracking-widest mb-6">
            ALIGNED WITH STATUTORY STANDARDS
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-xs font-mono font-bold text-industrial-slate">
            {socialLogos.map((logo, idx) => (
              <div 
                key={idx} 
                className="flex items-center space-x-2 border border-industrial-border bg-industrial-subtle px-3 py-1.5 rounded select-none hover:bg-industrial-accent-light hover:border-industrial-accent-mid transition-colors duration-150"
              >
                <span>{logo}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
