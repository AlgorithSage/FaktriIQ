import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react"

export default function CoreValueProp() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      title: "Factories Act Clause Mapping",
      description: "Instantly link guidelines inside your custom operating manuals directly to Sections 36, 41, or 87 of the Factories Act 1948.",
      sopSnippet: "SOP Sec 4.1: Entry into tank cleaning requires physical supervisor check.",
      regSnippet: "Factories Act Sec 36: Requires gas test certification by a competent inspector in writing before entry is permitted.",
      status: "GAP",
      alert: "Gap identified: Missing mandatory toxic gas sensor check prior to physical entry."
    },
    {
      title: "SOP Compliance Gap Auditing",
      description: "Automate EHS compliance triaging by highlighting missing safety clauses across internal processes.",
      sopSnippet: "SOP Sec 9.2: Ground tank loading using grounding cable clamps.",
      regSnippet: "PESO Rule 42: Static grounding connection loops must automatically trip feed pumps if resistance exceeds 10 ohms.",
      status: "COMPLIANT",
      alert: "Compliant: SOP mandates grounding interlock feedback circuit integration."
    },
    {
      title: "Traceable Source Citations",
      description: "Every generated answer is trace-mapped to the exact source document name, chapter, and line range.",
      sopSnippet: "Query: What is the pressure limit for Vessel PV-102 hydrostatic tests?",
      regSnippet: "OISD-STD-105 Sec 3.2: PV-102 test pressure is certified at 1.5x design limit (150 PSI).",
      status: "CITED",
      alert: "Verified Source: OISD-STD-105 Chapter III Page 14 Clause 3.2.1"
    }
  ]

  return (
    <section id="compliance" className="py-24 bg-industrial-subtle border-b border-industrial-border relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-16 space-y-4">
          <p className="font-mono text-[9px] font-bold text-industrial-accent uppercase tracking-widest">
            FAKTRIIQ OPERATIONS BRAIN
          </p>
          <h2 className="font-primary font-bold text-3xl sm:text-4xl text-industrial-ink tracking-tight">
            Instant answers. Verified compliance.
          </h2>
          <p className="font-primary text-sm sm:text-base text-industrial-muted leading-relaxed">
            Unify your plant manuals, safety SOPs, and Indian statutory rules into a single contextual engine to automate gap detection, answer questions, and stay audit-ready.
          </p>
        </div>

        {/* Interactive Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Panel - Features List Selector (Column span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 text-left">
            <Badge className="bg-industrial-ink text-white hover:bg-industrial-ink font-mono text-[10px] w-max uppercase tracking-wider px-2 py-0.5 rounded">
              AUDIT INTERACTIVE SHOWCASE
            </Badge>
            <h3 className="font-primary font-bold text-xl text-industrial-ink">
              Map your procedures and automate gap detection
            </h3>
            
            <div className="space-y-3 pt-4">
              {features.map((feature, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFeature(idx)}
                  className={`w-full text-left p-4 rounded border transition-all duration-150 flex items-start space-x-3 ${
                    activeFeature === idx
                      ? "bg-white border-industrial-accent shadow-sm"
                      : "bg-transparent border-transparent hover:bg-white/50"
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 transition-colors ${
                    activeFeature === idx ? "bg-industrial-accent" : "bg-industrial-border"
                  }`} />
                  <div>
                    <h4 className="font-primary font-bold text-sm text-industrial-ink">
                      {feature.title}
                    </h4>
                    {activeFeature === idx && (
                      <p className="font-sans text-xs text-industrial-muted mt-1.5 leading-relaxed">
                        {feature.description}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Infographic Visual Diagram (Column span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Card className="border border-industrial-border bg-white shadow-sm flex flex-col overflow-hidden h-[340px] text-left">
              {/* Header bar */}
              <div className="bg-industrial-subtle px-4 py-2 border-b border-industrial-border flex items-center justify-between text-[10px] font-mono text-industrial-muted">
                <span>COMPLIANCE FLOW SCHEMATIC</span>
                <span className="text-industrial-accent font-bold">ACTIVE AGENT ENGINE</span>
              </div>
              
              {/* Diagram Content */}
              <CardContent className="p-6 flex-1 grid grid-cols-7 gap-4 items-center">
                
                {/* SOP Box (Col 3) */}
                <div className="col-span-3 space-y-2">
                  <div className="font-mono text-[9px] font-bold text-industrial-muted uppercase">
                    Plant Operating SOP
                  </div>
                  <div className="border border-industrial-border p-3 rounded bg-industrial-subtle min-h-[140px] flex flex-col justify-between">
                    <p className="font-mono text-[10.5px] leading-relaxed text-industrial-ink font-sans">
                      {features[activeFeature].sopSnippet}
                    </p>
                    <span className="text-[9px] font-mono text-industrial-muted">Source: SOP-QA-Section</span>
                  </div>
                </div>

                {/* Agent Intersect Connector (Col 1) */}
                <div className="col-span-1 flex flex-col items-center justify-center space-y-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-industrial-accent" />
                  <ArrowRight className="h-4 w-4 text-industrial-accent animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-industrial-slate" />
                </div>

                {/* Regulation Standard Box (Col 3) */}
                <div className="col-span-3 space-y-2">
                  <div className="font-mono text-[9px] font-bold text-industrial-muted uppercase">
                    Indian Statutory Clause
                  </div>
                  <div className="border border-industrial-border p-3 rounded bg-white min-h-[140px] flex flex-col justify-between">
                    <p className="font-mono text-[10.5px] leading-relaxed text-industrial-slate font-sans italic">
                      {features[activeFeature].regSnippet}
                    </p>
                    <span className="text-[9px] font-mono text-industrial-muted">Database: Pre-Mapped</span>
                  </div>
                </div>

              </CardContent>

              {/* Bottom alert status pane */}
              <div className="bg-industrial-subtle px-6 py-4 border-t border-industrial-border flex items-center space-x-3 text-xs font-sans">
                {features[activeFeature].status === "GAP" ? (
                  <>
                    <ShieldAlert className="h-4 w-4 text-industrial-flag" />
                    <span className="text-industrial-flag font-bold font-mono">NON-COMPLIANT:</span>
                    <span className="text-industrial-ink">{features[activeFeature].alert}</span>
                  </>
                ) : features[activeFeature].status === "COMPLIANT" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-industrial-verify" />
                    <span className="text-industrial-verify font-bold font-mono">COMPLIANT:</span>
                    <span className="text-industrial-ink">{features[activeFeature].alert}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-industrial-accent" />
                    <span className="text-industrial-accent font-bold font-mono">CITED STATE:</span>
                    <span className="text-industrial-ink">{features[activeFeature].alert}</span>
                  </>
                )}
              </div>

            </Card>
          </div>

        </div>

      </div>
    </section>
  )
}
