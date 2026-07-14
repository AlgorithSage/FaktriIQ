import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileWarning, CheckCircle, Search, ArrowRight, ShieldAlert, Cpu } from "lucide-react"

export default function InteractiveDemo() {
  const [activeScenario, setActiveScenario] = useState("confined-space")

  const scenarios = {
    "confined-space": {
      title: "Confined Space Entry",
      sopFile: "SOP-ME-042 (Vessel Cleaning)",
      sopText: "Clause 3.1: Prior to entry into tank T-104, technicians must turn off the main pump valve and wear basic gas masks. Entry is permitted once the supervisor signs the physical sign-sheet.",
      regulation: "Factories Act 1948 - Section 36",
      regText: "No person shall enter any confined space until all practicable measures have been taken to remove any gas, fumes, or dust, and unless a competent person has certified in writing that the space is free from dangerous fumes and fit for entry.",
      status: "GAP",
      explanation: "Critical non-compliance found: The SOP relies on basic masks and a physical signature. It fails to require active gas test checks (oxygen/toxic sensors) or mechanical isolation of chemical feeds prior to entry, as explicitly mandated by Section 36.",
      remediation: "Add mandatory atmospheric gas sensor logging and lock-out/tag-out (LOTO) verification procedures before permitting entrance."
    },
    "pressure-testing": {
      title: "Hydrostatic Testing",
      sopFile: "SOP-OPS-109 (Pressure Vessel QA)",
      sopText: "Clause 5.4: Run the pressure pump up to 150 PSI. Hold for 10 minutes and check for leakage visual signs. Depressurize via standard release valve.",
      regulation: "OISD-STD-105 Sec 4.2",
      regText: "All pressure vessels must undergo hydrostatic testing under certified supervisor guidance. Testing gauges must be dual-calibrated, safety relief valves must be tested prior, and a blast shield boundary must be established at 1.5x test pressure.",
      status: "GAP",
      explanation: "Compliance Gaps identified: No dual-calibration gauge checks, no pre-test safety relief valve verification, and no safety blast boundary zone specified in the SOP.",
      remediation: "Integrate dual-gauge pressure validation logs and specify a blast perimeter of 5 meters around testing zones."
    },
    "chemical-storage": {
      title: "Ethanol Ingestion",
      sopFile: "SOP-CHEM-302 (Tank Loading)",
      sopText: "Clause 2.1: Transfer chemical hose to storage container C-4. Grounding cable must be clamped to the tanker body. Check volume metrics using the radar transmitter.",
      regulation: "PESO Rules 2016 - Rule 42",
      regText: "Every tanker loading station handling Class A petroleum or alcohol must possess static grounding interlocking. If grounding loop resistance exceeds 10 ohms, the feed pump must automatically trip.",
      status: "COMPLIANT",
      explanation: "No gaps detected: The SOP procedure explicitly mandates static grounding clamp attachment and references the static ground lock auto-trip system.",
      remediation: "No action required. Current SOP is aligned with PESO standard statutory safety requirements."
    }
  }

  const current = scenarios[activeScenario]

  return (
    <section id="sandbox" className="py-20 bg-white border-b border-industrial-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <Badge className="bg-industrial-accent-light text-industrial-accent hover:bg-industrial-accent-light border border-industrial-accent-mid font-mono text-xs py-1 px-3 uppercase tracking-wider">
            ⚙️ Interactive Triaging Sandbox
          </Badge>
          <h2 className="font-primary font-extrabold text-3xl sm:text-4xl text-industrial-ink">
            See the Compliance Agent in Action
          </h2>
          <p className="text-industrial-muted text-base">
            Select a scenario below to watch how FaktriIQ instantly compares plant SOP documentation against Indian statutory safety regulations and automatically pinpoints gaps.
          </p>
        </div>

        {/* Interactive Workspace */}
        <Card className="border border-industrial-border shadow-md overflow-hidden bg-industrial-subtle">
          <CardHeader className="bg-industrial-slate text-white border-b border-industrial-border/60 py-4 px-6 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="text-left">
              <CardTitle className="font-primary font-bold text-lg flex items-center space-x-2">
                <Cpu className="h-5 w-5 text-industrial-accent" />
                <span>AI Ingestion & Compliance Parser</span>
              </CardTitle>
              <CardDescription className="text-industrial-muted text-xs font-mono">
                Model: FaktriIQ-Agent-Core v2.3.0
              </CardDescription>
            </div>
            
            {/* Scenario Tabs */}
            <Tabs 
              value={activeScenario} 
              onValueChange={setActiveScenario} 
              className="w-full md:w-auto"
            >
              <TabsList className="bg-black/40 border border-zinc-700/50 p-1 flex space-x-1">
                <TabsTrigger 
                  value="confined-space" 
                  className="data-[state=active]:bg-industrial-accent data-[state=active]:text-industrial-ink text-xs text-white"
                >
                  Confined Space
                </TabsTrigger>
                <TabsTrigger 
                  value="pressure-testing" 
                  className="data-[state=active]:bg-industrial-accent data-[state=active]:text-industrial-ink text-xs text-white"
                >
                  Hydrostatic Test
                </TabsTrigger>
                <TabsTrigger 
                  value="chemical-storage" 
                  className="data-[state=active]:bg-industrial-accent data-[state=active]:text-industrial-ink text-xs text-white"
                >
                  PESO Loading
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Box 1: Plant SOP Ingested (Column 4) */}
              <div className="lg:col-span-4 flex flex-col space-y-3 text-left">
                <div className="text-xs font-mono font-bold text-industrial-muted uppercase tracking-wider flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-industrial-accent mr-2 animate-ping" />
                  1. Ingested Plant SOP
                </div>
                <Card className="flex-1 border border-industrial-border bg-white p-4 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="font-mono font-bold text-xs text-industrial-accent bg-industrial-accent-light/35 px-2 py-1 rounded w-max mb-3 border border-industrial-accent-mid/30">
                      📄 {current.sopFile}
                    </div>
                    <ScrollArea className="h-40">
                      <p className="font-primary text-sm text-industrial-ink leading-relaxed">
                        {current.sopText}
                      </p>
                    </ScrollArea>
                  </div>
                  <div className="border-t border-industrial-border/60 pt-3 mt-4 text-[10px] text-industrial-muted font-mono">
                    Encoding: UTF-8 • Embeddings: Vector-v2
                  </div>
                </Card>
              </div>

              {/* Arrow Indicator for Desktop */}
              <div className="hidden lg:flex lg:col-span-1 items-center justify-center text-industrial-muted">
                <ArrowRight className="h-8 w-8 animate-pulse text-industrial-accent-mid" />
              </div>

              {/* Box 2: Statutory Standard Mapped (Column 4) */}
              <div className="lg:col-span-4 flex flex-col space-y-3 text-left">
                <div className="text-xs font-mono font-bold text-industrial-muted uppercase tracking-wider flex items-center">
                  <Search className="h-4 w-4 mr-2 text-industrial-accent" />
                  2. Mapped Indian Standard
                </div>
                <Card className="flex-1 border border-industrial-border bg-white p-4 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="font-mono font-bold text-xs text-industrial-slate bg-slate-100 px-2 py-1 rounded w-max mb-3 border border-slate-200">
                      ⚖️ {current.regulation}
                    </div>
                    <ScrollArea className="h-40">
                      <p className="font-primary text-sm text-industrial-slate leading-relaxed italic">
                        "{current.regText}"
                      </p>
                    </ScrollArea>
                  </div>
                  <div className="border-t border-industrial-border/60 pt-3 mt-4 text-[10px] text-industrial-muted font-mono">
                    Jurisdiction: Govt of India • Compliance Map: v3.1
                  </div>
                </Card>
              </div>

              {/* Box 3: AI Verdict (Column 3) */}
              <div className="lg:col-span-3 flex flex-col space-y-3 text-left">
                <div className="text-xs font-mono font-bold text-industrial-muted uppercase tracking-wider">
                  3. Real-Time Assessment
                </div>
                <Card className="flex-1 border border-industrial-border bg-white p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
                  
                  {/* Status Banner */}
                  <div className="absolute top-0 right-0 left-0 h-1"></div>

                  <div className="space-y-4">
                    {current.status === "GAP" ? (
                      <div className="flex items-center space-x-2 text-industrial-flag font-mono font-bold text-sm bg-red-50 border border-red-200 p-2 rounded">
                        <ShieldAlert className="h-5 w-5 text-industrial-flag" />
                        <span>COMPLIANCE GAP FOUND</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-industrial-verify font-mono font-bold text-sm bg-green-50 border border-green-200 p-2 rounded">
                        <CheckCircle className="h-5 w-5 text-industrial-verify" />
                        <span>COMPLIANT STATUS</span>
                      </div>
                    )}

                    <ScrollArea className="h-32 text-xs font-primary leading-relaxed text-industrial-ink bg-slate-50 p-2 border border-slate-100 rounded">
                      <p className="font-semibold text-[11px] uppercase text-industrial-muted mb-1">Analysis Details:</p>
                      {current.explanation}
                    </ScrollArea>
                  </div>

                  {/* Remediation Panel */}
                  <div className="bg-industrial-accent-light/30 border border-industrial-accent-mid/30 p-3 rounded-md text-[11px] space-y-1">
                    <span className="font-bold text-industrial-warn uppercase text-[9px] block">AI Remediation Rule:</span>
                    <span className="text-industrial-ink leading-normal">{current.remediation}</span>
                  </div>
                </Card>
              </div>

            </div>
          </CardContent>
        </Card>

      </div>
    </section>
  )
}
