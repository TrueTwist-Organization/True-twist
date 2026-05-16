import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Plus } from 'lucide-react';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <img src={logo} alt="TRUE TRUST" />
          </Link>
          <p className="footer-desc">
            Innovative IT solutions — software, cloud, AI, and design for teams that want to ship with confidence.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link to="/services/web-development">Web Development</Link></li>
            <li><Link to="/services/uiux-design">UI/UX Design</Link></li>
            <li><Link to="/services/mobile-app-development">Mobile App Development</Link></li>
            <li><Link to="/services/software-development">Software Development</Link></li>
            <li><Link to="/services/cms-development">CMS Development</Link></li>
            <li><Link to="/services/ai-solutions-automation">AI &amp; Automation</Link></li>
            <li><Link to="/services/cloud-hosting">Cloud Solutions</Link></li>
            <li><Link to="/services/cloud-hosting">Cloud Hosting</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/team">Our Team</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/portfolio">Case Studies</Link></li>
            <li><Link to="/#testimonials">Testimonials</Link></li>
            <li><Link to="/contact">FAQ</Link></li>
            <li><Link to="/contact">Support</Link></li>
          </ul>
        </div>

        <div className="footer-col footer-col-newsletter">
          <h4>Newsletter</h4>
          <p className="footer-newsletter-desc">Stay updated with our latest insights &amp; innovations.</p>
          <form className="footer-newsletter-form" onSubmit={handleNewsletter}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              aria-label="Email for newsletter"
            />
            <button type="submit" aria-label="Subscribe" className="footer-newsletter-send">
              <Plus size={22} strokeWidth={2.5} />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>
            &copy; {new Date().getFullYear()} True Trust. All rights reserved. | 
            Designed by <a href="https://truetwist.in/" target="_blank" rel="noopener noreferrer" className="footer-attribution-link">TrueTwist</a>
          </p>
          <div className="bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-conditions">Terms &amp; Conditions</Link>
            <Link to="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
