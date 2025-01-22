// Nav.js
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HomeSnapshot from '../snapshots/HomeSnapshot';
import AdvertiseSnapshot from '../snapshots/AdvertiseSnapshot';
import AboutSnapshot from '../snapshots/AboutSnapshot';
import ToggleButton from './ToggleButton'; // Import the ToggleButton component
import '../styles/Nav.css';

const Nav = ({ navOpen, onNavClick }) => {
  const { t } = useTranslation();
  const navLinksRef = useRef(null);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setShowButton(true); // Show the button on scroll
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setShowButton(false); // Hide the button after 2 seconds of no scroll
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleNavClick = (index) => {
    onNavClick(index);
    if (navLinksRef.current) {
      const navLinks = Array.from(navLinksRef.current.children);
      const selectedLink = navLinks[index];
      if (selectedLink) {
        selectedLink.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      } else {
        console.error("Selected link is undefined at index: ", index);
      }
    }
  };

  return (
    <nav className={`nav ${navOpen ? 'nav-open' : ''}`}>
      <div id="nav-links" ref={navLinksRef}>
        <div className="nav-link" onClick={() => handleNavClick(0)}>
          <h2 className="nav-link-label rubik-font">{t('nav.home')}</h2>
          <HomeSnapshot />
        </div>
        <div className="nav-link" onClick={() => handleNavClick(1)}>
          <h2 className="nav-link-label rubik-font">{t('nav.advertise')}</h2>
          <AdvertiseSnapshot />
        </div>
        <div className="nav-link" onClick={() => handleNavClick(2)}>
          <h2 className="nav-link-label rubik-font">{t('nav.about')}</h2>
          <AboutSnapshot />
        </div>
      </div>
      {/* The language switcher is now moved into the ToggleButton component */}
      <ToggleButton toggleNav={() => {}} navOpen={navOpen} showButton={showButton} toggleLanguage={() => { /* language handling logic */ }} />
    </nav>
  );
};

export default Nav;
