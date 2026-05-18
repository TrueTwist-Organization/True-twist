import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ArrowRight, Sparkles as SparkleIcon } from 'lucide-react';
import { servicesData } from '../data/servicesData.jsx';
import { Canvas } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import './ServiceDetail.css';

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="container py-20 text-center">
        <h2>Service Not Found</h2>
        <Link to="/services" className="btn-primary mt-4">Back to Services</Link>
      </div>
    );
  }

  const isSoftwareDev = id === '3d-animated-website';

  return (
    <div className="service-detail-page">
      <section
        className={`detail-header`}
        style={{
          '--service-hero-image': `url(${service.image || 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=2070&auto=format&fit=crop'})`,
        }}
      >
        <div className="container detail-header-content">
          {/* ── Left: text content ── */}
          <div className="detail-hero-text">
            <Link to="/services" className={`back-link`}>
              <ArrowLeft size={16} /> Back to Services
            </Link>

            <motion.div
              className="detail-icon-large"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {service.icon}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              {service.title}
            </motion.h1>

            <motion.p
              className="detail-lead"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
            >
              {service.desc}
            </motion.p>
          </div>

          {/* ── Right: floating visual (software-dev only) ── */}
          {isSoftwareDev && (
            <div className="detail-hero-visual">
              {/* Frosted glass tech stack card */}
              <motion.div
                className="sd-tech-card"
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <p className="sd-tech-label">Our Tech Stack</p>
                <div className="sd-tech-grid">
                  {[
                    { emoji: '⚛️', name: 'React',   color: '#61DAFB' },
                    { emoji: '🟢', name: 'Node.js', color: '#68A063' },
                    { emoji: '🐍', name: 'Python',  color: '#3776AB' },
                    { emoji: '☁️', name: 'AWS',     color: '#FF9900' },
                  ].map((tech) => (
                    <div key={tech.name} className="sd-tech-item">
                      <span className="sd-tech-emoji">{tech.emoji}</span>
                      <span className="sd-tech-name" style={{ color: tech.color }}>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div className="sd-badge sd-badge--1"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
              >
                <span className="sd-badge-icon">✓</span> 500+ Projects
              </motion.div>
              <motion.div className="sd-badge sd-badge--2"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.58 }}
              >
                <span className="sd-badge-icon">⚡</span> Fast Delivery
              </motion.div>
              <motion.div className="sd-badge sd-badge--3"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.70 }}
              >
                <span className="sd-badge-icon">🔒</span> Secure Code
              </motion.div>
            </div>
          )}
        </div>

        {/* Bottom wave (software-dev only) */}
        {isSoftwareDev && (
          <div className="detail-hero-wave" aria-hidden>
            <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
              <path d="M0,30 C480,90 960,0 1440,50 L1440,90 L0,90 Z" fill="var(--bg-white)" />
            </svg>
          </div>
        )}
      </section>

      <section className="detail-content py-20">
        <div className="container">
          <div className="detail-grid">
            <div className="main-info">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="h1 mb-6">Service Overview</h3>
                <p className="lead">{service.longDesc || "We provide comprehensive solutions tailored to your specific business needs, ensuring quality delivery and consistent performance."}</p>
                
                <div className="info-cards-grid mt-10">
                  <div className="info-stat-card">
                    <div className="stat-icon-blob">01</div>
                    <h4>High Reliability</h4>
                    <p>99.9% uptime and consistent performance under load for all enterprise solutions.</p>
                  </div>
                  <div className="info-stat-card">
                    <div className="stat-icon-blob">02</div>
                    <h4>Expert Execution</h4>
                    <p>Senior engineers with 10+ years of domain expertise working on your specific vision.</p>
                  </div>
                </div>

                <div className="service-process-section mt-20">
                  <h3 className="h2 mb-10">Our Strategic <span className="highlight-navy">Process</span></h3>
                  <div className="process-timeline">
                    {[
                      { step: "01", title: "Discovery & Planning", desc: "We dive deep into your requirements and business goals." },
                      { step: "02", title: "Design & Prototyping", desc: "Creating visual blueprints and interactive wireframes." },
                      { step: "03", title: "Agile Development", desc: "Building your solution in rapid, transparent sprints." },
                      { step: "04", title: "QA & Deployment", desc: "Rigorous testing followed by seamless market launch." }
                    ].map((step, idx) => (
                      <div key={idx} className="process-step-item">
                        <div className="step-number">{step.step}</div>
                        <div className="step-content">
                          <h4>{step.title}</h4>
                          <p>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className="h2 mt-16 mb-8">What You Get</h3>
                <div className="features-checklist-elaborate">
                  {service.features.map((feature, idx) => (
                    <motion.div 
                      key={idx} 
                      className="checklist-item-new"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="check-icon-bg">
                        <CheckCircle2 className="icon-teal" size={20} />
                      </div>
                      <div className="check-text">
                        <span>{feature}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              

            </div>

            <aside className="detail-sidebar">
              <div className="sticky-sidebar-content">
                <motion.div 
                  className="cta-card-premium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <SparkleIcon size={32} className="sidebar-icon-glow" />
                  <h3>Elevate your Project</h3>
                  <p>Ready to transform your vision into a reality? Let's build something extraordinary together.</p>
                  <Link to="/contact" className="btn-primary large w-100 mt-4">
                    Get an AI Estimate <ArrowRight size={18} />
                  </Link>
                </motion.div>

                <div className="other-services-nav">
                  <h4>Related Solutions</h4>
                  <div className="mini-links-container">
                    {servicesData.filter(s => s.id !== id).slice(0, 4).map(s => (
                      <Link key={s.id} to={`/services/${s.id}`} className="mini-item-link">
                        <span className="mini-icon">{s.icon}</span>
                        <span className="mini-title">{s.title}</span>
                        <ArrowRight size={14} className="arrow" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
