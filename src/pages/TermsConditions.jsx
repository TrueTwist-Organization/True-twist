import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './LegalPages.css';

const TermsConditions = () => {
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
          <h1>Terms & Conditions</h1>
          <p>Please read our terms carefully before using our services.</p>
        </motion.div>

        <motion.div 
          className="legal-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="legal-last-updated">Last Updated: March 2026</p>

          <h2>1. Terms</h2>
          <p>By accessing the website at https://truetwist.it, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          
          <h2>2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on True Twist's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul>
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on True Twist's website;</li>
            <li>remove any copyright or other proprietary notations from the materials;</li>
          </ul>

          <h2>3. Disclaimer</h2>
          <p>The materials on True Twist's website are provided on an 'as is' basis. True Twist makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

          <h2>4. Limitations</h2>
          <p>In no event shall True Twist or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on True Twist's website, even if True Twist or a True Twist authorized representative has been notified orally or in writing of the possibility of such damage.</p>

          <h2>5. Accuracy of Materials</h2>
          <p>The materials appearing on True Twist's website could include technical, typographical, or photographic errors. True Twist does not warrant that any of the materials on its website are accurate, complete or current.</p>

          <h2>6. Contact Us</h2>
          <p>If you have any questions or suggestions about our Terms and Conditions, do not hesitate to contact us at legal@truetwist.it.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsConditions;
