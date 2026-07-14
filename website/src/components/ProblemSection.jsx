import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, AlertOctagon, Users } from "lucide-react"

export default function ProblemSection() {
  const problems = [
    {
      icon: <Layers className="h-8 w-8 text-industrial-accent" />,
      title: "Document Fragmentation",
      description: "Plant operators and technicians waste an average of 2.5 hours per shift manually searching for safety parameters across 7–12 disconnected document storage facilities (paper files, scattered PDFs, and localized file systems)."
    },
    {
      icon: <AlertOctagon className="h-8 w-8 text-industrial-flag" />,
      title: "Reactive Compliance Risk",
      description: "Plants traditionally evaluate safety standards reactively during inspections or audits. Finding critical regulatory gaps in operations after failures or warning notices leads to costly shutdowns and legal penalties."
    },
    {
      icon: <Users className="h-8 w-8 text-industrial-warn" />,
      title: "Plant Knowledge Attrition",
      description: "Up to 40% of standard operating knowledge resides only in the minds of veteran field operators. When they retire, their undocumented, contextual lessons-learned and repair strategies vanish from the organization."
    }
  ]

  return (
    <section id="features" className="py-20 bg-industrial-subtle border-b border-industrial-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="font-primary font-extrabold text-3xl sm:text-4xl text-industrial-ink">
            The Industrial Operational Blind Spot
          </h2>
          <p className="text-industrial-muted text-base leading-relaxed">
            Legacy manufacturing facilities face compliance leaks and operational inefficiencies because plant information remains offline, unmapped, and fragmented.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((prob, idx) => (
            <Card 
              key={idx} 
              className="border border-industrial-border bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start text-left p-6"
            >
              <CardHeader className="p-0 space-y-4 flex-1">
                <div className="p-3 bg-industrial-subtle rounded-lg w-max border border-industrial-border/60">
                  {prob.icon}
                </div>
                <CardTitle className="font-primary font-bold text-xl text-industrial-ink">
                  {prob.title}
                </CardTitle>
                <CardContent className="p-0 text-sm text-industrial-muted leading-relaxed font-sans">
                  {prob.description}
                </CardContent>
              </CardHeader>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
