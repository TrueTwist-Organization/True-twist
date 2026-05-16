import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './LegalPages.css';

const Disclaimer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <div className="container">
        <motion.div 
          className="legal-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Disclaimer</h1>
          <p>Important legal information regarding the use of this website.</p>
        </motion.div>

        <motion.div 
          className="legal-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="legal-last-updated">Last Updated: March 2026</p>

          <h2>General Information</h2>
          <p>The information provided by True Twist ("we," "us," or "our") on https://truetwist.it (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the Site.</p>
          
          <h2>No Professional Advice</h2>
          <p>The Site cannot and does not contain IT, development, or specific technical advice. The technology and IT information is provided for general informational and educational purposes only and is not a substitute for professional advice.</p>

          <p>Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of professional technology advice outside of formal engagements. The use or reliance of any information contained on this site is solely at your own risk.</p>

          <h2>External Links</h2>
          <p>The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.</p>
          
          <p>We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site or any website or feature linked in any banner or other advertising.</p>

          <h2>Contact Information</h2>
          <p>Should you have any feedback, comments, requests for technical support or other inquiries, please contact us by email: contact@truetwist.it.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Disclaimer;
