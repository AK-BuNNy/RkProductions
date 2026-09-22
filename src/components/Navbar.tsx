import { useState, useEffect } from 'react';
import './Navbar.css';

import navLogo from '../assets/nav_logo.png';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Gear Rentals', href: '#gear' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const handleNavClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="container navbar__inner">
        <a href="#" className="navbar__logo">
          <img src={navLogo} alt="RK Production" className="navbar__logo-img" />
        </a>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="navbar__link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn btn--primary navbar__cta">
          Get Quote
        </a>

        <button
          className={`navbar__hamburger ${isMobileOpen ? 'active' : ''}`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
          id="menu-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${isMobileOpen ? 'open' : ''}`}>
        <ul className="navbar__mobile-links">
          {navLinks.map((link, i) => (
            <li key={link.href} style={{ animationDelay: `${i * 0.1}s` }}>
              <a href={link.href} className="navbar__mobile-link" onClick={handleNavClick}>
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ animationDelay: `${navLinks.length * 0.1}s` }}>
            <a href="#contact" className="btn btn--primary" onClick={handleNavClick} style={{ width: '100%', marginTop: '16px' }}>
              Get Quote
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
