import React from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function Navbar() {
  const menuItems = [
    { name: "Agents", href: "#agents" },
    { name: "Compliance", href: "#compliance" },
    { name: "Architecture", href: "#architecture" },
    { name: "Technology", href: "#technology" },
    { name: "Why FaktriIQ?", href: "#why-faktriiq" },
    { name: "Resources", href: "#resources" }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 border-b border-industrial-border backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left - Logo */}
          <div className="flex items-center space-x-2">
            <span className="font-primary font-bold text-lg tracking-tight text-industrial-ink">
              Faktri<span className="text-industrial-accent">IQ</span>
            </span>
          </div>

          {/* Center - Menu Items */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-industrial-muted hover:text-industrial-ink transition-colors duration-150 text-xs font-mono uppercase tracking-wider"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right - Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <Button
              className="bg-industrial-ink hover:bg-industrial-slate text-white font-mono text-xs uppercase tracking-wider px-4 py-2 rounded border border-industrial-border shadow-sm transition-all duration-150"
              onClick={() => document.getElementById('pilot-request')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book a Demo
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-industrial-ink hover:bg-industrial-subtle">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-industrial-border text-industrial-ink">
                <div className="flex flex-col space-y-6 mt-12 text-left">
                  {menuItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-industrial-muted hover:text-industrial-ink transition-colors duration-150 text-xs font-mono uppercase tracking-widest"
                    >
                      {item.name}
                    </a>
                  ))}
                  <div className="border-t border-industrial-border pt-6">
                    <Button
                      className="bg-industrial-ink hover:bg-industrial-slate text-white font-mono text-xs uppercase tracking-wider w-full py-3 rounded"
                      onClick={() => {
                        document.getElementById('pilot-request')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      Book a Demo
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  )
}
