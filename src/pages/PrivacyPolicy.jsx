import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './LegalPages.css';

const PrivacyPolicy = () => {
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
          <h1>Privacy Policy</h1>
          <p>Read how True Twist manages and safeguards your data.</p>
        </motion.div>

        <motion.div 
          className="legal-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="legal-last-updated">Last Updated: March 2026</p>

          <h2>1. Information We Collect</h2>
          <p>We collect information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on the Website, or otherwise contacting us.</p>
          <ul>
            <li>Personal Information Provided by You. Name, email address, contact data.</li>
            <li>Information Automatically Collected. IP address, browser and device characteristics, operating system, language preferences.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
          
          <h2>3. Will Your Information Be Shared With Anyone?</h2>
          <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>

          <h2>4. Information Retention</h2>
          <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).</p>

          <h2>5. Keeping Your Information Safe</h2>
          <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.</p>

          <h2>6. Contact Us</h2>
          <p>If you have questions or comments about this notice, you may email us at privacy@truetwist.it.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
