import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import './AIChatbot.css';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef();
  const location = useLocation();

  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Initialize system... True Twist Assistant online. How can I assist with your development needs today?' }
  ]);

  const quickReplies = [
    { label: '🚀 Explore Services', value: 'What services do you offer?' },
    { label: '🤖 About Robot', value: 'Tell me about the 3D Robot Mascot.' },
    { label: '💰 Get Pricing', value: 'How much do your services cost?' },
    { label: '📍 Lab Location', value: 'Where is your Innovation Lab located?' }
  ];

  // Context-aware greeting
  useEffect(() => {
    if (isOpen && messages.length === 1) {
      let contextMsg = "";
      if (location.pathname.includes('services')) {
        contextMsg = "I see you're exploring our services. Which specialized solution are you looking for—Software, Web, or AI?";
      } else if (location.pathname.includes('portfolio')) {
        contextMsg = "Welcome to our Enterprise Showcase. I can provide technical details on any of these case studies.";
      } else if (location.pathname.includes('blog')) {
        contextMsg = "Exploring our research? I can summarize any of these insights for you.";
      }
      
      if (contextMsg) {
        setMessages(prev => [...prev, { role: 'bot', text: contextMsg }]);
      }
    }
  }, [isOpen]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getAssistantResponse = (userInput) => {
    const query = userInput.toLowerCase();
    
    // 1. Basic Greetings & Identity
    if (query.match(/\b(hi|hello|hey|greetings|wassup|yo)\b/)) {
      return "Greetings! I am the True Twist AI. I'm synchronized and ready to discuss Software Development, AI integrations, or our Cloud architecture. How can I facilitate your project today?";
    }

    if (query.includes('who are you') || query.includes('what are you') || query.includes('your name')) {
      return "I am the True Twist Neural Assistant—a specialized AI model trained on our internal methodology and futuristic design philosophy. My goal is to bridge the gap between your vision and our technical execution.";
    }

    if (query.includes('real person') || query.includes('human')) {
      return "I am a digital intelligence, but I'm connected to a team of very real (and very talented) humans! If you'd like to speak with them directly, I can guide you to our contact form.";
    }
    
    // 2. Services & Capabilities
    if (query.includes('service') || query.includes('what do you do') || query.includes('work') || query.includes('capabilities')) {
      return "True Twist operates at the intersection of design and engineering. We provide: \n• Custom Software Development\n• AI & Machine Learning Integrations\n• Enterprise Web & Mobile Apps\n• Cloud Infrastructure & DevOps\nWhich of these would you like to explore?";
    }

    // 3. AI & Robotic Theme
    if (query.includes('robot') || query.includes('mascot') || query.includes('3d')) {
      return "That's our Neural Mascot! It represents the bridge between human creativity and machine intelligence. It's built using advanced WebGL and React Three Fiber to respond to your interactions in real-time.";
    }

    if (query.includes('ai') || query.includes('automation') || query.includes('future') || query.includes('intelligence')) {
      return "Our 'Alive' technology philosophy drives our AI division. We specialize in Generative AI, Predictive Analytics, and Natural Language Processing. We don't just add AI; we build intelligence into your core business logic.";
    }

    // 4. Technology Stack
    if (query.includes('tech') || query.includes('stack') || query.includes('language') || query.includes('framework') || query.includes('react') || query.includes('node') || query.includes('python')) {
      return "Our tech stack is cutting-edge: \n• Frontend: React.js, Next.js, Framer Motion\n• Backend: Node.js, Python (Django/FastAPI), Go\n• Database: PostgreSQL, MongoDB, Redis\n• Cloud: AWS, Google Cloud, Azure\nWe choose the tool that best fits the problem.";
    }

    // 5. Leadership & Founder
    if (query.includes('founder') || query.includes('ceo') || query.includes('who started') || query.includes('owner')) {
      return "True Twist was founded by a team of visionary engineers and designers who wanted to 'twist' the conventional approach to IT. Our leadership consists of industry veterans from top-tier tech firms.";
    }

    // 6. Project Timeline & Process
    if (query.includes('how long') || query.includes('timeline') || query.includes('time') || query.includes('duration') || query.includes('fast')) {
      return "Delivery speed is one of our core strengths: \n• MVP: 4-8 weeks\n• Standard Project: 2-4 months\n• Enterprise Build: 6+ months\nWe use Agile sprints to ensure regular updates.";
    }

    if (query.includes('process') || query.includes('steps') || query.includes('how it works') || query.includes('methodology')) {
      return "Our 'Neural Delivery' framework has 4 phases: \n1. Discovery: Understanding your business DNA.\n2. Architecture: Creating scalable technical blueprints.\n3. Iterative Build: Focused development in 2-week sprints.\n4. Launch & Scale: Rigorous testing and global deployment.";
    }

    // 7. Pricing & Quotes
    if (query.includes('price') || query.includes('cost') || query.includes('quote') || query.includes('pay') || query.includes('budget')) {
      return "We offer flexible engagement models. For an instant ballpark estimate, I recommend using the AI Project Estimator on our 'Contact' page. It takes into account your feature set and platform requirements.";
    }

    // 8. Careers & Hiring
    if (query.includes('job') || query.includes('career') || query.includes('hiring') || query.includes('work there') || query.includes('apply')) {
      return "We are always looking for 'Twisters'—people who think differently! Check out our Careers section or send your portfolio to careers@truetwist.it. We value passion and problem-solving skills.";
    }

    // 9. Contact & Location
    if (query.includes('location') || query.includes('where') || query.includes('address') || query.includes('office')) {
      return "True Twist's Innovation Lab is in Tech City, TX, with satellite engineering hubs in Bangalore and London. We operate primarily as a global-first agency.";
    }

    if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('call')) {
      return "Connectivity is key. \n• Email: hello@truetwist.it\n• Phone: +1 (555) 123-4567\nOne of our solution architects can be on a call with you in less than 24 hours.";
    }

    if (query.includes('portfolio') || query.includes('projects') || query.includes('examples') || query.includes('showcase')) {
      return "You can explore our 'Portfolio' page to see our work in Fintech, Logistics, and AI-powered SaaS. We've helped dozens of startups reach unicorn status.";
    }

    // 10. Fun/Greeting
    if (query.includes('thank') || query.includes('thanks') || query.includes('great') || query.includes('good')) {
      return "You're very welcome! I'm programmed to be helpful. Is there anything else you'd like to 'twist' today?";
    }

    if (query.includes('bye') || query.includes('goodbye') || query.includes('see ya')) {
      return "System logging off... Just kidding, I'm always here! Have a productive day!";
    }

    // 11. Fallback
    return "I've analyzed your input, but I need more context. Are you asking about our Software Development services, AI integrations, Careers, or Project Pricing? Try using the quick reply buttons!";
  };

  const handleSend = (forcedInput = null) => {
    const messageText = forcedInput || input;
    if (!messageText.trim() || isTyping) return;

    const userMsg = { role: 'user', text: messageText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Dynamic thinking time based on length
    const thinkingTime = Math.min(Math.max(messageText.length * 15, 800), 2000);

    setTimeout(() => {
      const response = getAssistantResponse(messageText);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, thinkingTime);
  };

  const handleQuickReply = (value) => {
    handleSend(value);
  };

  return (
    <div className={`ai-chatbot-container ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <button className="chat-trigger" onClick={() => setIsOpen(true)}>
          <div className="trigger-icon-wrapper">
            <MessageSquare size={24} />
            <Sparkles size={12} className="sparkle-icon" />
          </div>
          <span className="trigger-text">AI Assistant</span>
        </button>
      )}

      {isOpen && (
        <div className="chat-window futuristic-chat shadow-lg">
          <div className="chat-header">
            <div className="header-info">
              <div className="status-indicator">
                <Bot size={20} className="icon-teal" />
                <span className="online-dot shine"></span>
              </div>
              <div className="header-text">
                <span className="assistant-name">True Twist Assistant</span>
                <span className="assistant-status">Online // Neural Link Active</span>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`message-wrapper ${msg.role}`}>
                <div className="avatar">
                  {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className="message-bubble">
                  {msg.text.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index !== msg.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message-wrapper bot">
                <div className="avatar"><Bot size={16} /></div>
                <div className="message-bubble typing-bubble">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            {messages.length < 5 && !isTyping && (
              <div className="quick-replies-bar">
                {quickReplies.map((reply, idx) => (
                  <button 
                    key={idx} 
                    className="quick-reply-btn" 
                    onClick={() => handleQuickReply(reply.value)}
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            )}
            <div className="input-wrapper">
              <input 
                type="text" 
                placeholder="Ask about AI, Services, or Pricing..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="send-btn" onClick={() => handleSend()} disabled={isTyping}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
