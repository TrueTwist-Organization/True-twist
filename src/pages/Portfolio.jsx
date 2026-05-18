import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThreeDHelixPortfolio } from '../components/ui/ThreeDHelixPortfolio';
import './Portfolio.css';

const defaultProjects = [
  { id: 1, title: 'AI Neural Core', category: 'AI', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop', desc: 'Advanced neural network processing system for real-time analytics.' },
  { id: 2, title: 'Quantum SaaS', category: 'Web', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop', desc: 'Enterprise-grade cloud platform with quantum-encrypted security.' },
  { id: 3, title: 'SwiftPay Mobile', category: 'Mobile', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop', desc: 'Next-gen fintech mobile application with biometric authentication.' },
  { id: 4, title: 'RoboLogistics', category: 'Software', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop', desc: 'Autonomous warehouse management system using multi-agent AI.' },
  { id: 5, title: 'Aether Design', category: 'UI/UX', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2070&auto=format&fit=crop', desc: 'High-fidelity design system for a global aerospace corporation.' },
  { id: 6, title: 'BioScan Pro', category: 'Software', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop', desc: 'Medical diagnostics platform with AI-assisted imaging analysis.' },
  { id: 7, title: 'CyberGuard OS', category: 'Software', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', desc: 'Military-grade cybersecurity operating system for secure facilities.' }
];

const categories = ['All', 'Web', 'Mobile', 'Software', 'AI', 'UI/UX'];

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]);

  React.useEffect(() => {
    const saved = localStorage.getItem('tt_portfolio_v2');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        setProjects(defaultProjects);
      }
    } else {
      setProjects(defaultProjects);
    }
  }, []);

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="portfolio-page">

      {/* 3D Helix Portfolio Carousel */}
      <ThreeDHelixPortfolio projects={filteredProjects} />

      {/* Testimonials */}
      <section className="testimonials py-24 bg-[#0a0a0b] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="container relative z-10">
          <div className="section-title text-center mb-16">
            <span className="badge mb-4">REVIEWS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Partner <span className="highlight">Testimonials</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Monil Patel",
                role: "Director of Operations",
                text: "True Twist transformed our digital operations. Their AI expertise helped us cut processing time significantly while improving overall efficiency."
              },
              {
                name: "Shubham Sharma",
                role: "CTO, FinTech Solutions",
                text: "The web infrastructure delivered by True Twist is top-notch. Our platform speed improved by 60%, and the user feedback has been overwhelming."
              }
            ].map((client, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="testim-card bg-white/5 backdrop-blur-md p-12 rounded-[40px] border border-white/10 hover:border-orange-500/20 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Star size={80} className="text-orange-500" />
                </div>
                <div className="stars flex gap-1 mb-8">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} className="text-orange-500 fill-orange-500" />)}
                </div>
                <p className="text-stone-200 text-xl italic leading-relaxed mb-10 relative z-10">"{client.text}"</p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20">
                    {client.name[0]}
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-bold">{client.name}</h4>
                    <span className="text-orange-500 text-xs font-black uppercase tracking-widest">{client.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
