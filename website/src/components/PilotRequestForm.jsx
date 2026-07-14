import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { ShieldCheck } from "lucide-react"

export default function PilotRequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.organization || !formData.role) {
      toast.error("Please fill in all fields before submitting.")
      return
    }

    // Success action
    toast.success("Pilot Request Submitted!", {
      description: "Team AlgoZeniths will contact you shortly to schedule your plant sandbox setup."
    })

    // Reset form
    setFormData({
      name: '',
      email: '',
      organization: '',
      role: ''
    })
  }

  return (
    <section id="pilot-request" className="py-20 bg-white border-b border-industrial-border relative">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Card className="border border-industrial-border shadow-md bg-white">
          <CardHeader className="bg-industrial-slate text-white border-b border-industrial-border/60 p-6 text-left space-y-2">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-industrial-accent" />
              <CardTitle className="font-primary font-bold text-xl">
                Request a Plant Pilot
              </CardTitle>
            </div>
            <CardDescription className="text-slate-300 text-xs font-sans">
              Schedule a sandbox installation to evaluate FaktriIQ against your plant's custom safety SOPs.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="p-6 space-y-4 text-left">
              {/* Full Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-mono font-bold text-industrial-slate uppercase">
                  Full Name
                </Label>
                <Input 
                  id="name"
                  type="text"
                  placeholder="e.g. Subhadeep Pal"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="border-industrial-border focus:border-industrial-accent focus:ring-industrial-accent-mid"
                />
              </div>

              {/* Work Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-mono font-bold text-industrial-slate uppercase">
                  Work Email
                </Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="e.g. subhadeep@plantops.in"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="border-industrial-border focus:border-industrial-accent focus:ring-industrial-accent-mid"
                />
              </div>

              {/* Organization */}
              <div className="space-y-1.5">
                <Label htmlFor="organization" className="text-xs font-mono font-bold text-industrial-slate uppercase">
                  Plant / Organization Name
                </Label>
                <Input 
                  id="organization"
                  type="text"
                  placeholder="e.g. AlgoZeniths Refining Ltd"
                  value={formData.organization}
                  onChange={(e) => setFormData({...formData, organization: e.target.value})}
                  className="border-industrial-border focus:border-industrial-accent focus:ring-industrial-accent-mid"
                />
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <Label htmlFor="role" className="text-xs font-mono font-bold text-industrial-slate uppercase">
                  Your Operational Role
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(val) => setFormData({...formData, role: val})}
                >
                  <SelectTrigger className="border-industrial-border">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-industrial-border">
                    <SelectItem value="technician">Field Operator / Technician</SelectItem>
                    <SelectItem value="safety-officer">Safety & Compliance Officer</SelectItem>
                    <SelectItem value="plant-manager">Plant Manager / Director</SelectItem>
                    <SelectItem value="it-admin">OT / IT Systems Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 border-t border-industrial-border/60 flex flex-col space-y-4">
              <Button 
                type="submit"
                className="w-full bg-industrial-ink hover:bg-industrial-slate text-white border-b-2 border-industrial-accent font-semibold py-5 rounded-md mt-4 transition-transform hover:-translate-y-0.5"
              >
                Submit Pilot Request
              </Button>
              <div className="text-[10px] text-industrial-muted font-sans text-center">
                By submitting, you agree to our standard air-gapped pilot licensing parameters.
              </div>
            </CardFooter>
          </form>
        </Card>

      </div>
    </section>
  )
}
