import React from 'react';
import { 
  Code, Globe, Cpu, Palette, Video, BrainCircuit
} from 'lucide-react';

// Local high-fidelity generated service graphics
import service3dWebsite from '../assets/service-3d-website.png';
import serviceAiFilm from '../assets/service-ai-film.png';
import serviceAutomation from '../assets/service-automation.png';
import servicePosterDesign from '../assets/service-poster-design.png';
import serviceVideoMarketing from '../assets/service-video-marketing.png';

export const servicesData = [
  { 
    id: '3d-animated-website',
    title: '3D Animated Website', 
    icon: <Globe size={32} />, 
    image: service3dWebsite,
    desc: 'Immersive, high-performance web experiences utilizing 3D animations and interactive Spline/WebGL elements.', 
    features: ['Interactive 3D WebGL & Spline', 'Fluid Scroll-Driven Animations', 'Vibrant Glassmorphism Design', 'Interactive Mascot Companions', 'Responsive 3D Canvas Layouts', 'Three.js & Framer Motion Mastery'],
    longDesc: 'At True Twist, we bridge the gap between imagination and web technology by engineering fully immersive 3D animated websites. By combining Three.js, WebGL, Spline, and advanced scroll-driven physics engine logic, we turn standard static pages into a gamified, interactive journey that commands attention. We prioritize low-latency asset compression and responsive container scaling so that your spectacular 3D experiences load instantly and render flawlessly on every screen, from high-end desktop monitors to standard mobile viewports.'
  },
  { 
    id: 'ai-short-film',
    title: 'AI Short Film', 
    icon: <BrainCircuit size={32} />, 
    image: serviceAiFilm,
    desc: 'Cinematic storytelling powered by advanced Generative AI pipelines and professional post-production.', 
    features: ['Generative AI Concept Art', 'AI Video Generation & Prompting', 'Advanced Post-Production & Color', 'High-Fidelity Audio & Sound Design', 'Immersive Storyboard Animation', 'Prompt Engineering Excellence'],
    longDesc: 'Unleash the full power of prompt-driven cinematography with our AI Short Film production service. We utilize state-of-the-art generative artificial intelligence models (such as Sora, Runway Gen-2, and Midjourney) combined with traditional film editing and color grading mastery to produce highly emotional, cinematic, and photorealistic short films. From conceptual storyboard prototyping to custom sound orchestration, we deliver modern cinematic visual narratives in a fraction of traditional production times.'
  },
  { 
    id: 'marketing-automation',
    title: 'Marketing Automation', 
    icon: <Cpu size={32} />, 
    image: serviceAutomation,
    desc: 'Streamline your customer acquisition with intelligent email funnels, automated workflows, and CRM syncing.', 
    features: ['Intelligent Email Funnels', 'Automated Lead Nurturing', 'CRM Synchronization & Workflows', 'Customer Journey Tracking', 'Automated Social Media Blasts', 'Comprehensive ROI Dashboards'],
    longDesc: 'Accelerate your revenue engine with our custom-engineered Marketing Automation workflows. We help businesses eliminate manual repetitive tasks by setting up intelligent, event-triggered customer journeys that nurture leads on autopilot. By seamlessly connecting your ad campaigns, landing pages, email software, and internal CRM systems, we create a unified marketing pipeline that scores leads, triggers personalized follow-ups, and delivers real-time conversion metrics to your sales dashboard.'
  },
  { 
    id: 'website-poster-designing',
    title: 'Website & Poster Designing', 
    icon: <Palette size={32} />, 
    image: servicePosterDesign,
    desc: 'Premium graphic layouts, high-converting website designs, and jaw-dropping print/digital brand posters.', 
    features: ['Custom High-Fidelity UI/UX', 'Jaw-Dropping Digital Posters', 'Scaleable Branding Systems', 'Social Media Visual Toolkits', 'Print-Ready Commercial Art', 'Figma Wireframing & Prototyping'],
    longDesc: 'Stunning visual identity is the primary pillar of modern brand credibility. Our Website & Poster Designing service fuses high-end UX wireframing with bold, contemporary graphic design principles. We create custom, borderless website UI layouts that feel premium and modern, as well as captivating print and digital posters that communicate your key message at a single glance. Every pixel, typography pairing, and color harmony is tailored to command attention and drive interaction.'
  },
  { 
    id: 'video-story-marketing',
    title: 'Video Story Marketing', 
    icon: <Video size={32} />, 
    image: serviceVideoMarketing,
    desc: 'Engaging, vertical-format video narratives and cinematic social stories tailored for maximum viral engagement.', 
    features: ['Vertical Short-Form Stories', 'Cinematic Social Media Reels', 'High-Retention Video Hooks', 'Professional Scriptwriting', 'Trendy Transitions & Audio Sync', 'Viral Analytics & Growth Audits'],
    longDesc: 'Capture modern attention spans with high-retention video stories designed specifically for social media feeds. We produce engaging, premium short-form vertical videos (Reels, TikToks, YouTube Shorts, and Instagram Stories) that tell a compelling story in under 60 seconds. Our strategy focuses on hook optimization, trendy transitions, and high-impact subtitle pacing to make sure your audience stops scrolling, watches to the end, and takes action.'
  }
];
