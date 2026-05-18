import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Disclaimer from './pages/Disclaimer';
import Team from './pages/Team';
import Gallery from './pages/Gallery';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';
import ThreeBackground from './components/ThreeBackground';
import { useScrollReveal } from './hooks/useScrollReveal';
import './styles/scroll-reveal.css';
import './App.css';

import { ParticleTextEffect } from './components/ParticleLoader';

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const [isLoading, setIsLoading] = React.useState(true);

  useScrollReveal(location.pathname);

  const handleComplete = () => {
    setIsLoading(false);
    /* Only add sr-ready after preloader is gone to trigger animations properly */
    setTimeout(() => {
      document.documentElement.classList.add('sr-ready');
    }, 100);
  };

  if (isLoading && location.pathname === '/') {
    return <ParticleTextEffect onComplete={handleComplete} />;
  }

  /* Ensure sr-ready is added if we are not on the home page or preloader is bypassed */
  if (!isLoading || location.pathname !== '/') {
    if (!document.documentElement.classList.contains('sr-ready')) {
      document.documentElement.classList.add('sr-ready');
    }
  }

  return (
    <ReactLenis root>
      <ScrollToTop />
      <div className="app-container">
        <ThreeBackground />
        {!isAdminPath && <Navbar />}
        <main className={isAdminPath ? "" : "content"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/team" element={<Team />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        {!isAdminPath && <Footer />}
      </div>
    </ReactLenis>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
/* Trigger HMR reload */
