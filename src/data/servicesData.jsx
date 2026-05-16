import React from 'react';
import { 
  Code, Globe, Smartphone, Layout, Cpu, Database, 
  Cloud, ShieldCheck, ShoppingCart, Plug, BrainCircuit, 
  BarChart3, Wifi, Palette, PenTool, Video, FileCode, CheckCircle2
} from 'lucide-react';

export const servicesData = [
  { 
    id: 'software-development',
    title: 'Software Development', 
    icon: <Code size={32} />, 
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    desc: 'Custom enterprise software solutions tailored to your unique business processes.', 
    features: ['Custom CRM/ERP Systems', 'Legacy System Modernization', 'Enterprise Grade Portals', 'Scalable SaaS Products', 'Bespoke Business Logic', 'Microservices Architecture'],
    longDesc: 'At True Twist, our software development methodology is built on a foundation of reliability, scalability, and security. We specialize in creating custom enterprise software that addresses complex business challenges. From modernizing legacy systems to building massive SaaS platforms, our team of expert developers uses industry-best practices to deliver code that is clean, efficient, and future-proof. We focus on creating deep integrations with your existing workflows to ensure technology acts as a catalyst for your growth, not a bottleneck.'
  },
  { 
    id: 'web-development',
    title: 'Web Development', 
    icon: <Globe size={32} />, 
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    desc: 'High-performance, scalable web applications built with modern frameworks.', 
    features: ['Next.js / React Applications', 'High-Conversion E-Commerce', 'Progressive Web Apps (PWA)', 'Headless CMS Integration', 'SEO-Optimized Architectures', 'Real-time Web Features'],
    longDesc: 'Digital presence is the face of modern business. Our web development services go beyond just "building a website." We engineer high-performance web applications that provide lightning-fast user experiences. By leveraging the latest technologies like React, Next.js, and Node.js, we ensure your site is not only visually stunning but also technically superior. We prioritize mobile-first design, Core Web Vitals, and robust security protocols to ensure your users stay engaged and your data remains protected.'
  },
  { 
    id: 'mobile-app-development',
    title: 'Mobile App Development', 
    icon: <Smartphone size={32} />, 
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
    desc: 'Engaging native and cross-platform mobile experiences for iOS and Android.', 
    features: ['Hybrid React Native / Flutter', 'Native iOS (Swift/SwiftUI)', 'Native Android (Kotlin/Jetpack)', 'Offline-First Functionality', 'Mobile UX/UI Design', 'App Store Optimization & Deployment'],
    longDesc: 'In an increasingly mobile-centric world, having a standout app is essential. Our mobile development team creates immersive experiences that live natively on iOS and Android. Whether you need a high-performance native app or a versatile cross-platform solution, we deliver apps with smooth animations, intuitive navigation, and robust backend integrations. We handle the entire lifecycle—from conceptualization and design to testing and deployment on the App Store and Play Store.'
  },
  { 
    id: 'cms-development',
    title: 'CMS Development', 
    icon: <FileCode size={32} />, 
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
    desc: 'Powerful content management systems that give you full control over your digital content.', 
    features: ['Custom WordPress Themes', 'Headless CMS (Strapi/Sanity)', 'Enterprise Drupal Solutions', 'Content Authoring Workflows', 'Multi-Language Support', 'Role-Based Access Control'],
    longDesc: 'Our CMS development services are designed to put the power back in the hands of your content creators. We build flexible, intuitive platforms that allow your team to manage complex digital assets without needing constant developer intervention. Whether it’s a high-traffic WordPress news site or a modern headless architecture for a multi-platform app, we ensure your CMS is fast, secure, and perfectly tailored to your internal editorial workflows. We focus on scalability and ease-of-use, ensuring your content can reach your audience across any channel instantly.'
  },
  { 
    id: 'e-commerce-solutions',
    title: 'E-Commerce Solutions', 
    icon: <ShoppingCart size={32} />, 
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
    desc: 'End-to-end e-commerce platforms that drive sales and deliver seamless shopping experiences.', 
    features: ['Shopify Plus & Magento Experts', 'Custom Marketplace Architectures', 'Advanced Inventory Sync', 'Multi-Currency & Global Logistics', 'Mobile Commerce (mCommerce)', 'Conversion Rate Optimization (CRO)'],
    longDesc: 'Building a successful online store requires more than just a product listing. Our E-Commerce solutions provide you with a comprehensive selling engine. We build highly scalable platforms that handle peak traffic spikes during sales, integrate seamlessly with global payment gateways, and automate your back-office operations like inventory and order management. From custom multi-vendor marketplaces to high-conversion Shopify stores, we ensure your digital storefront is optimized for speed, security, and maximum sales throughput.'
  },
  { 
    id: 'api-development',
    title: 'API Development & Integration', 
    icon: <Plug size={32} />, 
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
    desc: 'Robust, secure APIs that connect your systems and enable seamless data exchange.', 
    features: ['REST & GraphQL Design', 'Microservices Orchestration', 'Third-Party SaaS Integration', 'High-Performance Middleware', 'API Documentation (Swagger)', 'JWT & OAuth Security'],
    longDesc: 'APIs are the glue of the modern digital world. At True Twist, we design and implement high-concurrency APIs that serve as the backbone for your mobile and web applications. We prioritize security with industry-standard protocols and ensure your APIs are highly discoverable and well-documented. Whether you need to connect legacy on-premise systems with modern cloud apps or build a public-facing API for your partners, our engineering team ensures that your data flows securely, reliably, and with minimal latency.'
  },
  { 
    id: 'ai-solutions-automation',
    title: 'AI Solutions & Automation', 
    icon: <Cpu size={32} />, 
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2000&auto=format&fit=crop',
    desc: 'Leveraging Artificial Intelligence to automate tasks and unlock data insights.', 
    features: ['Custom Machine Learning Models', 'Advanced NLP & Chatbots', 'Predictive Business Analytics', 'Computer Vision Solutions', 'Robotic Process Automation (RPA)', 'Automated Decision Systems'],
    longDesc: 'The future is autonomous, and we help you get there today. Our AI and Automation services are designed to turn your data into a powerful decision-making engine. We build custom machine learning models that predict market trends, automate repetitive customer service tasks with advanced NLP, and use computer vision for complex visual audits. By integrating intelligence into your core operations, we help you reduce costs, eliminate human error, and gain deep, actionable insights from your historical data.'
  },
  { 
    id: 'ai-integration',
    title: 'AI Integration', 
    icon: <BrainCircuit size={32} />, 
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
    desc: 'Seamlessly integrate AI capabilities into your existing products and workflows.', 
    features: ['OpenAI / LLM Integration', 'AI-Powered Search', 'Recommendation Engines', 'Intelligent Automation'],
    longDesc: 'Make your products smarter by integrating existing AI models like GPT-4 or DALL-E. We specialize in adding LLM capabilities, intelligent search, and personalized recommendations to any application.'
  },
  { 
    id: 'cloud-hosting',
    title: 'Cloud & Hosting', 
    icon: <Cloud size={32} />, 
    image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop',
    desc: 'Secure, scalable cloud infrastructure design and ongoing management.', 
    features: ['Multi-Cloud (AWS/Azure/GCP)', 'Automated DevOps Pipelines', 'Serverless Architecture Design', 'Disaster Recovery & Backup', 'Kubernetes Orchestration', 'Cost Optimization & Audits'],
    longDesc: 'Our Cloud and Hosting services ensure your digital infrastructure is bulletproof. We don\'t just host apps; we build elastic environments that scale automatically with your traffic. By implementing advanced DevOps practices and CI/CD pipelines, we reduce your time-to-market and improve deployment reliability. Our certified architects design multi-cloud strategies that ensure zero downtime, while our continuous cost optimization audits keep your cloud spending efficient and predictable.'
  },
  { 
    id: 'data-analytics',
    title: 'Data Science & Analytics', 
    icon: <BarChart3 size={32} />, 
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2070&auto=format&fit=crop',
    desc: 'Transform raw data into actionable business insights with powerful analytics solutions.', 
    features: ['Custom Data Warehousing', 'Power BI & Tableau Dashboards', 'Big Data Processing (Hadoop)', 'ETL Pipeline Automation', 'Predictive Modeling', 'Customer Behavior Analysis'],
    longDesc: 'Data is the new oil, but only if you can refine it. Our Data Science and Analytics services help you extract hidden patterns from your raw business data. We build sophisticated ETL pipelines to centralize your information and create interactive dashboards that give you a 360-degree view of your operations. Whether you need to predict customer churn, optimize your pricing strategy, or simply understand your monthly performance better, our data engineers provide you with the tools to make data-driven decisions that actually impact your bottom line.'
  },
  { 
    id: 'iot-solutions',
    title: 'IoT Solutions', 
    icon: <Wifi size={32} />, 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    desc: 'Connect physical devices to digital ecosystems for smarter operations and monitoring.', 
    features: ['Embedded Systems & Firmware', 'Real-time Telemetry Dashboards', 'Hardware Prototyping', 'Industrial IoT Protocols (MQTT)', 'OTA Update Systems', 'Edge Computing Analytics'],
    longDesc: 'Our IoT solutions bridge the physical and digital worlds, providing you with real-time visibility into your hardware assets. We handle the entire engineering stack, from custom firmware development and sensor selection to cloud-based monitoring platforms and edge processing. We specialize in industrial automation, smart building systems, and consumer-facing smart products. By leveraging low-latency communication protocols, we ensure your IoT infrastructure provides actionable data that can optimize your supply chain or improve user engagement.'
  },
  { 
    id: 'uiux-design',
    title: 'UI/UX Design', 
    icon: <Layout size={32} />, 
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=2000&auto=format&fit=crop',
    desc: 'User-centric designs that deliver intuitive and exceptional digital experiences.', 
    features: ['High-Fidelity Prototyping', 'Deep User Persona Research', 'Scalable Design Systems', 'Comprehensive Usability Audits', 'Interaction Design & Micro-animations', 'Accessibility Compliance (WCAG)'],
    longDesc: 'Design is not just about aesthetics; it\'s about how it works. Our UI/UX philosophy is centered on the user. We conduct extensive research and heat-map analysis to uncover how people interact with your product. From low-fidelity wireframes to polished high-fidelity prototypes, we iterate quickly to find the perfect flow. We create comprehensive design systems that ensure brand consistency across all platforms and implement delightful micro-animations that make your digital products feel alive and responsive.'
  },
  { 
    id: 'product-design',
    title: 'Product Design', 
    icon: <PenTool size={32} />, 
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2070&auto=format&fit=crop',
    desc: 'Strategic product design that balances user needs with business goals for market success.', 
    features: ['Product Strategy', 'MVP Design', 'Interaction Design', 'Design Sprints'],
    longDesc: 'We help you design products that win in the market. From strategy to MVP development, we focus on creating products that solve real problems for your target audience.'
  },
  { 
    id: 'brand-identity',
    title: 'Brand Identity', 
    icon: <Palette size={32} />, 
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=2070&auto=format&fit=crop',
    desc: 'Craft a powerful, memorable brand identity that resonates with your target audience.', 
    features: ['Logo Design', 'Brand Guidelines', 'Visual Language', 'Marketing Collateral'],
    longDesc: 'Your brand is more than just a logo. We help you define your visual identity, brand voice, and market positioning to create a lasting impression on your customers.'
  },
  { 
    id: 'graphic-design',
    title: 'Graphic Design', 
    icon: <ShieldCheck size={32} />, 
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
    desc: 'Eye-catching graphics and visual assets that elevate your brand across all touchpoints.', 
    features: ['Social Media Graphics', 'Print Design', 'Infographics', 'Presentation Design'],
    longDesc: 'From digital assets to print materials, our graphic design service ensures your brand looks professional and consistent everywhere.'
  },
  { 
    id: 'motion-graphics',
    title: 'Motion Graphics', 
    icon: <Video size={32} />, 
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    desc: 'Dynamic motion graphics and video content that captivate and engage your audience.', 
    features: ['Animated Explainers', 'Logo Animations', 'Video Editing', 'Social Media Reels'],
    longDesc: 'Capture attention with dynamic motion graphics. We create high-quality animations and video content that tell your story and engage your audience more effectively than static text.'
  },

  { 
    id: 'digital-marketing-seo',
    title: 'Growth Marketing & SEO', 
    icon: <BarChart3 size={32} />, 
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=2070&auto=format&fit=crop',
    desc: 'Drive traffic and increase conversions with data-driven marketing strategies.', 
    features: ['Technical SEO Audits', 'Aggressive Content Marketing', 'PPC & Meta Ads Management', 'Email Funnel Automation', 'Social Media Authority Building', 'Performance Analytics'],
    longDesc: 'A great product needs a great audience. Our Growth Marketing team combines technical SEO with creative content strategies to ensure your brand dominates the search results. We don\'t just look at vanity metrics; we focus on ROI and customer acquisition cost. By automating your email funnels and managing high-performance ad campaigns across Google and Social Media, we create a sustainable growth engine that continuously feeds your sales team with high-quality leads.'
  },
  { 
    id: 'quality-assurance',
    title: 'Quality Assurance & Testing', 
    icon: <CheckCircle2 size={32} />, 
    image: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop',
    desc: 'Ensure your products are bug-free and deliver a flawless user experience.', 
    features: ['Regression Test Automation', 'Security & Penetration Testing', 'High-Concurrency Load Testing', 'Cross-Browser/Device Matrix', 'Usability & Accessibility QA', 'API Validation Testing'],
    longDesc: 'Quality is non-negotiable. Our QA engine ensures that your software performs flawlessly under any condition. We implement automated testing suites that run with every code change, catching bugs before they ever reach your users. From performing deep security audits and penetration tests to simulating thousands of concurrent users in load tests, we ensure your product is resilient, secure, and ready for the real world. We don\'t just find bugs; we guarantee a premium user experience.'
  },
  { 
    id: 'it-consulting',
    title: 'Strategic IT Consulting', 
    icon: <BrainCircuit size={32} />, 
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    desc: 'Strategic technology advice to align your IT infrastructure with business goals.', 
    features: ['Tech-Stack Optimization', 'Digital Transformation Roadmap', 'Cyber-Security Strategy', 'Cloud Migration Strategy', 'CTO-as-a-Service', 'M&A Tech Due Diligence'],
    longDesc: 'Technology should be your biggest advantage, not your biggest headache. Our consulting team works with your leadership to align your technology investments with your long-term business goals. We provide high-level strategic planning, from choosing the right tech stack for a new venture to auditing your existing infrastructure for security gaps and scalability issues. With our "CTO-as-a-Service" model, you get access to executive-level technical leadership that helps you navigate the rapidly evolving digital landscape with confidence.'
  },
  { 
    id: 'blockchain-web3',
    title: 'Blockchain & Web3', 
    icon: <Database size={32} />, 
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f4ec651?q=80&w=2070&auto=format&fit=crop',
    desc: 'Custom blockchain solutions, smart contracts, and decentralized applications.', 
    features: ['Smart Contract Dev', 'DApp Development', 'NFT Ecosystems', 'Wallet Integration'],
    longDesc: 'Explore the future of the internet with our Web3 services. We specialize in building secure smart contracts, decentralized applications (dApps), and comprehensive blockchain ecosystems.'
  }
];
