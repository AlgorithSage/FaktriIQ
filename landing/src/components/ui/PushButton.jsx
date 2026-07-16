import { useId, useRef, useCallback } from "react";

/* Self-contained glass-refraction filter - generates its distortion from
   noise (feTurbulence) rather than sampling a background photo, so it works
   over any section background (yellow, cream, white cards, nav). Same
   technique already proven in NavBar's liquid-glass filter. */
function GlassDistortionFilter({ id }) {
  return (
    <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0 }}>
      <filter id={id} x="-30%" y="-30%" width="160%" height="160%" filterUnits="objectBoundingBox">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.09" numOctaves="2" seed="7" result="turbulence" />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="9" offset="0.45" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.45" />
        </feComponentTransfer>
        <feGaussianBlur in="mapped" stdDeviation="2.2" result="softMap" />
        <feDisplacementMap in="SourceGraphic" in2="softMap" scale="8" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

/**
 * PushButton - the site's single button primitive: a chunky black-ink pill
 * (global --color-ink surface, white text) fused with a liquid-glass
 * treatment - backdrop blur + noise-based refraction + a specular highlight
 * that tracks the pointer, on top of the existing tactile "press down" 3D
 * shadow interaction.
 */
export function PushButton({ children, onClick, className = "", href, ...props }) {
  const reactId = useId().replace(/[:]/g, "");
  const filterId = `push-glass-${reactId}`;
  const btnRef = useRef(null);

  const handlePointerMove = useCallback((e) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--glow-x", `${x}%`);
    el.style.setProperty("--glow-y", `${y}%`);
  }, []);

  const handlePointerLeave = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    el.style.setProperty("--glow-x", "30%");
    el.style.setProperty("--glow-y", "-30%");
  }, []);

  const content = (
    <>
      <GlassDistortionFilter id={filterId} />
      <span className="push-btn__glass" style={{ filter: `url(#${filterId})` }} aria-hidden="true" />
      <span className="push-btn__specular" aria-hidden="true" />
      <span className="push-btn__label">{children}</span>
    </>
  );

  const sharedProps = {
    ref: btnRef,
    className: `push-btn ${className}`,
    onMouseMove: handlePointerMove,
    onMouseLeave: handlePointerLeave,
    ...props,
  };

  if (href) {
    return (
      <a href={href} {...sharedProps}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} {...sharedProps}>
      {content}
    </button>
  );
}

export default PushButton;
