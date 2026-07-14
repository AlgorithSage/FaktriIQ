import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function FAQSection() {
  const faqs = [
    {
      question: "How does FaktriIQ ingest digitized or paper-based documentation?",
      answer: "FaktriIQ contains a hybrid optical character recognition (OCR) and document layout parser pipeline. It can ingest standard digital PDFs, scanned engineering manuals, safety notebooks, or photographed SOP logs. Once ingested, the document structure is cleaned, segmented, and stored locally."
    },
    {
      question: "Does it support custom proprietary SOPs and safety manuals?",
      answer: "Yes, absolutely. The Compliance Agent is built specifically to map your facility's custom operating procedures. You simply upload your custom SOP sheets, and the agent matches them against standard governing frameworks to highlight any deviations."
    },
    {
      question: "What Indian statutory frameworks are pre-mapped into the database?",
      answer: "FaktriIQ comes pre-configured with active standards mapping for the Factories Act 1948, the Oil Industry Safety Directorate (OISD) guidelines (specifically OISD-STD-105 & OISD-GDN-115), and Petroleum and Explosives Safety Organization (PESO) static grounding and container rules. Custom regional state amendments can also be added."
    },
    {
      question: "Is our plant operational data secure?",
      answer: "Security is our highest priority in industrial process operations. FaktriIQ operates entirely within your local enterprise intranet boundaries. The embedding generation, document storage, and LLM inference engine run inside your air-gapped on-premise servers. No plant operational parameters or text documents ever leave your secure environment."
    }
  ]

  return (
    <section id="faq" className="py-20 bg-industrial-subtle border-b border-industrial-border relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="font-mono text-xs text-industrial-muted border-industrial-border py-1 px-3 uppercase tracking-wider bg-white">
            ❓ Common Questions
          </Badge>
          <h2 className="font-primary font-extrabold text-3xl sm:text-4xl text-industrial-ink">
            Frequently Asked Questions
          </h2>
          <p className="text-industrial-muted text-base leading-relaxed max-w-2xl mx-auto">
            Find technical details regarding FaktriIQ's local ingestion pipeline, data safety protocols, and compliance integrations.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full bg-white border border-industrial-border rounded-lg shadow-sm p-4 divide-y divide-industrial-border">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-b-0 py-2">
              <AccordionTrigger className="font-primary font-bold text-base text-left text-industrial-ink hover:text-industrial-accent hover:no-underline transition-colors duration-200 px-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-sm text-industrial-muted leading-relaxed px-4 pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  )
}
