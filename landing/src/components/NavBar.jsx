import { useState, useEffect, useRef } from 'react';
import { PushButton } from './ui/PushButton';

const MENU_ITEMS = [
  'Agents',
  'Compliance',
  'Architecture',
  'Technology',
  'Why FaktriIQ?',
  'Resources',
];

// SVG Filter - creates the liquid refraction, specular lighting, and displacement
function GlassFilter() {
  return (
    <svg style={{ display: 'none' }}>
      <filter
        id="nav-glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.003 0.006"
          numOctaves="1"
          seed="12"
          result="turbulence"
        />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feSpecularLighting
          in="softMap"
          surfaceScale="4"
          specularConstant="0.9"
          specularExponent="100"
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>
        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="120"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

// The glass effect wrapper - exactly like Apple's liquid glass
function LiquidGlassNavWrapper({ children, className = '', isScrolled }) {
  return (
    <div
      className={`relative flex overflow-hidden ${className}`}
      style={{
        border: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: isScrolled
          ? '0 10px 30px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.02)'
          : '0 4px 20px rgba(15, 23, 42, 0.04)',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      {/* Layer 1: SVG-distorted refraction blur */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          borderRadius: 'inherit',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          filter: 'url(#nav-glass-distortion)',
          isolation: 'isolate',
        }}
      />
      {/* Layer 2: White tinted glass surface */}
      <div
        className="absolute inset-0 z-10"
        style={{
          borderRadius: 'inherit',
          background: isScrolled
            ? 'rgba(255, 255, 255, 0.30)'
            : 'rgba(255, 255, 255, 0.22)',
          transition: 'background 0.3s ease',
        }}
      />
      {/* Content above glass */}
      <div className="relative z-30 w-full">{children}</div>
    </div>
  );
}

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [pillStyle, setPillStyle] = useState({ opacity: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 860;

  // Track and update the sliding pill styling coordinates dynamically
  useEffect(() => {
    if (isMobile) return;
    
    const targetIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;
    if (targetIdx === null || !itemRefs.current[targetIdx] || !containerRef.current) {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const targetEl = itemRefs.current[targetIdx];
    const containerEl = containerRef.current;

    const targetRect = targetEl.getBoundingClientRect();
    const containerRect = containerEl.getBoundingClientRect();

    // Give a slightly larger box size than text bounds to form a clean pill shape
    setPillStyle({
      opacity: 1,
      left: targetRect.left - containerRect.left,
      width: targetRect.width,
      height: targetRect.height,
    });
  }, [hoveredIdx, activeIdx, windowWidth, isMobile]);

  return (
    <>
      <GlassFilter />

      <header className={`nav ${isScrolled ? 'is-scrolled' : ''}`}>
        <LiquidGlassNavWrapper isScrolled={isScrolled} className="rounded-full h-full">
          <div className="nav__inner container">
            <a className="nav__logo" href="#top" aria-label="FaktriIQ home">
              <img 
                src="/aktr.png" 
                alt="FaktriIQ Logo" 
                className="nav__logo-img" 
                draggable={false} 
                onContextMenu={(e) => e.preventDefault()}
              />
              <span className="brand-text-style">Faktri<span className="nav__logo-iq">IQ</span></span>
            </a>

            <nav
              className={`nav__menu ${menuOpen ? 'is-open' : ''}`}
              aria-label="Primary"
            >
              <ul 
                className="nav__list relative" 
                ref={containerRef}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Smooth Shifting active/hover background pill element */}
                {!isMobile && (
                  <div
                    className="absolute rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
                    style={{
                      left: `${pillStyle.left}px`,
                      width: `${pillStyle.width}px`,
                      height: `${pillStyle.height}px`,
                      opacity: pillStyle.opacity,
                      backgroundColor: hoveredIdx !== null ? 'rgba(15, 23, 42, 0.08)' : 'rgba(15, 23, 42, 0.12)',
                      top: '0px',
                    }}
                  />
                )}

                {MENU_ITEMS.map((item, idx) => (
                  <li 
                    key={item}
                    ref={(el) => (itemRefs.current[idx] = el)}
                    onMouseEnter={() => setHoveredIdx(idx)}
                  >
                    <a
                      href={`#${item.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                      className={`nav__link ${activeIdx === idx ? 'is-active' : ''}`}
                      onClick={() => {
                        setActiveIdx(idx);
                        setMenuOpen(false);
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="nav__actions">
              <PushButton href="#book-a-demo" className="nav__demo-push">
                Book a Demo
              </PushButton>
              <button
                className="nav__burger"
                type="button"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </LiquidGlassNavWrapper>
      </header>
    </>
  );
}
