import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { UploadCloud, FileSpreadsheet, Server, MessageSquare } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      step: "Step 01",
      icon: <UploadCloud className="h-6 w-6 text-industrial-accent" />,
      title: "Secure Ingestion",
      description: "Directly upload your plant operating manuals, safety guidelines, P&ID diagrams, and legacy SOP sheets (PDFs, scans, text files)."
    },
    {
      step: "Step 02",
      icon: <FileSpreadsheet className="h-6 w-6 text-industrial-accent" />,
      title: "Regulatory Extraction",
      description: "FaktriIQ's parser reads the documents, automatically extracts dates, equipment tags, and maps them against Indian standards (OISD, Factories Act, PESO)."
    },
    {
      step: "Step 03",
      icon: <Server className="h-6 w-6 text-industrial-accent" />,
      title: "Local Vector Embedding",
      description: "Documents are processed locally into vector embeddings on your local instance. Your plant data never leaves your secure server boundary."
    },
    {
      step: "Step 04",
      icon: <MessageSquare className="h-6 w-6 text-industrial-accent" />,
      title: "Traceable Querying",
      description: "Technicians query via conversational UI on mobile or desktop, receiving answers with verifiable citation references and confidence indexes."
    }
  ]

  return (
    <section className="py-20 bg-industrial-subtle border-b border-industrial-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="font-primary font-extrabold text-3xl sm:text-4xl text-industrial-ink">
            How FaktriIQ Works
          </h2>
          <p className="text-industrial-muted text-base leading-relaxed">
            A secure, localized, and multi-step pipeline converting offline operational manuals into compliant, interactive intelligence.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-[2px] bg-industrial-border z-0" />

          {steps.map((st, idx) => (
            <Card 
              key={idx} 
              className="border border-industrial-border bg-white shadow-sm flex flex-col justify-between items-start text-left p-6 relative z-10 hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-0 flex flex-col justify-between h-full space-y-6">
                <div className="flex justify-between items-center w-full">
                  <div className="p-3 bg-industrial-subtle rounded-lg border border-industrial-border/60">
                    {st.icon}
                  </div>
                  <span className="font-mono font-bold text-xs text-industrial-muted">
                    {st.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-primary font-bold text-lg text-industrial-ink">
                    {st.title}
                  </h3>
                  <p className="font-sans text-xs text-industrial-muted leading-relaxed">
                    {st.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
