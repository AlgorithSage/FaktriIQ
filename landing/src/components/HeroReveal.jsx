import { useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------
   Scroll-linked container reveal (vanilla port of the motion/react
   ContainerScroll component). As the section scrolls through the
   viewport, a sticky frame pins and the media inside scales up while
   its clip-path inset opens from a rounded pill to a full frame.
   No animation library — a single rAF-throttled scroll handler.
------------------------------------------------------------------ */

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (a, b, t) => a + (b - a) * t;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

export default function HeroReveal({ videoSrc, poster }) {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      return undefined;
    }

    const el = scrollRef.current;
    if (!el) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Mirrors useScroll offset ["start center", "end end"]:
      // progress 0 when the section top reaches viewport center,
      // progress 1 when the section bottom reaches viewport bottom.
      const start = vh * 0.5;
      const end = vh - rect.height;
      const span = start - end || 1;
      setProgress(clamp((start - rect.top) / span));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  // Finish the zoom-in within the first half of the scroll range, then hold the
  // video at full size (still pinned) for the remaining scroll — a deliberate
  // dwell so the fully-revealed frame is visible before the page moves on.
  const REVEAL_END = 0.5;
  const reveal = clamp(progress / REVEAL_END);
  const scale = lerp(0.7, 1, reveal);
  const inset = lerp(45, 0, reveal);
  const rounded = lerp(1000, 16, reveal);
  const clipPath = `inset(${inset}% ${inset}% ${inset}% ${inset}% round ${rounded}px)`;

  return (
    <section className="reveal" aria-label="FaktriIQ platform preview">
      <div className="reveal__scroll" ref={scrollRef}>
        <div className="reveal__sticky">
          <div className="reveal__inset" style={{ clipPath }}>
            {videoSrc ? (
              <video
                className="reveal__media"
                style={{ transform: `scale(${scale})` }}
                src={videoSrc}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <PosterPlaceholder scale={scale} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* On-brand poster shown until a real video source is provided. */
function PosterPlaceholder({ scale }) {
  return (
    <div className="reveal__media reveal__poster" style={{ transform: `scale(${scale})` }}>
      <svg className="reveal__poster-grid" viewBox="0 0 1200 675" aria-hidden="true">
        <defs>
          <pattern id="reveal-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0H0V60" fill="none" stroke="#334155" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1200" height="675" fill="url(#reveal-grid)" opacity="0.35" />
      </svg>

      <div className="reveal__poster-inner">
        <span className="reveal__play" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
          </svg>
        </span>
        <p className="reveal__poster-label">
          Faktri<span>IQ</span> Platform walkthrough
        </p>
        <p className="reveal__poster-sub">Compliance console &amp; on-floor copilot in action</p>
      </div>
    </div>
  );
}
