import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
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
    setIsMobileServicesOpen(false);
  }, [location]);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsServiceMenuOpen(false);
    setIsMobileServicesOpen(false);
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
                    <h4>Web &amp; Design</h4>
                    <Link to="/services/3d-animated-website" onClick={closeMenus}>3D Animated Website</Link>
                    <Link to="/services/website-poster-designing" onClick={closeMenus}>Website &amp; Poster Designing</Link>
                  </div>
                  <div className="megamenu-column">
                    <h4>Marketing &amp; Media</h4>
                    <Link to="/services/marketing-automation" onClick={closeMenus}>Marketing Automation</Link>
                    <Link to="/services/video-story-marketing" onClick={closeMenus}>Video Story Marketing</Link>
                  </div>
                  <div className="megamenu-column">
                    <h4>AI &amp; Cinema</h4>
                    <Link to="/services/ai-short-film" onClick={closeMenus}>AI Short Film</Link>
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

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} data-lenis-prevent>
        <ul className="mobile-nav-links">
          <li><Link to="/" onClick={closeMenus}>Home</Link></li>
          
          {/* Services Collapsible Accordion */}
          <li>
            <div 
              className="mobile-services-toggle" 
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
            >
              <span>Services</span>
              <ChevronDown size={20} className={`arrow-icon ${isMobileServicesOpen ? 'rotate' : ''}`} />
            </div>
            <div className={`mobile-submenu-wrapper ${isMobileServicesOpen ? 'open' : ''}`}>
              <ul className="mobile-submenu">
                <li className="submenu-category">Web &amp; Design</li>
                <li><Link to="/services/3d-animated-website" onClick={closeMenus}>3D Animated Website</Link></li>
                <li><Link to="/services/website-poster-designing" onClick={closeMenus}>Website &amp; Poster Designing</Link></li>
                
                <li className="submenu-category">Marketing &amp; Media</li>
                <li><Link to="/services/marketing-automation" onClick={closeMenus}>Marketing Automation</Link></li>
                <li><Link to="/services/video-story-marketing" onClick={closeMenus}>Video Story Marketing</Link></li>
                
                <li className="submenu-category">AI &amp; Cinema</li>
                <li><Link to="/services/ai-short-film" onClick={closeMenus}>AI Short Film</Link></li>

                <li>
                  <Link to="/services" className="mobile-all-services-link" onClick={closeMenus}>
                    View All Services →
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          
          <li><Link to="/portfolio" onClick={closeMenus}>Portfolio</Link></li>
          <li><Link to="/about" onClick={closeMenus}>About Us</Link></li>
          <li><Link to="/gallery" onClick={closeMenus}>Gallery</Link></li>
          <li><Link to="/team" onClick={closeMenus}>Our Team</Link></li>
          <li><Link to="/blog" onClick={closeMenus}>Insights</Link></li>
          <li><Link to="/contact" className="mobile-contact-btn" onClick={closeMenus}>Contact Us</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
