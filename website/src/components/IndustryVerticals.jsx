import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, Smartphone, Settings, Server, ArrowUpRight } from "lucide-react"

export default function IndustryVerticals() {
  const roles = [
    {
      icon: <ShieldAlert className="h-6 w-6 text-industrial-accent" />,
      title: "Safety Officers",
      description: "Audit SOPs against statutory standards, identify regulatory gaps, and maintain compliance reports.",
      action: "LEARN MORE"
    },
    {
      icon: <Smartphone className="h-6 w-6 text-industrial-accent" />,
      title: "Field Technicians",
      description: "Get instant, cited answers from plant manuals and SOPs directly on the floor using on-device local RAG and query caching.",
      action: "LEARN MORE"
    },
    {
      icon: <Settings className="h-6 w-6 text-industrial-accent" />,
      title: "Plant Managers",
      description: "Unify institutional knowledge, prevent EHS safety hazards, and ensure seamless audit preparations.",
      action: "LEARN MORE"
    },
    {
      icon: <Server className="h-6 w-6 text-industrial-accent" />,
      title: "IT & EHS Security",
      description: "Protect data sovereignty by running 100% private, on-device local models with zero external server dependencies.",
      action: "LEARN MORE"
    }
  ]

  return (
    <section id="why-faktriiq" className="py-24 bg-white border-b border-industrial-border relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-16 space-y-4">
          <p className="font-mono text-[9px] font-bold text-industrial-accent uppercase tracking-widest">
            ROLES & DEPLOYMENTS
          </p>
          <h2 className="font-primary font-bold text-3xl text-industrial-ink tracking-tight">
            Who we help
          </h2>
        </div>

        {/* 4-Column Grid Footprint */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map((role, idx) => (
            <Card 
              key={idx}
              className="border border-industrial-border bg-white shadow-sm hover:shadow-md transition-all duration-150 flex flex-col justify-between p-6 text-left"
            >
              <CardHeader className="p-0 space-y-4">
                {/* SVG Icon */}
                <div className="p-3 bg-industrial-subtle rounded border border-industrial-border w-max">
                  {role.icon}
                </div>
                
                {/* Title */}
                <CardTitle className="font-primary font-bold text-base text-industrial-ink">
                  {role.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0 mt-3 flex-1 flex flex-col justify-between space-y-6">
                {/* Description */}
                <p className="font-sans text-xs text-industrial-muted leading-relaxed">
                  {role.description}
                </p>

                {/* Inline Action Link */}
                <div className="pt-2 border-t border-industrial-border/60">
                  <a 
                    href="#pilot-request"
                    className="font-mono text-[9px] font-bold text-industrial-slate uppercase tracking-wider flex items-center hover:text-industrial-accent transition-colors duration-150"
                  >
                    <span>{role.action}</span>
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Base Anchor Indicator Text */}
        <div className="text-center mt-20 pt-8 border-t border-industrial-border/60 font-mono text-[9px] font-bold text-industrial-muted uppercase tracking-widest">
          OUTCOME-DRIVEN SOLUTIONS: How we help
        </div>

      </div>
    </section>
  )
}
