import React, { useEffect, useState } from 'react';
import '../styles/Header.css';
import logoPNG from '../assets/logo.png'; // Adjust the path to your logo image file
import igSVG from '../assets/ig.svg'; // Instagram SVG icon
import tiktokSVG from '../assets/tiktok.svg'; // TikTok SVG icon
import linkedinSVG from '../assets/linkedin.svg'; // LinkedIn SVG icon

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        // Downscroll
        setShowHeader(false);
      } else if (st < lastScrollTop) {
        // Upscroll
        setShowHeader(true);
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${showHeader ? '' : 'header--hidden'}`}>
      <div className="logo-container">
        <img src={logoPNG} alt="Logo" className="logo" />
      </div>
      <div className="social-media">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={igSVG} alt="Instagram" className="social-icon" />
        </a>
        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
          <img src={tiktokSVG} alt="TikTok" className="social-icon" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src={linkedinSVG} alt="LinkedIn" className="social-icon" />
        </a>
      </div>
    </header>
  );
};

export default Header;
