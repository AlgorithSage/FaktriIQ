import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-industrial-border py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start text-left">
          
          {/* Logo & About */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-primary font-bold text-lg text-industrial-ink">
              Faktri<span className="text-industrial-accent">IQ</span>
            </span>
            <p className="text-industrial-muted text-xs leading-relaxed max-w-sm font-sans">
              A calm, unified operations brain for industrial plants. Automating regulatory gap identification and document search locally on-device.
            </p>
          </div>

          {/* Coverages */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-[10px] font-bold text-industrial-ink uppercase tracking-widest">
              Frameworks Mapped
            </h4>
            <ul className="space-y-2 text-xs font-sans text-industrial-muted">
              <li>Factories Act 1948</li>
              <li>OISD Safety Guidelines</li>
              <li>PESO Storage Rules</li>
            </ul>
          </div>

          {/* Credits */}
          <div className="md:col-span-4 space-y-3 text-xs text-industrial-muted font-sans">
            <h4 className="font-mono text-[10px] font-bold text-industrial-ink uppercase tracking-widest">
              Team Credits
            </h4>
            <p className="font-bold text-industrial-slate">
              Team AlgoZeniths
            </p>
            <p className="leading-relaxed text-[11px]">
              Institute of Engineering & Management (IEM), Kolkata. Developed for the Smart India Hackathon.
            </p>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-industrial-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-industrial-muted">
          <span>&copy; {new Date().getFullYear()} FaktriIQ. Designed for statutory EHS safety compliance.</span>
          <div className="flex space-x-6 mt-4 sm:mt-0 uppercase tracking-wider text-[9px]">
            <a href="#agents" className="hover:text-industrial-ink transition-colors">Agents</a>
            <a href="#compliance" className="hover:text-industrial-ink transition-colors">Compliance</a>
            <a href="#architecture" className="hover:text-industrial-ink transition-colors">Architecture</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
