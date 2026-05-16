import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Star } from 'lucide-react';
import './Team.css';
import priyankaImg from '../assets/priyanka.jpg';
import arjunImg from '../assets/arjun.jpg';

const teamMembers = [
  { 
    name: "Rohan Sharma", 
    role: "CEO & Founder", 
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2000&auto=format&fit=crop",
    bio: "Visionary leader with 15+ years in disruptive tech and enterprise architecture."
  },
  { 
    name: "Krishna Joshi", 
    role: "CTO", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop",
    bio: "Architecture specialist focused on scalable cloud systems and neural networks."
  },
  { 
    name: "Vikram Thakor", 
    role: "Head of AI", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop",
    bio: "Former research lead at top-tier AI labs, specializing in predictive modeling."
  },
  { 
    name: "Priyanka Singh", 
    role: "Design Director", 
    image: priyankaImg,
    bio: "Award-winning UX architect dedicated to human-centric digital experiences."
  },
  { 
    name: "Arjun Mehta", 
    role: "Operations Lead", 
    image: arjunImg,
    bio: "Expert in agile methodologies and streamlining complex delivery frameworks."
  },
  { 
    name: "Neha Rajput", 
    role: "Security Lead", 
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2000&auto=format&fit=crop",
    bio: "Cybersecurity veteran ensuring zero-trust architecture across all platforms."
  }
];

const Team = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="team-page">
      {/* Hero Header */}
      <section className="team-hero">
        <div className="container">
          <motion.div 
            className="team-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="badge teal">Human Intelligence</span>
            <h1>The Minds Behind <span className="highlight">True Twist</span></h1>
            <p className="lead">Meet the architects, dreamers, and engineers building the next generation of digital excellence.</p>
          </motion.div>
        </div>
        <div className="neural-overlay"></div>
      </section>

      {/* Main Grid */}
      <section className="team-main py-20">
        <div className="container">
          <div className="team-page-grid">
            {teamMembers.map((member, i) => (
              <motion.div 
                key={i} 
                className="member-detail-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="member-image-outer">
                  <img src={member.image} alt={member.name} />

                </div>
                <div className="member-card-body">
                  <h3>{member.name}</h3>
                  <span className="member-role">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values/Culture Section */}
      <section className="team-culture">
        <div className="container culture-flex">
          <div className="culture-text">
            <h2>Our <span className="highlight">DNA</span> & Culture</h2>
            <p>We don't just hire for skills; we hire for a "Twist"—that unique ability to see complexity and find the elegant solution hidden within.</p>
            <div className="culture-points">
              <div className="c-point">
                <Star className="icon-teal" size={24} />
                <div>
                  <h4>Passion First</h4>
                  <p>We love what we build as much as how we build it.</p>
                </div>
              </div>
              <div className="c-point">
                <Award className="icon-teal" size={24} />
                <div>
                  <h4>Excellence Always</h4>
                  <p>We set the standard, then we break it.</p>
                </div>
              </div>
              <div className="c-point">
                <Users className="icon-teal" size={24} />
                <div>
                  <h4>Radical Collaboration</h4>
                  <p>No silos. Just pure collective intelligence.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="culture-img">
            <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop" alt="Team Culture" />
            <div className="img-glow"></div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Team;
