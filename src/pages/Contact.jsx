import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import './Contact.css';

import { servicesData } from '../data/servicesData';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: servicesData[0].title,
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, submit form data
    setIsSubmitted(true);
    setFormData({ name: '', email: '', service: servicesData[0].title, message: '' });
  };

  return (
    <div className="contact-page">
      <section className="page-header" style={{
        backgroundColor: 'var(--bg-light)',
        backgroundImage: "linear-gradient(to right, rgba(5, 5, 5, 0.9), rgba(14, 14, 14, 0.88)), url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        borderBottom: '1px solid rgba(var(--rgb-primary), 0.1)',
        padding: '120px 0 80px',
        textAlign: 'center'
      }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get In <span className="highlight">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="header-subtitle"
          >
            Let's discuss how True Twist can help accelerate your business growth.
          </motion.p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            
            {/* Contact Info */}
            <motion.div 
              className="contact-info bg-light"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2>Contact Information</h2>
              <p>Fill out the form or reach out directly using the information below.</p>
              
              <div className="info-list">
                <div className="info-item">
                  <div className="icon-wrapper"><Mail className="icon-teal" /></div>
                  <div>
                    <h4>Email</h4>
                    <p>hello@truetwist.it</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="icon-wrapper"><Phone className="icon-teal" /></div>
                  <div>
                    <h4>Phone</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="icon-wrapper"><MapPin className="icon-teal" /></div>
                  <div>
                    <h4>Office</h4>
                    <p>123 Innovation Way, Tech City, TX 75001</p>
                  </div>
                </div>
              </div>

              <div className="ai-lead-scoring mt-4 p-4 glass-teal text-center rounded">
                <MessageSquare size={32} className="icon-navy mx-auto mb-2" />
                <h4>Need Immediate Answers?</h4>
                <p className="text-sm">Try our AI Assistant in the bottom right corner for instant support.</p>
              </div>
            </motion.div>

            {/* Contact Form or Thank You Message */}
            <motion.div 
              className="contact-form-wrapper shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {!isSubmitted ? (
                <>
                  <h2>Send a Message</h2>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="service">Interested Service</label>
                      <select 
                        id="service" 
                        name="service" 
                        value={formData.service} 
                        onChange={handleChange}
                      >
                        {servicesData.map((service) => (
                          <option key={service.id} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                        <option value="Other">Other (Not Listed)</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                        rows="5"
                        placeholder="Tell us about your project..."
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="btn-primary large w-100">
                      Submit Request <Send size={18} />
                    </button>
                  </form>
                </>
              ) : (
                <motion.div 
                  className="thank-you-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="success-icon-wrapper">
                    <CheckCircle2 size={64} className="icon-teal" />
                  </div>
                  <h2>Thank You!</h2>
                  <p>Your message has been received successfully. Our team will review your request and get back to you within 24 hours.</p>
                  <button 
                    className="btn-outline mt-4" 
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        {/* Placeholder for Google Map */}
        <div className="map-placeholder">
          <div className="map-overlay-card">
            <div className="location-marker"></div>
            <h3>Our Global Headquarters</h3>
            <p>123 Innovation Way, Tech City</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
