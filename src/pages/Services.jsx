import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, ArrowRight, CheckCircle2
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { servicesData } from '../data/servicesData.jsx';
import './Services.css';

const Services = () => {
  const { hash } = useLocation();
  const [activeFilter, setActiveFilter] = React.useState('All Services');

  React.useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const filteredServices = servicesData.filter(service => {
    if (activeFilter === 'All Services') return true;
    if (activeFilter === 'Web & Design') return ['3d-animated-website', 'website-poster-designing'].includes(service.id);
    if (activeFilter === 'Marketing & Media') return ['marketing-automation', 'video-story-marketing'].includes(service.id);
    if (activeFilter === 'AI & Cinema') return ['ai-short-film'].includes(service.id);
    return true;
  });

  return (
    <div className="services-page">
      <section className="page-header services-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Capabilities & <span className="highlight">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="header-subtitle"
          >
            End-to-end technology services designed to accelerate your digital transformation and drive unprecedented growth.
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="services-list-section">
        <div className="container">
          <div className="services-filter">
             {['All Services', 'Web & Design', 'Marketing & Media', 'AI & Cinema'].map(filter => (
               <button 
                 key={filter}
                 className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                 onClick={() => setActiveFilter(filter)}
               >
                 {filter}
               </button>
             ))}
          </div>
          
          <div className="services-list-grid">
            {filteredServices.map((service, i) => (
              <motion.div 
                key={service.id} 
                id={service.id}
                className="service-detail-card"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  rotateX: 2,
                  rotateY: 2,
                  boxShadow: "0 20px 40px rgba(234, 88, 12, 0.15)"
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: i * 0.05 
                }}
              >
                <div className="sd-header">
                  <div className="sd-icon">{service.icon}</div>
                  <h2>{service.title}</h2>
                </div>
                <p className="sd-desc">{service.desc}</p>
                
                <div className="sd-benefits">
                   <h4>Core Specializations:</h4>
                   <ul className="sd-features">
                    {service.features.map((feat, idx) => (
                      <li key={idx}><CheckCircle2 size={16} className="icon-teal" /> {feat}</li>
                    ))}
                  </ul>
                </div>

                <div className="sd-meta">
                  <span className="sd-tag">Enterprise Ready</span>
                  <span className="sd-tag">SLA Guaranteed</span>
                </div>

                <Link to={`/services/${service.id}`} className="sd-link">Deep Dive Details <ArrowRight size={16} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="dev-process-section bg-light">
        <div className="container">
          <div className="section-title text-center">
            <h2>Our Delivery <span className="highlight">Framework</span></h2>
            <p>A proven methodology ensuring quality and speed in every engagement.</p>
          </div>
          
          <div className="process-grid">
            {[
              { step: "01", title: "Discovery & Strategy", desc: "Deep dive into your business goals, target audience, and technical requirements." },
              { step: "02", title: "Architecture & Design", desc: "Creating robust blueprints and intuitive user journeys centered around your needs." },
              { step: "03", title: "Iterative Development", desc: "Agile build cycles with transparent progress updates and continuous integration." },
              { step: "04", title: "Quality Assurance", desc: "Rigorous testing across devices and scenarios to ensure a flawless experience." }
            ].map((p, i) => (
              <motion.div 
                key={i} 
                className="process-step"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="step-num">{p.step}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendation Banner */}
      <section className="ai-recommendation cta-banner">
        <div className="container">
          <div className="cta-content text-center" style={{ color: 'var(--cyan)' }}>
            <Cpu size={56} className="icon-teal mb-4 mx-auto" style={{ margin: '0 auto 20px', display: 'block' }} />
            <h2 style={{ color: 'var(--cyan)', fontSize: '2.5rem' }}>Ready to twist the future?</h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto 30px' }}>
              Our adaptive AI models can help predict project timelines and resource requirements for your specific use-case.
            </p>
            <Link to="/contact" className="btn-primary large" style={{ display: 'inline-flex' }}>Connect With Experts <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
