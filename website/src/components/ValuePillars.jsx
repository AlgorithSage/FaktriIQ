import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ValuePillars() {
  const [activePillar, setActivePillar] = useState(0)

  const pillars = [
    {
      title: "Audit-Ready Dashboards",
      description: "Verify compliance automatically and prepare EHS logs without manual parsing. Safety managers review real-time plant statistics on a single dashboard to prepare for regulatory inspection checks.",
      nodes: [
        { x: 250, y: 150, r: 6, color: "#CA8A04", label: "Dashboard Hub" },
        { x: 130, y: 80, r: 3.5, color: "#1E293B", label: "EHS Log" },
        { x: 130, y: 220, r: 3.5, color: "#1E293B", label: "Compliance Chart" },
        { x: 370, y: 80, r: 3.5, color: "#1E293B", label: "Verification" },
        { x: 370, y: 220, r: 3.5, color: "#1E293B", label: "Historical Records" }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 0, to: 2 },
        { from: 0, to: 3 },
        { from: 0, to: 4 }
      ]
    },
    {
      title: "Field-Tested Reliability",
      description: "Technicians access safety instructions locally on-device without needing internet connection. Enables high-speed local BM25 RAG lookup and query caching in remote refinery basements or chemical units.",
      nodes: [
        { x: 250, y: 150, r: 6, color: "#0F172A", label: "Local Cache & LLM" },
        { x: 100, y: 150, r: 3.5, color: "#CA8A04", label: "Off-Grid Agent" },
        { x: 400, y: 150, r: 3.5, color: "#CA8A04", label: "Offline BM25 Db" },
        { x: 250, y: 60, r: 3, color: "#1E293B", label: "Intranet Gateway" },
        { x: 250, y: 240, r: 3, color: "#1E293B", label: "Remote Sync" }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 0, to: 2 },
        { from: 0, to: 3 },
        { from: 0, to: 4 }
      ]
    },
    {
      title: "Traceable Source Citations",
      description: "Every answer shows the exact document page and clause number, eliminating AI hallucination. Operators verify claims instantly against pre-ingested plant guidelines.",
      nodes: [
        { x: 250, y: 150, r: 6, color: "#CA8A04", label: "Citation Indexer" },
        { x: 150, y: 100, r: 3.5, color: "#1E293B", label: "SOP Document" },
        { x: 150, y: 200, r: 3.5, color: "#1E293B", label: "Page/Line Map" },
        { x: 350, y: 150, r: 4.5, color: "#16A34A", label: "Source Match" }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 0, to: 2 },
        { from: 0, to: 3 }
      ]
    },
    {
      title: "Continuous Gap Audits",
      description: "Automatically flag safety discrepancies the moment an SOP or regulation text is updated. Keeps your entire operations pipeline continuously synchronized.",
      nodes: [
        { x: 250, y: 150, r: 6, color: "#DC2626", label: "Audit Loop" },
        { x: 120, y: 150, r: 3.5, color: "#1E293B", label: "Rule Updates" },
        { x: 380, y: 100, r: 3.5, color: "#1E293B", label: "Change Alerts" },
        { x: 380, y: 200, r: 3.5, color: "#1E293B", label: "Safety Flags" }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 0, to: 2 },
        { from: 0, to: 3 }
      ]
    }
  ]

  const current = pillars[activePillar]

  return (
    <section id="architecture" className="py-24 bg-white border-b border-industrial-border relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-16 space-y-4">
          <p className="font-mono text-[9px] font-bold text-industrial-accent uppercase tracking-widest">
            THE POWER OF FAKTRIIQ
          </p>
          <h2 className="font-primary font-bold text-3xl sm:text-4xl text-industrial-ink tracking-tight">
            Audit-ready and floor-focused from day one
          </h2>
          <p className="font-primary text-sm sm:text-base text-industrial-muted leading-relaxed">
            Industrial facilities and safety departments deploy our multi-agent platform to resolve safety questions on the floor and detect regulatory gaps at EHS desks.
          </p>
        </div>

        {/* 2-Column Tab Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left: Tab Selectors (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 text-left">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="relative pl-6 cursor-pointer select-none group"
                onClick={() => setActivePillar(idx)}
              >
                {/* Radio Pagination Dot Indicator */}
                <div className="absolute left-0 top-1.5 flex items-center justify-center">
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                    activePillar === idx 
                      ? "border-industrial-accent bg-industrial-accent-light" 
                      : "border-industrial-border bg-white group-hover:border-industrial-accent"
                  }`}>
                    {activePillar === idx && (
                      <div className="w-1.5 h-1.5 rounded-full bg-industrial-accent" />
                    )}
                  </div>
                </div>

                {/* Pillar Header */}
                <h3 className={`font-primary font-bold text-base transition-colors duration-150 ${
                  activePillar === idx ? "text-industrial-ink" : "text-industrial-muted group-hover:text-industrial-ink"
                }`}>
                  {pillar.title}
                </h3>

                {/* Description - Accordion style unfolding */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  activePillar === idx ? "max-h-[160px] opacity-100 mt-2" : "max-h-0 opacity-0"
                }`}>
                  <p className="font-sans text-xs text-industrial-muted leading-relaxed pr-4">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Interactive SVG Visuals Diagram (Col 7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Card className="border border-industrial-border bg-industrial-subtle shadow-sm flex flex-col overflow-hidden h-[340px] text-left">
              <div className="bg-white px-4 py-2 border-b border-industrial-border flex items-center justify-between text-[10px] font-mono text-industrial-muted">
                <span>SYSTEM ARCHITECTURE TOPOLOGY</span>
                <span className="text-[9px] uppercase tracking-wider bg-zinc-200 text-zinc-700 px-1.5 py-0.5 rounded">
                  Pillar {activePillar + 1} Visual
                </span>
              </div>
              
              <CardContent className="flex-1 p-0 flex items-center justify-center bg-white relative">
                <svg viewBox="0 0 500 300" className="w-full h-full select-none pointer-events-none">
                  {/* Drawing connections dynamically */}
                  {current.connections.map((conn, idx) => {
                    const fromNode = current.nodes[conn.from]
                    const toNode = current.nodes[conn.to]
                    return (
                      <line 
                        key={idx}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke="#E2E8F0"
                        strokeWidth="1.2"
                        className="transition-all duration-500"
                      />
                    )
                  })}

                  {/* Drawing Nodes */}
                  {current.nodes.map((node, idx) => (
                    <g key={idx} className="transition-all duration-500">
                      <circle 
                        cx={node.x}
                        cy={node.y}
                        r={node.r}
                        fill={node.color}
                        className="transition-all duration-500"
                      />
                      {/* Node Label Text */}
                      <text 
                        x={node.x}
                        y={node.y + node.r + 12}
                        textAnchor="middle"
                        fill="#64748B"
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="semibold"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </section>
  )
}
