import { PushButton } from './ui/PushButton';
import { StarsBackground } from './ui/stars-background';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export default function Footer() {
  const themeContext = useTheme();
  const resolvedTheme = themeContext?.resolvedTheme || 'light';

  return (
    <footer className="footer relative overflow-hidden" id="book-a-demo">
      {/* Animated Stars Background */}
      <StarsBackground
        starColor="#FFF"
        className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_bottom,_#161920_0%,_#090a0f_100%)]"
      />

      <div className="container footer__cta-block relative z-10">
        <p className="overline">Outcome-Driven Solutions: How we help</p>
        <h2 className="footer__heading">Ready to see FaktriIQ inside your plant?</h2>
        <div className="footer__actions">
          <PushButton href="#top">
            See our Platform
          </PushButton>
          <PushButton href="mailto:hello@faktriiq.example">
            Book a Demo
          </PushButton>
        </div>
      </div>

      <div className="container footer__base relative z-10">
        <p className="footer__logo">
          <img 
            src="/aktr.png" 
            alt="FaktriIQ Logo" 
            className="footer__logo-img" 
            draggable={false} 
            onContextMenu={(e) => e.preventDefault()}
          />
          <span className="brand-text-style">Faktri<span>IQ</span></span>
        </p>
        <ul className="footer__links">
          <li><a href="#agents">Agents</a></li>
          <li><a href="#compliance">Compliance</a></li>
          <li><a href="#architecture">Architecture</a></li>
          <li><a href="#technology">Technology</a></li>
          <li><a href="#resources">Resources</a></li>
        </ul>
        <p className="footer__note">
          &copy; {new Date().getFullYear()} FaktriIQ - Unified Asset &amp;
          Operations Brain. Compliance outputs are system-generated; always confirm
          against the original regulation before acting.
        </p>
      </div>
    </footer>
  );
}
