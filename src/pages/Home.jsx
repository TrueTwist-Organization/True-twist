import React, { useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, motionValue } from 'framer-motion';
import { ArrowRight, Code, Globe, Smartphone, Layout, Cpu, Cloud, ShieldCheck, LayoutTemplate, CheckCircle2, Settings, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { blogPosts as initialBlogs } from '../data/blogData';
import { defaultReviews } from '../data/reviewData';
import { SplineScene } from '../components/ui/splite';
import { CardStack } from '../components/ui/CardStack';
import { InsightsDialogGrid } from '../components/ui/insights-dialog-grid';
import { CircularTestimonialsDemo } from '../components/ui/CircularTestimonialsDemo';
import { ServicesArcAnimation } from '../components/ui/ServicesArcAnimation';
import { ScrollRobot } from '../components/ui/ScrollRobot';
import teamInnovators3DImage from '../assets/team-innovators.png';
import { CyberGridBackground } from '../components/ui/CyberGridBackground';
import { AnimatedHeading } from '../components/ui/AnimatedHeading';
import { FloatingPaths } from '../components/ui/FloatingPaths';
import robotMascot from '../assets/hero-robot-orange-black.png';
import roboticHand from '../assets/robotic-hand.jpeg';
import { HERO_SPLINE_SCENE } from '../constants/splineScenes';
import { AnimatedText } from '../components/ui/animated-shiny-text';
import { ThreeDText } from '../components/ui/ThreeDText';

const REVIEWS_STORAGE_KEY = 'tt_reviews_v12';
const DEFAULT_REVIEW_POSTER =
  'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=1000&auto=format&fit=crop';

function loadReviewsFromStorage() {
  const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
  if (!saved) return defaultReviews;
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultReviews;
  } catch {
    return defaultReviews;
  }
}

const StatCounter = ({ end, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const endNum = parseInt(end.replace(/\D/g, ''));

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * endNum));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    text: 'Fast, responsive & SEO-friendly websites that perform.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop',
    icon: <Globe size={24} />
  },
  {
    id: 'uiux-design',
    title: 'UI/UX Design',
    text: 'Beautiful, intuitive designs that enhance user experience.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop',
    icon: <Layout size={24} />
  },
  {
    id: 'software-development',
    title: 'Software Development',
    text: 'Custom software solutions built for your unique needs.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    icon: <Code size={24} />
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    text: 'Native & cross-platform apps for iOS & Android.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    icon: <Smartphone size={24} />
  },
  {
    id: 'cms-development',
    title: 'CMS Development',
    text: 'Powerful CMS solutions like WordPress, Shopify & more.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    icon: <LayoutTemplate size={24} />
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    text: 'Intelligent automation to streamline your workflows.',
    image: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=800&auto=format&fit=crop',
    icon: <Cpu size={24} />
  },
  {
    id: 'cloud-hosting',
    title: 'Cloud & Hosting',
    text: 'Secure, scalable cloud infrastructure & hosting.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    icon: <Cloud size={24} />
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [latestBlogs, setLatestBlogs] = useState(() => {
    const saved = localStorage.getItem('tt_blogs_v9');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const filtered = Array.isArray(parsed) ? parsed.filter(b => b.status === 'Published') : [];
        return filtered.length > 0 ? filtered.slice(0, 3) : initialBlogs.slice(0, 3);
      } catch (e) {
        return initialBlogs.slice(0, 3);
      }
    }
    return initialBlogs.slice(0, 3);
  });

  useEffect(() => {
    const syncLatest = () => {
      const saved = localStorage.getItem('tt_blogs_v9');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setLatestBlogs(parsed.filter(b => b.status === 'Published').slice(0, 3));
          }
        } catch (e) { }
      }
    };
    window.addEventListener('storage', syncLatest);
    window.addEventListener('focus', syncLatest);
    return () => {
      window.removeEventListener('storage', syncLatest);
      window.removeEventListener('focus', syncLatest);
    };
  }, []);

  const [reviewsRaw, setReviewsRaw] = useState(loadReviewsFromStorage);

  useEffect(() => {
    const syncReviews = () => {
      setReviewsRaw(loadReviewsFromStorage());
    };
    window.addEventListener('storage', syncReviews);
    window.addEventListener('focus', syncReviews);
    return () => {
      window.removeEventListener('storage', syncReviews);
      window.removeEventListener('focus', syncReviews);
    };
  }, []);

  const publishedTestimonials = useMemo(() => {
    const published = reviewsRaw.filter((r) => r && r.status === 'Published');
    const seenPosters = new Set();
    return published.map((r) => {
      let poster = r.poster || DEFAULT_REVIEW_POSTER;
      if (seenPosters.has(poster)) {
        const sep = poster.includes('?') ? '&' : '?';
        poster = `${poster}${sep}sig=${encodeURIComponent(String(r.id))}`;
      }
      seenPosters.add(poster);
      return {
        id: r.id,
        name: r.name,
        company: r.company,
        text: r.text,
        rating: Math.min(5, Math.max(0, Number(r.rating) || 5)),
        poster,
      };
    });
  }, [reviewsRaw]);

  const serviceCardItems = useMemo(
    () =>
      services.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.text,
        imageSrc: s.image,
        href: `/services/${s.id}`,
        icon: s.icon
      })),
    [],
  );

  const insightItems = useMemo(
    () =>
      latestBlogs.map((post) => ({
        id: post.id,
        url: { src: post.image },
        title: post.title,
        description: post.excerpt ?? '',
        tags: post.category ? [post.category] : [],
        blogHref: `/blog/${post.id}`,
      })),
    [latestBlogs],
  );

  const mouseX = motionValue(0);
  const mouseY = motionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };
  const moveX = useSpring(useTransform(mouseX, [-400, 400], [-15, 15]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [-400, 400], [-15, 15]), springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  return (
    <div className="home-page" onMouseMove={handleMouseMove}>
      <div className="home-flowing-energy" aria-hidden />
      <motion.div
        className="hero-mouse-glow"
        style={{
          left: useTransform(mouseX, (val) => val + window.innerWidth / 2),
          top: useTransform(mouseY, (val) => val + window.innerHeight / 2)
        }}
      />

      {/* Scroll-Driven Robot Companion */}
      <ScrollRobot />

      <section className="hero">
        <div className="hero-energy-streaks">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`hero-energy-streak hero-energy-streak--${i + 1}`} />
          ))}
        </div>
        <motion.div className="container hero-content hero-content--split" style={{ x: moveX, y: moveY }}>
          <motion.div
            className="hero-text"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.14, delayChildren: 0.08 },
              },
            }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: -16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}>
              <span className="badge hero-badge hero-badge--scale">
                <span className="hero-badge-dot" aria-hidden />
                NEXT-GEN IT SOLUTIONS
              </span>
            </motion.div>

            <motion.div
              className="hero-title-container relative"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.03, delayChildren: 0.4 }
                },
              }}
            >
              <h1 className="hero-title-ref">
                {"AI-Powered ".split("").map((char, i) => (
                  <motion.span
                    key={`p1-${i}`}
                    variants={{
                      hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                <motion.span
                  className="hero-it-accent inline-block"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
                    visible: { opacity: 1, scale: 1, rotate: 0 }
                  }}
                  transition={{ duration: 0.5 }}
                >
                  IT
                </motion.span>
                {" Solutions".split("").map((char, i) => (
                  <motion.span
                    key={`p2-${i}`}
                    variants={{
                      hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                <br />
                {"for the Future".split("").map((char, i) => (
                  <motion.span
                    key={`p3-${i}`}
                    variants={{
                      hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>
              <motion.div
                className="hero-title-underline"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.8, ease: "easeInOut" }}
                style={{
                  height: '4px',
                  background: 'linear-gradient(90deg, #ea580c, #f97316)',
                  width: '100%',
                  transformOrigin: 'left',
                  marginTop: '10px',
                  borderRadius: '2px',
                  boxShadow: '0 0 15px rgba(234, 88, 12, 0.4)'
                }}
              />
            </motion.div>

            <motion.p
              className="hero-lead"
              variants={{
                hidden: { opacity: 0, x: -22 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: 'easeOut' } },
              }}
            >
              We build smart, scalable and secure digital products using AI,
              Cloud and next-generation technologies to drive innovation and business growth.
            </motion.p>

            <motion.div
              className="hero-btns"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <Link to="/contact" className="btn-primary hero-cta-primary-glow hero-btn-shimmer">
                Let&apos;s Build Future <ArrowRight size={18} />
              </Link>
              <Link to="/portfolio" className="btn-outline hero-cta-glass">
                View Our Work
              </Link>
            </motion.div>

            <motion.div
              className="hero-stats--premium"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.15 } },
              }}
            >
              {[
                { value: '300+', label: 'Projects Delivered', end: '300', suffix: '+' },
                { value: '98%', label: 'Client Satisfaction', end: '98', suffix: '%' },
                { value: '15+', label: 'Countries Served', end: '15', suffix: '+' },
                { value: '24/7', label: 'Support', end: '24', suffix: '/7' },
              ].map(({ value, label, end, suffix }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <div className="hero-stat-divider" aria-hidden />}
                  <div className="hero-stat hero-stat--premium">
                    <div className="hero-stat-value">
                      <StatCounter end={end} suffix={suffix} />
                    </div>
                    <div className="hero-stat-label">{label}</div>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>

          <div className="hero-spline-wrap" aria-label="Interactive 3D scene">
            <div className="hero-spline-rim" aria-hidden />
            <motion.div
              className="hero-robot-container"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img src={robotMascot} alt="AI Robot Mascot" className="hero-robot-image-pedestal" />
              <div className="hero-robot-glow" />
            </motion.div>

            {/* Floating Info Panels */}
            <motion.div
              className="hero-floating-panel panel-analytics"
              initial={{ opacity: 0, y: -300, x: -300, rotate: -720, scale: 0 }}
              animate={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 1.5, type: 'spring', bounce: 0.4 }}
            >
              <div className="panel-edge-dot topleft"></div>
              <div className="panel-edge-dot topright"></div>
              <div className="panel-edge-dot bottomleft"></div>
              <div className="panel-edge-dot bottomright"></div>
              <div className="panel-label">AI ANALYTICS</div>
              <div className="panel-graph-complex">
                <svg viewBox="0 0 200 80" className="chart-line-svg">
                  <path d="M0,70 L20,60 L40,65 L60,40 L80,50 L100,20 L120,30 L140,10 L160,25 L180,5 L200,15" fill="none" stroke="var(--accent-secondary)" strokeWidth="1.5" />
                  <circle cx="140" cy="10" r="3" fill="var(--accent-secondary)" className="glow-dot" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              className="hero-floating-panel panel-cloud"
              initial={{ opacity: 0, y: 300, x: -300, rotate: 720, scale: 0 }}
              animate={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 1.5, type: 'spring', bounce: 0.4 }}
            >
              <div className="panel-edge-dot topleft"></div>
              <div className="panel-edge-dot topright"></div>
              <div className="panel-edge-dot bottomleft"></div>
              <div className="panel-edge-dot bottomright"></div>
              <div className="panel-icon-wrap"><Cloud strokeWidth={1.5} size={22} /></div>
              <div className="panel-content">
                <span className="panel-title">CLOUD</span>
                <span className="panel-subtitle">SOLUTIONS</span>
              </div>
            </motion.div>

            <motion.div
              className="hero-floating-panel panel-automation"
              initial={{ opacity: 0, y: 300, x: 300, rotate: -720, scale: 0 }}
              animate={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
              transition={{ delay: 1.0, duration: 1.5, type: 'spring', bounce: 0.4 }}
            >
              <div className="panel-edge-dot topleft"></div>
              <div className="panel-edge-dot topright"></div>
              <div className="panel-edge-dot bottomleft"></div>
              <div className="panel-edge-dot bottomright"></div>
              <div className="panel-icon-wrap"><Settings strokeWidth={1.5} size={20} /></div>
              <span className="panel-text">AUTOMATION</span>
            </motion.div>

            <motion.div
              className="hero-floating-panel panel-secure"
              initial={{ opacity: 0, y: -300, x: 300, rotate: 720, scale: 0 }}
              animate={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 1.5, type: 'spring', bounce: 0.4 }}
            >
              <div className="panel-edge-dot topleft"></div>
              <div className="panel-edge-dot topright"></div>
              <div className="panel-edge-dot bottomleft"></div>
              <div className="panel-edge-dot bottomright"></div>
              <div className="panel-content text-right">
                <span className="panel-title">SECURE &</span>
                <span className="panel-title">SCALABLE</span>
              </div>
              <div className="panel-icon-wrap shield-icon-wrap">
                <ShieldCheck strokeWidth={1.5} size={24} />
                <Lock size={10} className="shield-lock-inner" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Highlight */}
      <section className="services-summary py-20">
        <div className="container">
          <div className="section-header text-center mb-16">
            <p className="section-subtitle">End-to-end digital solutions tailored to your business needs.</p>
            <AnimatedHeading 
              text="Our Specialized Services" 
              highlightText="Services"
              className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            />
          </div>
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <CardStack
              items={serviceCardItems}
              loop
              autoAdvance
              intervalMs={2400}
              pauseOnHover
              showDots
              cardWidth={380}
              cardHeight={240}
              onActiveCardActivate={(item) => {
                if (item.href) navigate(item.href);
              }}
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="home-team py-20 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <AnimatedHeading 
              text="Meet the Innovators" 
              highlightText="Innovators"
              className="text-4xl md:text-6xl font-bold text-white tracking-tight"
            />
          </div>
          <div className="home-team-featured">
            <motion.div
              className="home-team-copy"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65 }}
            >
              <p className="text-lg text-stone-300 leading-relaxed mb-8">
                Engineers, designers, and strategists working as one crew — shipping reliable products with clarity and momentum.
              </p>
              <Link to="/team" className="btn-outline home-team-cta-outline">
                Learn More <ArrowRight size={18} aria-hidden />
              </Link>
            </motion.div>
            <motion.div
              className="home-team-art"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: 0.08 }}
              aria-hidden
            >
              <div className="home-team-art__glow" />
              <img src={teamInnovators3DImage} alt="3D Innovators Team" className="home-team-art__image" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Client Reviews (Circular Testimonials) --- */}
      <section id="testimonials" className="testimonials-section py-24 relative overflow-hidden bg-[#0a0a0b]">
        <div className="container relative z-10">
          <div className="section-header text-center mb-16">
            <span className="badge mb-4">TESTIMONIALS</span>
            <AnimatedHeading 
              text="Our Strategic Solutions" 
              highlightText="Solutions"
              className="text-4xl md:text-6xl font-bold text-white tracking-tight"
            />
            <p className="text-stone-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
              What partners say after shipping with us.
            </p>
          </div>

          <div className="flex justify-center">
            <CircularTestimonialsDemo />
          </div>
        </div>
      </section>


      {/* --- Latest Insights Section (3D Arc Animation) --- */}
      <section id="insights" className="latest-insights py-12 relative bg-[#0a0a0b]" style={{ background: 'radial-gradient(ellipse at bottom, rgba(234, 88, 12, 0.1), transparent 60%)' }}>
        <div className="container relative z-10">
          <div className="section-header text-center mb-8">
            <span className="badge mb-3">KNOWLEDGE BASE</span>
            <AnimatedHeading 
              text="Latest Insights" 
              highlightText="Insights"
              className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            />
            <p className="text-stone-400 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
              Thoughts, strategies, and deep-dives on building next-gen software.
            </p>
          </div>
 
          <InsightsDialogGrid items={insightItems} />
 
          <div className="text-center mt-10">
            <Link to="/blog" className="btn-premium-outline">Explore Full Knowledge Base <ArrowRight size={18} className="inline ml-2" /></Link>
          </div>
        </div>
      </section>

      {/* Market CTA */}
      <section className="home-market-cta">
        <div className="container home-market-cta-inner">
          <div className="home-market-cta-visual" aria-hidden>
            <div className="home-market-cta-visual-glow" />
            <div
              className="home-market-cta-visual-img"
              style={{
                backgroundImage: `url(${roboticHand})`,
              }}
            />
          </div>
          <div className="home-market-cta-copy">
            <ThreeDText
              text="How are AI-empowered systems shaping tomorrow's markets?"
              highlightWords={["AI-empowered systems", "tomorrow's markets?"]}
              className="mb-8"
            />
            <ul className="home-market-checklist home-market-checklist--two-col">
              {[
                'Intelligent automation across sales, support, and operations',
                'Smarter decision-making with live analytics and forecasting',
                'Elastic cloud foundations with observability built in',
                'Customer experiences that feel personal at enterprise scale',
                'Security, privacy, and compliance without slowing releases',
                'Partners who iterate with you after go-live',
              ].map((line) => (
                <li key={line}>
                  <CheckCircle2 size={22} className="home-market-check-icon" strokeWidth={2} aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-primary large">
              Start Your Project Today <ArrowRight size={22} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
