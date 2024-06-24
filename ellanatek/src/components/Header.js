import React, { useEffect, useState } from 'react';
import '../styles/Header.css';
import logoVideo from '../assets/logo.MOV'; // Adjust the path to your video file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        // Downscroll
        setShowHeader(false);
      } else if (st < lastScrollTop && st === 0) {
        // Upscroll to the top
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
        <video autoPlay loop muted className="logo">
          <source src={logoVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="social-media">
        <a href="https://instagram.com/ellanatek" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="https://www.linkedin.com/company/ellanatek/about/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
        <a href="https://tiktok.com/@yourprofile" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTiktok} size="2x" />
        </a>
      </div>
    </header>
  );
};

export default Header;