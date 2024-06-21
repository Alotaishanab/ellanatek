// src/components/Footer.js
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Ellanatek. All rights reserved.</p>
      <div className="social-media">
        <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <img src="/images/instagram.png" alt="Instagram" />
        </a>
        <a href="https://linkedin.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <img src="/images/linkedin.png" alt="LinkedIn" />
        </a>
        <a href="https://tiktok.com/@yourprofile" target="_blank" rel="noopener noreferrer">
          <img src="/images/tiktok.png" alt="TikTok" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
