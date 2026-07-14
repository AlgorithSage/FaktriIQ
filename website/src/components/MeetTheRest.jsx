import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitBranch, Wrench, GraduationCap } from "lucide-react"

export default function MeetTheRest() {
  const futureAgents = [
    {
      icon: <GitBranch className="h-6 w-6 text-industrial-muted" />,
      title: "Knowledge Graph Agent",
      description: "Maps interdependencies across plant pipelines, valves, electrical terminals, and safety subsystems to simulate operational ripple-effects."
    },
    {
      icon: <Wrench className="h-6 w-6 text-industrial-muted" />,
      title: "Maintenance & RCA Agent",
      description: "Ingests historic repair logs, maintenance tickets, and equipment vendor sheets to automatically suggest root-cause analysis (RCA) steps."
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-industrial-muted" />,
      title: "Lessons-Learned Agent",
      description: "Audits historic near-miss sheets and incident logs to feed critical cautionary guidelines back into shift-operator checklists."
    }
  ]

  return (
    <section className="py-20 bg-white border-b border-industrial-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="outline" className="font-mono text-xs text-industrial-muted border-industrial-border py-1 px-3 uppercase tracking-wider">
            🔮 Product Roadmap
          </Badge>
          <h2 className="font-primary font-extrabold text-3xl sm:text-4xl text-industrial-ink">
            The FaktriIQ Intelligent Suite
          </h2>
          <p className="text-industrial-muted text-base leading-relaxed">
            Expanding our industrial intelligence system with specialized agents to handle physical dependencies, failure troubleshooting, and historic safety patterns.
          </p>
        </div>

        {/* 3-Column Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {futureAgents.map((agent, idx) => (
            <Card 
              key={idx} 
              className="border border-dashed border-industrial-border bg-slate-50/50 flex flex-col justify-between items-start text-left p-6 relative group"
            >
              <CardHeader className="p-0 space-y-4 flex-1">
                <div className="flex justify-between items-center w-full">
                  <div className="p-2.5 bg-white rounded-lg border border-industrial-border/60">
                    {agent.icon}
                  </div>
                  <Badge variant="outline" className="text-[9px] font-mono text-industrial-muted border-industrial-border py-0 px-1 bg-white">
                    Coming Soon
                  </Badge>
                </div>
                <CardTitle className="font-primary font-bold text-lg text-industrial-slate">
                  {agent.title}
                </CardTitle>
                <CardContent className="p-0 text-xs text-industrial-muted leading-relaxed font-sans">
                  {agent.description}
                </CardContent>
              </CardHeader>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
