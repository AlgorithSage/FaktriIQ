import { useState } from 'react';

const MENU_ITEMS = [
  'Agents',
  'Compliance',
  'Architecture',
  'Technology',
  'Why FaktriIQ?',
  'Resources',
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  return (
    <header className="nav">
      <div className="nav__inner container">
        <a className="nav__logo" href="#top" aria-label="FaktriIQ home">
          Faktri<span className="nav__logo-iq">IQ</span>
        </a>

        <nav className={`nav__menu ${menuOpen ? 'is-open' : ''}`} aria-label="Primary">
          <ul className="nav__list">
            {MENU_ITEMS.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                  className={`nav__link ${activeItem === item ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveItem(item);
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
          <button className="nav__search" type="button" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
              <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <a className="btn btn--demo" href="#book-a-demo">
            Book a Demo
          </a>
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
    </header>
  );
}
