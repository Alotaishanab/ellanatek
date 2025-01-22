// ToggleButton.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/ToggleButton.css'; // Import the CSS file
import threeSidesIcon from '../assets/3.webp'; // Import menu icon
import xIcon from '../assets/X.png'; // Import close icon
import langIcon from '../assets/svg/lang.svg'; // Import language icon

const ToggleButton = ({ toggleNav, navOpen }) => {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  // New: Local toggle language functionality
  const toggleLanguage = () => {
    // Get the current language; default to 'en' if undefined
    const currentLang = i18n.language || 'en';
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.body.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    let scrollTimeout;

    const handleVisibility = () => {
      setIsVisible(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    window.addEventListener('scroll', handleVisibility);
    window.addEventListener('mousemove', handleVisibility);
    window.addEventListener('touchstart', handleVisibility);
    window.addEventListener('touchmove', handleVisibility);

    return () => {
      window.removeEventListener('scroll', handleVisibility);
      window.removeEventListener('mousemove', handleVisibility);
      window.removeEventListener('touchstart', handleVisibility);
      window.removeEventListener('touchmove', handleVisibility);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div
      id="nav-toggle-container"
      className={isVisible ? 'show' : 'hide'}
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      {/* Main Toggle Button */}
      <button id="nav-toggle" type="button" onClick={toggleNav}>
        <span className={`icon open ${navOpen ? 'hidden' : ''}`}>
          <img src={threeSidesIcon} alt="Menu Bars" style={{ width: '70%', height: 'auto' }} />
        </span>
        <span className={`icon close ${navOpen ? '' : 'hidden'}`}>
          <img src={xIcon} alt="Close Icon" style={{ width: '70%', height: 'auto' }} />
        </span>
      </button>
      {/* Connected Language Toggle Button */}
      <button id="lang-toggle" type="button" onClick={toggleLanguage}>
        <img src={langIcon} alt="Language Icon" />
      </button>
    </div>
  );
};

export default ToggleButton;
