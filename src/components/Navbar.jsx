import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServiceMenuOpen(false);
  }, [location]);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsServiceMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>


      {/* Main Bar */}
      <div className="main-bar">
        <div className="container main-bar-content">
          <Link to="/" className="logo">
            <img src={logo} alt="TRUE TRUST" />
          </Link>

          <ul className="nav-links nav-links-main">
            <li className="nav-item"><Link to="/" className={`nav-link-item ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenus}>Home</Link></li>
            <li 
              className={`nav-item dropdown ${isServiceMenuOpen ? 'open' : ''}`}
              onMouseEnter={() => setIsServiceMenuOpen(true)}
              onMouseLeave={() => setIsServiceMenuOpen(false)}
            >
              <Link to="/services" className="nav-link-item" onClick={closeMenus}>Services <ChevronDown size={14} /></Link>
              <div className="megamenu">
                <div className="container megamenu-grid">
                  <div className="megamenu-column">
                    <h4>Development</h4>
                    <Link to="/services/software-development" onClick={closeMenus}>Software Development</Link>
                    <Link to="/services/web-development" onClick={closeMenus}>Web Development</Link>
                    <Link to="/services/mobile-app-development" onClick={closeMenus}>Mobile App Development</Link>
                    <Link to="/services/cms-development" onClick={closeMenus}>CMS Development</Link>
                  </div>
                  <div className="megamenu-column">
                    <h4>Innovation & Cloud</h4>
                    <Link to="/services/ai-solutions-automation" onClick={closeMenus}>AI & Automation</Link>
                    <Link to="/services/cloud-hosting" onClick={closeMenus}>Cloud & Hosting</Link>
                  </div>
                  <div className="megamenu-column">
                    <h4>Design</h4>
                    <Link to="/services/uiux-design" onClick={closeMenus}>UI/UX Design</Link>
                  </div>
                  <div className="megamenu-column promo-col">
                    <div className="promo-card">
                      <h3>Transform Your Business</h3>
                      <p>Explore our AI-driven solutions for the modern enterprise.</p>
                      <Link to="/services" className="promo-link" onClick={closeMenus}>View All Services →</Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item"><Link to="/portfolio" className={`nav-link-item ${location.pathname === '/portfolio' ? 'active' : ''}`} onClick={closeMenus}>Portfolio</Link></li>
            <li className="nav-item"><Link to="/about" className={`nav-link-item ${location.pathname === '/about' ? 'active' : ''}`} onClick={closeMenus}>About Us</Link></li>
            <li className="nav-item"><Link to="/gallery" className={`nav-link-item ${location.pathname === '/gallery' ? 'active' : ''}`} onClick={closeMenus}>Gallery</Link></li>
            <li className="nav-item"><Link to="/team" className={`nav-link-item ${location.pathname === '/team' ? 'active' : ''}`} onClick={closeMenus}>Our Team</Link></li>
            <li className="nav-item"><Link to="/blog" className={`nav-link-item ${location.pathname === '/blog' ? 'active' : ''}`} onClick={closeMenus}>Insights</Link></li>
          </ul>

          <div className="nav-cta-wrap">
            <Link to="/contact" className="btn-nav-contact" onClick={closeMenus}>Contact Us</Link>
          </div>

          {/* Mobile Toggle */}
          <button type="button" className="mobile-toggle" aria-label="Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/team">Our Team</Link></li>
          <li><Link to="/blog">Insights</Link></li>
          <li><Link to="/contact" className="mobile-contact-btn">Get a Quote</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
