import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, BookOpen, Quote, HelpCircle, HardHat } from "lucide-react"

export default function AgentsSection() {
  return (
    <section className="py-20 bg-white border-b border-industrial-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="font-primary font-extrabold text-3xl sm:text-4xl text-industrial-ink">
            Meet the FaktriIQ Operational Agents
          </h2>
          <p className="text-industrial-muted text-base leading-relaxed">
            FaktriIQ deploys coordinate AI agents running locally or on-premise, targeting two distinct plant environments: regulatory compliance desks and the shift operator floor.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Card 1: Compliance Agent */}
          <Card className="border border-industrial-border bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            {/* Top gold bar to highlight the primary differentiator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-industrial-accent" />
            
            <CardHeader className="p-8 pb-4 text-left">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-industrial-accent-light text-industrial-accent rounded-lg border border-industrial-accent-mid/30">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <Badge className="bg-industrial-accent text-industrial-ink font-semibold font-mono text-[10px] tracking-wide uppercase px-2 py-0.5 rounded">
                  ★ Primary Agent
                </Badge>
              </div>
              <CardTitle className="font-primary font-extrabold text-2xl text-industrial-ink">
                Compliance Agent
              </CardTitle>
              <CardDescription className="font-sans text-sm text-industrial-muted mt-2">
                Designed for Safety Officers and Audit Managers to continuously monitor operating compliance.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8 pt-0 flex-1 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-4">
                <p className="font-sans text-sm text-industrial-muted leading-relaxed">
                  The Compliance Agent automatically parses standard operating procedures (SOPs) and compares operational tasks against governing Indian national frameworks to highlight actionable compliance gaps.
                </p>
                <div className="space-y-2 border-t border-industrial-border/60 pt-4">
                  <span className="text-xs font-mono font-bold text-industrial-ink block">Pre-Mapped Statutory Frameworks:</span>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-industrial-slate text-industrial-slate font-mono text-[10px]">
                      Factories Act 1948 (Sec 36)
                    </Badge>
                    <Badge variant="outline" className="border-industrial-slate text-industrial-slate font-mono text-[10px]">
                      OISD-STD-105 (Hydrostatic)
                    </Badge>
                    <Badge variant="outline" className="border-industrial-slate text-industrial-slate font-mono text-[10px]">
                      PESO Rules 2016 (Static grounding)
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Mock interface snippet */}
              <div className="bg-industrial-subtle border border-industrial-border p-4 rounded-md font-mono text-xs space-y-2">
                <div className="text-[10px] uppercase font-bold text-industrial-flag flex items-center">
                  ⚠ Gap Flag: SOP-E-102
                </div>
                <p className="text-[11px] text-industrial-ink font-sans leading-relaxed">
                  Rule mapping: <strong>PESO Rule 42.</strong> SOP lacks compulsory 10-ohm earth resistivity interlock verification prior to pump ignition.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Knowledge Copilot */}
          <Card className="border border-industrial-border bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-industrial-slate" />

            <CardHeader className="p-8 pb-4 text-left">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-100 text-industrial-slate rounded-lg border border-slate-200">
                  <BookOpen className="h-8 w-8" />
                </div>
                <Badge variant="secondary" className="font-mono text-[10px] tracking-wide uppercase px-2 py-0.5 rounded">
                  👷 Field Assistant
                </Badge>
              </div>
              <CardTitle className="font-primary font-extrabold text-2xl text-industrial-ink">
                Knowledge Copilot
              </CardTitle>
              <CardDescription className="font-sans text-sm text-industrial-muted mt-2">
                Designed for field technicians and mechanics at the physical asset floor.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8 pt-0 flex-1 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-4">
                <p className="font-sans text-sm text-industrial-muted leading-relaxed">
                  A conversational AI interface responding in natural language, enabling field technicians to immediately retrieve operating specifications, piping diagrams, and mechanical steps directly from the plant's documentation manuals.
                </p>
                <div className="space-y-2 border-t border-industrial-border/60 pt-4">
                  <span className="text-xs font-mono font-bold text-industrial-ink block">Safety & Trust Mechanisms:</span>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-industrial-slate text-industrial-slate font-mono text-[10px]">
                      Verifiable Cited References
                    </Badge>
                    <Badge variant="outline" className="border-industrial-slate text-industrial-slate font-mono text-[10px]">
                      Confidence Indexes
                    </Badge>
                    <Badge variant="outline" className="border-industrial-slate text-industrial-slate font-mono text-[10px]">
                      No-Hallucination Fallback
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Citation badge snippet */}
              <div className="bg-industrial-ink text-white p-4 rounded-md flex flex-col space-y-2">
                <div className="text-[11px] text-slate-300 font-sans italic">
                  "Nitrogen line must be pressurized to exactly 1.2 Bar before loading block connection."
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-industrial-accent-light text-industrial-ink font-mono text-[9px] hover:bg-industrial-accent-light border-0">
                    SOP-TC-042 | Confined Space Sec 3.1
                  </Badge>
                  <span className="text-[9px] font-mono text-industrial-verify">High Confidence</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </section>
  )
}
