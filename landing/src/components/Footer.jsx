export default function Footer() {
  return (
    <footer className="footer" id="book-a-demo">
      <div className="container footer__cta-block">
        <p className="overline">Outcome-Driven Solutions: How we help</p>
        <h2 className="footer__heading">Ready to see FaktriIQ inside your plant?</h2>
        <div className="footer__actions">
          <a className="btn btn--primary" href="#top">
            See our Platform
          </a>
          <a className="btn btn--demo" href="mailto:hello@faktriiq.example">
            Book a Demo
          </a>
        </div>
      </div>

      <div className="container footer__base">
        <p className="footer__logo">
          Faktri<span>IQ</span>
        </p>
        <ul className="footer__links">
          <li><a href="#agents">Agents</a></li>
          <li><a href="#compliance">Compliance</a></li>
          <li><a href="#architecture">Architecture</a></li>
          <li><a href="#technology">Technology</a></li>
          <li><a href="#resources">Resources</a></li>
        </ul>
        <p className="footer__note">
          &copy; {new Date().getFullYear()} FaktriIQ &mdash; Unified Asset &amp;
          Operations Brain. Compliance outputs are system-generated; always confirm
          against the original regulation before acting.
        </p>
      </div>
    </footer>
  );
}
